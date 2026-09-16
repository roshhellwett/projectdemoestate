import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as SellForm } from "./sell-form-C8drq1ea.js";
import { t as FloatingConcierge } from "./floating-concierge-CF7Vqofe.js";
import { n as FooterSettingsContext, r as Header, t as Footer } from "./footer-DjCuxDtj.js";
import { s as Route } from "./router-CSbh0l9e.js";
import { t as initRevealOnScroll } from "./reveal-D_F53lYS.js";
import { t as PartnerWall } from "./sections-BT2vvpiX.js";
//#region src/routes/partner.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PARTNERS = [
	{
		title: "Real estate developers",
		body: "Showcase upcoming projects to thousands of qualified buyers and investors across Kolkata."
	},
	{
		title: "Interior and home brands",
		body: "Reach new homeowners and design-minded buyers through our engaged community."
	},
	{
		title: "Financial services",
		body: "Connect with homebuyers actively looking for financing and mortgage solutions."
	}
];
function PartnerPage() {
	const { partners, settings } = Route.useLoaderData();
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingConcierge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-b border-line bg-paper-2/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell py-14 md:py-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Partnerships"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl",
									children: "Put your brand where Kolkata's buyers are looking."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-[15px] leading-relaxed text-muted",
									children: settings.partner_intro ?? "Developers, interior brands and financial services - reach Kolkata's qualified property buyers."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell-wide py-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 md:grid-cols-3",
							children: PARTNERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal rounded-[var(--radius-card)] border border-line bg-white p-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-medium text-ink",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted",
									children: p.body
								})]
							}, p.title))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerWall, { partners }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell max-w-3xl py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[var(--radius-card)] border border-line bg-paper-2/50 p-6 md:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-medium tracking-tight text-ink",
									children: "Get in touch"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: "Tell us about your proposal and we will reach out."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SellForm, { kind: "partner" })
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSettingsContext.Provider, {
				value: settings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			})
		]
	});
}
//#endregion
export { PartnerPage as component };
