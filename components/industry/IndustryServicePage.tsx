import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { BOOK_CALL_PATH } from "@/lib/constants";
import { SectionFlowAccent } from "@/components/landing/SectionFlowAccent";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";

type Props = {
  title: string;
  description: string;
  bullets: string[];
  relatedWorkSlug?: string;
  relatedWorkLabel?: string;
};

export function IndustryServicePage({ title, description, bullets, relatedWorkSlug, relatedWorkLabel }: Props) {
  return (
    <div className="relative min-h-dvh min-w-0 max-w-[100vw] overflow-x-clip bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <main
        id="main"
        className="relative z-[1] min-w-0 pb-20 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:pb-24"
      >
        <section className="relative overflow-hidden border-b border-[var(--color-border)]/80">
          <SectionFlowAccent phase={2} side="left" />
          <div className="relative z-[1] mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Oklahoma</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryCtaLink href={BOOK_CALL_PATH} className="px-8">
                Book a call
              </PrimaryCtaLink>
              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-8 text-sm font-semibold text-[var(--color-accent)] hover:border-[var(--color-accent)]/40"
              >
                Email us
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">What we focus on</h2>
          <ul className="mt-6 space-y-3 text-[var(--color-muted)]">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-[var(--color-accent)]" aria-hidden>
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {relatedWorkSlug ? (
            <p className="mt-10">
              <Link
                href={`/work/${relatedWorkSlug}`}
                className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
              >
                {relatedWorkLabel ?? "See a sample walkthrough"} →
              </Link>
            </p>
          ) : null}
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            <Link href="/" className="font-medium text-[var(--color-accent)] hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
