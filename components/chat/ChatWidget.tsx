"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BOOK_CALL_PATH,
  CONTACT_MAILTO,
  JACOB_PHONE_DISPLAY,
  JACOB_PHONE_TEL,
  JOHN_PHONE_DISPLAY,
  JOHN_PHONE_TEL,
  SMS_URI,
} from "@/lib/constants";
import { faqItems } from "@/lib/faq-data";

/** First N FAQ items shown in the widget (keep short for the panel). */
const CHAT_FAQ_COUNT = 4;

const jacobSmsUri = "sms:+14056530112";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelRef.current?.querySelector("button")?.focus(), 100);
    return () => window.clearTimeout(t);
  }, [open]);

  const common = faqItems.slice(0, CHAT_FAQ_COUNT);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-end p-4 pb-[max(5.5rem,env(safe-area-inset-bottom,0px)+1rem)] md:pb-6">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        <AnimatePresence>
          {open ? (
            <motion.div
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-[min(72vh,520px)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] text-[var(--color-ink)] shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
            >
              <div className="flex shrink-0 items-start justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-navy-deep)] px-4 py-3">
                <div>
                  <h2 id={titleId} className="font-serif text-lg font-semibold text-white">
                    Questions?
                  </h2>
                  <p className="mt-0.5 text-xs text-white/75">Common answers—or reach a founder directly.</p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">Common questions</p>
                <div className="mt-2 space-y-1">
                  {common.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-[var(--color-border)]/80 bg-paper/90 open:border-[var(--color-accent)]/30"
                    >
                      <summary className="cursor-pointer list-none px-3 py-2.5 text-left text-xs font-medium text-[var(--color-ink-deep)] [&::-webkit-details-marker]:hidden">
                        <span className="flex items-start justify-between gap-2">
                          {item.question}
                          <span className="shrink-0 text-[var(--color-accent)] transition group-open:rotate-180" aria-hidden>
                            ▼
                          </span>
                        </span>
                      </summary>
                      <p className="border-t border-[var(--color-border)]/60 px-3 py-2 text-[11px] leading-relaxed text-[var(--color-muted)]">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
                <Link
                  href="/#faq"
                  onClick={close}
                  className="mt-3 inline-block text-xs font-semibold text-[var(--color-accent)] hover:underline"
                >
                  Full FAQ on the homepage →
                </Link>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">Message a founder</p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--color-muted)]">
                  Text is fastest—we both monitor messages during business hours.
                </p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href={SMS_URI}
                      className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-paper px-3 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)]/40"
                    >
                      <span>Text John</span>
                      <span className="text-xs text-[var(--color-muted)]">{JOHN_PHONE_DISPLAY}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={jacobSmsUri}
                      className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-paper px-3 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)]/40"
                    >
                      <span>Text Jacob</span>
                      <span className="text-xs text-[var(--color-muted)]">{JACOB_PHONE_DISPLAY}</span>
                    </a>
                  </li>
                  <li className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={JOHN_PHONE_TEL}
                      className="flex min-h-[44px] items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-xs font-semibold text-[var(--color-accent)] hover:bg-[var(--color-surface-alt)]/80"
                    >
                      Call John
                    </a>
                    <a
                      href={JACOB_PHONE_TEL}
                      className="flex min-h-[44px] items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-xs font-semibold text-[var(--color-accent)] hover:bg-[var(--color-surface-alt)]/80"
                    >
                      Call Jacob
                    </a>
                  </li>
                </ul>
                <div className="mt-4 space-y-2 border-t border-[var(--color-border)]/80 pt-4">
                  <Link
                    href={BOOK_CALL_PATH}
                    onClick={close}
                    className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[var(--color-navy)] text-sm font-semibold text-white shadow-md hover:bg-[var(--color-navy-deep)]"
                  >
                    Schedule a call
                  </Link>
                  <a
                    href={CONTACT_MAILTO}
                    className="flex min-h-[40px] w-full items-center justify-center text-xs font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    Email us instead
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-white shadow-[0_8px_28px_rgba(0,0,0,0.4)] ring-2 ring-[var(--color-accent)]/25 transition hover:bg-[var(--color-navy-deep)] hover:ring-[var(--color-accent)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:h-[3.75rem] md:w-[3.75rem]"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls={panelId}
          aria-label={open ? "Close chat" : "Open chat — common questions and message a founder"}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
