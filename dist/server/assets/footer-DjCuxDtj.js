import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { t as useNavigate } from "./useNavigate-Dc9WRbRN.js";
import { n as useMatchRoute } from "./Matches-Bjl6fKAK.js";
import { t as getSupabaseBrowser } from "./supabase-DLBQfxwj.js";
import { h as SITE, m as NAV_LINKS, p as FOOTER_SERVICES, u as listProperties } from "./queries-CiyZ0wST.js";
import { a as n$2, c as s$1, i as c, l as p$1, n as useCompare, r as n$1 } from "./floating-concierge-CF7Vqofe.js";
import { r as formatPrice, t as formatArea } from "./format-CHtBtEr_.js";
import { t as LogoImage } from "./brand-B9i4t7NP.js";
//#region node_modules/@phosphor-icons/react/dist/defs/Heart.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var a$2 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M178,42c-21,0-39.26,9.47-50,25.34C117.26,51.47,99,42,78,42a60.07,60.07,0,0,0-60,60c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,161.59,238,131.2,238,102A60.07,60.07,0,0,0,178,42ZM128,217.11C111.59,207.64,30,157.72,30,102A48.05,48.05,0,0,1,78,54c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,64.83,157.72,54,178,54a48.05,48.05,0,0,1,48,48C226,157.72,144.41,207.64,128,217.11Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M178,44c-21.44,0-39.92,10.19-50,27.07C117.92,54.19,99.44,44,78,44a58.07,58.07,0,0,0-58,58c0,28.59,18,58.47,53.4,88.79a333.81,333.81,0,0,0,52.7,36.73,4,4,0,0,0,3.8,0,333.81,333.81,0,0,0,52.7-36.73C218,160.47,236,130.59,236,102A58.07,58.07,0,0,0,178,44ZM128,219.42c-14-8-100-59.35-100-117.42A50.06,50.06,0,0,1,78,52c21.11,0,38.85,11.31,46.3,29.51a4,4,0,0,0,7.4,0C139.15,63.31,156.89,52,178,52a50.06,50.06,0,0,1,50,50C228,160,142,211.46,128,219.42Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/MagnifyingGlass.es.js
var a$1 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M226.83,221.17l-52.7-52.7a84.1,84.1,0,1,0-5.66,5.66l52.7,52.7a4,4,0,0,0,5.66-5.66ZM36,112a76,76,0,1,1,76,76A76.08,76.08,0,0,1,36,112Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/MapPin.es.js
var e$2 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,60a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,60Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,124Zm0-112a92.1,92.1,0,0,0-92,92c0,77.36,81.64,135.4,85.12,137.83a12,12,0,0,0,13.76,0,259,259,0,0,0,42.18-39C205.15,170.57,220,136.37,220,104A92.1,92.1,0,0,0,128,12Zm31.3,174.71A249.35,249.35,0,0,1,128,216.89a249.35,249.35,0,0,1-31.3-30.18C80,167.37,60,137.31,60,104a68,68,0,0,1,136,0C196,137.31,176,167.37,159.3,186.71Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M128,24a80,80,0,0,0-80,80c0,72,80,128,80,128s80-56,80-128A80,80,0,0,0,128,24Zm0,112a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,66a38,38,0,1,0,38,38A38,38,0,0,0,128,66Zm0,64a26,26,0,1,1,26-26A26,26,0,0,1,128,130Zm0-112a86.1,86.1,0,0,0-86,86c0,30.91,14.34,63.74,41.47,94.94a252.32,252.32,0,0,0,41.09,38,6,6,0,0,0,6.88,0,252.32,252.32,0,0,0,41.09-38c27.13-31.2,41.47-64,41.47-94.94A86.1,86.1,0,0,0,128,18Zm0,206.51C113,212.93,54,163.62,54,104a74,74,0,0,1,148,0C202,163.62,143,212.93,128,224.51Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,68a36,36,0,1,0,36,36A36,36,0,0,0,128,68Zm0,64a28,28,0,1,1,28-28A28,28,0,0,1,128,132Zm0-112a84.09,84.09,0,0,0-84,84c0,30.42,14.17,62.79,41,93.62a250,250,0,0,0,40.73,37.66,4,4,0,0,0,4.58,0A250,250,0,0,0,171,197.62c26.81-30.83,41-63.2,41-93.62A84.09,84.09,0,0,0,128,20Zm37.1,172.23A254.62,254.62,0,0,1,128,227a254.62,254.62,0,0,1-37.1-34.81C73.15,171.8,52,139.9,52,104a76,76,0,0,1,152,0C204,139.9,182.85,171.8,165.1,192.23Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/Phone.es.js
var e$1 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M224,154.8l-47.09-21.11-.18-.08a19.94,19.94,0,0,0-19,1.75,13.08,13.08,0,0,0-1.12.84l-22.31,19c-13-7.05-26.43-20.37-33.49-33.21l19.06-22.66a11.76,11.76,0,0,0,.85-1.15,20,20,0,0,0,1.66-18.83,1.42,1.42,0,0,1-.08-.18L101.2,32A20.06,20.06,0,0,0,80.42,20.15,60.27,60.27,0,0,0,28,80c0,81.61,66.39,148,148,148a60.27,60.27,0,0,0,59.85-52.42A20.06,20.06,0,0,0,224,154.8ZM176,204A124.15,124.15,0,0,1,52,80,36.29,36.29,0,0,1,80.48,44.46l18.82,42L80.14,109.28a12,12,0,0,0-.86,1.16A20,20,0,0,0,78,130.08c9.42,19.28,28.83,38.56,48.31,48A20,20,0,0,0,146,176.63a11.63,11.63,0,0,0,1.11-.85l22.43-19.07,42,18.81A36.29,36.29,0,0,1,176,204Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M223.94,174.08A48.33,48.33,0,0,1,176,216,136,136,0,0,1,40,80,48.33,48.33,0,0,1,81.92,32.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L89.32,117a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59l25-21.3a8,8,0,0,1,7.59-.69l47.16,21.13A8,8,0,0,1,223.94,174.08Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M221.59,160.3l-47.24-21.17a14,14,0,0,0-13.28,1.22,4.81,4.81,0,0,0-.56.42l-24.69,21a1.88,1.88,0,0,1-1.68.06c-15.87-7.66-32.31-24-40-39.65a1.91,1.91,0,0,1,0-1.68l21.07-25a6.13,6.13,0,0,0,.42-.58,14,14,0,0,0,1.12-13.27L95.73,34.49a14,14,0,0,0-14.56-8.38A54.24,54.24,0,0,0,34,80c0,78.3,63.7,142,142,142a54.25,54.25,0,0,0,53.89-47.17A14,14,0,0,0,221.59,160.3ZM176,210C104.32,210,46,151.68,46,80A42.23,42.23,0,0,1,82.67,38h.23a2,2,0,0,1,1.84,1.31l21.1,47.11a2,2,0,0,1,0,1.67L84.73,113.15a4.73,4.73,0,0,0-.43.57,14,14,0,0,0-.91,13.73c8.87,18.16,27.17,36.32,45.53,45.19a14,14,0,0,0,13.77-1c.19-.13.38-.27.56-.42l24.68-21a1.92,1.92,0,0,1,1.6-.1l47.25,21.17a2,2,0,0,1,1.21,2A42.24,42.24,0,0,1,176,210Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M220.78,162.13,173.56,141A12,12,0,0,0,162.18,142a3.37,3.37,0,0,0-.38.28L137,163.42a3.93,3.93,0,0,1-3.7.21c-16.24-7.84-33.05-24.52-40.89-40.57a3.9,3.9,0,0,1,.18-3.69l21.2-25.21c.1-.12.19-.25.28-.38a12,12,0,0,0,1-11.36L93.9,35.28a12,12,0,0,0-12.48-7.19A52.25,52.25,0,0,0,36,80c0,77.2,62.8,140,140,140a52.25,52.25,0,0,0,51.91-45.42A12,12,0,0,0,220.78,162.13ZM220,173.58A44.23,44.23,0,0,1,176,212C103.22,212,44,152.78,44,80A44.23,44.23,0,0,1,82.42,36a3.87,3.87,0,0,1,.48,0,4,4,0,0,1,3.67,2.49l21.11,47.14a4,4,0,0,1-.23,3.6l-21.19,25.2c-.1.13-.2.25-.29.39a12,12,0,0,0-.78,11.75c8.69,17.79,26.61,35.58,44.6,44.27a12,12,0,0,0,11.79-.87l.37-.28,24.83-21.12a3.93,3.93,0,0,1,3.57-.27l47.21,21.16A4,4,0,0,1,220,173.58Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Heart.es.js
var o$1 = import_react.forwardRef((r, t) => /* @__PURE__ */ import_react.createElement(p$1, {
	ref: t,
	...r,
	weights: a$2
}));
o$1.displayName = "HeartIcon";
var n = o$1;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/MagnifyingGlass.es.js
var o = import_react.forwardRef((s, n) => /* @__PURE__ */ import_react.createElement(p$1, {
	ref: n,
	...s,
	weights: a$1
}));
o.displayName = "MagnifyingGlassIcon";
var f = o;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/MapPin.es.js
var a = import_react.forwardRef((e, r) => /* @__PURE__ */ import_react.createElement(p$1, {
	ref: r,
	...e,
	weights: e$2
}));
a.displayName = "MapPinIcon";
var p = a;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Phone.es.js
var e = import_react.forwardRef((r, t) => /* @__PURE__ */ import_react.createElement(p$1, {
	ref: t,
	...r,
	weights: e$1
}));
e.displayName = "PhoneIcon";
var s = e;
//#endregion
//#region src/lib/favorites.ts
var STORAGE_KEY = "ssproperty_favorites_v1";
function readStorage() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function writeStorage(ids) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
		window.dispatchEvent(new CustomEvent("ssproperty_favorites_change", { detail: ids }));
	} catch (err) {
		console.error("Failed to save favorites", err);
	}
}
function toggleFavorite(id) {
	const list = readStorage();
	const index = list.indexOf(id);
	let next;
	let favorited;
	if (index >= 0) {
		next = list.filter((item) => item !== id);
		favorited = false;
	} else {
		next = [...list, id];
		favorited = true;
	}
	writeStorage(next);
	return favorited;
}
function useFavorites() {
	const [favorites, setFavorites] = (0, import_react.useState)(readStorage);
	(0, import_react.useEffect)(() => {
		const handleUpdate = () => {
			setFavorites(readStorage());
		};
		window.addEventListener("ssproperty_favorites_change", handleUpdate);
		window.addEventListener("storage", handleUpdate);
		return () => {
			window.removeEventListener("ssproperty_favorites_change", handleUpdate);
			window.removeEventListener("storage", handleUpdate);
		};
	}, []);
	return {
		favorites,
		count: favorites.length,
		isFavorite: (id) => favorites.includes(id),
		toggle: (id) => toggleFavorite(id)
	};
}
//#endregion
//#region src/components/spotlight-search.tsx
var import_jsx_runtime = require_jsx_runtime();
var PRESET_CHIPS = [
	{
		label: "Lake Town & Bangur",
		query: "Lake Town"
	},
	{
		label: "New Town AA-I & II",
		query: "Newtown"
	},
	{
		label: "Kasba EM Bypass",
		query: "Kasba"
	},
	{
		label: "Terrace & Penthouse",
		query: "Terrace"
	},
	{
		label: "Under ₹75 Lakhs",
		query: "Under 75"
	},
	{
		label: "3 BHK Luxury",
		query: "3 BHK"
	}
];
function SpotlightSearch({ isOpen, onClose }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [properties, setProperties] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		setTimeout(() => {
			inputRef.current?.focus();
		}, 50);
		if (properties.length === 0) {
			setLoading(true);
			const supabase = getSupabaseBrowser();
			listProperties(supabase, { limit: 50 }).then((data) => {
				setProperties(data);
				setLoading(false);
			}).catch(() => {
				setLoading(false);
			});
		}
	}, [isOpen]);
	(0, import_react.useEffect)(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else {
			document.body.style.overflow = "";
			setQuery("");
			setSelectedIndex(0);
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);
	const filtered = (0, import_react.useMemo)(() => {
		if (!query.trim()) return properties.slice(0, 8);
		const q = query.toLowerCase().trim();
		return properties.filter((p) => {
			if (q === "under 75" || q === "under 75 lakhs" || q === "under 75l") return p.price_inr && p.price_inr <= 75e5;
			return p.title.toLowerCase().includes(q) || p.locality.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.bhk_type.toLowerCase().includes(q) || p.description && p.description.toLowerCase().includes(q);
		});
	}, [properties, query]);
	const handleKeyDown = (e) => {
		if (e.key === "Escape") onClose();
		else if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prev) => prev < filtered.length - 1 ? prev + 1 : 0);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prev) => prev > 0 ? prev - 1 : filtered.length - 1);
		} else if (e.key === "Enter" && filtered[selectedIndex]) {
			e.preventDefault();
			const target = filtered[selectedIndex];
			onClose();
			navigate({
				to: `/property/$slug`,
				params: { slug: target.slug }
			});
		}
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "spotlight-search-modal",
		className: "fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-14 bg-black/60 backdrop-blur-md animate-in fade-in duration-200",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl rounded-3xl border border-line bg-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150",
			onClick: (e) => e.stopPropagation(),
			onKeyDown: handleKeyDown,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center border-b border-line px-5 py-4 bg-paper/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f, {
							size: 22,
							weight: "bold",
							className: "text-brass mr-3 shrink-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "text",
							value: query,
							onChange: (e) => {
								setQuery(e.target.value);
								setSelectedIndex(0);
							},
							placeholder: "Search by locality, project name, 2/3 BHK, or budget…",
							className: "w-full bg-transparent text-base font-medium text-ink placeholder:text-muted outline-hidden"
						}),
						query ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setQuery(""),
							className: "rounded-full p-1 text-muted hover:text-ink mr-2",
							title: "Clear search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$1, { size: 16 })
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold text-muted hover:text-ink transition-colors",
							children: "ESC"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 overflow-x-auto px-5 py-3 border-b border-line/60 bg-paper-2/40 text-xs scrollbar-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted shrink-0",
						children: "Presets:"
					}), PRESET_CHIPS.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setQuery(chip.query);
							setSelectedIndex(0);
						},
						className: "rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink whitespace-nowrap hover:border-brass hover:text-brass-dark transition-colors",
						children: chip.label
					}, chip.label))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-12 text-center text-sm text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Scanning Kolkata luxury residences…" })
					}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 text-center text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"No verified properties found matching \"",
							query,
							"\"."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs",
							children: "Try searching for \"Lake Town\", \"Newtown\", or \"3 BHK\"."
						})]
					}) : filtered.map((p$2, index) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => {
								onClose();
								navigate({
									to: `/property/$slug`,
									params: { slug: p$2.slug }
								});
							},
							onMouseEnter: () => setSelectedIndex(index),
							className: `flex items-center justify-between gap-4 rounded-2xl p-3 cursor-pointer transition-all ${index === selectedIndex ? "bg-brass/10 border border-brass/40 shadow-xs" : "hover:bg-paper border border-transparent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3.5 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p$2.main_image_thumb || p$2.main_image,
									alt: p$2.title,
									className: "h-14 w-14 shrink-0 rounded-xl object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-paper",
												children: p$2.bhk_type
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] font-semibold text-muted flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p, {
													size: 12,
													weight: "fill",
													className: "text-brass"
												}), p$2.locality]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 truncate text-sm font-bold text-ink",
											children: p$2.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-0.5 flex items-center gap-3 text-xs text-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatArea(p$2.area_sqft) }), p$2.facing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"• ",
												p$2.facing,
												" Facing"
											] }) : null]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-base font-bold text-ink",
									children: formatPrice(p$2.price_inr, p$2.price_display)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-end gap-1 text-xs font-bold text-brass",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {
										size: 13,
										weight: "bold"
									})]
								})]
							})]
						}, p$2.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line px-5 py-2.5 bg-paper text-[11px] text-muted flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Use ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "rounded border bg-white px-1 font-mono",
								children: "↑"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "rounded border bg-white px-1 font-mono",
								children: "↓"
							}),
							" to navigate"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded border bg-white px-1 font-mono",
							children: "Enter"
						}), " to open"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Showing ",
						filtered.length,
						" verified listings"
					] })]
				})
			]
		})
	});
}
//#endregion
//#region src/components/header.tsx
/**
* Site header: fixed top, translucent paper over blur once scrolled.
* Shows Favorites count, Compare count, Hotline, and luxury navigation.
*/
function Header() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [spotlightOpen, setSpotlightOpen] = (0, import_react.useState)(false);
	const sentinelRef = (0, import_react.useRef)(null);
	const matchRoute = useMatchRoute();
	const { count: favoritesCount } = useFavorites();
	const { count: compareCount } = useCompare();
	(0, import_react.useEffect)(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;
		const io = new IntersectionObserver((entries) => setScrolled(!entries[0]?.isIntersecting), { rootMargin: "-24px 0px 0px 0px" });
		io.observe(sentinel);
		return () => io.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSpotlightOpen((prev) => !prev);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
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
			className: `fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || open ? "border-b border-line bg-paper/90 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(18,16,14,0.08)]" : "border-b border-transparent bg-transparent"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell flex h-18 items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "SS Property home",
						onClick: () => setOpen(false),
						className: "flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoImage, { className: "h-8 md:h-10 transition-transform hover:scale-[1.02]" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-7 lg:flex",
						"aria-label": "Primary",
						children: NAV_LINKS.map((link) => {
							const active = !!matchRoute({
								to: link.to,
								fuzzy: true
							});
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: link.to,
								className: `relative text-[13px] font-semibold tracking-wide transition-colors hover:text-ink ${active ? "text-ink" : "text-muted"}`,
								children: [link.label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brass" }) : null]
							}, link.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-3.5 md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSpotlightOpen(true),
								className: "flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-brass hover:text-ink hover:bg-paper-2",
								title: "Spotlight Search (Ctrl + K)",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f, {
										size: 15,
										className: "text-brass"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden xl:inline",
										children: "Quick Search"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "hidden xl:inline-flex items-center rounded border border-line/80 bg-white px-1 text-[10px] font-mono text-muted",
										children: "⌘K"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/compare",
								"aria-label": "Compare selected residences",
								className: "relative flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brass hover:bg-paper-2",
								title: "Compare Residences",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, {
										size: 16,
										weight: compareCount > 0 ? "fill" : "regular",
										className: compareCount > 0 ? "text-brass" : "text-muted"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden xl:inline",
										children: "Compare"
									}),
									compareCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-brass text-[10px] font-bold text-ink",
										children: compareCount
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/properties",
								search: {
									locality: "All",
									bhk: ""
								},
								"aria-label": "View saved favorite properties",
								className: "relative flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brass hover:bg-paper-2",
								title: "Saved Properties",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, {
										size: 16,
										weight: favoritesCount > 0 ? "fill" : "regular",
										className: favoritesCount > 0 ? "text-danger" : "text-muted"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden xl:inline",
										children: "Saved"
									}),
									favoritesCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-paper",
										children: favoritesCount
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: SITE.phoneHref,
								className: "hidden 2xl:flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
									size: 14,
									className: "text-brass"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: SITE.phone })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: SITE.whatsapp,
								target: "_blank",
								rel: "noreferrer",
								className: "flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-all duration-300 hover:bg-ink-2 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
									size: 16,
									weight: "fill",
									className: "text-brass-2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a Visit" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 md:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSpotlightOpen(true),
								"aria-label": "Search properties",
								className: "flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink hover:border-brass",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f, { size: 17 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/compare",
								"aria-label": "Compare selected residences",
								className: "relative flex h-9 w-9 items-center justify-center rounded-full border border-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, {
									size: 17,
									weight: compareCount > 0 ? "fill" : "regular",
									className: compareCount > 0 ? "text-brass" : "text-muted"
								}), compareCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[9px] font-bold text-ink",
									children: compareCount
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/properties",
								search: {
									locality: "All",
									bhk: ""
								},
								"aria-label": "View saved favorite properties",
								className: "relative flex h-9 w-9 items-center justify-center rounded-full border border-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, {
									size: 17,
									weight: favoritesCount > 0 ? "fill" : "regular",
									className: favoritesCount > 0 ? "text-danger" : "text-muted"
								}), favoritesCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-bold text-paper",
									children: favoritesCount
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setOpen(!open),
								"aria-expanded": open,
								"aria-label": "Toggle navigation menu",
								className: "flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-paper",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-0.5 w-5 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}` })
								]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `fixed inset-0 z-30 bg-paper transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`,
			style: { top: "4.5rem" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell flex h-full flex-col justify-between py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-5",
					children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						onClick: () => setOpen(false),
						className: "font-display text-2xl font-medium text-ink transition-colors hover:text-brass",
						children: link.label
					}, link.to))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 pt-6 border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Connect With SS Property"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: SITE.whatsapp,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center justify-center gap-2 rounded-xl bg-verdigris py-3 text-sm font-semibold text-white shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
								size: 18,
								weight: "fill"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp an Advisor" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: SITE.phoneHref,
							className: "flex items-center justify-center gap-2 rounded-xl border border-line bg-paper-2 py-3 text-sm font-semibold text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
								size: 18,
								className: "text-brass"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Call: ", SITE.phone] })]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightSearch, {
			isOpen: spotlightOpen,
			onClose: () => setSpotlightOpen(false)
		})
	] });
}
//#endregion
//#region src/components/footer-settings.tsx
/**
* Footer settings context. Routes that already load site settings pass them
* here once; the Footer reads them without re-fetching. Routes that don't
* load settings simply leave it empty and the Footer falls back to defaults.
*/
var FooterSettingsContext = (0, import_react.createContext)(null);
function useFooterSettings() {
	return (0, import_react.useContext)(FooterSettingsContext);
}
//#endregion
//#region src/components/footer.tsx
/**
* Footer. Contact links/socials/footer note come from admin-editable site
* settings (via FooterSettingsContext) with recovered defaults as fallback.
*/
function Footer() {
	const settings = useFooterSettings() ?? {};
	const phone = settings.phone ?? SITE.phone;
	const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
	const email = settings.email ?? SITE.email;
	const city = settings.city ?? SITE.city;
	const instagram = settings.instagram_url ?? SITE.instagram;
	const facebook = settings.facebook_url ?? SITE.facebook;
	const youtube = settings.youtube_url ?? SITE.youtube;
	const footerNote = settings.footer_note ?? "Verified listings. Transparent pricing. No hidden charges.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line-dark bg-ink text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoImage, {
					dark: true,
					className: "h-10"
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
								href: phoneHref,
								className: "transition-colors hover:text-paper",
								children: phone
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${email}`,
								className: "transition-colors hover:text-paper",
								children: email
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: city })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-4 text-xs font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: instagram,
								target: "_blank",
								rel: "noreferrer",
								className: "text-paper/60 hover:text-paper",
								children: "Instagram"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: facebook,
								target: "_blank",
								rel: "noreferrer",
								className: "text-paper/60 hover:text-paper",
								children: "Facebook"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: youtube,
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
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: footerNote })]
			})
		})]
	});
}
//#endregion
export { p as a, useFavorites as i, FooterSettingsContext as n, f as o, Header as r, n as s, Footer as t };
