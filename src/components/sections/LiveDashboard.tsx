"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import BarList from "@/components/charts/BarList";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import {
  caseFacts,
  compositeScore,
  institutions,
  isAlert,
  lastAlertIndex,
  topDimensions,
  type RiskTier,
} from "@/content/data/sicop";

const TIER_COLOR: Record<RiskTier, string> = {
  low: "#35E0FF",
  medium: "#8FB4FF",
  high: "#FFC35D",
  critical: "#FF6B78",
};
const STEP_MS = 1100;
const W = 560;
const H = 170;
const PAD = 20;
const ARC_LENGTH = 188.5;

const POINTS = institutions.map((inst, i) => ({
  ...inst,
  cx: PAD + (i * (W - PAD * 2)) / (institutions.length - 1),
  cy: 162 - (inst.score / 100) * 150,
}));
const LINE = "M" + POINTS.map((p) => `${p.cx.toFixed(1)} ${p.cy.toFixed(1)}`).join(" L");
const AREA = `${LINE} L${W - PAD} ${H} L${PAD} ${H} Z`;

/** Cuenta una sola vez hasta el valor real cuando el tablero entra en pantalla. */
function useCountUp(target: number, decimals: number, active: boolean, reduce: boolean) {
  const [value, setValue] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200);
      setValue(target * (1 - Math.pow(1 - progress, 4)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, reduce]);
  return value.toFixed(decimals);
}

function Kpi({
  label,
  value,
  suffix,
  className,
}: {
  label: string;
  value: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-white/[0.06] bg-white/[0.04] px-3.5 py-3",
        className,
      )}
    >
      <span className="text-xs text-ink-muted">{label}</span>
      <b className="mt-1 block font-display text-2xl font-bold tabular-nums text-ink">
        {value}
        {suffix && <small className="text-[0.55em] font-semibold text-ink-muted">{suffix}</small>}
      </b>
    </div>
  );
}

/**
 * Tablero del hero. Solo usa resultados reales del caso SICOP: un cursor
 * recorre las 12 instituciones anonimizadas y muestra un aviso en las de
 * riesgo alto o crítico. El recorrido dura más de 5 s, así que tiene botón
 * de pausa (WCAG 2.2.2), y se detiene fuera de pantalla o con la pestaña oculta.
 */
