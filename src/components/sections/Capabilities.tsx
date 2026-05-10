"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";
import { capabilityIcons } from "@/content/capabilities";

export default function Capabilities() {
  const t = useT();
  return (
    <Section id="capabilities">
      <Reveal>
        <Eyebrow>{t.capabilitiesSection.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-5 max-w-[18ch] text-text-primary">
          {t.capabilitiesSection.title}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-body mt-5 max-w-2xl">{t.capabilitiesSection.body}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.capabilities.map((cap, i) => {
          const Icon = capabilityIcons[i] ?? capabilityIcons[0];
          return (
            <Reveal key={cap.title} delay={i * 0.04}>
              <div className="group relative h-full overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated/40 p-6 transition-all duration-300 ease-smooth hover:border-accent-cyan/30">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(94,233,240,0.18) 0%, rgba(124,245,196,0.10) 50%, transparent 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                />

                <Icon
                  aria-hidden
                  className="h-5 w-5 text-accent-cyan transition-transform duration-300 ease-smooth group-hover:scale-110"
                />
                <h3 className="text-h3 relative mt-5 text-text-primary">{cap.title}</h3>
                <p className="text-body-sm relative mt-2 text-[14px]">{cap.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
