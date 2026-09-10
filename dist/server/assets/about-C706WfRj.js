import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { s as Route } from "./router-Ct8kJVV4.js";
import { i as SITE, n as Footer, r as Header, t as initRevealOnScroll } from "./reveal-CUTgRsUv.js";
//#region src/routes/about.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { count } = Route.useLoaderData();
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-b border-line bg-paper-2/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell py-14 md:py-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "About us"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl",
									children: "We walk through every home before we list it."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-[15px] leading-relaxed text-muted",
									children: "SS Property is a Kolkata-based real estate advisory. We verify every listing in person - structure, papers, neighbourhood - so buyers see only what is real, and sellers deal only with serious people."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shell-wide grid gap-14 py-14 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-5xl font-medium text-ink",
										children: [count, "+"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-semibold text-ink",
										children: "Live verified listings"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: "Across 10 Kolkata localities."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-5xl font-medium text-ink",
										children: "100%"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-semibold text-ink",
										children: "Papers checked"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: "Title, dues and approvals verified before listing."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-5xl font-medium text-ink",
										children: "1:1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-semibold text-ink",
										children: "Dedicated advisor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: "One person owns your search end to end."
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell-wide pb-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal rounded-[var(--radius-card)] border border-line bg-white p-8",
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
								className: "reveal rounded-[var(--radius-card)] border border-line bg-white p-8",
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
											href: SITE.phoneHref,
											className: "rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5",
											children: SITE.phone
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/properties",
											className: "rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/50",
											children: "Browse Properties"
										})]
									})
								]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { AboutPage as component };
