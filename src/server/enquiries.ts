/**
 * Public enquiry submission. Uses the publishable-key client server-side
 * (RLS: anyone may insert enquiries, nobody may read without admin).
 *
 * Zod validates the payload before it reaches the database.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseBrowser } from "../lib/supabase";

const EnquirySchema = z.object({
  kind: z.enum(["contact", "property", "sell", "partner"]),
  propertyId: z.string().uuid().nullable().optional(),
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s()-]{8,17}$/, "Enter a valid phone number"),
  email: z.union([z.string().trim().email().max(160), z.literal("")]).optional(),
  message: z.string().trim().max(2000).optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((raw: unknown) => EnquirySchema.parse(raw))
  .handler(async ({ data }) => {
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.from("enquiries").insert({
      kind: data.kind,
      property_id: data.propertyId ?? null,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message ?? "",
      payload: data.payload ?? {},
    });
    if (error) {
      // Don't leak internals; generic message suffices for a public form.
      console.error("enquiry insert failed:", error.message);
      return { ok: false as const, error: "Could not submit right now. Please call or WhatsApp us instead." };
    }
    return { ok: true as const };
  });
