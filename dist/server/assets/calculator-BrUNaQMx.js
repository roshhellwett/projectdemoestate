import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { h as SITE } from "./queries-CWRitaKX.js";
import { u as Route } from "./router-torAfu0D.js";
import { n as FooterSettingsContext, r as Header, t as Footer } from "./footer-DIp35I2k.js";
import { r as c, s as s$1, t as FloatingConcierge, u as p } from "./floating-concierge-ByiScAdS.js";
import { t as s$2 } from "./CurrencyInr.es-CAsRsj7I.js";
import { t as h } from "./ShieldCheck.es-DXeEg2D1.js";
import { t as EmiCalculator } from "./emi-calculator-CyLTYXDi.js";
//#region node_modules/@phosphor-icons/react/dist/defs/Bank.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var e = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M24,108H44v48H32a12,12,0,0,0,0,24H224a12,12,0,0,0,0-24H212V108h20a12,12,0,0,0,6.29-22.22l-104-64a12,12,0,0,0-12.58,0l-104,64A12,12,0,0,0,24,108Zm44,0H92v48H68Zm72,0v48H116V108Zm48,48H164V108h24ZM128,46.09,189.6,84H66.4ZM252,208a12,12,0,0,1-12,12H16a12,12,0,0,1,0-24H240A12,12,0,0,1,252,208Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M232,96H24L128,32Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M24,104H48v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16H208V104h24a8,8,0,0,0,4.19-14.81l-104-64a8,8,0,0,0-8.38,0l-104,64A8,8,0,0,0,24,104Zm40,0H96v64H64Zm80,0v64H112V104Zm48,64H160V104h32ZM128,41.39,203.74,88H52.26ZM248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208ZM16.3,98.18a8,8,0,0,1,3.51-9l104-64a8,8,0,0,1,8.38,0l104,64A8,8,0,0,1,232,104H208v64h16a8,8,0,0,1,0,16H32a8,8,0,0,1,0-16H48V104H24A8,8,0,0,1,16.3,98.18ZM144,160a8,8,0,0,0,16,0V112a8,8,0,0,0-16,0Zm-48,0a8,8,0,0,0,16,0V112a8,8,0,0,0-16,0Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M24,102H50v68H32a6,6,0,0,0,0,12H224a6,6,0,0,0,0-12H206V102h26a6,6,0,0,0,3.14-11.11l-104-64a6,6,0,0,0-6.28,0l-104,64A6,6,0,0,0,24,102Zm38,0H98v68H62Zm84,0v68H110V102Zm48,68H158V102h36ZM128,39l82.8,51H45.2ZM246,208a6,6,0,0,1-6,6H16a6,6,0,0,1,0-12H240A6,6,0,0,1,246,208Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M24,104H48v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16H208V104h24a8,8,0,0,0,4.19-14.81l-104-64a8,8,0,0,0-8.38,0l-104,64A8,8,0,0,0,24,104Zm40,0H96v64H64Zm80,0v64H112V104Zm48,64H160V104h32ZM128,41.39,203.74,88H52.26ZM248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M24,100H52v72H32a4,4,0,0,0,0,8H224a4,4,0,0,0,0-8H204V100h28a4,4,0,0,0,2.1-7.41l-104-64a4,4,0,0,0-4.2,0l-104,64A4,4,0,0,0,24,100Zm36,0h40v72H60Zm88,0v72H108V100Zm48,72H156V100h40ZM128,36.7,217.87,92H38.13ZM244,208a4,4,0,0,1-4,4H16a4,4,0,0,1,0-8H240A4,4,0,0,1,244,208Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Bank.es.js
var a = import_react.forwardRef((e$1, r) => /* @__PURE__ */ import_react.createElement(p, {
	ref: r,
	...e$1,
	weights: e
}));
a.displayName = "BankIcon";
var s = a;
//#endregion
//#region src/routes/calculator.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function CalculatorPage() {
	const { settings } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSettingsContext.Provider, {
		value: settings,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-dvh bg-paper text-ink selection:bg-brass-ghost",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "pt-14 lg:pt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "border-b border-line bg-paper-2/70 py-14 md:py-20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shell max-w-4xl text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 rounded-full border border-brass/40 bg-white px-3.5 py-1 text-xs font-semibold text-ink shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {
											size: 14,
											weight: "fill",
											className: "text-brass"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Financial Transparency" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-4 font-display text-4xl md:text-5xl font-medium tracking-tight text-ink",
										children: "Kolkata Real Estate Financial Planner"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed",
										children: "Estimate your monthly repayments, loan eligibility, and West Bengal municipal stamp duty & registration charges with complete accuracy."
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "shell py-14 md:py-20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmiCalculator, {
								initialPrice: 12e6,
								title: "Comprehensive Kolkata Property Loan & Tax Calculator"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "border-t border-line bg-paper-2/60 py-16 md:py-24",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shell max-w-5xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center max-w-2xl mx-auto mb-14",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "eyebrow text-brass",
												children: "Government Regulation"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-2 font-display text-3xl font-medium tracking-tight text-ink",
												children: "Understanding West Bengal Property Registration"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-xs text-muted",
												children: "Legal breakdown of registration rates across Kolkata Municipal Corporation (KMC) and Bidhannagar / Newtown development authorities."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-6 md:grid-cols-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-line bg-white p-6 shadow-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$2, {
															size: 20,
															weight: "bold"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "mt-4 font-display text-lg font-bold text-ink",
														children: "Stamp Duty Rates"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-2 text-xs text-muted leading-relaxed",
														children: [
															"Under Kolkata Municipal Corporation (KMC) jurisdiction: ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "6%" }),
															" for properties valued up to ₹1 Crore, and ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "7%" }),
															" for properties exceeding ₹1 Crore."
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-line bg-white p-6 shadow-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(h, {
															size: 20,
															weight: "bold"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "mt-4 font-display text-lg font-bold text-ink",
														children: "Registration Fee"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-2 text-xs text-muted leading-relaxed",
														children: [
															"A flat ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "1%" }),
															" registration fee applies on the total market deed value, paid directly to the Directorate of Registration and Stamp Revenue, West Bengal."
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-line bg-white p-6 shadow-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
															size: 20,
															weight: "bold"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "mt-4 font-display text-lg font-bold text-ink",
														children: "Bank Loan Pre-Approval"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-2 text-xs text-muted leading-relaxed",
														children: [
															"Nationalized & private banks (SBI, HDFC, ICICI, Axis) typically finance between ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "75% to 80%" }),
															" of the total agreement value for salaried and business applicants."
														]
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-12 rounded-3xl border border-line bg-ink text-paper p-8 flex flex-col sm:flex-row items-center justify-between gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-2xl font-medium text-paper",
											children: "Need guidance with bank loans or deed valuation?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-paper/70",
											children: "Our in-house legal and banking advisors assist buyers throughout the loan sanctions and registration process."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `${SITE.whatsapp}?text=${encodeURIComponent("Hello SS Property, I need assistance with home loan eligibility and property registration costs in Kolkata.")}`,
											target: "_blank",
											rel: "noreferrer",
											className: "flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink shrink-0 hover:bg-brass-2 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
												size: 16,
												weight: "fill"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Free Financial Consultation" })]
										})]
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})
	});
}
//#endregion
export { CalculatorPage as component };
