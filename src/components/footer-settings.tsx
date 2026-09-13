import { createContext, useContext } from "react";
import type { SiteSettings } from "../lib/types";

/**
 * Footer settings context. Routes that already load site settings pass them
 * here once; the Footer reads them without re-fetching. Routes that don't
 * load settings simply leave it empty and the Footer falls back to defaults.
 */
export const FooterSettingsContext = createContext<SiteSettings | null>(null);

export function useFooterSettings(): SiteSettings | null {
  return useContext(FooterSettingsContext);
}
