"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

interface MagneticHoverProps {
  children: ReactNode;
  className?: string;
  /** strength — higher pulls cursor more aggressively */
  strength?: number;
}

export default function MagneticHover({
  children,
  className,
  strength = 0.25,
}: MagneticHoverProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
