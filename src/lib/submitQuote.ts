import { supabase } from "@/integrations/supabase/client";

export interface BrandContext {
  situation?: string;
  brandDoes?: string;
  success?: string;
  years?: string;
  teamSize?: string;
  orderedBefore?: string;
  artwork?: string;
  deadline?: string;
  hardDate?: string;
}

export interface QuoteSubmission {
  /** Which service: "custom_hats" | "embroidery" | "screen_print" | "dtf" | "garments" */
  serviceType: string;
  /** Customer contact info */
  name: string;
  email: string;
  phone: string;
  company?: string;
  /** Lead source */
  source?: string;
  /** Free-form notes */
  notes?: string;
  /** Timeline preference */
  timeline?: string;
  /** Quantity (string or number) */
  quantity?: string | number;
  /** Artwork notes */
  artworkNotes?: string;
  /** All the service-specific fields */
  details: Record<string, unknown>;
  /** Estimated pricing if calculated */
  estimate?: { low: number; high: number } | null;
  /** Optional artwork file to upload */
  artworkFile?: File | null;
  /** Brand intake context from the Brand Builder funnel */
  brandContext?: BrandContext;
}

/**
 * Upload an artwork file to Supabase Storage and return the public URL.
 */
async function uploadArtworkFile(file: File, serviceType: string): Promise<string> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${serviceType}/${timestamp}-${safeName}`;

  const { error } = await supabase.storage
    .from("quote-artwork")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(`Artwork upload failed: ${error.message}`);

  const { data: urlData } = supabase.storage
    .from("quote-artwork")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}
/**
 * Format a label for display (snake_case / camelCase → Title Case).
 */
function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Build a human-readable notes string from all quote data so
 * the ShopManagerPro action item contains every detail.
 */
function buildFullNotes(submission: QuoteSubmission, artworkUrl?: string): string {
  const sections: string[] = [];

  // Brand context from Brand Builder funnel
  if (submission.brandContext) {
    const bc = submission.brandContext;
    sections.push("— Brand Info —");
    if (bc.situation) sections.push(`  Source: ${bc.situation}`);
    if (bc.brandDoes) sections.push(`  What They Do: ${bc.brandDoes}`);
    if (bc.success) sections.push(`  Success Looks Like: ${bc.success}`);
    if (bc.years) sections.push(`  Years In Business: ${bc.years}`);
    if (bc.teamSize) sections.push(`  Team Size: ${bc.teamSize}`);
    if (bc.orderedBefore) sections.push(`  Ordered Before: ${bc.orderedBefore}`);
    if (bc.artwork) sections.push(`  Artwork Status: ${bc.artwork}`);
    if (bc.deadline) sections.push(`  Timeline: ${bc.deadline}`);
    if (bc.hardDate) sections.push(`  Hard Date: ${bc.hardDate}`);
    sections.push("");
  }

  // Service type header
  sections.push(`— ${formatLabel(submission.serviceType)} Quote —`);

  // Quantity
  if (submission.quantity) sections.push(`Quantity: ${submission.quantity}`);

  // Timeline
  if (submission.timeline) sections.push(`Timeline: ${submission.timeline}`);

  // Estimate
  if (submission.estimate) {
    const { low, high } = submission.estimate;
    sections.push(
      low === high
        ? `Estimate: $${low}`
        : `Estimate: $${low} – $${high}`
    );
  }

  // Service-specific details
  if (submission.details && Object.keys(submission.details).length > 0) {
    sections.push(""); // blank line
    sections.push("Order Details:");
    for (const [key, value] of Object.entries(submission.details)) {
      if (value === undefined || value === null || value === "") continue;
      const display = Array.isArray(value) ? value.join(", ") : String(value);
      sections.push(`  ${formatLabel(key)}: ${display}`);
    }
  }

  // Artwork
  if (submission.artworkNotes) {
    sections.push("");
    sections.push(`Artwork Notes: ${submission.artworkNotes}`);
  }
  if (artworkUrl) {
    sections.push(`Artwork File: ${artworkUrl}`);
  }

  // Customer notes
  if (submission.notes) {
    sections.push("");
    sections.push(`Customer Notes: ${submission.notes}`);
  }

  return sections.join("\n");
}

/**
 * Submit a quote request to ShopManagerPro's backend.
 * Creates a customer, quote, and action item automatically.
 * Includes a deduplication guard to prevent double submissions.
 */
let _inflight: Promise<unknown> | null = null;

export async function submitQuoteRequest(submission: QuoteSubmission) {
  // Prevent duplicate submissions from double-clicks
  if (_inflight) return _inflight;

  _inflight = (async () => {
    try {
      let artworkUrl: string | undefined;

      // Upload artwork file if provided
      if (submission.artworkFile) {
        artworkUrl = await uploadArtworkFile(submission.artworkFile, submission.serviceType);
      }

      // Build comprehensive notes with all order details
      const fullNotes = buildFullNotes(submission, artworkUrl);

      // Map frontend field names to what the edge function expects
      const { artworkFile, ...rest } = submission;
      const payload = {
        ...rest,
        notes: fullNotes,
        customer_name: submission.name,
        customer_email: submission.email,
        customer_phone: submission.phone,
        customer_company: submission.company,
        ...(artworkUrl && { artworkUrl }),
      };

      const { data, error } = await supabase.functions.invoke(
        "create-quote-action-item",
        { body: payload }
      );

      if (error) throw error;
      return data;
    } finally {
      _inflight = null;
    }
  })();

  return _inflight;
}
