import { o as require_jsx_runtime } from "./useStore-DOgV22Lo.js";
import { n as Outlet } from "./Match-PAaURLE2.js";
//#region src/routes/admin.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
/**
* /admin layout route: auth guard + shared chrome. Child routes
* (admin.index.tsx dashboard, admin.new.tsx, admin.property.$id.tsx)
* render through <Outlet />.
*
* The guard runs in the browser only: the session lives in localStorage,
* which does not exist during SSR. RLS still protects every query, so an
* unauthenticated visitor sees an empty dashboard at worst.
*/
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
//#endregion
export { SplitComponent as component };
