import { o as require_jsx_runtime } from "./useStore-DOgV22Lo.js";
import { n as Route } from "./router-YMIUhzpp.js";
import { n as PropertyEditor } from "./property-editor-Cn6BuGBD.js";
//#region src/routes/admin.property.$id.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function PropertyEditorRoute() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyEditor, { propertyId: id });
}
//#endregion
export { PropertyEditorRoute as component };
