import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DEMAND_FILES, DEMAND_PRODUCTS, RULE_COUNTS } from "../src/content/data/demoDemand.ts";
import { DEMO_DEMAND_PATH } from "../src/lib/routes.ts";
import { es } from "../src/content/i18n/es.ts";
import { en } from "../src/content/i18n/en.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (path: string) => readFileSync(join(ROOT, path), "utf8");

test("los textos de la demo calzan con sus datos simulados", () => {
  for (const dict of [es, en]) {
    const d = dict.demoDemand;
    assert.equal(d.files.length, DEMAND_FILES.length);
    DEMAND_FILES.forEach((file, i) => assert.equal(d.files[i].findings.length, file.findings.length, file.id));
    assert.equal(d.rules.length, RULE_COUNTS.length);
    assert.equal(d.products.length, DEMAND_PRODUCTS.length);
    assert.equal(d.steps.length, 4);
    assert.equal(d.patterns.length, 4, "el reporte incluye 4 patrones detectados");
    for (const product of DEMAND_PRODUCTS) assert.equal(product.history.length, d.months.length, product.sku);
  }
});

test("la demo es genérica: no nombra empresas ni sectores reales", () => {
  const text = JSON.stringify([es.demoDemand, en.demoDemand, DEMAND_FILES, DEMAND_PRODUCTS]);
  assert.doesNotMatch(text, /w[uü]rth|fifco|heineken|bebida|cerveza|beer|beverage|₡/i);
  assert.match(es.demoDemand.simNote, /No corresponden a ninguna empresa/);
});

test("los productos sin historia no reciben pronóstico", () => {
  const noModel = DEMAND_PRODUCTS.filter((product) => product.confidence === "none");
  assert.ok(noModel.length > 0);
  for (const product of noModel) assert.equal(product.forecast, null);
});

test("la demo tiene página en los dos idiomas, sitemap, llms.txt y enlaces desde la portada", () => {
  assert.match(read("src/app/(es)/demos/planificacion-de-demanda/page.tsx"), /DemoDemand/);
  assert.match(read("src/app/(en)/en/demos/demand-planning/page.tsx"), /DemoDemand/);
  const sitemap = read("src/app/sitemap.ts");
  assert.ok(sitemap.includes(DEMO_DEMAND_PATH.es) && sitemap.includes(DEMO_DEMAND_PATH.en));
  assert.ok(read("public/llms.txt").includes(`https://n-ai.dev${DEMO_DEMAND_PATH.es}`));
  assert.match(read("src/components/sections/DemoShowcase.tsx"), /DEMO_DEMAND_PATH/);
  assert.match(read("src/components/sections/Services.tsx"), /DEMO_DEMAND_PATH/);
});
