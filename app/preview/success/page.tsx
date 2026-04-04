import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { BOOK_CALL_PATH } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

const path = "/preview/success";

export const metadata: Metadata = {
  title: "Thank you | J&J Management Solutions",
  description: "Thanks for reaching out—we’ll follow up with next steps.",
  alternates: { canonical: path },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Thank you | J&J Management Solutions",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

type Props = { searchParams: Promise<{ type?: string; session_id?: string }> };

export default async function PreviewSuccessPage({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <div className="relative min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <main
        id="main"
        className="relative z-[1] mx-auto max-w-xl px-4 pb-24 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6"
      >
        <h1 className="font-serif text-3xl font-semibold text-[var(--color-ink-deep)]">You’re all set</h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Thanks for your message. We’ll follow up within one business day with next steps. Prefer to talk sooner? Book a
          short call and we’ll align on a fully custom build you own—and optional hosting if you want it.
        </p>
        {sp.session_id ? (
          <p className="mt-4 text-xs text-[var(--color-muted)]">Reference: {sp.session_id}</p>
        ) : null}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryCtaLink href={BOOK_CALL_PATH} className="!inline-flex justify-center">
            Book a call
          </PrimaryCtaLink>
          <Link
            href="/preview"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-6 font-semibold text-[var(--color-accent)]"
          >
            Back to preview builder
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
