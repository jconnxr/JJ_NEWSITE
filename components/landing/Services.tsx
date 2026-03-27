"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const services = [
  {
    title: "Websites",
    description:
      "Fast, responsive sites that explain what you do and make the next step obvious—search-friendly and built to convert.",
    icon: "01",
  },
  {
    title: "CRMs",
    description:
      "Implementation and workflows so leads, contacts, and follow-ups live in one place your team will actually use.",
    icon: "02",
  },
  {
    title: "Ad campaigns",
    description:
      "Targeted campaigns aligned to your goals and budget, with reporting that answers whether it’s working.",
    icon: "03",
  },
  {
    title: "Booking & intake",
    description:
      "Flows and lightweight applications so customers can book, request a quote, or onboard without friction.",
    icon: "04",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="services-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl"
          >
            What we help you ship
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Whether you’re starting from zero or fixing what you already have, we meet you where you are—then scale with
            you as you grow.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_4px_24px_rgba(30,58,95,0.06)]"
            >
              <span className="mb-4 font-mono text-xs font-medium tracking-widest text-[var(--color-accent)]/80">
                {s.icon}
              </span>
              <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-deep)]">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{s.description}</p>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition group-hover:ring-[var(--color-navy)]/10" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
