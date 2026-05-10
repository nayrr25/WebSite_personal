"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface KpiCardProps {
  value: string;
  label: string;
  suffix?: string;
  className?: string;
  delay?: number;
}

/** Parse the value string into [prefix, numeric, suffix] for count-up. */
function decompose(value: string) {
  const match = value.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
  if (!match) return { prefix: "", num: NaN, suffix: value };
  const num = parseFloat(match[2].replace(/,/g, ""));
  return { prefix: match[1], num, suffix: match[3] };
}

function formatNumber(n: number, original: string) {
  // Preserve "M", "K", decimals, separators by mirroring the source pattern.
  if (original.includes(".")) {
    const decimals = original.split(".")[1]?.replace(/[^0-9]/g, "").length ?? 1;
    return n.toFixed(decimals);
  }
  return Math.round(n).toLocaleString("en-US");
}

export default function KpiCard({
  value,
  label,
  suffix,
  className,
  delay = 0,
}: KpiCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState<string>(reduce ? value : "");

  const { prefix, num, suffix: parsedSuffix } = decompose(value);
  const finalSuffix = suffix ?? parsedSuffix;

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    if (Number.isNaN(num)) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${prefix}${formatNumber(num * eased, value)}${finalSuffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, num, prefix, finalSuffix, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reduce ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : delay,
      }}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated/60 p-6 backdrop-blur-md",
        "transition-colors duration-300 ease-smooth hover:border-accent-cyan/30",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
      />
      <div className="text-display-l tracking-display text-text-primary tabular-nums">
        {display || " "}
      </div>
      <div className="mt-3 text-[12px] uppercase tracking-eyebrow text-text-muted">
        {label}
      </div>
    </motion.div>
  );
}
