"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";
import { verticalIcons } from "@/content/capabilities";

/**
 * Capacidades, agrupadas en DOS VERTICALES.
 *
 * Antes eran ocho tarjetas planas en una sola cuadricula. El problema: un
 * director de marketing entraba, veia "detección de anomalías" y "risk
 * scoring" en las primeras posiciones, y concluia que el sitio no era para el
 * — aunque la mitad de las capacidades si le hablaban directamente.
 *
 * Separarlas por vertical, con la audiencia declarada en cada bloque, deja
 * claro que son dos practicas de la misma consultora y no una lista de todo
 * lo que se sabe hacer. Cada comprador encuentra su bloque en un vistazo.
 */
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

      <div className="mt-16 flex flex-col gap-16">
        {t.verticals.map((vertical, vi) => {
          const icons = verticalIcons[vi] ?? verticalIcons[0];
          return (
            <div key={vertical.title}>
              <Reveal>
                <div className="flex flex-col gap-2 border-l-2 border-accent-teal pl-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-accent-teal">
                      {vertical.eyebrow}
                    </p>
                    <h3 className="text-h2 mt-1.5 text-text-primary">{vertical.title}</h3>
                  </div>
                  {/* La audiencia, dicha en voz alta. Es lo que permite que el
                   * visitante correcto se reconozca sin leer las cuatro
                   * tarjetas. */}
                  <p className="text-[13px] leading-snug text-text-muted sm:max-w-[26ch] sm:text-right">
                    {vertical.audience}
                  </p>
                </div>
              </Reveal>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {vertical.items.map((cap, i) => {
                  const Icon = icons[i] ?? icons[0];
                  return (
                    <Reveal key={cap.title} delay={i * 0.04}>
                      <div className="group relative h-full overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated/40 p-6 transition-all duration-300 ease-smooth hover:border-accent-teal/40">
                        <Icon
                          aria-hidden
                          className="h-5 w-5 text-accent-teal transition-transform duration-300 ease-smooth group-hover:scale-110"
                        />
                        <h4 className="text-h3 relative mt-5 text-text-primary">
                          {cap.title}
                        </h4>
                        <p className="text-body-sm relative mt-2 text-[14px]">
                          {cap.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
