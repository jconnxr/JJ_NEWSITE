import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SectionFlowAccent } from "@/components/landing/SectionFlowAccent";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { getSiteUrl } from "@/lib/site-url";
import { whyOnlineGroups, whyOnlineSources } from "@/lib/why-online-stats";

const path = "/why-online";

export const metadata: Metadata = {
  title: "Why a strong online presence matters | J&J Management Solutions",
  description:
    "Research-backed reasons Oklahoma businesses benefit from search visibility, reviews, a credible website, and a mobile-friendly experience—without the hype.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Why a strong online presence matters | J&J Management Solutions",
    description:
      "What national consumer and platform research says about local search, reviews, and how customers evaluate businesses online.",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "article",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "J&J Management Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why a strong online presence matters | J&J Management Solutions",
    description:
      "Local search, reviews, and site experience—what the data suggests for businesses in Oklahoma and beyond.",
    images: ["/logo.png"],
  },
};

export default function WhyOnlinePage() {
  return (
    <div className="relative min-h-dvh min-w-0 max-w-[100vw] overflow-x-clip bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <main
        id="main"
        className="relative z-[1] min-w-0 pb-20 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:pb-24"
      >
        <section className="relative overflow-hidden border-b border-[var(--color-border)]/80 bg-[var(--color-surface-alt)]/40">
          <SectionFlowAccent phase={0} side="right" />
          <div className="relative z-[1] mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              For Oklahoma owners
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl lg:tracking-tight">
              What an online presence actually does for your business
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
              The home page stays focused on how we help. This page is optional reading—short, sourced takeaways from
              consumer and platform research so you can decide what matters for your shop, practice, or service area.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 sm:py-20">
          {whyOnlineGroups.map((group, gi) => (
            <section
              key={group.id}
              className="relative overflow-hidden scroll-mt-28 rounded-2xl border border-[var(--color-border)] bg-paper/80 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              aria-labelledby={`${group.id}-heading`}
            >
              <SectionFlowAccent phase={gi + 1} side={gi % 2 === 0 ? "left" : "right"} />
              <div className="relative z-[1] p-6 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  {group.eyebrow}
                </p>
                <h2
                  id={`${group.id}-heading`}
                  className="mt-2 font-serif text-2xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-3xl"
                >
                  {group.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{group.description}</p>

                <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                  {group.stats.map((s, si) => (
                    <li
                      key={`${group.id}-${si}`}
                      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)]/50 p-5 sm:p-6"
                    >
                      <p className="font-mono text-3xl font-semibold tracking-tight text-[var(--color-accent)] sm:text-4xl">
                        {s.figure}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">{s.claim}</p>
                      <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
                        Source:{" "}
                        {s.href ? (
                          <a
                            href={s.href}
                            className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {s.source}
                          </a>
                        ) : (
                          <span className="font-medium text-[var(--color-ink)]">{s.source}</span>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <section
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] p-6 sm:p-8"
            aria-labelledby="sources-heading"
          >
            <h2 id="sources-heading" className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">
              Sources
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Figures come from third-party surveys and Google documentation; they describe broad consumer behavior, not
              your specific town or industry. We refresh this page when major reports update.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {whyOnlineSources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-navy-deep)] px-6 py-10 text-center sm:px-10 sm:py-12"
            aria-labelledby="cta-heading"
          >
            <SectionFlowAccent phase={4} side="left" blobs={false} variant="deep" />
            <div className="relative z-[1]">
              <h2 id="cta-heading" className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                Want help acting on this?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                We build websites, fix what you already have, and connect ads and systems—plain language, Oklahoma-based.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/book-call"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--color-gold)] px-8 text-base font-semibold text-[var(--color-navy-deep)] shadow-lg shadow-black/20 transition hover:brightness-105 sm:w-auto sm:text-sm"
                >
                  Schedule a call
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:w-auto sm:text-sm"
                >
                  Contact from home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
