import { useState, useMemo } from "react";
import { formatPrice } from "../lib/format";
import { Calculator, ShieldCheck, Info } from "@phosphor-icons/react";

interface EmiCalculatorProps {
  initialPrice?: number;
  title?: string;
  showStampDuty?: boolean;
  className?: string;
}

export function EmiCalculator({
  initialPrice = 7500000,
  title = "Mortgage & EMI Estimator",
  showStampDuty = true,
  className = "",
}: EmiCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const calculations = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    let monthlyEmi = 0;
    if (principal > 0 && monthlyRate > 0 && totalMonths > 0) {
      monthlyEmi = Math.round(
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
      );
    }

    const totalPayment = monthlyEmi * totalMonths;
    const totalInterest = Math.max(0, totalPayment - principal);

    // West Bengal Stamp Duty (Kolkata Municipal: 6% <= 1 Cr, 7% > 1 Cr) + 1% Registration
    const stampDutyRate = propertyPrice > 10000000 ? 0.07 : 0.06;
    const stampDuty = Math.round(propertyPrice * stampDutyRate);
    const registrationFee = Math.round(propertyPrice * 0.01);
    const totalAcquisitionCost = propertyPrice + stampDuty + registrationFee;

    const principalRatio = totalPayment > 0 ? (principal / totalPayment) * 100 : 50;
    const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 50;

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
      interestRatio,
    };
  }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border-2 border-brass/45 bg-white p-6 md:p-8 shadow-lg shadow-brass/5 ring-1 ring-brass/20 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-line/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass">
            <Calculator size={22} weight="duotone" />
          </div>
          <div>
            <h3 className="font-display text-xl font-medium text-ink">{title}</h3>
            <p className="text-xs text-muted">Real-time monthly repayment & West Bengal acquisition costs</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Sliders Input Column */}
        <div className="space-y-6">
          {/* Property Price Input */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2">
              <span>Property Value</span>
              <span className="font-display text-base font-bold text-ink">
                {formatPrice(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={2500000}
              max={30000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="slider-brass"
            />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              <span>₹25 Lakhs</span>
              <span>₹1.50 Cr</span>
              <span>₹3.00 Cr</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="font-medium text-muted">
                {formatPrice(calculations.downPayment)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="slider-brass"
            />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              <span>10% (Min)</span>
              <span>20% (Standard)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2">
              <span>Interest Rate ({interestRate.toFixed(1)}% p.a.)</span>
              <span className="font-medium text-verdigris">RBI Floating Benchmark</span>
            </div>
            <input
              type="range"
              min={7.0}
              max={12.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider-brass"
            />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              <span>7.0%</span>
              <span>8.5% (Typical)</span>
              <span>12.0%</span>
            </div>
          </div>

          {/* Loan Tenure Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink mb-2">
              <span>Loan Duration ({tenureYears} Years)</span>
              <span className="font-medium text-muted">{tenureYears * 12} Installments</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="slider-brass"
            />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              <span>5 Years</span>
              <span>20 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results Summary Box */}
        <div className="flex flex-col justify-between rounded-2xl border border-brass/35 bg-paper-2/80 p-6 shadow-sm ring-1 ring-brass/15">
          <div>
            <p className="eyebrow">Estimated Monthly Payment</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold tracking-tight text-ink">
                ₹{calculations.monthlyEmi.toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-medium text-muted">/ month</span>
            </div>

            {/* Visual Amortization Ratio Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-[11px] font-semibold text-muted mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-ink" /> Principal (
                  {calculations.principalRatio.toFixed(0)}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brass" /> Interest (
                  {calculations.interestRatio.toFixed(0)}%)
                </span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  style={{ width: `${calculations.principalRatio}%` }}
                  className="bg-ink transition-all duration-300"
                />
                <div
                  style={{ width: `${calculations.interestRatio}%` }}
                  className="bg-brass transition-all duration-300"
                />
              </div>
            </div>

            {/* Breakdown List */}
            <dl className="mt-6 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted">Loan Principal:</dt>
                <dd className="font-semibold text-ink">
                  ₹{calculations.principal.toLocaleString("en-IN")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Total Interest Payable:</dt>
                <dd className="font-semibold text-ink">
                  ₹{calculations.totalInterest.toLocaleString("en-IN")}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line/60 pt-2 font-bold">
                <dt className="text-ink">Total Repayment:</dt>
                <dd className="text-ink">
                  ₹{calculations.totalPayment.toLocaleString("en-IN")}
                </dd>
              </div>
            </dl>

            {/* West Bengal Stamp Duty & Registration Estimator */}
            {showStampDuty ? (
              <div className="mt-6 border-t border-line/70 pt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
                  <span className="flex items-center gap-1 text-brass">
                    <ShieldCheck size={16} weight="fill" />
                    WB Legal & Registration Est.
                  </span>
                  <span className="text-[10px] text-muted">Kolkata Municipal</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-muted">
                  <div className="flex justify-between">
                    <span>Stamp Duty ({propertyPrice > 10000000 ? "7%" : "6%"}):</span>
                    <span className="font-medium text-ink">₹{calculations.stampDuty.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registration Fee (1%):</span>
                    <span className="font-medium text-ink">₹{calculations.registrationFee.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between border-t border-line/40 pt-1 text-xs font-bold text-verdigris">
                    <span>Total Estimated Investment:</span>
                    <span>₹{calculations.totalAcquisitionCost.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl border border-brass/25 bg-white/90 p-3 text-[11px] text-muted">
            <Info size={16} className="text-brass shrink-0" />
            <span>Bank eligibility and rates may vary based on CIBIL and loan provider terms.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
