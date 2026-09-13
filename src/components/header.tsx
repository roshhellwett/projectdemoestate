"use client";

import { Link, useMatchRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LogoImage } from "./brand";
import { NAV_LINKS, SITE } from "../lib/site";
import { useFavorites } from "../lib/favorites";
import { useCompare } from "../lib/compare";
import { Heart, Phone, WhatsappLogo, Scales, MagnifyingGlass } from "@phosphor-icons/react";
import { SpotlightSearch } from "./spotlight-search";

/**
 * Site header: fixed top, translucent paper over blur once scrolled.
 * Shows Favorites count, Compare count, Hotline, and luxury navigation.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const matchRoute = useMatchRoute();
  const { count: favoritesCount } = useFavorites();
  const { count: compareCount } = useCompare();

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      (entries) => setScrolled(!entries[0]?.isIntersecting),
      { rootMargin: "-24px 0px 0px 0px" },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* sentinel: when it leaves the viewport, the header gains its surface */}
      <div ref={sentinelRef} className="absolute left-0 top-0 h-px w-full" aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-line bg-paper/90 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(18,16,14,0.08)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-18 items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" aria-label="SS Property home" onClick={() => setOpen(false)} className="flex items-center">
            <LogoImage className="h-8 md:h-10 transition-transform hover:scale-[1.02]" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = !!matchRoute({ to: link.to, fuzzy: true });
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative text-[13px] font-semibold tracking-wide transition-colors hover:text-ink ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brass" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Spotlight Search, Favorites, Compare, Hotline, Book a Visit CTA */}
          <div className="hidden items-center gap-3.5 md:flex">
            {/* Spotlight Search Button */}
            <button
              type="button"
              onClick={() => setSpotlightOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-brass hover:text-ink hover:bg-paper-2"
              title="Spotlight Search (Ctrl + K)"
            >
              <MagnifyingGlass size={15} className="text-brass" />
              <span className="hidden xl:inline">Quick Search</span>
              <kbd className="hidden xl:inline-flex items-center rounded border border-line/80 bg-white px-1 text-[10px] font-mono text-muted">
                ⌘K
              </kbd>
            </button>

            {/* Compare Link */}
            <Link
              to="/compare"
              aria-label="Compare selected residences"
              className="relative flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brass hover:bg-paper-2"
              title="Compare Residences"
            >
              <Scales
                size={16}
                weight={compareCount > 0 ? "fill" : "regular"}
                className={compareCount > 0 ? "text-brass" : "text-muted"}
              />
              <span className="hidden xl:inline">Compare</span>
              {compareCount > 0 ? (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brass text-[10px] font-bold text-ink">
                  {compareCount}
                </span>
              ) : null}
            </Link>

            {/* Saved Shortlist Link */}
            <Link
              to="/properties"
              search={{ locality: "All", bhk: "" }}
              aria-label="View saved favorite properties"
              className="relative flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brass hover:bg-paper-2"
              title="Saved Properties"
            >
              <Heart
                size={16}
                weight={favoritesCount > 0 ? "fill" : "regular"}
                className={favoritesCount > 0 ? "text-danger" : "text-muted"}
              />
              <span className="hidden xl:inline">Saved</span>
              {favoritesCount > 0 ? (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-paper">
                  {favoritesCount}
                </span>
              ) : null}
            </Link>

            {/* Direct Phone Link */}
            <a
              href={SITE.phoneHref}
              className="hidden 2xl:flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
            >
              <Phone size={14} className="text-brass" />
              <span>{SITE.phone}</span>
            </a>

            {/* WhatsApp / Book a Visit Button */}
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-all duration-300 hover:bg-ink-2 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              <WhatsappLogo size={16} weight="fill" className="text-brass-2" />
              <span>Book a Visit</span>
            </a>
          </div>

          {/* Mobile Menu & Quick Actions Toggle */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              type="button"
              onClick={() => setSpotlightOpen(true)}
              aria-label="Search properties"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink hover:border-brass"
            >
              <MagnifyingGlass size={17} />
            </button>

            <Link
              to="/compare"
              aria-label="Compare selected residences"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line"
            >
              <Scales
                size={17}
                weight={compareCount > 0 ? "fill" : "regular"}
                className={compareCount > 0 ? "text-brass" : "text-muted"}
              />
              {compareCount > 0 ? (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[9px] font-bold text-ink">
                  {compareCount}
                </span>
              ) : null}
            </Link>

            <Link
              to="/properties"
              search={{ locality: "All", bhk: "" }}
              aria-label="View saved favorite properties"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line"
            >
              <Heart
                size={17}
                weight={favoritesCount > 0 ? "fill" : "regular"}
                className={favoritesCount > 0 ? "text-danger" : "text-muted"}
              />
              {favoritesCount > 0 ? (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-bold text-paper">
                  {favoritesCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-paper"
            >
              <span
                className={`h-0.5 w-5 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-ink transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-30 bg-paper transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "4.5rem" }}
      >
        <div className="shell flex h-full flex-col justify-between py-8">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-medium text-ink transition-colors hover:text-brass"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-line">
            <p className="eyebrow">Connect With SS Property</p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-verdigris py-3 text-sm font-semibold text-white shadow-sm"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>WhatsApp an Advisor</span>
            </a>
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 rounded-xl border border-line bg-paper-2 py-3 text-sm font-semibold text-ink"
            >
              <Phone size={18} className="text-brass" />
              <span>Call: {SITE.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Global Spotlight Search Modal */}
      <SpotlightSearch isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
    </>
  );
}
