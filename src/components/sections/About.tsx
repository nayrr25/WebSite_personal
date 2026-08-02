"use client";

import { useState } from "react";
import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Mail, Linkedin, Github, MessageCircle, GraduationCap } from "lucide-react";
import {
  Brain,
  BarChart3,
  Database,
  Users,
  TrendingUp,
  ShieldCheck,
  LayoutGrid,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WORK_AREA_ICONS: LucideIcon[] = [
  Brain,
  BarChart3,
  Database,
  Users,
  TrendingUp,
  ShieldCheck,
  LayoutGrid,
];

const FUTURE_ICONS: LucideIcon[] = [
  Brain,
  Database,
  TrendingUp,
  Users,
  ShieldCheck,
  LayoutGrid,
];

export default function About() {
  const t = useT();
  return (
    <Section id="about" className="relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(94,233,240,0.06) 0%, transparent 50%)",
        }}
      />

      <Reveal>
        <Eyebrow>{t.about.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-5 max-w-[18ch] text-text-primary">
          {t.about.headline}
        </h2>
      </Reveal>

      {/* Citation capsule — visible, factual, LLM-citable */}
      <Reveal delay={0.08}>
        <aside
          aria-label={t.capsule.label}
          className="relative mt-8 max-w-3xl overflow-hidden rounded-lg border border-accent-cyan/20 bg-bg-elevated/40 p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
          />
          <div className="text-eyebrow mb-3 text-accent-cyan">{t.capsule.label}</div>
          <p className="text-body text-[16px] leading-relaxed text-text-secondary">
            {t.capsule.body}
          </p>
        </aside>
      </Reveal>

      {/* Founder block: portrait + bio */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal delay={0.1}>
          <FounderPortrait alt={t.about.portraitAlt} />
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col justify-center">
          {/* Identidad profesional explicita. Antes la bio arrancaba con
           * "estratega de datos e IA" — una descripcion que puede reclamar
           * cualquiera. Nombrar economista y estadistica es lo que separa un
           * perfil senior de un perfil tecnico, y es verificable. */}
          <div className="mb-7">
            <p className="text-h3 text-text-primary">{t.about.founderName}</p>
            <p className="mt-1.5 text-[15px] font-semibold text-accent-teal">
              {t.about.founderRole}
            </p>
            <p className="mt-2 text-[12px] uppercase tracking-eyebrow text-text-muted">
              {t.about.founderDisciplines}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-body max-w-xl text-text-secondary">{t.about.founderBio}</p>
            <p className="text-body max-w-xl text-text-secondary">{t.about.founderBio2}</p>
            <p className="text-body max-w-xl text-text-secondary">{t.about.founderBio3}</p>
          </div>

          <div className="mt-10">
            <p className="text-eyebrow">{t.about.workCombinesLabel}</p>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {t.about.workAreas.map((area, i) => {
                const Icon = WORK_AREA_ICONS[i % WORK_AREA_ICONS.length];
                return (
                  <li
                    key={area}
                    className="group flex items-center gap-3 rounded-md border border-border-subtle bg-bg-elevated/40 px-4 py-3 transition-all duration-200 ease-smooth hover:border-accent-cyan/30 hover:bg-bg-elevated/70"
                  >
                    <Icon
                      aria-hidden
                      className="h-4 w-4 flex-shrink-0 text-accent-cyan transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-[14px] text-text-primary">{area}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="text-body mt-10 max-w-xl text-text-secondary">{t.about.focusBody}</p>
        </Reveal>
      </div>

      {/* "Why N-AI" passage — editorial centerpiece */}
      <Reveal delay={0.1}>
        <div className="mt-32 max-w-3xl">
          <div className="text-eyebrow">{t.about.whyTitle}</div>
          <p className="mt-6 font-serif text-[28px] leading-snug text-text-primary md:text-[36px]">
            {t.about.whyLead}
          </p>
          <p className="text-body mt-6 text-text-secondary">{t.about.whyBody}</p>
          <p className="mt-6 inline-flex items-center gap-3 text-[18px] font-medium text-text-primary md:text-[22px]">
            <span aria-hidden className="h-px w-10 bg-accent-cyan" />
            {t.about.whyClose}
          </p>
        </div>
      </Reveal>

      {/* Trayectoria profesional.
       *
       * Reemplaza a "Vision Futura", que enumeraba lo que N-AI *podria* llegar
       * a explorar. Prometer capacidades futuras resta credibilidad: se lee
       * como un portafolio en construccion. La trayectoria previa hace lo
       * contrario — demuestra que la formacion cuantitativa es anterior al
       * auge reciente de la IA, que es el argumento mas fuerte que hay aqui. */}
      <div className="mt-32">
        <Reveal>
          <Eyebrow>{t.about.trajectoryTitle}</Eyebrow>
          <p className="text-body mt-6 max-w-2xl text-text-secondary">
            {t.about.trajectoryLead}
          </p>
        </Reveal>

        {/* Linea horizontal en desktop, vertical en movil */}
        <Reveal delay={0.1}>
          <ol className="mt-10 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            {t.about.trajectorySteps.map((step, i) => (
              <li
                key={step}
                className="group relative flex flex-1 items-center gap-3 rounded-lg border border-border-subtle bg-bg-elevated/50 px-4 py-4 transition-colors duration-300 ease-smooth hover:border-accent-teal/40 md:flex-col md:items-start md:gap-2"
              >
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-accent-teal/35 bg-accent-teal/[0.07] text-[11px] font-semibold tabular-nums text-accent-teal"
                >
                  {i + 1}
                </span>
                <span className="text-[13.5px] font-medium leading-snug text-text-primary">
                  {step}
                </span>
                {i < t.about.trajectorySteps.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 text-accent-teal/40 md:block"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15}>
          <blockquote className="mt-14 border-l-2 border-accent-teal pl-6">
            <p className="font-serif text-[24px] italic leading-snug text-text-primary md:text-[28px]">
              “{t.about.trajectoryQuote}”
            </p>
            <p className="text-body mt-5 max-w-2xl text-text-secondary">
              {t.about.trajectoryClose}
            </p>
          </blockquote>
        </Reveal>
      </div>

      {/* Contact handle inline */}
      <Reveal delay={0.1}>
        <div className="mt-20 flex flex-col items-start gap-2 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-text-muted">
            Nancy Rodríguez · {site.contact.email}
          </p>
          <div className="flex items-center gap-5 text-[13px]">
            <a
              href={site.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
            >
              LinkedIn ↗
            </a>
            <a
              href={site.contact.scholar}
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary transition-colors duration-200 ease-smooth hover:text-text-primary"
            >
              Google Scholar ↗
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function PortraitFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 30% 30%, rgba(94,233,240,0.10) 0%, rgba(7,9,12,0.95) 70%), linear-gradient(180deg, rgba(11,31,58,0.45) 0%, rgba(7,9,12,1) 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <LogoMark size={56} glow />
        <span className="font-serif text-[40px] tracking-tight text-text-primary">NR</span>
        <span className="text-[11px] uppercase tracking-eyebrow text-text-muted">
          /public/nancy-retrato.jpg
        </span>
      </div>
    </div>
  );
}

function FounderPortrait({ alt }: { alt: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="relative mx-auto flex w-full max-w-xs flex-col items-center">
      {/* Outer cyan glow */}
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-2xl opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(94,233,240,0.22) 0%, rgba(94,233,240,0) 70%)",
        }}
      />
      {/* Frame — smaller, square-ish portrait */}
      <div className="relative w-full overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated/40">
        <div className="relative aspect-square w-full">
          {!imgFailed ? (
            /* Recorte cuadrado del retrato. La imagen de marca completa es
             * apaisada: al meterla en este marco cuadrado con object-cover, el
             * navegador cortaba medio logo a la izquierda y partia los iconos a
             * la derecha. Este recorte solo tiene a Nancy sobre el fondo de red.
             * La composicion completa se conserva en /Nancy.* para compartir en
             * redes, donde su proporcion si funciona.
             *
             * WebP con respaldo JPEG: el PNG original pesaba 1,9 MB para
             * mostrarse a 320px. */
            <picture>
              <source srcSet="/nancy-retrato.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nancy-retrato.jpg"
                alt={alt}
                onError={() => setImgFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                width={880}
                height={880}
              />
            </picture>
          ) : (
            <PortraitFallback />
          )}
        </div>
        {/* Subtle bottom gradient overlay for legibility of caption */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg-base/80 to-transparent"
        />
        {/* Caption — bottom-left */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <div>
            <div className="text-[15px] font-medium tracking-tight text-text-primary">
              Nancy Rodríguez
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-eyebrow text-accent-cyan">
              Founder · N-AI
            </div>
          </div>
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-accent-cyan/30 bg-bg-base/60 backdrop-blur"
          >
            <LogoMark size={18} />
          </span>
        </div>
      </div>

      {/* Social row — under the photo */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <SocialIcon
          href={site.contact.linkedin}
          label="LinkedIn"
          icon={<Linkedin className="h-4 w-4" aria-hidden />}
          external
        />
        <SocialIcon
          href={site.contact.whatsapp}
          label="WhatsApp"
          icon={<MessageCircle className="h-4 w-4" aria-hidden />}
          external
        />
        <SocialIcon
          href={site.contact.github}
          label="GitHub"
          icon={<Github className="h-4 w-4" aria-hidden />}
          external
        />
        <SocialIcon
          href={site.contact.scholar}
          label="Google Scholar"
          icon={<GraduationCap className="h-4 w-4" aria-hidden />}
          external
        />
        <SocialIcon
          href={`mailto:${site.contact.email}`}
          label={`Email ${site.contact.email}`}
          icon={<Mail className="h-4 w-4" aria-hidden />}
        />
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle bg-bg-elevated/40 text-text-secondary transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent-cyan/50 hover:text-accent-cyan hover:shadow-glow"
    >
      {icon}
    </a>
  );
}
