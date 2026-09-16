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
    document.body.dataset.mobileNavOpen = open ? "true" : "false";
    return () => {
      document.body.style.overflow = "";
      document.body.dataset.mobileNavOpen = "false";
    };
  }, [open]);

  return (
    <>
      {/* sentinel: when it leaves the viewport, the header gains its surface */}
      <div ref={sentinelRef} className="absolute left-0 top-0 h-px w-full" aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-line bg-paper/95 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(18,16,14,0.08)]"
            : "border-b border-line/40 bg-paper/75 backdrop-blur-md"
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-12 flex h-20 items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link to="/" aria-label="SS Property home" onClick={() => setOpen(false)} className="flex items-center shrink-0">
            <LogoImage className="h-9 md:h-10 transition-transform hover:scale-[1.02]" />
          </Link>

          {/* Desktop Nav Links: visible from lg (1024px) upwards */}
          <nav className="hidden items-center gap-3.5 xl:gap-6 2xl:gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = !!matchRoute({ to: link.to, fuzzy: true });
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-1 text-[13px] xl:text-sm font-semibold tracking-wide transition-colors hover:text-ink whitespace-nowrap ${
                    active ? "text-ink" : "text-muted hover:text-ink"
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

          {/* Desktop Right Actions: visible from lg (1024px) upwards */}
          <div className="hidden items-center gap-2.5 sm:gap-3 lg:flex shrink-0">
            {/* Spotlight Search Button */}
            <button
              type="button"
              onClick={() => setSpotlightOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1.5 text-xs text-muted transition-colors hover:border-brass hover:text-ink hover:bg-white shadow-xs"
              title="Spotlight Search (Ctrl + K)"
            >
              <MagnifyingGlass size={15} className="text-brass shrink-0" />
              <span className="hidden xl:inline font-medium">Quick Search</span>
              <kbd className="hidden 2xl:inline-flex items-center rounded border border-line/80 bg-white px-1.5 py-0.5 text-[10px] font-mono text-muted">
                ⌘K
              </kbd>
            </button>

            {/* Compare Link */}
            <Link
              to="/compare"
              aria-label="Compare selected residences"
              className="relative flex items-center gap-1.5 rounded-full border border-line bg-paper/80 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brass hover:bg-white shadow-xs"
              title="Compare Residences"
            >
              <Scales
                size={16}
                weight={compareCount > 0 ? "fill" : "regular"}
                className={compareCount > 0 ? "text-brass shrink-0" : "text-muted shrink-0"}
              />
              <span className="hidden 2xl:inline">Compare</span>
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
              className="relative flex items-center gap-1.5 rounded-full border border-line bg-paper/80 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brass hover:bg-white shadow-xs"
              title="Saved Properties"
            >
              <Heart
                size={16}
                weight={favoritesCount > 0 ? "fill" : "regular"}
                className={favoritesCount > 0 ? "text-danger shrink-0" : "text-muted shrink-0"}
              />
              <span className="hidden 2xl:inline">Saved</span>
              {favoritesCount > 0 ? (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1.5 text-[10px] font-bold text-paper">
                  {favoritesCount}
                </span>
              ) : null}
            </Link>

            {/* Direct Phone Link */}
            <a
              href={SITE.phoneHref}
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors whitespace-nowrap pl-1"
            >
              <Phone size={14} className="text-brass shrink-0" />
              <span className="whitespace-nowrap">{SITE.phone}</span>
            </a>

            {/* WhatsApp / Book a Visit Button */}
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 sm:px-5 sm:py-2.5 text-xs md:text-[13px] font-semibold text-paper shadow-sm transition-all duration-300 hover:bg-ink-2 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 whitespace-nowrap shrink-0 ml-1"
            >
              <WhatsappLogo size={16} weight="fill" className="text-brass-2 shrink-0" />
              <span>Book a Visit</span>
            </a>
          </div>

          {/* Mobile / Tablet Menu & Quick Actions Toggle (< 1024px) */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden">
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
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-paper transition-colors hover:border-brass"
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

      {/* Mobile full-screen navigation drawer: visible < 1024px (lg:hidden) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-paper transition-all duration-300 ease-out lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        style={{ top: "5rem" }}
      >
        <div className="w-full h-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain px-6 py-6 pb-28 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <p className="eyebrow px-2 mb-1">Navigation & Services</p>
            {NAV_LINKS.map((link) => {
              const active = !!matchRoute({ to: link.to, fuzzy: true });
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                    active
                      ? "bg-paper-2 font-semibold text-ink border border-brass/40"
                      : "text-muted hover:text-ink hover:bg-paper-2"
                  }`}
                >
                  <span className="font-display text-2xl font-medium">{link.label}</span>
                  {link.to === "/compare" && compareCount > 0 ? (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1.5 text-[11px] font-bold text-ink">
                      {compareCount}
                    </span>
                  ) : active ? (
                    <span className="h-2 w-2 rounded-full bg-brass" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-line mt-6">
            <p className="eyebrow">Connect With SS Property</p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-verdigris py-3.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-[0.98]"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>WhatsApp an Advisor</span>
            </a>
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 rounded-xl border border-line bg-paper-2 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brass"
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
