import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { h as SITE } from "./queries-CmhGewy7.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
import { S as useFavorites, a as n$7, b as p, m as n$6, o as c, s as n$5, u as p$1, x as useCompare, y as s$2 } from "./floating-concierge-DyVy-3jA.js";
import { t as s$3 } from "./CheckCircle.es-DD1qz_AM.js";
import { t as c$1 } from "./Compass.es-DP2SpINY.js";
//#region node_modules/@phosphor-icons/react/dist/defs/ArrowsOut.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var e$3 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M220,48V96a12,12,0,0,1-24,0V77l-35.51,35.52a12,12,0,0,1-17-17L179,60H160a12,12,0,0,1,0-24h48A12,12,0,0,1,220,48ZM95.51,143.51,60,179V160a12,12,0,0,0-24,0v48a12,12,0,0,0,12,12H96a12,12,0,0,0,0-24H77l35.52-35.51a12,12,0,0,0-17-17ZM208,148a12,12,0,0,0-12,12v19l-35.51-35.52a12,12,0,0,0-17,17L179,196H160a12,12,0,0,0,0,24h48a12,12,0,0,0,12-12V160A12,12,0,0,0,208,148ZM77,60H96a12,12,0,0,0,0-24H48A12,12,0,0,0,36,48V96a12,12,0,0,0,24,0V77l35.51,35.52a12,12,0,0,0,17-17Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M208,48V208H48V48Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M216,48V96a8,8,0,0,1-16,0V67.31l-42.34,42.35a8,8,0,0,1-11.32-11.32L188.69,56H160a8,8,0,0,1,0-16h48A8,8,0,0,1,216,48ZM98.34,146.34,56,188.69V160a8,8,0,0,0-16,0v48a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16H67.31l42.35-42.34a8,8,0,0,0-11.32-11.32ZM208,152a8,8,0,0,0-8,8v28.69l-42.34-42.35a8,8,0,0,0-11.32,11.32L188.69,200H160a8,8,0,0,0,0,16h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152ZM67.31,56H96a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V67.31l42.34,42.35a8,8,0,0,0,11.32-11.32Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M109.66,146.34a8,8,0,0,1,0,11.32L83.31,184l18.35,18.34A8,8,0,0,1,96,216H48a8,8,0,0,1-8-8V160a8,8,0,0,1,13.66-5.66L72,172.69l26.34-26.35A8,8,0,0,1,109.66,146.34ZM83.31,72l18.35-18.34A8,8,0,0,0,96,40H48a8,8,0,0,0-8,8V96a8,8,0,0,0,13.66,5.66L72,83.31l26.34,26.35a8,8,0,0,0,11.32-11.32ZM208,40H160a8,8,0,0,0-5.66,13.66L172.69,72,146.34,98.34a8,8,0,0,0,11.32,11.32L184,83.31l18.34,18.35A8,8,0,0,0,216,96V48A8,8,0,0,0,208,40Zm3.06,112.61a8,8,0,0,0-8.72,1.73L184,172.69l-26.34-26.35a8,8,0,0,0-11.32,11.32L172.69,184l-18.35,18.34A8,8,0,0,0,160,216h48a8,8,0,0,0,8-8V160A8,8,0,0,0,211.06,152.61Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M214,48V96a6,6,0,0,1-12,0V62.48l-45.76,45.76a6,6,0,0,1-8.48-8.48L193.52,54H160a6,6,0,0,1,0-12h48A6,6,0,0,1,214,48ZM99.76,147.76,54,193.52V160a6,6,0,0,0-12,0v48a6,6,0,0,0,6,6H96a6,6,0,0,0,0-12H62.48l45.76-45.76a6,6,0,0,0-8.48-8.48ZM208,154a6,6,0,0,0-6,6v33.52l-45.76-45.76a6,6,0,0,0-8.48,8.48L193.52,202H160a6,6,0,0,0,0,12h48a6,6,0,0,0,6-6V160A6,6,0,0,0,208,154ZM62.48,54H96a6,6,0,0,0,0-12H48a6,6,0,0,0-6,6V96a6,6,0,0,0,12,0V62.48l45.76,45.76a6,6,0,0,0,8.48-8.48Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216,48V96a8,8,0,0,1-16,0V67.31l-42.34,42.35a8,8,0,0,1-11.32-11.32L188.69,56H160a8,8,0,0,1,0-16h48A8,8,0,0,1,216,48ZM98.34,146.34,56,188.69V160a8,8,0,0,0-16,0v48a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16H67.31l42.35-42.34a8,8,0,0,0-11.32-11.32ZM208,152a8,8,0,0,0-8,8v28.69l-42.34-42.35a8,8,0,0,0-11.32,11.32L188.69,200H160a8,8,0,0,0,0,16h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152ZM67.31,56H96a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V67.31l42.34,42.35a8,8,0,0,0,11.32-11.32Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M212,48V96a4,4,0,0,1-8,0V57.66l-49.17,49.17a4,4,0,0,1-5.66-5.66L198.34,52H160a4,4,0,0,1,0-8h48A4,4,0,0,1,212,48ZM101.17,149.17,52,198.34V160a4,4,0,0,0-8,0v48a4,4,0,0,0,4,4H96a4,4,0,0,0,0-8H57.66l49.17-49.17a4,4,0,0,0-5.66-5.66ZM208,156a4,4,0,0,0-4,4v38.34l-49.17-49.17a4,4,0,0,0-5.66,5.66L198.34,204H160a4,4,0,0,0,0,8h48a4,4,0,0,0,4-4V160A4,4,0,0,0,208,156ZM57.66,52H96a4,4,0,0,0,0-8H48a4,4,0,0,0-4,4V96a4,4,0,0,0,8,0V57.66l49.17,49.17a4,4,0,0,0,5.66-5.66Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/Bathtub.es.js
var e$2 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,92H211.3A12,12,0,0,0,200,84H136a12,12,0,0,0-11.3,8H68V52a8,8,0,0,1,8-8,8.5,8.5,0,0,1,8.24,6.39,12,12,0,0,0,23.52-4.78A32.22,32.22,0,0,0,44,52V92H16A12,12,0,0,0,4,104v40a60.07,60.07,0,0,0,56,59.85V216a12,12,0,0,0,24,0V204h88v12a12,12,0,0,0,24,0V203.85A60.07,60.07,0,0,0,252,144V104A12,12,0,0,0,240,92Zm-92,16h40v24H148Zm80,36a36,36,0,0,1-36,36H64a36,36,0,0,1-36-36V116h96v28a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V116h16Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M240,104v40a48,48,0,0,1-48,48H64a48,48,0,0,1-48-48V104H136v40h64V104Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M240,96H208a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8H64V52A12,12,0,0,1,76,40a12.44,12.44,0,0,1,12.16,9.59,8,8,0,0,0,15.68-3.18A28.32,28.32,0,0,0,76,24,28,28,0,0,0,48,52V96H16a8,8,0,0,0-8,8v40a56.06,56.06,0,0,0,56,56v16a8,8,0,0,0,16,0V200h96v16a8,8,0,0,0,16,0V200a56.06,56.06,0,0,0,56-56V104A8,8,0,0,0,240,96Zm-48,8v32H144V104Zm40,40a40,40,0,0,1-40,40H64a40,40,0,0,1-40-40V112H128v32a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V112h24Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,96H216a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8H64V52A12,12,0,0,1,76,40a12.44,12.44,0,0,1,12.16,9.59,8,8,0,0,0,15.68-3.18A28.32,28.32,0,0,0,76,24,28,28,0,0,0,48,52V96H16a8,8,0,0,0-8,8v40a56.06,56.06,0,0,0,56,56v16a8,8,0,0,0,16,0V200h96v16a8,8,0,0,0,16,0V200a56.06,56.06,0,0,0,56-56V104A8,8,0,0,0,240,96Zm-40,8v40H144V104Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,98H206V96a6,6,0,0,0-6-6H136a6,6,0,0,0-6,6v2H62V52A14,14,0,0,1,76,38,14.47,14.47,0,0,1,90.12,49.19a6,6,0,1,0,11.76-2.38A26.32,26.32,0,0,0,76,26,26,26,0,0,0,50,52V98H16a6,6,0,0,0-6,6v40a54.06,54.06,0,0,0,54,54h2v18a6,6,0,0,0,12,0V198H178v18a6,6,0,0,0,12,0V198h2a54.06,54.06,0,0,0,54-54V104A6,6,0,0,0,240,98Zm-98,4h52v36H142Zm92,42a42,42,0,0,1-42,42H64a42,42,0,0,1-42-42V110H130v34a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V110h28Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,96H208a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8H64V52A12,12,0,0,1,76,40a12.44,12.44,0,0,1,12.16,9.59,8,8,0,0,0,15.68-3.18A28.32,28.32,0,0,0,76,24,28,28,0,0,0,48,52V96H16a8,8,0,0,0-8,8v40a56.06,56.06,0,0,0,56,56v16a8,8,0,0,0,16,0V200h96v16a8,8,0,0,0,16,0V200a56.06,56.06,0,0,0,56-56V104A8,8,0,0,0,240,96Zm-48,8v32H144V104Zm40,40a40,40,0,0,1-40,40H64a40,40,0,0,1-40-40V112H128v32a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V112h24Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,100H204V96a4,4,0,0,0-4-4H136a4,4,0,0,0-4,4v4H60V52A16,16,0,0,1,76,36,16.49,16.49,0,0,1,92.08,48.8a4,4,0,1,0,7.84-1.6A24.32,24.32,0,0,0,76,28,24,24,0,0,0,52,52v48H16a4,4,0,0,0-4,4v40a52.06,52.06,0,0,0,52,52h4v20a4,4,0,0,0,8,0V196H180v20a4,4,0,0,0,8,0V196h4a52.06,52.06,0,0,0,52-52V104A4,4,0,0,0,240,100Zm-100,0h56v40H140Zm96,44a44.05,44.05,0,0,1-44,44H64a44.05,44.05,0,0,1-44-44V108H132v36a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V108h32Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/Car.es.js
var H = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,100h-8.2L205.08,39.88A20,20,0,0,0,186.8,28H69.2A20,20,0,0,0,50.92,39.88L24.2,100H16a12,12,0,0,0,0,24h4v76a20,20,0,0,0,20,20H68a20,20,0,0,0,20-20V180h80v20a20,20,0,0,0,20,20h28a20,20,0,0,0,20-20V124h4a12,12,0,0,0,0-24ZM71.8,52H184.2l21.33,48H50.47ZM64,196H44V180H64Zm128,0V180h20v16Zm20-40H44V124H212Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M184,176h40v24a8,8,0,0,1-8,8H192a8,8,0,0,1-8-8ZM32,200a8,8,0,0,0,8,8H64a8,8,0,0,0,8-8V176H32ZM194.11,44.75A8,8,0,0,0,186.8,40H69.2a8,8,0,0,0-7.31,4.75L32,112H224Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M240,104H229.2L201.42,41.5A16,16,0,0,0,186.8,32H69.2a16,16,0,0,0-14.62,9.5L26.8,104H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V184h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V120h8a8,8,0,0,0,0-16ZM69.2,48H186.8l24.89,56H44.31ZM64,200H40V184H64Zm128,0V184h24v16Zm24-32H40V120H216ZM56,144a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,144Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,144Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,104H229.2L201.42,41.5A16,16,0,0,0,186.8,32H69.2a16,16,0,0,0-14.62,9.5L26.8,104H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16v-8h96v8a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V120h8a8,8,0,0,0,0-16ZM80,152H56a8,8,0,0,1,0-16H80a8,8,0,0,1,0,16Zm120,0H176a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16ZM44.31,104,69.2,48H186.8l24.89,56Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,106H227.9L199.59,42.31A14,14,0,0,0,186.8,34H69.2a14,14,0,0,0-12.79,8.31L28.1,106H16a6,6,0,0,0,0,12H26v82a14,14,0,0,0,14,14H64a14,14,0,0,0,14-14V182H178v18a14,14,0,0,0,14,14h24a14,14,0,0,0,14-14V118h10a6,6,0,0,0,0-12ZM67.37,47.19A2,2,0,0,1,69.2,46H186.8a2,2,0,0,1,1.83,1.19L214.77,106H41.23ZM66,200a2,2,0,0,1-2,2H40a2,2,0,0,1-2-2V182H66Zm150,2H192a2,2,0,0,1-2-2V182h28v18A2,2,0,0,1,216,202Zm2-32H38V118H218ZM58,144a6,6,0,0,1,6-6H80a6,6,0,0,1,0,12H64A6,6,0,0,1,58,144Zm112,0a6,6,0,0,1,6-6h16a6,6,0,0,1,0,12H176A6,6,0,0,1,170,144Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,104H229.2L201.42,41.5A16,16,0,0,0,186.8,32H69.2a16,16,0,0,0-14.62,9.5L26.8,104H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V184h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V120h8a8,8,0,0,0,0-16ZM69.2,48H186.8l24.89,56H44.31ZM64,200H40V184H64Zm128,0V184h24v16Zm24-32H40V120H216ZM56,144a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,144Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,144Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M240,108H226.6L197.77,43.13a12,12,0,0,0-11-7.13H69.2a12,12,0,0,0-11,7.13L29.4,108H16a4,4,0,0,0,0,8H28v84a12,12,0,0,0,12,12H64a12,12,0,0,0,12-12V180H180v20a12,12,0,0,0,12,12h24a12,12,0,0,0,12-12V116h12a4,4,0,0,0,0-8ZM65.54,46.38A4,4,0,0,1,69.2,44H186.8a4,4,0,0,1,3.66,2.38L217.84,108H38.16ZM68,200a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V180H68Zm148,4H192a4,4,0,0,1-4-4V180h32v20A4,4,0,0,1,216,204Zm4-32H36V116H220ZM60,144a4,4,0,0,1,4-4H80a4,4,0,0,1,0,8H64A4,4,0,0,1,60,144Zm112,0a4,4,0,0,1,4-4h16a4,4,0,0,1,0,8H176A4,4,0,0,1,172,144Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/CaretDown.es.js
var t = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M208,96l-80,80L48,96Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/CaretUp.es.js
var a$1 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M208,160H48l80-80Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M213.66,154.34l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,48,168H208a8,8,0,0,0,5.66-13.66ZM67.31,152,128,91.31,188.69,152Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M215.39,163.06A8,8,0,0,1,208,168H48a8,8,0,0,1-5.66-13.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,215.39,163.06Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M212.24,164.24a6,6,0,0,1-8.48,0L128,88.49,52.24,164.24a6,6,0,0,1-8.48-8.48l80-80a6,6,0,0,1,8.48,0l80,80A6,6,0,0,1,212.24,164.24Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M210.83,162.83a4,4,0,0,1-5.66,0L128,85.66,50.83,162.83a4,4,0,0,1-5.66-5.66l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,210.83,162.83Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/Eye.es.js
var a = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M251,123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63,57.67,164,44,128,44S59.37,57.67,33.51,83.52C14.16,102.87,5.4,122.32,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212s68.63-13.66,94.48-39.51c19.36-19.35,28.12-38.79,28.49-39.61A12.08,12.08,0,0,0,251,123.13Zm-46.06,33C183.47,177.27,157.59,188,128,188s-55.47-10.73-76.91-31.88A130.36,130.36,0,0,1,29.52,128,130.45,130.45,0,0,1,51.09,99.89C72.54,78.73,98.41,68,128,68s55.46,10.73,76.91,31.89A130.36,130.36,0,0,1,226.48,128,130.45,130.45,0,0,1,204.91,156.12ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M245.48,125.57c-.34-.78-8.66-19.23-27.24-37.81C201,70.54,171.38,50,128,50S55,70.54,37.76,87.76c-18.58,18.58-26.9,37-27.24,37.81a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206s73-20.53,90.24-37.75c18.58-18.58,26.9-37,27.24-37.8A6,6,0,0,0,245.48,125.57ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.77,134.77,0,0,1,22.69,128,134.56,134.56,0,0,1,46.55,95.94C69.22,73.42,96.62,62,128,62s58.78,11.42,81.45,33.94A134.56,134.56,0,0,1,233.31,128C226.94,140.21,195,194,128,194Zm0-112a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M243.66,126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87,72.22,170.7,52,128,52S56.13,72.22,39.17,89.18c-18.31,18.31-26.49,36.44-26.83,37.2a4.08,4.08,0,0,0,0,3.25c.34.77,8.52,18.89,26.83,37.2,17,17,46.14,37.17,88.83,37.17s71.87-20.21,88.83-37.17c18.31-18.31,26.49-36.43,26.83-37.2A4.08,4.08,0,0,0,243.66,126.38Zm-32.7,35c-23.07,23-51,34.62-83,34.62s-59.89-11.65-83-34.62A135.71,135.71,0,0,1,20.44,128,135.69,135.69,0,0,1,45,94.62C68.11,71.65,96,60,128,60s59.89,11.65,83,34.62A135.79,135.79,0,0,1,235.56,128,135.71,135.71,0,0,1,211,161.38ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/defs/Trash.es.js
var e$1 = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216,50H174V40a22,22,0,0,0-22-22H104A22,22,0,0,0,82,40V50H40a6,6,0,0,0,0,12H50V208a14,14,0,0,0,14,14H192a14,14,0,0,0,14-14V62h10a6,6,0,0,0,0-12ZM94,40a10,10,0,0,1,10-10h48a10,10,0,0,1,10,10V50H94ZM194,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V62H194ZM110,104v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Zm48,0v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M216,52H172V40a20,20,0,0,0-20-20H104A20,20,0,0,0,84,40V52H40a4,4,0,0,0,0,8H52V208a12,12,0,0,0,12,12H192a12,12,0,0,0,12-12V60h12a4,4,0,0,0,0-8ZM92,40a12,12,0,0,1,12-12h48a12,12,0,0,1,12,12V52H92ZM196,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V60H196ZM108,104v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Zm48,0v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/ArrowsOut.es.js
var r$2 = import_react.forwardRef((t, e) => /* @__PURE__ */ import_react.createElement(p, {
	ref: e,
	...t,
	weights: e$3
}));
r$2.displayName = "ArrowsOutIcon";
var n$4 = r$2;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Bathtub.es.js
var o$2 = import_react.forwardRef((a, e) => /* @__PURE__ */ import_react.createElement(p, {
	ref: e,
	...a,
	weights: e$2
}));
o$2.displayName = "BathtubIcon";
var n$3 = o$2;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Car.es.js
var r$1 = import_react.forwardRef((a, e) => /* @__PURE__ */ import_react.createElement(p, {
	ref: e,
	...a,
	weights: H
}));
r$1.displayName = "CarIcon";
var n$2 = r$1;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/CaretDown.es.js
var e = import_react.forwardRef((r, t$1) => /* @__PURE__ */ import_react.createElement(p, {
	ref: t$1,
	...r,
	weights: t
}));
e.displayName = "CaretDownIcon";
var s$1 = e;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/CaretUp.es.js
var o$1 = import_react.forwardRef((r, t) => /* @__PURE__ */ import_react.createElement(p, {
	ref: t,
	...r,
	weights: a$1
}));
o$1.displayName = "CaretUpIcon";
var s = o$1;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Eye.es.js
var o = import_react.forwardRef((r, t) => /* @__PURE__ */ import_react.createElement(p, {
	ref: t,
	...r,
	weights: a
}));
o.displayName = "EyeIcon";
var n$1 = o;
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Trash.es.js
var r = import_react.forwardRef((a, e) => /* @__PURE__ */ import_react.createElement(p, {
	ref: e,
	...a,
	weights: e$1
}));
r.displayName = "TrashIcon";
var n = r;
//#endregion
//#region src/components/property-card.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Mobile-first luxury property card.
* Touch targets ≥ 44px, readable text, accessible labels.
*/
function PropertyCard({ property, priority = false, layout = "grid", onQuickView }) {
	const img = property.main_image_thumb || property.main_image;
	const { isFavorite, toggle } = useFavorites();
	const favorited = isFavorite(property.id);
	const { isCompared, toggle: toggleComp } = useCompare();
	const compared = isCompared(property.id);
	const pricePerSqFt = property.price_inr && property.area_sqft && property.area_sqft > 0 ? Math.round(property.price_inr / property.area_sqft) : null;
	const handleFavoriteClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggle(property.id);
	};
	const handleCompareClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleComp(property);
	};
	const handleQuickViewClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (onQuickView) onQuickView(property);
	};
	const handleWhatsAppClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const text = encodeURIComponent(`Hello SS Property, I am interested in "${property.title}" (${property.locality}, priced at ${formatPrice(property.price_inr, property.price_display)}). Please share verified details and schedule a walkthrough.`);
		window.open(`${SITE.whatsapp}?text=${text}`, "_blank");
	};
	if (layout === "list") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/property/$slug",
		params: { slug: property.slug },
		className: "group relative hidden md:flex flex-row overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-[0_20px_40px_-16px_rgba(18,16,14,0.14)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-80 shrink-0 overflow-hidden bg-paper-2",
			children: [
				img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img,
					alt: property.title,
					width: 600,
					height: 450,
					loading: priority ? "eager" : "lazy",
					decoding: "async",
					className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center bg-paper-2 text-sm text-muted",
					children: "SS Property Residence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBadges, { property }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardActions, {
					onQuickView: onQuickView ? handleQuickViewClick : void 0,
					onCompare: handleCompareClick,
					onFavorite: handleFavoriteClick,
					compared,
					favorited
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col justify-between p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brass",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p$1, {
						size: 13,
						weight: "fill"
					}), property.locality]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 font-display text-xl font-medium leading-snug text-ink transition-colors group-hover:text-brass",
					children: property.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-bold text-ink",
						children: formatPrice(property.price_inr, property.price_display)
					}), pricePerSqFt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium text-muted",
						children: [
							"₹",
							pricePerSqFt.toLocaleString("en-IN"),
							" / sq.ft"
						]
					}) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 line-clamp-2 text-xs leading-relaxed text-muted",
				children: property.description
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertySpecs, { property }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {
					onClick: handleWhatsAppClick,
					expanded: true
				})]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridCard, {
			property,
			img,
			priority,
			pricePerSqFt,
			favorited,
			compared,
			onQuickView: onQuickView ? handleQuickViewClick : void 0,
			onCompare: handleCompareClick,
			onFavorite: handleFavoriteClick,
			onWhatsApp: handleWhatsAppClick
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridCard, {
		property,
		img,
		priority,
		pricePerSqFt,
		favorited,
		compared,
		onQuickView: onQuickView ? handleQuickViewClick : void 0,
		onCompare: handleCompareClick,
		onFavorite: handleFavoriteClick,
		onWhatsApp: handleWhatsAppClick
	});
}
function GridCard({ property, img, priority, pricePerSqFt, favorited, compared, onQuickView, onCompare, onFavorite, onWhatsApp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/property/$slug",
		params: { slug: property.slug },
		className: "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-[0_24px_48px_-16px_rgba(18,16,14,0.18)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-paper-2",
			children: [
				img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img,
					alt: property.title,
					width: 900,
					height: 675,
					loading: priority ? "eager" : "lazy",
					decoding: "async",
					className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center bg-paper-2 text-sm text-muted",
					children: "SS Property Residence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBadges, { property }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardActions, {
					onQuickView,
					onCompare,
					onFavorite,
					compared,
					favorited
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs font-medium drop-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p$1, {
							size: 14,
							weight: "fill",
							className: "text-brass-2"
						}), property.locality]
					}), property.facing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs font-medium drop-shadow opacity-90",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$1, { size: 14 }),
							property.facing,
							" Facing"
						]
					}) : null]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col justify-between p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-ink",
					children: formatPrice(property.price_inr, property.price_display)
				}), pricePerSqFt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-medium text-muted",
					children: [
						"₹",
						pricePerSqFt.toLocaleString("en-IN"),
						"/sq.ft"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium text-verdigris",
					children: "Prime Tier"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brass",
				children: property.title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-line/60 pt-3 flex items-center justify-between gap-2 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 min-w-0 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-ink shrink-0",
							children: property.bhk_type
						}),
						property.area_sqft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-line shrink-0",
							children: "•"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [property.area_sqft.toLocaleString("en-IN"), " sq.ft"]
						})] }) : null,
						property.bathrooms ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-line shrink-0",
							children: "•"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0",
							children: [property.bathrooms, " Bath"]
						})] }) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, { onClick: onWhatsApp })]
			})]
		})]
	});
}
/** Top-left verified & status badges */
function CardBadges({ property }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute top-3 left-3 flex flex-wrap gap-1.5 z-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 rounded-full bg-ink/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-paper shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$3, {
				size: 13,
				weight: "fill",
				className: "text-verdigris"
			}), "Verified"]
		}), property.possession_status === "Ready To Move" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-full bg-verdigris px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm",
			children: "Ready to Move"
		}) : null]
	});
}
/** Top-right action buttons — ≥40px touch targets */
function CardActions({ onQuickView, onCompare, onFavorite, compared, favorited }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10",
		children: [
			onQuickView ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onQuickView,
				"aria-label": "Quick preview",
				title: "Quick View",
				className: "touch-sm flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm transition-transform hover:scale-110 active:scale-95 cursor-pointer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$1, { size: 17 })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onCompare,
				"aria-label": compared ? "Remove from compare" : "Add to compare",
				title: compared ? "Compared" : "Compare",
				className: `touch-sm flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-transform hover:scale-110 active:scale-95 cursor-pointer ${compared ? "bg-brass text-ink font-bold" : "bg-white/90 text-muted hover:text-ink"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$5, {
					size: 17,
					weight: compared ? "fill" : "regular"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onFavorite,
				"aria-label": favorited ? "Remove from favorites" : "Save to favorites",
				className: "touch-sm flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm transition-transform hover:scale-110 active:scale-95 cursor-pointer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$6, {
					size: 18,
					weight: favorited ? "fill" : "regular",
					className: favorited ? "text-danger" : "text-muted"
				})
			})
		]
	});
}
/** Property spec pills */
function PropertySpecs({ property }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted font-medium",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-md bg-paper-2 px-2.5 py-1 text-ink font-semibold",
				children: property.bhk_type
			}),
			property.area_sqft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$4, {
						size: 14,
						className: "text-muted"
					}),
					property.area_sqft.toLocaleString("en-IN"),
					" sq.ft"
				]
			}) : null,
			property.bathrooms ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$3, {
						size: 14,
						className: "text-muted"
					}),
					property.bathrooms,
					" Baths"
				]
			}) : null,
			property.parking && property.parking !== "N/A" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$2, {
					size: 14,
					className: "text-muted"
				}), property.parking]
			}) : null
		]
	});
}
/** WhatsApp inquiry button — visible pill on mobile */
function WhatsAppButton({ onClick, expanded = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": "Inquire via WhatsApp",
		className: `touch-sm flex items-center gap-1.5 rounded-full text-verdigris transition-colors cursor-pointer shrink-0 ${expanded ? "border border-verdigris/40 bg-verdigris/10 px-3.5 py-2 text-xs font-semibold hover:bg-verdigris hover:text-white" : "p-2 hover:bg-verdigris/10"}`,
		title: "Inquire via WhatsApp",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
			size: expanded ? 15 : 20,
			weight: "fill"
		}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inquire" }) : null]
	});
}
//#endregion
//#region src/components/compare-drawer.tsx
function CompareDrawer({ className = "" } = {}) {
	const { items, count, removeItem, clear } = useCompare();
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	if (count === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "compare-floating-drawer",
		className: `fixed left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl transition-all duration-300 animate-in slide-in-from-bottom-6 ${className || "bottom-[max(1.25rem,env(safe-area-inset-bottom))]"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-2xl border border-brass/40 bg-ink/95 text-paper shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-6 w-6 items-center justify-center rounded-md bg-brass text-ink font-bold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$5, {
								size: 14,
								weight: "fill"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-paper",
							children: [
								"Compare Residences (",
								count,
								" of 4 selected)"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline text-white/50 text-[11px]",
							children: "• Side-by-side architectural specs & West Bengal fees"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: clear,
						className: "flex min-h-[32px] items-center gap-1 text-xs text-white/60 hover:text-white transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Clear"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCollapsed(!collapsed),
						className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer",
						"aria-label": collapsed ? "Expand drawer" : "Collapse drawer",
						children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, { size: 15 })
					})]
				})]
			}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row items-center justify-between gap-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto flex-1",
					children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2 pr-6 hover:border-brass/50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.main_image_thumb || item.main_image,
								alt: item.title,
								className: "h-10 w-10 shrink-0 rounded-lg object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs font-semibold text-paper",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-brass",
									children: formatPrice(item.price_inr, item.price_display)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeItem(item.id),
								"aria-label": `Remove ${item.title}`,
								className: "absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white/80 hover:bg-danger hover:text-white transition-colors cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n$7, {
									size: 12,
									weight: "bold"
								})
							})
						]
					}, item.id)), Array.from({ length: Math.max(0, 4 - items.length) }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:flex items-center justify-center rounded-xl border border-dashed border-white/15 p-2 text-[11px] text-white/40",
						children: "+ Add property"
					}, `empty-${idx}`))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full md:w-auto shrink-0 justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/compare",
						className: "flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-brass-gradient px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-lg transition-transform hover:scale-105 active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Compare Specs (",
							count,
							")"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$2, {
							size: 14,
							weight: "bold"
						})]
					})
				})]
			})]
		})
	});
}
//#endregion
export { n$2 as a, s$1 as i, PropertyCard as n, n$3 as o, n$1 as r, n$4 as s, CompareDrawer as t };
