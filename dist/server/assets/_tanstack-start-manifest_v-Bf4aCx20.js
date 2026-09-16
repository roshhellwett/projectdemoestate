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
			"/assets/index-IOloyXWj.js",
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
			src: "/assets/index-IOloyXWj.js"
		} }]
	},
	"/": {
		filePath: "A:/projectssproperty/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-D-dqChNZ.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
			"/assets/TrendUp.es-CM9p-fKN.js",
			"/assets/compare-drawer-Df2wE1H0.js",
			"/assets/Compass.es-YgY6eM4w.js",
			"/assets/CurrencyInr.es-DpH1xqli.js",
			"/assets/ShieldCheck.es-B-6sO0Js.js",
			"/assets/Sparkle.es-COuE1UCv.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/emi-calculator-zw-kk4_a.js",
			"/assets/quick-view-modal-C3zSTHil.js"
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
			"/assets/about-C7VfNUFe.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
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
			"/assets/calculator-2Qvd1qnb.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
			"/assets/CurrencyInr.es-DpH1xqli.js",
			"/assets/ShieldCheck.es-B-6sO0Js.js",
			"/assets/emi-calculator-zw-kk4_a.js"
		]
	},
	"/compare": {
		filePath: "A:/projectssproperty/src/routes/compare.tsx",
		children: void 0,
		preloads: [
			"/assets/compare-bG3q5H1G.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
			"/assets/Compass.es-YgY6eM4w.js",
			"/assets/ShieldCheck.es-B-6sO0Js.js"
		]
	},
	"/journal": {
		filePath: "A:/projectssproperty/src/routes/journal.tsx",
		children: ["/journal/$slug"],
		preloads: [
			"/assets/journal-rcfxaRL0.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
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
			"/assets/partners-CGNLFb82.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
			"/assets/sell-form-O2ONc1jY.js",
			"/assets/CheckCircle.es-CD67TgFI.js",
			"/assets/ShieldCheck.es-B-6sO0Js.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/properties": {
		filePath: "A:/projectssproperty/src/routes/properties.tsx",
		children: void 0,
		preloads: [
			"/assets/properties-qUyl28nE.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
			"/assets/compare-drawer-Df2wE1H0.js",
			"/assets/Sparkle.es-COuE1UCv.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/quick-view-modal-C3zSTHil.js"
		]
	},
	"/sell": {
		filePath: "A:/projectssproperty/src/routes/sell.tsx",
		children: void 0,
		preloads: [
			"/assets/sell-CgUvP2xF.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
			"/assets/sell-form-O2ONc1jY.js",
			"/assets/ShieldCheck.es-B-6sO0Js.js",
			"/assets/Sparkle.es-COuE1UCv.js",
			"/assets/reveal-BrsUxl15.js"
		]
	},
	"/admin/new": {
		filePath: "A:/projectssproperty/src/routes/admin.new.tsx",
		children: void 0,
		preloads: ["/assets/admin.new-BePlEebA.js", "/assets/property-editor-B43T8Lrl.js"]
	},
	"/journal/$slug": {
		filePath: "A:/projectssproperty/src/routes/journal.$slug.tsx",
		children: void 0,
		preloads: ["/assets/journal._slug-BJvPyfSI.js"]
	},
	"/property/$slug": {
		filePath: "A:/projectssproperty/src/routes/property.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/property._slug-BVtmPZ0f.js",
			"/assets/enquiries-D_rwhooE.js",
			"/assets/footer-B9TpLwOX.js",
			"/assets/floating-concierge-Dxl3Lc8H.js",
			"/assets/TrendUp.es-CM9p-fKN.js",
			"/assets/compare-drawer-Df2wE1H0.js",
			"/assets/CheckCircle.es-CD67TgFI.js",
			"/assets/Compass.es-YgY6eM4w.js",
			"/assets/ShieldCheck.es-B-6sO0Js.js",
			"/assets/Sparkle.es-COuE1UCv.js",
			"/assets/reveal-BrsUxl15.js",
			"/assets/emi-calculator-zw-kk4_a.js"
		]
	},
	"/admin/": {
		filePath: "A:/projectssproperty/src/routes/admin.index.tsx",
		children: void 0,
		preloads: [
			"/assets/admin.index-C_SkP143.js",
			"/assets/brand-GABAiFZv.js",
			"/assets/cms-IZMMBZ4R.js"
		]
	},
	"/admin/property/$id": {
		filePath: "A:/projectssproperty/src/routes/admin.property.$id.tsx",
		children: void 0,
		preloads: ["/assets/admin.property._id-Bm7zS9ok.js", "/assets/property-editor-B43T8Lrl.js"]
	}
} });
//#endregion
export { tsrStartManifest };
