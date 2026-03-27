"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DuoHeadshots } from "@/components/landing/DuoHeadshots";
import { PHONE_DISPLAY, PHONE_TEL, RESPONSE_TIME, SERVICE_AREA } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-[calc(6.75rem+env(safe-area-inset-top,0px))] pb-10 sm:pt-32 sm:pb-14"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-1/4 top-0 h-[min(70vh,520px)] w-[min(90vw,520px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(44,82,130,0.35)_0%,transparent_68%)] blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[min(60vh,440px)] w-[min(85vw,480px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,58,95,0.28)_0%,transparent_65%)] blur-3xl"
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 58, 95, 0.04) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-[1] mx-auto grid max-w-6xl items-center gap-12 px-4 sm:gap-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Oklahoma · Websites, systems &amp; ads
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[var(--color-ink-deep)] sm:text-5xl lg:text-[3.25rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Websites, leads, and systems—without the jargon
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            We help Oklahoma businesses look credible on the web, capture leads, and stay organized—new sites, fixes to
            what you already have, CRMs, ads, and booking tools. You work directly with both of us, in plain language.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
          >
            <Link
              href="#book-call"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-7 text-base font-semibold text-white shadow-lg shadow-[var(--color-navy)]/20 transition hover:bg-[var(--color-navy-deep)] sm:w-auto sm:min-w-[200px] sm:text-sm"
            >
              Book a conversation
            </Link>
            <Link
              href="#product-inquiry"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-[var(--color-border)] bg-white/60 px-7 text-base font-semibold text-[var(--color-navy)] backdrop-blur-sm transition hover:border-[var(--color-navy)]/30 hover:bg-white sm:w-auto sm:text-sm"
            >
              Tell us what you need
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 border-t border-[var(--color-border)]/60 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.58 }}
          >
            <ul className="flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-2">
              <li>
                <a
                  href={PHONE_TEL}
                  className="font-semibold text-[var(--color-navy)] underline-offset-2 hover:underline"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </li>
              <li className="text-[var(--color-muted)]">
                <span className="font-medium text-[var(--color-ink)]">Service area: </span>
                {SERVICE_AREA}
              </li>
              <li className="text-[var(--color-muted)]">{RESPONSE_TIME}</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--color-navy)]/15 via-transparent to-[var(--color-accent)]/10 blur-2xl" />
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl shadow-[var(--color-navy)]/10 backdrop-blur-md sm:p-8"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <DuoHeadshots variant="hero" priority />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden
      >
        <motion.div
          className="flex h-9 w-5 justify-center rounded-full border-2 border-[var(--color-navy)]/20 pt-1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="h-1.5 w-1 rounded-full bg-[var(--color-navy)]/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
