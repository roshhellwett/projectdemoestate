import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { h as SITE } from "./queries-CLKiIHf5.js";
import { a as n$1, c as s, i as c, n as useCompare, r as n } from "./floating-concierge-BGBUTvpL.js";
import { t as s$1 } from "./Calculator.es-KryO3jcl.js";
import { t as s$2 } from "./CheckCircle.es-CNp81qP5.js";
import { a as p, i as useFavorites, s as n$2 } from "./footer-j8rSls8N.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
//#region src/components/quick-view-modal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function QuickViewModal({ property, onClose }) {
	const { isFavorite, toggle: toggleFav } = useFavorites();
	const { isCompared, toggle: toggleComp } = useCompare();
	(0, import_react.useEffect)(() => {
		if (!property) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [property, onClose]);
	if (!property) return null;
	const favorited = isFavorite(property.id);
	const compared = isCompared(property.id);
	const img = property.main_image || property.main_image_thumb;
	const pricePerSqFt = property.price_inr && property.area_sqft && property.area_sqft > 0 ? Math.round(property.price_inr / property.area_sqft) : null;
	const estimatedEmi = property.price_inr ? Math.round(property.price_inr * .8 * (.085 / 12) * Math.pow(1 + .085 / 12, 240) / (Math.pow(1 + .085 / 12, 240) - 1)) : null;
	const waText = encodeURIComponent(`Hello SS Property, I am looking at "${property.title}" (${property.locality}, ${formatPrice(property.price_inr, property.price_display)}). Please share floor plans and schedule a private visit.`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "quick-view-modal",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-md animate-in fade-in duration-200",
		role: "dialog",
		"aria-modal": "true",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "relative flex flex-col md:flex-row w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-line bg-white shadow-2xl animate-in zoom-in-95 duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Close preview",
					className: "absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 18 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative md:w-1/2 min-h-[260px] md:min-h-[460px] bg-paper-2 overflow-hidden shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: property.title,
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-4 left-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-semibold text-paper backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$2, {
									size: 13,
									weight: "fill",
									className: "text-verdigris"
								}), "Verified RERA Title"]
							}), property.possession_status === "Ready To Move" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-verdigris px-3 py-1 text-[11px] font-semibold text-white",
								children: "Ready to Move"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-4 left-4 right-4 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brass",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p, {
										size: 13,
										weight: "fill"
									}), property.locality]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl font-bold text-white mt-0.5",
									children: formatPrice(property.price_inr, property.price_display)
								}),
								pricePerSqFt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-white/80",
									children: [
										"₹",
										pricePerSqFt.toLocaleString("en-IN"),
										" / sq.ft • All Inclusive Rate"
									]
								}) : null
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col justify-between overflow-y-auto p-6 md:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase tracking-wider text-brass",
							children: "Architectural Quick Dossier"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl font-bold text-ink leading-snug",
							children: property.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted leading-relaxed line-clamp-3",
							children: property.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-3 gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-line bg-paper-2/60 p-3 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted block",
										children: "Layout"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-base font-bold text-ink mt-0.5 block",
										children: property.bhk_type
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-line bg-paper-2/60 p-3 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted block",
										children: "Built-Up"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-base font-bold text-ink mt-0.5 block",
										children: property.area_sqft ? `${property.area_sqft} sq.ft` : "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-line bg-paper-2/60 p-3 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted block",
										children: "Baths"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-base font-bold text-ink mt-0.5 block",
										children: property.bathrooms || 2
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-line bg-paper-2/60 p-3 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted block",
										children: "Floor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xs font-bold text-ink mt-1 block truncate",
										children: property.floor || "Mid Floor"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-line bg-paper-2/60 p-3 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted block",
										children: "Facing"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xs font-bold text-ink mt-1 block truncate",
										children: property.facing || "Vastu Compliant"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-line bg-paper-2/60 p-3 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted block",
										children: "Parking"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xs font-bold text-ink mt-1 block truncate",
										children: property.parking || "Reserved"
									})]
								})
							]
						}),
						estimatedEmi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center justify-between rounded-xl border border-brass/30 bg-brass/5 p-3.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {
									size: 18,
									className: "text-brass shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-ink",
									children: "Est. Monthly EMI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted",
									children: "20 yrs @ 8.5% RBI floating"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-base font-bold text-ink",
								children: [
									"₹",
									estimatedEmi.toLocaleString("en-IN"),
									"/mo"
								]
							})]
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-3 pt-4 border-t border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleFav(property.id),
								className: `flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${favorited ? "border-danger bg-danger/10 text-danger" : "border-line bg-paper-2 text-muted hover:text-ink"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, {
									size: 15,
									weight: favorited ? "fill" : "regular"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: favorited ? "Saved" : "Save" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleComp(property),
								className: `flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${compared ? "border-brass bg-brass/15 text-brass-dark font-bold" : "border-line bg-paper-2 text-muted hover:text-ink"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$1, {
									size: 15,
									weight: compared ? "fill" : "regular"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: compared ? "Compared" : "Compare" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `${SITE.whatsapp}?text=${waText}`,
								target: "_blank",
								rel: "noreferrer",
								className: "flex flex-1 items-center justify-center gap-2 rounded-full bg-verdigris px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-verdigris/90 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
									size: 16,
									weight: "fill"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inquire WhatsApp" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/property/$slug",
								params: { slug: property.slug },
								onClick: onClose,
								className: "flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wider text-paper hover:bg-ink-2 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Full Dossier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
									size: 14,
									weight: "bold"
								})]
							})]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { QuickViewModal as t };
