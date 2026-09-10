/**
 * Supabase client for route loaders / server functions.
 *
 * Public content reads go through the publishable key - RLS permits reading
 * published rows, so the same client works on the server (during SSR) and in
 * the browser (during hydration and client navigation). No service key is
 * ever shipped to the client bundle.
 */

import { getSupabaseBrowser } from "./supabase";

export function getSupabaseForRoute() {
  return getSupabaseBrowser();
}
