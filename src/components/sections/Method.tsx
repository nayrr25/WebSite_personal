"use client";

import { useState } from "react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import MethodBlocks from "@/components/sections/MethodBlocks";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

export default function Method() {
  const t = useT();
  const m = t.method;
  // Fases iluminadas: todas en el HTML; la pared de bloques las enciende al armarse.
  const [lit, setLit] = useState<number>(m.steps.length);

  return (
    <Section id="metodo">
      {/* Celular: título, bloques y fases. Escritorio: título y fases a la izquierda, bloques a la derecha. */}
      <div className="grid gap-10 [grid-template-areas:'head'_'stage'_'steps'] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-x-16 lg:gap-y-0 lg:[grid-template-areas:'head_stage'_'steps_stage']">
        <div className="[grid-area:head]">
          <Reveal>
            <p className="text-eyebrow">{m.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{m.title}</h2>
          </Reveal>
        </div>

        <div className="[grid-area:stage]">
          <MethodBlocks
            onPhase={setLit}
            caption={m.stackCaption}
            srLabel={m.stackSrLabel}
            phaseTitles={m.steps.map((step) => step.title)}
          />
        </div>

        <ol className="grid gap-7 [grid-area:steps] sm:grid-cols-2 sm:gap-x-8 lg:mt-10">
          {m.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.06}>
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-full border-2 bg-navy font-display text-base font-extrabold tabular-nums transition-colors duration-300",
                    i < lit ? "border-accent-cyan text-ink" : "border-white/15 text-ink-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-display text-[21px] font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{step.body}</p>
                <p className="mt-3.5 inline-block rounded-full border border-accent/35 px-2.5 py-1 text-xs font-semibold text-accent">
                  <span className="sr-only">{m.deliverableLabel}: </span>
                  {step.deliverable}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
