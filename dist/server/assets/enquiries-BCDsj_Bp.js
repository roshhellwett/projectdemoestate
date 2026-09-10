import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-BITAowlT.js";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-DOXIGTuM.js";
import { a as string, i as record, n as literal, o as union, r as object, s as unknown, t as _enum } from "./schemas-DHe4gule.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/server/enquiries.ts
/**
* Public enquiry submission. Uses the publishable-key client server-side
* (RLS: anyone may insert enquiries, nobody may read without admin).
*
* Zod validates the payload before it reaches the database.
*/
var EnquirySchema = object({
	kind: _enum([
		"contact",
		"property",
		"sell",
		"partner"
	]),
	propertyId: string().uuid().nullable().optional(),
	name: string().trim().min(2).max(120),
	phone: string().trim().regex(/^[+0-9\s()-]{8,17}$/, "Enter a valid phone number"),
	email: union([string().trim().email().max(160), literal("")]).optional(),
	message: string().trim().max(2e3).optional(),
	payload: record(string(), unknown()).optional()
});
var submitEnquiry = createServerFn({ method: "POST" }).validator((raw) => EnquirySchema.parse(raw)).handler(createSsrRpc("6e721a448daaf12e5ccde2d28b011845e20334d1303308cb5ae0ea92a37b33cc"));
//#endregion
export { submitEnquiry as t };
