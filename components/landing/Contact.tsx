"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { BOOK_CALL_PATH, CONTACT_MAILTO } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { ProductInquiryForm } from "./ProductInquiryForm";
import { SectionFlowAccent } from "./SectionFlowAccent";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)] via-[var(--color-navy)] to-[var(--color-cream)]" />
      <motion.div
        className="pointer-events-none absolute -right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_65%)] blur-2xl md:blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <SectionFlowAccent phase={6} side="left" blobs={false} variant="deep" />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <Reveal>
            <h2
              id="contact-heading"
              className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:tracking-tight"
            >
              Two ways to reach us
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              Prefer talking? Grab a time. Prefer writing? Send a few details—we’ll follow up with a clear next step for
              your site, systems, or campaigns.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div
              id="book-call"
              className="scroll-mt-[calc(7rem+env(safe-area-inset-top,0px))] flex h-full flex-col rounded-2xl border border-[var(--color-border)]/80 bg-paper/95 p-6 text-[var(--color-ink)] shadow-xl shadow-black/10 backdrop-blur sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">Talk with us</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--color-ink-deep)]">Book a call</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                A focused conversation—usually 20–30 minutes—to understand your goals, timeline, and budget. We’ll
                suggest what to prioritize first and whether we’re a fit. No pressure and no generic pitch deck.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--color-ink)]/90">
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent)]" aria-hidden>
                    ✓
                  </span>
                  Fastest way to align on scope and urgency
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent)]" aria-hidden>
                    ✓
                  </span>
                  Bring questions—we’ll answer in plain language
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="w-full sm:w-auto">
                  <PrimaryCtaLink href={BOOK_CALL_PATH} className="w-full px-8 text-base sm:w-auto sm:text-sm">
                    Schedule a call
                  </PrimaryCtaLink>
                </div>
                <Link
                  href={CONTACT_MAILTO}
                  className="flex min-h-11 items-center justify-center text-center text-base font-medium text-[var(--color-accent)] underline-offset-2 hover:underline sm:justify-start sm:text-left sm:text-sm"
                >
                  Or email us instead
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="product-inquiry"
              className="scroll-mt-[calc(7rem+env(safe-area-inset-top,0px))] flex h-full flex-col rounded-2xl border border-[var(--color-border)]/80 bg-paper/95 p-6 text-[var(--color-ink)] shadow-xl shadow-black/10 backdrop-blur sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                Tell us in writing
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--color-ink-deep)]">
                Get a plan for your business
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                Share what you’re trying to fix or grow. Pick a focus below—we explain what it includes—then send your
                details. We’ll review and reach out with questions or a proposed first step.
              </p>
              <div className="mt-6 border-t border-[var(--color-border)] pt-6">
                <ProductInquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
