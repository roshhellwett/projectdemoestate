import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-BITAowlT.js";
import { t as getSupabaseBrowser } from "./supabase-C0JFk6-S.js";
import { a as string, i as record, n as literal, o as union, r as object, s as unknown, t as _enum } from "./schemas-DHe4gule.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/server/enquiries.ts?tss-serverfn-split
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
var submitEnquiry_createServerFn_handler = createServerRpc({
	id: "6e721a448daaf12e5ccde2d28b011845e20334d1303308cb5ae0ea92a37b33cc",
	name: "submitEnquiry",
	filename: "src/server/enquiries.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
var submitEnquiry = createServerFn({ method: "POST" }).validator((raw) => EnquirySchema.parse(raw)).handler(submitEnquiry_createServerFn_handler, async ({ data }) => {
	const { error } = await getSupabaseBrowser().from("enquiries").insert({
		kind: data.kind,
		property_id: data.propertyId ?? null,
		name: data.name,
		phone: data.phone,
		email: data.email || null,
		message: data.message ?? "",
		payload: data.payload ?? {}
	});
	if (error) {
		console.error("enquiry insert failed:", error.message);
		return {
			ok: false,
			error: "Could not submit right now. Please call or WhatsApp us instead."
		};
	}
	return { ok: true };
});
//#endregion
export { submitEnquiry_createServerFn_handler };
