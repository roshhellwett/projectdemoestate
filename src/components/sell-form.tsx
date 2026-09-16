"use client";

import { useState } from "react";
import { submitEnquiry } from "../server/enquiries";
import { SITE } from "../lib/site";
import {
  House,
  CurrencyInr,
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  WhatsappLogo,
  ShieldCheck,
} from "@phosphor-icons/react";

/**
 * High-converting 3-step luxury property valuation & listing wizard.
 */
export function SellForm({ kind = "sell" }: { kind?: "sell" | "partner" }) {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    locality: "Lake Town",
    propertyType: "Apartment",
    bedrooms: "3",
    area: "",
    expectedPrice: "",
    ownershipType: "Sole Owner",
    furnishingStatus: "Semi-Furnished",
    remarks: "",
    company: "",
    website: "",
    proposal: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");

    const payload =
      kind === "sell"
        ? {
            kind: "sell" as const,
            name: form.name,
            phone: form.phone,
            email: form.email,
            message: form.remarks,
            payload: {
              address: form.address,
              locality: form.locality,
              property_type: form.propertyType,
              bedrooms: form.bedrooms,
              area_sqft: form.area,
              expected_price: form.expectedPrice,
              ownership_type: form.ownershipType,
              furnishing_status: form.furnishingStatus,
            },
          }
        : {
            kind: "partner" as const,
            name: form.name,
            phone: form.phone,
            email: form.email,
            message: form.proposal,
            payload: { company: form.company, website: form.website },
          };

    const res = await submitEnquiry({ data: payload });
    if (res.ok) {
      setState("done");
    } else {
      setState("error");
      setError(res.error ?? "Submission could not be completed.");
    }
  }

  if (state === "done") {
    const waText = encodeURIComponent(
      `Hello SS Property, I have submitted my property listing details for valuation:\n- Location: ${form.address} (${form.locality})\n- Configuration: ${form.bedrooms} BHK (${form.area} sq.ft)\n- Expected Price: ${form.expectedPrice}\n- Name: ${form.name}\n- Phone: ${form.phone}`
    );

    return (
      <div className="rounded-3xl border border-verdigris/30 bg-verdigris-soft/50 p-8 md:p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-verdigris text-white">
          <CheckCircle size={36} weight="fill" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink">
          Listing Valuation Request Received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-xs md:text-sm text-muted leading-relaxed">
          Thank you, <strong>{form.name}</strong>. Our senior valuation director will personally review your property details and contact you within 24 business hours to schedule an inspection.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`${SITE.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-verdigris px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-verdigris/90 transition-colors"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>Send Details via WhatsApp Now</span>
          </a>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-xs font-medium text-ink placeholder:text-muted focus:border-brass focus:bg-white focus:outline-none transition-colors min-h-[48px]";
  const labelCls = "mb-1.5 block text-xs font-bold text-ink uppercase tracking-wider";

  return (
    <div className="rounded-3xl border border-line bg-white p-6 md:p-10 shadow-sm">
      {/* Progress Steps Header */}
      <div className="mb-8 border-b border-line/60 pb-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Property Specs", icon: House },
            { num: 2, label: "Valuation & Status", icon: CurrencyInr },
            { num: 3, label: "Owner Contact", icon: User },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 text-xs font-bold ${
                step === s.num
                  ? "text-ink"
                  : step > s.num
                  ? "text-verdigris"
                  : "text-muted opacity-60"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors ${
                  step === s.num
                    ? "bg-ink text-paper"
                    : step > s.num
                    ? "bg-verdigris text-white"
                    : "border border-line bg-paper text-muted"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit}>
        {/* STEP 1: PROPERTY DETAILS */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h4 className="font-display text-xl font-medium text-ink">
              Step 1: Tell us about your Kolkata property
            </h4>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="sf-address" className={labelCls}>
                  Property Address & Building Name *
                </label>
                <input
                  id="sf-address"
                  required
                  value={form.address}
                  onChange={set("address")}
                  className={inputCls}
                  placeholder="e.g. Greenwood Heights, Block A, Lake Town"
                />
              </div>

              <div>
                <label htmlFor="sf-locality" className={labelCls}>
                  Locality / Zone *
                </label>
                <select
                  id="sf-locality"
                  value={form.locality}
                  onChange={set("locality")}
                  className={inputCls}
                >
                  <option value="Lake Town">Lake Town & Bangur Avenue</option>
                  <option value="Newtown">Newtown / Action Area</option>
                  <option value="Kasba">Kasba / EM Bypass</option>
                  <option value="Rajarhat">Rajarhat / Chinar Park</option>
                  <option value="Salt Lake">Salt Lake / Sector V</option>
                  <option value="C.R. Avenue">Central / C.R. Avenue</option>
                  <option value="Other Kolkata">Other Kolkata Prime Area</option>
                </select>
              </div>

              <div>
                <label htmlFor="sf-type" className={labelCls}>
                  Property Category *
                </label>
                <select
                  id="sf-type"
                  value={form.propertyType}
                  onChange={set("propertyType")}
                  className={inputCls}
                >
                  <option value="Apartment">Residential Apartment / Flat</option>
                  <option value="Penthouse">Penthouse / Duplex</option>
                  <option value="Bungalow">Independent Bungalow / Villa</option>
                  <option value="Commercial">Commercial Office / Retail</option>
                </select>
              </div>

              <div>
                <label htmlFor="sf-beds" className={labelCls}>
                  Bedrooms / Configuration *
                </label>
                <select
                  id="sf-beds"
                  value={form.bedrooms}
                  onChange={set("bedrooms")}
                  className={inputCls}
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5+">5+ BHK / Penthouse</option>
                  <option value="Commercial">Commercial Workspace</option>
                </select>
              </div>

              <div>
                <label htmlFor="sf-area" className={labelCls}>
                  Super Built-up Area (Sq.Ft) *
                </label>
                <input
                  id="sf-area"
                  required
                  type="number"
                  value={form.area}
                  onChange={set("area")}
                  className={inputCls}
                  placeholder="e.g. 1450"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                id="btn-sell-step1-next"
                type="button"
                onClick={() => {
                  if (!form.address || !form.area) {
                    alert("Please provide the property address and area.");
                    return;
                  }
                  setStep(2);
                }}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-paper hover:bg-ink-2 transition-all min-h-[48px] cursor-pointer"
              >
                <span>Continue to Valuation</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FINANCIALS & POSSESSION */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h4 className="font-display text-xl font-medium text-ink">
              Step 2: Valuation & Property Condition
            </h4>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="sf-price" className={labelCls}>
                  Expected Selling Price (INR) *
                </label>
                <input
                  id="sf-price"
                  required
                  value={form.expectedPrice}
                  onChange={set("expectedPrice")}
                  className={inputCls}
                  placeholder="e.g. ₹95 Lakhs or ₹1.40 Cr"
                />
              </div>

              <div>
                <label htmlFor="sf-ownership" className={labelCls}>
                  Ownership / Title Status
                </label>
                <select
                  id="sf-ownership"
                  value={form.ownershipType}
                  onChange={set("ownershipType")}
                  className={inputCls}
                >
                  <option value="Sole Owner">Sole Freehold Owner</option>
                  <option value="Joint Owner">Joint Ownership</option>
                  <option value="Power of Attorney">Power of Attorney</option>
                  <option value="Developer / Promoter">Builder / Developer</option>
                </select>
              </div>

              <div>
                <label htmlFor="sf-furnishing" className={labelCls}>
                  Furnishing Condition
                </label>
                <select
                  id="sf-furnishing"
                  value={form.furnishingStatus}
                  onChange={set("furnishingStatus")}
                  className={inputCls}
                >
                  <option value="Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label htmlFor="sf-remarks" className={labelCls}>
                  Key Highlights / Parking / Amenities
                </label>
                <input
                  id="sf-remarks"
                  value={form.remarks}
                  onChange={set("remarks")}
                  className={inputCls}
                  placeholder="e.g. Covered parking, modular kitchen, pool"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-xs font-semibold text-ink hover:bg-paper-2 transition-colors min-h-[44px] cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                id="btn-sell-step2-next"
                type="button"
                onClick={() => {
                  if (!form.expectedPrice) {
                    alert("Please state your expected price.");
                    return;
                  }
                  setStep(3);
                }}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-paper hover:bg-ink-2 transition-all min-h-[48px] cursor-pointer"
              >
                <span>Final Step: Contact Details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OWNER CONTACT & VERIFICATION */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h4 className="font-display text-xl font-medium text-ink">
              Step 3: Owner Details for Verification
            </h4>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="sf-name" className={labelCls}>
                  Owner Full Name *
                </label>
                <input
                  id="sf-name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  className={inputCls}
                  placeholder="Your full legal name"
                />
              </div>

              <div>
                <label htmlFor="sf-phone" className={labelCls}>
                  Phone Number (WhatsApp preferred) *
                </label>
                <input
                  id="sf-phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  className={inputCls}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="sf-email" className={labelCls}>
                  Email Address (Optional)
                </label>
                <input
                  id="sf-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  className={inputCls}
                  placeholder="your.email@domain.com"
                />
              </div>
            </div>

            <div className="rounded-xl bg-paper-2 p-4 text-xs text-muted flex items-start gap-2.5">
              <ShieldCheck size={18} weight="fill" className="text-verdigris shrink-0 mt-0.5" />
              <span>
                SS Property guarantees complete confidentiality. Your phone and property address will never be publicly listed without written authorization.
              </span>
            </div>

            {error ? (
              <p className="rounded-xl border border-danger/40 bg-danger/10 p-3 text-xs text-danger">
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-xs font-semibold text-ink hover:bg-paper-2 transition-colors min-h-[44px] cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                id="btn-sell-submit"
                type="submit"
                disabled={state === "sending"}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-verdigris px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-verdigris/90 disabled:opacity-50 transition-all min-h-[48px] cursor-pointer"
              >
                <span>{state === "sending" ? "Submitting…" : "Submit for Free Valuation"}</span>
                <CheckCircle size={16} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