export default function LiveDashboard() {
  const t = useT();
  const d = t.dashboard;
  const reduce = !!useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(reduce ? institutions.length - 1 : 0);
  const [alertIndex, setAlertIndex] = useState(lastAlertIndex);
  const [toastVisible, setToastVisible] = useState(true);
  const composite = compositeScore();

  // useReducedMotion es null en el primer render: al conocerse, fija el estado final.
  useEffect(() => {
    if (reduce) setIndex(institutions.length - 1);
  }, [reduce]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !visible) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % institutions.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, visible]);

  useEffect(() => {
    if (!isAlert(institutions[index]) || index === alertIndex) return;
    if (reduce) {
      setAlertIndex(index);
      return;
    }
    setToastVisible(false);
    const id = window.setTimeout(() => {
      setAlertIndex(index);
      setToastVisible(true);
    }, 300);
    return () => window.clearTimeout(id);
  }, [index, alertIndex, reduce]);

  const records = useCountUp(caseFacts.recordsMillions, 1, started, reduce);
  const patterns = useCountUp(caseFacts.anomalyPatterns, 0, started, reduce);
  const compositeShown = useCountUp(composite, 0, started, reduce);
  const current = POINTS[index];
  const alert = institutions[alertIndex];

  return (
    <div ref={rootRef} className="relative [perspective:1600px]">
      <p className="sr-only">{d.srSummary}</p>

      <div
        aria-hidden="true"
        className={cn(
          "relative z-10 mb-3 flex max-w-[310px] items-center gap-2.5 rounded-[14px] bg-white px-3.5 py-2.5 text-navy shadow-toast transition-[opacity,transform] duration-[450ms] ease-out motion-reduce:transition-none lg:absolute lg:-right-4 lg:-top-7 lg:mb-0",
          toastVisible ? "translate-y-0 opacity-100" : "-translate-y-2.5 opacity-0",
        )}
      >
        <span className="grid h-7 w-7 flex-none place-items-center rounded-[9px] bg-[#FFE3E6] font-extrabold text-[#B42335]">
          !
        </span>
        <span>
          <b className="block text-[13px]">
            {alert.tier === "critical" ? d.alertCritical : d.alertHigh}
          </b>
          <small className="text-xs text-slate-600">
            {d.institution} {alert.id} · {alert.score}/100 · {d.level} {d.tiers[alert.tier]}
          </small>
        </span>
      </div>

      <div className="rounded-[22px] border border-white/10 bg-navy-panel/80 p-[18px] shadow-panel backdrop-blur-md transition-transform duration-[600ms] ease-out motion-reduce:transition-none lg:[transform:rotateY(-11deg)_rotateX(5deg)] lg:hover:[transform:rotateY(-4deg)_rotateX(2deg)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-1 pb-3.5 text-[13px] text-[#C3CBDD]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <i key={i} className="h-[9px] w-[9px] rounded-full bg-white/20" />
              ))}
            </span>
            {d.title}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-[#FF8F99]">
              <i aria-hidden className="h-[7px] w-[7px] animate-pulse-live rounded-full bg-alert" />
              {d.live}
            </span>
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                className="rounded-full border border-white/15 px-2.5 py-1 text-xs font-semibold text-[#C3CBDD] transition-colors duration-150 hover:border-white/30 active:scale-[0.97]"
              >
                {paused ? d.resume : d.pause}
              </button>
            )}
          </div>
        </div>

        <div aria-hidden="true" className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <Kpi label={d.kpiRecords} value={`>${records}M`} />
          <Kpi label={d.kpiPatterns} value={patterns} />
          <Kpi
            label={d.kpiComposite}
            value={compositeShown}
            suffix="/100"
            className="hidden sm:block"
          />
        </div>

        <div
          aria-hidden="true"
          className="mt-2.5 rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-2.5 pb-2 pt-3"
        >
          <div className="flex justify-between gap-2.5 px-1 pb-1.5 text-xs text-ink-muted">
            <span>{d.chartTitle}</span>
            <b className="font-semibold text-ink">
              {d.institution} {current.id} · {current.score}
            </b>
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="block h-[150px] w-full sm:h-[170px]"
          >
            <defs>
              <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#4F86E6" stopOpacity="0.45" />
                <stop offset="1" stopColor="#4F86E6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={AREA} fill="url(#dash-area)" />
            <path d={LINE} fill="none" stroke="#8FB4FF" strokeWidth={2.2} />
            {POINTS.map((p) => (
              <circle
                key={p.id}
                cx={p.cx}
                cy={p.cy}
                r={p.tier === "critical" ? 5 : 4}
                fill={TIER_COLOR[p.tier]}
              />
            ))}
            <g
              style={{
                transform: `translateX(${current.cx}px)`,
                transition: reduce ? "none" : "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <line x1={0} x2={0} y1={8} y2={162} stroke="#35E0FF" strokeOpacity={0.6} />
              <circle
                cx={0}
                cy={current.cy}
                r={7}
                fill="none"
                stroke={TIER_COLOR[current.tier]}
                strokeWidth={2}
              />
            </g>
          </svg>
        </div>

        <div aria-hidden="true" className="mt-2.5 grid gap-2.5 sm:grid-cols-[0.8fr_1.2fr]">
          <div className="hidden flex-col items-center rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 sm:flex">
            <span className="self-start text-xs text-ink-muted">{d.gaugeTitle}</span>
            <svg width="150" height="92" viewBox="0 0 150 92">
              <defs>
                <linearGradient id="dash-gauge">
                  <stop offset="0" stopColor="#35E0FF" />
                  <stop offset="0.6" stopColor="#FFC35D" />
                  <stop offset="1" stopColor="#FF6B78" />
                </linearGradient>
              </defs>
              <path
                d="M15 80 A60 60 0 0 1 135 80"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={12}
                strokeLinecap="round"
              />
              <path
                d="M15 80 A60 60 0 0 1 135 80"
                fill="none"
                stroke="url(#dash-gauge)"
                strokeWidth={12}
                strokeLinecap="round"
                strokeDasharray={ARC_LENGTH}
                strokeDashoffset={started || reduce ? ARC_LENGTH * (1 - composite / 100) : ARC_LENGTH}
                style={{
                  transition: reduce
                    ? "none"
                    : "stroke-dashoffset 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              />
              <text
                x="75"
                y="76"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="var(--font-display)"
                fontWeight={800}
                fontSize={26}
              >
                {composite}
              </text>
            </svg>
          </div>
          <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
            <span className="text-xs text-ink-muted">{d.topDimsTitle}</span>
            <BarList
              className="mt-2"
              animate={started}
              reduce={reduce}
              items={topDimensions(4).map((dim) => ({
                label: d.dimensions[dim.key],
                value: dim.score,
              }))}
            />
          </div>
        </div>
      </div>

      <p className="ml-auto mt-3.5 max-w-[56ch] text-right text-xs text-ink-muted">{d.caption}</p>
    </div>
  );
}
