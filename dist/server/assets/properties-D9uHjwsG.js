import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { o as Route } from "./router-BDjoqMKo.js";
import { i as Header, n as Footer, r as FooterSettingsContext, t as initRevealOnScroll } from "./reveal-D8gGmGzo.js";
import { t as PropertyCard } from "./property-card-CovbnlJ_.js";
//#region src/routes/properties.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BHK_FILTERS = [
	"",
	"2",
	"3",
	"4",
	"commercial"
];
var BHK_LABELS = {
	"": "Any",
	"2": "2 BHK",
	"3": "3 BHK",
	"4": "4 BHK",
	commercial: "Commercial"
};
function PropertiesPage() {
	const { properties, localities, settings } = Route.useLoaderData();
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const [q, setQ] = (0, import_react.useState)(search.q);
	const [prevSearchQ, setPrevSearchQ] = (0, import_react.useState)(search.q);
	if (search.q !== prevSearchQ) {
		setPrevSearchQ(search.q);
		setQ(search.q);
	}
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, [properties]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => {
			if (q !== search.q) navigate({
				search: {
					...search,
					q
				},
				replace: true
			});
		}, 350);
		return () => clearTimeout(t);
	}, [q]);
	const setFilter = (patch) => {
		navigate({
			search: {
				...search,
				...patch
			},
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-b border-line bg-paper-2/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell py-14 md:py-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "eyebrow",
									children: [properties.length, " verified listings"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl",
									children: "Find your address in Kolkata"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-[15px] leading-relaxed text-muted",
									children: settings.properties_intro ?? "Filter by locality, configuration and budget - every listing verified in person."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "sticky top-16 z-20 border-b border-line bg-paper/90 backdrop-blur-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell flex flex-col gap-3 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "relative flex-1 min-w-56",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Search properties"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "search",
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "Search locality, project, keyword…",
										className: "w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Locality"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: search.locality,
											onChange: (e) => setFilter({ locality: e.target.value }),
											className: "appearance-none rounded-full border border-line bg-white px-5 py-2.5 pr-10 text-sm font-medium text-ink focus:border-brass focus:outline-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "All",
												children: "All areas"
											}), localities.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: l.locality,
												children: [
													l.locality,
													" (",
													l.count,
													")"
												]
											}, l.locality))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted",
											children: "▾"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								role: "group",
								"aria-label": "Bedrooms",
								children: BHK_FILTERS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setFilter({ bhk: b }),
									"aria-pressed": search.bhk === b,
									className: `rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${search.bhk === b ? "border-ink bg-ink text-paper" : "border-line bg-white text-muted hover:border-brass hover:text-ink"}`,
									children: BHK_LABELS[b]
								}, b))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell-wide py-12",
						children: properties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { q: search.q }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
							children: properties.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "reveal",
								style: { transitionDelay: `${Math.min(i, 6) * 40}ms` },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, {
									property: p,
									priority: i < 3
								})
							}, p.id))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSettingsContext.Provider, {
				value: settings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			})
		]
	});
}
function EmptyState({ q }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-ink",
				children: "Nothing matches that yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [q ? `No results for “${q}”. ` : "", "Try clearing the filters, or tell us what you are looking for and we will find it."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/sell",
				className: "mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper",
				children: "Post a Requirement"
			})
		]
	});
}
//#endregion
export { PropertiesPage as component };
