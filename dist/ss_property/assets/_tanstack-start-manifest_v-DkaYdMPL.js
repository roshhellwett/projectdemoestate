//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: { __root__: {
	preloads: ["/@id/virtual:tanstack-start-dev-client-entry"],
	scripts: [{ attrs: {
		type: "module",
		async: true,
		src: "/@id/virtual:tanstack-start-dev-client-entry"
	} }]
} } });
//#endregion
export { tsrStartManifest };
