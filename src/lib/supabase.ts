/**
 * Supabase clients.
 *
 * - server:  service-role key, used only inside server functions / loaders.
 * - browser:  publishable (anon) key, RLS applies. Used by the client island
 *             for form submissions and CMS (authenticated session).
 *
 * Env comes from Cloudflare bindings (wrangler injects env vars) - in dev,
 * vite reads them from .env via the cloudflare vite plugin.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY");
}

let browserClient: SupabaseClient | null = null;

/** Shared browser client (anon key, RLS enforced). */
export function getSupabaseBrowser(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return browserClient;
}

/** Server-side client using the secret key. Server contexts only. */
export function getSupabaseServer(secretKey: string): SupabaseClient {
  return createClient(SUPABASE_URL, secretKey, {
    auth: { persistSession: false },
  });
}
