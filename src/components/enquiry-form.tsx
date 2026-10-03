"use client";

import { useState } from "react";
import { submitEnquiry } from "../server/enquiries";
import { SITE } from "../lib/site";
import type { Property } from "../lib/types";
import { Car } from "@phosphor-icons/react";

/**
 * Sticky enquiry card on the property detail page. Client island:
 * submits through the server function (RLS allows anonymous inserts).
 */
export function EnquiryForm({ property }: { property: Property }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [chauffeur, setChauffeur] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    const formattedMessage = [
      message,
      chauffeur ? "[VIP Service] Complimentary Chauffeur Pickup Requested." : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const res = await submitEnquiry({
      data: {
        kind: "property",
        propertyId: property.id,
        name,
        phone,
        message: formattedMessage || `Interested in: ${property.title}`,
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
            className="w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-3 text-base sm:text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none min-h-[48px]"
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
            className="w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-base sm:text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none min-h-[48px]"
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
            className="w-full resize-none rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-base sm:text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none"
            placeholder="Preferred visit time, questions..."
          />
        </div>

        {/* Executive Chauffeur Option */}
        <label className="flex items-start gap-2.5 cursor-pointer rounded-xl border border-brass/30 bg-brass/5 p-3 text-xs transition-colors hover:bg-brass/10">
          <input
            type="checkbox"
            checked={chauffeur}
            onChange={(e) => setChauffeur(e.target.checked)}
            className="mt-0.5 rounded border-line text-brass focus:ring-brass"
          />
          <div>
            <span className="font-semibold text-ink flex items-center gap-1.5">
              <Car size={15} weight="fill" className="text-brass" />
              Complimentary Chauffeur Pickup
            </span>
            <p className="text-[11px] text-muted mt-0.5">
              Request an executive vehicle pickup for your private site visit.
            </p>
          </div>
        </label>

        {state === "error" ? (
          <p role="alert" className="text-xs text-danger">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 cursor-pointer min-h-[48px]"
        >
          {state === "sending" ? "Sending..." : "Request a Visit"}
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
