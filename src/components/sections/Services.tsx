"use client";

import type { PointerEvent } from "react";
import { Database, Sparkles, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";
import { serviceIcons, type ServiceIcon } from "@/content/services";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  sparkles: Sparkles,
  workflow: Workflow,
  trending: TrendingUp,
  database: Database,
};

/** Posición del puntero para la luz que sigue al mouse (solo decorativa). */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export default function Services() {
  const t = useT();
  const s = t.services;

  return (
    <Section id="servicios">
      <Reveal>
        <p className="text-eyebrow">{s.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{s.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-body mt-4 max-w-[62ch]">{s.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((item, i) => {
          const Icon = ICONS[serviceIcons[i]];
          return (
            <Reveal key={item.title} delay={i * 0.06} className="h-full">
              <article
                onPointerMove={trackPointer}
                className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-[360px]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,50%),rgba(143,180,255,0.18),transparent_45%)] group-hover:opacity-100"
                />
                <span className="absolute right-6 top-6 font-display text-[13px] font-bold tabular-nums text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-[50px] w-[50px] place-items-center rounded-[14px] bg-accent/15 text-accent">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-8 font-display text-[22px] font-bold leading-tight text-ink lg:mt-auto lg:pt-8">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{item.description}</p>
                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-2">
                      {tag}
                    </li>
                  ))}
                </ul>
                {item.evidence && (
                  <p className="mt-3.5 border-t border-line pt-3 text-[13px] text-ink-soft">
                    <b className="font-semibold text-accent-cyan">{s.evidenceLabel}</b> {item.evidence}
                  </p>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2.5 border-t border-line pt-6 text-base font-semibold text-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {s.sectorsLabel}
          </span>
          {s.sectors.map((sector) => (
            <span key={sector}>{sector}</span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
