import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EDUCATION } from "../src/content/data/education.ts";
import { es } from "../src/content/i18n/es.ts";
import { en } from "../src/content/i18n/en.ts";

const ROOT = new URL("..", import.meta.url).pathname;

test("la formación incluye el máster en IA de la UNIR y la licenciatura en Economía", () => {
  const master = EDUCATION.find((item) => item.title.es === "Máster en Inteligencia Artificial");
  assert.ok(master, "falta el máster en IA");
  assert.match(master.school, /UNIR/);
  assert.equal(master.credential, "degree");
  assert.equal(master.recognizedBy, "Universidad de Costa Rica");
  assert.ok(EDUCATION.some((item) => item.title.es === "Licenciatura en Economía"));
});

test("la maestría en Estadística se muestra como egresada y no como título obtenido", () => {
  const stats = EDUCATION.find((item) => item.school === "Universidad de Costa Rica");
  assert.ok(stats);
  assert.equal(stats.credential, null);
  assert.equal(stats.status?.es, "egresada");
  assert.doesNotMatch(stats.title.es, /egresada/);
});

test("cada estudio tiene título en español e inglés", () => {
  for (const item of EDUCATION) {
    assert.ok(item.title.es && item.title.en, item.school);
  }
});

test("la bio nombra sectores y no empleadores", () => {
  for (const dict of [es, en]) {
    assert.match(dict.leadership.bio, /13/);
    assert.doesNotMatch(dict.leadership.bio, /HEINEKEN|FIFCO|Banco de Costa Rica|SUTEL|CONARE/i);
    assert.ok(dict.leadership.educationTitle);
    assert.match(dict.leadership.certifications, /12/);
  }
});

test("el schema y llms.txt publican la formación", () => {
  const schema = readFileSync(join(ROOT, "src/components/seo/StructuredData.tsx"), "utf8");
  assert.match(schema, /alumniOf/);
  assert.match(schema, /hasCredential/);
  const llms = readFileSync(join(ROOT, "public/llms.txt"), "utf8");
  assert.match(llms, /Máster en Inteligencia Artificial — UNIR/);
  assert.match(llms, /Estadística — Universidad de Costa Rica \(egresada\)/);
});
