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
            A local partner for your online presence
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            <span className="font-medium text-[var(--color-ink)]">John Conner</span> leads J&amp;J Management Solutions
            from Oklahoma City. We work with local owners who want a credible website, steadier leads, and the digital
            side of the business under control—without agency runaround or jargon you have to decode later.
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
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                John Conner · Owner
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                John helps you figure out what matters online first—then builds or fixes the site, tightens how leads
                reach you, and sets up ads and tools that fit a local business (not a corporate playbook). From the first
                call through launch, you work with the same person who answers the phone and does the work.
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
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
              What local owners get
            </h3>
            <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--color-ink)] sm:text-base">
              <p>
                Most owners we meet aren&apos;t behind because they don&apos;t care—they&apos;re behind because the
                online side piled up: an outdated site, scattered reviews, leads lost in texts and voicemails, ads that
                never quite paid off. We focus on the basics that move the needle: look trustworthy when someone Googles
                you, make it easy to call or book, and keep follow-up from falling through the cracks.
              </p>
              <p>
                Whether you&apos;re in a small town or the Oklahoma City metro, you get practical help in plain
                language—websites, CRMs, and advertising wired together so your online presence supports how you actually
                run the business. We scope honestly, ship in focused phases, and don&apos;t disappear after launch.
              </p>
              <p>
                J&amp;J is a Christian company. That means straight answers, fair pricing, and treating your reputation
                online like something worth protecting—because for local businesses, what people see and read about you
                often happens before you ever shake hands.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
