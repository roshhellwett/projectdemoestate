import { t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
//#region src/components/property-card.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Property card for grids. Image, price, BHK + area, locality.
* Whole card is one link; the img has explicit dimensions for CLS.
*/
function PropertyCard({ property, priority = false }) {
	const img = property.main_image_thumb || property.main_image;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/property/$slug",
		params: { slug: property.slug },
		className: "group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(18,16,14,0.18)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/3] overflow-hidden bg-paper-2",
			children: [img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: img,
				alt: property.title,
				width: 900,
				height: 675,
				loading: priority ? "eager" : "lazy",
				decoding: "async",
				className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
			}) : null, property.possession_status === "Ready To Move" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-verdigris/95 px-3 py-1 text-[11px] font-semibold text-white",
				children: "Ready to Move"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold text-ink",
						children: formatPrice(property.price_inr, property.price_display)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: property.locality
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 line-clamp-2 text-[15px] font-medium leading-snug text-ink",
					children: property.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: property.bhk_type }),
						property.area_sqft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [property.area_sqft.toLocaleString("en-IN"), " sq.ft"] }) : null,
						property.furnishing_status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: property.furnishing_status }) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { PropertyCard as t };
