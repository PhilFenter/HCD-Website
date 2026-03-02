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
}

/**
 * Submit a quote request to ShopManagerPro's backend.
 * Creates a customer, quote, and action item automatically.
 */
export async function submitQuoteRequest(submission: QuoteSubmission) {
  const { data, error } = await supabase.functions.invoke(
    "create-quote-action-item",
    { body: submission }
  );

  if (error) throw error;
  return data;
}
