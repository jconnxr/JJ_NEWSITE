"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/portfolio-data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";

const categoryBadge: Record<string, string> = {
  website: "bg-[var(--color-accent)]/12 text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20",
  booking: "bg-teal-500/12 text-teal-200 ring-1 ring-teal-400/25",
  ads: "bg-violet-500/12 text-violet-200 ring-1 ring-violet-400/25",
};

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden scroll-mt-24 border-t border-[var(--color-border)] bg-paper py-20 sm:py-24"
    >
      <SectionFlowAccent phase={3} side="left" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Selected work</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl lg:tracking-tight">
            Interactive walkthroughs
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Explore full-page demos that show how we structure sites, booking flows, and ad programs. Each project page
            explains context up front—open any card for the guided preview.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-[var(--color-accent)]/25 bg-[var(--color-navy-deep)]/40 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Try your own</p>
              <p className="mt-2 font-serif text-xl font-semibold text-[var(--color-ink-deep)]">
                Preview a site tailored to your industry
              </p>
              <p className="mt-2 max-w-xl text-sm text-[var(--color-muted)]">
                Not a case study—a quick builder with layouts, colors, and your business name. Parallel to the work below.
              </p>
            </div>
            <Link
              href="/preview"
              className="mt-4 inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)] px-6 font-semibold text-[var(--color-navy)] sm:mt-0"
            >
              Open preview builder
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)]/50 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition duration-300 hover:border-[var(--color-accent)]/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-1 flex-col p-6 transition-transform duration-300 ease-out group-hover:scale-[1.02] sm:p-7">
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
                    Open walkthrough
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
