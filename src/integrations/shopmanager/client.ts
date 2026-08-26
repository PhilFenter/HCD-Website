// Client for the external ShopManager Pro (HCD Confluence) backend.
// This intentionally does NOT use the auto-generated Lovable Cloud client —
// quotes, artwork storage, and action items live in this external project.
import { createClient } from '@supabase/supabase-js';

const SHOPMANAGER_URL = "https://fzkxeodjkaeqkwqhwcdv.supabase.co";
const SHOPMANAGER_PUBLISHABLE_KEY = "sb_publishable_RnBT83Kf0jDUY6g2hORnqQ_4YDnM63a";

export const shopmanager = createClient(SHOPMANAGER_URL, SHOPMANAGER_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
