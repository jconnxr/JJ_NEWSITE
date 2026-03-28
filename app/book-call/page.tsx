import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookCallForm } from "./BookCallForm";

export const metadata: Metadata = {
  title: "Schedule a call | J&J Management Solutions",
  description: "Pick a day and share your details—we’ll follow up to confirm a time.",
  robots: { index: true, follow: true },
};

export default function BookCallPage() {
  return (
    <div className="min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <header className="border-b border-[var(--color-border)]/90 bg-[var(--color-cream)]/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
          <Link href="/" className="flex min-h-12 min-w-0 items-center gap-2 text-sm font-medium sm:min-h-14">
            <span className="sr-only">J&amp;J Management Solutions — Home</span>
            <Image
              src="/logo-wordmark.png"
              alt=""
              width={400}
              height={110}
              className="h-12 w-auto max-w-[min(300px,68vw)] shrink-0 object-contain object-left sm:h-[3.75rem] sm:max-w-[min(400px,48vw)]"
            />
          </Link>
          <Link
            href="/#contact"
            className="shrink-0 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-ink-deep)]"
          >
            Contact
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Scheduling</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
          Schedule a call
        </h1>
        <p className="mt-4 text-[var(--color-muted)]">
          Choose a day that works best. We’ll reach out to confirm the exact time and answer any questions.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-paper/80 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] sm:p-8">
          <BookCallForm />
        </div>
      </main>
    </div>
  );
}
