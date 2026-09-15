import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { es } from "../src/content/i18n/es.ts";
import { en } from "../src/content/i18n/en.ts";

const ROOT = new URL("..", import.meta.url).pathname;

function collect(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return collect(path);
    return [".ts", ".tsx", ".css"].includes(extname(path)) ? [path] : [];
  });
}

const SRC = collect(join(ROOT, "src")).map((path) => ({
  path: path.replace(ROOT, ""),
  text: readFileSync(path, "utf8"),
}));
const LLMS = readFileSync(join(ROOT, "public/llms.txt"), "utf8");

const offenders = (re: RegExp) => SRC.filter((file) => re.test(file.text)).map((file) => file.path);

test("ningún gráfico usa números aleatorios", () => {
  assert.deepEqual(offenders(/Math\.random|mulberry32/), []);
});

test("sin transition-all", () => {
  assert.deepEqual(offenders(/transition-all/), []);
});

test("sin texto funcional menor a 12 px", () => {
  assert.deepEqual(offenders(/text-\[(9|10|11)(\.\d+)?px\]/), []);
});

test("sin clases ni variables del tema anterior", () => {
  assert.deepEqual(
    offenders(/\b(bg-bg-|text-text-|border-border-|accent-mint|accent-deep|accent-teal|accent-emerald|ease-smooth|recharts)|--bg-base|--text-primary/),
    [],
  );
});

test("el correo del dominio no aparece en el sitio", () => {
  assert.deepEqual(offenders(/nancyrodriguez@n-ai\.dev/), []);
  assert.doesNotMatch(LLMS, /nancyrodriguez@n-ai\.dev/);
});

test("llms.txt apunta a las secciones nuevas", () => {
  assert.match(LLMS, /n-ai\.dev\/casos\/sicop/);
  assert.doesNotMatch(LLMS, /#case-study|#pipeline|#about|#capabilities/);
});

test("cada ancla del menú existe en una sección", () => {
  const sections = SRC.filter((file) => file.path.startsWith("src/components/sections/"))
    .map((file) => file.text)
    .join("\n");
  for (const item of es.nav) {
    assert.match(sections, new RegExp(`id="${item.href.slice(1)}"`), item.href);
  }
  assert.deepEqual(en.nav.map((item) => item.href), es.nav.map((item) => item.href));
});

test("ningún texto habla de un equipo", () => {
  assert.doesNotMatch(JSON.stringify(es), /\bequipos?\b|\bnuestr[oa]s?\b|\btrabajamos\b/i);
  assert.doesNotMatch(JSON.stringify(en), /\bteams?\b|\bour experts\b|\bwe work\b/i);
});
