"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n";
import { CASE_SICOP_PATH } from "@/lib/routes";

export default function CaseBand() {
  const { lang, t } = useLanguage();
  const c = t.caseBand;

  return (
    <section id="caso-sicop" aria-labelledby="caso-sicop-title" className="py-6 md:py-10">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-band border border-line bg-navy-band bg-[radial-gradient(70%_100%_at_85%_0%,#233E85_0%,transparent_70%)] p-7 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">
            <div>
              <p className="text-eyebrow">{c.eyebrow}</p>
              <h2 id="caso-sicop-title" className="text-display-l mt-3.5 text-ink">
                {c.title}
              </h2>
              <p className="text-body mt-5 max-w-[52ch]">{c.context}</p>
              <div className="mt-6 max-w-[50ch] border-l-2 border-accent-cyan pl-4">
                <span className="block text-[13px] text-ink-muted">{c.resultLabel}</span>
                <p className="mt-1 text-lg text-ink">{c.result}</p>
              </div>
              <div className="mt-8">
                <LinkButton href={CASE_SICOP_PATH[lang]} variant="primary" withArrow>
                  {c.cta}
                </LinkButton>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {c.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col-reverse justify-end rounded-[18px] border border-line bg-white/5 p-5"
                >
                  <dt className="mt-2.5 text-sm text-ink-2">{fact.label}</dt>
                  <dd className="bg-fact-text bg-clip-text font-display text-[clamp(40px,4.4vw,56px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-transparent">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
