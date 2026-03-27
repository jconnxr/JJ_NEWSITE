import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-cream)] py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] text-center text-sm text-[var(--color-muted)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-medium text-[var(--color-ink)]">
          <strong>J&J Management Solutions</strong> · Oklahoma
        </p>
        <p className="mt-1">© {year} J&J Management Solutions. All rights reserved.</p>
        <p className="mt-4">
          <a href={PHONE_TEL} className="font-semibold text-[var(--color-accent)] hover:underline">
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    </footer>
  );
}
