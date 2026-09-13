import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as FloatingConcierge } from "./floating-concierge-BGBUTvpL.js";
import { n as FooterSettingsContext, r as Header, t as Footer } from "./footer-j8rSls8N.js";
import { n as formatDate } from "./format-CHtBtEr_.js";
import { i as Route } from "./router-C3IqD2jx.js";
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
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "shell max-w-[720px] py-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
							className: "text-xs text-muted",
							children: [
								formatDate(post.publish_date),
								" · ",
								post.author
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-[2.75rem]",
							children: post.title
						}),
						post.cover_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.cover_image,
							alt: post.title,
							width: 1200,
							height: 750,
							className: "mt-8 aspect-[16/10] w-full rounded-[var(--radius-img)] object-cover"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 space-y-6",
							children: paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[16px] leading-[1.8] text-ink/80",
								children: p
							}, i))
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
