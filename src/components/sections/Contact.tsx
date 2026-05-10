import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import GridGlow from "@/components/backgrounds/GridGlow";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/content/site";
import { Mail, Linkedin } from "lucide-react";

export default function Contact() {
  const subject = encodeURIComponent("Conversation with N-AI");
  const body = encodeURIComponent(
    "Hi Nancy,\n\nI'd like to start a conversation about an intelligence system project we're scoping.\n\nContext:\n• Organization:\n• Goal:\n• Timeline:\n\nThanks,\n",
  );
  const mailto = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;

  return (
    <Section id="contact" className="relative overflow-hidden">
      <GridGlow size={50} />
      <div className="relative flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-display-l mt-6 max-w-[16ch] text-text-primary">
            Let&rsquo;s build{" "}
            <span className="font-serif italic font-normal text-accent-cyan">
              intelligent systems
            </span>
            .
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-body mt-6 max-w-xl">
            N-AI engages with executive teams, government innovation leads and
            category-leading organizations. Reach out with the question you can&rsquo;t
            answer with the system you have today.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <LinkButton href={mailto} variant="primary" withArrow>
              Start a Conversation
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
