import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { PropertyCard } from "../components/property-card";
import { EnquiryForm } from "../components/enquiry-form";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getImagesForProperty, getPropertyBySlug, getSimilarProperties } from "../lib/queries";
import { formatArea, formatPrice } from "../lib/format";

export const Route = createFileRoute("/property/$slug")({
  loader: async ({ params }) => {
    const supabase = getSupabaseForRoute();
    const property = await getPropertyBySlug(supabase, params.slug);
    if (!property) throw notFound();
    const [images, similar] = await Promise.all([
      getImagesForProperty(supabase, property.id),
      getSimilarProperties(supabase, property, 3),
    ]);
    return { property, images, similar };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    return {
      
      meta: p
        ? [
            {
              name: "description",
              content: `${p.bhk_type} in ${p.location}. ${formatPrice(p.price_inr, p.price_display)}. Verified by SS Property Kolkata.`,
            },
            { property: "og:title", content: `${p.title} · SS Property` },
            { property: "og:image", content: p.main_image },
          ]
        : [],
    };
  },
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { property, images, similar } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  const gallery = [property.main_image, ...images.map((i) => i.image_url)].filter(Boolean);

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="pt-16">
        {/* breadcrumb */}
        <nav className="shell pt-6 text-xs text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/properties" className="hover:text-ink">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{property.locality}</span>
        </nav>

        {/* title block */}
        <section className="shell pt-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
                {property.title}
              </h1>
              <p className="mt-2 text-sm text-muted">{property.location}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-semibold text-ink">
                {formatPrice(property.price_inr, property.price_display)}
              </p>
              {property.possession_status ? (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-verdigris">
                  {property.possession_status}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* gallery */}
        <Gallery images={gallery} title={property.title} />

        {/* body grid */}
        <section className="shell-wide grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink">About this home</h2>
            <p className="mt-4 max-w-[65ch] whitespace-pre-line text-[15px] leading-relaxed text-muted">
              {property.description}
            </p>

            {/* spec grid */}
            <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-ink">
              Specifications
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
              <Spec label="Configuration" value={property.bhk_type} />
              <Spec label="Area" value={formatArea(property.area_sqft)} />
              <Spec label="Bathrooms" value={property.bathrooms ? String(property.bathrooms) : "—"} />
              <Spec label="Balconies" value={property.balconies ? String(property.balconies) : "—"} />
              <Spec label="Floor" value={property.floor || "—"} />
              <Spec label="Facing" value={property.facing || "—"} />
              <Spec label="Furnishing" value={property.furnishing_status || "—"} />
              <Spec label="Parking" value={property.parking || "—"} />
              <Spec label="Possession" value={property.possession_status} />
            </dl>

            {property.amenities.length > 0 ? (
              <>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-ink">
                  Amenities
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border border-line bg-paper-2 px-4 py-1.5 text-[13px] text-ink"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {property.landmarks.length > 0 ? (
              <>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-ink">
                  Nearby
                </h2>
                <ul className="mt-5 space-y-2 text-[15px] text-muted">
                  {property.landmarks.map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                      {l}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {property.instagram_url ? (
              <a
                href={property.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brass hover:text-ink"
              >
                View the walkthrough on Instagram →
              </a>
            ) : null}
          </div>

          {/* sticky enquiry card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm property={property} />
          </aside>
        </section>

        {/* similar */}
        {similar.length > 0 ? (
          <section className="border-t border-line bg-paper-2/60 py-14">
            <div className="shell-wide">
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                Similar in {property.locality}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">{label}</dt>
      <dd className="mt-1.5 text-[15px] font-medium text-ink">{value}</dd>
    </div>
  );
}

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const hero = images[0];

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i == null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i == null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <section className="shell-wide mt-8">
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        {hero ? (
          <button
            type="button"
            onClick={() => setLightbox(0)}
            className="group relative overflow-hidden rounded-[var(--radius-img)]"
            aria-label="Open gallery"
          >
            <img
              src={hero}
              alt={title}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ) : null}
        <div className="grid grid-cols-4 gap-3 lg:grid-cols-2">
          {images.slice(1, 5).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox(i + 1)}
              className="group relative overflow-hidden rounded-[var(--radius-img)]"
              aria-label={`Photo ${i + 2} of ${images.length}`}
            >
              <img
                src={src}
                alt={`${title} photo ${i + 2}`}
                width={400}
                height={300}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              {i === 3 && images.length > 5 ? (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-sm font-semibold text-paper">
                  +{images.length - 5} more
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {lightbox != null && images[lightbox] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={images[lightbox]}
            alt={`${title} photo ${lightbox + 1}`}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-6 top-6 text-2xl text-paper/80 hover:text-paper"
            aria-label="Close gallery"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-paper/60">
            {lightbox + 1} / {images.length} · use arrow keys
          </div>
        </div>
      ) : null}
    </section>
  );
}
