import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { hasSupabaseConfig, supabasePublishableKey, supabaseUrl } from "./config";

let browserClient: SupabaseClient | null | undefined;

export function getBrowserSupabase() {
  if (browserClient !== undefined) return browserClient;
  browserClient = hasSupabaseConfig()
    ? createBrowserClient(supabaseUrl, supabasePublishableKey)
    : null;
  return browserClient;
}

