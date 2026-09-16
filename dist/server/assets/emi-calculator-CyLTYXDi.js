import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { r as formatPrice } from "./format-CHtBtEr_.js";
import { s as c } from "./footer-DIp35I2k.js";
import { s } from "./floating-concierge-ByiScAdS.js";
import { t as h } from "./ShieldCheck.es-DXeEg2D1.js";
//#region src/components/emi-calculator.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
