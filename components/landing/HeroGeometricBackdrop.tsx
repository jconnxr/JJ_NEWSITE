"use client";

import { motion, useReducedMotion } from "framer-motion";

type Shape = {
  left: string;
  top: string;
  w: number;
  h: number;
  borderRadius: string;
  initialRotate: number;
  duration: number;
  delay: number;
  strokeClass: string;
  fillClass: string;
};

const SHAPES: Shape[] = [
  {
    left: "4%",
    top: "12%",
    w: 88,
    h: 88,
    borderRadius: "18%",
    initialRotate: -14,
    duration: 26,
    delay: 0,
    strokeClass: "border-[var(--color-accent)]/25",
    fillClass: "bg-[var(--color-accent)]/[0.04]",
  },
  {
    left: "78%",
    top: "8%",
    w: 64,
    h: 64,
    borderRadius: "50%",
    initialRotate: 0,
    duration: 22,
    delay: 0.4,
    strokeClass: "border-[var(--color-gold)]/20",
    fillClass: "bg-[var(--color-gold)]/[0.03]",
  },
  {
    left: "14%",
    top: "58%",
    w: 120,
    h: 48,
    borderRadius: "8px",
    initialRotate: 22,
    duration: 30,
    delay: 0.2,
    strokeClass: "border-[var(--color-accent)]/18",
    fillClass: "bg-transparent",
  },
  {
    left: "68%",
    top: "48%",
    w: 72,
    h: 72,
    borderRadius: "12px",
    initialRotate: 35,
    duration: 24,
    delay: 0.8,
    strokeClass: "border-[var(--color-navy)]/35",
    fillClass: "bg-[var(--color-navy)]/[0.06]",
  },
  {
    left: "42%",
    top: "6%",
    w: 40,
    h: 40,
    borderRadius: "50%",
    initialRotate: 0,
    duration: 18,
    delay: 1.1,
    strokeClass: "border-[var(--color-gold)]/30",
    fillClass: "bg-[var(--color-gold)]/[0.05]",
  },
  {
    left: "88%",
    top: "62%",
    w: 96,
    h: 32,
    borderRadius: "4px",
    initialRotate: -8,
    duration: 28,
    delay: 0.6,
    strokeClass: "border-[var(--color-accent)]/22",
    fillClass: "bg-transparent",
  },
  {
    left: "22%",
    top: "28%",
    w: 56,
    h: 56,
    borderRadius: "4px",
    initialRotate: 45,
    duration: 20,
    delay: 1.4,
    strokeClass: "border-white/12",
    fillClass: "bg-white/[0.02]",
  },
  {
    left: "52%",
    top: "52%",
    w: 48,
    h: 48,
    borderRadius: "50%",
    initialRotate: 0,
    duration: 21,
    delay: 0.3,
    strokeClass: "border-[var(--color-accent)]/15",
    fillClass: "bg-transparent",
  },
  {
    left: "6%",
    top: "78%",
    w: 76,
    h: 76,
    borderRadius: "30%",
    initialRotate: 12,
    duration: 32,
    delay: 0.9,
    strokeClass: "border-[var(--color-gold)]/15",
    fillClass: "bg-[var(--color-gold)]/[0.02]",
  },
  {
    left: "72%",
    top: "28%",
    w: 32,
    h: 96,
    borderRadius: "6px",
    initialRotate: 6,
    duration: 25,
    delay: 1.8,
    strokeClass: "border-white/10",
    fillClass: "bg-transparent",
  },
];

export function HeroGeometricBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute border ${s.strokeClass} ${s.fillClass}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.w,
            height: s.h,
            borderRadius: s.borderRadius,
          }}
          animate={
            reduceMotion
              ? { rotate: s.initialRotate, x: 0, y: 0 }
              : {
                  y: [0, -18, 8, 0],
                  x: [0, 10, -6, 0],
                  rotate: [s.initialRotate, s.initialRotate + 6, s.initialRotate - 4, s.initialRotate],
                }
          }
          transition={{
            duration: s.duration,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
