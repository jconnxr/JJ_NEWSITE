import Link from "next/link";

export default function WorkNotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[var(--color-cream)] px-4 text-center">
      <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink-deep)]">Case study not found</h1>
      <p className="mt-2 text-[var(--color-muted)]">That work sample doesn’t exist or was moved.</p>
      <Link
        href="/#portfolio"
        className="mt-8 rounded-xl bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white"
      >
        Back to work samples
      </Link>
    </div>
  );
}
