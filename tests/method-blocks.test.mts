import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { STACK_LAYERS } from "../src/content/data/stack.ts";
import { es } from "../src/content/i18n/es.ts";
import { en } from "../src/content/i18n/en.ts";

const ROOT = new URL("..", import.meta.url).pathname;

test("el tablero en vivo no cambia con la pared de bloques", () => {
  // Nancy pidió que el dashboard siga funcionando igual. Si este hash cambia,
  // alguien tocó LiveDashboard.tsx: revisar el cambio con ella antes de actualizarlo.
  const source = readFileSync(join(ROOT, "src/components/sections/LiveDashboard.tsx"));
  assert.equal(
    createHash("sha256").update(source).digest("hex"),
    "6b695e8aebd5c90eea03dd312e3ac66086068bbfb965383531ab1c2af92307ec",
  );
});

test("una capa de herramientas por fase del método, intercaladas 4 y 3", () => {
  assert.equal(STACK_LAYERS.length, es.method.steps.length);
  assert.deepEqual(STACK_LAYERS.map((layer) => layer.length), [4, 3, 4, 3]);
  const tools = STACK_LAYERS.flat();
  assert.equal(new Set(tools).size, tools.length, "herramientas repetidas");
});

test("la pared de bloques tiene textos en los dos idiomas", () => {
  for (const dict of [es, en]) {
    assert.ok(dict.method.stackCaption.length > 0);
    assert.ok(dict.method.stackSrLabel.length > 0);
  }
});

test("la sección Método ya no usa la línea con destello", () => {
  const method = readFileSync(join(ROOT, "src/components/sections/Method.tsx"), "utf8");
  assert.doesNotMatch(method, /animate-beam/);
  assert.match(method, /MethodBlocks/);
});
