import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { BOOK_CALL_PATH } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

const path = "/website-hosting";

export const metadata: Metadata = {
  title: "Website hosting option | J&J Management Solutions",
  description:
    "Optional hosting and care for the custom site we build for you—Oklahoma small businesses. Plain-language overview before you decide.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Website hosting option | J&J Management Solutions",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function WebsiteHostingPage() {
  return (
    <div className="relative min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <main
        id="main"
        className="relative z-[1] mx-auto max-w-3xl px-4 pb-24 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">After your build</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-[var(--color-ink-deep)] sm:text-4xl">
          Hosting your website (optional)
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          The interactive preview on our site is a fast way to see direction—not your finished product. When we build your
          real site, <strong className="font-semibold text-[var(--color-ink)]">you own it</strong>: your content, your domain,
          your brand. Hosting is an add-on for teams who want us to keep the lights on and handle technical care—not a
          requirement to work with us.
        </p>

        <section className="mt-12 space-y-4 text-[var(--color-muted)]">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">What “hosting with us” usually means</h2>
          <p>
            If you choose it, we host the site we launched for you on infrastructure we manage. Typical care includes
            keeping the site online, applying security-related updates for the stack we agreed on, and being the first call
            when something breaks. Exact scope is spelled out in your statement of work or agreement—we don’t hide fees or
            pretend one-size-fits-all.
          </p>
          <p>
            Some clients prefer to host elsewhere after launch; that’s fine. We’ll hand off what you need and stay
            available for paid help if you want it later.
          </p>
        </section>

        <section className="mt-12 space-y-4 text-[var(--color-muted)]">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">Formal terms</h2>
          <p>
            For subscription-style hosting, see our{" "}
            <Link href="/hosting-terms" className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
              hosting &amp; care plan summary
            </Link>
            . It’s written to match what we actually deliver—not generic legalese for a product you didn’t buy.
          </p>
        </section>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PrimaryCtaLink href={BOOK_CALL_PATH} className="!inline-flex justify-center sm:justify-start">
            Book a call
          </PrimaryCtaLink>
          <Link
            href="/preview"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-6 text-center font-semibold text-[var(--color-accent)]"
          >
            Try the site preview
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
