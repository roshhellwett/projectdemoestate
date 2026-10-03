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
  UserCheck,
} from "@phosphor-icons/react";

interface FounderSectionProps {
  compact?: boolean;
  className?: string;
  name?: string;
  title?: string;
  quote?: string;
  phone?: string;
  instagram?: string;
  whatsapp?: string;
  photoUrl?: string;
}

/**
 * "Built Around Trust" Leadership & Founder Spotlight Section
 * Showcases the agency's principal advisor, leadership vision, signature quote,
 * and verified luxury credentials.
 *
 * Fully modular and demo-ready: easily rebrands with any client's name,
 * portrait, and contact channels.
 */
export function FounderSection({
  compact = false,
  className = "",
  name,
  title,
  quote,
  phone,
  instagram,
  whatsapp,
  photoUrl,
}: FounderSectionProps) {
  const leaderName = name ?? SITE.founderName;
  const leaderTitle = title ?? SITE.founderTitle;
  const leaderQuote = quote ?? SITE.founderQuote;

  const directPhone = phone ?? SITE.phone;
  const directPhoneHref = `tel:${directPhone.replace(/[^\d+]/g, "")}`;
  const directIg = instagram ?? SITE.instagram;
  const directWa =
    whatsapp ??
    `${SITE.whatsapp}?text=${encodeURIComponent(
      `Hello ${leaderName}, I visited the ${SITE.name} website and would like to consult on buying/selling a property in Kolkata.`
    )}`;

  return (
    <section
      aria-label="Leadership & Advisory"
      className={`relative overflow-hidden ${className}`}
    >
      <div className="shell-wide">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-center">
          {/* =================================================================
              1. LEFT COLUMN: LEADERSHIP EDITORIAL CARD / PORTRAIT
             ================================================================= */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Ambient Luxury Halo */}
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brass/25 via-paper-2 to-verdigris/20 blur-xl opacity-80 -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Photo / Executive Card Container */}
              <div className="group relative overflow-hidden rounded-3xl border-2 border-brass/50 bg-ink shadow-[0_24px_50px_-16px_rgba(18,16,14,0.28)] shadow-brass/20 ring-1 ring-brass/30 transition-all duration-500 hover:border-brass">
                <div className="aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden relative bg-ink">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={`${leaderName} - ${leaderTitle}`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    /* Default High-End Architectural Executive Presentation */
                    <div className="relative h-full w-full bg-gradient-to-b from-ink-2 via-ink to-[#0a0908] flex flex-col justify-between p-6 sm:p-8">
                      {/* Architectural Background Texture */}
                      <img
                        src="/images/properties/office.jpg"
                        alt="Executive Advisory Suite"
                        className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity filter contrast-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />

                      {/* Top Geometric Crest */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brass/20 border border-brass/40 backdrop-blur-md text-brass">
                          <UserCheck size={24} weight="duotone" />
                        </div>
                        <span className="rounded-full border border-brass/35 bg-ink/75 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-paper/90">
                          Verified Advisory
                        </span>
                      </div>

                      {/* Center Monogram Emblem */}
                      <div className="relative z-10 my-auto text-center py-6">
                        <div className="mx-auto flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl border-2 border-brass/50 bg-ink-2/90 shadow-2xl shadow-brass/20 ring-2 ring-brass/20 backdrop-blur-xl group-hover:border-brass transition-all duration-500">
                          <span className="font-display text-3xl sm:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-paper via-brass-2 to-brass">
                            {leaderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Micro Banner */}
                      <div className="relative z-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-2.5 text-center mb-24">
                        <p className="text-[11px] text-paper/70 font-medium">
                          ✨ Demo Showcase · Ready to personalize with your agency founder's portrait & bio
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtle gradient scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent pointer-events-none" />

                {/* Top Founder Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-ink/85 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-paper shadow-md">
                    <Sparkle size={13} weight="fill" className="text-brass-2" />
                    <span>Principal Partner</span>
                  </span>
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-paper z-10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-paper drop-shadow-sm">
                      {leaderName}
                    </h3>
                    <span
                      title="Verified Identity"
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-brass text-ink font-bold text-[10px]"
                    >
                      ✓
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-brass-2 mt-0.5">
                    {leaderTitle}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3 text-[11px] text-paper/75">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} weight="fill" className="text-verdigris" />
                      {SITE.name} Advisory
                    </span>
                    <span className="font-mono">{SITE.city}</span>
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
              {/* Gold Accent Bar */}
              <div className="h-1 w-12 rounded-full bg-brass mb-4" />

              <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass-ghost px-3 py-0.5 text-xs font-semibold text-brass-dark">
                <span>The Vision Behind Our Advisory</span>
              </div>

              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.15]">
                Built Around Trust.
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted">
              Founded on the principle of uncompromised transparency, <strong>{SITE.name}</strong> transcends the traditional real estate brokerage model. We are a premier real estate advisory, digital media platform, and consultative team dedicated to transforming how homebuyers, investors, and families discover and acquire verified properties.
            </p>

            {/* Signature Brand Quote Box */}
            <div className="relative rounded-2xl border-l-4 border-l-brass border border-brass/40 bg-paper-2/95 p-5 sm:p-6 shadow-sm ring-1 ring-brass/15">
              <p className="font-display text-xl sm:text-2xl font-bold italic tracking-tight text-ink">
                “{leaderQuote}”
              </p>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-brass-dark uppercase tracking-wider">
                - Crafting legacy residences with uncompromising integrity.
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted">
              We combine cutting-edge architectural cinematography, profound local micro-market valuation data, and white-glove advisory to guide you toward the right acquisition. Every listing is walked through on-site, every legal title is vetted, and every client receives undivided personal counsel.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <VideoCamera size={16} weight="duotone" className="text-brass" />
                  <span>Real Video Walkthroughs</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Every home filmed on-site. No manipulated renders or misleading photography.
                </p>
              </div>

              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <ShieldCheck size={16} weight="duotone" className="text-verdigris" />
                  <span>100% Legal Due Diligence</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  RERA verification, title search, and sanction plan checks before onboarding.
                </p>
              </div>

              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <Handshake size={16} weight="duotone" className="text-brass" />
                  <span>Founder-Led Advisory</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Direct personal access without high-pressure sales brokers or spam calls.
                </p>
              </div>

              <div className="rounded-xl border border-brass/35 bg-white p-4 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <CheckCircle size={16} weight="duotone" className="text-verdigris" />
                  <span>Micro-Market Intelligence</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Deep ground-level insights across prime residential enclaves and commercial corridors.
                </p>
              </div>
            </div>

            {/* Founder Direct Connect Actions */}
            <div className="pt-4 border-t border-line/70 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={directWa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-full bg-verdigris px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-verdigris/90 hover:shadow-lg active:scale-95 cursor-pointer text-center"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>Consult on WhatsApp</span>
                </a>

                {!compact ? (
                  <Link
                    to="/properties"
                    className="inline-flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-xs sm:text-sm font-semibold text-paper hover:bg-ink-2 shadow-sm transition-all cursor-pointer text-center"
                  >
                    <span>Explore Properties</span>
                    <ArrowRight size={15} />
                  </Link>
                ) : null}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={directPhoneHref}
                  className="inline-flex flex-1 min-h-[44px] items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-ink hover:border-brass hover:bg-paper-2 transition-colors cursor-pointer text-center"
                >
                  <PhoneCall size={16} weight="fill" className="text-brass" />
                  <span>Call {directPhone.startsWith("+") ? directPhone : `+${directPhone.trim()}`}</span>
                </a>

                <a
                  href={directIg}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 min-h-[44px] items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-ink hover:border-brass hover:bg-paper-2 transition-colors cursor-pointer text-center"
                >
                  <InstagramLogo size={16} weight="fill" className="text-pink-600" />
                  <span>Watch Tours on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
