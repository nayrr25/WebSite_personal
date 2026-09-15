"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import LiveDashboard from "@/components/sections/LiveDashboard";
import { useLanguage } from "@/lib/i18n";
import { CASE_SICOP_PATH } from "@/lib/routes";

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(1100px_650px_at_78%_18%,#1A2C5E_0%,transparent_70%)]"
    >
      <div
        aria-hidden
        className="mask-hero-grid pointer-events-none absolute inset-0 bg-grid-48 bg-cell-48"
      />
      <Container className="relative grid min-h-[calc(100svh-68px)] grid-cols-[minmax(0,1fr)] items-center gap-10 py-8 md:py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-ink-soft sm:text-[13px]">
              <span
                aria-hidden
                className="h-[7px] w-[7px] flex-none animate-pulse-dot rounded-full bg-accent-cyan shadow-[0_0_12px_#35E0FF]"
              />
              {t.hero.pill}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-display-xl mt-5 text-ink sm:mt-6">
              {t.hero.headlineStart}{" "}
              <span className="text-grad pr-[0.08em] font-serif text-[1.1em] font-normal italic leading-none tracking-[-0.01em]">
                {t.hero.headlineHighlight}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-[520px] text-base leading-relaxed text-ink-2 sm:mt-6 sm:text-lg">
              {t.hero.subhead}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <LinkButton href="#contact" variant="primary" withArrow>
                {t.hero.primaryCta}
              </LinkButton>
              <LinkButton href={CASE_SICOP_PATH[lang]} variant="ghost">
                {t.hero.secondaryCta}
              </LinkButton>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-6 grid grid-cols-3 gap-3.5 sm:mt-10 sm:flex sm:flex-wrap sm:gap-8">
              {t.hero.proof.map((item) => (
                <div key={item.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 max-w-[16ch] text-xs leading-snug text-ink-muted sm:text-[13px]">
                    {item.label}
                  </dt>
                  <dd className="font-display text-[26px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-ink sm:text-[34px]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <LiveDashboard />
        </Reveal>
      </Container>
    </section>
  );
}
