import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";

const upcoming = [
  { title: "SICOP — Methodology Deep Dive", eta: "Q2 2026", kind: "Case Study" },
  { title: "HeatSight AI — Beta Architecture", eta: "Q3 2026", kind: "Demo" },
  { title: "Consumer Intelligence — Field Notes", eta: "Q3 2026", kind: "Essay" },
  { title: "AI Decision Engine — Concept Spec", eta: "Q4 2026", kind: "Concept" },
  { title: "Data Governance Intelligence", eta: "Q1 2027", kind: "Concept" },
];

export default function BuildingInPublic() {
  return (
    <Section id="building-in-public">
      <Reveal>
        <Eyebrow>Building in Public</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-6 max-w-[24ch] text-text-primary">
          Real-world case studies, AI prototypes and intelligence systems —{" "}
          <span className="font-serif italic font-normal text-accent-cyan">
            open work, in the open.
          </span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-body mt-6 max-w-2xl">
          N-AI will continue publishing the work as it gets built. Below — what&rsquo;s
          on the editorial pipeline.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-14 -mx-6 md:-mx-10">
          <div
            className="mask-fade-x flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:px-10"
            role="list"
          >
            {upcoming.map((item, i) => (
              <div
                role="listitem"
                key={item.title}
                className="snap-start flex w-[280px] flex-shrink-0 flex-col justify-between rounded-lg border border-border-subtle bg-bg-elevated/40 p-6 transition-all duration-300 ease-smooth hover:border-accent-cyan/30 md:w-[320px]"
              >
                <div>
                  <div className="text-eyebrow text-text-muted">{item.kind}</div>
                  <h3 className="mt-4 text-[20px] font-medium leading-snug text-text-primary">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-10 flex items-center justify-between text-[12px] text-text-muted">
                  <span className="uppercase tracking-eyebrow">ETA</span>
                  <span className="text-text-secondary">{item.eta}</span>
                </div>
                <div className="mt-3 h-px w-full bg-border-subtle" />
                <div className="mt-3 flex items-center gap-2 text-[12px] text-accent-cyan/80">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan"
                  />
                  Forthcoming
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
