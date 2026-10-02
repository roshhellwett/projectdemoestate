import { o as require_jsx_runtime, s as require_react, u as __toESM } from "./useStore-DOgV22Lo.js";
import { t as Link } from "./link-BSOdsSRj.js";
import { n as formatDate } from "./format-CHtBtEr_.js";
import { a as Route } from "./router-x1DthnIx.js";
import { i as Header, n as Footer, r as FooterSettingsContext, t as FloatingConcierge } from "./floating-concierge-Dgrc5MYp.js";
import { t as initRevealOnScroll } from "./reveal-Vleb9PAD.js";
//#region src/routes/journal.index.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JournalPage() {
	const { posts, settings } = Route.useLoaderData();
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	const [lead, ...rest] = posts;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-14 lg:pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-b border-line bg-paper-2/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shell py-14 md:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow text-brass",
								children: "Notes from the ground"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl",
								children: "The Journal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-md text-sm text-muted",
								children: settings.journal_intro ?? "Buyer guides, market notes and honest advice on Kolkata real estate."
							})
						]
					})
				}), posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shell py-24 text-center text-sm text-muted",
					children: "Articles are on their way. Check back soon."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shell-wide py-12",
					children: [lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/journal/$slug",
						params: { slug: lead.slug },
						className: "reveal group grid gap-8 rounded-2xl sm:rounded-3xl border border-brass/60 bg-white/70 p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-lg md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-xl sm:rounded-2xl border border-brass/30 bg-paper-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: lead.cover_thumb || lead.cover_image,
								alt: lead.title,
								width: 800,
								height: 500,
								className: "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "text-xs font-medium text-brass-dark",
									children: formatDate(lead.publish_date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-2xl font-medium leading-snug text-ink transition-colors group-hover:text-brass md:text-3xl lg:text-4xl",
									children: lead.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 line-clamp-3 text-sm leading-relaxed text-muted",
									children: lead.excerpt || lead.content.slice(0, 200)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass group-hover:text-brass-dark transition-colors",
									children: ["Read article ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "transition-transform duration-300 group-hover:translate-x-1",
										children: "→"
									})]
								})
							]
						})]
					}) : null, rest.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3",
						children: rest.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/journal/$slug",
							params: { slug: post.slug },
							className: "reveal group flex flex-col justify-between overflow-hidden rounded-2xl border border-brass/50 bg-white/70 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden rounded-xl border border-brass/30 bg-paper-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: post.cover_thumb || post.cover_image,
										alt: post.title,
										width: 600,
										height: 375,
										loading: "lazy",
										className: "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "mt-4 block text-xs text-muted",
									children: formatDate(post.publish_date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-lg sm:text-xl font-medium leading-snug text-ink transition-colors group-hover:text-brass",
									children: post.title
								}),
								post.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted",
									children: post.excerpt
								}) : null
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brass group-hover:text-brass-dark transition-colors",
								children: ["Read article ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "transition-transform duration-300 group-hover:translate-x-1",
									children: "→"
								})]
							})]
						}, post.id))
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSettingsContext.Provider, {
				value: settings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			})
		]
	});
}
//#endregion
export { JournalPage as component };
