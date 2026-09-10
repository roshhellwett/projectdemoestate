"use client";

import { useState } from "react";
import { submitEnquiry } from "../server/enquiries";
import { SITE } from "../lib/site";
import type { Property } from "../lib/types";

/**
 * Sticky enquiry card on the property detail page. Client island:
 * submits through the server function (RLS allows anonymous inserts).
 */
export function EnquiryForm({ property }: { property: Property }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    const res = await submitEnquiry({
      data: {
        kind: "property",
        propertyId: property.id,
        name,
        phone,
        message: message || `Interested in: ${property.title}`,
      },
    });
    if (res.ok) {
      setState("done");
    } else {
      setState("error");
      setError(res.error ?? "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-card)] border border-verdigris/30 bg-verdigris-soft p-6 text-center">
        <p className="font-display text-xl font-medium text-ink">Thank you.</p>
        <p className="mt-2 text-sm text-muted">
          We received your enquiry for {property.bhk_type} in {property.locality}. Expect a call shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
      <p className="font-display text-xl font-medium text-ink">Book a visit</p>
      <p className="mt-1 text-xs text-muted">We reply within a few hours, 7 days a week.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <div>
          <label htmlFor="enq-name" className="mb-1.5 block text-xs font-semibold text-ink">
            Your name
          </label>
          <input
            id="enq-name"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none"
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="enq-phone" className="mb-1.5 block text-xs font-semibold text-ink">
            Phone
          </label>
          <input
            id="enq-phone"
            required
            type="tel"
            inputMode="tel"
            pattern="[+0-9\s()-]{8,17}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            className="w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none"
            placeholder="10-digit mobile"
          />
        </div>
        <div>
          <label htmlFor="enq-msg" className="mb-1.5 block text-xs font-semibold text-ink">
            Message <span className="font-normal text-muted-2">(optional)</span>
          </label>
          <textarea
            id="enq-msg"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none"
            placeholder="Preferred visit time, questions…"
          />
        </div>

        {state === "error" ? (
          <p role="alert" className="text-xs text-danger">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Request a Visit"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-muted">
        Prefer to talk now?{" "}
        <a href={SITE.phoneHref} className="font-semibold text-brass hover:text-ink">
          {SITE.phone}
        </a>
      </p>
    </div>
  );
}
