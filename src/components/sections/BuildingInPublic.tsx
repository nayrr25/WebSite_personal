"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";

export default function BuildingInPublic() {
  const t = useT();
  return (
    <Section id="building-in-public">
      <Reveal>
        <Eyebrow>{t.bip.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-6 max-w-[24ch] text-text-primary">
          {t.bip.headlineStart}{" "}
          <span className="font-serif italic font-normal text-accent-cyan">
            {t.bip.headlineItalic}
          </span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-body mt-6 max-w-2xl">{t.bip.body}</p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-14 -mx-6 md:-mx-10">
          <div
            className="mask-fade-x flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:px-10"
            role="list"
          >
            {t.bip.upcoming.map((item) => (
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
                  <span className="uppercase tracking-eyebrow">{t.bip.etaLabel}</span>
                  <span className="text-text-secondary">{item.eta}</span>
                </div>
                <div className="mt-3 h-px w-full bg-border-subtle" />
                <div className="mt-3 flex items-center gap-2 text-[12px] text-accent-cyan/80">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan"
                  />
                  {t.bip.forthcomingLabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
