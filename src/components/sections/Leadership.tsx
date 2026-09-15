"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { useT } from "@/lib/i18n";

const SOCIAL = [
  { label: "LinkedIn", href: site.contact.linkedin },
  { label: "Google Scholar", href: site.contact.scholar },
  { label: "GitHub", href: site.contact.github },
];

export default function Leadership() {
  const t = useT();
  const l = t.leadership;

  return (
    <Section id="quien-lidera">
      <Reveal>
        <p className="text-eyebrow">{l.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{l.title}</h2>
      </Reveal>

      <div className="mt-8 grid gap-3.5 md:mt-12 lg:grid-cols-[5fr_7fr]">
        <Reveal className="h-full">
          <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/25 to-accent-cyan/10 sm:aspect-[4/4.2] lg:aspect-[16/10]">
              <Image
                src="/nancy-retrato.webp"
                alt={l.portraitAlt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-[center_22%]"
              />
            </div>
            <div className="px-5 pb-6 pt-5">
              <h3 className="font-display text-[22px] font-bold text-ink">{l.name}</h3>
              <p className="mt-1 text-sm font-semibold text-accent">{l.role}</p>
              <p className="mt-2 text-sm text-ink-2">{l.disciplines}</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.06} className="h-full">
          <div className="flex h-full flex-col rounded-card border border-line bg-surface p-5 md:p-9">
            <p className="text-[17px] leading-relaxed text-ink-2">{l.bio}</p>
            <blockquote className="mt-6 border-l-2 border-accent-cyan pl-4 font-serif text-[clamp(26px,2.6vw,34px)] italic leading-tight text-ink">
              {l.quote}
            </blockquote>
            <ul aria-label={l.areasLabel} className="mt-6 flex flex-wrap gap-2">
              {l.areas.map((area) => (
                <li key={area} className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-soft">
                  {area}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-6 pt-6">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-accent transition-colors duration-150 hover:text-accent-cyan"
                >
                  {item.label}
                  <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

    </Section>
  );
}
