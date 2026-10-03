"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { getSupabaseBrowser } from "../lib/supabase";
import { LogoImage } from "./brand";
import { LockKey, EnvelopeSimple, ShieldCheck, ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react";

/** CMS login. Supabase email + password; the session lives in localStorage. */
export function LoginForm() {
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-4 sm:px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center flex flex-col items-center">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <LogoImage className="h-11 sm:h-12" />
          </Link>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brass/30 bg-brass-ghost px-3.5 py-1 text-xs font-semibold text-brass-dark">
            <ShieldCheck size={14} weight="fill" className="text-verdigris" />
            <span>Kolkata Advisory Desk</span>
          </div>
        </div>

        <div className="rounded-3xl border border-brass/40 bg-white p-7 sm:p-9 shadow-xl shadow-brass/5">
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
            Admin Management Console
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-muted">
            Sign in to manage verified listings, lead enquiries, reels, and website settings.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold text-ink">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@apexliving-demo.com"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 pl-10 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:ring-1 focus:ring-brass/30 focus:outline-none min-h-[46px]"
                />
                <EnvelopeSimple size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-pass" className="block text-xs font-semibold text-ink">
                  Security Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="login-pass"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 pl-10 pr-10 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:ring-1 focus:ring-brass/30 focus:outline-none min-h-[46px]"
                />
                <LockKey size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error ? (
              <div role="alert" className="rounded-xl border border-danger/30 bg-danger/10 p-3 text-xs text-danger flex items-center gap-2">
                <span>✕</span>
                <span>{error}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-xs font-bold uppercase tracking-wider text-paper shadow-md transition-all hover:bg-ink-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              <span>{busy ? "Authenticating..." : "Sign in to Dashboard"}</span>
              <ArrowRight size={14} weight="bold" />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-muted hover:text-brass transition-colors inline-flex items-center gap-1"
          >
            <span>← Back to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
