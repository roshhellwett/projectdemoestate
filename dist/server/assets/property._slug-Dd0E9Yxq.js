import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as Link } from "./link-EVI38fh_.js";
import { h as SITE } from "./queries-DIchORpl.js";
import { r as formatPrice, t as formatArea } from "./format-CHtBtEr_.js";
import { r as Route } from "./router-BDjoqMKo.js";
import { i as Header, n as Footer, r as FooterSettingsContext, t as initRevealOnScroll } from "./reveal-D8gGmGzo.js";
import { t as PropertyCard } from "./property-card-CovbnlJ_.js";
import { t as submitEnquiry } from "./enquiries-BCDsj_Bp.js";
//#region src/components/enquiry-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Sticky enquiry card on the property detail page. Client island:
* submits through the server function (RLS allows anonymous inserts).
*/
function EnquiryForm({ property }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		setState("sending");
		setError("");
		const res = await submitEnquiry({ data: {
			kind: "property",
			propertyId: property.id,
			name,
			phone,
			message: message || `Interested in: ${property.title}`
		} });
		if (res.ok) setState("done");
		else {
			setState("error");
			setError(res.error ?? "Something went wrong.");
		}
	}
	if (state === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-card)] border border-verdigris/30 bg-verdigris-soft p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-medium text-ink",
			children: "Thank you."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"We received your enquiry for ",
				property.bhk_type,
				" in ",
				property.locality,
				". Expect a call shortly."
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-card)] border border-line bg-white p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-medium text-ink",
				children: "Book a visit"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "We reply within a few hours, 7 days a week."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "enq-name",
						className: "mb-1.5 block text-xs font-semibold text-ink",
						children: "Your name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "enq-name",
						required: true,
						minLength: 2,
						value: name,
						onChange: (e) => setName(e.target.value),
						autoComplete: "name",
						className: "w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none",
						placeholder: "Full name"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "enq-phone",
						className: "mb-1.5 block text-xs font-semibold text-ink",
						children: "Phone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "enq-phone",
						required: true,
						type: "tel",
						inputMode: "tel",
						pattern: "[+0-9\\s()-]{8,17}",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						autoComplete: "tel",
						className: "w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none",
						placeholder: "10-digit mobile"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: "enq-msg",
						className: "mb-1.5 block text-xs font-semibold text-ink",
						children: ["Message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-normal text-muted-2",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "enq-msg",
						rows: 3,
						value: message,
						onChange: (e) => setMessage(e.target.value),
						className: "w-full resize-none rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none",
						placeholder: "Preferred visit time, questions…"
					})] }),
					state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-xs text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: state === "sending",
						className: "w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60",
						children: state === "sending" ? "Sending…" : "Request a Visit"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-center text-xs text-muted",
				children: [
					"Prefer to talk now?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: SITE.phoneHref,
						className: "font-semibold text-brass hover:text-ink",
						children: SITE.phone
					})
				]
			})
		]
	});
}
//#endregion
//#region src/routes/property.$slug.tsx?tsr-split=component
function PropertyDetailPage() {
	const { property, images, similar, settings } = Route.useLoaderData();
	(0, import_react.useEffect)(() => {
		initRevealOnScroll();
	}, []);
	const gallery = [property.main_image, ...images.map((i) => i.image_url)].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "shell pt-6 text-xs text-muted",
						"aria-label": "Breadcrumb",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-ink",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/properties",
								className: "hover:text-ink",
								children: "Properties"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink",
								children: property.locality
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shell pt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl",
								children: property.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: property.location
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl font-semibold text-ink",
									children: formatPrice(property.price_inr, property.price_display)
								}), property.possession_status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-semibold uppercase tracking-wide text-verdigris",
									children: property.possession_status
								}) : null]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {
						images: gallery,
						title: property.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shell-wide grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium tracking-tight text-ink",
								children: "About this home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-[65ch] whitespace-pre-line text-[15px] leading-relaxed text-muted",
								children: property.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-12 font-display text-2xl font-medium tracking-tight text-ink",
								children: "Specifications"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-5 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Configuration",
										value: property.bhk_type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Area",
										value: formatArea(property.area_sqft)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Bathrooms",
										value: property.bathrooms ? String(property.bathrooms) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Balconies",
										value: property.balconies ? String(property.balconies) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Floor",
										value: property.floor || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Facing",
										value: property.facing || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Furnishing",
										value: property.furnishing_status || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Parking",
										value: property.parking || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
										label: "Possession",
										value: property.possession_status
									})
								]
							}),
							property.amenities.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-12 font-display text-2xl font-medium tracking-tight text-ink",
								children: "Amenities"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 flex flex-wrap gap-2",
								children: property.amenities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "rounded-full border border-line bg-paper-2 px-4 py-1.5 text-[13px] text-ink",
									children: a
								}, a))
							})] }) : null,
							property.landmarks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-12 font-display text-2xl font-medium tracking-tight text-ink",
								children: "Nearby"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-2 text-[15px] text-muted",
								children: property.landmarks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" }), l]
								}, l))
							})] }) : null,
							property.instagram_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: property.instagram_url,
								target: "_blank",
								rel: "noreferrer",
								className: "mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brass hover:text-ink",
								children: "View the walkthrough on Instagram →"
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "lg:sticky lg:top-28 lg:self-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryForm, { property })
						})]
					}),
					similar.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-t border-line bg-paper-2/60 py-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shell-wide",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-2xl font-medium tracking-tight text-ink",
								children: ["Similar in ", property.locality]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
								children: similar.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p }, p.id))
							})]
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterSettingsContext.Provider, {
				value: settings,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			})
		]
	});
}
function Spec({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1.5 text-[15px] font-medium text-ink",
		children: value
	})] });
}
function Gallery({ images, title }) {
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const hero = images[0];
	(0, import_react.useEffect)(() => {
		if (lightbox == null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setLightbox(null);
			if (e.key === "ArrowRight") setLightbox((i) => i == null ? i : (i + 1) % images.length);
			if (e.key === "ArrowLeft") setLightbox((i) => i == null ? i : (i - 1 + images.length) % images.length);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [lightbox, images.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "shell-wide mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-[2fr_1fr]",
			children: [hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setLightbox(0),
				className: "group relative overflow-hidden rounded-[var(--radius-img)]",
				"aria-label": "Open gallery",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero,
					alt: title,
					width: 1200,
					height: 900,
					className: "aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				})
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-3 lg:grid-cols-2",
				children: images.slice(1, 5).map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setLightbox(i + 1),
					className: "group relative overflow-hidden rounded-[var(--radius-img)]",
					"aria-label": `Photo ${i + 2} of ${images.length}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: `${title} photo ${i + 2}`,
						width: 400,
						height: 300,
						loading: "lazy",
						className: "aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
					}), i === 3 && images.length > 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute inset-0 flex items-center justify-center bg-ink/50 text-sm font-semibold text-paper",
						children: [
							"+",
							images.length - 5,
							" more"
						]
					}) : null]
				}, src))
			})]
		}), lightbox != null && images[lightbox] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Photo gallery",
			className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4",
			onClick: () => setLightbox(null),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: images[lightbox],
					alt: `${title} photo ${lightbox + 1}`,
					className: "max-h-[85vh] max-w-full rounded-lg object-contain",
					onClick: (e) => e.stopPropagation()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute right-6 top-6 text-2xl text-paper/80 hover:text-paper",
					"aria-label": "Close gallery",
					onClick: () => setLightbox(null),
					children: "×"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-paper/60",
					children: [
						lightbox + 1,
						" / ",
						images.length,
						" · use arrow keys"
					]
				})
			]
		}) : null]
	});
}
//#endregion
export { PropertyDetailPage as component };
