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



export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}


