import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fzkxeodjkaeqkwqhwcdv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RnBT83Kf0jDUY6g2hORnqQ_4YDnM63a";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
