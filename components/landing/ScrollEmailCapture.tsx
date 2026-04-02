"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "jj_email_capture_last_shown";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Desktop: exit-intent + 70% scroll. Mobile: 70% scroll only (less intrusive).
 * Set NEXT_PUBLIC_EMAIL_CAPTURE=0 to disable.
 */
export function ScrollEmailCapture() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fired = useRef(false);
  const enabled = (process.env.NEXT_PUBLIC_EMAIL_CAPTURE ?? "1") !== "0";

  const tryOpen = useCallback(() => {
    if (!enabled || fired.current || typeof window === "undefined") return;
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (last && Date.now() - Number(last) < COOLDOWN_MS) return;
    } catch {
      /* ignore */
    }
    fired.current = true;
    setOpen(true);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      if (pct >= 70) tryOpen();
    };

    const onExit = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      tryOpen();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const mq = window.matchMedia("(min-width: 768px)");
    if (mq.matches) {
      document.documentElement.addEventListener("mouseleave", onExit);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onExit);
    };
  }, [enabled, tryOpen]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) {
      setError("Enter your email.");
      return;
    }
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? "Something went wrong. Try again or email us.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Try again.");
    }
  };

  if (!enabled || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-capture-title"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] p-6 shadow-2xl">
        <button
          type="button"
          className="float-right rounded-lg px-2 py-1 text-sm text-[var(--color-muted)] hover:bg-white/10"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 id="email-capture-title" className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">
          Free checklist for Oklahoma small businesses
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Enter your email and we’ll send a short website readiness checklist. Unsubscribe anytime—we don’t spam.
        </p>
        {submitted ? (
          <p className="mt-6 text-sm font-medium text-[var(--color-accent)]">Thanks—check your inbox soon.</p>
        ) : (
          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              Email
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-paper px-4 py-3 text-[var(--color-ink)]"
                placeholder="you@business.com"
              />
            </label>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--color-navy)] py-3 text-sm font-semibold text-white hover:bg-[var(--color-navy-deep)]"
            >
              Send the checklist
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
