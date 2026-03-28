"use client";

import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionFlowAccent } from "./SectionFlowAccent";

const items = [
  {
    title: "Direct access",
    body: "You work with us—not a rotating account roster or a black box.",
  },
  {
    title: "Measured outcomes",
    body: "We tie work to visibility, leads, and bookings—not vanity metrics.",
  },
  {
    title: "Built for phones & customers",
    body: "Fast, readable experiences that work on the devices your customers actually use.",
  },
];

export function TrustStrip() {
  return (
    <section
      className="relative overflow-hidden border-b border-[var(--color-border)] bg-paper py-20 sm:py-24"
      aria-label="How we work"
    >
      <SectionFlowAccent phase={1} side="left" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <Stagger className="grid gap-12 md:grid-cols-3 md:gap-10">
          {items.map(({ title, body }) => (
            <StaggerItem key={title}>
              <motion.div
                className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)]/60 p-6 transition-colors hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface-alt)]"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-deep)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
