import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { l as p } from "./floating-concierge-92TO1Fd8.js";
import { t as s } from "./Calculator.es-DjsXWh1Y.js";
import { t as h } from "./ShieldCheck.es-6ktx9mZ-.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
//#region node_modules/@phosphor-icons/react/dist/defs/Info.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var a = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M144,176a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176Zm88-48A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128ZM124,96a12,12,0,1,0-12-12A12,12,0,0,0,124,96Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M142,176a6,6,0,0,1-6,6,14,14,0,0,1-14-14V128a2,2,0,0,0-2-2,6,6,0,0,1,0-12,14,14,0,0,1,14,14v40a2,2,0,0,0,2,2A6,6,0,0,1,142,176ZM124,94a10,10,0,1,0-10-10A10,10,0,0,0,124,94Zm106,34A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M140,176a4,4,0,0,1-4,4,12,12,0,0,1-12-12V128a4,4,0,0,0-4-4,4,4,0,0,1,0-8,12,12,0,0,1,12,12v40a4,4,0,0,0,4,4A4,4,0,0,1,140,176ZM124,92a8,8,0,1,0-8-8A8,8,0,0,0,124,92Zm104,36A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z" }))]
]);
//#endregion
//#region node_modules/@phosphor-icons/react/dist/csr/Info.es.js
var e = import_react.forwardRef((r, t) => /* @__PURE__ */ import_react.createElement(p, {
	ref: t,
	...r,
	weights: a
}));
e.displayName = "InfoIcon";
var c = e;
//#endregion
//#region src/components/emi-calculator.tsx
var import_jsx_runtime = require_jsx_runtime();
function EmiCalculator({ initialPrice = 75e5, title = "Mortgage & EMI Estimator", showStampDuty = true, className = "" }) {
	const [propertyPrice, setPropertyPrice] = (0, import_react.useState)(initialPrice);
	const [downPaymentPercent, setDownPaymentPercent] = (0, import_react.useState)(20);
	const [interestRate, setInterestRate] = (0, import_react.useState)(8.5);
	const [tenureYears, setTenureYears] = (0, import_react.useState)(20);
	const calculations = (0, import_react.useMemo)(() => {
		const downPayment = propertyPrice * downPaymentPercent / 100;
		const principal = propertyPrice - downPayment;
		const monthlyRate = interestRate / 12 / 100;
		const totalMonths = tenureYears * 12;
		let monthlyEmi = 0;
		if (principal > 0 && monthlyRate > 0 && totalMonths > 0) monthlyEmi = Math.round(principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
		const totalPayment = monthlyEmi * totalMonths;
		const totalInterest = Math.max(0, totalPayment - principal);
		const stampDuty = Math.round(propertyPrice * (propertyPrice > 1e7 ? .07 : .06));
		const registrationFee = Math.round(propertyPrice * .01);
		const totalAcquisitionCost = propertyPrice + stampDuty + registrationFee;
		const principalRatio = totalPayment > 0 ? principal / totalPayment * 100 : 50;
		const interestRatio = totalPayment > 0 ? totalInterest / totalPayment * 100 : 50;
		return {
			downPayment,
			principal,
			monthlyEmi,
			totalPayment,
			totalInterest,
			stampDuty,
			registrationFee,
			totalAcquisitionCost,
			principalRatio,
			interestRatio
		};
	}, [
		propertyPrice,
		downPaymentPercent,
		interestRate,
		tenureYears
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl border border-line bg-white p-6 md:p-8 shadow-sm ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-between border-b border-line/60 pb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
						size: 22,
						weight: "duotone"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-medium text-ink",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Real-time monthly repayment & West Bengal acquisition costs"
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Property Value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base font-bold text-ink",
								children: formatPrice(propertyPrice)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 25e5,
							max: 3e7,
							step: 25e4,
							value: propertyPrice,
							onChange: (e) => setPropertyPrice(Number(e.target.value)),
							className: "slider-brass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[11px] text-muted mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "₹25 Lakhs" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "₹1.50 Cr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "₹3.00 Cr" })
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Down Payment (",
								downPaymentPercent,
								"%)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-muted",
								children: formatPrice(calculations.downPayment)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 10,
							max: 50,
							step: 5,
							value: downPaymentPercent,
							onChange: (e) => setDownPaymentPercent(Number(e.target.value)),
							className: "slider-brass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[11px] text-muted mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "10% (Min)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "20% (Standard)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "50%" })
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Interest Rate (",
								interestRate.toFixed(1),
								"% p.a.)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-verdigris",
								children: "RBI Floating Benchmark"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 7,
							max: 12,
							step: .1,
							value: interestRate,
							onChange: (e) => setInterestRate(Number(e.target.value)),
							className: "slider-brass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[11px] text-muted mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "7.0%" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "8.5% (Typical)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "12.0%" })
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Loan Duration (",
								tenureYears,
								" Years)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-muted",
								children: [tenureYears * 12, " Installments"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 5,
							max: 30,
							step: 1,
							value: tenureYears,
							onChange: (e) => setTenureYears(Number(e.target.value)),
							className: "slider-brass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[11px] text-muted mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5 Years" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "20 Years" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "30 Years" })
							]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between rounded-xl border border-line bg-paper-2/60 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Estimated Monthly Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-baseline gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-4xl font-bold tracking-tight text-ink",
							children: ["₹", calculations.monthlyEmi.toLocaleString("en-IN")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-muted",
							children: "/ month"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[11px] font-semibold text-muted mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-ink" }),
									" Principal (",
									calculations.principalRatio.toFixed(0),
									"%)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-brass" }),
									" Interest (",
									calculations.interestRatio.toFixed(0),
									"%)"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-2.5 w-full overflow-hidden rounded-full bg-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { width: `${calculations.principalRatio}%` },
								className: "bg-ink transition-all duration-300"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { width: `${calculations.interestRatio}%` },
								className: "bg-brass transition-all duration-300"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 space-y-2.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Loan Principal:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-semibold text-ink",
									children: ["₹", calculations.principal.toLocaleString("en-IN")]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Total Interest Payable:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-semibold text-ink",
									children: ["₹", calculations.totalInterest.toLocaleString("en-IN")]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-line/60 pt-2 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-ink",
									children: "Total Repayment:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "text-ink",
									children: ["₹", calculations.totalPayment.toLocaleString("en-IN")]
								})]
							})
						]
					}),
					showStampDuty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-line/70 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs font-semibold text-ink mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-brass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(h, {
									size: 16,
									weight: "fill"
								}), "WB Legal & Registration Est."]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted",
								children: "Kolkata Municipal"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 text-[11px] text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Stamp Duty (",
										propertyPrice > 1e7 ? "7%" : "6%",
										"):"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-ink",
										children: ["₹", calculations.stampDuty.toLocaleString("en-IN")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registration Fee (1%):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-ink",
										children: ["₹", calculations.registrationFee.toLocaleString("en-IN")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-line/40 pt-1 text-xs font-bold text-verdigris",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Estimated Investment:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", calculations.totalAcquisitionCost.toLocaleString("en-IN")] })]
								})
							]
						})]
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-2 rounded-lg bg-white/80 p-3 text-[11px] text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
						size: 16,
						className: "text-brass shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bank eligibility and rates may vary based on CIBIL and loan provider terms." })]
				})]
			})]
		})]
	});
}
//#endregion
export { EmiCalculator as t };
