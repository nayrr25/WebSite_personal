import { test } from "node:test";
import assert from "node:assert/strict";
import {
  institutions,
  riskDimensions,
  caseFacts,
  compositeScore,
  topDimensions,
  tierCounts,
  isAlert,
  lastAlertIndex,
} from "../src/content/data/sicop.ts";

test("las 12 instituciones son las del caso publicado, en orden A–L", () => {
  assert.deepEqual(
    institutions.map((i) => `${i.id}:${i.score}:${i.tier}`),
    [
      "A:23:low", "B:31:low", "C:28:low", "D:47:medium", "E:52:medium", "F:58:medium",
      "G:49:medium", "H:71:high", "I:76:high", "J:68:high", "K:84:critical", "L:91:critical",
    ],
  );
});

test("las 8 dimensiones tienen los puntajes publicados", () => {
  assert.deepEqual(
    riskDimensions.map((d) => d.score),
    [78, 62, 71, 55, 34, 82, 49, 67],
  );
});

test("el compuesto es el promedio redondeado: 62", () => {
  assert.equal(compositeScore(), 62);
});

test("las 4 dimensiones con mayor puntaje salen ordenadas", () => {
  assert.deepEqual(
    topDimensions(4).map((d) => d.key),
    ["transparencyPosture", "contractingVelocity", "priceDispersion", "signalDensity"],
  );
});

test("conteo por nivel: 3 bajo, 4 medio, 3 alto, 2 crítico", () => {
  assert.deepEqual(tierCounts(), { low: 3, medium: 4, high: 3, critical: 2 });
});

test("alerta solo en riesgo alto o crítico; la última es L", () => {
  assert.deepEqual(institutions.filter(isAlert).map((i) => i.id), ["H", "I", "J", "K", "L"]);
  assert.equal(lastAlertIndex(), 11);
});

test("hechos del caso", () => {
  assert.deepEqual(caseFacts, {
    recordsMillions: 2.4,
    anomalyPatterns: 47,
    riskDimensions: 8,
    sources: 7,
    scoringSeconds: 1,
  });
  assert.equal(riskDimensions.length, caseFacts.riskDimensions);
});

import { es } from "../src/content/i18n/es.ts";
import { en } from "../src/content/i18n/en.ts";

test("el resumen accesible del tablero usa las cifras reales", () => {
  for (const dict of [es, en]) {
    const summary = dict.dashboard.srSummary;
    assert.match(summary, new RegExp(`\\b${compositeScore()}\\b`));
    assert.match(summary, /\b91\b/);
    assert.match(summary, /\b84\b/);
    assert.match(summary, /\b47\b/);
    assert.equal(Object.keys(dict.dashboard.dimensions).length, riskDimensions.length);
  }
});
