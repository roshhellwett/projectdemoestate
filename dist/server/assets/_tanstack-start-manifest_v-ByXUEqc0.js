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
			"/assets/index-CkJcDUAo.js",
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
			src: "/assets/index-CkJcDUAo.js"
		} }]
	},
	"/": {
		filePath: "A:/projectssproperty/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-Bcrbj850.js",
			"/assets/TrendUp.es-BWGP8-lV.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/compare-drawer-Dp0M4iiI.js",
			"/assets/Compass.es-Uhw0YPE5.js",
			"/assets/CurrencyInr.es-BKAvvuuC.js",
			"/assets/Handshake.es-BcSGEB7t.js",
			"/assets/footer-BhSYZTE7.js",
			"/assets/House.es-DXfvG6wB.js",
			"/assets/emi-calculator-CyjSCORR.js",
			"/assets/ShieldCheck.es-Dw4Usxbi.js",
			"/assets/Sparkle.es-BfyLx-Oq.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/quick-view-modal-Buyz0B2S.js"
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
			"/assets/about-Bbd0BGcE.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/footer-BhSYZTE7.js",
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
			"/assets/calculator-BBkdMFxW.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/Calculator.es-BoKK8NMt.js",
			"/assets/CurrencyInr.es-BKAvvuuC.js",
			"/assets/footer-BhSYZTE7.js",
			"/assets/emi-calculator-CyjSCORR.js",
			"/assets/ShieldCheck.es-Dw4Usxbi.js"
		]
	},
	"/compare": {
		filePath: "A:/projectssproperty/src/routes/compare.tsx",
		children: void 0,
		preloads: [
			"/assets/compare-CW_fe0XR.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/Calculator.es-BoKK8NMt.js",
			"/assets/Compass.es-Uhw0YPE5.js",
			"/assets/ShieldCheck.es-Dw4Usxbi.js"
		]
	},
	"/journal": {
		filePath: "A:/projectssproperty/src/routes/journal.tsx",
		children: ["/journal/$slug"],
		preloads: [
			"/assets/journal-KBdQD-eP.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/footer-BhSYZTE7.js",
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
			"/assets/partners-CDcnDyj0.js",
			"/assets/sell-form-szLYaQcM.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/CheckCircle.es-t4_Ro4dn.js",
			"/assets/Handshake.es-BcSGEB7t.js",
			"/assets/footer-BhSYZTE7.js",
			"/assets/ShieldCheck.es-Dw4Usxbi.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/properties": {
		filePath: "A:/projectssproperty/src/routes/properties.tsx",
		children: void 0,
		preloads: [
			"/assets/properties-BgE_hmaa.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/compare-drawer-Dp0M4iiI.js",
			"/assets/footer-BhSYZTE7.js",
			"/assets/Sparkle.es-BfyLx-Oq.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/quick-view-modal-Buyz0B2S.js"
		]
	},
	"/sell": {
		filePath: "A:/projectssproperty/src/routes/sell.tsx",
		children: void 0,
		preloads: [
			"/assets/sell-OTNyAlvP.js",
			"/assets/sell-form-szLYaQcM.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/footer-BhSYZTE7.js",
			"/assets/ShieldCheck.es-Dw4Usxbi.js",
			"/assets/Sparkle.es-BfyLx-Oq.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/new": {
		filePath: "A:/projectssproperty/src/routes/admin.new.tsx",
		children: void 0,
		preloads: ["/assets/admin.new-Tc51ylMM.js", "/assets/property-editor-C7bweCjr.js"]
	},
	"/journal/$slug": {
		filePath: "A:/projectssproperty/src/routes/journal.$slug.tsx",
		children: void 0,
		preloads: ["/assets/journal._slug-BDFTBM0v.js"]
	},
	"/property/$slug": {
		filePath: "A:/projectssproperty/src/routes/property.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/property._slug-DvwLIcqZ.js",
			"/assets/enquiries-pGVhxY1e.js",
			"/assets/TrendUp.es-BWGP8-lV.js",
			"/assets/floating-concierge-CLle5ptl.js",
			"/assets/compare-drawer-Dp0M4iiI.js",
			"/assets/CheckCircle.es-t4_Ro4dn.js",
			"/assets/Compass.es-Uhw0YPE5.js",
			"/assets/footer-BhSYZTE7.js",
			"/assets/House.es-DXfvG6wB.js",
			"/assets/emi-calculator-CyjSCORR.js",
			"/assets/ShieldCheck.es-Dw4Usxbi.js",
			"/assets/Sparkle.es-BfyLx-Oq.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/": {
		filePath: "A:/projectssproperty/src/routes/admin.index.tsx",
		children: void 0,
		preloads: [
			"/assets/admin.index-CuqUZnfc.js",
			"/assets/brand-GABAiFZv.js",
			"/assets/cms-IZMMBZ4R.js"
		]
	},
	"/admin/property/$id": {
		filePath: "A:/projectssproperty/src/routes/admin.property.$id.tsx",
		children: void 0,
		preloads: ["/assets/admin.property._id-D5Hg3H-G.js", "/assets/property-editor-C7bweCjr.js"]
	}
} });
//#endregion
export { tsrStartManifest };
