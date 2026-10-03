import { o as require_jsx_runtime, s as require_react, u as __toESM } from "./useStore-DOgV22Lo.js";
import { r as SITE } from "./site-DOsTXA2M.js";
import { c as Route } from "./router-YMIUhzpp.js";
import { _ as c, b as m, d as s, i as Header, n as Footer, r as FooterSettingsContext, s as c$1, t as FloatingConcierge, x as n } from "./floating-concierge-6DxoyFRb.js";
import { t as SellForm } from "./sell-form-EEoFvpWw.js";
import { t as s$1 } from "./CheckCircle.es-CaN8AP6q.js";
import { t as h } from "./ShieldCheck.es-CD7uHZrs.js";
import { t as initRevealOnScroll } from "./reveal-Vleb9PAD.js";
//#region src/routes/partners.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
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
		body: "Every project listed under our platform is backed by verified legal title checks, complete sanction approvals, and strict compliance standards."
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
				className: "pt-20 sm:pt-24 lg:pt-28",
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
									children: settings.partner_intro ?? "We collaborate with Kolkata's most reputable real estate developers, certified builders, and apex industry bodies like CREDAI to bring you verified, dispute-free residences."
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
									children: "Why top builders choose our platform"
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
											children: "List your project with our advisory"
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
										children: "Advisory & Acquisitions Team"
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
