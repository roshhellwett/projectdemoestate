import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { t as useNavigate } from "./useNavigate-Dc9WRbRN.js";
import { t as getSupabaseBrowser } from "./supabase-DLBQfxwj.js";
import { t as LogoImage } from "./brand-B9i4t7NP.js";
import { a as deleteImageRow, d as parsePriceInput, f as reorderImages, g as updateProperty, h as slugFromTitle, n as createProperty, s as deleteProperty, t as addImageRow, v as uploadPropertyImage } from "./cms-DWwvmIBe.js";
//#region src/components/admin/property-editor.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var inputCls = "w-full rounded-[var(--radius-input)] border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none";
var labelCls = "mb-1.5 block text-xs font-semibold text-ink";
/** Create mode: minimal fields, then redirect into the full editor. */
function PropertyCreator() {
	const supabase = getSupabaseBrowser();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (!data.session) navigate({ to: "/login" });
		});
	}, [supabase, navigate]);
	async function onCreate(input) {
		const created = await draftToProperty(input, null);
		navigate({
			to: "/admin/property/$id",
			params: { id: created.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorShell, {
		title: "New listing",
		back: { to: "/admin" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyForm, {
			initial: null,
			onSubmit: onCreate,
			submitLabel: "Create & Continue"
		})
	});
}
/** Edit mode: full property + gallery management. */
function PropertyEditor({ propertyId }) {
	const supabase = getSupabaseBrowser();
	const navigate = useNavigate();
	const [property, setProperty] = (0, import_react.useState)(null);
	const [images, setImages] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data: auth } = await supabase.auth.getSession();
			if (!auth.session) {
				navigate({ to: "/login" });
				return;
			}
			const { data: p } = await supabase.from("properties").select("*").eq("id", propertyId).single();
			setProperty(p);
			const { data: imgs } = await supabase.from("property_images").select("*").eq("property_id", propertyId).order("sort_order");
			setImages(imgs ?? []);
		})();
	}, [
		propertyId,
		supabase,
		navigate
	]);
	const onSave = (0, import_react.useCallback)(async (draft) => {
		if (!property) return;
		setBusy(true);
		setError("");
		try {
			const patch = draftToPatch(draft, property);
			const updated = await updateProperty(property.id, patch);
			setProperty(updated);
			setSaved(true);
			setTimeout(() => setSaved(false), 2500);
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	}, [property]);
	async function onUpload(files) {
		if (!property) return;
		setBusy(true);
		try {
			let order = images.length ? Math.max(...images.map((i) => i.sort_order)) + 1 : 0;
			const newRows = [];
			for (const file of Array.from(files)) {
				const urls = await uploadPropertyImage(file, property.id);
				const row = await addImageRow({
					property_id: property.id,
					sort_order: order++,
					caption: "",
					alt_text: file.name.replace(/\.[^.]+$/, ""),
					image_url: urls.image_url,
					thumb_url: urls.thumb_url
				});
				newRows.push(row);
			}
			setImages((rows) => [...rows, ...newRows]);
			if (!property.main_image && newRows[0]) {
				const updated = await updateProperty(property.id, {
					main_image: newRows[0].image_url,
					main_image_thumb: newRows[0].thumb_url
				});
				setProperty(updated);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	}
	async function onMakeCover(img) {
		if (!property) return;
		const updated = await updateProperty(property.id, {
			main_image: img.image_url,
			main_image_thumb: img.thumb_url
		});
		setProperty(updated);
	}
	async function onDeleteImage(img) {
		if (!window.confirm("Remove this photo from the gallery?")) return;
		await deleteImageRow(img.id);
		setImages((rows) => rows.filter((r) => r.id !== img.id));
	}
	async function onMove(img, dir) {
		const idx = images.findIndex((r) => r.id === img.id);
		const swapIdx = idx + dir;
		if (idx < 0 || swapIdx < 0 || swapIdx >= images.length) return;
		const next = [...images];
		[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
		setImages(next);
		await reorderImages(property.id, next.map((r) => r.id));
	}
	async function onDeleteProperty() {
		if (!property || !window.confirm(`Delete "${property.title}" permanently?`)) return;
		await deleteProperty(property.id);
		navigate({ to: "/admin" });
	}
	if (!property) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorShell, {
		title: "Edit listing",
		back: { to: "/admin" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Loading…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EditorShell, {
		title: "Edit listing",
		back: { to: "/admin" },
		onDelete: onDeleteProperty,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyForm, {
			initial: property,
			onSubmit: onSave,
			submitLabel: "Save Changes",
			busy,
			saved,
			error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 rounded-[var(--radius-card)] border border-line bg-white p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium text-ink",
					children: "Gallery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadButton, {
					onFiles: onUpload,
					disabled: busy
				})]
			}), images.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "No photos yet. Upload the walkthrough shots - the first becomes the cover."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
				children: images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "group relative overflow-hidden rounded-xl border border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.thumb_url || img.image_url,
							alt: img.alt_text || "Gallery photo",
							className: "aspect-[4/3] w-full object-cover",
							loading: "lazy"
						}),
						property.main_image === img.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-2 top-2 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper",
							children: "Cover"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-gradient-to-t from-ink/80 p-2 opacity-0 transition-opacity group-hover:opacity-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
									label: "Move left",
									onClick: () => onMove(img, -1),
									disabled: i === 0,
									children: "←"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
									label: "Make cover",
									onClick: () => onMakeCover(img),
									children: "★"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
									label: "Move right",
									onClick: () => onMove(img, 1),
									disabled: i === images.length - 1,
									children: "→"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
									label: "Delete photo",
									onClick: () => onDeleteImage(img),
									danger: true,
									children: "×"
								})
							]
						})
					]
				}, img.id))
			})]
		})]
	});
}
function draftFrom(p) {
	return {
		title: p?.title ?? "",
		location: p?.location ?? "",
		locality: p?.locality ?? "",
		bhkType: p?.bhk_type ?? "2 BHK",
		propertyType: p?.property_type ?? "Apartment",
		priceText: p?.price_inr ? String(p.price_inr) : p?.price_display ?? "",
		possession: p?.possession_status ?? "Available",
		furnishing: p?.furnishing_status ?? "",
		area: p?.area_sqft ? String(p.area_sqft) : "",
		bathrooms: p?.bathrooms != null ? String(p.bathrooms) : "",
		balconies: p?.balconies != null ? String(p.balconies) : "",
		floor: p?.floor ?? "",
		facing: p?.facing ?? "",
		parking: p?.parking ?? "",
		amenities: (p?.amenities ?? []).join(", "),
		landmarks: (p?.landmarks ?? []).join(" | "),
		description: p?.description ?? "",
		developer: p?.developer_name ?? "",
		instagram: p?.instagram_url ?? "",
		featured: p?.is_featured ?? false,
		published: p?.is_published ?? true
	};
}
function draftToPatch(d, _existing) {
	const price_inr = parsePriceInput(d.priceText) ?? (d.priceText.trim() ? null : null);
	return {
		title: d.title.trim(),
		location: d.location.trim(),
		locality: d.locality.trim() || d.location.split(",")[0].trim(),
		bhk_type: d.bhkType.trim(),
		property_type: d.propertyType.trim() || "Apartment",
		price_inr,
		price_display: price_inr == null && d.priceText.trim() ? d.priceText.trim() : null,
		possession_status: d.possession.trim() || "Available",
		furnishing_status: d.furnishing.trim(),
		area_sqft: d.area ? Number(d.area) || null : null,
		bathrooms: d.bathrooms ? Number(d.bathrooms) || null : null,
		balconies: d.balconies ? Number(d.balconies) || null : null,
		floor: d.floor.trim() || null,
		facing: d.facing.trim() || null,
		parking: d.parking.trim() || null,
		amenities: d.amenities.split(",").map((s) => s.trim()).filter(Boolean),
		landmarks: d.landmarks.split("|").map((s) => s.trim()).filter(Boolean),
		description: d.description.trim(),
		developer_name: d.developer.trim() || null,
		instagram_url: d.instagram.trim() || null,
		is_featured: d.featured,
		is_published: d.published
	};
}
async function draftToProperty(d, existing) {
	const patch = draftToPatch(d, existing);
	if (existing) return updateProperty(existing.id, patch);
	const base = slugFromTitle(d.title);
	const supabase = getSupabaseBrowser();
	let slug = base;
	let n = 2;
	for (;;) {
		const { data } = await supabase.from("properties").select("id").eq("slug", slug).maybeSingle();
		if (!data) break;
		slug = `${base}-${n++}`;
	}
	return createProperty({
		...patch,
		slug
	});
}
function PropertyForm({ initial, onSubmit, submitLabel, busy = false, saved = false, error = "" }) {
	const [d, setD] = (0, import_react.useState)(() => draftFrom(initial));
	const set = (k) => (e) => setD((prev) => ({
		...prev,
		[k]: e.target.value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			onSubmit(d);
		},
		className: "grid gap-5 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "pf-title",
					className: labelCls,
					children: "Listing title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "pf-title",
					required: true,
					value: d.title,
					onChange: set("title"),
					className: inputCls,
					placeholder: "e.g. Ready-to-Move 3 BHK Flat in Lake Town"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-loc",
				className: labelCls,
				children: "Full location"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-loc",
				required: true,
				value: d.location,
				onChange: set("location"),
				className: inputCls,
				placeholder: "Lake Town, Kolkata"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-locality",
				className: labelCls,
				children: "Locality (filter key)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-locality",
				required: true,
				value: d.locality,
				onChange: set("locality"),
				className: inputCls,
				placeholder: "Lake Town"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-bhk",
				className: labelCls,
				children: "Configuration"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "pf-bhk",
				value: d.bhkType,
				onChange: set("bhkType"),
				className: inputCls,
				children: [
					"1 BHK",
					"2 BHK",
					"3 BHK",
					"4 BHK",
					"5 BHK",
					"Commercial Office Space",
					"Shop",
					"Land"
				].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-type",
				className: labelCls,
				children: "Property type"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "pf-type",
				value: d.propertyType,
				onChange: set("propertyType"),
				className: inputCls,
				children: [
					"Apartment",
					"Villa",
					"Builder Floor",
					"Commercial",
					"Plot"
				].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-price",
				className: labelCls,
				children: "Price (e.g. 1.35 Cr, 68 L, 7200000)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-price",
				value: d.priceText,
				onChange: set("priceText"),
				className: inputCls,
				placeholder: "68 L"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-area",
				className: labelCls,
				children: "Area (sq.ft)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-area",
				type: "number",
				min: 100,
				value: d.area,
				onChange: set("area"),
				className: inputCls,
				placeholder: "980"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-possession",
				className: labelCls,
				children: "Possession"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "pf-possession",
				value: d.possession,
				onChange: set("possession"),
				className: inputCls,
				children: [
					"Available",
					"Ready To Move",
					"Under Construction",
					"Sold"
				].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-furnishing",
				className: labelCls,
				children: "Furnishing"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "pf-furnishing",
				value: d.furnishing,
				onChange: set("furnishing"),
				className: inputCls,
				children: [
					"",
					"Unfurnished",
					"Semi-Furnished",
					"Furnished"
				].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o || "Not specified" }, o))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-baths",
				className: labelCls,
				children: "Bathrooms"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-baths",
				type: "number",
				min: 0,
				max: 20,
				value: d.bathrooms,
				onChange: set("bathrooms"),
				className: inputCls
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-balc",
				className: labelCls,
				children: "Balconies"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-balc",
				type: "number",
				min: 0,
				max: 20,
				value: d.balconies,
				onChange: set("balconies"),
				className: inputCls
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-floor",
				className: labelCls,
				children: "Floor"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-floor",
				value: d.floor,
				onChange: set("floor"),
				className: inputCls,
				placeholder: "4th out of G+7"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-facing",
				className: labelCls,
				children: "Facing"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-facing",
				value: d.facing,
				onChange: set("facing"),
				className: inputCls,
				placeholder: "East"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-parking",
				className: labelCls,
				children: "Parking"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-parking",
				value: d.parking,
				onChange: set("parking"),
				className: inputCls,
				placeholder: "1 covered"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-dev",
				className: labelCls,
				children: "Developer / partner"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-dev",
				value: d.developer,
				onChange: set("developer"),
				className: inputCls
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "pf-amen",
					className: labelCls,
					children: "Amenities (comma separated)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "pf-amen",
					value: d.amenities,
					onChange: set("amenities"),
					className: inputCls,
					placeholder: "Gym, Pool, 24/7 Security"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "pf-land",
					className: labelCls,
					children: "Nearby landmarks (| separated)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "pf-land",
					value: d.landmarks,
					onChange: set("landmarks"),
					className: inputCls,
					placeholder: "5 mins walk Acropolis Mall | Near Ruby Crossing"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "pf-desc",
					className: labelCls,
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "pf-desc",
					rows: 5,
					value: d.description,
					onChange: set("description"),
					className: `${inputCls} resize-y`,
					placeholder: "Editorial description of the home…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pf-ig",
				className: labelCls,
				children: "Instagram post URL"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pf-ig",
				type: "url",
				value: d.instagram,
				onChange: set("instagram"),
				className: inputCls,
				placeholder: "https://www.instagram.com/p/..."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-6 pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: d.featured,
						onChange: (e) => setD((p) => ({
							...p,
							featured: e.target.checked
						})),
						className: "h-4 w-4 accent-[#a9862f]"
					}), "Featured"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: d.published,
						onChange: (e) => setD((p) => ({
							...p,
							published: e.target.checked
						})),
						className: "h-4 w-4 accent-[#a9862f]"
					}), "Published"]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "sm:col-span-2 text-xs text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy,
					className: "rounded-full bg-ink px-8 py-3 text-sm font-semibold text-paper transition-opacity disabled:opacity-60",
					children: busy ? "Saving…" : submitLabel
				}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-verdigris",
					children: "Saved ✓"
				}) : null]
			})
		]
	});
}
function ImageUploadButton({ onFiles, disabled }) {
	const ref = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		type: "file",
		accept: "image/*",
		multiple: true,
		className: "hidden",
		onChange: (e) => {
			if (e.target.files?.length) onFiles(e.target.files);
			e.target.value = "";
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick: () => ref.current?.click(),
		className: "rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-opacity disabled:opacity-60",
		children: "Upload Photos"
	})] });
}
function IconBtn({ label, onClick, disabled, danger, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		disabled,
		onClick,
		className: `flex h-7 w-7 items-center justify-center rounded-full bg-paper/90 text-xs ${danger ? "text-danger" : "text-ink"} transition-colors hover:bg-paper disabled:opacity-30`,
		children
	});
}
function EditorShell({ title, back, onDelete, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell-wide flex h-16 items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: back.to,
							className: "text-sm text-muted hover:text-ink",
							children: "← Back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoImage, { className: "hidden h-8 sm:block" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-xl font-medium text-ink",
							children: title
						})
					]
				}), onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDelete,
					className: "text-[13px] text-danger/80 hover:text-danger",
					children: "Delete listing"
				}) : null]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shell-wide max-w-4xl py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-card)] border border-line bg-paper-2/40 p-6 md:p-8",
				children
			})
		})]
	});
}
//#endregion
export { PropertyEditor as n, PropertyCreator as t };
