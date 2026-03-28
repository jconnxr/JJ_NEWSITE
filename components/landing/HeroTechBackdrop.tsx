"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Hub-and-spoke style network; viewBox coordinates */
const NODES: { cx: number; cy: number; delay: number }[] = [
  { cx: 90, cy: 200, delay: 0 },
  { cx: 260, cy: 110, delay: 0.15 },
  { cx: 420, cy: 260, delay: 0.3 },
  { cx: 560, cy: 95, delay: 0.05 },
  { cx: 700, cy: 210, delay: 0.25 },
  { cx: 860, cy: 125, delay: 0.4 },
  { cx: 1040, cy: 240, delay: 0.2 },
  { cx: 140, cy: 540, delay: 0.35 },
  { cx: 400, cy: 620, delay: 0.1 },
  { cx: 600, cy: 410, delay: 0 },
  { cx: 760, cy: 560, delay: 0.45 },
  { cx: 980, cy: 520, delay: 0.28 },
];

const PATHS: { d: string; dash: boolean; gold?: boolean }[] = [
  { d: "M90 200 L260 110", dash: true },
  { d: "M260 110 L420 260", dash: true },
  { d: "M260 110 L560 95", dash: false },
  { d: "M560 95 L700 210", dash: true },
  { d: "M700 210 L860 125", dash: true },
  { d: "M860 125 L1040 240", dash: false },
  { d: "M420 260 L600 410", dash: true },
  { d: "M700 210 L600 410", dash: true },
  { d: "M140 540 L400 620", dash: true },
  { d: "M400 620 L600 410", dash: false },
  { d: "M600 410 L760 560", dash: true },
  { d: "M760 560 L980 520", dash: true },
  { d: "M90 200 L140 540", dash: false },
  { d: "M1040 240 L980 520", dash: false, gold: true },
];

export function HeroTechBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Aurora / mesh blobs */}
      <motion.div
        className="absolute -left-[12%] -top-[18%] h-[min(68vh,500px)] w-[min(92vw,580px)] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(120, 170, 220, 0.22) 0%, transparent 62%)",
        }}
        animate={
          reduceMotion
            ? { x: 0, y: 0, scale: 1, opacity: 0.85 }
            : {
                x: [0, 28, -14, 0],
                y: [0, 20, -12, 0],
                scale: [1, 1.06, 1.02, 1],
                opacity: [0.75, 0.95, 0.8, 0.75],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 34, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="absolute -bottom-[20%] -right-[8%] h-[min(58vh,440px)] w-[min(80vw,500px)] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 55% 45%, rgba(30, 58, 95, 0.35) 0%, transparent 60%)",
        }}
        animate={
          reduceMotion
            ? { x: 0, y: 0, opacity: 0.7 }
            : {
                x: [0, -22, 16, 0],
                y: [0, -16, 10, 0],
                opacity: [0.55, 0.78, 0.62, 0.55],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 28, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
        }
      />
      <motion.div
        className="absolute left-[25%] top-[35%] h-[min(45vh,320px)] w-[min(70vw,420px)] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at center, rgba(196, 168, 106, 0.09) 0%, transparent 58%)",
        }}
        animate={
          reduceMotion
            ? { scale: 1, opacity: 0.6 }
            : {
                scale: [1, 1.12, 1.04, 1],
                opacity: [0.45, 0.65, 0.5, 0.45],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 38, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
        }
      />

      {/* Network SVG */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity={0.95}>
          {PATHS.map((p, i) => {
            const strokeClass = p.gold ? "stroke-[var(--color-gold)]" : "stroke-[var(--color-accent)]";
            const baseStroke = p.gold ? "rgba(196,168,106,0.22)" : "rgba(142,179,212,0.2)";
            if (!p.dash || reduceMotion) {
              return (
                <path
                  key={i}
                  d={p.d}
                  fill="none"
                  stroke={baseStroke}
                  strokeWidth={1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              );
            }
            return (
              <motion.path
                key={i}
                d={p.d}
                fill="none"
                className={strokeClass}
                strokeWidth={1}
                strokeLinecap="round"
                strokeOpacity={0.35}
                vectorEffect="non-scaling-stroke"
                strokeDasharray="10 18"
                animate={{ strokeDashoffset: [0, -56] }}
                transition={{
                  duration: 5.5 + (i % 3) * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.12,
                }}
              />
            );
          })}
        </g>
        {NODES.map((n, i) => (
          <motion.circle
            key={`n-${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            r={reduceMotion ? 2.5 : 2.8}
            fill="var(--color-accent)"
            fillOpacity={reduceMotion ? 0.45 : 0.55}
            animate={
              reduceMotion
                ? { fillOpacity: 0.45 }
                : { fillOpacity: [0.28, 0.65, 0.32, 0.28], r: [2.5, 3.2, 2.5] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 3.2 + (i % 4) * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: n.delay,
                  }
            }
          />
        ))}
      </svg>

      {/* Slow vertical scan */}
      <motion.div
        className="absolute left-0 right-0 h-[min(28%,220px)] bg-gradient-to-b from-transparent via-[var(--color-accent)]/[0.09] to-transparent"
        initial={false}
        animate={
          reduceMotion
            ? { top: "38%" }
            : { top: ["-25%", "105%"] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 13, repeat: Infinity, ease: "linear", repeatDelay: 2.2 }
        }
      />
    </div>
  );
}
