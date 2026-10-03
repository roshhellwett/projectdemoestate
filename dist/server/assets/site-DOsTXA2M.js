import { n as useRouter, o as require_jsx_runtime, s as require_react, u as __toESM } from "./useStore-DOgV22Lo.js";
import { A as hasKeys, O as functionalUpdate, T as deepEqual, j as isDangerousProtocol, k as getUrlScheme, l as removeTrailingSlash, n as useForwardedRef, o as exactPathTest } from "./utils-pXzjPIMk.js";
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/link.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
require_jsx_runtime();
function resolveExternalLink(to, protocolAllowlist) {
	const scheme = typeof to === "string" && getUrlScheme(to);
	if (!scheme) return;
	if (!protocolAllowlist.has(scheme)) return null;
	return to;
}
/**
* Build anchor-like props for declarative navigation and preloading.
*
* Returns stable `href`, event handlers and accessibility props derived from
* router options and active state. Used internally by `Link` and custom links.
*
* Options cover `to`, `params`, `search`, `hash`, `state`, `preload`,
* `activeProps`, `inactiveProps`, and more.
*
* @returns React anchor props suitable for `<a>` or custom components.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLinkPropsHook
*/
function useLinkProps(options, forwardedRef) {
	const router = useRouter();
	const innerRef = useForwardedRef(forwardedRef);
	const { activeProps, inactiveProps, activeOptions, to: toOption, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
	const to = toOption;
	{
		const directExternalLink = resolveExternalLink(to, router.protocolAllowlist);
		const next = directExternalLink === void 0 ? router.buildLocation(options) : void 0;
		const hrefOption = next ? getHrefOption(next, router, disabled) : directExternalLink ?? void 0;
		const linkDisabled = disabled || !hrefOption;
		const externalLink = directExternalLink ?? (hrefOption && getUrlScheme(hrefOption) ? hrefOption : void 0);
		const isActive = (() => {
			if (!next || !disabled && !hrefOption || externalLink) return false;
			const currentLocation = router.stores.location.get();
			const exact = activeOptions?.exact ?? false;
			if (exact) {
				if (!exactPathTest(currentLocation.pathname, next.pathname, router.basepath)) return false;
			} else {
				const currentPathSplit = removeTrailingSlash(currentLocation.pathname, router.basepath);
				const nextPathSplit = removeTrailingSlash(next.pathname, router.basepath);
				if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
			}
			if (activeOptions?.includeSearch ?? true) {
				if (currentLocation.search !== next.search) {
					const currentSearchEmpty = !currentLocation.search || typeof currentLocation.search === "object" && !hasKeys(currentLocation.search);
					const nextSearchEmpty = !next.search || typeof next.search === "object" && !hasKeys(next.search);
					if (!(currentSearchEmpty && nextSearchEmpty)) {
						if (!deepEqual(currentLocation.search, next.search, {
							partial: !exact,
							ignoreUndefined: !activeOptions?.explicitUndefined
						})) return false;
					}
				}
			}
			if (activeOptions?.includeHash) return false;
			return true;
		})();
		if (externalLink) return {
			...propsSafeToSpread,
			ref: innerRef,
			href: externalLink,
			...children && { children },
			...target && { target },
			...disabled && { disabled },
			...style && { style },
			...className && { className }
		};
		const resolvedActiveProps = isActive ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
		const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
		const resolvedStyle = (() => {
			const baseStyle = style;
			const activeStyle = resolvedActiveProps.style;
			const inactiveStyle = resolvedInactiveProps.style;
			if (!baseStyle && !activeStyle && !inactiveStyle) return;
			if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle;
			if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle;
			if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle;
			return {
				...baseStyle,
				...activeStyle,
				...inactiveStyle
			};
		})();
		const resolvedClassName = (() => {
			const baseClassName = className;
			const activeClassName = resolvedActiveProps.className;
			const inactiveClassName = resolvedInactiveProps.className;
			if (!baseClassName && !activeClassName && !inactiveClassName) return "";
			let out = "";
			if (baseClassName) out = baseClassName;
			if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName;
			if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
			return out;
		})();
		return {
			...propsSafeToSpread,
			...resolvedActiveProps,
			...resolvedInactiveProps,
			href: hrefOption,
			ref: innerRef,
			disabled: !!linkDisabled,
			target,
			...resolvedStyle && { style: resolvedStyle },
			...resolvedClassName && { className: resolvedClassName },
			...linkDisabled && STATIC_DISABLED_PROPS,
			...isActive && STATIC_ACTIVE_PROPS
		};
	}
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
	role: "link",
	"aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
	"data-status": "active",
	"aria-current": "page"
};
function getHrefOption(next, router, disabled) {
	if (disabled) return;
	const location = next.maskedLocation ?? next;
	const href = location.external ? location.publicHref : router.history.createHref(location.publicHref) || "/";
	if ((location.external || href !== location.publicHref) && isDangerousProtocol(href, router.protocolAllowlist)) return;
	return href;
}
/**
* A strongly-typed anchor component for declarative navigation.
* Handles path, search, hash and state updates with optional route preloading
* and active-state styling.
*
* Props:
* - `preload`: Controls route preloading (eg. 'intent', 'render', 'viewport', true/false)
* - `preloadDelay`: Delay in ms before preloading on focus, hover, or viewport entry
* - `activeProps`/`inactiveProps`: Additional props merged when link is active/inactive
* - `resetScroll`/`hashScrollIntoView`: Control scroll behavior on navigation
* - `viewTransition`/`startTransition`: Use View Transitions/React transitions for navigation
* - `ignoreBlocker`: Bypass registered blockers
*
* @returns An anchor-like element that navigates without full page reloads.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
*/
var Link = import_react.forwardRef((props, ref) => {
	const { _asChild, ...rest } = props;
	let { type: _type, ...linkProps } = useLinkProps(rest, ref);
	const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
	if (!_asChild) {
		const { disabled: _, ...rest } = linkProps;
		linkProps = rest;
	}
	return import_react.createElement(_asChild || "a", linkProps, children);
});
//#endregion
//#region src/lib/site.ts
/**
* Site-wide constants - business identity, contact, nav.
* Defaults are configured for the Demo Real Estate Brand (Apex Living);
* admin can override them live from Dashboard > Settings (stored in the site_settings table).
*
* When shipping to a new client, change SITE values here or update the
* settings table to seamlessly rebrand the entire platform.
*/
var SITE = {
	name: "Apex Living",
	tagline: "Premier Luxury Real Estate Advisory",
	phone: "+91 98000 00000",
	phoneHref: "tel:+919800000000",
	whatsapp: "https://wa.me/919800000000",
	email: "zenithprojects@icloud.com",
	emailHref: "mailto:zenithprojects@icloud.com",
	city: "Kolkata, West Bengal",
	instagram: "https://instagram.com",
	instagramHandle: "apexliving.demo",
	facebook: "https://facebook.com",
	youtube: "https://youtube.com",
	isDemo: true,
	founderName: "Aarav Mehta",
	founderTitle: "Founder & Principal Advisor",
	founderQuote: "Excellence in Every Square Foot."
};
var NAV_LINKS = [
	{
		label: "Properties",
		to: "/properties"
	},
	{
		label: "Partners",
		to: "/partners"
	},
	{
		label: "Compare",
		to: "/compare"
	},
	{
		label: "Sell",
		to: "/sell"
	},
	{
		label: "Calculator",
		to: "/calculator"
	},
	{
		label: "Journal",
		to: "/journal"
	},
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Instagram",
		to: "/instagram"
	}
];
var FOOTER_SERVICES = [
	{
		label: "Buy a Property",
		to: "/properties"
	},
	{
		label: "Sell Your Property",
		to: "/sell"
	},
	{
		label: "Partner With Us",
		to: "/partners"
	}
];
/**
* Merge admin settings (site_settings table) over the defaults above.
* Every key is optional - anything the admin has not written keeps the default.
*/
function applySettings(settings) {
	const wa = settings.whatsapp_number ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}` : SITE.whatsapp;
	const phone = settings.phone ?? SITE.phone;
	return {
		name: settings.brand_name ?? SITE.name,
		tagline: settings.tagline ?? SITE.tagline,
		phone,
		phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
		whatsapp: wa,
		email: settings.email ?? SITE.email,
		emailHref: `mailto:${settings.email ?? SITE.email}`,
		city: settings.city ?? SITE.city,
		instagram: settings.instagram_url ?? SITE.instagram,
		instagramHandle: settings.instagram_handle ?? SITE.instagramHandle,
		facebook: settings.facebook_url ?? SITE.facebook,
		youtube: settings.youtube_url ?? SITE.youtube,
		footerNote: settings.footer_note ?? "Verified listings. Transparent pricing. No hidden charges.",
		founderName: settings.founder_name ?? SITE.founderName,
		founderTitle: settings.founder_title ?? SITE.founderTitle,
		founderQuote: settings.founder_quote ?? SITE.founderQuote
	};
}
//#endregion
export { Link as a, applySettings as i, NAV_LINKS as n, SITE as r, FOOTER_SERVICES as t };
