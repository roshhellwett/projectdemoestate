"use client";

import { useState } from "react";
import { submitEnquiry } from "../server/enquiries";

/**
 * Sell-your-property listing form (public). Reused by the partner page
 * with kind="partner".
 */
export function SellForm({ kind = "sell" }: { kind?: "sell" | "partner" }) {
  const [form, setForm] = useState({
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
    proposal: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
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
              property_type: form.propertyType,
              bedrooms: form.bedrooms,
              area_sqft: form.area,
              expected_price: form.expectedPrice,
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
    if (res.ok) setState("done");
    else {
      setState("error");
      setError(res.error ?? "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-card)] border border-verdigris/30 bg-verdigris-soft p-10 text-center">
        <p className="font-display text-2xl font-medium text-ink">Received.</p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          {kind === "sell"
            ? "Our valuation team will call you within one working day to schedule a visit."
            : "We will review your proposal and get back within two working days."}
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-[var(--radius-input)] border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none";
  const labelCls = "mb-1.5 block text-xs font-semibold text-ink";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="sf-name" className={labelCls}>Owner name</label>
        <input id="sf-name" required minLength={2} value={form.name} onChange={set("name")} autoComplete="name" className={inputCls} placeholder="Full name" />
      </div>
      <div>
        <label htmlFor="sf-phone" className={labelCls}>Phone</label>
        <input id="sf-phone" required type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" className={inputCls} placeholder="10-digit mobile" />
      </div>

      {kind === "sell" ? (
        <>
          <div className="sm:col-span-2">
            <label htmlFor="sf-address" className={labelCls}>Property address</label>
            <input id="sf-address" required value={form.address} onChange={set("address")} className={inputCls} placeholder="Locality, Kolkata" />
          </div>
          <div>
            <label htmlFor="sf-type" className={labelCls}>Property type</label>
            <select id="sf-type" value={form.propertyType} onChange={set("propertyType")} className={inputCls}>
              <option>Flat</option>
              <option>House</option>
              <option>Land</option>
              <option>Office</option>
              <option>Shop</option>
            </select>
          </div>
          <div>
            <label htmlFor="sf-beds" className={labelCls}>Bedrooms</label>
            <select id="sf-beds" value={form.bedrooms} onChange={set("bedrooms")} className={inputCls}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
              <option value="na">Not applicable</option>
            </select>
          </div>
          <div>
            <label htmlFor="sf-area" className={labelCls}>Area (sq.ft)</label>
            <input id="sf-area" type="number" min={100} value={form.area} onChange={set("area")} className={inputCls} placeholder="e.g. 980" />
          </div>
          <div>
            <label htmlFor="sf-price" className={labelCls}>Expected price</label>
            <input id="sf-price" value={form.expectedPrice} onChange={set("expectedPrice")} className={inputCls} placeholder="e.g. 45 Lakhs" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sf-remarks" className={labelCls}>Remarks <span className="font-normal text-muted-2">(optional)</span></label>
            <textarea id="sf-remarks" rows={3} value={form.remarks} onChange={set("remarks")} className={`${inputCls} resize-none`} placeholder="Anything our team should know" />
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="sf-company" className={labelCls}>Company</label>
            <input id="sf-company" value={form.company} onChange={set("company")} className={inputCls} placeholder="Company name" />
          </div>
          <div>
            <label htmlFor="sf-website" className={labelCls}>Website <span className="font-normal text-muted-2">(optional)</span></label>
            <input id="sf-website" type="url" value={form.website} onChange={set("website")} className={inputCls} placeholder="https://" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sf-proposal" className={labelCls}>Proposal</label>
            <textarea id="sf-proposal" required rows={4} value={form.proposal} onChange={set("proposal")} className={`${inputCls} resize-none`} placeholder="Tell us about the partnership" />
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="sf-email" className={labelCls}>Email <span className="font-normal text-muted-2">(optional)</span></label>
        <input id="sf-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" className={inputCls} placeholder="you@example.com" />
      </div>

      {state === "error" ? (
        <p role="alert" className="sm:col-span-2 text-xs text-danger">{error}</p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {state === "sending" ? "Submitting…" : kind === "sell" ? "Submit Listing" : "Submit Proposal"}
        </button>
      </div>
    </form>
  );
}
