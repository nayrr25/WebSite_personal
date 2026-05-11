"use client";

import { useState } from "react";
import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const t = useT();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="relative overflow-hidden">
      <Reveal>
        <Eyebrow>{t.faq.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-5 max-w-[20ch] text-text-primary">{t.faq.title}</h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-body mt-5 max-w-2xl">{t.faq.body}</p>
      </Reveal>

      <Reveal delay={0.18}>
        <ul className="mt-14 divide-y divide-border-subtle border-y border-border-subtle">
          {t.faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 ease-smooth hover:bg-bg-glass"
                >
                  <span
                    className={cn(
                      "text-[18px] font-medium leading-snug transition-colors duration-200 ease-smooth md:text-[20px]",
                      isOpen ? "text-text-primary" : "text-text-secondary",
                    )}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-text-muted transition-all duration-300 ease-smooth",
                      "group-hover:text-accent-cyan",
                      isOpen && "rotate-180 text-accent-cyan",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-body pb-6 pr-12 text-text-secondary">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
