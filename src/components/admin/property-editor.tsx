"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "../../lib/supabase";
import {
  addImageRow,
  createProperty,
  deleteImageRow,
  deleteProperty,
  parsePriceInput,
  reorderImages,
  slugFromTitle,
  updateProperty,
  uploadPropertyImage,
} from "../../lib/cms";
import type { Property, PropertyImage } from "../../lib/types";

const inputCls =
  "w-full rounded-[var(--radius-input)] border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-semibold text-ink";

/** Create mode: minimal fields, then redirect into the full editor. */
export function PropertyCreator() {
  const supabase = getSupabaseBrowser();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/login" });
    });
  }, [supabase, navigate]);

  async function onCreate(input: PropertyDraft) {
    const created = await draftToProperty(input, null);
    navigate({ to: "/admin/property/$id", params: { id: created.id } });
  }

  return (
    <EditorShell title="New listing" back={{ to: "/admin" }}>
      <PropertyForm initial={null} onSubmit={onCreate} submitLabel="Create & Continue" />
    </EditorShell>
  );
}

/** Edit mode: full property + gallery management. */
export function PropertyEditor({ propertyId }: { propertyId: string }) {
  const supabase = getSupabaseBrowser();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getSession();
      if (!auth.session) {
        navigate({ to: "/login" });
        return;
      }
      const { data: p } = await supabase.from("properties").select("*").eq("id", propertyId).single();
      setProperty(p as Property);
      const { data: imgs } = await supabase
        .from("property_images")
        .select("*")
        .eq("property_id", propertyId)
        .order("sort_order");
      setImages((imgs as PropertyImage[]) ?? []);
    })();
  }, [propertyId, supabase, navigate]);

  const onSave = useCallback(
    async (draft: PropertyDraft) => {
      if (!property) return;
      setBusy(true);
      setError("");
      try {
        const patch = draftToPatch(draft, property);
        const updated = await updateProperty(property.id, patch);
        setProperty(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setBusy(false);
      }
    },
    [property],
  );

  async function onUpload(files: FileList) {
    if (!property) return;
    setBusy(true);
    try {
      const nextOrder = images.length ? Math.max(...images.map((i) => i.sort_order)) + 1 : 0;
      let order = nextOrder;
      const newRows: PropertyImage[] = [];
      for (const file of Array.from(files)) {
        const urls = await uploadPropertyImage(file, property.id);
        const row = await addImageRow({
          property_id: property.id,
          sort_order: order++,
          caption: "",
          alt_text: file.name.replace(/\.[^.]+$/, ""),
          image_url: urls.image_url,
          thumb_url: urls.thumb_url,
        });
        newRows.push(row);
      }
      setImages((rows) => [...rows, ...newRows]);

      // first uploaded image becomes the cover if none exists
      if (!property.main_image && newRows[0]) {
        const updated = await updateProperty(property.id, {
          main_image: newRows[0]!.image_url,
          main_image_thumb: newRows[0]!.thumb_url,
        });
        setProperty(updated);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onMakeCover(img: PropertyImage) {
    if (!property) return;
    const updated = await updateProperty(property.id, {
      main_image: img.image_url,
      main_image_thumb: img.thumb_url,
    });
    setProperty(updated);
  }

  async function onDeleteImage(img: PropertyImage) {
    if (!window.confirm("Remove this photo from the gallery?")) return;
    await deleteImageRow(img.id);
    setImages((rows) => rows.filter((r) => r.id !== img.id));
  }

  async function onMove(img: PropertyImage, dir: -1 | 1) {
    const idx = images.findIndex((r) => r.id === img.id);
    const swapIdx = idx + dir;
    if (idx < 0 || swapIdx < 0 || swapIdx >= images.length) return;
    const next = [...images];
    [next[idx], next[swapIdx]] = [next[swapIdx]!, next[idx]!];
    setImages(next);
    await reorderImages(
      property!.id,
      next.map((r) => r.id),
    );
  }

  async function onDeleteProperty() {
    if (!property || !window.confirm(`Delete "${property.title}" permanently?`)) return;
    await deleteProperty(property.id);
    navigate({ to: "/admin" });
  }

  if (!property) {
    return (
      <EditorShell title="Edit listing" back={{ to: "/admin" }}>
        <p className="text-sm text-muted">Loading…</p>
      </EditorShell>
    );
  }

  return (
    <EditorShell title="Edit listing" back={{ to: "/admin" }} onDelete={onDeleteProperty}>
      <PropertyForm
        initial={property}
        onSubmit={onSave}
        submitLabel="Save Changes"
        busy={busy}
        saved={saved}
        error={error}
      />

      {/* gallery */}
      <section className="mt-10 rounded-[var(--radius-card)] border border-line bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-medium text-ink">Gallery</h2>
          <ImageUploadButton onFiles={onUpload} disabled={busy} />
        </div>

        {images.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No photos yet. Upload the walkthrough shots - the first becomes the cover.
          </p>
        ) : (
          <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img, i) => (
              <li key={img.id} className="group relative overflow-hidden rounded-xl border border-line">
                <img
                  src={img.thumb_url || img.image_url}
                  alt={img.alt_text || "Gallery photo"}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                {property.main_image === img.image_url ? (
                  <span className="absolute left-2 top-2 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold text-paper">
                    Cover
                  </span>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-gradient-to-t from-ink/80 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <IconBtn label="Move left" onClick={() => onMove(img, -1)} disabled={i === 0}>←</IconBtn>
                  <IconBtn label="Make cover" onClick={() => onMakeCover(img)}>★</IconBtn>
                  <IconBtn label="Move right" onClick={() => onMove(img, 1)} disabled={i === images.length - 1}>→</IconBtn>
                  <IconBtn label="Delete photo" onClick={() => onDeleteImage(img)} danger>×</IconBtn>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </EditorShell>
  );
}

/* ---------------------------------------------------------------- */

interface PropertyDraft {
  title: string;
  location: string;
  locality: string;
  bhkType: string;
  propertyType: string;
  priceText: string;
  possession: string;
  furnishing: string;
  area: string;
  bathrooms: string;
  balconies: string;
  floor: string;
  facing: string;
  parking: string;
  amenities: string;
  landmarks: string;
  description: string;
  developer: string;
  instagram: string;
  featured: boolean;
  published: boolean;
}

function draftFrom(p: Property | null): PropertyDraft {
  return {
    title: p?.title ?? "",
    location: p?.location ?? "",
    locality: p?.locality ?? "",
    bhkType: p?.bhk_type ?? "2 BHK",
    propertyType: p?.property_type ?? "Apartment",
    priceText: p?.price_inr ? String(p.price_inr) : (p?.price_display ?? ""),
    possession: p?.possession_status ?? "Available",
    furnishing: p?.furnishing_status ?? "",
    area: p?.area_sqft ? String(p.area_sqft) : "",
    bathrooms: p?.bathrooms != null ? String(p.bathrooms) : "",
    balconies: p?.balconies != null ? String(p.balconies) : "",
    floor: p?.floor ?? "",
    facing: p?.facing ?? "",
    parking: p?.parking ?? "",
    amenities: (p?.amenities ?? []).join(", "),
    landmarks: (p?.landmarks ?? []).join(" | "),
    description: p?.description ?? "",
    developer: p?.developer_name ?? "",
    instagram: p?.instagram_url ?? "",
    featured: p?.is_featured ?? false,
    published: p?.is_published ?? true,
  };
}

function draftToPatch(d: PropertyDraft, _existing: Property | null): Partial<Property> {
  const price_inr = parsePriceInput(d.priceText) ?? (d.priceText.trim() ? null : null);
  return {
    title: d.title.trim(),
    location: d.location.trim(),
    locality: d.locality.trim() || d.location.split(",")[0]!.trim(),
    bhk_type: d.bhkType.trim(),
    property_type: d.propertyType.trim() || "Apartment",
    price_inr,
    price_display: price_inr == null && d.priceText.trim() ? d.priceText.trim() : null,
    possession_status: d.possession.trim() || "Available",
    furnishing_status: d.furnishing.trim(),
    area_sqft: d.area ? Number(d.area) || null : null,
    bathrooms: d.bathrooms ? Number(d.bathrooms) || null : null,
    balconies: d.balconies ? Number(d.balconies) || null : null,
    floor: d.floor.trim() || null,
    facing: d.facing.trim() || null,
    parking: d.parking.trim() || null,
    amenities: d.amenities.split(",").map((s) => s.trim()).filter(Boolean),
    landmarks: d.landmarks.split("|").map((s) => s.trim()).filter(Boolean),
    description: d.description.trim(),
    developer_name: d.developer.trim() || null,
    instagram_url: d.instagram.trim() || null,
    is_featured: d.featured,
    is_published: d.published,
  };
}

async function draftToProperty(d: PropertyDraft, existing: Property | null): Promise<Property> {
  const patch = draftToPatch(d, existing);
  if (existing) return updateProperty(existing.id, patch);
  const base = slugFromTitle(d.title);
  // ensure slug uniqueness
  const supabase = getSupabaseBrowser();
  let slug = base;
  let n = 2;
  for (;;) {
    const { data } = await supabase.from("properties").select("id").eq("slug", slug).maybeSingle();
    if (!data) break;
    slug = `${base}-${n++}`;
  }
  return createProperty({ ...patch, slug } as Omit<Property, "id" | "created_at" | "updated_at">);
}

function PropertyForm({
  initial,
  onSubmit,
  submitLabel,
  busy = false,
  saved = false,
  error = "",
}: {
  initial: Property | null;
  onSubmit: (draft: PropertyDraft) => void | Promise<void>;
  submitLabel: string;
  busy?: boolean;
  saved?: boolean;
  error?: string;
}) {
  const [d, setD] = useState<PropertyDraft>(() => draftFrom(initial));
  const set = (k: keyof PropertyDraft) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setD((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit(d);
      }}
      className="grid gap-5 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <label htmlFor="pf-title" className={labelCls}>Listing title</label>
        <input id="pf-title" required value={d.title} onChange={set("title")} className={inputCls} placeholder="e.g. Ready-to-Move 3 BHK Flat in Lake Town" />
      </div>
      <div>
        <label htmlFor="pf-loc" className={labelCls}>Full location</label>
        <input id="pf-loc" required value={d.location} onChange={set("location")} className={inputCls} placeholder="Lake Town, Kolkata" />
      </div>
      <div>
        <label htmlFor="pf-locality" className={labelCls}>Locality (filter key)</label>
        <input id="pf-locality" required value={d.locality} onChange={set("locality")} className={inputCls} placeholder="Lake Town" />
      </div>
      <div>
        <label htmlFor="pf-bhk" className={labelCls}>Configuration</label>
        <select id="pf-bhk" value={d.bhkType} onChange={set("bhkType")} className={inputCls}>
          {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Commercial Office Space", "Shop", "Land"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pf-type" className={labelCls}>Property type</label>
        <select id="pf-type" value={d.propertyType} onChange={set("propertyType")} className={inputCls}>
          {["Apartment", "Villa", "Builder Floor", "Commercial", "Plot"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pf-price" className={labelCls}>Price (e.g. 1.35 Cr, 68 L, 7200000)</label>
        <input id="pf-price" value={d.priceText} onChange={set("priceText")} className={inputCls} placeholder="68 L" />
      </div>
      <div>
        <label htmlFor="pf-area" className={labelCls}>Area (sq.ft)</label>
        <input id="pf-area" type="number" min={100} value={d.area} onChange={set("area")} className={inputCls} placeholder="980" />
      </div>
      <div>
        <label htmlFor="pf-possession" className={labelCls}>Possession</label>
        <select id="pf-possession" value={d.possession} onChange={set("possession")} className={inputCls}>
          {["Available", "Ready To Move", "Under Construction", "Sold"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pf-furnishing" className={labelCls}>Furnishing</label>
        <select id="pf-furnishing" value={d.furnishing} onChange={set("furnishing")} className={inputCls}>
          {["", "Unfurnished", "Semi-Furnished", "Furnished"].map((o) => (
            <option key={o}>{o || "Not specified"}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pf-baths" className={labelCls}>Bathrooms</label>
        <input id="pf-baths" type="number" min={0} max={20} value={d.bathrooms} onChange={set("bathrooms")} className={inputCls} />
      </div>
      <div>
        <label htmlFor="pf-balc" className={labelCls}>Balconies</label>
        <input id="pf-balc" type="number" min={0} max={20} value={d.balconies} onChange={set("balconies")} className={inputCls} />
      </div>
      <div>
        <label htmlFor="pf-floor" className={labelCls}>Floor</label>
        <input id="pf-floor" value={d.floor} onChange={set("floor")} className={inputCls} placeholder="4th out of G+7" />
      </div>
      <div>
        <label htmlFor="pf-facing" className={labelCls}>Facing</label>
        <input id="pf-facing" value={d.facing} onChange={set("facing")} className={inputCls} placeholder="East" />
      </div>
      <div>
        <label htmlFor="pf-parking" className={labelCls}>Parking</label>
        <input id="pf-parking" value={d.parking} onChange={set("parking")} className={inputCls} placeholder="1 covered" />
      </div>
      <div>
        <label htmlFor="pf-dev" className={labelCls}>Developer / partner</label>
        <input id="pf-dev" value={d.developer} onChange={set("developer")} className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="pf-amen" className={labelCls}>Amenities (comma separated)</label>
        <input id="pf-amen" value={d.amenities} onChange={set("amenities")} className={inputCls} placeholder="Gym, Pool, 24/7 Security" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="pf-land" className={labelCls}>Nearby landmarks (| separated)</label>
        <input id="pf-land" value={d.landmarks} onChange={set("landmarks")} className={inputCls} placeholder="5 mins walk Acropolis Mall | Near Ruby Crossing" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="pf-desc" className={labelCls}>Description</label>
        <textarea id="pf-desc" rows={5} value={d.description} onChange={set("description")} className={`${inputCls} resize-y`} placeholder="Editorial description of the home…" />
      </div>
      <div>
        <label htmlFor="pf-ig" className={labelCls}>Instagram post URL</label>
        <input id="pf-ig" type="url" value={d.instagram} onChange={set("instagram")} className={inputCls} placeholder="https://www.instagram.com/p/..." />
      </div>
      <div className="flex items-end gap-6 pb-1">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={d.featured} onChange={(e) => setD((p) => ({ ...p, featured: e.target.checked }))} className="h-4 w-4 accent-[#a9862f]" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={d.published} onChange={(e) => setD((p) => ({ ...p, published: e.target.checked }))} className="h-4 w-4 accent-[#a9862f]" />
          Published
        </label>
      </div>

      {error ? <p role="alert" className="sm:col-span-2 text-xs text-danger">{error}</p> : null}

      <div className="flex items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-paper transition-opacity disabled:opacity-60"
        >
          {busy ? "Saving…" : submitLabel}
        </button>
        {saved ? <span className="text-xs font-semibold text-verdigris">Saved ✓</span> : null}
      </div>
    </form>
  );
}

function ImageUploadButton({ onFiles, disabled }: { onFiles: (files: FileList) => void; disabled?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => ref.current?.click()}
        className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-opacity disabled:opacity-60"
      >
        Upload Photos
      </button>
    </>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded-full bg-paper/90 text-xs ${
        danger ? "text-danger" : "text-ink"
      } transition-colors hover:bg-paper disabled:opacity-30`}
    >
      {children}
    </button>
  );
}

function EditorShell({
  title,
  back,
  onDelete,
  children,
}: {
  title: string;
  back: { to: string };
  onDelete?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="shell-wide flex h-16 items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to={back.to} className="text-sm text-muted hover:text-ink">← Back</Link>
            <h1 className="font-display text-xl font-medium text-ink">{title}</h1>
          </div>
          {onDelete ? (
            <button type="button" onClick={onDelete} className="text-[13px] text-danger/80 hover:text-danger">
              Delete listing
            </button>
          ) : null}
        </div>
      </header>
      <main className="shell-wide max-w-4xl py-10">
        <div className="rounded-[var(--radius-card)] border border-line bg-paper-2/40 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
