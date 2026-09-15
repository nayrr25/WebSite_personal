"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import BarList from "@/components/charts/BarList";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { homeAnchor } from "@/lib/routes";
import {
  caseFacts,
  compositeScore,
  institutions,
  riskDimensions,
  tierCounts,
  type RiskTier,
} from "@/content/data/sicop";

const TIER_STYLE: Record<RiskTier, string> = {
  low: "border-accent-cyan/30 text-accent-cyan",
  medium: "border-accent/30 text-accent",
  high: "border-warn/35 text-warn",
  critical: "border-alert/40 text-alert",
};

type SectionId = "summary" | "challenge" | "architecture" | "ai" | "institutions" | "impact";
const SECTION_IDS: SectionId[] = ["summary", "challenge", "architecture", "ai", "institutions", "impact"];

export default function CaseSicop() {
  const { lang, t } = useLanguage();
  const c = t.caseSicop;
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState<SectionId>("summary");
  const counts = tierCounts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id.replace(/^cs-/, "") as SectionId);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(`cs-${id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="relative overflow-hidden bg-[radial-gradient(1000px_560px_at_80%_0%,#1A2C5E_0%,transparent_70%)]">
        <Container className="py-14 md:py-20">
          <a
            href={homeAnchor(lang, "#caso-sicop")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-cyan"
          >
            <span aria-hidden className="transition-transform duration-200 ease-out group-hover:-translate-x-[3px]">
              ←
            </span>
            {c.back}
          </a>
          <p className="text-eyebrow mt-8">{c.eyebrow}</p>
          <h1 className="text-display-xl mt-4 max-w-[22ch] text-ink">{c.title}</h1>
          <p className="text-body mt-5 max-w-[60ch]">{c.lead}</p>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: `>${caseFacts.recordsMillions}M`, label: t.dashboard.kpiRecords },
              { value: String(caseFacts.anomalyPatterns), label: t.dashboard.kpiPatterns },
              { value: String(caseFacts.riskDimensions), label: c.sections.ai },
              { value: `<${caseFacts.scoringSeconds} s`, label: t.caseBand.facts[3].label },
            ].map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse justify-end rounded-[18px] border border-line bg-surface p-5">
                <dt className="mt-2 text-sm text-ink-2">{fact.label}</dt>
                <dd className="bg-fact-text bg-clip-text font-display text-[clamp(36px,4vw,48px)] font-extrabold leading-none tabular-nums text-transparent">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <Container className="grid gap-12 pb-10 md:grid-cols-[200px_1fr] md:gap-16">
        <aside className="hidden md:block">
          <nav aria-label={c.railTitle} className="sticky top-28">
            <p className="text-eyebrow mb-4">{c.railTitle}</p>
            <ol className="space-y-3 text-sm">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#cs-${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className={cn(
                      "flex items-center gap-3 transition-colors duration-150",
                      active === id ? "text-ink" : "text-ink-muted hover:text-ink-2",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn("block h-px bg-current transition-[width] duration-200", active === id ? "w-8" : "w-4")}
                    />
                    {c.sections[id]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="space-y-20 md:space-y-28">
          <section id="cs-summary" aria-labelledby="cs-summary-title">
            <h2 id="cs-summary-title" className="text-eyebrow">{c.sections.summary}</h2>
            <Reveal>
              <div className="mt-6 grid gap-3.5 lg:grid-cols-2">
                <div className="rounded-card border border-line bg-surface p-6">
                  <p className="text-[13px] text-ink-muted">{c.contextLabel}</p>
                  <p className="mt-2 text-lg leading-relaxed text-ink">{c.context}</p>
                </div>
                <div className="rounded-card border border-line bg-surface p-6">
                  <p className="text-[13px] text-ink-muted">{c.resultLabel}</p>
                  <p className="mt-2 text-lg leading-relaxed text-ink">{c.result}</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="cs-challenge" aria-labelledby="cs-challenge-title">
            <p className="text-eyebrow">{c.sections.challenge}</p>
            <h2 id="cs-challenge-title" className="text-h2 mt-3 text-ink">{c.challengeTitle}</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {c.challengePoints.map((point) => (
                <li key={point} className="flex gap-3 rounded-[14px] border border-line bg-surface p-4 text-[15px] text-ink-2">
                  <span aria-hidden className="mt-[7px] h-2 w-2 flex-none rounded-full bg-alert" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section id="cs-architecture" aria-labelledby="cs-architecture-title">
            <p className="text-eyebrow">{c.sections.architecture}</p>
            <h2 id="cs-architecture-title" className="text-h2 mt-3 text-ink">{c.architectureTitle}</h2>
            <div className="mt-6 grid gap-3.5 lg:grid-cols-[1fr_2fr]">
              <div className="rounded-card border border-line bg-surface p-6">
                <h3 className="text-[13px] font-semibold text-ink-muted">{c.sourcesLabel}</h3>
                <ul className="mt-3 space-y-2">
                  {c.sources.map((source) => (
                    <li key={source} className="rounded-[10px] border border-line px-3 py-2 text-sm text-ink-2">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card border border-line bg-surface p-6">
                <h3 className="text-[13px] font-semibold text-ink-muted">{c.pipelineLabel}</h3>
                <ol className="mt-3 space-y-3">
                  {c.pipeline.map((stage, i) => (
                    <li key={stage.title} className="grid grid-cols-[36px_1fr] gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-accent font-display text-[13px] font-bold tabular-nums text-accent">
                        {i + 1}
                      </span>
                      <div>
                        <b className="font-semibold text-ink">{stage.title}</b>
                        <p className="text-sm text-ink-2">{stage.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section id="cs-ai" aria-labelledby="cs-ai-title">
            <p className="text-eyebrow">{c.sections.ai}</p>
            <h2 id="cs-ai-title" className="text-h2 mt-3 text-ink">{c.aiTitle}</h2>
            <p className="text-body mt-4 max-w-[64ch]">{c.aiBody}</p>
            <div className="mt-6 rounded-card border border-line bg-surface p-6">
              <p className="flex items-baseline justify-between text-sm text-ink-2">
                {t.dashboard.gaugeTitle}
                <span>
                  {c.compositeLabel}{" "}
                  <b className="font-display text-2xl font-extrabold tabular-nums text-ink">{compositeScore()}</b>
                  /100
                </span>
              </p>
              <BarList
                className="mt-4"
                animate
                reduce={reduce}
                barWidth="minmax(0,2fr)"
                items={riskDimensions.map((dim) => ({ label: t.dashboard.dimensions[dim.key], value: dim.score }))}
              />
            </div>
          </section>

          <section id="cs-institutions" aria-labelledby="cs-institutions-title">
            <p className="text-eyebrow">{c.sections.institutions}</p>
            <h2 id="cs-institutions-title" className="text-h2 mt-3 text-ink">{c.institutionsTitle}</h2>
            <p className="text-body mt-4">{c.institutionsBody}</p>
            <p className="mt-2 text-sm text-ink-muted">
              {(Object.keys(counts) as RiskTier[]).map((tier) => `${t.dashboard.tiers[tier]} · ${counts[tier]}`).join("  ·  ")}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {institutions.map((inst) => (
                <li key={inst.id} className={cn("rounded-[14px] border bg-surface p-4", TIER_STYLE[inst.tier])}>
                  <span className="text-xs font-semibold">{t.dashboard.tiers[inst.tier]}</span>
                  <p className="mt-1.5 text-[15px] text-ink">
                    {t.dashboard.institution} {inst.id}
                  </p>
                  <p className="mt-2 font-display text-4xl font-extrabold tabular-nums text-ink">{inst.score}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-muted">{c.dataNote}</p>
          </section>

          <section id="cs-impact" aria-labelledby="cs-impact-title">
            <p className="text-eyebrow">{c.sections.impact}</p>
            <h2 id="cs-impact-title" className="text-h2 mt-3 text-ink">{c.impactTitle}</h2>
            <div className="mt-6 grid gap-3.5 md:grid-cols-3">
              {c.impact.map((item) => (
                <div key={item.title} className="rounded-card border border-line bg-surface p-6">
                  <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="cs-cta-title" className="rounded-band border border-line bg-navy-band bg-[radial-gradient(70%_100%_at_85%_0%,#233E85_0%,transparent_70%)] p-7 md:p-12">
            <h2 id="cs-cta-title" className="text-display-l text-ink">{c.ctaTitle}</h2>
            <p className="text-body mt-4 max-w-[56ch]">{c.ctaBody}</p>
            <div className="mt-7">
              <LinkButton href={homeAnchor(lang, "#contact")} variant="primary" withArrow>
                {c.ctaButton}
              </LinkButton>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
