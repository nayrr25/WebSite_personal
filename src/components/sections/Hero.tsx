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
        <ParticleNetwork density={0.075} linkDistance={165} strength={1.15} />
        {/* FIX: acá vivía un viñeteado `rgba(7,9,12,.95)` heredado del tema
         * OSCURO anterior. Sobre el fondo claro actual pintaba un halo gris
         * sucio en los bordes y ahogaba la red de partículas. Lo reemplazamos
         * por una viñeta clarísima del propio --bg-base, que asienta el borde
         * sin ensuciar y deja respirar las partículas. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(243,245,249,0.55) 78%, rgba(243,245,249,0.92) 100%)",
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
            <LogoFull size="lg" three />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-display-l mt-6 max-w-[20ch] text-balance text-text-primary"
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

        {/* Orden deliberado: primero la PRUEBA (tres números reales), después
         * el RANGO (la tira de servicios). Antes el marquee ocupaba solo este
         * espacio y no aportaba ninguna evidencia; ahora encabeza la prueba y
         * la tira queda como respaldo, con menos peso visual para no competir. */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduce ? 0 : 0.7,
            delay: reduce ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-3"
        >
          {t.hero.proof.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center bg-bg-elevated/70 px-5 py-6 backdrop-blur-sm"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="flex flex-col items-center">
                <span className="text-h2 tabular-nums text-text-primary">
                  {item.value}
                </span>
                <span className="mt-2 text-[11px] uppercase leading-snug tracking-eyebrow text-text-muted">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Tira de servicios — el "qué sé hacer" en un vistazo. Vuelve al hero
         * pero por debajo de los números, en píldoras teal: se ve, pero el
         * tamaño de letra (11px vs. el h2 de los números) mantiene claro que
         * la prueba manda y la tira acompaña. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.7 }}
          className="mask-fade-x relative mt-10 overflow-hidden"
          aria-hidden
        >
          <div
            className={
              reduce
                ? "flex flex-wrap justify-center gap-2"
                : "flex w-max animate-marquee-slow gap-2.5"
            }
          >
            {(reduce
              ? t.hero.marquee
              : [...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee]
            ).map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-accent-teal/25 bg-accent-teal/[0.07] px-3.5 py-1.5 text-[11px] font-semibold tracking-eyebrow text-accent-teal backdrop-blur-sm"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal"
                />
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
