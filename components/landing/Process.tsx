"use client";

import Link from "next/link";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";

const steps = [
  {
    n: "1",
    title: "Discovery call",
    body: "We learn your goals, timeline, and constraints—no pitch deck, just a clear conversation about what you need.",
  },
  {
    n: "2",
    title: "Strategy & build",
    body: "We agree on priorities, then design and ship websites, systems, or campaigns with steady check-ins.",
  },
  {
    n: "3",
    title: "Launch & support",
    body: "We go live together, train your team if needed, and stay available as you grow or need changes.",
  },
];

export function Process() {
  return (
    <section
      className="relative overflow-hidden scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-cream)] py-20 sm:py-24"
      aria-labelledby="process-heading"
    >
      <SectionFlowAccent phase={2} side="right" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">How it works</p>
          <h2
            id="process-heading"
            className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl lg:tracking-tight"
          >
            A simple path from first call to live results
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)] sm:mt-5">
            No mystery phases—just three stages so you always know what happens next.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <Reveal key={s.n} delay={0.08 + (Number(s.n) - 1) * 0.06}>
              <li className="rounded-2xl border border-[var(--color-border)] bg-paper/80 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] sm:p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 font-mono text-sm font-bold text-[var(--color-accent)]">
                  {s.n}
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--color-ink-deep)]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.32}>
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-[var(--color-border)]/80 pt-12 text-center">
            <p className="max-w-lg text-lg text-[var(--color-muted)]">Ready to see how step 1 works for your business?</p>
            <PrimaryCtaLink href="/#book-call" className="px-10 text-base">
              Ready to start step 1?
            </PrimaryCtaLink>
            <Link
              href="/#faq"
              className="text-sm font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
            >
              Read common questions first
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
