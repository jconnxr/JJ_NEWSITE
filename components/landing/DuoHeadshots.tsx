import Image from "next/image";

type Props = {
  /** Compact row for header links; large for hero visual */
  variant: "nav" | "hero";
  className?: string;
  priority?: boolean;
};

const john = { src: "/team-john.png" as const, name: "John Conner" };
const jacob = { src: "/team-jacob.png" as const, name: "Jacob Foreman" };

/**
 * Overlapping duo portraits — personal brand anchor (vs. logo alone in UI).
 * Favicon / OG still use logo in layout metadata.
 */
export function DuoHeadshots({ variant, className = "", priority }: Props) {
  if (variant === "nav") {
    return (
      <div className={`flex shrink-0 -space-x-2 ${className}`} aria-hidden>
        <Image
          src={john.src}
          alt=""
          width={44}
          height={44}
          className="h-10 w-10 rounded-full border-2 border-white object-cover object-top shadow-sm sm:h-11 sm:w-11"
          priority={priority}
        />
        <Image
          src={jacob.src}
          alt=""
          width={44}
          height={44}
          className="h-10 w-10 rounded-full border-2 border-white object-cover object-top shadow-sm sm:h-11 sm:w-11"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full max-w-md ${className}`}>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
        <figure className="w-full max-w-[200px] text-center sm:max-w-[220px]">
          <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-xl shadow-[var(--color-navy)]/12 ring-1 ring-[var(--color-border)]/40">
            <Image
              src={john.src}
              alt={`${john.name}, co-founder`}
              width={440}
              height={550}
              className="aspect-[4/5] w-full object-cover object-top"
              sizes="(max-width: 640px) 200px, 220px"
              priority={priority}
            />
          </div>
          <figcaption className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)]">
            {john.name}
          </figcaption>
        </figure>
        <figure className="w-full max-w-[200px] text-center sm:max-w-[220px]">
          <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-xl shadow-[var(--color-navy)]/12 ring-1 ring-[var(--color-border)]/40">
            <Image
              src={jacob.src}
              alt={`${jacob.name}, co-founder`}
              width={440}
              height={550}
              className="aspect-[4/5] w-full object-cover object-top"
              sizes="(max-width: 640px) 200px, 220px"
              loading="lazy"
              priority={false}
            />
          </div>
          <figcaption className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)]">
            {jacob.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
