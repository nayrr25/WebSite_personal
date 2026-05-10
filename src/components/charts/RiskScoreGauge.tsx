"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { useT } from "@/lib/i18n";

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS_OUTER = 120;
const RADIUS_INNER = 60;
const SEGMENT_GAP_DEG = 6;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

function arcPath(start: number, end: number, r1: number, r2: number) {
  const [x1, y1] = polar(CENTER, CENTER, r2, start);
  const [x2, y2] = polar(CENTER, CENTER, r2, end);
  const [x3, y3] = polar(CENTER, CENTER, r1, end);
  const [x4, y4] = polar(CENTER, CENTER, r1, start);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r2} ${r2} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${r1} ${r1} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

export default function RiskScoreGauge() {
  const reduce = useReducedMotion();
  const t = useT();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const dims = t.sicop.riskDimensions;
  const SEGMENT_DEG = 360 / dims.length;
  const ARC_DEG = SEGMENT_DEG - SEGMENT_GAP_DEG;
  const composite = Math.round(dims.reduce((s, d) => s + d.value, 0) / dims.length);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative">
        <svg
          ref={ref}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block"
          aria-label={t.sicop.riskGaugeTitle}
          role="img"
        >
          <defs>
            <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5EE9F0" />
              <stop offset="100%" stopColor="#7CF5C4" />
            </linearGradient>
          </defs>
          {dims.map((_, i) => {
            const start = i * SEGMENT_DEG + SEGMENT_GAP_DEG / 2;
            const end = start + ARC_DEG;
            return (
              <path
                key={`track-${i}`}
                d={arcPath(start, end, RADIUS_INNER, RADIUS_OUTER)}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            );
          })}

          {dims.map((d, i) => {
            const start = i * SEGMENT_DEG + SEGMENT_GAP_DEG / 2;
            const end = start + ARC_DEG;
            const valueR = RADIUS_INNER + ((RADIUS_OUTER - RADIUS_INNER) * d.value) / 100;
            return (
              <motion.path
                key={`val-${i}`}
                d={arcPath(start, end, RADIUS_INNER, valueR)}
                fill="url(#riskGrad)"
                opacity={0.85}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.85 } : {}}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduce ? 0 : i * 0.08,
                }}
              />
            );
          })}

          {dims.map((d, i) => {
            const mid = i * SEGMENT_DEG + SEGMENT_DEG / 2;
            const [lx, ly] = polar(CENTER, CENTER, RADIUS_OUTER + 16, mid);
            return (
              <text
                key={`lbl-${i}`}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="#A6ADBB"
                style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {d.label.split(" ")[0]}
              </text>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] uppercase tracking-eyebrow text-text-muted">
            {t.sicop.riskCompositeLabel}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: reduce ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: reduce ? 0 : 0.7,
            }}
            className="text-display-l tracking-display tabular-nums text-text-primary"
          >
            {composite}
          </motion.div>
          <div className="text-[10px] uppercase tracking-eyebrow text-accent-cyan">
            {t.sicop.riskIndexLabel}
          </div>
        </div>
      </div>

      <ul className="grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-1.5 text-[12px]">
        {dims.map((d) => (
          <li key={d.label} className="flex items-center justify-between text-text-secondary">
            <span className="truncate">{d.label}</span>
            <span className="tabular-nums text-text-primary">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
