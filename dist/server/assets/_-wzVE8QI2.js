import { o as require_jsx_runtime } from "./useStore-DOgV22Lo.js";
import { t as Link } from "./link-BSOdsSRj.js";
import { f, i as Header, m as n, n as Footer, t as FloatingConcierge } from "./floating-concierge-Dgrc5MYp.js";
import { t as s } from "./Sparkle.es-Hri6rVZB.js";
//#region src/routes/$.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink flex flex-col justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 flex items-center justify-center px-4 sm:px-6 py-20 pt-28 sm:pt-36",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md text-center rounded-3xl border border-brass/40 bg-white/90 p-8 sm:p-10 shadow-xl shadow-brass/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-brass/30 bg-brass-ghost px-3.5 py-1 text-xs font-semibold text-brass-dark mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
								size: 13,
								weight: "fill",
								className: "text-brass"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "404 - Not Found" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink",
							children: "404"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "This address is currently unavailable. Our prime residential and commercial listings are actively verified and waiting for you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md transition-all hover:bg-ink-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Home" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/properties",
								className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-brass/40 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:border-brass transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore Listings" })]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {})
		]
	});
}
//#endregion
export { NotFoundPage as component };
