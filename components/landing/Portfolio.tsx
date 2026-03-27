"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/portfolio-data";
import { Reveal } from "@/components/motion/Reveal";

const categoryBadge: Record<string, string> = {
  website: "bg-[var(--color-navy)]/10 text-[var(--color-navy)] ring-1 ring-[var(--color-navy)]/12",
  booking: "bg-teal-50 text-teal-900 ring-1 ring-teal-200/50",
  ads: "bg-violet-50 text-violet-900 ring-1 ring-violet-200/50",
};

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 border-t border-[var(--color-border)] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p
            className="mb-4 inline-block rounded-full border border-amber-200/90 bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-950"
            role="note"
          >
            Sample projects — not real businesses
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Selected work</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
            See what we can build
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            These are fictional brands with real structure—full-page mocks that show how we think about sites, booking
            systems, and ad programs. Open any project for the full walkthrough and interactive preview.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/40 shadow-[0_4px_24px_rgba(30,58,95,0.06)] transition hover:border-[var(--color-accent)]/25 hover:shadow-[0_12px_40px_rgba(30,58,95,0.1)]"
              >
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${categoryBadge[p.category] ?? categoryBadge.website}`}
                    >
                      {p.categoryLabel}
                    </span>
                    <span className="text-xs text-[var(--color-muted)]">{p.location}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--color-ink-deep)] group-hover:text-[var(--color-accent)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{p.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                    View sample
                    <span className="transition group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
                <div className="h-1.5 bg-gradient-to-r from-[var(--color-navy)]/0 via-[var(--color-accent)]/40 to-[var(--color-navy)]/0 opacity-0 transition group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
