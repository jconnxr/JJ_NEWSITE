"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Stagger({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: Props) {
  return (
    <motion.div className={className} variants={child}>
      {children}
    </motion.div>
  );
}
