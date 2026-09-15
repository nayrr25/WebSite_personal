"use client";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { CASE_SICOP_PATH } from "@/lib/routes";
import { demoStatic, type DemoPreview, type DemoStatus } from "@/content/demos";

const TONE: Record<DemoStatus, "live" | "build" | "concept"> = {
  Live: "live",
  "In Build": "build",
  Concept: "concept",
};

export default function DemoShowcase() {
  const { lang, t } = useLanguage();

  return (
    <Section id="demos">
      <Reveal>
        <p className="text-eyebrow">{t.demosSection.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{t.demosSection.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-body mt-4 max-w-[62ch]">{t.demosSection.body}</p>
      </Reveal>

      <div className="mt-8 grid gap-3.5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
        {t.demos.map((demo, i) => {
          const preview = demoStatic[i].preview;
          return (
            <Reveal key={demo.slug} delay={(i % 3) * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-[transform,border-color] sm:min-h-[300px] sm:p-6 duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <Badge tone={TONE[demo.status]}>{t.statusLabels[demo.status]}</Badge>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink">{demo.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{demo.description}</p>
                <div className="mt-auto pt-4 sm:pt-5">
                  <PreviewVisual kind={preview} />
                </div>
                {preview === "anomaly" && (
                  <a
                    href={CASE_SICOP_PATH[lang]}
                    className="group mt-3.5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-cyan"
                  >
                    {t.demosSection.cta}
                    <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
                      →
                    </span>
                  </a>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function PreviewVisual({ kind }: { kind: DemoPreview }) {
  const svg = "block h-auto max-h-[64px] w-full sm:max-h-[84px]";
  switch (kind) {
    case "anomaly":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <defs>
            <linearGradient id="demo-anomaly" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4F86E6" stopOpacity="0.4" />
              <stop offset="1" stopColor="#4F86E6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 46 L24 40 L48 44 L72 34 L96 38 L120 30 L144 40 L168 22 L192 34 L216 12 L240 26 L240 64 L0 64Z" fill="url(#demo-anomaly)" />
          <polyline points="0,46 24,40 48,44 72,34 96,38 120,30 144,40 168,22 192,34 216,12 240,26" fill="none" stroke="#8FB4FF" strokeWidth="1.8" />
          <circle cx="216" cy="12" r="4" fill="#FF6B78" />
          <circle cx="168" cy="22" r="4" fill="#FF6B78" />
        </svg>
      );
    case "automation":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g fill="none" stroke="rgba(143,180,255,0.55)">
            <path d="M14 10h36M14 32h36M14 54h36M50 10l28 22M50 54l28-22M50 32h28M104 32h14" />
          </g>
          <g fill="#8FB4FF">
            <circle cx="10" cy="10" r="4" />
            <circle cx="10" cy="32" r="4" />
            <circle cx="10" cy="54" r="4" />
          </g>
          <rect x="80" y="22" width="24" height="20" rx="4" fill="#35E0FF" fillOpacity="0.85" />
          <g fill="#8FB4FF" fillOpacity="0.8">
            <rect x="124" y="40" width="10" height="20" />
            <rect x="138" y="30" width="10" height="30" />
            <rect x="152" y="34" width="10" height="26" />
            <rect x="166" y="22" width="10" height="38" />
          </g>
          <path d="M176 22l16-6 16-4 16-6" fill="none" stroke="#35E0FF" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      );
    case "decision":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g fill="rgba(143,180,255,0.12)" stroke="#8FB4FF">
            <rect x="8" y="22" width="44" height="20" rx="4" />
            <rect x="104" y="6" width="44" height="20" rx="4" />
            <rect x="104" y="38" width="44" height="20" rx="4" />
          </g>
          <path d="M52 32h28M80 32l24-16M80 32l24 16M148 48h40" stroke="rgba(143,180,255,0.5)" fill="none" />
          <rect x="188" y="38" width="44" height="20" rx="4" fill="rgba(53,224,255,0.2)" stroke="#35E0FF" />
        </svg>
      );
    case "heat":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          {Array.from({ length: 36 }, (_, i) => {
            // Patrón fijo (seno), no datos: es una ilustración de la demo en construcción.
            const intensity = (Math.sin(i * 0.7) + 1) / 2;
            const peak = intensity > 0.93;
            return (
              <rect
                key={i}
                x={(i % 12) * 20}
                y={Math.floor(i / 12) * 21}
                width="18"
                height="19"
                rx="3"
                fill={peak ? "#35E0FF" : "#8FB4FF"}
                fillOpacity={peak ? 1 : 0.1 + intensity * 0.6}
              />
            );
          })}
        </svg>
      );
    case "consumer":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g fill="#8FB4FF" fillOpacity="0.55">
            <rect x="0" y="40" width="30" height="24" rx="3" />
            <rect x="40" y="26" width="30" height="38" rx="3" />
            <rect x="120" y="30" width="30" height="34" rx="3" />
            <rect x="160" y="44" width="30" height="20" rx="3" />
            <rect x="200" y="36" width="30" height="28" rx="3" />
          </g>
          <rect x="80" y="10" width="30" height="54" rx="3" fill="#35E0FF" />
        </svg>
      );
    case "graph":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g stroke="rgba(143,180,255,0.35)">
            <line x1="30" y1="14" x2="80" y2="44" />
            <line x1="80" y1="44" x2="130" y2="14" />
            <line x1="130" y1="14" x2="180" y2="46" />
            <line x1="180" y1="46" x2="220" y2="18" />
            <line x1="55" y1="54" x2="105" y2="26" />
            <line x1="105" y1="26" x2="155" y2="54" />
          </g>
          <g fill="#8FB4FF">
            <circle cx="30" cy="14" r="4" />
            <circle cx="80" cy="44" r="4" />
            <circle cx="130" cy="14" r="4" />
            <circle cx="180" cy="46" r="4" />
            <circle cx="55" cy="54" r="4" />
            <circle cx="105" cy="26" r="4" />
            <circle cx="155" cy="54" r="4" />
          </g>
          <circle cx="220" cy="18" r="5" fill="#35E0FF" />
        </svg>
      );
  }
}
