"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass =
    "flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-navy)]/5 hover:text-[var(--color-accent)] md:min-h-0 md:text-sm";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top,0px)] transition-[background,box-shadow,border-color] duration-300 ${
        scrolled || menuOpen
          ? "border-[var(--color-border)]/90 bg-[var(--color-cream)]/[0.96] shadow-[0_8px_30px_rgba(30,58,95,0.08)] backdrop-blur-xl"
          : "border-transparent bg-[var(--color-cream)]/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 flex-1 items-center gap-2.5 no-underline sm:gap-3 sm:flex-initial"
          onClick={() => setMenuOpen(false)}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="shrink-0"
          >
            <Image
              src="/logo.png"
              alt="J&J Management Solutions"
              width={44}
              height={44}
              className="h-10 w-auto sm:h-11"
              priority
            />
          </motion.div>
          <span className="truncate font-serif text-sm font-semibold tracking-tight text-[var(--color-ink)] sm:text-base">
            J&J Management Solutions
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex md:gap-5" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)]/80 bg-white/80 text-[var(--color-ink)] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)]/80 bg-[var(--color-cream)] md:hidden"
          >
            <nav className="flex flex-col px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]" aria-label="Mobile primary">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
