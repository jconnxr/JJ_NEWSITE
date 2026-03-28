"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PHONE_TEL } from "@/lib/constants";

/** Mobile-only bar: quick path to call or book after the visitor has scrolled past the hero */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setVisible(y > 300 && y < max - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-cream)]/96 pb-[max(0.65rem,env(safe-area-inset-bottom,0px))] pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Quick actions"
        >
          <div className="mx-auto flex max-w-6xl gap-2 px-3">
            <Link
              href="#book-call"
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-[var(--color-navy)] px-3 text-sm font-semibold text-white"
            >
              Book a call
            </Link>
            <a
              href={PHONE_TEL}
              className="flex min-h-[48px] min-w-[5.5rem] shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-2 text-sm font-semibold text-[var(--color-accent)]"
            >
              Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
