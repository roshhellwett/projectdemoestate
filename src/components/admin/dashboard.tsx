"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "../../lib/supabase";
import { Wordmark } from "../brand";
import type { Enquiry, Property } from "../../lib/types";
import { formatPrice } from "../../lib/format";

/**
 * Admin dashboard (/admin): listings table + enquiries inbox.
 * Auth guard lives in the /admin layout route; RLS protects all data.
 */
export function AdminDashboard() {
  const supabase = getSupabaseBrowser();
  const navigate = useNavigate();
  const [view, setView] = useState<"properties" | "enquiries">("properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (view === "properties") {
        const { data } = await supabase
          .from("properties")
          .select("*")
          .order("created_at", { ascending: false });
        setProperties((data as Property[]) ?? []);
      } else {
        const { data } = await supabase
          .from("enquiries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100);
        setEnquiries((data as Enquiry[]) ?? []);
      }
      setLoading(false);
    })();
  }, [view, supabase]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  async function togglePublished(p: Property) {
    await supabase.from("properties").update({ is_published: !p.is_published }).eq("id", p.id);
    setProperties((rows) => rows.map((r) => (r.id === p.id ? { ...r, is_published: !r.is_published } : r)));
  }

  async function removeProperty(p: Property) {
    if (!window.confirm(`Delete "${p.title}"? This also removes its gallery. Cannot be undone.`)) return;
    await supabase.from("properties").delete().eq("id", p.id);
    setProperties((rows) => rows.filter((r) => r.id !== p.id));
  }

  async function setEnquiryStatus(e: Enquiry, status: Enquiry["status"]) {
    await supabase.from("enquiries").update({ status }).eq("id", e.id);
    setEnquiries((rows) => rows.map((r) => (r.id === e.id ? { ...r, status } : r)));
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="shell-wide flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/"><Wordmark className="origin-left scale-90" /></Link>
            <nav className="flex gap-1 text-[13px] font-medium" aria-label="Admin sections">
              <button
                type="button"
                onClick={() => setView("properties")}
                className={`rounded-full px-4 py-2 transition-colors ${
                  view === "properties" ? "bg-ink text-paper" : "text-muted hover:text-ink"
                }`}
              >
                Listings
              </button>
              <button
                type="button"
                onClick={() => setView("enquiries")}
                className={`rounded-full px-4 py-2 transition-colors ${
                  view === "enquiries" ? "bg-ink text-paper" : "text-muted hover:text-ink"
                }`}
              >
                Enquiries
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/new"
              className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-transform hover:-translate-y-0.5"
            >
              + New Listing
            </Link>
            <button type="button" onClick={signOut} className="text-[13px] text-muted hover:text-ink">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="shell-wide py-10">
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : view === "properties" ? (
          <PropertyTable rows={properties} onToggle={togglePublished} onDelete={removeProperty} />
        ) : (
          <EnquiryTable rows={enquiries} onStatus={setEnquiryStatus} />
        )}
      </main>
    </div>
  );
}

function PropertyTable({
  rows,
  onToggle,
  onDelete,
}: {
  rows: Property[];
  onToggle: (p: Property) => void;
  onDelete: (p: Property) => void;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">No listings yet. Create your first one.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-muted-2">
            <th className="px-5 py-4">Listing</th>
            <th className="px-4 py-4">Price</th>
            <th className="px-4 py-4">Locality</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-b border-line/60 last:border-0">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  {p.main_image_thumb ? (
                    <img src={p.main_image_thumb} alt="" width={56} height={42} className="h-11 w-14 rounded-md object-cover" />
                  ) : null}
                  <div>
                    <p className="max-w-xs truncate font-medium text-ink">{p.title}</p>
                    <p className="text-xs text-muted">{p.bhk_type}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-medium text-ink">{formatPrice(p.price_inr, p.price_display)}</td>
              <td className="px-4 py-4 text-muted">{p.locality}</td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => onToggle(p)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    p.is_published ? "bg-verdigris-soft text-verdigris" : "bg-paper-3 text-muted"
                  }`}
                >
                  {p.is_published ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex justify-end gap-4 text-[13px]">
                  <Link to="/admin/property/$id" params={{ id: p.id }} className="font-semibold text-brass hover:text-ink">
                    Edit
                  </Link>
                  <button type="button" onClick={() => onDelete(p)} className="text-danger/80 hover:text-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EnquiryTable({
  rows,
  onStatus,
}: {
  rows: Enquiry[];
  onStatus: (e: Enquiry, status: Enquiry["status"]) => void;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">No enquiries yet.</p>;
  }
  return (
    <div className="space-y-3">
      {rows.map((e) => (
        <div key={e.id} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${
                e.status === "new" ? "bg-brass-ghost text-brass" : "bg-paper-3 text-muted"
              }`}>
                {e.kind}
              </span>
              <p className="font-medium text-ink">{e.name}</p>
              <a href={`tel:${e.phone}`} className="text-[13px] text-brass hover:text-ink">{e.phone}</a>
              {e.email ? <span className="text-[13px] text-muted">{e.email}</span> : null}
            </div>
            <select
              value={e.status}
              onChange={(ev) => onStatus(e, ev.target.value as Enquiry["status"])}
              className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink focus:border-brass focus:outline-none"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
              <option value="spam">Spam</option>
            </select>
          </div>
          {e.message ? <p className="mt-3 text-sm text-muted">{e.message}</p> : null}
          {e.payload && Object.keys(e.payload).length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(e.payload).map(([k, v]) => (
                <span key={k} className="rounded-full bg-paper-2 px-3 py-1 text-[11px] text-muted">
                  {k.replace(/_/g, " ")}: {String(v)}
                </span>
              ))}
            </div>
          ) : null}
          <p className="mt-3 text-[11px] text-muted-2">
            {new Date(e.created_at).toLocaleString("en-IN")}
          </p>
        </div>
      ))}
    </div>
  );
}
