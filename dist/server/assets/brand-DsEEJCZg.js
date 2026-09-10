import { t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
//#region src/components/brand.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Brand monogram - inline SVG, matches the client's favicon mark.
* A hand-rolled mark is allowed here: single, simple, geometric.
*/
function Monogram({ className = "h-8 w-8" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		fill: "none",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "1",
			y: "1",
			width: "38",
			height: "38",
			rx: "10",
			stroke: "currentColor",
			strokeWidth: "1.5",
			opacity: "0.35"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 27.5c2.2 1.6 4.6 2.3 7 2.3 3.8 0 6.2-1.7 6.2-4.4 0-2.5-1.8-3.8-6.3-4.9-3.9-1-5.4-2-5.4-3.8 0-2 1.9-3.4 4.8-3.4 2 0 4 .6 5.8 1.8",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round"
		})]
	});
}
/** Wordmark with monogram. */
function Wordmark({ className = "", dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-2.5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, { className: `h-9 w-9 ${dark ? "text-paper" : "text-ink"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `font-display text-xl font-semibold tracking-tight ${dark ? "text-paper" : "text-ink"}`,
			children: "SS Property"
		})]
	});
}
//#endregion
export { Wordmark as n, Monogram as t };
