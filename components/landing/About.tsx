"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";
import { JOHN_PHONE_DISPLAY, JOHN_PHONE_TEL } from "@/lib/constants";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      <SectionFlowAccent phase={5} side="left" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="about-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl lg:tracking-tight"
          >
            About John Conner
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            John runs J&amp;J Management Solutions from Oklahoma City—websites, systems, and ads for small businesses,
            in plain language, with direct access from first call through launch.
          </p>
        </Reveal>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-paper shadow-xl shadow-black/40"
        >
          <div className="grid gap-0 md:grid-cols-[minmax(240px,320px)_1fr]">
            <div className="relative aspect-[4/5] min-h-[280px] bg-[var(--color-surface-alt)] md:aspect-auto md:min-h-[320px]">
              <Image
                src="/team-john.png"
                alt="John Conner"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">Owner</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                John handles discovery, strategy, and delivery—scope, site builds, integrations, ads setup, and what to
                ship first. You work with the same person who answers the phone and does the work.
              </p>
              <p className="mt-4">
                <a
                  href={JOHN_PHONE_TEL}
                  className="text-base font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
                >
                  {JOHN_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </motion.article>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-paper/95 p-6 shadow-sm sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">How we work</h3>
            <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--color-ink)] sm:text-base">
              <p>
                J&amp;J is based in Oklahoma City with a simple focus: make the online side of running a business feel
                understandable—not a maze of jargon, dashboards, and vendors you never meet.
              </p>
              <p>
                Whether you&apos;re in a small town or the metro, we help your business thrive online with websites,
                systems, and ads you can actually use—no layers, no distant &ldquo;support team,&rdquo; just clear answers
                and follow-through on what we agree to in the call.
              </p>
              <p>
                We run our business as a Christian company. Our faith shapes how we treat people, tell the truth, and
                steward what you trust us with: your time, your budget, and your reputation online.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
