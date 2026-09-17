import { Link } from "@tanstack/react-router";
import { SITE } from "../lib/site";
import {
  WhatsappLogo,
  PhoneCall,
  InstagramLogo,
  ShieldCheck,
  VideoCamera,
  CheckCircle,
  Handshake,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";

interface FounderSectionProps {
  compact?: boolean;
  className?: string;
  phone?: string;
  instagram?: string;
  whatsapp?: string;
}

/**
 * "Built Around Trust" Founder Spotlight Section
 * Showcases Ujjawal Sharma, founder vision, signature quote, and luxury credentials.
 */
export function FounderSection({
  compact = false,
  className = "",
  phone,
  instagram,
  whatsapp,
}: FounderSectionProps) {
  const directPhone = phone ?? SITE.phone;
  const directPhoneHref = `tel:${directPhone.replace(/[^\d+]/g, "")}`;
  const directIg = instagram ?? SITE.instagram;
  const directWa =
    whatsapp ??
    `${SITE.whatsapp}?text=${encodeURIComponent(
      "Hello Ujjawal, I visited SS Property website and would like to consult on buying/selling a property in Kolkata."
    )}`;

  return (
    <section
      aria-label="About the Founder"
      className={`relative overflow-hidden ${className}`}
    >
      <div className="shell-wide">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-center">
          {/* =================================================================
              1. LEFT COLUMN: FOUNDER EDITORIAL PORTRAIT
             ================================================================= */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background ambient luxury aura */}
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brass/20 via-paper-2 to-verdigris/15 blur-xl opacity-80 -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Photo Card Container */}
              <div className="group relative overflow-hidden rounded-3xl border-2 border-brass/50 bg-paper-2 shadow-[0_24px_50px_-16px_rgba(18,16,14,0.22)] shadow-brass/15 ring-1 ring-brass/25 transition-all duration-500 hover:border-brass">
                <div className="aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-ink">
                  <img
                    src="/owner.avif"
                    alt="Ujjawal Sharma - Founder of SS Property Kolkata"
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to /images/owner.avif if root path fails
                      const target = e.currentTarget;
                      if (!target.src.includes("/images/owner.avif")) {
                        target.src = "/images/owner.avif";
                      }
                    }}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Subtle gradient scrim at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />

                {/* Top Founder Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-ink/85 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-paper shadow-md">
                    <Sparkle size={13} weight="fill" className="text-brass-2" />
                    <span>Founder & Creator</span>
                  </span>
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-paper z-10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-paper drop-shadow-sm">
                      Ujjawal Sharma
                    </h3>
                    <span
                      title="Verified Identity"
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-brass text-ink font-bold text-[10px]"
                    >
                      ✓
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-brass-2 mt-0.5">
                    Real Estate Content Creator & Entrepreneur
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3 text-[11px] text-paper/75">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} weight="fill" className="text-verdigris" />
                      SS Property Kolkata
                    </span>
                    <span className="font-mono">Kolkata, India</span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Trust Pill on Mobile/Desktop */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 z-20 hidden sm:flex items-center gap-2 rounded-2xl border-2 border-brass/50 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-lg shadow-brass/10 ring-1 ring-brass/20">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                  <CheckCircle size={18} weight="fill" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-ink">100% In-Person</p>
                  <p className="text-[10px] text-muted">Walked Through & Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              2. RIGHT COLUMN: STORY, SIGNATURE QUOTE & PILLARS
             ================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Gold Accent Bar (from original site design) */}
              <div className="h-1 w-12 rounded-full bg-brass mb-4" />

              <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass-ghost px-3 py-0.5 text-xs font-semibold text-brass-dark">
                <span>The Vision Behind SS Property</span>
              </div>

              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.15]">
                Built Around Trust.
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted">
              Founded by <strong>Ujjawal Sharma</strong>, SS Property transcends the traditional real estate brokerage model. We are a Kolkata-based real estate advisory, digital media platform, and entrepreneurial team dedicated to transforming how homebuyers, investors, and families discover and connect with verified properties.
            </p>

            {/* Signature Brand Quote Box (Iconic from ssproperty.in) */}
            <div className="relative rounded-2xl border-l-4 border-l-brass border border-brass/40 bg-paper-2/95 p-5 sm:p-6 shadow-sm ring-1 ring-brass/15">
              <p className="font-display text-xl sm:text-2xl font-bold italic tracking-tight text-ink">
                “Apka Sapna, Humara Apna!”
              </p>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-brass-dark uppercase tracking-wider">
                — Your dream is our own.
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted">
              We combine cutting-edge digital storytelling, profound local micro-market expertise, and unwavering personal assistance to guide you toward the right property. With verified listings, immersive real property video tours, and dedicated support, we are actively redefining the real estate narrative across Kolkata.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <VideoCamera size={16} weight="duotone" className="text-brass" />
                  <span>Real Video Walkthroughs</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Every home filmed on-site. No manipulated renders or fake photos.
                </p>
              </div>

              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <ShieldCheck size={16} weight="duotone" className="text-verdigris" />
                  <span>100% Legal Due Diligence</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  RERA approval, title search, and sanction plan checks before listing.
                </p>
              </div>

              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <Handshake size={16} weight="duotone" className="text-brass" />
                  <span>Founder-Led Advisory</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Direct personal access without high-pressure sales brokers.
                </p>
              </div>

              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <CheckCircle size={16} weight="duotone" className="text-verdigris" />
                  <span>Kolkata Micro-Market Intel</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Deep ground-level insights in Lake Town, Newtown, Kasba, and Rajarhat.
                </p>
              </div>
            </div>

            {/* Founder Direct Connect Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-line/70">
              <a
                href={directWa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-verdigris px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-verdigris/90 hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>Chat with Ujjawal on WhatsApp</span>
              </a>

              <a
                href={directPhoneHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-ink hover:border-brass hover:bg-paper-2 transition-colors cursor-pointer"
              >
                <PhoneCall size={17} weight="fill" className="text-brass" />
                <span>Call {directPhone}</span>
              </a>

              <a
                href={directIg}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-ink hover:border-brass hover:bg-paper-2 transition-colors cursor-pointer"
              >
                <InstagramLogo size={17} weight="fill" className="text-pink-600" />
                <span>Watch Tours on Instagram</span>
              </a>

              {!compact ? (
                <Link
                  to="/properties"
                  className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full bg-ink px-6 py-3 text-xs sm:text-sm font-semibold text-paper hover:bg-ink-2 transition-all cursor-pointer"
                >
                  <span>Explore Properties</span>
                  <ArrowRight size={14} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
