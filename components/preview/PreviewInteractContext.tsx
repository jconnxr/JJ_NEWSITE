"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

export const PREVIEW_SECTION_IDS = {
  top: "preview-section-top",
  trust: "preview-section-trust",
  services: "preview-section-services",
  reviews: "preview-section-reviews",
  contact: "preview-section-contact",
} as const;

export type PreviewSectionKey = keyof typeof PREVIEW_SECTION_IDS;

type PreviewInteractValue = {
  scrollTo: (key: PreviewSectionKey) => void;
  telHref: string | undefined;
};

const PreviewInteractContext = createContext<PreviewInteractValue | null>(null);

function computeTelHref(phone: string): string | undefined {
  const d = phone.replace(/\D/g, "");
  if (d.length < 10) return undefined;
  return d.length === 10 ? `tel:+1${d}` : `tel:+${d}`;
}

export function PreviewInteractProvider({ phone, children }: { phone: string; children: ReactNode }) {
  const telHref = useMemo(() => computeTelHref(phone), [phone]);

  const scrollTo = useCallback((key: PreviewSectionKey) => {
    const id = PREVIEW_SECTION_IDS[key];
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

    const scrollRoot = el.closest("[data-preview-scroll-root]") as HTMLElement | null;
    if (scrollRoot) {
      const rootRect = scrollRoot.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const padding = 6;
      const nextTop = scrollRoot.scrollTop + (elRect.top - rootRect.top) - padding;
      scrollRoot.scrollTo({ top: Math.max(0, nextTop), behavior });
    } else {
      el.scrollIntoView({ behavior, block: "start" });
    }

    el.setAttribute("data-preview-pulse", "");
    window.setTimeout(() => el.removeAttribute("data-preview-pulse"), 700);
  }, []);

  const value = useMemo(() => ({ scrollTo, telHref }), [scrollTo, telHref]);

  return <PreviewInteractContext.Provider value={value}>{children}</PreviewInteractContext.Provider>;
}

/** Safe outside provider (e.g. tests): scroll/tel are no-ops / undefined. */
export function usePreviewInteract(): PreviewInteractValue {
  const ctx = useContext(PreviewInteractContext);
  if (!ctx) {
    return { scrollTo: () => {}, telHref: undefined };
  }
  return ctx;
}
