import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { BOOK_CALL_PATH } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

const path = "/pricing";

export const metadata: Metadata = {
  title: "Pricing & packages | J&J Management Solutions",
  description:
    "Starting ranges for Oklahoma small-business websites, systems, and ads—book a call to scope something custom.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pricing & packages | J&J Management Solutions",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

const tiers = [
  {
    name: "Starter",
    price: "From $2.5k–$5k",
    blurb: "Focused brochure or refresh: a tight set of pages, mobile-first, clear CTAs, basic SEO setup.",
    bullets: ["Up to ~5 pages", "Contact / lead capture", "Google Business alignment tips", "Launch support"],
  },
  {
    name: "Growth",
    price: "From $6k–$12k",
    blurb: "More depth: richer content, integrations, or light CRM / booking wiring with your stack.",
    bullets: ["Custom sections or multi-location", "Forms → inbox or CRM", "Performance & analytics baseline", "Ad landing alignment (optional)"],
  },
  {
    name: "Custom",
    price: "Let’s scope it",
    blurb: "Ongoing programs, complex migrations, multi-system builds, or retained improvements—priced after discovery.",
    bullets: ["Roadmap + phased delivery", "Ads + measurement plans", "Training & documentation", "Priority support windows"],
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />

      <main
        id="main"
        className="relative z-[1] mx-auto max-w-6xl px-4 py-12 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6 sm:py-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Packages</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
          What to expect on budget
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          Ranges are ballparks—every business is different. We confirm scope on a short call so you’re not surprised
          later. Oklahoma-based, plain language, no hidden “agency layers.”
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-paper/90 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">{t.name}</p>
              <p className="mt-2 font-serif text-2xl font-semibold text-[var(--color-ink-deep)]">{t.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{t.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-[var(--color-ink)]">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-[var(--color-accent)]" aria-hidden>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PrimaryCtaLink href={BOOK_CALL_PATH} className="w-full px-6 text-sm">
                  Book a call
                </PrimaryCtaLink>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-[var(--color-muted)]">
          <Link href="/#faq" className="font-semibold text-[var(--color-accent)] hover:underline">
            Read the FAQ
          </Link>
          {" · "}
          <Link href="/" className="font-semibold text-[var(--color-accent)] hover:underline">
            Back to home
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
