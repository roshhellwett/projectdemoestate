import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { n as formatDate } from "./format-CHtBtEr_.js";
import { i as Route } from "./router-B-0hxn_C.js";
import { i as Header, n as Footer, r as FooterSettingsContext, t as FloatingConcierge } from "./floating-concierge-C74YSySR.js";
import { t as initRevealOnScroll } from "./reveal-D_F53lYS.js";
//#region src/routes/journal.$slug.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JournalPostPage() {
	const { post, settings } = Route.useLoaderData();
	const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-14 lg:pt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "shell max-w-[760px] py-10 sm:py-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mb-6 flex items-center gap-2 text-xs font-semibold text-brass",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/journal",
								className: "inline-flex items-center gap-1.5 hover:text-ink transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "←" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Journal" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
							className: "text-xs font-medium text-muted",
							children: [
								formatDate(post.publish_date),
								" · ",
								post.author
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.75rem]",
							children: post.title
						}),
						post.cover_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 overflow-hidden rounded-2xl border border-brass/50 bg-paper-2 shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.cover_image,
								alt: post.title,
								width: 1200,
								height: 750,
								className: "aspect-[16/10] w-full object-cover"
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 space-y-6",
							children: paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[16px] leading-[1.85] text-ink/85",
								children: p
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 border-t border-line pt-8 flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journal",
								className: "inline-flex items-center gap-2 rounded-full border border-brass/50 bg-white px-5 py-2.5 text-xs font-semibold text-ink shadow-xs hover:border-brass hover:text-brass-dark transition-all",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "← All Articles" })
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSettingsContext.Provider, {
				value: settings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			})
		]
	});
}
//#endregion
export { JournalPostPage as component };
