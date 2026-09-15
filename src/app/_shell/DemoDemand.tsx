"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { homeAnchor } from "@/lib/routes";
import {
  DEMAND_FILES,
  DEMAND_PRODUCTS,
  RULE_COUNTS,
  type Confidence,
  type DemandProduct,
  type Severity,
} from "@/content/data/demoDemand";
import styles from "./DemoDemand.module.css";

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

const STATUS_CLASS = { ok: styles.stOk, warn: styles.stWarn, bad: styles.stBad };
const STATUS_ICON = { ok: "✓", warn: "!", bad: "✕" };
const SEVERITY_DOT: Record<Severity, string> = { bad: styles.dBad, warn: styles.dWarn, info: styles.dInfo };
const CONFIDENCE_CLASS: Record<Confidence, [string, string]> = {
  high: [styles.pOk, styles.dOk],
  medium: [styles.pWarn, styles.dWarn],
  low: [styles.pBad, styles.dBad],
  none: [styles.pNa, styles.dInfo],
};

/**
 * Demo interactiva con datos simulados: entrega de un archivo, validación
 * automática, respuesta al analista, pronóstico con rango y resumen por correo.
 * Todo el contenido es genérico y no corresponde a ninguna empresa.
 */
export default function DemoDemand() {
  const { lang, t } = useLanguage();
  const d = t.demoDemand;
  const reduce = !!useReducedMotion();
  const locale = lang === "es" ? "es-CR" : "en-US";
  const fmt = (n: number) => n.toLocaleString(locale);
  const pct = (n: number) => n.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const [selected, setSelected] = useState<number | null>(null);
  const [shown, setShown] = useState(1);
  const [ruleStep, setRuleStep] = useState(-1);
  const [result, setResult] = useState<number | null>(null);
  const [product, setProduct] = useState<number | null>(null);
  const touched = useRef(false);

  const s1 = useRef<HTMLElement>(null);
  const s2 = useRef<HTMLElement>(null);
  const s3 = useRef<HTMLElement>(null);
  const s4 = useRef<HTMLElement>(null);
  const s5 = useRef<HTMLElement>(null);

  const scrollTo = (el: HTMLElement | null) => el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  // Validación: una regla tras otra; al terminar aparece la respuesta.
  useEffect(() => {
    if (ruleStep < 0) return;
    if (ruleStep < RULE_COUNTS.length) {
      const id = window.setTimeout(() => setRuleStep((step) => step + 1), reduce ? 0 : 300);
      return () => window.clearTimeout(id);
    }
    if (result !== null) return;
    const id = window.setTimeout(() => {
      setResult(selected);
      setShown(3);
    }, reduce ? 0 : 380);
    return () => window.clearTimeout(id);
  }, [ruleStep, reduce, result, selected]);

  useEffect(() => {
    if (!touched.current) return;
    const target = { 1: s1, 2: s2, 4: s4, 5: s5 }[shown as 1 | 2 | 4 | 5];
    if (target) scrollTo(target.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  useEffect(() => {
    if (result !== null) scrollTo(s3.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const currentStep = shown >= 4 ? 4 : shown;

  const validate = () => {
    touched.current = true;
    setResult(null);
    setProduct(null);
    setShown(2);
    setRuleStep(0);
  };

  const tryOther = () => {
    setResult(null);
    setProduct(null);
    setRuleStep(-1);
    setShown(1);
  };

  const file = result !== null ? DEMAND_FILES[result] : null;
  const fileText = result !== null ? d.files[result] : null;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <a className={styles.back} href={homeAnchor(lang, "#demos")}>
            <span aria-hidden>←</span> {d.back}
          </a>
          <p className={styles.eyebrow}>{d.eyebrow}</p>
          <h1 className={styles.title}>{d.title}</h1>
          <p className={styles.lead}>{d.lead}</p>

          <div className={styles.facts}>
            {d.facts.map((fact) => (
              <div key={fact.title} className={styles.fact}>
                <b>{fact.title}</b>
                <span>{fact.body}</span>
              </div>
            ))}
          </div>

          <ul className={styles.tools} aria-label={d.toolsLabel}>
            {d.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>

          <p className={styles.simnote}>
            <b>{d.simNoteTitle}</b> {d.simNote}
          </p>
        </div>
      </header>

      <div className={styles.wrap}>
        <ol className={styles.steps} aria-label={d.stepsLabel}>
          {d.steps.map((label, i) => (
            <li
              key={label}
              className={cx(styles.step, i + 1 === currentStep && styles.stepOn, i + 1 < currentStep && styles.stepDone)}
              aria-current={i + 1 === currentStep ? "step" : undefined}
            >
              <span className={styles.n}>{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>

        {/* Paso 1 */}
        <section ref={s1} className={styles.blk} aria-labelledby="dd-s1">
          <p className={styles.kicker}>{d.stepWord} 1</p>
          <h2 id="dd-s1" className={styles.h2}>{d.s1Title}</h2>
          <p className={styles.lead2}>{d.s1Lead}</p>
          <div className={styles.files}>
            {DEMAND_FILES.map((f, i) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={selected === i}
                className={cx(styles.file, selected === i && styles.fileSel)}
                onClick={() => setSelected(i)}
              >
                <span className={styles.ftag}>{d.files[i].tag}</span>
                <span className={cx(styles.fn, styles.mono)}>{d.files[i].name}</span>
                <span className={styles.fmeta}>
                  {fmt(f.rows)} {d.rowsWord} · {d.files[i].meta}
                </span>
              </button>
            ))}
          </div>
          <div className={styles.actions}>
            <button type="button" className={cx(styles.btn, styles.btnW)} disabled={selected === null} onClick={validate}>
              {d.validate}
            </button>
            <span className={styles.hint} aria-live="polite">
              {selected === null ? d.hintIdle : `${d.files[selected].tag} · ${d.hintReady}`}
            </span>
          </div>
        </section>

        {/* Paso 2 */}
        {shown >= 2 && (
          <section ref={s2} className={styles.blk} aria-labelledby="dd-s2">
            <p className={styles.kicker}>{d.stepWord} 2</p>
            <h2 id="dd-s2" className={styles.h2}>{d.s2Title}</h2>
            <p className={styles.lead2}>{d.s2Lead}</p>
            <div className={styles.card}>
              <ul className={styles.rules}>
                {d.rules.map((rule, i) => {
                  const done = i < ruleStep || result !== null;
                  const active = i === ruleStep && result === null;
                  return (
                    <li key={`${rule.group}-${rule.text}`} className={cx(done && styles.ruleDone, active && styles.ruleActive)}>
                      <span className={styles.tick} aria-hidden>
                        {done ? "✓" : ""}
                      </span>
                      <span>
                        <b>{rule.group}</b> — {rule.text}
                      </span>
                      <span className={styles.rcount}>
                        {RULE_COUNTS[i]} {RULE_COUNTS[i] === 1 ? d.ruleOne : d.ruleMany}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* Paso 3 */}
        {shown >= 3 && file && fileText && (
          <section ref={s3} className={styles.blk} aria-labelledby="dd-s3" aria-live="polite">
            <p className={styles.kicker}>{d.stepWord} 3</p>
            <h2 id="dd-s3" className={styles.h2}>{d.s3Title}</h2>
            <p className={styles.lead2}>{d.statusLead[file.status]}</p>
            <div className={styles.card}>
              <div className={cx(styles.statusbar, STATUS_CLASS[file.status])}>
                <span className={styles.ic} aria-hidden>
                  {STATUS_ICON[file.status]}
                </span>
                {d.status[file.status]} — {fileText.tag} · {d.period}
              </div>
              <div className={styles.kpis}>
                {[file.rows, file.loaded, file.blocking, file.warnings].map((value, i) => (
                  <div key={d.kpis[i]}>
                    <div className={styles.kv}>{fmt(value)}</div>
                    <div className={styles.kl}>{d.kpis[i]}</div>
                  </div>
                ))}
              </div>
              {file.findings.length > 0 && (
                <>
                  <h3 className={styles.h3}>{d.findingsTitle}</h3>
                  <div className={styles.tblScroll}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>{d.findingsHead[0]}</th>
                          <th>{d.findingsHead[1]}</th>
                          <th className={styles.num}>{d.findingsHead[2]}</th>
                          <th>{d.findingsHead[3]}</th>
                          <th>{d.findingsHead[4]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {file.findings.map((finding, i) => (
                          <tr key={finding.rule}>
                            <td className={styles.mono}>{finding.rule}</td>
                            <td>
                              <span className={styles.sev}>
                                <span className={cx(styles.dot, SEVERITY_DOT[finding.severity])} />
                                {d.severity[finding.severity]}
                              </span>
                            </td>
                            <td className={styles.num}>{finding.rows}</td>
                            <td>{fileText.findings[i].finding}</td>
                            <td>{fileText.findings[i].action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              <p className={styles.nota}>{fileText.note}</p>
            </div>
            <div className={styles.actions}>
              {file.status === "bad" ? (
                <button
                  type="button"
                  className={cx(styles.btn, styles.btnW)}
                  onClick={() => {
                    setSelected(0);
                    setResult(0);
                  }}
                >
                  {d.continueBad}
                </button>
              ) : (
                <button type="button" className={cx(styles.btn, styles.btnW)} onClick={() => setShown(4)}>
                  {d.continueOk} <span aria-hidden>→</span>
                </button>
              )}
              <button type="button" className={cx(styles.btn, styles.btnO)} onClick={tryOther}>
                {d.tryOther}
              </button>
            </div>
          </section>
        )}

        {/* Paso 4 */}
        {shown >= 4 && (
          <section ref={s4} className={styles.blk} aria-labelledby="dd-s4">
            <p className={styles.kicker}>{d.stepWord} 4</p>
            <h2 id="dd-s4" className={styles.h2}>{d.s4Title}</h2>
            <p className={styles.lead2}>{d.s4Lead}</p>
            <div className={styles.card}>
              <div className={styles.tblScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{d.fcHead.code}</th>
                      <th>{d.fcHead.product}</th>
                      <th className={styles.num}>
                        {d.fcHead.real}
                        <span className={styles.sub}>{d.fcHead.realSub}</span>
                      </th>
                      <th className={cx(styles.num, styles.hl)}>
                        {d.fcHead.forecast}
                        <span className={styles.sub}>{d.fcHead.forecastSub}</span>
                      </th>
                      <th className={styles.num}>{d.fcHead.range}</th>
                      <th className={styles.num}>{d.fcHead.error}</th>
                      <th>{d.fcHead.confidence}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMAND_PRODUCTS.map((p, i) => {
                      const open = () => setProduct(i);
                      return (
                        <tr
                          key={p.sku}
                          tabIndex={0}
                          aria-label={`${d.productAria} ${d.products[i]}`}
                          aria-selected={product === i}
                          className={cx(styles.prod, product === i && styles.prodSel)}
                          onClick={open}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              open();
                            }
                          }}
                        >
                          <td className={styles.mono}>{p.sku}</td>
                          <td>{d.products[i]}</td>
                          <td className={styles.num}>{fmt(p.real)}</td>
                          <td className={cx(styles.num, styles.hl)}>{p.forecast !== null ? fmt(p.forecast) : "—"}</td>
                          <td className={styles.num}>{p.low !== null && p.high !== null ? `${fmt(p.low)} – ${fmt(p.high)}` : "—"}</td>
                          <td className={styles.num}>{p.error !== null ? `${pct(p.error)} %` : "—"}</td>
                          <td>
                            <span className={cx(styles.pill, CONFIDENCE_CLASS[p.confidence][0])}>
                              <span className={cx(styles.dot, CONFIDENCE_CLASS[p.confidence][1])} />
                              {d.confidence[p.confidence]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className={styles.nota}>{d.s4Note}</p>
            </div>

            {product !== null && (
              <div className={cx(styles.card, styles.detail)} aria-live="polite">
                <h3 className={styles.h3}>
                  {d.products[product]} <span className={styles.mono}>· {DEMAND_PRODUCTS[product].sku}</span>
                </h3>
                {DEMAND_PRODUCTS[product].forecast === null ? (
                  <p className={styles.lead2} style={{ marginBottom: 0 }}>
                    {d.noModel}
                  </p>
                ) : (
                  <>
                    <p className={styles.lead2} style={{ marginBottom: 14 }}>
                      {d.detailLead} <b>{pct(DEMAND_PRODUCTS[product].error ?? 0)} %</b>.
                    </p>
                    <ForecastChart
                      product={DEMAND_PRODUCTS[product]}
                      name={d.products[product]}
                      months={d.months}
                      nextMonth={d.nextMonth}
                      labels={{ aria: d.chartAria, today: d.today, forecast: d.forecastWord, units: d.units }}
                      fmt={fmt}
                    />
                    <ul className={styles.legend}>
                      <li>
                        <i className={styles.lk} /> {d.legend[0]}
                      </li>
                      <li>
                        <i className={cx(styles.lk, styles.lkDash)} /> {d.legend[1]}
                      </li>
                      <li>
                        <i className={cx(styles.lk, styles.lkBand)} /> {d.legend[2]}
                      </li>
                    </ul>
                  </>
                )}
              </div>
            )}

            <div className={styles.actions}>
              <button type="button" className={cx(styles.btn, styles.btnO)} onClick={() => setShown(5)}>
                {d.showMail}
              </button>
            </div>
          </section>
        )}

        {/* Cierre */}
        {shown >= 5 && (
          <section ref={s5} className={styles.blk} aria-labelledby="dd-s5">
            <p className={styles.kicker}>{d.closeKicker}</p>
            <h2 id="dd-s5" className={styles.h2}>{d.s5Title}</h2>
            <p className={styles.lead2}>{d.s5Lead}</p>
            <div className={styles.mail}>
              <div className={styles.mailH}>
                <b>{d.mailToLabel}</b> {d.mailTo} · <b>{d.mailSubjectLabel}</b> {d.mailSubject}
              </div>
              <div className={styles.mailB}>
                {d.mail.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
                <h3 className={styles.mailSub}>{d.patternsTitle}</h3>
                <ul className={styles.patterns}>
                  {d.patterns.map((pattern) => (
                    <li key={pattern.title}>
                      <b>{pattern.title}.</b> {pattern.body}
                    </li>
                  ))}
                </ul>
                <p className={styles.nota}>{d.mailNote}</p>
              </div>
            </div>
          </section>
        )}

        <section className={styles.cta} aria-labelledby="dd-cta">
          <h2 id="dd-cta" className={styles.h2}>{d.ctaTitle}</h2>
          <p>{d.ctaBody}</p>
          <a className={cx(styles.btn, styles.btnW)} href={homeAnchor(lang, "#contact")}>
            {d.ctaButton} <span aria-hidden>→</span>
          </a>
        </section>
      </div>
    </div>
  );
}

/** Una sola serie: el pronóstico se distingue por trazo punteado y banda de rango. */
function ForecastChart({
  product,
  name,
  months,
  nextMonth,
  labels,
  fmt,
}: {
  product: DemandProduct;
  name: string;
  months: readonly string[];
  nextMonth: string;
  labels: { aria: string; today: string; forecast: string; units: string };
  fmt: (n: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const { history, forecast, low, high } = product;
  if (forecast === null || low === null || high === null) return null;

  const W = 900;
  const H = 300;
  const ML = 58;
  const MR = 96;
  const MT = 18;
  const MB = 34;
  const iw = W - ML - MR;
  const ih = H - MT - MB;
  const values = history.filter((v): v is number => v !== null);
  const lo = Math.min(...values, low);
  const hi = Math.max(...values, high);
  const pad = (hi - lo) * 0.12;
  const yMin = Math.max(0, Math.floor((lo - pad) / 500) * 500);
  const yMax = Math.ceil((hi + pad) / 500) * 500;
  const n = history.length;
  const X = (i: number) => ML + (iw * i) / n;
  const Y = (v: number) => MT + ih - ((v - yMin) / (yMax - yMin)) * ih;
  const points = history.flatMap((v, i) => (v === null ? [] : [{ i, x: X(i), y: Y(v), v }]));
  const line = points.map((p, k) => `${k ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const last = points[points.length - 1];
  const fx = X(n);
  const fy = Y(forecast);
  const ticks = [0, 1, 2, 3, 4].map((k) => Math.round(yMin + ((yMax - yMin) * k) / 4));
  const hovered = hover !== null ? points.find((p) => p.i === hover) : undefined;

  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${labels.aria} ${name}: ${fmt(forecast)} ${labels.units} (${fmt(low)} – ${fmt(high)})`}
      onMouseLeave={() => setHover(null)}
    >
      {ticks.map((v) => (
        <g key={v}>
          <line x1={ML} x2={ML + iw + 56} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,.07)" strokeWidth={1} />
          <text x={ML - 11} y={Y(v) + 4} textAnchor="end" fontSize={12} fill="#8C98B3">
            {fmt(v)}
          </text>
        </g>
      ))}
      {months.map((m, i) =>
        i % 3 === 0 || i === n - 1 ? (
          <text key={m} x={X(i)} y={H - 12} textAnchor="middle" fontSize={12} fill="#8C98B3">
            {m}
          </text>
        ) : null,
      )}
      <text x={fx} y={H - 12} textAnchor="middle" fontSize={12} fontWeight={700} fill="#35E0FF">
        {nextMonth}
      </text>
      <line x1={(last.x + fx) / 2} x2={(last.x + fx) / 2} y1={MT - 6} y2={MT + ih} stroke="rgba(255,255,255,.22)" strokeDasharray="3 3" />
      <text x={(last.x + fx) / 2 + 6} y={MT + 4} fontSize={12} fill="#8C98B3">
        {labels.today}
      </text>
      <rect x={fx - 13} y={Y(high)} width={26} height={Y(low) - Y(high)} fill="rgba(143,180,255,.2)" rx={4} />
      <path d={line} fill="none" stroke="#8FB4FF" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <path d={`M${last.x} ${last.y} L${fx} ${fy}`} fill="none" stroke="#35E0FF" strokeWidth={2.5} strokeDasharray="6 4" strokeLinecap="round" />
      {points.map((p) => (
        <circle key={p.i} cx={p.x} cy={p.y} r={hover === p.i ? 5 : 3.2} fill="#0A1024" stroke="#8FB4FF" strokeWidth={2} />
      ))}
      <circle cx={fx} cy={fy} r={6} fill="#35E0FF" stroke="#0A1024" strokeWidth={2.5} />
      <text x={fx + 16} y={fy - 8} fontSize={14} fontWeight={700} fill="#FFFFFF">
        {fmt(forecast)}
      </text>
      <text x={fx + 16} y={fy + 9} fontSize={12} fill="#8C98B3">
        {labels.forecast}
      </text>
      {points.map((p) => (
        <rect key={`hit-${p.i}`} x={p.x - 14} y={MT} width={28} height={ih} fill="transparent" onMouseEnter={() => setHover(p.i)} />
      ))}
      {hovered && (
        <g pointerEvents="none" transform={`translate(${Math.min(hovered.x + 12, W - 150)} ${Math.max(hovered.y - 52, 0)})`}>
          <rect width={136} height={44} rx={10} fill="#FFFFFF" />
          <text x={12} y={18} fontSize={12} fill="#0A1024">
            {months[hovered.i]}
          </text>
          <text x={12} y={35} fontSize={13} fontWeight={700} fill="#0A1024">
            {fmt(hovered.v)} {labels.units}
          </text>
        </g>
      )}
    </svg>
  );
}
