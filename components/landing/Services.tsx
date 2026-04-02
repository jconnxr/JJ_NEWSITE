"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { IconAds, IconBooking, IconCrms, IconWebsites } from "./service-icons";
import { SectionFlowAccent } from "./SectionFlowAccent";

const services: {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  exampleHref: string;
  exampleLabel: string;
}[] = [
  {
    id: "service-websites",
    title: "Websites",
    description:
      "Fast, responsive sites that explain what you do and make the next step obvious—search-friendly and built to convert.",
    icon: <IconWebsites className="h-10 w-10" />,
    exampleHref: "/work/red-dirt-roofing",
    exampleLabel: "See a trades site example",
  },
  {
    id: "service-crms",
    title: "CRMs",
    description:
      "Implementation and workflows so leads, contacts, and follow-ups live in one place your team will actually use.",
    icon: <IconCrms className="h-10 w-10" />,
    exampleHref: "/work/summit-family-dental",
    exampleLabel: "See a booking flow example",
  },
  {
    id: "service-ads",
    title: "Ad campaigns",
    description:
      "Targeted campaigns aligned to your goals and budget, with reporting that answers whether it’s working.",
    icon: <IconAds className="h-10 w-10" />,
    exampleHref: "/work/prairie-hvac-ads",
    exampleLabel: "See an ads dashboard example",
  },
  {
    id: "service-booking",
    title: "Booking & intake",
    description:
      "Flows and lightweight applications so customers can book, request a quote, or onboard without friction.",
    icon: <IconBooking className="h-10 w-10" />,
    exampleHref: "/work/summit-family-dental",
    exampleLabel: "See an intake example",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden scroll-mt-24 py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <SectionFlowAccent phase={4} side="right" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="services-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl lg:tracking-tight"
          >
            What we help you ship
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)] sm:mt-5">
            Whether you’re starting from zero or fixing what you already have, we meet you where you are—then scale with
            you as you grow.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              id={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-paper p-6 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)]/35 hover:shadow-[0_14px_36px_rgba(100,150,200,0.14)]"
            >
              <span className="mb-4 text-[var(--color-accent)]">{s.icon}</span>
              <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-deep)]">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{s.description}</p>
              <div className="mt-5 flex flex-col gap-2 border-t border-[var(--color-border)]/60 pt-4">
                <Link
                  href={s.exampleHref}
                  className="text-sm font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
                >
                  {s.exampleLabel}
                </Link>
                <Link
                  href="/#contact"
                  className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                >
                  Discuss this →
                </Link>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition duration-300 group-hover:ring-[var(--color-accent)]/25" />
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[var(--color-muted)]">
          Industry pages:{" "}
          <Link href="/oklahoma-city-restaurant-websites" className="font-semibold text-[var(--color-accent)] hover:underline">
            Restaurants
          </Link>
          {" · "}
          <Link href="/oklahoma-dental-practice-websites" className="font-semibold text-[var(--color-accent)] hover:underline">
            Dental
          </Link>
          {" · "}
          <Link href="/oklahoma-hvac-contractor-websites" className="font-semibold text-[var(--color-accent)] hover:underline">
            HVAC
          </Link>
        </p>
      </div>
    </section>
  );
}
