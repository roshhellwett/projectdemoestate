import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as submitEnquiry } from "./enquiries-BCDsj_Bp.js";
//#region src/components/sell-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Sell-your-property listing form (public). Reused by the partner page
* with kind="partner".
*/
function SellForm({ kind = "sell" }) {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		address: "",
		propertyType: "Flat",
		bedrooms: "2",
		area: "",
		expectedPrice: "",
		remarks: "",
		company: "",
		website: "",
		proposal: ""
	});
	const [state, setState] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	const set = (k) => (e) => setForm((f) => ({
		...f,
		[k]: e.target.value
	}));
	async function onSubmit(e) {
		e.preventDefault();
		setState("sending");
		setError("");
		const payload = kind === "sell" ? {
			kind: "sell",
			name: form.name,
			phone: form.phone,
			email: form.email,
			message: form.remarks,
			payload: {
				address: form.address,
				property_type: form.propertyType,
				bedrooms: form.bedrooms,
				area_sqft: form.area,
				expected_price: form.expectedPrice
			}
		} : {
			kind: "partner",
			name: form.name,
			phone: form.phone,
			email: form.email,
			message: form.proposal,
			payload: {
				company: form.company,
				website: form.website
			}
		};
		const res = await submitEnquiry({ data: payload });
		if (res.ok) setState("done");
		else {
			setState("error");
			setError(res.error ?? "Something went wrong.");
		}
	}
	if (state === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-card)] border border-verdigris/30 bg-verdigris-soft p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-medium text-ink",
			children: "Received."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-3 max-w-sm text-sm text-muted",
			children: kind === "sell" ? "Our valuation team will call you within one working day to schedule a visit." : "We will review your proposal and get back within two working days."
		})]
	});
	const inputCls = "w-full rounded-[var(--radius-input)] border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none";
	const labelCls = "mb-1.5 block text-xs font-semibold text-ink";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "grid gap-5 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "sf-name",
				className: labelCls,
				children: "Owner name"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "sf-name",
				required: true,
				minLength: 2,
				value: form.name,
				onChange: set("name"),
				autoComplete: "name",
				className: inputCls,
				placeholder: "Full name"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "sf-phone",
				className: labelCls,
				children: "Phone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "sf-phone",
				required: true,
				type: "tel",
				inputMode: "tel",
				value: form.phone,
				onChange: set("phone"),
				autoComplete: "tel",
				className: inputCls,
				placeholder: "10-digit mobile"
			})] }),
			kind === "sell" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "sf-address",
						className: labelCls,
						children: "Property address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "sf-address",
						required: true,
						value: form.address,
						onChange: set("address"),
						className: inputCls,
						placeholder: "Locality, Kolkata"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "sf-type",
					className: labelCls,
					children: "Property type"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "sf-type",
					value: form.propertyType,
					onChange: set("propertyType"),
					className: inputCls,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Flat" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "House" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Land" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Office" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Shop" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "sf-beds",
					className: labelCls,
					children: "Bedrooms"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "sf-beds",
					value: form.bedrooms,
					onChange: set("bedrooms"),
					className: inputCls,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "1",
							children: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "2",
							children: "2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "3",
							children: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "4",
							children: "4+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "na",
							children: "Not applicable"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "sf-area",
					className: labelCls,
					children: "Area (sq.ft)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "sf-area",
					type: "number",
					min: 100,
					value: form.area,
					onChange: set("area"),
					className: inputCls,
					placeholder: "e.g. 980"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "sf-price",
					className: labelCls,
					children: "Expected price"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "sf-price",
					value: form.expectedPrice,
					onChange: set("expectedPrice"),
					className: inputCls,
					placeholder: "e.g. 45 Lakhs"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: "sf-remarks",
						className: labelCls,
						children: ["Remarks ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-normal text-muted-2",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "sf-remarks",
						rows: 3,
						value: form.remarks,
						onChange: set("remarks"),
						className: `${inputCls} resize-none`,
						placeholder: "Anything our team should know"
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "sf-company",
					className: labelCls,
					children: "Company"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "sf-company",
					value: form.company,
					onChange: set("company"),
					className: inputCls,
					placeholder: "Company name"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: "sf-website",
					className: labelCls,
					children: ["Website ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-normal text-muted-2",
						children: "(optional)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "sf-website",
					type: "url",
					value: form.website,
					onChange: set("website"),
					className: inputCls,
					placeholder: "https://"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "sf-proposal",
						className: labelCls,
						children: "Proposal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "sf-proposal",
						required: true,
						rows: 4,
						value: form.proposal,
						onChange: set("proposal"),
						className: `${inputCls} resize-none`,
						placeholder: "Tell us about the partnership"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: "sf-email",
					className: labelCls,
					children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-normal text-muted-2",
						children: "(optional)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "sf-email",
					type: "email",
					value: form.email,
					onChange: set("email"),
					autoComplete: "email",
					className: inputCls,
					placeholder: "you@example.com"
				})]
			}),
			state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "sm:col-span-2 text-xs text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: state === "sending",
					className: "w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 sm:w-auto sm:px-10",
					children: state === "sending" ? "Submitting…" : kind === "sell" ? "Submit Listing" : "Submit Proposal"
				})
			})
		]
	});
}
//#endregion
export { SellForm as t };
