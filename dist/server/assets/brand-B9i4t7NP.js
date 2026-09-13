import { t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
//#region src/components/brand.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Brand lockup. Uses the client's real logo (public/images/ss-logo-*.webp):
* - default: ink + brass recolor for the cream header
* - dark:    paper + brass recolor for the ink footer
* Height-normalized so the lockup sits on the text baseline.
*/
function LogoImage({ className = "h-9", dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: dark ? "/images/ss-logo-paper.webp" : "/images/ss-logo-ink.webp",
		alt: "SS Property",
		width: 406,
		height: 95,
		className: `${className} w-auto`
	});
}
//#endregion
export { LogoImage as t };
