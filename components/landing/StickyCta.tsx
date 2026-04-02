"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { BOOK_CALL_PATH, PHONE_TEL, SMS_URI } from "@/lib/constants";

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
          <div className="mx-auto flex max-w-6xl gap-1.5 px-2 sm:gap-2 sm:px-3">
            <PrimaryCtaLink href={BOOK_CALL_PATH} className="min-h-[48px] min-w-0 flex-1 px-2 text-xs sm:px-3 sm:text-sm">
              Book a call
            </PrimaryCtaLink>
            <Link
              href="/#faq"
              className="flex min-h-[48px] min-w-0 flex-1 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-1 text-[11px] font-semibold leading-tight text-[var(--color-accent)] sm:px-2 sm:text-xs"
            >
              FAQ
            </Link>
            <a
              href={SMS_URI}
              className="flex min-h-[48px] min-w-[2.75rem] shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-1 text-[11px] font-semibold text-[var(--color-accent)] sm:min-w-[3.25rem] sm:text-xs"
            >
              Text
            </a>
            <a
              href={PHONE_TEL}
              className="flex min-h-[48px] min-w-[2.75rem] shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-1 text-[11px] font-semibold text-[var(--color-accent)] sm:min-w-[3.25rem] sm:text-xs"
            >
              Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
