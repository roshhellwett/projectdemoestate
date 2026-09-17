import { o as require_jsx_runtime, s as require_react, u as __toESM } from "./useStore-DOgV22Lo.js";
import { h as SITE } from "./queries-BNpycgy1.js";
import { c as Route } from "./router-CDgPq_GY.js";
import { g as c, i as Header, n as Footer, r as FooterSettingsContext, s as c$1, t as FloatingConcierge, u as s, y as m } from "./floating-concierge-BKtwz0_0.js";
import { t as SellForm } from "./sell-form-B2Fx5Ceu.js";
import { n as p } from "./ArrowRight.es-Cv0hFc2D.js";
import { t as s$1 } from "./CheckCircle.es-CaN8AP6q.js";
import { t as h } from "./ShieldCheck.es-CD7uHZrs.js";
import { t as initRevealOnScroll } from "./reveal-Vleb9PAD.js";
//#region node_modules/@phosphor-icons/react/dist/defs/ArrowSquareOut.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var e = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M184,80V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H176A8,8,0,0,1,184,80Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M192,136v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64h72a8,8,0,0,1,0,16H48V208H176V136a8,8,0,0,1,16,0Zm32-96a8,8,0,0,0-8-8H152a8,8,0,0,0-5.66,13.66L172.69,72l-42.35,42.34a8,8,0,0,0,11.32,11.32L184,83.31l26.34,26.35A8,8,0,0,0,224,104Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M222,104a6,6,0,0,1-12,0V54.49l-69.75,69.75a6,6,0,0,1-8.48-8.48L201.51,46H152a6,6,0,0,1,0-12h64a6,6,0,0,1,6,6Zm-38,26a6,6,0,0,0-6,6v72a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V80a2,2,0,0,1,2-2h72a6,6,0,0,0,0-12H48A14,14,0,0,0,34,80V208a14,14,0,0,0,14,14H176a14,14,0,0,0,14-14V136A6,6,0,0,0,184,130Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M220,104a4,4,0,0,1-8,0V49.66l-73.16,73.17a4,4,0,0,1-5.66-5.66L206.34,44H152a4,4,0,0,1,0-8h64a4,4,0,0,1,4,4Zm-36,28a4,4,0,0,0-4,4v72a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V80a4,4,0,0,1,4-4h72a4,4,0,0,0,0-8H48A12,12,0,0,0,36,80V208a12,12,0,0,0,12,12H176a12,12,0,0,0,12-12V136A4,4,0,0,0,184,132Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/ArrowSquareOut.es.js
var o = import_react.forwardRef((e$1, t) => /* @__PURE__ */ import_react.createElement(p, {
	ref: t,
	...e$1,
	weights: e
}));
o.displayName = "ArrowSquareOutIcon";
var n = o;
//#endregion
//#region src/routes/partners.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
var PARTNER_BENEFITS = [
	{
		icon: m,
		title: "Real Estate Developers",
		body: "Showcase landmark residential towers, boutique projects, and commercial hubs to Kolkata's most qualified homebuyers and active NRI investors."
	},
	{
		icon: h,
		title: "CREDAI & RERA Aligned",
		body: "Every project listed under SS Property is backed by verified legal title checks, complete sanction approvals, and strict compliance standards."
	},
	{
		icon: c,
		title: "Institutional Collaboration",
		body: "From leading banking partners offering pre-approved mortgages to premier interior architects, our ecosystem covers the complete ownership journey."
	}
];
function PartnersPage() {
	const { partners, settings } = Route.useLoaderData();
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-14 lg:pt-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "relative overflow-hidden border-b border-line bg-radial-vignette py-16 md:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell max-w-5xl text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-ghost/40 px-4 py-1.5 text-xs font-semibold text-ink backdrop-blur-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(h, {
										size: 16,
										weight: "fill",
										className: "text-verdigris"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified Kolkata Developer Network" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-6 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl md:text-6xl",
									children: "Builders and brands we work with"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg",
									children: settings.partner_intro ?? "SS Property collaborates with Kolkata's most reputable real estate developers, certified builders, and apex industry bodies like CREDAI to bring you verified, dispute-free residences."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm font-semibold text-ink",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {
												size: 18,
												weight: "fill",
												className: "text-verdigris"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [partners.length, " Premier Builder Partners"] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {
												size: 18,
												weight: "fill",
												className: "text-verdigris"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100% Legal & Title Vetted" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {
												size: 18,
												weight: "fill",
												className: "text-verdigris"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0% Hidden Builder Markups" })]
										})
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shell-wide py-16 md:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Direct Developer Inventory"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
									children: "Associated Builders & Institutional Bodies"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-xl text-sm text-muted",
									children: "Official developer relationships giving you early-bird access, direct launch pricing, and priority unit selection."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6",
							children: partners.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerCard, { partner }, partner.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-y border-line bg-paper-2/60 py-16 md:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell-wide",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-2xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Ecosystem & Standards"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
									children: "Why Kolkata's top builders choose SS Property"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 grid gap-8 md:grid-cols-3",
								children: PARTNER_BENEFITS.map((b) => {
									const Icon = b.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-line bg-white p-8 shadow-xs transition-shadow hover:shadow-md",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-12 w-12 items-center justify-center rounded-xl bg-paper-2 text-brass border border-line/80",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													size: 24,
													weight: "regular"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-6 font-display text-xl font-medium text-ink",
												children: b.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-sm leading-relaxed text-muted",
												children: b.body
											})
										]
									}, b.title);
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell max-w-4xl py-20 md:py-28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-line bg-white p-8 md:p-14 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "Collaborate With Us"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
											children: "List your project with SS Property"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed text-muted",
											children: "Are you a real estate developer, landowner, or architectural brand looking to reach verified Kolkata buyers? Share your project details with our acquisitions desk."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SellForm, { kind: "partner" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-10 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted",
										children: "Direct Partnership Desk"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-base font-medium text-ink mt-0.5",
										children: "SS Property Acquisitions Team"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: SITE.whatsapp,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-2 rounded-full bg-verdigris px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$1, {
												size: 16,
												weight: "fill"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp Desk" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: SITE.phoneHref,
											className: "inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-5 py-2.5 text-xs font-semibold text-ink hover:bg-paper",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
												size: 15,
												className: "text-brass"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: SITE.phone })]
										})]
									})]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSettingsContext.Provider, {
				value: settings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			})
		]
	});
}
/**
* Static, non-moving partner card.
* Displays logo static with crisp presentation, description, and link.
*/
function PartnerCard({ partner }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col justify-between rounded-2xl border border-line bg-white p-6 md:p-7 shadow-xs transition-all duration-300 hover:border-brass/50 hover:shadow-lg hover:-translate-y-1 group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-24 w-full items-center justify-center rounded-xl bg-paper-2/40 border border-line/40 p-4 transition-colors group-hover:bg-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: partner.logo_url,
					alt: partner.name,
					width: 220,
					height: 80,
					loading: "lazy",
					decoding: "async",
					className: "max-h-16 w-auto max-w-[85%] object-contain filter transition-transform duration-300 group-hover:scale-105"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 font-display text-lg font-medium text-ink text-center",
				children: partner.name
			}),
			partner.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-muted text-center line-clamp-3",
				children: partner.description
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 pt-4 border-t border-line/50 text-center",
			children: partner.website_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: partner.website_url,
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex items-center gap-1.5 text-xs font-semibold text-brass hover:text-ink transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Visit Official Site" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 13 })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 text-[11px] font-medium text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {
					size: 13,
					className: "text-verdigris"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified Kolkata Partner" })]
			})
		})]
	});
}
//#endregion
export { PartnersPage as component };
