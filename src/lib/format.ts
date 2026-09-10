/**
 * Formatting helpers - prices, areas, dates. Indian conventions.
 */

const LAKH = 1e5;
const CRORE = 1e7;

export function formatPrice(priceInr: number | null, display?: string | null): string {
  if (display && display.trim()) {
    return display.replace(/^INR\s*/i, "\u20B9").trim();
  }
  if (priceInr == null) return "Price on Request";
  if (priceInr >= CRORE) {
    const cr = priceInr / CRORE;
    const text = cr >= 10 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, "");
    return `\u20B9${text} Cr`;
  }
  if (priceInr >= LAKH) {
    return `\u20B9${(priceInr / LAKH).toFixed(0)} L`;
  }
  return `\u20B9${priceInr.toLocaleString("en-IN")}`;
}

export function formatArea(areaSqft: number | null): string {
  if (areaSqft == null) return "On Request";
  return `${areaSqft.toLocaleString("en-IN")} sq.ft`;
}

export function priceBucket(priceInr: number | null): string {
  if (priceInr == null) return "On Request";
  if (priceInr < 6_000_000) return "Under \u20B960 L";
  if (priceInr < CRORE) return "\u20B960 L - 1 Cr";
  if (priceInr < 2 * CRORE) return "\u20B91 - 2 Cr";
  return "\u20B92 Cr+";
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** BHK label like "2 BHK" -> numeric 2; "Commercial Office Space" -> null */
export function bhkNumber(bhkType: string): number | null {
  const m = bhkType.match(/^(\d)\s*BHK/i);
  return m ? Number(m[1]) : null;
}
