import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { a as CatchBoundary, i as SafeFragment, r as renderPending, t as Match } from "./Match-jgdi8drQ.js";
import { n as matchContext, r as rootRouteId } from "./matchContext-CEGeAE9f.js";
import { i as useLayoutEffect } from "./utils-Bru9Ambr.js";
import "./load-server-DHCd7v1T.js";
import { n as useRouter } from "./useStore-D9b7VaH8.js";
require_react();
function settleOwner(owner, rendered) {
	const settle = owner[1];
	owner.length = 0;
	settle?.(rendered);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Matches.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Internal component that renders the router's active match tree with
* suspense, error, and not-found boundaries. Rendered by `RouterProvider`.
*/
function Matches() {
	const router = useRouter();
	const rootRoute = router.routesById[rootRouteId];
	const pendingElement = renderPending(router, rootRoute);
	const ResolvedSuspense = SafeFragment;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [false, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolvedSuspense, {
		fallback: pendingElement,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchesInner, {})
	})] });
	return router.options.InnerWrap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
	const router = useRouter();
	const acknowledgement = router._rendered;
	const matches = router.stores.matches.get();
	const match = matches[0];
	const routeId = match?.routeId;
	useLayoutEffect(() => {
		if (acknowledgement[0] === matches) settleOwner(acknowledgement, true);
	}, [acknowledgement, matches]);
	const matchComponent = routeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Match, { routeId }) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(matchContext.Provider, {
		value: routeId,
		children: router.options.disableGlobalCatchBoundary ? matchComponent : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatchBoundary, {
			getResetKey: () => match,
			onCatch: void 0,
			children: matchComponent
		})
	});
}
/**
* Create a matcher function for testing locations against route definitions.
*
* The returned function accepts standard navigation options (`to`, `params`,
* `search`, etc.) and returns either `false` (no match) or the matched params
* object when the route matches the current or pending location.
*
* Useful for conditional rendering and active UI states because it subscribes
* the component to the router state used for matching. The returned function's
* identity changes when that state changes. For imperative checks in event
* handlers, get the router with `useRouter` and call `router.matchRoute(...)`
* to avoid that subscription.
*
* @returns A `matchRoute(options)` function that returns `false` or params.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchRouteHook
*/
function useMatchRoute() {
	const router = useRouter();
	return (opts) => {
		const { pending, caseSensitive, fuzzy, includeSearch, ...rest } = opts;
		return router.matchRoute(rest, {
			pending,
			caseSensitive,
			fuzzy,
			includeSearch
		});
	};
}
//#endregion
export { useMatchRoute as n, Matches as t };
