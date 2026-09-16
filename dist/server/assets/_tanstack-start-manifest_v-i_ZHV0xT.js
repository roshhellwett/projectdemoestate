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
			"/assets/index-v17tEZ8t.js",
			"/assets/jsx-runtime-Dk72oS4N.js",
			"/assets/link-_shG8IKx.js",
			"/assets/Match-DyBiAPkm.js",
			"/assets/matchContext-DPiRwENW.js",
			"/assets/useStore-CZlGD77O.js",
			"/assets/supabase-BIodGtkj.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-v17tEZ8t.js"
		} }]
	},
	"/": {
		filePath: "A:/projectssproperty/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DlxFbD37.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/TrendUp.es-D_Jyr8z2.js",
			"/assets/compare-drawer-DM7t-rce.js",
			"/assets/Compass.es-BderRQT9.js",
			"/assets/CurrencyInr.es-CS_3kvJ3.js",
			"/assets/founder-section-DypEg22z.js",
			"/assets/ShieldCheck.es-Dp6Ed4zY.js",
			"/assets/Sparkle.es-BjX45QXH.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/emi-calculator-DHIREDq1.js",
			"/assets/quick-view-modal-U0lG3V5-.js"
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
			"/assets/about-CQpKMuEx.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/founder-section-DypEg22z.js",
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
			"/assets/calculator-DRdbi4Qw.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/CurrencyInr.es-CS_3kvJ3.js",
			"/assets/ShieldCheck.es-Dp6Ed4zY.js",
			"/assets/emi-calculator-DHIREDq1.js"
		]
	},
	"/compare": {
		filePath: "A:/projectssproperty/src/routes/compare.tsx",
		children: void 0,
		preloads: [
			"/assets/compare-Ci1I3KwU.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/Compass.es-BderRQT9.js",
			"/assets/ShieldCheck.es-Dp6Ed4zY.js"
		]
	},
	"/journal": {
		filePath: "A:/projectssproperty/src/routes/journal.tsx",
		children: ["/journal/$slug"],
		preloads: [
			"/assets/journal-Dc_374cE.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/login": {
		filePath: "A:/projectssproperty/src/routes/login.tsx",
		children: void 0,
		preloads: ["/assets/login-CLTjU-jA.js", "/assets/brand-GABAiFZv.js"]
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
			"/assets/partners-hG0bA0Yl.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/sell-form-BgPtQeLA.js",
			"/assets/CheckCircle.es-D-YaXQ4s.js",
			"/assets/ShieldCheck.es-Dp6Ed4zY.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/properties": {
		filePath: "A:/projectssproperty/src/routes/properties.tsx",
		children: void 0,
		preloads: [
			"/assets/properties-BM_aAeco.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/compare-drawer-DM7t-rce.js",
			"/assets/Sparkle.es-BjX45QXH.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/quick-view-modal-U0lG3V5-.js"
		]
	},
	"/sell": {
		filePath: "A:/projectssproperty/src/routes/sell.tsx",
		children: void 0,
		preloads: [
			"/assets/sell-DBJOy67u.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/sell-form-BgPtQeLA.js",
			"/assets/ShieldCheck.es-Dp6Ed4zY.js",
			"/assets/Sparkle.es-BjX45QXH.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/new": {
		filePath: "A:/projectssproperty/src/routes/admin.new.tsx",
		children: void 0,
		preloads: ["/assets/admin.new-CSKpbtF-.js", "/assets/property-editor-BejahH9U.js"]
	},
	"/journal/$slug": {
		filePath: "A:/projectssproperty/src/routes/journal.$slug.tsx",
		children: void 0,
		preloads: ["/assets/journal._slug-Csszg4k6.js"]
	},
	"/property/$slug": {
		filePath: "A:/projectssproperty/src/routes/property.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/property._slug-BwN-cvUI.js",
			"/assets/enquiries-DDYMpcsr.js",
			"/assets/footer-CAwgOAlb.js",
			"/assets/floating-concierge-CK6dK8jz.js",
			"/assets/TrendUp.es-D_Jyr8z2.js",
			"/assets/compare-drawer-DM7t-rce.js",
			"/assets/CheckCircle.es-D-YaXQ4s.js",
			"/assets/Compass.es-BderRQT9.js",
			"/assets/ShieldCheck.es-Dp6Ed4zY.js",
			"/assets/Sparkle.es-BjX45QXH.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/emi-calculator-DHIREDq1.js"
		]
	},
	"/admin/": {
		filePath: "A:/projectssproperty/src/routes/admin.index.tsx",
		children: void 0,
		preloads: [
			"/assets/admin.index-jJ1M31qR.js",
			"/assets/brand-GABAiFZv.js",
			"/assets/cms-IZMMBZ4R.js"
		]
	},
	"/admin/property/$id": {
		filePath: "A:/projectssproperty/src/routes/admin.property.$id.tsx",
		children: void 0,
		preloads: ["/assets/admin.property._id-B5UxccPt.js", "/assets/property-editor-BejahH9U.js"]
	}
} });
//#endregion
export { tsrStartManifest };
