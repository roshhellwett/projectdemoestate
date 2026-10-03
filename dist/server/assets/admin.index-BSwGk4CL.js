import { o as require_jsx_runtime, s as require_react, u as __toESM } from "./useStore-DOgV22Lo.js";
import { a as Link } from "./site-DOsTXA2M.js";
import { t as useNavigate } from "./useNavigate-D0fTJmIi.js";
import { t as getSupabaseBrowser } from "./supabase-DLBQfxwj.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
import { t as LogoImage } from "./brand-BfXua-TG.js";
import { C as upsertTestimonial, S as upsertPartner, _ as uploadPartnerLogo, b as upsertBlogPost, c as deleteReel, i as deleteFaq, l as deleteTestimonial, m as saveSettings, o as deletePartner, p as saveReel, r as deleteBlogPost, u as parseInstagramUrl, x as upsertFaq, y as uploadReelCover } from "./cms-Z4LonWg3.js";
//#region src/components/admin/dashboard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "properties",
		label: "Listings"
	},
	{
		id: "enquiries",
		label: "Enquiries"
	},
	{
		id: "reels",
		label: "Instagram"
	},
	{
		id: "journal",
		label: "Journal"
	},
	{
		id: "reviews",
		label: "Reviews"
	},
	{
		id: "faqs",
		label: "FAQs"
	},
	{
		id: "partners",
		label: "Partners"
	},
	{
		id: "settings",
		label: "Settings"
	}
];
function AdminDashboard() {
	const supabase = getSupabaseBrowser();
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("properties");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [properties, setProperties] = (0, import_react.useState)([]);
	const [enquiries, setEnquiries] = (0, import_react.useState)([]);
	const [reels, setReels] = (0, import_react.useState)([]);
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [testimonials, setTestimonials] = (0, import_react.useState)([]);
	const [faqs, setFaqs] = (0, import_react.useState)([]);
	const [partners, setPartners] = (0, import_react.useState)([]);
	const [settings, setSettings] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		(async () => {
			setLoading(true);
			if (tab === "properties") {
				const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
				setProperties(data ?? []);
			} else if (tab === "enquiries") {
				const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(100);
				setEnquiries(data ?? []);
			} else if (tab === "reels") {
				const { data } = await supabase.from("reels").select("*").order("display_order");
				setReels(data ?? []);
			} else if (tab === "journal") {
				const { data } = await supabase.from("blog_posts").select("*").order("publish_date", { ascending: false });
				setPosts(data ?? []);
			} else if (tab === "reviews") {
				const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
				setTestimonials(data ?? []);
			} else if (tab === "faqs") {
				const { data } = await supabase.from("faqs").select("*").order("display_order");
				setFaqs(data ?? []);
			} else if (tab === "partners") {
				const { data } = await supabase.from("partners").select("*").order("display_order");
				setPartners(data ?? []);
			} else if (tab === "settings") {
				const { data } = await supabase.from("site_settings").select("key, value");
				const map = {};
				for (const row of data ?? []) map[row.key] = row.value;
				setSettings(map);
			}
			setLoading(false);
		})();
	}, [tab, supabase]);
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell-wide flex h-16 items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "Home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoImage, { className: "h-8" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden flex-wrap gap-1 text-[13px] font-medium lg:flex",
						"aria-label": "Admin sections",
						children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTab(t.id),
							className: `rounded-full px-3.5 py-2 transition-colors ${tab === t.id ? "bg-ink text-paper" : "text-muted hover:text-ink"}`,
							children: t.label
						}, t.id))
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1 overflow-x-auto border-t border-line px-4 pb-2 pt-2 text-[13px] font-medium lg:hidden",
				"aria-label": "Admin sections",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t.id),
					className: `shrink-0 rounded-full px-3.5 py-1.5 transition-colors ${tab === t.id ? "bg-ink text-paper" : "text-muted hover:text-ink"}`,
					children: t.label
				}, t.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shell-wide py-10",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-16 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-7 animate-spin rounded-full border-2 border-brass border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted",
						children: "Loading dashboard data..."
					})]
				})
			}) : tab === "properties" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyTable, {
				rows: properties,
				onToggle: togglePublished,
				onDelete: removeProperty
			}) : tab === "enquiries" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryTable, {
				rows: enquiries,
				onStatus: setEnquiryStatus
			}) : tab === "reels" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelsManager, {
				reels,
				refresh: setReels
			}) : tab === "journal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalManager, {
				posts,
				refresh: setPosts
			}) : tab === "reviews" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsManager, {
				testimonials,
				refresh: setTestimonials
			}) : tab === "faqs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqManager, {
				faqs,
				refresh: setFaqs
			}) : tab === "partners" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnersManager, {
				partners,
				refresh: setPartners
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsManager, { settings })
		})]
	});
}
var inputCls = "w-full rounded-[var(--radius-input)] border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none";
var labelCls = "mb-1.5 block text-xs font-semibold text-ink";
function Btn({ children, onClick, kind = "primary", disabled, type = "button", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		onClick,
		disabled,
		className: `rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all disabled:opacity-60 ${kind === "primary" ? "bg-ink text-paper hover:-translate-y-0.5" : kind === "danger" ? "text-danger/80 hover:text-danger" : "border border-ink/20 text-ink hover:border-ink/50"} ${className}`,
		children
	});
}
function AdminCard({ title, children, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-card)] border border-line bg-white p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-medium text-ink",
				children: title
			}), actions]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children
		})]
	});
}
function Notice({ state }) {
	if (state.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "text-xs text-danger",
		children: state.error
	});
	if (state.saved) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-semibold text-verdigris",
		children: "Saved ✓"
	});
	return null;
}
function useNotice() {
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(false);
	const notice = {
		error,
		saved
	};
	const flash = (err) => {
		if (err) {
			setError(err);
			setSaved(false);
		} else {
			setError("");
			setSaved(true);
			setTimeout(() => setSaved(false), 2500);
		}
	};
	return {
		notice,
		flash
	};
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
function ReelsManager({ reels, refresh }) {
	const [url, setUrl] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [cover, setCover] = (0, import_react.useState)(null);
	const { notice, flash } = useNotice();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	async function reload() {
		const { data } = await getSupabaseBrowser().from("reels").select("*").order("display_order");
		refresh(data ?? []);
	}
	async function onAdd() {
		setBusy(true);
		try {
			await saveReel({
				title,
				url,
				cover: cover?.cover,
				coverThumb: cover?.thumb,
				displayOrder: (reels.at(-1)?.display_order ?? 0) + 1,
				isPublished: true
			});
			setUrl("");
			setTitle("");
			setCover(null);
			flash();
			await reload();
		} catch (err) {
			flash(err.message);
		} finally {
			setBusy(false);
		}
	}
	async function onTogglePublish(reel) {
		await getSupabaseBrowser().from("reels").update({ is_published: !reel.is_published }).eq("id", reel.id);
		await reload();
	}
	async function onDelete(reel) {
		if (!window.confirm(`Remove "${reel.title}" from the Instagram section?`)) return;
		await deleteReel(reel.id);
		await reload();
	}
	const parsed = url ? parseInstagramUrl(url) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
			title: "Add a reel",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: async (e) => {
					const f = e.target.files?.[0];
					e.target.value = "";
					if (!f) return;
					try {
						setCover(await uploadReelCover(f));
					} catch (err) {
						flash(err.message);
					}
				}
			}),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "reel-url",
									className: labelCls,
									children: "Instagram reel link"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "reel-url",
									value: url,
									onChange: (e) => setUrl(e.target.value),
									className: inputCls,
									placeholder: "https://www.instagram.com/reel/... (just paste it)"
								}),
								url && !parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-danger",
									children: "That does not look like an Instagram reel link."
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "reel-title",
							className: labelCls,
							children: ["Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-normal text-muted-2",
								children: "(optional)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "reel-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							className: inputCls,
							placeholder: "e.g. Lake Town 3 BHK walkthrough"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: cover.thumb,
										alt: "Reel cover preview",
										width: 48,
										height: 60,
										className: "h-15 w-12 rounded-md object-cover",
										style: { height: 60 }
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "ghost",
										onClick: () => fileRef.current?.click(),
										children: cover ? "Change cover" : "Add cover image"
									}),
									cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-xs text-muted hover:text-danger",
										onClick: () => setCover(null),
										children: "Remove"
									}) : null
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: onAdd,
						disabled: busy || !parsed,
						children: busy ? "Adding..." : "Add to Instagram section"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { state: notice })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-2",
					children: "Reels appear only in the Instagram section of the home page. Cover image is optional - without one the tile shows a plain gradient. The link works with reel and post URLs."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
			title: `Reels on the site (${reels.length})`,
			children: reels.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nothing here yet. Paste your first reel link above."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: reels.map((reel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "group relative overflow-hidden rounded-xl border border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: reel.cover_thumb || reel.cover_image,
							alt: reel.title,
							className: `aspect-[4/5] w-full object-cover ${reel.is_published ? "" : "opacity-40 grayscale"}`,
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium text-paper",
								children: reel.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-paper/60",
								children: reel.is_published ? "Live" : "Hidden"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onTogglePublish(reel),
								className: "rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper",
								children: reel.is_published ? "Hide" : "Show"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onDelete(reel),
								className: "rounded-full bg-danger/85 px-2.5 py-1 text-[10px] font-semibold text-white",
								children: "Remove"
							})]
						})
					]
				}, reel.id))
			})
		})]
	});
}
function emptyPost() {
	return {
		slug: "",
		title: "",
		publishDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		author: "Editorial Team",
		cover: "",
		coverThumb: "",
		content: "",
		excerpt: "",
		isPublished: true
	};
}
function JournalManager({ posts, refresh }) {
	const [draft, setDraft] = (0, import_react.useState)(null);
	const { notice, flash } = useNotice();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function reload() {
		const { data } = await getSupabaseBrowser().from("blog_posts").select("*").order("publish_date", { ascending: false });
		refresh(data ?? []);
	}
	async function onSave() {
		if (!draft) return;
		setBusy(true);
		try {
			await upsertBlogPost({
				id: draft.id,
				slug: draft.slug || draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
				title: draft.title,
				publishDate: draft.publishDate,
				author: draft.author,
				cover: draft.cover,
				coverThumb: draft.coverThumb,
				content: draft.content,
				excerpt: draft.excerpt,
				isPublished: draft.isPublished
			});
			setDraft(null);
			flash();
			await reload();
		} catch (err) {
			flash(err.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
			title: draft ? draft.id ? "Edit article" : "New article" : `Journal articles (${posts.length})`,
			actions: draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				kind: "ghost",
				onClick: () => setDraft(null),
				children: "Cancel"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setDraft(emptyPost()),
				children: "+ New Article"
			}),
			children: draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.title,
							onChange: (e) => setDraft({
								...draft,
								title: e.target.value
							}),
							className: inputCls
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelCls,
						children: ["Slug ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-normal text-muted-2",
							children: "(URL)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft.slug,
						onChange: (e) => setDraft({
							...draft,
							slug: e.target.value
						}),
						className: inputCls,
						placeholder: "auto from title"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Publish date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: draft.publishDate,
						onChange: (e) => setDraft({
							...draft,
							publishDate: e.target.value
						}),
						className: inputCls
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Author"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft.author,
						onChange: (e) => setDraft({
							...draft,
							author: e.target.value
						}),
						className: inputCls
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelCls,
						children: ["Cover image URL ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-normal text-muted-2",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft.cover,
						onChange: (e) => setDraft({
							...draft,
							cover: e.target.value,
							coverThumb: e.target.value
						}),
						className: inputCls,
						placeholder: "https://..."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelCls,
							children: ["Excerpt ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-normal text-muted-2",
								children: "(1-2 lines)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 2,
							value: draft.excerpt,
							onChange: (e) => setDraft({
								...draft,
								excerpt: e.target.value
							}),
							className: `${inputCls} resize-none`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelCls,
							children: ["Article body ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-normal text-muted-2",
								children: "(blank line between paragraphs)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 10,
							value: draft.content,
							onChange: (e) => setDraft({
								...draft,
								content: e.target.value
							}),
							className: `${inputCls} resize-y`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: draft.isPublished,
							onChange: (e) => setDraft({
								...draft,
								isPublished: e.target.checked
							}),
							className: "h-4 w-4 accent-[#a9862f]"
						}), "Published"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { state: notice }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: onSave,
							disabled: busy || !draft.title.trim() || !draft.content.trim(),
							children: busy ? "Saving..." : draft.id ? "Save Article" : "Publish Article"
						})]
					})
				]
			}) : posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No articles yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 py-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							p.publish_date,
							" · ",
							p.is_published ? "Published" : "Draft"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "font-semibold text-brass hover:text-ink",
							onClick: () => setDraft({
								id: p.id,
								slug: p.slug,
								title: p.title,
								publishDate: p.publish_date,
								author: p.author,
								cover: p.cover_image,
								coverThumb: p.cover_thumb,
								content: p.content,
								excerpt: p.excerpt,
								isPublished: p.is_published
							}),
							children: "Edit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-danger/80 hover:text-danger",
							onClick: async () => {
								if (!window.confirm(`Delete "${p.title}"?`)) return;
								await deleteBlogPost(p.id);
								await reload();
							},
							children: "Delete"
						})]
					})]
				}, p.id))
			})
		})
	});
}
function ReviewsManager({ testimonials, refresh }) {
	const [d, setD] = (0, import_react.useState)({
		clientName: "",
		clientLocation: "",
		rating: 5,
		reviewText: "",
		reviewDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		isPublished: true
	});
	const { notice, flash } = useNotice();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function reload() {
		const { data } = await getSupabaseBrowser().from("testimonials").select("*").order("created_at", { ascending: false });
		refresh(data ?? []);
	}
	async function onAdd() {
		setBusy(true);
		try {
			await upsertTestimonial({
				clientName: d.clientName,
				clientLocation: d.clientLocation,
				rating: d.rating,
				reviewText: d.reviewText,
				reviewDate: d.reviewDate || null,
				isPublished: d.isPublished
			});
			setD({
				clientName: "",
				clientLocation: "",
				rating: 5,
				reviewText: "",
				reviewDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				isPublished: true
			});
			flash();
			await reload();
		} catch (err) {
			flash(err.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
			title: "Add a review",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Client name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: d.clientName,
						onChange: (e) => setD({
							...d,
							clientName: e.target.value
						}),
						className: inputCls,
						placeholder: "Full name"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelCls,
						children: ["Location ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-normal text-muted-2",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: d.clientLocation,
						onChange: (e) => setD({
							...d,
							clientLocation: e.target.value
						}),
						className: inputCls,
						placeholder: "Lake Town, Kolkata"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Rating"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: d.rating,
						onChange: (e) => setD({
							...d,
							rating: Number(e.target.value)
						}),
						className: inputCls,
						children: [
							5,
							4,
							3,
							2,
							1
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: r,
							children: "★".repeat(r)
						}, r))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Review date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: d.reviewDate,
						onChange: (e) => setD({
							...d,
							reviewDate: e.target.value
						}),
						className: inputCls
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Review text"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: d.reviewText,
							onChange: (e) => setD({
								...d,
								reviewText: e.target.value
							}),
							className: `${inputCls} resize-none`,
							placeholder: "What the client said (keep it short - 2-3 lines)"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: onAdd,
					disabled: busy || !d.clientName.trim() || !d.reviewText.trim(),
					children: busy ? "Adding..." : "Add Review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { state: notice })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
			title: `Reviews (${testimonials.length})`,
			children: testimonials.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No reviews yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold text-ink",
								children: [
									t.client_name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-normal text-muted",
										children: ["· ", t.client_location || "Kolkata"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-muted",
								children: t.review_text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-2",
								children: [
									"★".repeat(t.rating),
									" · ",
									t.is_published ? "Published" : "Hidden"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "font-semibold text-brass hover:text-ink",
							onClick: async () => {
								await getSupabaseBrowser().from("testimonials").update({ is_published: !t.is_published }).eq("id", t.id);
								await reload();
							},
							children: t.is_published ? "Hide" : "Show"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-danger/80 hover:text-danger",
							onClick: async () => {
								if (!window.confirm(`Delete review by ${t.client_name}?`)) return;
								await deleteTestimonial(t.id);
								await reload();
							},
							children: "Delete"
						})]
					})]
				}, t.id))
			})
		})]
	});
}
function FaqManager({ faqs, refresh }) {
	const [d, setD] = (0, import_react.useState)({
		question: "",
		answer: "",
		category: "General",
		displayOrder: faqs.length + 1,
		isPublished: true
	});
	const { notice, flash } = useNotice();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	async function reload() {
		const { data } = await getSupabaseBrowser().from("faqs").select("*").order("display_order");
		refresh(data ?? []);
	}
	async function onSave() {
		setBusy(true);
		try {
			await upsertFaq({
				id: editId ?? void 0,
				...d
			});
			setD({
				question: "",
				answer: "",
				category: "General",
				displayOrder: faqs.length + 1,
				isPublished: true
			});
			setEditId(null);
			flash();
			await reload();
		} catch (err) {
			flash(err.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
			title: editId ? "Edit FAQ" : "Add an FAQ",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Question"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: d.question,
							onChange: (e) => setD({
								...d,
								question: e.target.value
							}),
							className: inputCls,
							placeholder: "Do you charge buyers a fee?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: d.category,
						onChange: (e) => setD({
							...d,
							category: e.target.value
						}),
						className: inputCls
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Display order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						value: d.displayOrder,
						onChange: (e) => setD({
							...d,
							displayOrder: Number(e.target.value)
						}),
						className: inputCls
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Answer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: d.answer,
							onChange: (e) => setD({
								...d,
								answer: e.target.value
							}),
							className: `${inputCls} resize-none`
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: onSave,
						disabled: busy || !d.question.trim() || !d.answer.trim(),
						children: busy ? "Saving..." : editId ? "Save FAQ" : "Add FAQ"
					}),
					editId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "ghost",
						onClick: () => {
							setEditId(null);
							setD({
								question: "",
								answer: "",
								category: "General",
								displayOrder: faqs.length + 1,
								isPublished: true
							});
						},
						children: "Cancel"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { state: notice })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
			title: `FAQs (${faqs.length})`,
			children: faqs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No FAQs yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-ink",
							children: f.question
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-1 text-sm text-muted",
							children: f.answer
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 text-[13px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "font-semibold text-brass hover:text-ink",
								onClick: () => {
									setEditId(f.id);
									setD({
										question: f.question,
										answer: f.answer,
										category: f.category || "General",
										displayOrder: f.display_order,
										isPublished: f.is_published
									});
								},
								children: "Edit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-muted hover:text-ink",
								onClick: async () => {
									await getSupabaseBrowser().from("faqs").update({ is_published: !f.is_published }).eq("id", f.id);
									await reload();
								},
								children: f.is_published ? "Hide" : "Show"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-danger/80 hover:text-danger",
								onClick: async () => {
									if (!window.confirm("Delete this FAQ?")) return;
									await deleteFaq(f.id);
									await reload();
								},
								children: "Delete"
							})
						]
					})]
				}, f.id))
			})
		})]
	});
}
function PartnersManager({ partners, refresh }) {
	const [d, setD] = (0, import_react.useState)({
		name: "",
		slug: "",
		logoUrl: "",
		websiteUrl: "",
		description: "",
		displayOrder: partners.length + 1,
		isPublished: true
	});
	const [editId, setEditId] = (0, import_react.useState)(null);
	const { notice, flash } = useNotice();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	async function reload() {
		const { data } = await getSupabaseBrowser().from("partners").select("*").order("display_order");
		refresh(data ?? []);
	}
	async function onSave() {
		setBusy(true);
		try {
			await upsertPartner({
				id: editId ?? void 0,
				...d
			});
			setD({
				name: "",
				slug: "",
				logoUrl: "",
				websiteUrl: "",
				description: "",
				displayOrder: partners.length + 1,
				isPublished: true
			});
			setEditId(null);
			flash();
			await reload();
		} catch (err) {
			flash(err.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
			title: editId ? "Edit partner" : "Add a partner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: async (e) => {
						const f = e.target.files?.[0];
						e.target.value = "";
						if (!f) return;
						try {
							const url = await uploadPartnerLogo(f);
							setD((prev) => ({
								...prev,
								logoUrl: url
							}));
							flash();
						} catch (err) {
							flash(err.message);
						}
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Partner name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: d.name,
							onChange: (e) => setD({
								...d,
								name: e.target.value
							}),
							className: inputCls,
							placeholder: "e.g. Ruchi Realty"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelCls,
							children: ["Website ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-normal text-muted-2",
								children: "(optional)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: d.websiteUrl,
							onChange: (e) => setD({
								...d,
								websiteUrl: e.target.value
							}),
							className: inputCls,
							placeholder: "https://..."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "Logo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-4",
								children: [
									d.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: d.logoUrl,
										alt: "Partner logo preview",
										className: "h-12 w-auto rounded-md border border-line bg-paper-2 object-contain px-3 py-2"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-dashed border-line px-4 py-3 text-xs text-muted-2",
										children: "No logo yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "ghost",
										onClick: () => fileRef.current?.click(),
										children: "Upload logo"
									}),
									d.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: d.logoUrl,
										onChange: (e) => setD({
											...d,
											logoUrl: e.target.value
										}),
										className: `${inputCls} flex-1`
									}) : null
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Display order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							value: d.displayOrder,
							onChange: (e) => setD({
								...d,
								displayOrder: Number(e.target.value)
							}),
							className: inputCls
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 pb-2.5 text-sm text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: d.isPublished,
									onChange: (e) => setD({
										...d,
										isPublished: e.target.checked
									}),
									className: "h-4 w-4 accent-[#a9862f]"
								}), "Show on site"]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: onSave,
							disabled: busy || !d.name.trim(),
							children: busy ? "Saving..." : editId ? "Save Partner" : "Add Partner"
						}),
						editId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							onClick: () => {
								setEditId(null);
								setD({
									name: "",
									slug: "",
									logoUrl: "",
									websiteUrl: "",
									description: "",
									displayOrder: partners.length + 1,
									isPublished: true
								});
							},
							children: "Cancel"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { state: notice })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
			title: `Partners on the site (${partners.length})`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4",
				children: partners.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "group relative rounded-xl border border-line bg-paper-2/50 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.logo_url,
							alt: p.name,
							className: `mx-auto h-12 w-auto object-contain ${p.is_published ? "" : "opacity-30 grayscale"}`,
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 truncate text-center text-xs font-medium text-ink",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-gradient-to-t from-paper-2 p-2 opacity-0 transition-opacity group-hover:opacity-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper",
									onClick: () => {
										setEditId(p.id);
										setD({
											name: p.name,
											slug: p.slug,
											logoUrl: p.logo_url,
											websiteUrl: p.website_url ?? "",
											description: p.description ?? "",
											displayOrder: p.display_order,
											isPublished: p.is_published
										});
									},
									children: "Edit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper",
									onClick: async () => {
										await getSupabaseBrowser().from("partners").update({ is_published: !p.is_published }).eq("id", p.id);
										await reload();
									},
									children: p.is_published ? "Hide" : "Show"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-full bg-danger/85 px-2.5 py-1 text-[10px] font-semibold text-white",
									onClick: async () => {
										if (!window.confirm(`Remove ${p.name}?`)) return;
										await deletePartner(p.id);
										await reload();
									},
									children: "Remove"
								})
							]
						})
					]
				}, p.id))
			})
		})]
	});
}
var SETTING_GROUPS = [
	{
		title: "Brand & contact",
		fields: [
			{
				key: "brand_name",
				label: "Brand name"
			},
			{
				key: "tagline",
				label: "Tagline"
			},
			{
				key: "phone",
				label: "Phone",
				hint: "Shown in header CTA, footer, contact links"
			},
			{
				key: "whatsapp_number",
				label: "WhatsApp number",
				hint: "Digits only with country code, e.g. 919800000000"
			},
			{
				key: "email",
				label: "Email"
			},
			{
				key: "city",
				label: "City"
			},
			{
				key: "founder_name",
				label: "Founder / Principal name"
			},
			{
				key: "founder_title",
				label: "Founder / Principal title"
			},
			{
				key: "founder_quote",
				label: "Signature philosophy quote"
			},
			{
				key: "instagram_handle",
				label: "Instagram handle"
			},
			{
				key: "instagram_url",
				label: "Instagram URL"
			},
			{
				key: "facebook_url",
				label: "Facebook URL"
			},
			{
				key: "youtube_url",
				label: "YouTube URL"
			}
		]
	},
	{
		title: "Home page",
		fields: [
			{
				key: "hero_eyebrow",
				label: "Hero eyebrow",
				hint: "Small label above the headline"
			},
			{
				key: "hero_title",
				label: "Hero headline",
				hint: "Two lines: separate them with a line break. Last word of line 2 renders italic."
			},
			{
				key: "hero_subtitle",
				label: "Hero subtext"
			},
			{
				key: "cta_title",
				label: "Selling band headline"
			},
			{
				key: "cta_subtitle",
				label: "Selling band subtext"
			}
		]
	},
	{
		title: "Page intros",
		fields: [
			{
				key: "about_intro",
				label: "About page intro",
				area: true
			},
			{
				key: "sell_intro",
				label: "Sell page intro",
				area: true
			},
			{
				key: "partner_intro",
				label: "Partner page intro",
				area: true
			},
			{
				key: "journal_intro",
				label: "Journal intro",
				area: true
			},
			{
				key: "properties_intro",
				label: "Properties intro",
				area: true
			},
			{
				key: "footer_note",
				label: "Footer note"
			}
		]
	},
	{
		title: "About page stats",
		fields: [
			{
				key: "about_stat_1_value",
				label: "Stat 1 value"
			},
			{
				key: "about_stat_1_label",
				label: "Stat 1 label"
			},
			{
				key: "about_stat_1_note",
				label: "Stat 1 note"
			},
			{
				key: "about_stat_2_value",
				label: "Stat 2 value"
			},
			{
				key: "about_stat_2_label",
				label: "Stat 2 label"
			},
			{
				key: "about_stat_2_note",
				label: "Stat 2 note"
			},
			{
				key: "about_stat_3_value",
				label: "Stat 3 value"
			},
			{
				key: "about_stat_3_label",
				label: "Stat 3 label"
			},
			{
				key: "about_stat_3_note",
				label: "Stat 3 note"
			}
		]
	}
];
function SettingsManager({ settings }) {
	const [values, setValues] = (0, import_react.useState)(settings);
	const { notice, flash } = useNotice();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const dirty = Object.keys(values).some((k) => (values[k] ?? "") !== (settings[k] ?? ""));
	async function onSave() {
		setBusy(true);
		try {
			const changed = {};
			for (const k of Object.keys(values)) {
				const next = values[k] ?? "";
				if (next !== (settings[k] ?? "")) changed[k] = next;
			}
			await saveSettings(changed);
			flash();
			Object.assign(settings, changed);
		} catch (err) {
			flash(err.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [SETTING_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
			title: group.title,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: group.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: f.area ? "md:col-span-2" : "",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: `set-${f.key}`,
							className: labelCls,
							children: f.label
						}),
						f.area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: `set-${f.key}`,
							rows: 3,
							value: values[f.key] ?? "",
							onChange: (e) => setValues({
								...values,
								[f.key]: e.target.value
							}),
							className: `${inputCls} resize-y`
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `set-${f.key}`,
							value: values[f.key] ?? "",
							onChange: (e) => setValues({
								...values,
								[f.key]: e.target.value
							}),
							className: inputCls
						}),
						f.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-2",
							children: f.hint
						}) : null
					]
				}, f.key))
			})
		}, group.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky bottom-6 flex items-center gap-4 rounded-full border border-line bg-white/95 px-6 py-3 shadow-lg backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: onSave,
					disabled: busy || !dirty,
					children: busy ? "Saving..." : "Save Settings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { state: notice }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-2",
					children: "Changes go live on the site immediately after saving."
				})
			]
		})]
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
