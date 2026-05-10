"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import GlassCard from "@/components/ui/GlassCard";
import KpiCard from "@/components/ui/KpiCard";
import Reveal from "@/components/motion/Reveal";
import GridGlow from "@/components/backgrounds/GridGlow";
import { sicop } from "@/content/caseStudy.sicop";
import { motion, useReducedMotion } from "framer-motion";

export default function CaseStudyHero() {
  const reduce = useReducedMotion();

  return (
    <Section id="case-study" className="relative overflow-hidden">
      <GridGlow />
      <div className="relative">
        <Reveal>
          <Eyebrow>{sicop.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-display-l mt-5 max-w-[18ch] text-text-primary">
            {sicop.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-body mt-5 max-w-2xl">{sicop.subtitle}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <GlassCard className="mt-14 grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:p-12">
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-3">
                <div className="text-eyebrow">Architecture Preview</div>
                <p className="text-body-sm max-w-md">
                  Sources flow into the pipeline; the pipeline emits intelligence;
                  intelligence powers the executive surface — every component traceable
                  end-to-end.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px]">
                {[
                  ["Sources", "Solicitations · Awards · Contracts"],
                  ["Pipeline", "7 stages · Replayable · Audited"],
                  ["AI Layer", "47 patterns · Explainable scoring"],
                  ["Outputs", "Risk index · Triage · Drilldown"],
                ].map(([k, v]) => (
                  <li key={k} className="flex flex-col">
                    <span className="text-eyebrow">{k}</span>
                    <span className="mt-1 text-text-secondary">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ArchitecturePreview reduceMotion={!!reduce} />
          </GlassCard>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sicop.kpis.map((kpi, i) => (
            <KpiCard
              key={kpi.label}
              value={kpi.value}
              label={kpi.label}
              suffix={kpi.suffix}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ArchitecturePreview({ reduceMotion }: { reduceMotion: boolean }) {
  // 4 columns: Sources, Pipeline, AI, Outputs — connected by animated luminous lines
  const t = (delay: number) => ({
    duration: reduceMotion ? 0 : 1.2,
    ease: [0.22, 1, 0.36, 1],
    delay: reduceMotion ? 0 : delay,
  });

  return (
    <div className="relative h-[320px] w-full">
      <svg viewBox="0 0 480 320" className="block h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="connector" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5EE9F0" stopOpacity="0" />
            <stop offset="40%" stopColor="#5EE9F0" stopOpacity="1" />
            <stop offset="100%" stopColor="#7CF5C4" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="nodeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(94,233,240,0.10)" />
            <stop offset="100%" stopColor="rgba(94,233,240,0.02)" />
          </linearGradient>
        </defs>

        {/* connectors */}
        {[1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M ${60 + (i - 1) * 120} 160 L ${180 + (i - 1) * 120} 160`}
            stroke="url(#connector)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={t(0.3 + i * 0.18)}
          />
        ))}

        {/* nodes */}
        {[
          { x: 30, label: "Sources", sub: "SICOP" },
          { x: 150, label: "Pipeline", sub: "7-stage" },
          { x: 270, label: "AI Layer", sub: "Anomaly + Risk" },
          { x: 390, label: "Outputs", sub: "Executive" },
        ].map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={t(0.15 + i * 0.18)}
          >
            <rect
              x={n.x}
              y={120}
              width={60}
              height={80}
              rx={10}
              fill="url(#nodeFill)"
              stroke="rgba(94,233,240,0.4)"
              strokeWidth="1"
            />
            {/* dotted records */}
            {[0, 1, 2, 3].map((d) => (
              <line
                key={d}
                x1={n.x + 12}
                y1={138 + d * 12}
                x2={n.x + 48}
                y2={138 + d * 12}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            ))}
            <text
              x={n.x + 30}
              y={104}
              textAnchor="middle"
              fontSize="11"
              fill="#F5F7FA"
            >
              {n.label}
            </text>
            <text
              x={n.x + 30}
              y={222}
              textAnchor="middle"
              fontSize="9"
              fill="#A6ADBB"
              style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              {n.sub}
            </text>
          </motion.g>
        ))}

        {/* ambient nodes / signals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const cx = 30 + (i * 480) / 8 + (i % 2) * 12;
          const cy = 50 + (i % 3) * 14;
          return (
            <circle
              key={`amb-${i}`}
              cx={cx}
              cy={cy}
              r={1.5}
              fill="#5EE9F0"
              opacity={0.45}
            />
          );
        })}
      </svg>
    </div>
  );
}
