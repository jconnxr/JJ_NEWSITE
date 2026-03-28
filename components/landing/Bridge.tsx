"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";

export function Bridge() {
  return (
    <section
      className="relative overflow-hidden border-y border-[var(--color-border)]/80 bg-[var(--color-surface-alt)] py-16 sm:py-20"
      aria-labelledby="bridge-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-1/3 top-1/2 h-[min(50vh,380px)] w-[min(85vw,420px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-navy)_22%,transparent)_0%,transparent_70%)] blur-2xl md:blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[min(40vh,320px)] w-[min(70vw,360px)] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-accent)_12%,transparent)_0%,transparent_68%)] blur-2xl md:blur-3xl"
          animate={{ opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <SectionFlowAccent phase={0} side="right" blobs={false} />
      <div className="relative z-[1] mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2
            id="bridge-heading"
            className="font-serif text-2xl font-semibold leading-snug tracking-tight text-[var(--color-ink-deep)] sm:text-[1.65rem] lg:tracking-tight"
          >
            Oklahoma-based help for your business online
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)] sm:mt-7">
            We work with owners and teams across the state—rural towns, suburbs, and the metro—who want a credible
            presence online, steadier leads, and the digital side of the business under control. Plain language, no buzzword
            soup, and no layers between you and the people doing the work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
