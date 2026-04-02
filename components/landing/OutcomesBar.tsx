"use client";

import { motion } from "framer-motion";
import { outcomeStats } from "@/lib/outcomes";

export function OutcomesBar() {
  return (
    <section
      className="relative border-b border-[var(--color-border)]/80 bg-[var(--color-navy-deep)]/90 py-8 text-white"
      aria-label="Results at a glance"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {outcomeStats.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-center"
            >
              <p className="font-serif text-2xl font-semibold tracking-tight text-[var(--color-gold)] sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/70 sm:text-[11px]">
                {item.label}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
