import { test } from "node:test";
import assert from "node:assert/strict";
import { HOME_PATH, CASE_SICOP_PATH, DEMO_DEMAND_PATH, homeAnchor, alternateHref } from "../src/lib/routes.ts";

test("rutas base por idioma", () => {
  assert.deepEqual(HOME_PATH, { es: "/", en: "/en" });
  assert.deepEqual(CASE_SICOP_PATH, { es: "/casos/sicop", en: "/en/cases/sicop" });
});

test("las anclas del menú funcionan desde cualquier página", () => {
  assert.equal(homeAnchor("es", "#servicios"), "/#servicios");
  assert.equal(homeAnchor("en", "#demos"), "/en#demos");
});

test("el conmutador de idioma lleva a la página equivalente", () => {
  assert.equal(alternateHref("/", "es"), "/en");
  assert.equal(alternateHref("/en", "en"), "/");
  assert.equal(alternateHref("/casos/sicop", "es"), "/en/cases/sicop");
  assert.equal(alternateHref("/en/cases/sicop", "en"), "/casos/sicop");
  assert.equal(alternateHref(DEMO_DEMAND_PATH.es, "es"), "/en/demos/demand-planning");
  assert.equal(alternateHref(DEMO_DEMAND_PATH.en, "en"), "/demos/planificacion-de-demanda");
});
