"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
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
