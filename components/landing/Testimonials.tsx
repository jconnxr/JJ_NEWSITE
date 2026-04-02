"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-[var(--color-gold)]" aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      <span className="sr-only"> {n} stars</span>
    </span>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--color-border)] bg-paper py-20 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <SectionFlowAccent phase={4} side="left" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Social proof</p>
          <h2
            id="testimonials-heading"
            className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl"
          >
            What clients say
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Replace these placeholders with real names, businesses, and quotes when you have permission—we structured
            the section so it’s easy to drop in Google-style reviews.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)]/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] sm:p-7"
            >
              <Stars n={t.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-ink)] sm:text-base">
                “{t.quote}”
              </blockquote>
              <footer className="mt-6 border-t border-[var(--color-border)]/80 pt-4">
                <p className="font-semibold text-[var(--color-ink-deep)]">{t.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{t.role}</p>
                {t.sourceUrl ? (
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    View on Google
                  </a>
                ) : null}
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
