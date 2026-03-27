"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { focusOptions, type FocusOptionId } from "@/lib/product-focus-options";

const defaultFocus: FocusOptionId = "website";

export function ProductInquiryForm() {
  const [focus, setFocus] = useState<FocusOptionId>(defaultFocus);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [goals, setGoals] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selected = focusOptions.find((o) => o.id === focus) ?? focusOptions[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          businessName: businessName.trim(),
          focus: `${selected.title} (${selected.id})`,
          goals: goals.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 503 && data?.code === "NOT_CONFIGURED") {
        setStatus("error");
        setErrorMessage(
          "This form isn’t connected to email yet. Use “Book a call” or email us directly—or ask your developer to add WEB3FORMS_ACCESS_KEY.",
        );
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setBusinessName("");
      setGoals("");
      setFocus(defaultFocus);
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          What should we focus on?
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-1">
          {focusOptions.map((opt) => (
            <label
              key={opt.id}
              className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 transition ${
                focus === opt.id
                  ? "border-[var(--color-accent)] bg-white shadow-sm ring-1 ring-[var(--color-accent)]/20"
                  : "border-[var(--color-border)] bg-white/60 active:bg-white hover:border-[var(--color-navy)]/20"
              }`}
            >
              <input
                type="radio"
                name="focus"
                checked={focus === opt.id}
                onChange={() => setFocus(opt.id)}
                className="mt-0 h-4 w-4 shrink-0"
              />
              <span>
                <span className="font-medium text-[var(--color-ink)]">{opt.shortLabel}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <AnimatePresence mode="wait">
        <motion.div
          key={focus}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-[var(--color-border)]/80 bg-[var(--color-surface-alt)]/80 p-4 text-sm leading-relaxed text-[var(--color-muted)]"
        >
          <p className="font-medium text-[var(--color-ink)]">{selected.title}</p>
          <p className="mt-2">{selected.description}</p>
          <p className="mt-3 border-t border-[var(--color-border)]/60 pt-3 text-[var(--color-ink)]/90">
            <span className="font-semibold text-[var(--color-navy)]">How it helps: </span>
            {selected.helpsWith}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Your name *</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
            autoComplete="name"
            inputMode="text"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Work email *</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
            autoComplete="email"
            inputMode="email"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Business name *</span>
          <input
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
            autoComplete="organization"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Anything else? (optional)
          </span>
          <span className="mt-1 block text-xs font-normal normal-case text-[var(--color-muted)]">
            Goals, timeline, or what’s broken—add when you’re ready.
          </span>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows={3}
            className="mt-1.5 min-h-[96px] w-full resize-y rounded-lg border border-[var(--color-border)] bg-white px-3 py-3 text-base text-[var(--color-ink)] sm:text-sm"
            placeholder="e.g. No website yet, or we’re not showing up for local searches…"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {errorMessage}
        </p>
      )}
      {status === "success" && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
          Thanks—we received your details. We’ll review and reach out shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 text-base font-semibold text-white shadow-md transition hover:bg-[var(--color-navy-deep)] disabled:opacity-60 sm:w-auto sm:text-sm"
      >
        {status === "loading" ? "Sending…" : "Send my info"}
      </button>
      <p className="text-[11px] text-[var(--color-muted)]">
        We use this to scope a fit and follow up—we don’t sell your information.
      </p>
    </form>
  );
}
