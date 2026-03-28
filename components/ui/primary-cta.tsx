import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const shell =
  "group/cta relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-xl bg-[var(--color-navy)] font-semibold text-white shadow-lg shadow-[var(--color-navy)]/25 transition-[box-shadow,transform] duration-300 hover:shadow-[var(--color-navy)]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const sheen =
  "pointer-events-none absolute inset-0 z-0 origin-left -translate-x-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent transition-transform duration-500 ease-out group-hover/cta:translate-x-0 motion-reduce:transition-none motion-reduce:group-hover/cta:-translate-x-full";

type LinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function PrimaryCtaLink({ href, className = "", children, onClick }: LinkProps) {
  return (
    <Link href={href} className={`${shell} ${className}`} onClick={onClick}>
      <span className={sheen} aria-hidden />
      <span className="relative z-[1]">{children}</span>
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export function PrimaryCtaButton({ className = "", children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={`${shell} ${className}`} {...rest}>
      <span className={sheen} aria-hidden />
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}
