import { t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { n as Route } from "./router-Ct8kJVV4.js";
import { n as PropertyEditor } from "./property-editor-LOO-ZC0l.js";
//#region src/routes/admin.property.$id.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function PropertyEditorRoute() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyEditor, { propertyId: id });
}
//#endregion
export { PropertyEditorRoute as component };
