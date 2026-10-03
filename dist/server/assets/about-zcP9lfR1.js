import { o as require_jsx_runtime, s as require_react, u as __toESM } from "./useStore-DOgV22Lo.js";
import { a as Link } from "./site-DOsTXA2M.js";
import { f as Route } from "./router-G-8Yvlqu.js";
import { i as Header, n as Footer, r as FooterSettingsContext, t as FloatingConcierge } from "./floating-concierge-6DxoyFRb.js";
import { t as FounderSection } from "./founder-section-CECFR0ZE.js";
import { t as initRevealOnScroll } from "./reveal-Vleb9PAD.js";
//#region src/routes/about.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { count, settings } = Route.useLoaderData();
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	const stats = [
		{
			value: settings.about_stat_1_value ?? `${count}+`,
			label: settings.about_stat_1_label ?? "Live verified listings",
			note: settings.about_stat_1_note ?? "Across 10 Kolkata prime corridors."
		},
		{
			value: settings.about_stat_2_value ?? "100%",
			label: settings.about_stat_2_label ?? "Papers checked",
			note: settings.about_stat_2_note ?? "Title, dues and approvals verified before listing."
		},
		{
			value: settings.about_stat_3_value ?? "1:1",
			label: settings.about_stat_3_label ?? "Dedicated advisor",
			note: settings.about_stat_3_note ?? "Founder-led personal assistance from search to registry."
		}
	];
	const waLink = settings.whatsapp_number ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}` : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-20 sm:pt-24 lg:pt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-b border-line bg-paper-2/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell py-14 md:py-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "eyebrow text-brass",
									children: ["About ", settings.brand_name ?? "Apex Living"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl",
									children: "We walk through every home before we list it."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-[15px] leading-relaxed text-muted",
									children: settings.about_intro ?? "Apex Living is a premier real estate advisory. We verify every listing in person - structure, papers, neighbourhood - so buyers see only what is real, and sellers deal only with serious people."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-line bg-white/70 py-14 sm:py-20 md:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FounderSection, {
							phone: settings.phone,
							instagram: settings.instagram_url,
							whatsapp: waLink,
							name: settings.founder_name,
							title: settings.founder_title,
							quote: settings.founder_quote
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell-wide grid gap-6 sm:gap-8 py-14 sm:py-16 md:grid-cols-3 border-b border-line reveal-stagger",
						children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-sheen rounded-2xl border border-brass/40 bg-white p-6 sm:p-8 shadow-xs hover:border-brass hover:shadow-lg hover:shadow-brass/10 hover:-translate-y-1 transition-all duration-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "stat-value font-display text-4xl sm:text-5xl font-bold text-ink",
									children: s.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm font-bold text-ink",
									children: s.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs sm:text-sm text-muted leading-relaxed",
									children: s.note
								})
							]
						}, s.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell-wide pb-24 pt-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2 reveal-stagger",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-sheen rounded-[var(--radius-card)] border border-brass/40 bg-white p-8 shadow-xs hover:border-brass hover:shadow-md transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-medium text-ink",
									children: "What we do"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-4 space-y-3 text-sm leading-relaxed text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Curated resale and new flats across Lake Town, Newtown, Kasba, Rajarhat and more." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Full-stack selling support: valuation, photography, listing, buyer screening." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Honest pricing guidance based on real closed deals, not asking prices." })
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-sheen rounded-[var(--radius-card)] border border-brass/40 bg-white p-8 shadow-xs hover:border-brass hover:shadow-md transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-2xl font-medium text-ink",
										children: "Talk to us"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm leading-relaxed text-muted",
										children: "Buying, selling or just figuring out the market - the conversation is free."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 flex flex-wrap gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: settings.phone ? `tel:${settings.phone.replace(/[^\d+]/g, "")}` : "tel:+919800000000",
											className: "inline-flex min-h-[44px] items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer",
											children: settings.phone ?? "+91 98000 00000"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/properties",
											className: "inline-flex min-h-[44px] items-center justify-center rounded-full border border-brass/40 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:shadow-xs cursor-pointer",
											children: "Browse Properties"
										})]
									})
								]
							})]
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
//#endregion
export { AboutPage as component };
