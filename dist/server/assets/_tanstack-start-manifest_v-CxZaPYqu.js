//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "A:/projectssproperty/src/routes/__root.tsx",
		children: [
			"/",
			"/$",
			"/about",
			"/admin",
			"/calculator",
			"/compare",
			"/journal",
			"/login",
			"/partner",
			"/partners",
			"/properties",
			"/sell",
			"/property/$slug"
		],
		preloads: [
			"/assets/index-28HupVLs.js",
			"/assets/jsx-runtime-Dk72oS4N.js",
			"/assets/link-_shG8IKx.js",
			"/assets/Match-DyBiAPkm.js",
			"/assets/matchContext-DPiRwENW.js",
			"/assets/useStore-CZlGD77O.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-28HupVLs.js"
		} }]
	},
	"/": {
		filePath: "A:/projectssproperty/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-El9_EjOS.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/TrendUp.es-sEqaxPDl.js",
			"/assets/compare-drawer-B_thRivJ.js",
			"/assets/Compass.es-CKoEaw9J.js",
			"/assets/CurrencyInr.es-DHdRBdwB.js",
			"/assets/founder-section-Cw94CWGN.js",
			"/assets/ShieldCheck.es-CwaKbF2P.js",
			"/assets/Sparkle.es-BRH3vmfB.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/emi-calculator-Chn1bzqq.js",
			"/assets/quick-view-modal-HoUKlrGk.js"
		]
	},
	"/$": {
		filePath: "A:/projectssproperty/src/routes/$.tsx",
		children: void 0,
		preloads: ["/assets/_-_GOCG3_1.js"]
	},
	"/about": {
		filePath: "A:/projectssproperty/src/routes/about.tsx",
		children: void 0,
		preloads: [
			"/assets/about-CkgfGdZD.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/founder-section-Cw94CWGN.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin": {
		filePath: "A:/projectssproperty/src/routes/admin.tsx",
		children: [
			"/admin/new",
			"/admin/",
			"/admin/property/$id"
		],
		preloads: ["/assets/admin-BIB-5Nkc.js"]
	},
	"/calculator": {
		filePath: "A:/projectssproperty/src/routes/calculator.tsx",
		children: void 0,
		preloads: [
			"/assets/calculator-CcbzXcfB.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/CurrencyInr.es-DHdRBdwB.js",
			"/assets/ShieldCheck.es-CwaKbF2P.js",
			"/assets/emi-calculator-Chn1bzqq.js"
		]
	},
	"/compare": {
		filePath: "A:/projectssproperty/src/routes/compare.tsx",
		children: void 0,
		preloads: [
			"/assets/compare-CbV_03t6.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/Compass.es-CKoEaw9J.js",
			"/assets/ShieldCheck.es-CwaKbF2P.js"
		]
	},
	"/journal": {
		filePath: "A:/projectssproperty/src/routes/journal.tsx",
		children: ["/journal/$slug", "/journal/"],
		preloads: ["/assets/journal-BIB-5Nkc.js"]
	},
	"/login": {
		filePath: "A:/projectssproperty/src/routes/login.tsx",
		children: void 0,
		preloads: ["/assets/login-CxKQMwXu.js", "/assets/brand-GABAiFZv.js"]
	},
	"/partner": {
		filePath: "A:/projectssproperty/src/routes/partner.tsx",
		children: void 0,
		preloads: ["/assets/partner-DJ7LAi8J.js"]
	},
	"/partners": {
		filePath: "A:/projectssproperty/src/routes/partners.tsx",
		children: void 0,
		preloads: [
			"/assets/partners-XA5uj24Q.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/sell-form-zrAeTpNn.js",
			"/assets/CheckCircle.es-Bmjzpd2k.js",
			"/assets/ShieldCheck.es-CwaKbF2P.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/properties": {
		filePath: "A:/projectssproperty/src/routes/properties.tsx",
		children: void 0,
		preloads: [
			"/assets/properties-Cmc6vvJy.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/compare-drawer-B_thRivJ.js",
			"/assets/Sparkle.es-BRH3vmfB.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/quick-view-modal-HoUKlrGk.js"
		]
	},
	"/sell": {
		filePath: "A:/projectssproperty/src/routes/sell.tsx",
		children: void 0,
		preloads: [
			"/assets/sell-2-V3lPX_.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/sell-form-zrAeTpNn.js",
			"/assets/ShieldCheck.es-CwaKbF2P.js",
			"/assets/Sparkle.es-BRH3vmfB.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/new": {
		filePath: "A:/projectssproperty/src/routes/admin.new.tsx",
		children: void 0,
		preloads: ["/assets/admin.new-BMaUyJwu.js", "/assets/property-editor-CLhpE-Yf.js"]
	},
	"/journal/$slug": {
		filePath: "A:/projectssproperty/src/routes/journal.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/journal._slug-BAlhpkEa.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/property/$slug": {
		filePath: "A:/projectssproperty/src/routes/property.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/property._slug-B4tiKhDh.js",
			"/assets/enquiries-DvOPzoXT.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/TrendUp.es-sEqaxPDl.js",
			"/assets/compare-drawer-B_thRivJ.js",
			"/assets/CheckCircle.es-Bmjzpd2k.js",
			"/assets/Compass.es-CKoEaw9J.js",
			"/assets/ShieldCheck.es-CwaKbF2P.js",
			"/assets/Sparkle.es-BRH3vmfB.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/emi-calculator-Chn1bzqq.js"
		]
	},
	"/admin/": {
		filePath: "A:/projectssproperty/src/routes/admin.index.tsx",
		children: void 0,
		preloads: [
			"/assets/admin.index-CoMeBd3C.js",
			"/assets/brand-GABAiFZv.js",
			"/assets/cms-Ch1hyICL.js"
		]
	},
	"/journal/": {
		filePath: "A:/projectssproperty/src/routes/journal.index.tsx",
		children: void 0,
		preloads: [
			"/assets/journal.index-C1DomXSZ.js",
			"/assets/floating-concierge-D9K2Cpnh.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/property/$id": {
		filePath: "A:/projectssproperty/src/routes/admin.property.$id.tsx",
		children: void 0,
		preloads: ["/assets/admin.property._id-DYHE91jp.js", "/assets/property-editor-CLhpE-Yf.js"]
	}
} });
//#endregion
export { tsrStartManifest };
