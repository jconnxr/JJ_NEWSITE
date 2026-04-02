"use client";

import { faqItems } from "@/lib/faq-data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-cream)] py-20 sm:py-24"
      aria-labelledby="faq-heading"
    >
      <SectionFlowAccent phase={5} side="right" />
      <div className="relative z-[1] mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl"
          >
            Common questions
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Quick answers before you reach out—timelines, geography, pricing, and what happens next.
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, i) => (
            <Reveal key={item.question} delay={0.04 + i * 0.03}>
              <details className="group rounded-2xl border border-[var(--color-border)] bg-paper/90 shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[var(--color-ink-deep)] sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    className="shrink-0 text-[var(--color-accent)] transition group-open:rotate-180"
                    aria-hidden
                  >
                    ▼
                  </span>
                </summary>
                <div className="border-t border-[var(--color-border)]/80 px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)] sm:px-6 sm:py-5 sm:text-base">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
