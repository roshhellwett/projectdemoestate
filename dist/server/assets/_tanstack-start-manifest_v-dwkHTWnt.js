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
			"/assets/index-Co76D_rX.js",
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
			src: "/assets/index-Co76D_rX.js"
		} }]
	},
	"/": {
		filePath: "A:/projectssproperty/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DCFvBO0w.js",
			"/assets/TrendUp.es-C7ZfjO6H.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/compare-drawer-DExhwtQM.js",
			"/assets/Compass.es-D8jNjU8I.js",
			"/assets/CurrencyInr.es-D5a2Kxxg.js",
			"/assets/Handshake.es-lyfuU1Qu.js",
			"/assets/footer-Cx-3U574.js",
			"/assets/House.es-DwFlqDgt.js",
			"/assets/emi-calculator-DVaExoRX.js",
			"/assets/ShieldCheck.es-Cuf9m7Cd.js",
			"/assets/Sparkle.es-4pzB1j0U.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/quick-view-modal-nB-cBovm.js"
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
			"/assets/about-CfPDHx5A.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/footer-Cx-3U574.js",
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
			"/assets/calculator-BC_FM6RT.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/Calculator.es-DvmMQIm5.js",
			"/assets/CurrencyInr.es-D5a2Kxxg.js",
			"/assets/footer-Cx-3U574.js",
			"/assets/emi-calculator-DVaExoRX.js",
			"/assets/ShieldCheck.es-Cuf9m7Cd.js"
		]
	},
	"/compare": {
		filePath: "A:/projectssproperty/src/routes/compare.tsx",
		children: void 0,
		preloads: [
			"/assets/compare-i4cBhbQR.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/Calculator.es-DvmMQIm5.js",
			"/assets/Compass.es-D8jNjU8I.js",
			"/assets/ShieldCheck.es-Cuf9m7Cd.js"
		]
	},
	"/journal": {
		filePath: "A:/projectssproperty/src/routes/journal.tsx",
		children: ["/journal/$slug"],
		preloads: [
			"/assets/journal-DD1onR1o.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/footer-Cx-3U574.js",
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
			"/assets/partners-DydyE8-5.js",
			"/assets/sell-form-C1Oeyh4x.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/CheckCircle.es-CcDbGZQK.js",
			"/assets/Handshake.es-lyfuU1Qu.js",
			"/assets/footer-Cx-3U574.js",
			"/assets/ShieldCheck.es-Cuf9m7Cd.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/properties": {
		filePath: "A:/projectssproperty/src/routes/properties.tsx",
		children: void 0,
		preloads: [
			"/assets/properties-Cj1TLTIz.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/compare-drawer-DExhwtQM.js",
			"/assets/footer-Cx-3U574.js",
			"/assets/Sparkle.es-4pzB1j0U.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/quick-view-modal-nB-cBovm.js"
		]
	},
	"/sell": {
		filePath: "A:/projectssproperty/src/routes/sell.tsx",
		children: void 0,
		preloads: [
			"/assets/sell-DbxVsq94.js",
			"/assets/sell-form-C1Oeyh4x.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/footer-Cx-3U574.js",
			"/assets/ShieldCheck.es-Cuf9m7Cd.js",
			"/assets/Sparkle.es-4pzB1j0U.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/new": {
		filePath: "A:/projectssproperty/src/routes/admin.new.tsx",
		children: void 0,
		preloads: ["/assets/admin.new-C3fiVX2A.js", "/assets/property-editor-CwVeP_5B.js"]
	},
	"/journal/$slug": {
		filePath: "A:/projectssproperty/src/routes/journal.$slug.tsx",
		children: void 0,
		preloads: ["/assets/journal._slug-C3F8RyUc.js"]
	},
	"/property/$slug": {
		filePath: "A:/projectssproperty/src/routes/property.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/property._slug-BlBvkRwb.js",
			"/assets/enquiries-C0xC6fkY.js",
			"/assets/TrendUp.es-C7ZfjO6H.js",
			"/assets/floating-concierge-CtG-NgZV.js",
			"/assets/compare-drawer-DExhwtQM.js",
			"/assets/CheckCircle.es-CcDbGZQK.js",
			"/assets/Compass.es-D8jNjU8I.js",
			"/assets/footer-Cx-3U574.js",
			"/assets/House.es-DwFlqDgt.js",
			"/assets/emi-calculator-DVaExoRX.js",
			"/assets/ShieldCheck.es-Cuf9m7Cd.js",
			"/assets/Sparkle.es-4pzB1j0U.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/": {
		filePath: "A:/projectssproperty/src/routes/admin.index.tsx",
		children: void 0,
		preloads: [
			"/assets/admin.index-CIDWHt8c.js",
			"/assets/brand-GABAiFZv.js",
			"/assets/cms-IZMMBZ4R.js"
		]
	},
	"/admin/property/$id": {
		filePath: "A:/projectssproperty/src/routes/admin.property.$id.tsx",
		children: void 0,
		preloads: ["/assets/admin.property._id-DoNBIT7I.js", "/assets/property-editor-CwVeP_5B.js"]
	}
} });
//#endregion
export { tsrStartManifest };
