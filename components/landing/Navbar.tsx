"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/why-online", label: "Why online" },
  { href: "/#services", label: "Services" },
  { href: "/#portfolio", label: "Work" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
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
    "flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-white/[0.06] hover:text-[var(--color-accent)] md:min-h-0 md:px-3 md:text-sm";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top,0px)] transition-[background,box-shadow,border-color] duration-300 ${
        scrolled || menuOpen
          ? "border-[var(--color-border)]/90 bg-[var(--color-cream)]/[0.94] shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md md:backdrop-blur-xl"
          : "border-transparent bg-[var(--color-cream)]/80 backdrop-blur-sm md:bg-[var(--color-cream)]/75 md:backdrop-blur-md"
      }`}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-x-3 px-4 py-3.5 sm:gap-x-4 sm:px-6 sm:py-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 justify-self-start">
          <Link
            href="/"
            className="group flex shrink-0 items-center justify-start no-underline"
            onClick={() => setMenuOpen(false)}
          >
            <span className="sr-only">J&amp;J Management Solutions — Home</span>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <Image
                src="/logo-wordmark.png"
                alt=""
                width={400}
                height={110}
                className="h-11 w-auto max-w-[min(200px,48vw)] object-contain object-left sm:h-12 sm:max-w-[min(260px,42vw)] md:h-[3.5rem] md:max-w-[min(320px,36vw)]"
                priority
              />
            </motion.div>
          </Link>
        </div>

        <nav
          className="col-start-2 row-start-1 hidden items-center justify-center gap-0.5 whitespace-nowrap md:flex lg:gap-1"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-self-end">
          <button
            type="button"
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)]/80 bg-paper/90 text-[var(--color-ink)] md:hidden"
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
