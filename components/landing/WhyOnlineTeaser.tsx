"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function WhyOnlineTeaser() {
  return (
    <section className="border-t border-[var(--color-border)] bg-paper py-10 sm:py-12" aria-labelledby="why-online-teaser-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)]/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div className="min-w-0 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Why online</p>
              <h2
                id="why-online-teaser-heading"
                className="mt-2 font-serif text-xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-2xl"
              >
                What showing up online actually changes
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)] sm:mt-3 sm:text-base">
                Short, sourced takeaways on search, reviews, and mobile—so you can see what research says before we ever
                pitch a project.
              </p>
            </div>
            <div className="flex shrink-0 justify-center sm:justify-end">
              <Link
                href="/why-online"
                className="group inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-6 text-sm font-semibold text-[var(--color-accent)] transition hover:border-[var(--color-accent)]/55 hover:bg-[var(--color-accent)]/15 sm:px-7 sm:text-base"
              >
                Read why online matters
                <span className="ml-2 transition group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
