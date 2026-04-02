import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, SERVICE_AREA_CITIES, SMS_URI } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-cream)] py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] text-center text-sm text-[var(--color-muted)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-medium text-[var(--color-ink)]">
          <strong>J&J Management Solutions</strong> · Oklahoma
        </p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold sm:text-sm">
          <Link href="/pricing" className="text-[var(--color-accent)] hover:underline">
            Pricing
          </Link>
          <Link href="/#faq" className="text-[var(--color-accent)] hover:underline">
            FAQ
          </Link>
          <Link href="/blog" className="text-[var(--color-accent)] hover:underline">
            Resources
          </Link>
          <Link href="/oklahoma-city-restaurant-websites" className="text-[var(--color-accent)] hover:underline">
            OKC restaurants
          </Link>
          <Link href="/oklahoma-dental-practice-websites" className="text-[var(--color-accent)] hover:underline">
            Dental
          </Link>
          <Link href="/oklahoma-hvac-contractor-websites" className="text-[var(--color-accent)] hover:underline">
            HVAC
          </Link>
        </nav>
        <p className="mt-4">
          <a href={PHONE_TEL} className="font-semibold text-[var(--color-accent)] hover:underline">
            {PHONE_DISPLAY}
          </a>
          <span className="mx-2 text-[var(--color-border)]" aria-hidden>
            ·
          </span>
          <a href={SMS_URI} className="font-semibold text-[var(--color-accent)] hover:underline">
            Text us
          </a>
        </p>
        <p className="mt-1">© {year} J&J Management Solutions. All rights reserved.</p>
        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed sm:text-sm">
          <span className="font-semibold text-[var(--color-ink)]">Service areas: </span>
          {SERVICE_AREA_CITIES.join(" · ")}.
        </p>
      </div>
    </footer>
  );
}
