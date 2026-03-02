import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cwwkkhcpbswvwghxbfgg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3d2traGNwYnN3dndnaHhiZmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4OTAyNzAsImV4cCI6MjA4NTQ2NjI3MH0.GgiUbQy3j6l9GjtOLE_1tPhtiWgv7EThjFv_5rJsJog";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
