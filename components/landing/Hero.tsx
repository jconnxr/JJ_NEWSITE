"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import {
  BOOK_CALL_PATH,
  GOOGLE_REVIEWS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  RESPONSE_TIME,
  SERVICE_AREA,
} from "@/lib/constants";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";
import { HeroTechBackdrop } from "./HeroTechBackdrop";

export function Hero() {
  const narrow = useNarrowViewport();

  return (
    <section
      className="relative overflow-hidden pt-[calc(7rem+env(safe-area-inset-top,0px))] pb-10 sm:pt-[8.5rem] sm:pb-14"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute -left-1/4 top-0 h-[min(70vh,520px)] w-[min(90vw,520px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(100,150,200,0.14)_0%,transparent_68%)] blur-2xl md:blur-3xl"
          animate={
            narrow
              ? { scale: 1, opacity: [0.3, 0.42, 0.3] }
              : { scale: [1, 1.08, 1], opacity: [0.32, 0.52, 0.32] }
          }
          transition={{ duration: narrow ? 10 : 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[min(60vh,440px)] w-[min(85vw,480px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(196,168,106,0.08)_0%,transparent_65%)] blur-2xl md:blur-3xl"
          animate={
            narrow
              ? { scale: 1, opacity: [0.2, 0.32, 0.2] }
              : { scale: [1.05, 1, 1.05], opacity: [0.22, 0.38, 0.22] }
          }
          transition={{ duration: narrow ? 12 : 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <HeroTechBackdrop />
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-[1] mx-auto min-w-0 max-w-3xl px-4 text-center sm:px-6">
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Oklahoma · Websites, systems &amp; ads
        </motion.p>
        <motion.h1
          id="hero-heading"
          className="mx-auto min-w-0 max-w-full text-pretty break-words font-serif text-[clamp(1.625rem,5.2vw,2.25rem)] font-semibold leading-[1.12] tracking-tight text-[var(--color-ink-deep)] sm:text-5xl sm:tracking-tight lg:text-[3.25rem] lg:-tracking-[0.02em]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Everything your business needs online — <span className="whitespace-nowrap">we build it, you own it</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          We help Oklahoma businesses look credible online, capture leads, and close the loop with CRMs, ads, and
          booking tools—new builds or fixes to what you already have. You work directly with both of us, in plain language.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
        >
          <PrimaryCtaLink
            href={BOOK_CALL_PATH}
            className="w-full px-7 text-base sm:w-auto sm:min-w-[200px] sm:text-sm"
          >
            Book a conversation
          </PrimaryCtaLink>
          <Link
            href="/#faq"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper/90 px-7 text-base font-semibold text-[var(--color-accent)] backdrop-blur-sm transition hover:border-[var(--color-accent)]/35 hover:bg-paper sm:w-auto sm:text-sm"
          >
            Get a free plan →
          </Link>
        </motion.div>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-center text-sm text-[var(--color-muted)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.52 }}
        >
          <span className="text-[var(--color-gold)]" aria-hidden>
            ★★★★★
          </span>{" "}
          <span className="text-[var(--color-ink)]">Trusted by Oklahoma businesses statewide</span>
          {GOOGLE_REVIEWS_URL ? (
            <>
              {" · "}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
              >
                Google reviews
              </a>
            </>
          ) : null}
        </motion.p>

        <motion.div
          className="mt-10 border-t border-[var(--color-border)]/60 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.58 }}
        >
          <ul className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-2">
            <li>
              <a
                href={PHONE_TEL}
                className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
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
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden
      >
        <motion.div
          className="flex h-9 w-5 justify-center rounded-full border-2 border-[var(--color-accent)]/25 pt-1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="h-1.5 w-1 rounded-full bg-[var(--color-gold)]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
