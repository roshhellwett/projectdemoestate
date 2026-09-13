import { a as __toESM, i as __exportAll, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { n as Outlet, s as notFound } from "./Match-jgdi8drQ.js";
import { r as redirect } from "./redirect-jkG3vMHM.js";
import { D as escapeHtml } from "./utils-Bru9Ambr.js";
import { o as createNonReactiveMutableStore, r as RouterCore, s as createNonReactiveReadonlyStore, t as _getAssetMatches } from "./load-server-DHCd7v1T.js";
import { a as getScriptPreloadAttrs, c as resolveManifestCssLink, i as getAssetCrossOrigin, t as appendUniqueUserTags } from "./manifest-C1Z7yn7o.js";
import { n as createFileRoute, r as createRootRoute, t as lazyRouteComponent } from "./lazyRouteComponent-DTvSqpUm.js";
import { a as useHydrated, n as useRouter } from "./useStore-D9b7VaH8.js";
import { t as getSupabaseBrowser } from "./supabase-C0JFk6-S.js";
import { _ as getSupabaseForRoute, a as getSiteSettings, c as listLocalities, d as listPublishedTestimonials, f as listReels, g as applySettings, i as getSimilarProperties, l as listPartners, n as getImagesForProperty, o as listBlogPosts, r as getPropertyBySlug, s as listFaqs, t as getBlogPostBySlug, u as listProperties } from "./queries-DIchORpl.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
//#region node_modules/@tanstack/store/dist/esm/alien.js
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
	ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
	ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
	ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
	ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
	ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
	ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
	ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
	return ReactiveFlags2;
})(ReactiveFlags || {});
// @__NO_SIDE_EFFECTS__
function createReactiveSystem({ update, notify, unwatched }) {
	return {
		link,
		unlink,
		propagate,
		checkDirty,
		shallowPropagate
	};
	function link(dep, sub, version) {
		const prevDep = sub.depsTail;
		if (prevDep !== void 0 && prevDep.dep === dep) return;
		const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
		if (nextDep !== void 0 && nextDep.dep === dep) {
			nextDep.version = version;
			sub.depsTail = nextDep;
			return;
		}
		const prevSub = dep.subsTail;
		if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
		const newLink = sub.depsTail = dep.subsTail = {
			version,
			dep,
			sub,
			prevDep,
			nextDep,
			prevSub,
			nextSub: void 0
		};
		if (nextDep !== void 0) nextDep.prevDep = newLink;
		if (prevDep !== void 0) prevDep.nextDep = newLink;
		else sub.deps = newLink;
		if (prevSub !== void 0) prevSub.nextSub = newLink;
		else dep.subs = newLink;
	}
	function unlink(link2, sub = link2.sub) {
		const dep = link2.dep;
		const prevDep = link2.prevDep;
		const nextDep = link2.nextDep;
		const nextSub = link2.nextSub;
		const prevSub = link2.prevSub;
		if (nextDep !== void 0) nextDep.prevDep = prevDep;
		else sub.depsTail = prevDep;
		if (prevDep !== void 0) prevDep.nextDep = nextDep;
		else sub.deps = nextDep;
		if (nextSub !== void 0) nextSub.prevSub = prevSub;
		else dep.subsTail = prevSub;
		if (prevSub !== void 0) prevSub.nextSub = nextSub;
		else if ((dep.subs = nextSub) === void 0) unwatched(dep);
		return nextDep;
	}
	function propagate(link2) {
		let next = link2.nextSub;
		let stack;
		top: do {
			const sub = link2.sub;
			let flags = sub.flags;
			if (!(flags & 60)) sub.flags = flags | 32;
			else if (!(flags & 12)) flags = 0;
			else if (!(flags & 4)) sub.flags = flags & -9 | 32;
			else if (!(flags & 48) && isValidLink(link2, sub)) {
				sub.flags = flags | 40;
				flags &= 1;
			} else flags = 0;
			if (flags & 2) notify(sub);
			if (flags & 1) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					const nextSub = (link2 = subSubs).nextSub;
					if (nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = nextSub;
					}
					continue;
				}
			}
			if ((link2 = next) !== void 0) {
				next = link2.nextSub;
				continue;
			}
			while (stack !== void 0) {
				link2 = stack.value;
				stack = stack.prev;
				if (link2 !== void 0) {
					next = link2.nextSub;
					continue top;
				}
			}
			break;
		} while (true);
	}
	function checkDirty(link2, sub) {
		let stack;
		let checkDepth = 0;
		let dirty = false;
		top: do {
			const dep = link2.dep;
			const flags = dep.flags;
			if (sub.flags & 16) dirty = true;
			else if ((flags & 17) === 17) {
				if (update(dep)) {
					const subs = dep.subs;
					if (subs.nextSub !== void 0) shallowPropagate(subs);
					dirty = true;
				}
			} else if ((flags & 33) === 33) {
				if (link2.nextSub !== void 0 || link2.prevSub !== void 0) stack = {
					value: link2,
					prev: stack
				};
				link2 = dep.deps;
				sub = dep;
				++checkDepth;
				continue;
			}
			if (!dirty) {
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue;
				}
			}
			while (checkDepth--) {
				const firstSub = sub.subs;
				const hasMultipleSubs = firstSub.nextSub !== void 0;
				if (hasMultipleSubs) {
					link2 = stack.value;
					stack = stack.prev;
				} else link2 = firstSub;
				if (dirty) {
					if (update(sub)) {
						if (hasMultipleSubs) shallowPropagate(firstSub);
						sub = link2.sub;
						continue;
					}
					dirty = false;
				} else sub.flags &= -33;
				sub = link2.sub;
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue top;
				}
			}
			return dirty;
		} while (true);
	}
	function shallowPropagate(link2) {
		do {
			const sub = link2.sub;
			const flags = sub.flags;
			if ((flags & 48) === 32) {
				sub.flags = flags | 16;
				if ((flags & 6) === 2) notify(sub);
			}
		} while ((link2 = link2.nextSub) !== void 0);
	}
	function isValidLink(checkLink, sub) {
		let link2 = sub.depsTail;
		while (link2 !== void 0) {
			if (link2 === checkLink) return true;
			link2 = link2.prevDep;
		}
		return false;
	}
}
var queuedEffects = [];
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
	update(atom) {
		return atom._update();
	},
	notify(effect2) {
		queuedEffects[queuedEffectsLength++] = effect2;
		effect2.flags &= ~ReactiveFlags.Watching;
	},
	unwatched(atom) {
		if (atom.depsTail !== void 0) {
			atom.depsTail = void 0;
			atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
			purgeDeps(atom);
		}
	}
});
var queuedEffectsLength = 0;
function purgeDeps(sub) {
	const depsTail = sub.depsTail;
	let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (dep !== void 0) dep = unlink(dep, sub);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/routerStores.js
var getStoreFactory = (opts) => {
	return {
		createMutableStore: createNonReactiveMutableStore,
		createReadonlyStore: createNonReactiveReadonlyStore,
		batch: (fn) => fn()
	};
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/router.js
/**
* Creates a new Router instance for React.
*
* Pass the returned router to `RouterProvider` to enable routing.
* Notable options: `routeTree` (your route definitions) and `context`
* (required if the root route was created with `createRootRouteWithContext`).
*
* @param options Router options used to configure the router.
* @returns A Router instance to be provided to `RouterProvider`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction
*/
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Asset.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var noopScriptHandler = () => {};
function setScriptAttrs(script, attrs) {
	if (!attrs) return;
	for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
}
function Asset(asset) {
	const { attrs, children, nonce, preventScriptHoist } = asset;
	const innerHTML = import_react.useMemo(() => children === void 0 ? void 0 : { __html: children }, [children]);
	switch (asset.tag) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
			...attrs,
			suppressHydrationWarning: true,
			children
		});
		case "meta": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			...attrs,
			suppressHydrationWarning: true
		});
		case "link": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
			...attrs,
			precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
			nonce,
			suppressHydrationWarning: true
		});
		case "style":
			if (asset.inlineCss && false);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				...attrs,
				dangerouslySetInnerHTML: innerHTML,
				nonce
			});
		case "script": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Script, {
			attrs,
			preventScriptHoist,
			children
		});
		default: return null;
	}
}
function Script({ attrs, children, preventScriptHoist }) {
	useRouter();
	useHydrated();
	const innerHTML = import_react.useMemo(() => children === void 0 ? void 0 : { __html: children }, [children]);
	const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
	import_react.useEffect(() => {
		if (dataScript) return;
		if (attrs?.src) {
			const link = document.createElement("a");
			link.href = attrs.src;
			const normSrc = link.href;
			for (const el of document.scripts) if (el.src === normSrc) return;
			const script = document.createElement("script");
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
		if (typeof children === "string") {
			const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
			const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
			for (const el of document.scripts) {
				if (el.hasAttribute("src")) continue;
				const sType = el.getAttribute("type") ?? "text/javascript";
				const sNonce = el.getAttribute("nonce") ?? void 0;
				if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return;
			}
			const script = document.createElement("script");
			script.textContent = children;
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
	}, [
		attrs,
		children,
		dataScript
	]);
	if (attrs?.src) {
		if (!preventScriptHoist) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			suppressHydrationWarning: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			onLoad: noopScriptHandler,
			suppressHydrationWarning: true
		});
	}
	if (typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		...attrs,
		dangerouslySetInnerHTML: innerHTML,
		suppressHydrationWarning: true
	});
	return null;
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/headContentUtils.js
function buildTagsFromMatches(router, nonce, matches, assetCrossOrigin) {
	matches = _getAssetMatches(matches);
	const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0);
	const resultMeta = [];
	const metaByAttribute = {};
	let title;
	for (let i = routeMeta.length - 1; i >= 0; i--) {
		const metas = routeMeta[i];
		for (let j = metas.length - 1; j >= 0; j--) {
			const m = metas[j];
			if (!m) continue;
			if (m.title) {
				if (!title) title = {
					tag: "title",
					children: m.title
				};
			} else if ("script:ld+json" in m) try {
				const json = JSON.stringify(m["script:ld+json"]);
				resultMeta.push({
					tag: "script",
					attrs: { type: "application/ld+json" },
					children: escapeHtml(json)
				});
			} catch {}
			else {
				const attribute = m.name ?? m.property;
				if (attribute) if (metaByAttribute[attribute]) continue;
				else metaByAttribute[attribute] = true;
				resultMeta.push({
					tag: "meta",
					attrs: {
						...m,
						nonce
					}
				});
			}
		}
	}
	if (title) resultMeta.push(title);
	if (nonce) resultMeta.push({
		tag: "meta",
		attrs: {
			property: "csp-nonce",
			content: nonce
		}
	});
	resultMeta.reverse();
	const constructedLinks = matches.flatMap((match) => match.links ?? []).filter((link) => link !== void 0).map((link) => ({
		tag: "link",
		attrs: {
			...link,
			nonce
		}
	}));
	const manifest = router.ssr?.manifest;
	const manifestCssTags = [];
	if (manifest) {
		matches.forEach((match) => {
			(manifest.routes[match.routeId]?.css)?.forEach((link) => {
				const resolvedLink = resolveManifestCssLink(link);
				manifestCssTags.push({
					tag: "link",
					attrs: {
						rel: "stylesheet",
						...resolvedLink,
						crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
						suppressHydrationWarning: true,
						nonce
					}
				});
			});
		});
		if (manifest.inlineStyle) manifestCssTags.push({
			tag: "style",
			attrs: {
				...manifest.inlineStyle.attrs,
				nonce
			},
			children: manifest.inlineStyle.children,
			inlineCss: true
		});
	}
	const preloadLinks = [];
	if (manifest) matches.forEach((match) => {
		manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
			preloadLinks.push({
				tag: "link",
				attrs: {
					...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
					nonce
				}
			});
		});
	});
	const styles = matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
		tag: "style",
		attrs: {
			...attrs,
			nonce
		},
		children
	}));
	const headScripts = matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			nonce
		},
		children
	}));
	const tags = [];
	appendUniqueUserTags(tags, resultMeta);
	tags.push(...preloadLinks);
	appendUniqueUserTags(tags, constructedLinks);
	tags.push(...manifestCssTags);
	appendUniqueUserTags(tags, styles);
	appendUniqueUserTags(tags, headScripts);
	return tags;
}
/**
* Build the head/link/meta/script tags from the renderable presented prefix.
* Used internally by `HeadContent`.
*/
var useTags = (assetCrossOrigin) => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	return buildTagsFromMatches(router, nonce, router.stores.matches.get(), assetCrossOrigin);
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/HeadContent.js
/**
* Render route-managed head tags (title, meta, links, styles, head scripts).
* Place inside the document head of your app shell.
* @link https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
*/
function HeadContent(props) {
	const tags = useTags(props.assetCrossOrigin);
	const nonce = useRouter().options.ssr?.nonce;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: tags.map((tag) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...tag,
		key: `tsr-meta-${JSON.stringify(tag)}`,
		nonce
	})) });
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Scripts.js
/**
* Render body script tags collected from route matches and SSR manifests.
* Should be placed near the end of the document body.
*/
var Scripts = () => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	const getScripts = (matches) => {
		matches = _getAssetMatches(matches);
		const scripts = matches.flatMap((match) => match.scripts ?? []).filter(Boolean).map(({ children, ...script }) => ({
			tag: "script",
			attrs: {
				...script,
				suppressHydrationWarning: true,
				nonce
			},
			children
		}));
		const manifest = router.ssr?.manifest;
		if (!manifest) return scripts;
		for (const match of matches) {
			const manifestScripts = manifest.routes[match.routeId]?.scripts;
			if (!manifestScripts) continue;
			for (const asset of manifestScripts) scripts.push({
				tag: "script",
				attrs: {
					...asset.attrs,
					nonce
				},
				children: asset.children,
				...typeof asset.attrs?.src === "string" ? { preventScriptHoist: true } : {}
			});
		}
		return scripts;
	};
	return renderScripts(router, getScripts(router.stores.matches.get()));
};
function renderScripts(router, scripts) {
	if (router.serverSsr) {
		const serverBufferedScript = router.serverSsr.takeBufferedScripts();
		if (serverBufferedScript) scripts.unshift(serverBufferedScript);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: scripts.map((asset, i) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...asset,
		key: `tsr-scripts-${asset.tag}-${i}`
	})) });
}
//#endregion
//#region src/styles/app.css?url
var app_default = "/assets/app-DNx30Cgp.css";
//#endregion
//#region src/routes/__root.tsx
var Route$14 = createRootRoute({
	head: () => ({
		meta: [{ charSet: "utf-8" }, {
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		}],
		links: [{
			rel: "stylesheet",
			href: app_default
		}]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$13 = () => import("./routes-Dz-dkp0d.js");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "SS Property - Premium Real Estate in Kolkata" }, {
		name: "description",
		content: "Verified flats, penthouses and commercial spaces across Kolkata. Lake Town, Newtown, Kasba, Rajarhat and more."
	}] }),
	loader: async () => {
		const supabase = getSupabaseForRoute();
		const [featured, latest, reels, posts, faqs, testimonials, partners, settings] = await Promise.all([
			listProperties(supabase, {
				featuredOnly: true,
				limit: 3
			}),
			listProperties(supabase, { limit: 6 }),
			listReels(supabase),
			listBlogPosts(supabase, 3),
			listFaqs(supabase),
			listPublishedTestimonials(supabase),
			listPartners(supabase),
			getSiteSettings(supabase)
		]);
		return {
			featured,
			latest,
			reels,
			posts,
			faqs,
			testimonials,
			partners,
			settings,
			site: applySettings(settings)
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
//#endregion
//#region src/routes/$.tsx
var $$splitComponentImporter$12 = () => import("./_-WECBvLzL.js");
var Route$12 = createFileRoute("/$")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$11 = () => import("./about-DhRs1I_E.js");
var Route$11 = createFileRoute("/about")({
	loader: async () => {
		const supabase = getSupabaseForRoute();
		const [properties, settings] = await Promise.all([listProperties(supabase, {}), getSiteSettings(supabase)]);
		return {
			count: properties.length,
			settings
		};
	},
	head: () => ({ meta: [{ title: "About · SS Property" }, {
		name: "description",
		content: "SS Property - verified real estate advisory for Kolkata. Every listing walked through, every paper checked."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
//#endregion
//#region src/routes/admin.tsx
var $$splitComponentImporter$10 = () => import("./admin-AV5sBwv4.js");
/**
* /admin layout route: auth guard + shared chrome. Child routes
* (admin.index.tsx dashboard, admin.new.tsx, admin.property.$id.tsx)
* render through <Outlet />.
*
* The guard runs in the browser only: the session lives in localStorage,
* which does not exist during SSR. RLS still protects every query, so an
* unauthenticated visitor sees an empty dashboard at worst.
*/
var Route$10 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin · SS Property" }, {
		name: "robots",
		content: "noindex"
	}] }),
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await getSupabaseBrowser().auth.getSession();
		if (!data.session) throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
//#endregion
//#region src/routes/journal.tsx
var $$splitComponentImporter$9 = () => import("./journal-CzodDxOw.js");
var Route$9 = createFileRoute("/journal")({
	loader: async () => {
		const supabase = getSupabaseForRoute();
		const [posts, settings] = await Promise.all([listBlogPosts(supabase), getSiteSettings(supabase)]);
		return {
			posts,
			settings
		};
	},
	head: () => ({ meta: [{ title: "Journal · SS Property" }, {
		name: "description",
		content: "Kolkata market notes, buyer guides and honest advice from SS Property."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$8 = () => import("./login-Dx-ocdPj.js");
var Route$8 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign In · SS Property" }, {
		name: "robots",
		content: "noindex"
	}] }),
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await getSupabaseBrowser().auth.getSession();
		if (data.session) throw redirect({ to: "/admin" });
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region src/routes/partner.tsx
var $$splitComponentImporter$7 = () => import("./partner-jgO3IKmb.js");
var Route$7 = createFileRoute("/partner")({
	loader: async () => {
		const supabase = getSupabaseForRoute();
		const [partners, settings] = await Promise.all([listPartners(supabase), getSiteSettings(supabase)]);
		return {
			partners,
			settings
		};
	},
	head: () => ({ meta: [{ title: "Partner With Us · SS Property" }, {
		name: "description",
		content: "Developers, interior brands and financial services - reach Kolkata's qualified property buyers."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/properties.tsx
var $$splitComponentImporter$6 = () => import("./properties-D9uHjwsG.js");
var Route$6 = createFileRoute("/properties")({
	head: () => ({ meta: [{ title: "Properties for Sale in Kolkata · SS Property" }, {
		name: "description",
		content: "Browse verified flats, penthouses and commercial spaces across Kolkata. Filter by locality, BHK and budget."
	}] }),
	validateSearch: (search) => ({
		q: typeof search.q === "string" ? search.q : "",
		locality: typeof search.locality === "string" ? search.locality : "All",
		bhk: typeof search.bhk === "string" ? search.bhk : ""
	}),
	loaderDeps: ({ search: { q = "", locality = "All", bhk = "" } }) => ({
		q,
		locality,
		bhk
	}),
	loader: async ({ deps }) => {
		const supabase = getSupabaseForRoute();
		const [properties, localities, settings] = await Promise.all([
			listProperties(supabase, {
				q: deps.q || void 0,
				locality: deps.locality,
				bhk: deps.bhk || void 0
			}),
			listLocalities(supabase),
			getSiteSettings(supabase)
		]);
		return {
			properties,
			localities,
			settings
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/sell.tsx
var $$splitComponentImporter$5 = () => import("./sell-2vc88xV_.js");
var Route$5 = createFileRoute("/sell")({
	loader: async () => ({ settings: await getSiteSettings(getSupabaseForRoute()) }),
	head: () => ({ meta: [{ title: "Sell Your Property · SS Property" }, {
		name: "description",
		content: "List your Kolkata property with SS Property. Fair valuation, verified buyers, zero pressure."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/admin.index.tsx
var $$splitComponentImporter$4 = () => import("./admin.index-NjIF5hVq.js");
/**
* /admin index: listings table + enquiries inbox. Guarded by the /admin
* layout route (admin.tsx).
*/
var Route$4 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin · SS Property" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/admin.new.tsx
var $$splitComponentImporter$3 = () => import("./admin.new-Dc0uTAcE.js");
var Route$3 = createFileRoute("/admin/new")({
	head: () => ({ meta: [{ title: "New Listing · Admin" }, {
		name: "robots",
		content: "noindex"
	}] }),
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await getSupabaseBrowser().auth.getSession();
		if (!data.session) throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/journal.$slug.tsx
var $$splitComponentImporter$2 = () => import("./journal._slug-D5sPNJ1q.js");
var Route$2 = createFileRoute("/journal/$slug")({
	loader: async ({ params }) => {
		const supabase = getSupabaseForRoute();
		const [post, settings] = await Promise.all([getBlogPostBySlug(supabase, params.slug), getSiteSettings(supabase)]);
		if (!post) throw notFound();
		return {
			post,
			settings
		};
	},
	head: ({ loaderData }) => {
		const post = loaderData?.post;
		return { meta: post ? [{
			name: "description",
			content: post.excerpt || post.content.slice(0, 150)
		}, {
			property: "og:image",
			content: post.cover_image
		}] : [] };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/property.$slug.tsx
var $$splitComponentImporter$1 = () => import("./property._slug-Dd0E9Yxq.js");
var Route$1 = createFileRoute("/property/$slug")({
	loader: async ({ params }) => {
		const supabase = getSupabaseForRoute();
		const property = await getPropertyBySlug(supabase, params.slug);
		if (!property) throw notFound();
		const [images, similar, settings] = await Promise.all([
			getImagesForProperty(supabase, property.id),
			getSimilarProperties(supabase, property, 3),
			getSiteSettings(supabase)
		]);
		return {
			property,
			images,
			similar,
			settings
		};
	},
	head: ({ loaderData }) => {
		const p = loaderData?.property;
		return { meta: p ? [
			{
				name: "description",
				content: `${p.bhk_type} in ${p.location}. ${formatPrice(p.price_inr, p.price_display)}. Verified by SS Property Kolkata.`
			},
			{
				property: "og:title",
				content: `${p.title} · SS Property`
			},
			{
				property: "og:image",
				content: p.main_image
			}
		] : [] };
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/admin.property.$id.tsx
var $$splitComponentImporter = () => import("./admin.property._id-C0LvwwZq.js");
var Route = createFileRoute("/admin/property/$id")({
	head: () => ({ meta: [{ title: "Edit Listing · Admin" }, {
		name: "robots",
		content: "noindex"
	}] }),
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await getSupabaseBrowser().auth.getSession();
		if (!data.session) throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var SplatRoute = Route$12.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => Route$14
});
var AboutRoute = Route$11.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$14
});
var AdminRoute = Route$10.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$14
});
var JournalRoute = Route$9.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$14
});
var LoginRoute = Route$8.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$14
});
var PartnerRoute = Route$7.update({
	id: "/partner",
	path: "/partner",
	getParentRoute: () => Route$14
});
var PropertiesRoute = Route$6.update({
	id: "/properties",
	path: "/properties",
	getParentRoute: () => Route$14
});
var SellRoute = Route$5.update({
	id: "/sell",
	path: "/sell",
	getParentRoute: () => Route$14
});
var AdminIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminNewRoute = Route$3.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminRoute
});
var JournalSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => JournalRoute
});
var PropertySlugRoute = Route$1.update({
	id: "/property/$slug",
	path: "/property/$slug",
	getParentRoute: () => Route$14
});
var AdminRouteChildren = {
	AdminNewRoute,
	AdminIndexRoute,
	AdminPropertyIdRoute: Route.update({
		id: "/property/$id",
		path: "/property/$id",
		getParentRoute: () => AdminRoute
	})
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var JournalRouteChildren = { JournalSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	SplatRoute,
	AboutRoute,
	AdminRoute: AdminRouteWithChildren,
	JournalRoute: JournalRoute._addFileChildren(JournalRouteChildren),
	LoginRoute,
	PartnerRoute,
	PropertiesRoute,
	SellRoute,
	PropertySlugRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
/**
* App router. Route files live in src/routes/; the route tree is generated
* into routeTree.gen.ts by the TanStack router plugin (never edit by hand).
*/
function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { Route$5 as a, Route$9 as c, getRouter, Route$2 as i, Route$11 as l, Route as n, Route$6 as o, Route$1 as r, Route$7 as s, router_exports as t, Route$13 as u };
