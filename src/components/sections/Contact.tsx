"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import GridGlow from "@/components/backgrounds/GridGlow";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useT } from "@/lib/i18n";
import { Mail, Linkedin } from "lucide-react";

export default function Contact() {
  const t = useT();
  const subject = encodeURIComponent(t.contact.mailtoSubject);
  const body = encodeURIComponent(t.contact.mailtoBody);
  const mailto = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;

  return (
    <Section id="contact" className="relative overflow-hidden">
      <GridGlow size={50} />
      <div className="relative flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>{t.contact.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-display-l mt-6 max-w-[16ch] text-text-primary">
            {t.contact.headlineStart}{" "}
            <span className="font-serif italic font-normal text-accent-cyan">
              {t.contact.headlineItalic}
            </span>
            {t.contact.headlineEnd}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-body mt-6 max-w-xl">{t.contact.body}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <LinkButton href={mailto} variant="primary" withArrow>
              {t.contact.primaryCta}
            </LinkButton>

            <div className="mt-4 flex items-center gap-6">
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {site.contact.email}
              </a>
              <a
                href={site.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
