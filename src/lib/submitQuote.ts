import { supabase } from "@/integrations/supabase/client";

export interface QuoteSubmission {
  /** Which service: "custom_hats" | "embroidery" | "screen_print" | "dtf" | "garments" */
  serviceType: string;
  /** Customer contact info */
  name: string;
  email: string;
  phone: string;
  company?: string;
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
 * Submit a quote request to ShopManagerPro's backend.
 * Creates a customer, quote, and action item automatically.
 */
export async function submitQuoteRequest(submission: QuoteSubmission) {
  let artworkUrl: string | undefined;

  // Upload artwork file if provided
  if (submission.artworkFile) {
    artworkUrl = await uploadArtworkFile(submission.artworkFile, submission.serviceType);
  }

  // Map frontend field names to what the edge function expects
  const { artworkFile, ...rest } = submission;
  const payload = {
    ...rest,
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
}
