import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { getSiteUrl } from "@/lib/site-url";

const path = "/hosting-terms";

export const metadata: Metadata = {
  title: "Hosting & care plan terms | J&J Management Solutions",
  description:
    "What our optional hosting subscription covers, what you should expect, and how to get support—Oklahoma small businesses.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Hosting & care plan terms | J&J Management Solutions",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function HostingTermsPage() {
  return (
    <div className="relative min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <main
        id="main"
        className="relative z-[1] mx-auto max-w-3xl px-4 pb-24 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Fulfillment checklist</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-[var(--color-ink-deep)] sm:text-4xl">
          Hosting &amp; care plan (summary)
        </h1>
        <p className="mt-4 text-[var(--color-muted)]">
          This page is a plain-language overview for clients who choose optional hosting with us. Final terms are confirmed
          in your agreement or statement of work. New to the idea? Start with the{" "}
          <Link href="/website-hosting" className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
            hosting overview
          </Link>
          .
        </p>
        <ul className="mt-10 space-y-6 text-[var(--color-ink)]">
          <li>
            <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">What hosting includes</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Managed hosting for the site we build or migrate for you, baseline uptime monitoring where applicable,
              SSL renewal on supported stacks, and a defined channel for support requests (email or scheduled call as
              agreed).
            </p>
          </li>
          <li>
            <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">What it does not include</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Unlimited redesigns, new feature development, paid ad spend, third-party software licenses you buy
              separately, or DNS/registry fees at your domain registrar unless explicitly added to your plan.
            </p>
          </li>
          <li>
            <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">Billing &amp; cancellation</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Recurring plans bill on the cycle you agree to in writing. You can cancel before the next renewal; access and
              handoff details are confirmed at cancellation so you retain ownership of your content.
            </p>
          </li>
          <li>
            <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">After you sign up</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              We confirm DNS, launch checklist, and primary contacts. If something blocks launch (missing domain access,
              etc.), we’ll tell you what we need and pause billing adjustments as agreed.
            </p>
          </li>
        </ul>
        <p className="mt-12 text-sm text-[var(--color-muted)]">
          Questions?{" "}
          <Link href="/#contact" className="font-semibold text-[var(--color-accent)] hover:underline">
            Contact us
          </Link>{" "}
          or return to the{" "}
          <Link href="/preview" className="font-semibold text-[var(--color-accent)] hover:underline">
            preview builder
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
