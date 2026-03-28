"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    const apply = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 z-[55] h-0.5 overflow-hidden bg-[var(--color-border)]/35"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
      aria-hidden
    >
      <div
        className="h-full w-full origin-left bg-[var(--color-accent)] transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
