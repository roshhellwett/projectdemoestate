import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { h as SITE } from "./queries-CvKpVwrU.js";
import { l as Route } from "./router-BHtHu75X.js";
import { a as InstagramIcon, i as Header, n as Footer, r as FooterSettingsContext, t as FloatingConcierge } from "./floating-concierge-C5nRxAqq.js";
import { t as initRevealOnScroll } from "./reveal-D_F53lYS.js";
//#region src/routes/instagram.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InstagramPage() {
	const { reels, settings } = Route.useLoaderData();
	const instaUrl = settings.instagram_url || SITE.instagram;
	const instaHandle = settings.instagram_handle || SITE.instagramHandle;
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-14 lg:pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-b border-line bg-paper-2/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell py-14 md:py-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 rounded-full border border-brass/40 bg-white px-3.5 py-1 text-xs font-semibold text-ink shadow-xs mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramIcon, {
										size: 14,
										className: "text-brass"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Official Channel · @", instaHandle] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-4xl font-medium tracking-tight text-ink md:text-5xl",
									children: "Instagram Walkthroughs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-lg text-sm leading-relaxed text-muted",
									children: "Live on-ground walkthroughs, verified site inspections, and transparent Kolkata real estate advice. Tap any post to view directly on Instagram."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: instaUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-paper shadow-xs hover:bg-ink-2 hover:shadow-md transition-all active:translate-y-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramIcon, {
												size: 15,
												className: "text-brass-2"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Follow @",
												instaHandle,
												" on Instagram"
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/properties",
										className: "inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-xs font-semibold text-ink hover:border-brass transition-colors shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Browse All Properties" })
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell-wide py-12 sm:py-16",
						children: reels.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell py-24 text-center text-sm text-muted",
							children: [
								"New walkthroughs and posts are on their way. Check back soon or follow @",
								instaHandle,
								" directly on Instagram."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold tracking-wider uppercase text-muted",
								children: [
									"Showing ",
									reels.length,
									" ",
									reels.length === 1 ? "Post" : "Posts"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: instaUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "text-xs font-semibold text-brass hover:text-ink transition-colors flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Instagram Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-4 sm:gap-6",
							children: reels.map((reel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: reel.reel_url,
								target: "_blank",
								rel: "noreferrer",
								className: "reel-tile reveal group relative block w-full max-w-[240px] sm:max-w-[260px] overflow-hidden rounded-2xl border border-brass/50 bg-ink shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-xl shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-[4/5] w-full overflow-hidden bg-ink-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: reel.cover_thumb || reel.cover_image,
										alt: reel.title,
										width: 360,
										height: 450,
										loading: "lazy",
										decoding: "async",
										className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md border border-white/20 shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramIcon, { size: 14 })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-3.5 pt-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-medium leading-snug text-paper line-clamp-2",
										children: reel.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex items-center gap-1 text-[11px] font-medium text-brass-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Watch on Instagram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "transition-transform duration-300 group-hover:translate-x-0.5",
											children: "↗"
										})]
									})]
								})]
							}, reel.id))
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-t border-line bg-paper-2/40 py-12 sm:py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell max-w-3xl text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink",
									children: "Never miss an off-market opportunity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted max-w-xl mx-auto",
									children: "We share preliminary walkthroughs and new developer allocations on Instagram before they are publicly listed."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: instaUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-2 rounded-full border border-brass/50 bg-white px-6 py-3 text-xs font-semibold text-ink shadow-xs hover:border-brass hover:text-brass-dark hover:shadow-md transition-all",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramIcon, {
												size: 15,
												className: "text-brass"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Follow @", instaHandle] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })
										]
									})
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
//#endregion
export { InstagramPage as component };
