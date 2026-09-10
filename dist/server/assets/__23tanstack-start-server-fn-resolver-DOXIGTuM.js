//#region \0%23tanstack-start-server-fn-resolver
var manifest = { "6e721a448daaf12e5ccde2d28b011845e20334d1303308cb5ae0ea92a37b33cc": {
	functionName: "submitEnquiry_createServerFn_handler",
	importer: () => import("./enquiries-DCPR6bSm.js")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
