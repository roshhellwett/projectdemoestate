"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "../../lib/supabase";
import { LogoImage } from "../brand";
import {
  deleteReel,
  deletePartner,
  deleteFaq,
  deleteTestimonial,
  deleteBlogPost,
  saveSettings,
  saveReel,
  parseInstagramUrl,
  upsertBlogPost,
  upsertFaq,
  upsertPartner,
  upsertTestimonial,
  uploadPartnerLogo,
  uploadReelCover,
} from "../../lib/cms";
import type { BlogPost, Enquiry, Faq, Partner, Property, Reel, Testimonial } from "../../lib/types";
import { formatPrice } from "../../lib/format";

/**
 * Admin dashboard (/admin): full website management from the laptop.
 * Sections: Listings / Enquiries / Instagram / Journal / Reviews /
 * FAQs / Partners / Settings. RLS (is_admin) protects every write.
 */

type Tab =
  | "properties"
  | "enquiries"
  | "reels"
  | "journal"
  | "reviews"
  | "faqs"
  | "partners"
  | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "properties", label: "Listings" },
  { id: "enquiries", label: "Enquiries" },
  { id: "reels", label: "Instagram" },
  { id: "journal", label: "Journal" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "partners", label: "Partners" },
  { id: "settings", label: "Settings" },
];

export function AdminDashboard() {
  const supabase = getSupabaseBrowser();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("properties");
  const [loading, setLoading] = useState(true);

  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (tab === "properties") {
        const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
        setProperties((data as Property[]) ?? []);
      } else if (tab === "enquiries") {
        const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(100);
        setEnquiries((data as Enquiry[]) ?? []);
      } else if (tab === "reels") {
        const { data } = await supabase.from("reels").select("*").order("display_order");
        setReels((data as Reel[]) ?? []);
      } else if (tab === "journal") {
        const { data } = await supabase.from("blog_posts").select("*").order("publish_date", { ascending: false });
        setPosts((data as BlogPost[]) ?? []);
      } else if (tab === "reviews") {
        const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
        setTestimonials((data as Testimonial[]) ?? []);
      } else if (tab === "faqs") {
        const { data } = await supabase.from("faqs").select("*").order("display_order");
        setFaqs((data as Faq[]) ?? []);
      } else if (tab === "partners") {
        const { data } = await supabase.from("partners").select("*").order("display_order");
        setPartners((data as Partner[]) ?? []);
      } else if (tab === "settings") {
        const { data } = await supabase.from("site_settings").select("key, value");
        const map: Record<string, string> = {};
        for (const row of (data ?? []) as { key: string; value: string }[]) map[row.key] = row.value;
        setSettings(map);
      }
      setLoading(false);
    })();
  }, [tab, supabase]);

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
            <Link to="/" aria-label="Home">
              <LogoImage className="h-8" />
            </Link>
            <nav className="hidden flex-wrap gap-1 text-[13px] font-medium lg:flex" aria-label="Admin sections">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-3.5 py-2 transition-colors ${
                    tab === t.id ? "bg-ink text-paper" : "text-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
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
        {/* mobile tab row */}
        <nav className="flex gap-1 overflow-x-auto border-t border-line px-4 pb-2 pt-2 text-[13px] font-medium lg:hidden" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 transition-colors ${
                tab === t.id ? "bg-ink text-paper" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="shell-wide py-10">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-brass border-t-transparent" />
              <p className="text-sm font-medium text-muted">Loading dashboard data...</p>
            </div>
          </div>
        ) : tab === "properties" ? (
          <PropertyTable rows={properties} onToggle={togglePublished} onDelete={removeProperty} />
        ) : tab === "enquiries" ? (
          <EnquiryTable rows={enquiries} onStatus={setEnquiryStatus} />
        ) : tab === "reels" ? (
          <ReelsManager reels={reels} refresh={setReels} />
        ) : tab === "journal" ? (
          <JournalManager posts={posts} refresh={setPosts} />
        ) : tab === "reviews" ? (
          <ReviewsManager testimonials={testimonials} refresh={setTestimonials} />
        ) : tab === "faqs" ? (
          <FaqManager faqs={faqs} refresh={setFaqs} />
        ) : tab === "partners" ? (
          <PartnersManager partners={partners} refresh={setPartners} />
        ) : (
          <SettingsManager settings={settings} />
        )}
      </main>
    </div>
  );
}

