"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  /** seconds between children */
  delayStep?: number;
  initialDelay?: number;
  y?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className,
  delayStep = 0.06,
  initialDelay = 0.05,
  once = true,
}: StaggerChildrenProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : delayStep,
            delayChildren: reduce ? 0 : initialDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export default StaggerChildren;
