/**
 * Datos SIMULADOS de la demo de validación y pronóstico de demanda.
 * Genéricos a propósito: regiones y productos ficticios, sin moneda ni sector.
 * Los textos visibles viven en i18n (`demoDemand`); aquí solo van los números.
 */
export type FileStatus = "ok" | "warn" | "bad";
export type Severity = "bad" | "warn" | "info";
export type Confidence = "high" | "medium" | "low" | "none";

export type DemandFile = {
  id: string;
  status: FileStatus;
  rows: number;
  loaded: number;
  blocking: number;
  warnings: number;
  findings: { rule: string; severity: Severity; rows: string }[];
};

export const DEMAND_FILES: readonly DemandFile[] = [
  { id: "central", status: "ok", rows: 4812, loaded: 4812, blocking: 0, warnings: 0, findings: [] },
  {
    id: "norte",
    status: "bad",
    rows: 1286,
    loaded: 0,
    blocking: 3,
    warnings: 1,
    findings: [
      { rule: "D01", severity: "bad", rows: "14" },
      { rule: "A03", severity: "bad", rows: "—" },
      { rule: "T01", severity: "bad", rows: "3" },
      { rule: "P02", severity: "warn", rows: "2" },
    ],
  },
  {
    id: "sur",
    status: "warn",
    rows: 7940,
    loaded: 7940,
    blocking: 0,
    warnings: 2,
    findings: [
      { rule: "H01", severity: "warn", rows: "—" },
      { rule: "N04", severity: "info", rows: "31" },
    ],
  },
];

/** Cantidad de reglas por grupo de validación (mismo orden que `demoDemand.rules`). */
export const RULE_COUNTS: readonly number[] = [12, 4, 1, 6, 3, 5, 7, 4];

export type DemandProduct = {
  sku: string;
  real: number;
  forecast: number | null;
  low: number | null;
  high: number | null;
  error: number | null;
  confidence: Confidence;
  /** 18 meses: de marzo 2025 a agosto 2026. */
  history: (number | null)[];
};

export const DEMAND_PRODUCTS: readonly DemandProduct[] = [
  { sku: "P-A012", real: 11480, forecast: 11120, low: 10180, high: 12060, error: 6.2, confidence: "high",
    history: [9800, 10200, 11400, 12100, 12800, 11900, 10600, 10100, 11200, 13400, 9700, 9900, 10400, 10800, 11700, 12500, 13100, 11480] },
  { sku: "P-B024", real: 7940, forecast: 8310, low: 7420, high: 9200, error: 8.9, confidence: "high",
    history: [6900, 7100, 7600, 8200, 8800, 8100, 7300, 7000, 7500, 9100, 6800, 6950, 7200, 7500, 8000, 8600, 9000, 7940] },
  { sku: "P-C001", real: 5210, forecast: 5640, low: 4480, high: 6800, error: 17.4, confidence: "medium",
    history: [3900, 4100, 4600, 5100, 5800, 5200, 4300, 4000, 4400, 6200, 3800, 3950, 4300, 4700, 5300, 5900, 6100, 5210] },
  { sku: "P-D006", real: 3870, forecast: 3640, low: 3180, high: 4100, error: 9.1, confidence: "high",
    history: [3400, 3500, 3700, 3900, 4100, 3800, 3500, 3400, 3600, 4300, 3300, 3350, 3500, 3600, 3800, 4000, 4200, 3870] },
  { sku: "P-E003", real: 1420, forecast: 1510, low: 980, high: 2040, error: 26.8, confidence: "low",
    history: [900, 1500, 800, 1900, 1100, 2100, 700, 1600, 1000, 2300, 850, 1750, 950, 1850, 1200, 2000, 1300, 1420] },
  { sku: "P-F100", real: 640, forecast: null, low: null, high: null, error: null, confidence: "none",
    history: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 520, 610, 640] },
];
