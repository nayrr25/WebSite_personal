"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import PipelineDiagram from "@/components/charts/PipelineDiagram";
import { pipelineNodes } from "@/content/caseStudy.sicop";

export default function IntelligencePipeline() {
  return (
    <Section id="pipeline" className="relative overflow-hidden bg-bg-base">
      <Reveal>
        <Eyebrow>Pipeline</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-5 max-w-[18ch] text-text-primary">
          Seven stages from raw to executive surface.
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-body mt-5 max-w-2xl">
          Each stage is independently testable, observable and replayable. The result is
          intelligence with lineage — every conclusion traces back to the record that
          produced it.
        </p>
      </Reveal>

      <div className="mt-20">
        <PipelineDiagram />
      </div>

      {/* Desktop captions strip beneath the diagram */}
      <div className="mt-10 hidden grid-cols-7 gap-3 md:grid">
        {pipelineNodes.map((n) => (
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
