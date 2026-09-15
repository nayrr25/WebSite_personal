"use client";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";

export default function FAQ() {
  const t = useT();
  const featured = t.faq.items.filter((item) => item.featured);
  const more = t.faq.items.filter((item) => !item.featured);

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-eyebrow">{t.faq.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display-l mt-3.5 text-ink">{t.faq.title}</h2>
          </Reveal>
        </div>

        <div>
          <div className="grid gap-3.5">
            {featured.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.06}>
                <div className="rounded-[18px] border border-line bg-surface px-6 py-5">
                  <h3 className="font-display text-[19px] font-bold leading-snug text-ink">{item.q}</h3>
                  <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-ink-2">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-7">
              <p className="mb-2 text-sm text-ink-muted">{t.faq.moreLabel}</p>
              {more.map((item) => (
                <details key={item.q} className="group border-b border-line first-of-type:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[18px] text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden className="text-2xl font-normal leading-none text-accent group-open:hidden">
                      +
                    </span>
                    <span aria-hidden className="hidden text-2xl font-normal leading-none text-accent group-open:inline">
                      –
                    </span>
                  </summary>
                  <p className="max-w-[60ch] pb-5 text-base leading-relaxed text-ink-2">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
