"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useT } from "@/lib/i18n";

export default function Contact() {
  const t = useT();
  const c = t.contact;
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(c.mailtoSubject)}&body=${encodeURIComponent(c.mailtoBody)}`;
  const whatsapp = `${site.contact.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-6 md:py-10">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-band border border-line bg-navy-cta bg-[radial-gradient(60%_90%_at_15%_0%,rgba(47,98,200,0.55),transparent_70%),radial-gradient(50%_80%_at_95%_100%,rgba(53,224,255,0.18),transparent_70%)] p-7 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">
            <div>
              <p className="text-eyebrow text-ink-soft">{c.eyebrow}</p>
              <h2 id="contact-title" className="text-display-l mt-3.5 text-ink">
                {c.title}
              </h2>
              <p className="text-body mt-4">{c.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={whatsapp} target="_blank" rel="noreferrer" variant="primary" withArrow>
                  {c.primaryCta}
                </LinkButton>
                <LinkButton href={mailto} variant="ghost">
                  {c.secondaryCta}
                </LinkButton>
              </div>
              <p className="mt-5 text-[15px] text-ink-2">
                <span className="tabular-nums">{site.contact.whatsappDisplay}</span> · {site.contact.email}
              </p>
            </div>
            <ol aria-label={c.nextLabel} className="grid gap-2.5">
              {c.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[40px_1fr] gap-1 rounded-2xl border border-line bg-white/5 px-[18px] py-4"
                >
                  <span
                    aria-hidden
                    className="grid h-7 w-7 place-items-center rounded-full border border-accent font-display text-[13px] font-bold text-accent"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <b className="font-semibold text-ink">{step.title}</b>
                    <span className="block text-sm text-ink-2">{step.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
