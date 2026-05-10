"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/motion/Reveal";
import { demos, type Demo } from "@/content/demos";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

const statusTone: Record<Demo["status"], "live" | "build" | "concept"> = {
  Live: "live",
  "In Build": "build",
  Concept: "concept",
};

export default function DemoShowcase() {
  return (
    <Section id="demos">
      <Reveal>
        <Eyebrow>Demos</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-5 max-w-[18ch] text-text-primary">
          Working systems and the ones we&rsquo;re building next.
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-body mt-5 max-w-2xl">
          Production deployments and design-stage prototypes. Each demo answers a real
          question for a real audience.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, i) => (
          <Reveal key={demo.slug} delay={i * 0.05}>
            <DemoCard demo={demo} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function DemoCard({ demo }: { demo: Demo }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={`#${demo.slug}`}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated/60 p-6 backdrop-blur-md",
        "transition-all duration-300 ease-smooth hover:border-accent-cyan/40 hover:shadow-glow",
        demo.span === 2 && "lg:col-span-2",
      )}
    >
      {/* Sheen sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent-cyan/[0.06] to-transparent transition-transform duration-700 ease-smooth group-hover:translate-x-full"
      />

      <div className="relative flex items-start justify-between gap-4">
        <Badge tone={statusTone[demo.status]} pulse={demo.status === "Live"}>
          {demo.status}
        </Badge>
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 text-text-muted transition-all duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan"
        />
      </div>

      <h3 className="text-h3 relative mt-6 max-w-[28ch] text-text-primary">
        {demo.title}
      </h3>
      <p className="text-body-sm relative mt-2 max-w-md text-[14px]">{demo.description}</p>

      <div className="relative mt-6 flex-1">
        <DemoPreview kind={demo.preview} />
      </div>

      <div className="relative mt-6 flex items-center gap-2 text-[12px] text-accent-cyan/80 transition-colors duration-200 ease-smooth group-hover:text-accent-cyan">
        View case study
        <ArrowUpRight aria-hidden className="h-3 w-3" />
      </div>
    </motion.a>
  );
}

/** Inline mini visuals for each demo card. Pure SVG, low cost. */
function DemoPreview({ kind }: { kind: Demo["preview"] }) {
  switch (kind) {
    case "anomaly":
      return (
        <svg viewBox="0 0 240 80" className="block w-full" aria-hidden>
          <defs>
            <linearGradient id="prevA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5EE9F0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5EE9F0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 L20 50 L40 56 L60 42 L80 48 L100 38 L120 52 L140 30 L160 44 L180 36 L200 50 L220 28 L240 40"
            stroke="#5EE9F0"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 60 L20 50 L40 56 L60 42 L80 48 L100 38 L120 52 L140 30 L160 44 L180 36 L200 50 L220 28 L240 40 L240 80 L0 80 Z"
            fill="url(#prevA)"
          />
          <circle cx="100" cy="38" r="4" fill="#7CF5C4" />
          <circle cx="100" cy="38" r="9" fill="#7CF5C4" opacity="0.18" />
          <circle cx="220" cy="28" r="4" fill="#7CF5C4" />
          <circle cx="220" cy="28" r="9" fill="#7CF5C4" opacity="0.18" />
        </svg>
      );
    case "heat":
      return (
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }).map((_, i) => {
            const intensity = (Math.sin(i * 0.7) + 1) / 2;
            return (
              <div
                key={i}
                className="aspect-square rounded-[2px]"
                style={{
                  background: `rgba(94,233,240,${(intensity * 0.7).toFixed(2)})`,
                }}
              />
            );
          })}
        </div>
      );
    case "flow":
      return (
        <svg viewBox="0 0 240 80" className="block w-full" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <circle cx={20 + i * 40} cy={40} r="3" fill="#5EE9F0" />
              {i < 5 && (
                <line
                  x1={20 + i * 40}
                  y1={40}
                  x2={60 + i * 40}
                  y2={40}
                  stroke="rgba(94,233,240,0.4)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              )}
            </g>
          ))}
          {[15, 35, 55].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y}
              x2="240"
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
        </svg>
      );
    case "decision":
      return (
        <svg viewBox="0 0 240 80" className="block w-full" aria-hidden>
          <rect
            x="20"
            y="30"
            width="40"
            height="20"
            rx="4"
            fill="rgba(94,233,240,0.10)"
            stroke="#5EE9F0"
            strokeWidth="1"
          />
          <line x1="60" y1="40" x2="100" y2="20" stroke="rgba(94,233,240,0.5)" strokeWidth="1" />
          <line x1="60" y1="40" x2="100" y2="60" stroke="rgba(94,233,240,0.5)" strokeWidth="1" />
          <rect x="100" y="10" width="40" height="20" rx="4" fill="rgba(94,233,240,0.10)" stroke="#5EE9F0" strokeWidth="1" />
          <rect x="100" y="50" width="40" height="20" rx="4" fill="rgba(124,245,196,0.12)" stroke="#7CF5C4" strokeWidth="1" />
          <line x1="140" y1="60" x2="180" y2="40" stroke="rgba(124,245,196,0.5)" strokeWidth="1" />
          <rect x="180" y="30" width="40" height="20" rx="4" fill="rgba(124,245,196,0.16)" stroke="#7CF5C4" strokeWidth="1" />
        </svg>
      );
    case "graph":
      return (
        <svg viewBox="0 0 240 80" className="block w-full" aria-hidden>
          {[
            [40, 20], [80, 50], [120, 18], [160, 52], [200, 22],
            [60, 60], [100, 30], [140, 60], [180, 30],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#5EE9F0" />
          ))}
          {[
            [40, 20, 80, 50],
            [80, 50, 120, 18],
            [120, 18, 160, 52],
            [160, 52, 200, 22],
            [60, 60, 100, 30],
            [100, 30, 140, 60],
            [140, 60, 180, 30],
            [80, 50, 100, 30],
            [120, 18, 100, 30],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(94,233,240,0.3)"
              strokeWidth="1"
            />
          ))}
        </svg>
      );
  }
}
