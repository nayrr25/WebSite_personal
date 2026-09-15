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

test("SEO: el schema no declara búsqueda interna ni alias ambiguos", () => {
  assert.deepEqual(offenders(/SearchAction|Neural A(I|rtificial)/), []);
});

test("SEO: logo liviano y con las dimensiones que declara el schema", () => {
  const png = readFileSync(join(ROOT, "public/logo.png"));
  assert.ok(png.length < 100_000, `logo.png pesa ${png.length} bytes`);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  const schema = SRC.find((file) => file.path.endsWith("StructuredData.tsx"))!.text;
  assert.match(schema, new RegExp(`width: ${width},\\s*height: ${height},`));
});

test("SEO: los contadores del tablero parten del valor real (HTML sin ceros)", () => {
  const dashboard = SRC.find((file) => file.path.endsWith("LiveDashboard.tsx"))!.text;
  assert.match(dashboard, /useState\(target\)/);
});

test("SEO: sin meta keywords, hreflang es y el título dice Costa Rica", () => {
  assert.deepEqual(offenders(/^\s*keywords:/m), []);
  for (const file of SRC.filter((f) => /layout\.tsx$|sicop\/page\.tsx$|sitemap\.ts$/.test(f.path))) {
    assert.match(file.text, /\bes: /, `${file.path} sin hreflang "es"`);
  }
  assert.match(`${es.hero.headlineStart} ${es.hero.headlineHighlight} ${es.hero.headlineEnd}`, /Costa Rica/);
  assert.match(`${en.hero.headlineStart} ${en.hero.headlineHighlight} ${en.hero.headlineEnd}`, /Costa Rica/);
  const schema = SRC.find((file) => file.path.endsWith("StructuredData.tsx"))!.text;
  assert.doesNotMatch(schema, /Nancy\.jpg/);
});

test("ningún texto habla de un equipo", () => {
  assert.doesNotMatch(JSON.stringify(es), /\bequipos?\b|\bnuestr[oa]s?\b|\btrabajamos\b/i);
  assert.doesNotMatch(JSON.stringify(en), /\bteams?\b|\bour experts\b|\bwe work\b/i);
});
