import { t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
//#region src/components/sections.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Partner logo wall: marquee of the client's real partner logos
* (public/images/partners/*). Logos only - no category labels.
* Duplicated track content keeps the loop seamless.
*/
function PartnerWall({ partners }) {
	if (partners.length === 0) return null;
	const row = [...partners, ...partners];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-label": "Our partners",
		className: "border-y border-line bg-paper-2/70 py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell-wide",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "reveal text-center font-display text-xl font-medium tracking-tight text-ink md:text-2xl",
				children: "Builders and brands we work with"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "marquee reveal mt-10",
				"aria-hidden": false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "marquee-track items-center gap-16 px-8",
					children: row.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "shrink-0 py-2",
						children: p.website_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: p.website_url,
							target: "_blank",
							rel: "noreferrer",
							title: p.name,
							className: "block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerLogo, { partner: p })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							title: p.name,
							className: "block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerLogo, { partner: p })
						})
					}, `${p.id}-${i}`))
				})
			})]
		})
	});
}
function PartnerLogo({ partner }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: partner.logo_url,
		alt: partner.name,
		width: 220,
		height: 70,
		decoding: "async",
		className: "h-12 w-auto object-contain opacity-70 transition-all duration-500 hover:opacity-100 md:h-14"
	});
}
/**
* Instagram reels section. Admin pastes reel links in the dashboard;
* they render ONLY here - nowhere else on the site.
* Click opens the reel on Instagram (covers stay fast, no embeds by default).
*/
function ReelsSection({ reels, instagram }) {
	if (reels.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Instagram reels",
		className: "shell-wide py-20 md:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "reveal flex items-end justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
				children: "Straight from our Instagram"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-sm text-muted",
				children: "Walkthroughs and site visits, as posted. Tap any to watch on Instagram."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: instagram,
				target: "_blank",
				rel: "noreferrer",
				className: "hidden shrink-0 text-sm font-semibold text-brass transition-colors hover:text-ink sm:block",
				children: "Follow @sspropertykol →"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
			children: reels.map((reel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: reel.reel_url,
				target: "_blank",
				rel: "noreferrer",
				className: "reel-tile reveal group relative block overflow-hidden rounded-2xl border border-line bg-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: reel.cover_thumb || reel.cover_image,
					alt: reel.title,
					width: 400,
					height: 500,
					loading: "lazy",
					decoding: "async",
					className: "aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-4 pt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium leading-snug text-paper",
						children: reel.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-1.5 text-xs text-paper/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 24 24",
							width: "13",
							height: "13",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "3",
									y: "3",
									width: "18",
									height: "18",
									rx: "5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "12",
									cy: "12",
									r: "4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "17.2",
									cy: "6.8",
									r: "1",
									fill: "currentColor",
									stroke: "none"
								})
							]
						}), "Watch on Instagram"]
					})]
				})]
			}, reel.id))
		})]
	});
}
/**
* Testimonials: what buyers and sellers said. Max 3 lines per quote.
*/
function TestimonialStrip({ testimonials }) {
	if (testimonials.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Client testimonials",
		className: "shell py-20 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "reveal font-display text-3xl font-medium tracking-tight text-ink md:text-4xl",
			children: "What our clients say"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-6 md:grid-cols-3",
			children: testimonials.slice(0, 6).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "reveal flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-white p-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "text-[15px] leading-relaxed text-ink/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "font-display text-3xl leading-none text-brass",
						children: "“"
					}), t.review_text.length > 220 ? `${t.review_text.slice(0, 217).trimEnd()}…` : t.review_text]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-ink",
							children: t.client_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted",
							children: t.client_location || "Kolkata"
						}),
						t.review_date ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] font-medium tracking-wide text-brass",
							children: "★".repeat(Math.min(5, Math.max(1, t.rating)))
						}) : null
					]
				})]
			}, t.id))
		})]
	});
}
//#endregion
export { ReelsSection as n, TestimonialStrip as r, PartnerWall as t };
