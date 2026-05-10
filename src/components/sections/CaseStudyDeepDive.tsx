"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";
import { institutions } from "@/content/caseStudy.sicop";
import { cn } from "@/lib/cn";
import {
  CheckCircle2,
  Database,
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  Eye,
  Gauge,
} from "lucide-react";

const AnomalyChart = dynamic(() => import("@/components/charts/AnomalyChart"), {
  ssr: false,
  loading: () => <div className="h-[260px] w-full animate-pulse rounded-md bg-bg-glass" />,
});
const RiskScoreGauge = dynamic(() => import("@/components/charts/RiskScoreGauge"), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full animate-pulse rounded-md bg-bg-glass" />,
});

// Static visual mapping — language-agnostic
const VISUAL_BY_ID: Record<string, string> = {
  challenge: "ChallengePoints",
  infrastructure: "InfrastructureDiagram",
  pipeline: "PipelineLink",
  anomaly: "AnomalyChart",
  risk: "RiskGauge",
  institutional: "InstitutionGrid",
  impact: "ImpactCards",
};

export default function CaseStudyDeepDive() {
  const t = useT();
  const [active, setActive] = useState<string>(t.sicop.sections[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace(/^cs-/, ""));
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );
    t.sicop.sections.forEach((s) => {
      const el = document.getElementById(`cs-${s.id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [t.sicop.sections]);

  return (
    <section id="case-study-deep-dive" className="relative py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr] md:gap-16">
          <aside className="hidden md:block">
            <nav aria-label={t.sicop.railTitle} className="sticky top-32 self-start">
              <p className="text-eyebrow mb-4">{t.sicop.railTitle}</p>
              <ol className="space-y-3 text-sm">
                {t.sicop.sections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#cs-${s.id}`}
                        className={cn(
                          "group flex items-baseline gap-3 rounded-md transition-colors duration-200 ease-smooth",
                          isActive
                            ? "text-text-primary"
                            : "text-text-muted hover:text-text-secondary",
                        )}
                      >
                        <span
                          className={cn(
                            "block h-px transition-all duration-300 ease-smooth",
                            isActive
                              ? "w-8 bg-accent-cyan"
                              : "w-4 bg-border-subtle group-hover:bg-border-strong",
                          )}
                        />
                        <span className="leading-tight">{s.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <div className="space-y-32">
            {t.sicop.sections.map((s) => (
              <article key={s.id} id={`cs-${s.id}`} className="scroll-mt-32">
                <Reveal>
                  <div className="text-eyebrow flex items-center gap-3">
                    <span className="tabular-nums text-accent-cyan">{s.number}</span>
                    <span className="h-px w-6 bg-border-strong" aria-hidden />
                    <span>{s.title}</span>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <h3 className="text-h2 mt-4 max-w-[20ch] text-text-primary">{s.lead}</h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-body mt-5 max-w-2xl">{s.body}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-8">
                    <SectionVisual visualId={VISUAL_BY_ID[s.id]} />
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionVisual({ visualId }: { visualId: string }) {
  const t = useT();
  switch (visualId) {
    case "ChallengePoints":
      return (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {t.sicop.challengePoints.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-md border border-border-subtle bg-bg-elevated/40 p-4"
            >
              <AlertTriangle
                aria-hidden
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-cyan"
              />
              <span className="text-sm text-text-secondary">{p}</span>
            </li>
          ))}
        </ul>
      );
    case "InfrastructureDiagram":
      return <InfrastructureDiagram />;
    case "PipelineLink":
      return (
        <a
          href="#pipeline"
          className="group inline-flex items-center gap-3 rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.04] px-5 py-4 text-sm text-text-primary transition-all duration-200 ease-smooth hover:border-accent-cyan/70 hover:shadow-glow"
        >
          <Database className="h-4 w-4 text-accent-cyan" aria-hidden />
          {t.sicop.pipelineLinkLabel}
          <ArrowRight
            aria-hidden
            className="h-4 w-4 text-accent-cyan transition-transform duration-200 ease-smooth group-hover:translate-x-1"
          />
        </a>
      );
    case "AnomalyChart":
      return (
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-eyebrow">{t.sicop.anomalyChartCaption}</span>
            <span className="inline-flex items-center gap-2 text-[11px] text-text-muted">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-accent-mint"
              />
              {t.sicop.anomalyChartLegend}
            </span>
          </div>
          <AnomalyChart />
        </GlassCard>
      );
    case "RiskGauge":
      return (
        <GlassCard className="p-6">
          <div className="mb-2 text-eyebrow">{t.sicop.riskGaugeTitle}</div>
          <RiskScoreGauge />
        </GlassCard>
      );
    case "InstitutionGrid":
      return <InstitutionGrid />;
    case "ImpactCards":
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {t.sicop.strategicImpact.map((card, i) => {
            const Icon = [Eye, Gauge, ShieldCheck][i];
            return (
              <GlassCard key={card.title} hoverable className="p-6">
                <Icon aria-hidden className="mb-4 h-5 w-5 text-accent-cyan" />
                <h4 className="text-h3 text-text-primary">{card.title}</h4>
                <p className="mt-3 text-sm text-text-secondary">{card.body}</p>
              </GlassCard>
            );
          })}
        </div>
      );
    default:
      return null;
  }
}

function InfrastructureDiagram() {
  const t = useT();
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-elevated/40 p-6">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="space-y-2">
          <div className="text-eyebrow">{t.sicop.infrastructure.sourcesLabel}</div>
          <ul className="space-y-1.5">
            {t.sicop.infrastructureSources.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2 rounded-md border border-border-subtle bg-bg-base/60 px-3 py-2 text-[12.5px] text-text-secondary"
              >
                <CheckCircle2 className="h-3 w-3 text-accent-cyan" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <ArrowRight
          aria-hidden
          className="hidden h-5 w-5 justify-self-center text-accent-cyan/60 md:block"
        />

        <div className="rounded-md border border-accent-cyan/30 bg-accent-cyan/[0.05] p-4">
          <div className="text-eyebrow">{t.sicop.infrastructure.ingestionTitle}</div>
          <ul className="mt-2 space-y-1 text-[12.5px] text-text-secondary">
            {t.sicop.infrastructure.ingestionItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <ArrowRight
          aria-hidden
          className="hidden h-5 w-5 justify-self-center text-accent-cyan/60 md:block"
        />

        <div className="rounded-md border border-accent-mint/30 bg-accent-mint/[0.04] p-4">
          <div className="text-eyebrow text-accent-mint">
            {t.sicop.infrastructure.unifiedTitle}
          </div>
          <p className="mt-2 text-[12.5px] text-text-secondary">
            {t.sicop.infrastructure.unifiedBody}
          </p>
        </div>
      </div>
    </div>
  );
}

function InstitutionGrid() {
  const t = useT();
  const tones: Record<string, string> = {
    low: "border-accent-mint/30 bg-accent-mint/[0.06] text-accent-mint",
    medium: "border-accent-cyan/30 bg-accent-cyan/[0.06] text-accent-cyan",
    high: "border-yellow-400/30 bg-yellow-400/[0.06] text-yellow-300",
    critical: "border-danger/40 bg-danger/[0.08] text-danger",
  };
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {institutions.map((inst) => (
        <div
          key={inst.name}
          className={cn(
            "relative overflow-hidden rounded-md border p-4 transition-transform duration-200 ease-smooth hover:-translate-y-0.5",
            tones[inst.tier],
          )}
        >
          <div className="text-[10px] uppercase tracking-eyebrow opacity-80">
            {t.sicop.institutionTiers[inst.tier]}
          </div>
          <div className="mt-2 text-[15px] font-medium text-text-primary">{inst.name}</div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-display-l !text-[36px] tabular-nums text-text-primary">
              {inst.score}
            </span>
            <span className="text-[11px] uppercase tracking-eyebrow text-text-muted">
              {t.sicop.institutionRiskLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
