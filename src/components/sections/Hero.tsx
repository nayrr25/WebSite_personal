"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import GradientText from "@/components/ui/GradientText";
import { LogoFull } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import AuroraGradient from "@/components/backgrounds/AuroraGradient";
import { useT } from "@/lib/i18n";

const ParticleNetwork = dynamic(() => import("@/components/backgrounds/ParticleNetwork"), {
  ssr: false,
});

export default function Hero() {
  const reduce = useReducedMotion();
  const t = useT();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 -z-10">
        <AuroraGradient intensity={0.85} />
        <ParticleNetwork density={0.07} linkDistance={150} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(7,9,12,0.5) 70%, rgba(7,9,12,0.95) 100%)",
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2"
          >
            <LogoFull width={460} priority />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-display-xl mt-6 max-w-[20ch] text-balance text-text-primary"
          >
            {t.hero.headlineStart} <GradientText>{t.hero.headlineHighlight}</GradientText>
            {t.hero.headlineEnd}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-body mt-7 max-w-2xl text-pretty"
          >
            {t.hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <LinkButton href="#case-study" variant="primary" withArrow>
              {t.hero.primaryCta}
            </LinkButton>
            <LinkButton href="#contact" variant="ghost">
              {t.hero.secondaryCta}
            </LinkButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.6 }}
          className="mask-fade-x relative mt-24 overflow-hidden"
          aria-hidden
        >
          <div className="flex w-max animate-marquee-slow gap-3">
            {[...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee].map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="inline-flex items-center rounded-full border border-border-subtle bg-bg-glass px-4 py-1.5 text-[12px] tracking-eyebrow text-text-secondary backdrop-blur-sm"
              >
                {label.toUpperCase()}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>

      <div aria-hidden className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex h-10 w-[1px] items-start justify-center overflow-hidden bg-border-subtle">
          <span className="block h-3 w-[1px] animate-scroll-pulse bg-accent-cyan" />
        </div>
      </div>
    </section>
  );
}
