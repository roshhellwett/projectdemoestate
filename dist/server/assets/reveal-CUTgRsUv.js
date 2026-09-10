import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { n as useMatchRoute } from "./Matches-Bjl6fKAK.js";
import { n as Wordmark, t as Monogram } from "./brand-DsEEJCZg.js";
//#region src/lib/site.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Site-wide constants - business identity, contact, nav.
* Source: the client's old live site footer (recovered 2026-09-10).
*/
var SITE = {
	name: "SS Property",
	tagline: "Premium Real Estate in Kolkata",
	phone: "+91 94296 93786",
	phoneHref: "tel:+919429693786",
	whatsapp: "https://wa.me/919429693786",
	email: "writetous@ssproperty.in",
	emailHref: "mailto:writetous@ssproperty.in",
	city: "Kolkata, West Bengal",
	instagram: "https://instagram.com/sspropertykol",
	facebook: "https://facebook.com/sspropertykol",
	youtube: "https://youtube.com/@SSProperty"
};
var NAV_LINKS = [
	{
		label: "Properties",
		to: "/properties"
	},
	{
		label: "Sell",
		to: "/sell"
	},
	{
		label: "Journal",
		to: "/journal"
	},
	{
		label: "About",
		to: "/about"
	}
];
var FOOTER_SERVICES = [
	{
		label: "Buy a Property",
		to: "/properties"
	},
	{
		label: "Sell Your Property",
		to: "/sell"
	},
	{
		label: "Partner With Us",
		to: "/partner"
	}
];
//#endregion
//#region src/components/header.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Site header: fixed top, translucent paper over blur once scrolled.
* Scroll detection uses an IntersectionObserver on a top sentinel -
* no scroll listeners, no per-frame work.
*/
function Header() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const sentinelRef = (0, import_react.useRef)(null);
	const matchRoute = useMatchRoute();
	(0, import_react.useEffect)(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;
		const io = new IntersectionObserver((entries) => setScrolled(!entries[0]?.isIntersecting), { rootMargin: "-24px 0px 0px 0px" });
		io.observe(sentinel);
		return () => io.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: sentinelRef,
			className: "absolute left-0 top-0 h-px w-full",
			"aria-hidden": "true"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: `fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || open ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell flex h-16 items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "SS Property home",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-8 md:flex",
						"aria-label": "Primary",
						children: [NAV_LINKS.map((link) => {
							const active = !!matchRoute({
								to: link.to,
								fuzzy: true
							});
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: `text-[13px] font-medium tracking-wide transition-colors hover:text-ink ${active ? "text-ink" : "text-muted"}`,
								children: link.label
							}, link.to);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SITE.whatsapp,
							target: "_blank",
							rel: "noreferrer",
							className: "rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-transform hover:-translate-y-0.5 active:translate-y-0",
							children: "Book a Visit"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-expanded": open,
						"aria-label": open ? "Close menu" : "Open menu",
						className: "flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden",
						onClick: () => setOpen((v) => !v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative block h-3 w-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-0 h-px w-4 bg-ink transition-all ${open ? "top-1.5 rotate-45" : ""}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-1.5 h-px w-4 bg-ink transition-all ${open ? "opacity-0" : ""}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-3 h-px w-4 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : ""}` })
							]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `fixed inset-0 z-30 bg-paper transition-opacity duration-300 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`,
			"aria-hidden": !open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col justify-center gap-2 px-8 pt-16",
				children: [NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					onClick: () => setOpen(false),
					className: "border-b border-line py-5 font-display text-3xl text-ink",
					children: link.label
				}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: SITE.whatsapp,
					target: "_blank",
					rel: "noreferrer",
					className: "mt-8 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper",
					children: "Book a Visit"
				})]
			})
		})
	] });
}
//#endregion
//#region src/components/footer.tsx
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line-dark bg-ink text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, { className: "h-9 w-9 text-brass-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold",
						children: "SS Property"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xs text-sm leading-relaxed text-paper/60",
					children: "Verified homes and commercial spaces across Kolkata. Lake Town, Newtown, Kasba, Rajarhat and greater Kolkata."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "eyebrow text-brass-2",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3 text-sm",
					children: NAV_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-paper/70 transition-colors hover:text-paper",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "eyebrow text-brass-2",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3 text-sm",
					children: FOOTER_SERVICES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-paper/70 transition-colors hover:text-paper",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "eyebrow text-brass-2",
						children: "Get in Touch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-sm text-paper/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SITE.phoneHref,
								className: "transition-colors hover:text-paper",
								children: SITE.phone
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SITE.emailHref,
								className: "transition-colors hover:text-paper",
								children: SITE.email
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: SITE.city })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-4 text-xs font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SITE.instagram,
								target: "_blank",
								rel: "noreferrer",
								className: "text-paper/60 hover:text-paper",
								children: "Instagram"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SITE.facebook,
								target: "_blank",
								rel: "noreferrer",
								className: "text-paper/60 hover:text-paper",
								children: "Facebook"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SITE.youtube,
								target: "_blank",
								rel: "noreferrer",
								className: "text-paper/60 hover:text-paper",
								children: "YouTube"
							})
						]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line-dark",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper/50 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" SS Property. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Verified listings. Transparent pricing. No hidden charges." })]
			})
		})]
	});
}
//#endregion
//#region src/lib/reveal.ts
/**
* Scroll-reveal via IntersectionObserver. No scroll listeners, no React state -
* the observer adds .is-visible directly so React never re-renders.
*
* For route content, call initRevealOnScroll() once per route component mount
* (see src/routes/* layout components).
*/
function initRevealOnScroll(root = document) {
	const els = root.querySelectorAll(".reveal:not(.is-visible)");
	if (els.length === 0) return;
	const io = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			entry.target.classList.add("is-visible");
			io.unobserve(entry.target);
		}
	}, {
		threshold: .15,
		rootMargin: "0px 0px -40px 0px"
	});
	els.forEach((el) => io.observe(el));
}
//#endregion
export { SITE as i, Footer as n, Header as r, initRevealOnScroll as t };
