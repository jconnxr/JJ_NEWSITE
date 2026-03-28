"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "surface" | "deep";

type SectionFlowAccentProps = {
  /** Offsets motion timing so sections do not pulse in sync */
  phase?: number;
  /** Corner for the micro network graphic */
  side?: "left" | "right";
  /** Set false when the section already has its own mesh (e.g. Bridge, Contact) */
  blobs?: boolean;
  /** `surface`: cream/paper sections. `deep`: navy gradient (Contact). */
  variant?: Variant;
};

export function SectionFlowAccent({
  phase = 0,
  side = "left",
  blobs = true,
  variant = "surface",
}: SectionFlowAccentProps) {
  const reduceMotion = useReducedMotion();
  const p = phase % 6;
  const durA = 36 + p * 3;
  const durB = 30 + (p % 3) * 4;
  const delay = p * 0.4;

  const isDeep = variant === "deep";
  const strokeMuted = isDeep ? "rgba(255,255,255,0.11)" : "rgba(100, 150, 200, 0.14)";
  const strokeAccent = isDeep ? "rgba(170, 205, 235, 0.22)" : "rgba(120, 170, 220, 0.18)";
  const nodeFill = isDeep ? "rgba(200, 220, 245, 0.45)" : "var(--color-accent)";

  const blobA = isDeep
    ? "radial-gradient(circle at 40% 40%, rgba(120, 170, 220, 0.12) 0%, transparent 62%)"
    : "radial-gradient(circle at 40% 40%, rgba(120, 170, 220, 0.14) 0%, transparent 64%)";
  const blobB = isDeep
    ? "radial-gradient(circle at 55% 45%, rgba(40, 70, 110, 0.35) 0%, transparent 58%)"
    : "radial-gradient(circle at 55% 45%, rgba(30, 58, 95, 0.12) 0%, transparent 62%)";

  const sideClass =
    side === "left"
      ? "absolute -left-[10%] top-0 h-[min(72%,420px)] w-[min(48vw,220px)] sm:-left-[6%] sm:w-[200px]"
      : "absolute -right-[10%] top-0 h-[min(72%,420px)] w-[min(48vw,220px)] sm:-right-[6%] sm:w-[200px]";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {blobs ? (
        <>
          <motion.div
            className="absolute -left-[20%] top-[8%] h-[min(42vh,320px)] w-[min(70vw,380px)] rounded-full blur-3xl"
            style={{ background: blobA }}
            animate={
              reduceMotion
                ? { x: 0, y: 0, opacity: 0.75 }
                : {
                    x: [0, 18, -10, 0],
                    y: [0, 14, -8, 0],
                    opacity: [0.45, 0.72, 0.52, 0.45],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: durA, repeat: Infinity, ease: "easeInOut", delay }
            }
          />
          <motion.div
            className="absolute -bottom-[12%] -right-[18%] h-[min(36vh,280px)] w-[min(62vw,340px)] rounded-full blur-3xl"
            style={{ background: blobB }}
            animate={
              reduceMotion
                ? { x: 0, y: 0, opacity: 0.55 }
                : {
                    x: [0, -16, 12, 0],
                    y: [0, -12, 8, 0],
                    opacity: [0.35, 0.58, 0.42, 0.35],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: durB, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }
            }
          />
        </>
      ) : null}

      <svg
        className={`${sideClass} opacity-[0.42] sm:opacity-50`}
        viewBox="0 0 240 520"
        preserveAspectRatio="xMinYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 36 48 L 118 132"
          fill="none"
          stroke={strokeMuted}
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {!reduceMotion ? (
          <motion.path
            d="M 118 132 L 52 268"
            fill="none"
            stroke={strokeAccent}
            strokeWidth={1}
            strokeLinecap="round"
            strokeOpacity={0.9}
            vectorEffect="non-scaling-stroke"
            strokeDasharray="8 14"
            animate={{ strokeDashoffset: [0, -44] }}
            transition={{
              duration: 4.8 + (p % 3) * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: p * 0.15,
            }}
          />
        ) : (
          <path
            d="M 118 132 L 52 268"
            fill="none"
            stroke={strokeAccent}
            strokeWidth={1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
        <path
          d="M 52 268 L 188 392"
          fill="none"
          stroke={strokeMuted}
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 188 392 L 96 472"
          fill="none"
          stroke={strokeMuted}
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {[
          { cx: 36, cy: 48 },
          { cx: 118, cy: 132 },
          { cx: 52, cy: 268 },
          { cx: 188, cy: 392 },
          { cx: 96, cy: 472 },
        ].map((n, i) => (
          <motion.circle
            key={`${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            r={reduceMotion ? 2.2 : 2.5}
            fill={nodeFill}
            fillOpacity={reduceMotion ? 0.4 : 0.5}
            animate={
              reduceMotion
                ? { fillOpacity: 0.4 }
                : { fillOpacity: [0.25, 0.55, 0.28, 0.25] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 3.4 + (i % 3) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + i * 0.12,
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
}
