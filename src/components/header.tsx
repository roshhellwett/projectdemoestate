"use client";

import { Link, useMatchRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./brand";
import { NAV_LINKS, SITE } from "../lib/site";

/**
 * Site header: fixed top, translucent paper over blur once scrolled.
 * Scroll detection uses an IntersectionObserver on a top sentinel -
 * no scroll listeners, no per-frame work.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const matchRoute = useMatchRoute();

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
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between">
          <Link to="/" aria-label="SS Property home" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = !!matchRoute({ to: link.to, fuzzy: true });
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[13px] font-medium tracking-wide transition-colors hover:text-ink ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book a Visit
            </a>
          </nav>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-ink transition-all ${open ? "top-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-4 bg-ink transition-all ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-4 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 z-30 bg-paper transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8 pt-16">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 font-display text-3xl text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper"
          >
            Book a Visit
          </a>
        </div>
      </div>
    </>
  );
}