/* =====================================================================
   shared admin bits
   ===================================================================== */

const inputCls =
  "w-full rounded-[var(--radius-input)] border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-semibold text-ink";

function Btn({
  children,
  onClick,
  kind = "primary",
  disabled,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  const styles =
    kind === "primary"
      ? "bg-ink text-paper hover:-translate-y-0.5"
      : kind === "danger"
        ? "text-danger/80 hover:text-danger"
        : "border border-ink/20 text-ink hover:border-ink/50";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all disabled:opacity-60 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function AdminCard({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-medium text-ink">{title}</h2>
        {actions}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Notice({ state }: { state: { error: string; saved: boolean } }) {
  if (state.error) return <p role="alert" className="text-xs text-danger">{state.error}</p>;
  if (state.saved) return <p className="text-xs font-semibold text-verdigris">Saved ✓</p>;
  return null;
}

function useNotice() {
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const notice = { error, saved };
  const flash = (err?: string) => {
    if (err) {
      setError(err);
      setSaved(false);
    } else {
      setError("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };
  return { notice, flash };
}

/* =====================================================================
   Listings table
   ===================================================================== */

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

/* =====================================================================
   Enquiries inbox
   ===================================================================== */

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
          <p className="mt-3 text-[11px] text-muted-2">{new Date(e.created_at).toLocaleString("en-IN")}</p>
        </div>
      ))}
    </div>
  );
}

/* =====================================================================
   Instagram reels manager - paste a link, it appears on the site
   ===================================================================== */

function ReelsManager({ reels, refresh }: { reels: Reel[]; refresh: (r: Reel[]) => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState<{ cover: string; thumb: string } | null>(null);
  const { notice, flash } = useNotice();
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function reload() {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.from("reels").select("*").order("display_order");
    refresh((data as Reel[]) ?? []);
  }

  async function onAdd() {
    setBusy(true);
    try {
      await saveReel({
        title,
        url,
        cover: cover?.cover,
        coverThumb: cover?.thumb,
        displayOrder: (reels.at(-1)?.display_order ?? 0) + 1,
        isPublished: true,
      });
      setUrl("");
      setTitle("");
      setCover(null);
      flash();
      await reload();
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onTogglePublish(reel: Reel) {
    const supabase = getSupabaseBrowser();
    await supabase.from("reels").update({ is_published: !reel.is_published }).eq("id", reel.id);
    await reload();
  }

  async function onDelete(reel: Reel) {
    if (!window.confirm(`Remove "${reel.title}" from the Instagram section?`)) return;
    await deleteReel(reel.id);
    await reload();
  }

  const parsed = url ? parseInstagramUrl(url) : null;

  return (
    <div className="space-y-8">
      <AdminCard
        title="Add a reel"
        actions={
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              try {
                setCover(await uploadReelCover(f));
              } catch (err) {
                flash((err as Error).message);
              }
            }}
          />
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="reel-url" className={labelCls}>Instagram reel link</label>
            <input
              id="reel-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={inputCls}
              placeholder="https://www.instagram.com/reel/... (just paste it)"
            />
            {url && !parsed ? (
              <p className="mt-1.5 text-xs text-danger">That does not look like an Instagram reel link.</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="reel-title" className={labelCls}>Title <span className="font-normal text-muted-2">(optional)</span></label>
            <input id="reel-title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="e.g. Lake Town 3 BHK walkthrough" />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex items-center gap-3">
              {cover ? (
                <img src={cover.thumb} alt="Reel cover preview" width={48} height={60} className="h-15 w-12 rounded-md object-cover" style={{ height: 60 }} />
              ) : null}
              <Btn kind="ghost" onClick={() => fileRef.current?.click()}>
                {cover ? "Change cover" : "Add cover image"}
              </Btn>
              {cover ? (
                <button type="button" className="text-xs text-muted hover:text-danger" onClick={() => setCover(null)}>
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <Btn onClick={onAdd} disabled={busy || !parsed}>
            {busy ? "Adding..." : "Add to Instagram section"}
          </Btn>
          <Notice state={notice} />
        </div>
        <p className="mt-3 text-xs text-muted-2">
          Reels appear only in the Instagram section of the home page. Cover image is optional - without one the tile shows a plain gradient. The link works with reel and post URLs.
        </p>
      </AdminCard>

      <AdminCard title={`Reels on the site (${reels.length})`}>
        {reels.length === 0 ? (
          <p className="text-sm text-muted">Nothing here yet. Paste your first reel link above.</p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reels.map((reel) => (
              <li key={reel.id} className="group relative overflow-hidden rounded-xl border border-line">
                <img
                  src={reel.cover_thumb || reel.cover_image}
                  alt={reel.title}
                  className={`aspect-[4/5] w-full object-cover ${reel.is_published ? "" : "opacity-40 grayscale"}`}
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3">
                  <p className="truncate text-sm font-medium text-paper">{reel.title}</p>
                  <p className="text-[11px] text-paper/60">{reel.is_published ? "Live" : "Hidden"}</p>
                </div>
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onTogglePublish(reel)}
                    className="rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper"
                  >
                    {reel.is_published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(reel)}
                    className="rounded-full bg-danger/85 px-2.5 py-1 text-[10px] font-semibold text-white"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}

/* =====================================================================
   Journal manager
   ===================================================================== */

interface PostDraft {
  id?: string;
  slug: string;
  title: string;
  publishDate: string;
  author: string;
  cover: string;
  coverThumb: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
}

function emptyPost(): PostDraft {
  return {
    slug: "",
    title: "",
    publishDate: new Date().toISOString().slice(0, 10),
    author: "Editorial Team",
    cover: "",
    coverThumb: "",
    content: "",
    excerpt: "",
    isPublished: true,
  };
}

function JournalManager({ posts, refresh }: { posts: BlogPost[]; refresh: (p: BlogPost[]) => void }) {
  const [draft, setDraft] = useState<PostDraft | null>(null);
  const { notice, flash } = useNotice();
  const [busy, setBusy] = useState(false);

  async function reload() {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.from("blog_posts").select("*").order("publish_date", { ascending: false });
    refresh((data as BlogPost[]) ?? []);
  }

  async function onSave() {
    if (!draft) return;
    setBusy(true);
    try {
      await upsertBlogPost({
        id: draft.id,
        slug: draft.slug || draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
        title: draft.title,
        publishDate: draft.publishDate,
        author: draft.author,
        cover: draft.cover,
        coverThumb: draft.coverThumb,
        content: draft.content,
        excerpt: draft.excerpt,
        isPublished: draft.isPublished,
      });
      setDraft(null);
      flash();
      await reload();
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <AdminCard
        title={draft ? (draft.id ? "Edit article" : "New article") : `Journal articles (${posts.length})`}
        actions={
          draft ? (
            <Btn kind="ghost" onClick={() => setDraft(null)}>Cancel</Btn>
          ) : (
            <Btn onClick={() => setDraft(emptyPost())}>+ New Article</Btn>
          )
        }
      >
        {draft ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelCls}>Title</label>
              <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Slug <span className="font-normal text-muted-2">(URL)</span></label>
              <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className={inputCls} placeholder="auto from title" />
            </div>
            <div>
              <label className={labelCls}>Publish date</label>
              <input type="date" value={draft.publishDate} onChange={(e) => setDraft({ ...draft, publishDate: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Author</label>
              <input value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Cover image URL <span className="font-normal text-muted-2">(optional)</span></label>
              <input value={draft.cover} onChange={(e) => setDraft({ ...draft, cover: e.target.value, coverThumb: e.target.value })} className={inputCls} placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Excerpt <span className="font-normal text-muted-2">(1-2 lines)</span></label>
              <textarea rows={2} value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} className={`${inputCls} resize-none`} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Article body <span className="font-normal text-muted-2">(blank line between paragraphs)</span></label>
              <textarea rows={10} value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} className={`${inputCls} resize-y`} />
            </div>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={draft.isPublished} onChange={(e) => setDraft({ ...draft, isPublished: e.target.checked })} className="h-4 w-4 accent-[#a9862f]" />
              Published
            </label>
            <div className="flex items-center justify-end gap-4">
              <Notice state={notice} />
              <Btn onClick={onSave} disabled={busy || !draft.title.trim() || !draft.content.trim()}>
                {busy ? "Saving..." : draft.id ? "Save Article" : "Publish Article"}
              </Btn>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-sm text-muted">No articles yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {posts.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                <div>
                  <p className="font-medium text-ink">{p.title}</p>
                  <p className="text-xs text-muted">{p.publish_date} · {p.is_published ? "Published" : "Draft"}</p>
                </div>
                <div className="flex gap-3 text-[13px]">
                  <button type="button" className="font-semibold text-brass hover:text-ink" onClick={() => setDraft({
                    id: p.id,
                    slug: p.slug,
                    title: p.title,
                    publishDate: p.publish_date,
                    author: p.author,
                    cover: p.cover_image,
                    coverThumb: p.cover_thumb,
                    content: p.content,
                    excerpt: p.excerpt,
                    isPublished: p.is_published,
                  })}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-danger/80 hover:text-danger"
                    onClick={async () => {
                      if (!window.confirm(`Delete "${p.title}"?`)) return;
                      await deleteBlogPost(p.id);
                      await reload();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}

/* =====================================================================
   Reviews (testimonials) manager
   ===================================================================== */

function ReviewsManager({ testimonials, refresh }: { testimonials: Testimonial[]; refresh: (t: Testimonial[]) => void }) {
  const [d, setD] = useState({
    clientName: "",
    clientLocation: "",
    rating: 5,
    reviewText: "",
    reviewDate: new Date().toISOString().slice(0, 10),
    isPublished: true,
  });
  const { notice, flash } = useNotice();
  const [busy, setBusy] = useState(false);

  async function reload() {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    refresh((data as Testimonial[]) ?? []);
  }

  async function onAdd() {
    setBusy(true);
    try {
      await upsertTestimonial({
        clientName: d.clientName,
        clientLocation: d.clientLocation,
        rating: d.rating,
        reviewText: d.reviewText,
        reviewDate: d.reviewDate || null,
        isPublished: d.isPublished,
      });
      setD({ clientName: "", clientLocation: "", rating: 5, reviewText: "", reviewDate: new Date().toISOString().slice(0, 10), isPublished: true });
      flash();
      await reload();
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <AdminCard title="Add a review">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls}>Client name</label>
            <input value={d.clientName} onChange={(e) => setD({ ...d, clientName: e.target.value })} className={inputCls} placeholder="Full name" />
          </div>
          <div>
            <label className={labelCls}>Location <span className="font-normal text-muted-2">(optional)</span></label>
            <input value={d.clientLocation} onChange={(e) => setD({ ...d, clientLocation: e.target.value })} className={inputCls} placeholder="Lake Town, Kolkata" />
          </div>
          <div>
            <label className={labelCls}>Rating</label>
            <select value={d.rating} onChange={(e) => setD({ ...d, rating: Number(e.target.value) })} className={inputCls}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{"★".repeat(r)}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Review date</label>
            <input type="date" value={d.reviewDate} onChange={(e) => setD({ ...d, reviewDate: e.target.value })} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Review text</label>
            <textarea rows={3} value={d.reviewText} onChange={(e) => setD({ ...d, reviewText: e.target.value })} className={`${inputCls} resize-none`} placeholder="What the client said (keep it short - 2-3 lines)" />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <Btn onClick={onAdd} disabled={busy || !d.clientName.trim() || !d.reviewText.trim()}>
            {busy ? "Adding..." : "Add Review"}
          </Btn>
          <Notice state={notice} />
        </div>
      </AdminCard>

      <AdminCard title={`Reviews (${testimonials.length})`}>
        {testimonials.length === 0 ? (
          <p className="text-sm text-muted">No reviews yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {testimonials.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="max-w-xl">
                  <p className="text-sm font-semibold text-ink">
                    {t.client_name} <span className="font-normal text-muted">· {t.client_location || "Kolkata"}</span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{t.review_text}</p>
                  <p className="mt-1 text-xs text-muted-2">{"★".repeat(t.rating)} · {t.is_published ? "Published" : "Hidden"}</p>
                </div>
                <div className="flex gap-3 text-[13px]">
                  <button
                    type="button"
                    className="font-semibold text-brass hover:text-ink"
                    onClick={async () => {
                      const supabase = getSupabaseBrowser();
                      await supabase.from("testimonials").update({ is_published: !t.is_published }).eq("id", t.id);
                      await reload();
                    }}
                  >
                    {t.is_published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    className="text-danger/80 hover:text-danger"
                    onClick={async () => {
                      if (!window.confirm(`Delete review by ${t.client_name}?`)) return;
                      await deleteTestimonial(t.id);
                      await reload();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}

/* =====================================================================
   FAQ manager
   ===================================================================== */

function FaqManager({ faqs, refresh }: { faqs: Faq[]; refresh: (f: Faq[]) => void }) {
  const [d, setD] = useState({ question: "", answer: "", category: "General", displayOrder: faqs.length + 1, isPublished: true });
  const { notice, flash } = useNotice();
  const [busy, setBusy] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  async function reload() {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.from("faqs").select("*").order("display_order");
    refresh((data as Faq[]) ?? []);
  }

  async function onSave() {
    setBusy(true);
    try {
      await upsertFaq({ id: editId ?? undefined, ...d });
      setD({ question: "", answer: "", category: "General", displayOrder: faqs.length + 1, isPublished: true });
      setEditId(null);
      flash();
      await reload();
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <AdminCard title={editId ? "Edit FAQ" : "Add an FAQ"}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelCls}>Question</label>
            <input value={d.question} onChange={(e) => setD({ ...d, question: e.target.value })} className={inputCls} placeholder="Do you charge buyers a fee?" />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <input value={d.category} onChange={(e) => setD({ ...d, category: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Display order</label>
            <input type="number" min={1} value={d.displayOrder} onChange={(e) => setD({ ...d, displayOrder: Number(e.target.value) })} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Answer</label>
            <textarea rows={3} value={d.answer} onChange={(e) => setD({ ...d, answer: e.target.value })} className={`${inputCls} resize-none`} />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <Btn onClick={onSave} disabled={busy || !d.question.trim() || !d.answer.trim()}>
            {busy ? "Saving..." : editId ? "Save FAQ" : "Add FAQ"}
          </Btn>
          {editId ? (
            <Btn kind="ghost" onClick={() => { setEditId(null); setD({ question: "", answer: "", category: "General", displayOrder: faqs.length + 1, isPublished: true }); }}>
              Cancel
            </Btn>
          ) : null}
          <Notice state={notice} />
        </div>
      </AdminCard>

      <AdminCard title={`FAQs (${faqs.length})`}>
        {faqs.length === 0 ? (
          <p className="text-sm text-muted">No FAQs yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {faqs.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="max-w-xl">
                  <p className="text-sm font-semibold text-ink">{f.question}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-muted">{f.answer}</p>
                </div>
                <div className="flex gap-3 text-[13px]">
                  <button
                    type="button"
                    className="font-semibold text-brass hover:text-ink"
                    onClick={() => {
                      setEditId(f.id);
                      setD({
                        question: f.question,
                        answer: f.answer,
                        category: f.category || "General",
                        displayOrder: f.display_order,
                        isPublished: f.is_published,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-muted hover:text-ink"
                    onClick={async () => {
                      const supabase = getSupabaseBrowser();
                      await supabase.from("faqs").update({ is_published: !f.is_published }).eq("id", f.id);
                      await reload();
                    }}
                  >
                    {f.is_published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    className="text-danger/80 hover:text-danger"
                    onClick={async () => {
                      if (!window.confirm("Delete this FAQ?")) return;
                      await deleteFaq(f.id);
                      await reload();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}

/* =====================================================================
   Partners manager
   ===================================================================== */

function PartnersManager({ partners, refresh }: { partners: Partner[]; refresh: (p: Partner[]) => void }) {
  const [d, setD] = useState({ name: "", slug: "", logoUrl: "", websiteUrl: "", description: "", displayOrder: partners.length + 1, isPublished: true });
  const [editId, setEditId] = useState<string | null>(null);
  const { notice, flash } = useNotice();
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function reload() {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.from("partners").select("*").order("display_order");
    refresh((data as Partner[]) ?? []);
  }

  async function onSave() {
    setBusy(true);
    try {
      await upsertPartner({ id: editId ?? undefined, ...d });
      setD({ name: "", slug: "", logoUrl: "", websiteUrl: "", description: "", displayOrder: partners.length + 1, isPublished: true });
      setEditId(null);
      flash();
      await reload();
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <AdminCard title={editId ? "Edit partner" : "Add a partner"}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (!f) return;
            try {
              const url = await uploadPartnerLogo(f);
              setD((prev) => ({ ...prev, logoUrl: url }));
              flash();
            } catch (err) {
              flash((err as Error).message);
            }
          }}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls}>Partner name</label>
            <input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} className={inputCls} placeholder="e.g. Ruchi Realty" />
          </div>
          <div>
            <label className={labelCls}>Website <span className="font-normal text-muted-2">(optional)</span></label>
            <input value={d.websiteUrl} onChange={(e) => setD({ ...d, websiteUrl: e.target.value })} className={inputCls} placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Logo</label>
            <div className="flex flex-wrap items-center gap-4">
              {d.logoUrl ? (
                <img src={d.logoUrl} alt="Partner logo preview" className="h-12 w-auto rounded-md border border-line bg-paper-2 object-contain px-3 py-2" />
              ) : (
                <span className="rounded-md border border-dashed border-line px-4 py-3 text-xs text-muted-2">No logo yet</span>
              )}
              <Btn kind="ghost" onClick={() => fileRef.current?.click()}>Upload logo</Btn>
              {d.logoUrl ? (
                <input value={d.logoUrl} onChange={(e) => setD({ ...d, logoUrl: e.target.value })} className={`${inputCls} flex-1`} />
              ) : null}
            </div>
          </div>
          <div>
            <label className={labelCls}>Display order</label>
            <input type="number" min={1} value={d.displayOrder} onChange={(e) => setD({ ...d, displayOrder: Number(e.target.value) })} className={inputCls} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 pb-2.5 text-sm text-ink">
              <input type="checkbox" checked={d.isPublished} onChange={(e) => setD({ ...d, isPublished: e.target.checked })} className="h-4 w-4 accent-[#a9862f]" />
              Show on site
            </label>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <Btn onClick={onSave} disabled={busy || !d.name.trim()}>
            {busy ? "Saving..." : editId ? "Save Partner" : "Add Partner"}
          </Btn>
          {editId ? <Btn kind="ghost" onClick={() => { setEditId(null); setD({ name: "", slug: "", logoUrl: "", websiteUrl: "", description: "", displayOrder: partners.length + 1, isPublished: true }); }}>Cancel</Btn> : null}
          <Notice state={notice} />
        </div>
      </AdminCard>

      <AdminCard title={`Partners on the site (${partners.length})`}>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <li key={p.id} className="group relative rounded-xl border border-line bg-paper-2/50 p-4">
              <img
                src={p.logo_url}
                alt={p.name}
                className={`mx-auto h-12 w-auto object-contain ${p.is_published ? "" : "opacity-30 grayscale"}`}
                loading="lazy"
              />
              <p className="mt-3 truncate text-center text-xs font-medium text-ink">{p.name}</p>
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-gradient-to-t from-paper-2 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" className="rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper" onClick={() => {
                  setEditId(p.id);
                  setD({
                    name: p.name,
                    slug: p.slug,
                    logoUrl: p.logo_url,
                    websiteUrl: p.website_url ?? "",
                    description: p.description ?? "",
                    displayOrder: p.display_order,
                    isPublished: p.is_published,
                  });
                }}>
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper"
                  onClick={async () => {
                    const supabase = getSupabaseBrowser();
                    await supabase.from("partners").update({ is_published: !p.is_published }).eq("id", p.id);
                    await reload();
                  }}
                >
                  {p.is_published ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  className="rounded-full bg-danger/85 px-2.5 py-1 text-[10px] font-semibold text-white"
                  onClick={async () => {
                    if (!window.confirm(`Remove ${p.name}?`)) return;
                    await deletePartner(p.id);
                    await reload();
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}

/* =====================================================================
   Site settings editor - edit anything the public site shows
   ===================================================================== */

const SETTING_GROUPS: { title: string; fields: { key: string; label: string; hint?: string; area?: boolean }[] }[] = [
  {
    title: "Brand & contact",
    fields: [
      { key: "brand_name", label: "Brand name" },
      { key: "tagline", label: "Tagline" },
      { key: "phone", label: "Phone", hint: "Shown in header CTA, footer, contact links" },
      { key: "whatsapp_number", label: "WhatsApp number", hint: "Digits only with country code, e.g. 919800000000" },
      { key: "email", label: "Email" },
      { key: "city", label: "City" },
      { key: "founder_name", label: "Founder / Principal name" },
      { key: "founder_title", label: "Founder / Principal title" },
      { key: "founder_quote", label: "Signature philosophy quote" },
      { key: "instagram_handle", label: "Instagram handle" },
      { key: "instagram_url", label: "Instagram URL" },
      { key: "facebook_url", label: "Facebook URL" },
      { key: "youtube_url", label: "YouTube URL" },
    ],
  },
  {
    title: "Home page",
    fields: [
      { key: "hero_eyebrow", label: "Hero eyebrow", hint: "Small label above the headline" },
      { key: "hero_title", label: "Hero headline", hint: "Two lines: separate them with a line break. Last word of line 2 renders italic." },
      { key: "hero_subtitle", label: "Hero subtext" },
      { key: "cta_title", label: "Selling band headline" },
      { key: "cta_subtitle", label: "Selling band subtext" },
    ],
  },
  {
    title: "Page intros",
    fields: [
      { key: "about_intro", label: "About page intro", area: true },
      { key: "sell_intro", label: "Sell page intro", area: true },
      { key: "partner_intro", label: "Partner page intro", area: true },
      { key: "journal_intro", label: "Journal intro", area: true },
      { key: "properties_intro", label: "Properties intro", area: true },
      { key: "footer_note", label: "Footer note" },
    ],
  },
  {
    title: "About page stats",
    fields: [
      { key: "about_stat_1_value", label: "Stat 1 value" },
      { key: "about_stat_1_label", label: "Stat 1 label" },
      { key: "about_stat_1_note", label: "Stat 1 note" },
      { key: "about_stat_2_value", label: "Stat 2 value" },
      { key: "about_stat_2_label", label: "Stat 2 label" },
      { key: "about_stat_2_note", label: "Stat 2 note" },
      { key: "about_stat_3_value", label: "Stat 3 value" },
      { key: "about_stat_3_label", label: "Stat 3 label" },
      { key: "about_stat_3_note", label: "Stat 3 note" },
    ],
  },
];

function SettingsManager({ settings }: { settings: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(settings);
  const { notice, flash } = useNotice();
  const [busy, setBusy] = useState(false);
  const dirty = Object.keys(values).some((k) => (values[k] ?? "") !== (settings[k] ?? ""));

  async function onSave() {
    setBusy(true);
    try {
      // only send changed keys; keep the rest untouched
      const changed: Record<string, string> = {};
      for (const k of Object.keys(values)) {
        const next = values[k] ?? "";
        if (next !== (settings[k] ?? "")) changed[k] = next;
      }
      await saveSettings(changed);
      flash();
      // settings state refresh: cheap local update
      Object.assign(settings, changed);
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {SETTING_GROUPS.map((group) => (
        <AdminCard key={group.title} title={group.title}>
          <div className="grid gap-5 md:grid-cols-2">
            {group.fields.map((f) => (
              <div key={f.key} className={f.area ? "md:col-span-2" : ""}>
                <label htmlFor={`set-${f.key}`} className={labelCls}>
                  {f.label}
                </label>
                {f.area ? (
                  <textarea
                    id={`set-${f.key}`}
                    rows={3}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className={`${inputCls} resize-y`}
                  />
                ) : (
                  <input
                    id={`set-${f.key}`}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className={inputCls}
                  />
                )}
                {f.hint ? <p className="mt-1 text-[11px] text-muted-2">{f.hint}</p> : null}
              </div>
            ))}
          </div>
        </AdminCard>
      ))}
      <div className="sticky bottom-6 flex items-center gap-4 rounded-full border border-line bg-white/95 px-6 py-3 shadow-lg backdrop-blur">
        <Btn onClick={onSave} disabled={busy || !dirty}>
          {busy ? "Saving..." : "Save Settings"}
        </Btn>
        <Notice state={notice} />
        <p className="text-xs text-muted-2">Changes go live on the site immediately after saving.</p>
      </div>
    </div>
  );
}
