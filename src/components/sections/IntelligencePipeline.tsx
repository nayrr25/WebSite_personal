"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import PipelineDiagram from "@/components/charts/PipelineDiagram";
import { useT } from "@/lib/i18n";

export default function IntelligencePipeline() {
  const t = useT();
  return (
    <Section id="pipeline" className="relative overflow-hidden bg-bg-base">
      <Reveal>
        <Eyebrow>{t.pipeline.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-5 max-w-[18ch] text-text-primary">
          {t.pipeline.title}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-body mt-5 max-w-2xl">{t.pipeline.body}</p>
      </Reveal>

      <div className="mt-20">
        <PipelineDiagram />
      </div>

      <div className="mt-10 hidden grid-cols-7 gap-3 md:grid">
        {t.sicop.pipelineNodes.map((n) => (
          <div
            key={n.label}
            className="rounded-md border border-border-subtle bg-bg-elevated/40 p-3 text-[11px] text-text-secondary"
          >
            {n.description}
          </div>
        ))}
      </div>
    </Section>
  );
}
