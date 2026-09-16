import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { h as SITE } from "./queries-CWRitaKX.js";
import { a as n$2, c as s, i as c, l as p, n as useCompare, r as n$3, t as FloatingConcierge } from "./floating-concierge-92TO1Fd8.js";
import { t as s$1 } from "./Calculator.es-DjsXWh1Y.js";
import { t as c$1 } from "./Compass.es-B4QiuUAT.js";
import { t as h } from "./ShieldCheck.es-6ktx9mZ-.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
import { l as Route } from "./router-DyLJ-3qJ.js";
//#region node_modules/@phosphor-icons/react/dist/defs/Check.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var a$1 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/Plus.es.js
var a = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Check.es.js
var o = import_react.forwardRef((c, r) => /* @__PURE__ */ import_react.createElement(p, {
	ref: r,
	...c,
	weights: a$1
}));
o.displayName = "CheckIcon";
var n$1 = o;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Plus.es.js
var e = import_react.forwardRef((r, s) => /* @__PURE__ */ import_react.createElement(p, {
	ref: s,
	...r,
	weights: a
}));
e.displayName = "PlusIcon";
var n = e;
//#endregion
//#region src/routes/compare.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
var ALL_AMENITIES = [
	"Lift",
	"24/7 Security",
	"Covered Parking",
	"Modular Kitchen",
	"Wardrobes",
	"ACs",
	"Geysers",
	"Power Backup",
	"Gymnasium",
	"Community Hall",
	"Water Filtration"
];
function ComparePage() {
	const { allProperties } = Route.useLoaderData();
	const { items, removeItem, clear, toggle, isCompared } = useCompare();
	const [showAddPicker, setShowAddPicker] = (0, import_react.useState)(false);
	const comparedProperties = (0, import_react.useMemo)(() => {
		return items.map((item) => allProperties.find((p) => p.id === item.id)).filter((p) => p !== void 0);
	}, [items, allProperties]);
	const calculateWbTax = (price) => {
		if (!price) return {
			stampDuty: 0,
			regFee: 0,
			total: 0
		};
		const stampDuty = Math.round(price * (price > 1e7 ? .07 : .06));
		const regFee = Math.round(price * .01);
		return {
			stampDuty,
			regFee,
			total: stampDuty + regFee
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative border-b border-line bg-gradient-to-b from-paper-2 to-paper pt-28 pb-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shell-wide",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/10 px-3.5 py-1 text-xs font-semibold text-brass-dark",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, {
									size: 14,
									weight: "fill",
									className: "text-brass"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Side-by-Side Architectural Dossier" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-3xl md:text-5xl font-medium tracking-tight text-ink",
								children: "Residences Comparison Matrix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-xs md:text-sm text-muted leading-relaxed",
								children: "Directly evaluate Kolkata luxury homes across super built-up space, price per square foot, Vastu facing, executive amenities, and West Bengal municipal stamp duty."
							})
						] }), comparedProperties.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 shrink-0",
							children: [comparedProperties.length < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowAddPicker(true),
								className: "flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:border-brass transition-colors shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, {
									size: 14,
									weight: "bold"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Add Residence (",
									comparedProperties.length,
									"/4)"
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: clear,
								className: "flex items-center gap-1.5 rounded-full border border-danger/30 bg-danger/5 px-4 py-2.5 text-xs font-semibold text-danger hover:bg-danger/15 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear All" })]
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "shell-wide py-12",
				children: comparedProperties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center rounded-3xl border border-line bg-white p-12 md:p-20 text-center shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-paper-2 text-brass",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, {
								size: 32,
								weight: "duotone"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-2xl font-medium text-ink",
							children: "No Residences Selected for Comparison"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 max-w-md text-xs md:text-sm text-muted leading-relaxed",
							children: [
								"Explore our verified properties in Lake Town, Newtown, Kasba, and Rajarhat. Click the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Compare" }),
								" button on any card to view specs side-by-side."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex flex-wrap gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/properties",
								className: "flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md hover:bg-ink-2 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Browse All Residences" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
									size: 14,
									weight: "bold"
								})]
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-3xl border border-line bg-white shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse min-w-[700px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line bg-paper-2/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-6 w-48 text-xs font-bold uppercase tracking-wider text-muted align-top",
								children: "Residence Spec"
							}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-6 w-72 align-top border-l border-line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => removeItem(p.id),
											"aria-label": `Remove ${p.title}`,
											className: "absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-paper hover:bg-danger transition-colors shadow-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, {
												size: 13,
												weight: "bold"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: p.main_image_thumb || p.main_image,
												alt: p.title,
												className: "h-full w-full object-cover"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-3 block text-[11px] font-bold uppercase tracking-wider text-brass",
											children: p.locality
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/property/$slug",
											params: { slug: p.slug },
											className: "font-display text-base font-bold text-ink hover:text-brass transition-colors line-clamp-2 mt-1",
											children: p.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-display text-xl font-bold text-ink",
											children: formatPrice(p.price_inr, p.price_display)
										})
									]
								})
							}, p.id))]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-line/60 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Price / Sq.Ft"
									}), comparedProperties.map((p) => {
										const rate = p.price_inr && p.area_sqft ? Math.round(p.price_inr / p.area_sqft) : null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-5 border-l border-line",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-ink text-sm",
												children: rate ? `₹${rate.toLocaleString("en-IN")}` : "N/A"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-[11px] text-muted",
												children: "All-inclusive rate"
											})]
										}, p.id);
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Configuration"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line font-bold text-ink",
										children: p.bhk_type
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Super Built-Up Area"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-ink text-sm",
											children: p.area_sqft ? `${p.area_sqft.toLocaleString("en-IN")} sq.ft` : "N/A"
										})
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Baths & Balconies"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-5 border-l border-line text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-ink",
											children: [p.bathrooms || 2, " Bathrooms"]
										}), p.balconies ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											" • ",
											p.balconies,
											" Balcony"
										] }) : null]
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Floor Level"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line font-medium text-ink",
										children: p.floor || "Mid Floor"
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Direction Facing"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line font-medium text-ink",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-md bg-paper-2 px-2.5 py-1 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$1, {
												size: 13,
												className: "text-brass"
											}), p.facing || "Vastu Compliant"]
										})
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Parking Allotted"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line text-muted",
										children: p.parking || "Covered Parking"
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Possession Timeline"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${p.possession_status === "Ready To Move" ? "bg-verdigris text-white" : "bg-paper-2 text-ink"}`,
											children: p.possession_status
										})
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Furnishing Level"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line font-medium text-ink",
										children: p.furnishing_status
									}, p.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-brass/5 hover:bg-brass/10 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-5 font-semibold text-ink",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 text-brass-dark",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, { size: 16 }), "WB Stamp Duty & Reg. Est."]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px] text-muted mt-0.5",
											children: "KMC municipal guidance"
										})]
									}), comparedProperties.map((p) => {
										const wb = calculateWbTax(p.price_inr);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-5 border-l border-line",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-sm font-bold text-ink",
												children: ["₹", wb.total.toLocaleString("en-IN")]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[10px] text-muted space-y-0.5 mt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Stamp Duty: ₹", wb.stampDuty.toLocaleString("en-IN")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Registration (1%): ₹", wb.regFee.toLocaleString("en-IN")] })]
											})]
										}, p.id);
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 font-semibold text-ink",
										children: "Title & Legal Status"
									}), comparedProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-5 border-l border-line",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-verdigris font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(h, {
												size: 16,
												weight: "fill"
											}), "100% Freehold Verified"]
										})
									}, p.id))]
								}),
								ALL_AMENITIES.map((amenity) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-paper-2/30 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 text-muted font-medium pl-6",
										children: amenity
									}), comparedProperties.map((p) => {
										const has = (p.amenities || []).some((a) => a.toLowerCase().includes(amenity.toLowerCase()));
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-4 border-l border-line text-center",
											children: has ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-verdigris/15 text-verdigris",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$1, {
													size: 14,
													weight: "bold"
												})
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block text-muted/40 font-mono text-xs",
												children: "—"
											})
										}, p.id);
									})]
								}, amenity)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-paper-2/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-6 font-bold uppercase tracking-wider text-xs text-ink",
										children: "Actions"
									}), comparedProperties.map((p) => {
										const waText = encodeURIComponent(`Hello SS Property, I am comparing "${p.title}" (${p.locality}, priced at ${formatPrice(p.price_inr, p.price_display)}). Please share the complete inspection dossier and schedule a site visit.`);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-6 border-l border-line space-y-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `${SITE.whatsapp}?text=${waText}`,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center justify-center gap-2 rounded-full bg-verdigris px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-verdigris/90 transition-colors w-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
													size: 15,
													weight: "fill"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inquire WhatsApp" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/property/$slug",
												params: { slug: p.slug },
												className: "flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-paper hover:bg-ink-2 transition-colors w-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Full Specs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
													size: 13,
													weight: "bold"
												})]
											})]
										}, p.id);
									})]
								})
							]
						})]
					})
				})
			}),
			showAddPicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md",
				role: "dialog",
				onClick: () => setShowAddPicker(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl border border-line bg-white shadow-2xl flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-line p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold text-ink",
							children: "Add Residence to Compare"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddPicker(false),
							className: "rounded-full bg-paper-2 p-2 text-muted hover:text-ink transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, { size: 18 })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-y-auto p-5 divide-y divide-line",
						children: allProperties.map((p) => {
							const compared = isCompared(p.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-3 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.main_image_thumb || p.main_image,
										alt: p.title,
										className: "h-12 w-12 rounded-xl object-cover shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs font-bold text-ink",
											children: p.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted",
											children: [
												p.locality,
												" • ",
												p.bhk_type,
												" • ",
												formatPrice(p.price_inr, p.price_display)
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: compared || comparedProperties.length >= 4,
									onClick: () => {
										toggle(p);
										setShowAddPicker(false);
									},
									className: `rounded-full px-4 py-1.5 text-xs font-semibold transition-all shrink-0 ${compared ? "bg-paper-2 text-muted cursor-not-allowed" : "bg-ink text-paper hover:bg-ink-2"}`,
									children: compared ? "Added" : "+ Compare"
								})]
							}, p.id);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {})
		]
	});
}
//#endregion
export { ComparePage as component };
