import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { n as formatDate } from "./format-CHtBtEr_.js";
import { c as Route } from "./router-Ct8kJVV4.js";
import { i as SITE, n as Footer, r as Header, t as initRevealOnScroll } from "./reveal-CUTgRsUv.js";
import { t as PropertyCard } from "./property-card-CovbnlJ_.js";
//#region src/routes/index.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const { featured, latest, reels, posts, faqs } = Route.useLoaderData();
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative flex min-h-[92dvh] items-center overflow-hidden pt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 -z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-paper-2/70 via-paper to-paper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brass-ghost blur-3xl" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shell-wide grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow reveal",
								children: "Kolkata · Verified Listings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "reveal mt-5 font-display text-[clamp(2.75rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-ink",
								children: [
									"Homes worth the",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "italic",
										children: "grand tour."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "reveal mt-6 max-w-md text-[15px] leading-relaxed text-muted",
								children: "Hand-verified flats, penthouses and commercial spaces across Kolkata. Every listing walked through, every paper checked."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal mt-9 flex flex-wrap items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/properties",
									className: "rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 active:translate-y-0",
									children: "Browse Properties"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: SITE.whatsapp,
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50",
									children: "Talk to Us"
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "reveal relative hidden lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCluster, { properties: featured })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shell-wide py-20 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reveal flex items-end justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
							children: "Featured residences"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-sm text-muted",
							children: "The pick of this season across Lake Town, Newtown and Kasba."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/properties",
							className: "hidden shrink-0 text-sm font-semibold text-brass transition-colors hover:text-ink sm:block",
							children: "View all →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: featured.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "reveal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, {
								property: p,
								priority: true
							})
						}, p.id))
					})]
				}),
				latest.length > 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y border-line bg-paper-2 py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shell-wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "reveal font-display text-2xl font-medium tracking-tight text-ink md:text-3xl",
							children: "Fresh on the market"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
							children: latest.slice(3, 6).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "reveal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p })
							}, p.id))
						})]
					})
				}) : null,
				reels.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shell-wide py-20 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reveal flex items-end justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
							children: "Straight from our reels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SITE.instagram,
							target: "_blank",
							rel: "noreferrer",
							className: "hidden shrink-0 text-sm font-semibold text-brass transition-colors hover:text-ink sm:block",
							children: "Follow @sspropertykol →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelRow, { reels })]
				}) : null,
				posts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-line bg-ink py-20 text-paper md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shell-wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "reveal flex items-end justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-medium tracking-tight md:text-4xl",
								children: "From the journal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journal",
								className: "hidden shrink-0 text-sm font-semibold text-brass-2 transition-colors hover:text-paper sm:block",
								children: "All articles →"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-6 md:grid-cols-3",
							children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/journal/$slug",
								params: { slug: post.slug },
								className: "reveal group block rounded-[var(--radius-card)] border border-line-dark bg-ink-2 p-6 transition-colors hover:border-brass/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										className: "text-xs text-paper/50",
										children: formatDate(post.publish_date)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-3 font-display text-xl font-medium leading-snug transition-colors group-hover:text-brass-2",
										children: post.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 line-clamp-3 text-sm leading-relaxed text-paper/60",
										children: post.excerpt || post.content.slice(0, 140)
									})
								]
							}, post.id))
						})]
					})
				}) : null,
				faqs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shell py-20 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "reveal font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
						children: "Questions, answered"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, { faqs })]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "shell-wide pb-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reveal relative overflow-hidden rounded-[var(--radius-card)] bg-ink px-8 py-16 text-center text-paper md:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brass/20 blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "relative font-display text-3xl font-medium tracking-tight md:text-5xl",
								children: "Selling? We put your property in front of the right buyers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "relative mx-auto mt-4 max-w-md text-sm text-paper/60",
								children: "Fair valuation, verified footfalls, zero pressure."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sell",
								className: "relative mt-8 inline-flex rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5",
								children: "List Your Property"
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function HeroCluster({ properties }) {
	const p1 = properties[0];
	const p2 = properties[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [p1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[0_32px_64px_-24px_rgba(18,16,14,0.25)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p1.main_image,
				alt: p1.title,
				width: 800,
				height: 600,
				className: "aspect-[4/3] w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold text-ink",
					children: p1.locality
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: p1.bhk_type
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold text-brass",
					children: "Featured"
				})]
			})]
		}) : null, p2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute -bottom-10 -left-10 hidden w-64 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-paper shadow-xl xl:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p2.main_image_thumb || p2.main_image,
				alt: p2.title,
				width: 256,
				height: 192,
				className: "aspect-[4/3] w-full object-cover"
			})
		}) : null]
	});
}
function ReelRow({ reels }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
		children: reels.map((reel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: reel.reel_url,
			target: "_blank",
			rel: "noreferrer",
			className: "reveal group relative block overflow-hidden rounded-2xl border border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: reel.cover_thumb || reel.cover_image,
				alt: reel.title,
				width: 400,
				height: 500,
				loading: "lazy",
				className: "aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-paper",
					children: reel.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-paper/70",
					children: "Watch on Instagram"
				})]
			})]
		}, reel.id))
	});
}
function FaqList({ faqs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 grid gap-4 md:grid-cols-2",
		children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "reveal group rounded-[var(--radius-input)] border border-line bg-white p-5 open:bg-paper-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer list-none text-[15px] font-semibold text-ink marker:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center justify-between gap-4",
					children: [f.question, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brass transition-transform group-open:rotate-45",
						children: "+"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: f.answer
			})]
		}, f.id))
	});
}
//#endregion
export { HomePage as component };
