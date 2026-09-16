import { useState, useMemo } from "react";
import { formatPrice } from "../lib/format";
import { TrendUp, Receipt, ShieldCheck, ChartLineUp } from "@phosphor-icons/react";

interface InvestmentModelerProps {
  priceInr: number;
  locality: string;
  bhkType: string;
  areaSqFt?: number | null;
}

export function InvestmentModeler({ priceInr, locality, bhkType, areaSqFt: _areaSqFt }: InvestmentModelerProps) {
  const [activeTab, setActiveTab] = useState<"yield" | "growth" | "tax">("yield");
  const [expectedCagr, setExpectedCagr] = useState<number>(7.2); // 7.2% historic Kolkata prime corridor CAGR

  // Locality yield multiplier
  const yieldRate = useMemo(() => {
    const loc = locality.toLowerCase();
    if (loc.includes("newtown") || loc.includes("new town")) return 0.042; // 4.2% IT corridor
    if (loc.includes("kasba") || loc.includes("bypass")) return 0.040; // 4.0%
    if (loc.includes("lake town") || loc.includes("bangur")) return 0.038; // 3.8%
    if (loc.includes("rajarhat")) return 0.039;
    return 0.036; // 3.6% default
  }, [locality]);

  const calculations = useMemo(() => {
    const annualGrossRent = Math.round(priceInr * yieldRate);
    const monthlyRent = Math.round(annualGrossRent / 12);
    const grossYieldPercent = (yieldRate * 100).toFixed(1);

    // Standard 5-year capital appreciation projection: FV = PV * (1 + r)^5
    const fiveYearFutureValue = Math.round(priceInr * Math.pow(1 + expectedCagr / 100, 5));
    const totalCapitalGain = fiveYearFutureValue - priceInr;

    // Year-by-year compounding trajectory
    const yearlyTrajectory = [1, 2, 3, 4, 5].map((year) => ({
      year: `Year ${year}`,
      value: Math.round(priceInr * Math.pow(1 + expectedCagr / 100, year)),
    }));

    // Tax Shield under Indian Income Tax Act
    // Section 24(b): Max ₹2,00,000 deduction on interest for self-occupied/let-out
    // Section 80C: Max ₹1,50,000 principal deduction
    // At 30% tax bracket + 4% cess = 31.2% tax rate
    const annualSec24Savings = Math.round(200000 * 0.312); // ₹62,400
    const annualSec80CSavings = Math.round(150000 * 0.312); // ₹46,800
    const totalAnnualTaxShield = annualSec24Savings + annualSec80CSavings; // ~₹1,09,200/yr

    return {
      monthlyRent,
      annualGrossRent,
      grossYieldPercent,
      fiveYearFutureValue,
      totalCapitalGain,
      yearlyTrajectory,
      annualSec24Savings,
      annualSec80CSavings,
      totalAnnualTaxShield,
    };
  }, [priceInr, yieldRate, expectedCagr]);

  return (
    <div className="rounded-3xl border border-line bg-white p-7 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verdigris-soft text-verdigris shadow-sm">
            <ChartLineUp size={24} weight="duotone" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold text-ink">Institutional Investment & ROI Model</h3>
              <span className="rounded-full bg-brass/15 px-2.5 py-0.5 text-[11px] font-bold text-brass-dark">
                {calculations.grossYieldPercent}% Gross Yield
              </span>
            </div>
            <p className="text-xs text-muted">
              Micro-market rental cash flow, 5-year capital appreciation, and Section 24 tax shielding
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper p-1">
          <button
            type="button"
            onClick={() => setActiveTab("yield")}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
              activeTab === "yield" ? "bg-ink text-paper shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            Rental Yield
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("growth")}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
              activeTab === "growth" ? "bg-ink text-paper shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            5-Year Capital Growth
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tax")}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
              activeTab === "tax" ? "bg-ink text-paper shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            Tax Shield
          </button>
        </div>
      </div>

      {/* Tab 1: Rental Yield & Cashflow */}
      {activeTab === "yield" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                Estimated Monthly Rent
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                ₹{calculations.monthlyRent.toLocaleString("en-IN")}<span className="text-xs font-normal text-muted">/mo</span>
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Based on current {locality} lease benchmarks for {bhkType}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                Gross Annual Rental
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-verdigris">
                {formatPrice(calculations.annualGrossRent)}
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Expected 11-month lease cycle with institutional tenants
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                Tenant Demand Profile
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-brass-dark">
                High Liquidity
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Low vacancy risk due to metro transit & IT SEZ proximity
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line/80 bg-paper-2 p-4 text-xs leading-relaxed text-muted">
            <p className="font-semibold text-ink flex items-center gap-1.5 mb-1">
              <ShieldCheck size={14} className="text-verdigris" />
              SS Property Corporate Lease Management:
            </p>
            Our dedicated NRI & investor desk handles tenant background screening, police verification, draft registered 11-month lease agreements, and automated rental remittance to your bank account.
          </div>
        </div>
      ) : null}

      {/* Tab 2: 5-Year Capital Growth & Compounding */}
      {activeTab === "growth" ? (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-line bg-paper p-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink">Annual Corridor Appreciation Rate</span>
              <p className="text-xs text-muted">Historical CAGR in {locality} over last 5-year cycle: 7.2%</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-ink">{expectedCagr.toFixed(1)}% p.a.</span>
              <input
                type="range"
                min={5.0}
                max={12.0}
                step={0.5}
                value={expectedCagr}
                onChange={(e) => setExpectedCagr(Number(e.target.value))}
                className="slider-brass w-32"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-paper p-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                Projected Value in 5 Years (2031)
              </span>
              <p className="mt-1 font-display text-3xl font-bold text-ink">
                {formatPrice(calculations.fiveYearFutureValue)}
              </p>
              <p className="mt-1 text-xs text-verdigris font-semibold flex items-center gap-1">
                <TrendUp size={14} weight="bold" />
                +{formatPrice(calculations.totalCapitalGain)} net capital creation
              </p>
            </div>

            {/* Visual Step Trajectory */}
            <div className="rounded-2xl border border-line bg-paper p-5 flex flex-col justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
                5-Year Compounding Milestone
              </span>
              <div className="space-y-2">
                {calculations.yearlyTrajectory.map((t, _idx) => {
                  const widthPercent = Math.round((t.value / calculations.fiveYearFutureValue) * 100);
                  return (
                    <div key={t.year} className="flex items-center gap-3 text-xs">
                      <span className="w-14 shrink-0 font-mono text-[11px] text-muted">{t.year}</span>
                      <div className="h-2 flex-1 rounded-full bg-line overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brass transition-all duration-500"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                      <span className="w-20 text-right font-mono text-[11px] font-bold text-ink">
                        {formatPrice(t.value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Tab 3: Tax Shield */}
      {activeTab === "tax" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                Sec 24(b) Interest Shield
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                ₹{calculations.annualSec24Savings.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Annual tax rebate on up to ₹2,00,000 home loan interest
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                Sec 80C Principal Shield
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                ₹{calculations.annualSec80CSavings.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Annual tax deduction on principal repayment
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                Total Annual Tax Savings
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-verdigris">
                ₹{calculations.totalAnnualTaxShield.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Direct reduction in annual income tax liability (30% bracket)
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line/80 bg-paper-2 p-4 text-xs leading-relaxed text-muted">
            <p className="font-semibold text-ink flex items-center gap-1.5 mb-1">
              <Receipt size={14} className="text-brass" />
              Wealth Advisory Advisory Note:
            </p>
            Under joint ownership with spouse, both co-borrowers can claim separate Section 24(b) deductions (up to ₹4,00,000 total interest write-off) and separate Section 80C limits, effectively doubling tax efficiency to ~₹2,18,000 annually.
          </div>
        </div>
      ) : null}
    </div>
  );
}
