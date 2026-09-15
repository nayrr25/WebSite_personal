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

/**
 * Aparición al entrar en pantalla. Usa `transform` como cadena (acelerado por
 * GPU) en lugar de la propiedad `y` de framer-motion, que corre en el hilo
 * principal. Con movimiento reducido solo hay un fundido de 150 ms.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, transform: `translateY(${reduce ? 0 : y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.15 : 0.5,
        ease: [0.23, 1, 0.32, 1],
        delay: reduce ? 0 : delay,
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
