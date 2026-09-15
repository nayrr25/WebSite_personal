import { test } from "node:test";
import assert from "node:assert/strict";
import { es } from "../src/content/i18n/es.ts";
import { en } from "../src/content/i18n/en.ts";
import { serviceIcons } from "../src/content/services.ts";

/** Recorre el objeto y devuelve la forma (claves y largo de arreglos). */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value as object).sort().map((k) => [k, shape((value as Record<string, unknown>)[k])]),
    );
  }
  return typeof value;
}

test("español e inglés tienen exactamente la misma estructura", () => {
  assert.deepEqual(shape(en), shape(es));
});

test("4 servicios, cada uno con su ícono y 3 etiquetas", () => {
  assert.equal(es.services.items.length, 4);
  assert.equal(serviceIcons.length, es.services.items.length);
  for (const item of [...es.services.items, ...en.services.items]) {
    assert.equal(item.tags.length, 3);
  }
});

import { caseFacts } from "../src/content/data/sicop.ts";

test("la banda del caso muestra los hechos reales en orden", () => {
  for (const dict of [es, en]) {
    assert.deepEqual(
      dict.caseBand.facts.map((f) => f.value),
      [String(caseFacts.sources), String(caseFacts.anomalyPatterns), String(caseFacts.riskDimensions), `<${caseFacts.scoringSeconds} s`],
    );
  }
});

import { demoStatic } from "../src/content/demos.ts";

test("6 demos, en el mismo orden que su configuración visual", () => {
  for (const dict of [es, en]) {
    assert.deepEqual(dict.demos.map((d) => d.slug), demoStatic.map((d) => d.slug));
  }
  assert.deepEqual(
    es.demos.map((d) => d.status),
    ["Live", "Live", "Live", "In Build", "In Build", "Concept"],
  );
});
