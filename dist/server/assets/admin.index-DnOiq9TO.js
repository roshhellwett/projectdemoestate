import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { t as useNavigate } from "./useNavigate-Dc9WRbRN.js";
import { t as getSupabaseBrowser } from "./supabase-C0JFk6-S.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
import { n as Wordmark } from "./brand-DsEEJCZg.js";
//#region src/components/admin/dashboard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Admin dashboard (/admin): listings table + enquiries inbox.
* Auth guard lives in the /admin layout route; RLS protects all data.
*/
function AdminDashboard() {
	const supabase = getSupabaseBrowser();
	const navigate = useNavigate();
	const [view, setView] = (0, import_react.useState)("properties");
	const [properties, setProperties] = (0, import_react.useState)([]);
	const [enquiries, setEnquiries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		(async () => {
			setLoading(true);
			if (view === "properties") {
				const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
				setProperties(data ?? []);
			} else {
				const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(100);
				setEnquiries(data ?? []);
			}
			setLoading(false);
		})();
	}, [view, supabase]);
	async function signOut() {
		await supabase.auth.signOut();
		navigate({ to: "/login" });
	}
	async function togglePublished(p) {
		await supabase.from("properties").update({ is_published: !p.is_published }).eq("id", p.id);
		setProperties((rows) => rows.map((r) => r.id === p.id ? {
			...r,
			is_published: !r.is_published
		} : r));
	}
	async function removeProperty(p) {
		if (!window.confirm(`Delete "${p.title}"? This also removes its gallery. Cannot be undone.`)) return;
		await supabase.from("properties").delete().eq("id", p.id);
		setProperties((rows) => rows.filter((r) => r.id !== p.id));
	}
	async function setEnquiryStatus(e, status) {
		await supabase.from("enquiries").update({ status }).eq("id", e.id);
		setEnquiries((rows) => rows.map((r) => r.id === e.id ? {
			...r,
			status
		} : r));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell-wide flex h-16 items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { className: "origin-left scale-90" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex gap-1 text-[13px] font-medium",
						"aria-label": "Admin sections",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView("properties"),
							className: `rounded-full px-4 py-2 transition-colors ${view === "properties" ? "bg-ink text-paper" : "text-muted hover:text-ink"}`,
							children: "Listings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView("enquiries"),
							className: `rounded-full px-4 py-2 transition-colors ${view === "enquiries" ? "bg-ink text-paper" : "text-muted hover:text-ink"}`,
							children: "Enquiries"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/new",
						className: "rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-transform hover:-translate-y-0.5",
						children: "+ New Listing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: signOut,
						className: "text-[13px] text-muted hover:text-ink",
						children: "Sign out"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shell-wide py-10",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Loading…"
			}) : view === "properties" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyTable, {
				rows: properties,
				onToggle: togglePublished,
				onDelete: removeProperty
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryTable, {
				rows: enquiries,
				onStatus: setEnquiryStatus
			})
		})]
	});
}
function PropertyTable({ rows, onToggle, onDelete }) {
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No listings yet. Create your first one."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line text-[11px] uppercase tracking-[0.14em] text-muted-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-5 py-4",
						children: "Listing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-4",
						children: "Price"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-4",
						children: "Locality"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-4",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-4 text-right",
						children: "Actions"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line/60 last:border-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [p.main_image_thumb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.main_image_thumb,
								alt: "",
								width: 56,
								height: 42,
								className: "h-11 w-14 rounded-md object-cover"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs truncate font-medium text-ink",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: p.bhk_type
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-4 font-medium text-ink",
						children: formatPrice(p.price_inr, p.price_display)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-4 text-muted",
						children: p.locality
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onToggle(p),
							className: `rounded-full px-3 py-1 text-[11px] font-semibold ${p.is_published ? "bg-verdigris-soft text-verdigris" : "bg-paper-3 text-muted"}`,
							children: p.is_published ? "Published" : "Draft"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-4 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-4 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/property/$id",
								params: { id: p.id },
								className: "font-semibold text-brass hover:text-ink",
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onDelete(p),
								className: "text-danger/80 hover:text-danger",
								children: "Delete"
							})]
						})
					})
				]
			}, p.id)) })]
		})
	});
}
function EnquiryTable({ rows, onStatus }) {
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No enquiries yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-card)] border border-line bg-white p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${e.status === "new" ? "bg-brass-ghost text-brass" : "bg-paper-3 text-muted"}`,
								children: e.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-ink",
								children: e.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${e.phone}`,
								className: "text-[13px] text-brass hover:text-ink",
								children: e.phone
							}),
							e.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[13px] text-muted",
								children: e.email
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: e.status,
						onChange: (ev) => onStatus(e, ev.target.value),
						className: "rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink focus:border-brass focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "new",
								children: "New"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "contacted",
								children: "Contacted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "closed",
								children: "Closed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "spam",
								children: "Spam"
							})
						]
					})]
				}),
				e.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: e.message
				}) : null,
				e.payload && Object.keys(e.payload).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: Object.entries(e.payload).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-paper-2 px-3 py-1 text-[11px] text-muted",
						children: [
							k.replace(/_/g, " "),
							": ",
							String(v)
						]
					}, k))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[11px] text-muted-2",
					children: new Date(e.created_at).toLocaleString("en-IN")
				})
			]
		}, e.id))
	});
}
//#endregion
//#region src/routes/admin.index.tsx?tsr-split=component
/**
* /admin index: listings table + enquiries inbox. Guarded by the /admin
* layout route (admin.tsx).
*/
var SplitComponent = AdminDashboard;
//#endregion
export { SplitComponent as component };
