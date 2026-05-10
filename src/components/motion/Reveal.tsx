"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "header" | "article" | "li" | "span";
  once?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : delay,
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
