"use client";

import { useRef, useState } from "react";
import Link from "next/link";

function todayISODate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function BookCallForm() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const minDate = todayISODate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          businessName: businessName.trim(),
          phone: phone.trim(),
          preferredDate: preferredDate.trim(),
          fax: honeypotRef.current?.value ?? "",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 503 && data?.code === "NOT_CONFIGURED") {
        setStatus("error");
        setErrorMessage(
          "Scheduling email isn’t set up on the server yet. Please call us from the home page or use the contact form.",
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
      setBusinessName("");
      setPhone("");
      setPreferredDate("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
        ref={honeypotRef}
        type="text"
        name="fax"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Preferred date *</span>
        <input
          required
          type="date"
          min={minDate}
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-paper px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Your name *</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-paper px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Business name *</span>
        <input
          required
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          autoComplete="organization"
          className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-paper px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Phone *</span>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          inputMode="tel"
          className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[var(--color-border)] bg-paper px-3 py-2.5 text-base text-[var(--color-ink)] sm:text-sm"
        />
      </label>

      {status === "error" && (
        <p className="rounded-lg border border-red-500/40 bg-red-950/50 px-3 py-2 text-sm text-red-200" role="alert">
          {errorMessage}
        </p>
      )}
      {status === "success" && (
        <p className="rounded-lg border border-emerald-500/35 bg-emerald-950/45 px-3 py-2 text-sm text-emerald-200" role="status">
          Thanks—we got your request. We’ll contact you soon to confirm a time.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 text-base font-semibold text-white shadow-md transition hover:bg-[var(--color-navy-deep)] disabled:opacity-60 sm:text-sm"
      >
        {status === "loading" ? "Sending…" : "Submit request"}
      </button>

      <p className="text-center text-sm text-[var(--color-muted)]">
        <Link href="/" className="font-medium text-[var(--color-accent)] hover:underline">
          ← Back to home
        </Link>
      </p>
    </form>
  );
}
