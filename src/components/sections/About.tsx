import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";

const matrix = [
  ["AI", "Data Science"],
  ["Analytics", "Consumer Intelligence"],
  ["Strategic Thinking", "Machine Learning"],
  ["Intelligent Systems", "Decision Design"],
];

export default function About() {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>About N-AI</Eyebrow>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <Reveal delay={0.05}>
            <h2 className="text-display-l max-w-[14ch] text-text-primary">
              A studio for{" "}
              <span className="font-serif italic font-normal text-accent-cyan">
                intelligence systems
              </span>
              , not a vendor.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-body mt-7 max-w-xl">
              N-AI sits at the fusion of{" "}
              <span className="font-serif italic text-text-primary">AI</span>,{" "}
              <span className="font-serif italic text-text-primary">data science</span>,
              analytics, consumer intelligence, strategic thinking, machine learning and
              intelligent systems design. The work is the same in every engagement: take
              a complex data ecosystem and turn it into a system that decides — auditable,
              explainable, alive.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-body mt-5 max-w-xl">
              Engagements are concept-to-deployment partnerships with executive teams,
              government innovation leads and category-leading organizations. The
              deliverable is never a dashboard. It is the underlying system the dashboard
              is just one face of.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-3">
            {matrix.flat().map((item, i) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-md border border-border-subtle bg-bg-elevated/40 p-5 transition-all duration-300 ease-smooth hover:border-accent-cyan/30"
              >
                <div className="text-eyebrow mb-2 text-text-muted transition-colors duration-300 group-hover:text-accent-cyan">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-[16px] font-medium text-text-primary">{item}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
