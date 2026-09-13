"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "../lib/supabase";
import { LogoImage } from "./brand";

/** CMS login. Supabase email + password; the session lives in localStorage. */
export function LoginForm() {
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex min-h-dvh items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <LogoImage className="h-12" />
        </div>
        <form onSubmit={onSubmit} className="rounded-[var(--radius-card)] border border-line bg-white p-8">
          <h1 className="font-display text-xl font-medium text-ink">Admin sign in</h1>
          <p className="mt-1 text-xs text-muted">Manage listings, enquiries and content.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold text-ink">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="login-pass" className="mb-1.5 block text-xs font-semibold text-ink">
                Password
              </label>
              <input
                id="login-pass"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
          </div>

          {error ? (
            <p role="alert" className="mt-4 text-xs text-danger">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper transition-opacity disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
