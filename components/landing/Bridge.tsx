"use client";

import { Reveal } from "@/components/motion/Reveal";

export function Bridge() {
  return (
    <section
      className="relative border-y border-[var(--color-border)]/80 bg-[var(--color-surface-alt)] py-12 sm:py-16"
      aria-labelledby="bridge-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2
            id="bridge-heading"
            className="font-serif text-2xl font-semibold leading-snug text-[var(--color-ink-deep)] sm:text-[1.65rem]"
          >
            Oklahoma-based help for your business online
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            We work with owners and teams across the state—rural towns, suburbs, and the metro—who want a credible
            presence online, steadier leads, and the digital side of the business under control. Plain language, no buzzword
            soup, and no layers between you and the people doing the work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
