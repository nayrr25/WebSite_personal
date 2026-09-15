"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

export default function Method() {
  const t = useT();
  const m = t.method;
  const lineRef = useRef<HTMLDivElement>(null);
  // El destello recorre la línea dos veces al entrar en pantalla y se detiene.
  const inView = useInView(lineRef, { once: true, amount: 0.4 });

  return (
    <Section id="metodo">
      <Reveal>
        <p className="text-eyebrow">{m.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{m.title}</h2>
      </Reveal>

      <div ref={lineRef} className="relative mt-10 md:mt-14">
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-[27px] hidden h-0.5 bg-gradient-to-r from-accent to-accent-cyan opacity-35 md:block"
        />
        <div
          aria-hidden
          className={cn(
            "absolute left-[6%] top-[25px] hidden h-1.5 w-[14%] rounded-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-0 blur-[1px] md:block",
            inView && "animate-beam",
          )}
        />
        <ol className="grid gap-7 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
          {m.steps.map((step, i) => (
            <li key={step.title} className="relative md:pr-6">
              <Reveal delay={i * 0.06}>
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-accent bg-navy font-display text-lg font-extrabold tabular-nums text-ink">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 font-display text-[21px] font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{step.body}</p>
                <p className="mt-3.5 inline-block rounded-full border border-accent/35 px-2.5 py-1 text-xs font-semibold text-accent">
                  <span className="sr-only">{m.deliverableLabel}: </span>
                  {step.deliverable}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
