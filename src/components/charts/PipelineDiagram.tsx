"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { pipelineNodes } from "@/content/caseStudy.sicop";
import { cn } from "@/lib/cn";

interface PipelineDiagramProps {
  /** layout — desktop is horizontal, mobile vertical (we expose both at compile time via CSS) */
  className?: string;
}

const NODES = pipelineNodes;
const W = 1280;
const H = 220;
const PADX = 60;
const Y = H / 2;
const STEP = (W - PADX * 2) / (NODES.length - 1);

export default function PipelineDiagram({ className }: PipelineDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const drawn = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Desktop horizontal pipeline */}
      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          aria-label="Seven-stage intelligence pipeline diagram"
          role="img"
        >
          <defs>
            <linearGradient id="pipeStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5EE9F0" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#5EE9F0" stopOpacity="1" />
              <stop offset="100%" stopColor="#7CF5C4" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="pipeGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#5EE9F0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#5EE9F0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* base track */}
          <line
            x1={PADX}
            y1={Y}
            x2={W - PADX}
            y2={Y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />

          {/* drawn line driven by scroll */}
          <motion.line
            x1={PADX}
            y1={Y}
            x2={W - PADX}
            y2={Y}
            stroke="url(#pipeStroke)"
            strokeWidth={2}
            style={{ pathLength: drawn }}
          />

          {NODES.map((n, i) => {
            const cx = PADX + i * STEP;
            return (
              <motion.g
                key={n.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <circle cx={cx} cy={Y} r={28} fill="url(#pipeGlow)" />
                <circle
                  cx={cx}
                  cy={Y}
                  r={9}
                  fill="#0C1014"
                  stroke="#5EE9F0"
                  strokeWidth={1.5}
                />
                <circle cx={cx} cy={Y} r={3.5} fill="#7CF5C4" />
                <text
                  x={cx}
                  y={Y - 38}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#F5F7FA"
                  style={{ letterSpacing: "0.04em" }}
                >
                  {n.label}
                </text>
                <text
                  x={cx}
                  y={Y + 50}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6B7280"
                  style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Mobile vertical stepper */}
      <ol className="md:hidden flex flex-col gap-4">
        {NODES.map((n, i) => (
          <motion.li
            key={n.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: reduce ? 0 : 0.45,
              delay: reduce ? 0 : i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex gap-4 rounded-md border border-border-subtle bg-bg-elevated/60 p-4"
          >
            <div className="flex-shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-accent-cyan/40 bg-accent-cyan/[0.06] text-[10px] tabular-nums text-accent-cyan">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">{n.label}</div>
              <div className="mt-1 text-[12px] text-text-secondary">{n.description}</div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
