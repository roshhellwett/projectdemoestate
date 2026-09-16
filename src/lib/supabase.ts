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

const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env;

const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  env?.VITE_SUPABASE_URL ||
  env?.SUPABASE_URL ||
  "https://vuvxmzrthcitfagwebgm.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env?.SUPABASE_PUBLISHABLE_KEY ||
  env?.SUPABASE_ANON_KEY ||
  "sb_publishable_oFux3tjP1HXUoIi6BB0j0A_EKwT8RK4";

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


