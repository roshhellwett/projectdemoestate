//#region src/lib/format.ts
/**
* Formatting helpers - prices, areas, dates. Indian conventions.
*/
var LAKH = 1e5;
var CRORE = 1e7;
function formatPrice(priceInr, display) {
	if (display && display.trim()) return display.replace(/^INR\s*/i, "₹").trim();
	if (priceInr == null) return "Price on Request";
	if (priceInr >= CRORE) {
		const cr = priceInr / CRORE;
		return `\u20B9${cr >= 10 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, "")} Cr`;
	}
	if (priceInr >= LAKH) return `\u20B9${(priceInr / LAKH).toFixed(0)} L`;
	return `\u20B9${priceInr.toLocaleString("en-IN")}`;
}
function formatArea(areaSqft) {
	if (areaSqft == null) return "On Request";
	return `${areaSqft.toLocaleString("en-IN")} sq.ft`;
}
function formatDate(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
//#endregion
export { formatDate as n, formatPrice as r, formatArea as t };
