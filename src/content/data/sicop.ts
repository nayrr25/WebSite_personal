/**
 * Resultados reales del caso SICOP (Contraloría General de la República),
 * tal como ya estaban publicados en el sitio. Nancy confirmó el 2026-09-14
 * que los puntajes de las instituciones anonimizadas y de las 8 dimensiones
 * son datos del proyecto. No agregar valores que no vengan del caso.
 */

export type RiskTier = "low" | "medium" | "high" | "critical";

export type DimensionKey =
  | "contractingVelocity"
  | "supplierConcentration"
  | "priceDispersion"
  | "addendumExposure"
  | "sanctionProximity"
  | "transparencyPosture"
  | "controlMaturity"
  | "signalDensity";

export interface Institution {
  id: string;
  score: number;
  tier: RiskTier;
}

export interface RiskDimension {
  key: DimensionKey;
  score: number;
}

export const institutions: readonly Institution[] = [
  { id: "A", score: 23, tier: "low" },
  { id: "B", score: 31, tier: "low" },
  { id: "C", score: 28, tier: "low" },
  { id: "D", score: 47, tier: "medium" },
  { id: "E", score: 52, tier: "medium" },
  { id: "F", score: 58, tier: "medium" },
  { id: "G", score: 49, tier: "medium" },
  { id: "H", score: 71, tier: "high" },
  { id: "I", score: 76, tier: "high" },
  { id: "J", score: 68, tier: "high" },
  { id: "K", score: 84, tier: "critical" },
  { id: "L", score: 91, tier: "critical" },
];

export const riskDimensions: readonly RiskDimension[] = [
  { key: "contractingVelocity", score: 78 },
  { key: "supplierConcentration", score: 62 },
  { key: "priceDispersion", score: 71 },
  { key: "addendumExposure", score: 55 },
  { key: "sanctionProximity", score: 34 },
  { key: "transparencyPosture", score: 82 },
  { key: "controlMaturity", score: 49 },
  { key: "signalDensity", score: 67 },
];

export const caseFacts = {
  recordsMillions: 2.4,
  anomalyPatterns: 47,
  riskDimensions: 8,
  sources: 7,
  scoringSeconds: 1,
} as const;

/** Promedio redondeado de las dimensiones (62 con los datos del caso). */
export function compositeScore(dims: readonly RiskDimension[] = riskDimensions): number {
  return Math.round(dims.reduce((sum, d) => sum + d.score, 0) / dims.length);
}

/** Las `n` dimensiones con mayor puntaje, de mayor a menor. */
export function topDimensions(
  n: number,
  dims: readonly RiskDimension[] = riskDimensions,
): RiskDimension[] {
  return [...dims].sort((a, b) => b.score - a.score).slice(0, n);
}

export function tierCounts(
  list: readonly Institution[] = institutions,
): Record<RiskTier, number> {
  const counts: Record<RiskTier, number> = { low: 0, medium: 0, high: 0, critical: 0 };
  for (const inst of list) counts[inst.tier] += 1;
  return counts;
}

/** El tablero muestra un aviso solo para riesgo alto o crítico. */
export function isAlert(inst: Institution): boolean {
  return inst.tier === "high" || inst.tier === "critical";
}

/** Índice de la última institución con aviso; el tablero arranca mostrándola. */
export function lastAlertIndex(list: readonly Institution[] = institutions): number {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    if (isAlert(list[i])) return i;
  }
  return -1;
}
