# Rediseño de n-ai.dev (estilo C) · Plan de implementación

> **Para agentes:** SUB-SKILL REQUERIDA: usar superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans para ejecutar este plan tarea por tarea. Los pasos usan casillas (`- [ ]`) para el seguimiento.

**Objetivo:** construir la portada de la maqueta v3 (estilo C con datos reales) y la página `/casos/sicop`, en español e inglés, sin publicar en producción hasta que Nancy apruebe el PR.

**Arquitectura:** Next.js 14 App Router con dos layouts raíz (`(es)` sirve `/`, `(en)` sirve `/en`). Los textos viven en `src/content/i18n/{es,en}.ts` (el tipo `Strings = typeof es` obliga a que ambos coincidan). Los datos reales del caso SICOP pasan a un módulo puro, `src/content/data/sicop.ts`, que consumen el tablero y la página del caso. Cada tarea reescribe un componente junto con sus claves de i18n, para que `pnpm build` quede en verde al final de cada una.

**Stack:** Next.js 14.2, React 18, TypeScript 5, Tailwind 3.4, framer-motion 11, lucide-react. Pruebas con el runner nativo de Node 22 (`node --test`, con eliminación de tipos), sin dependencias nuevas.

**Referencias:** [especificación](../specs/2026-09-14-rediseno-consultora-design.md) (revisión 3) · [maqueta v3](../specs/assets/2026-09-14-maqueta-v3.src.html) · [crítica](../reviews/2026-09-14-critica-impeccable.md)

## Restricciones globales

- **Node 22 en cada comando.** Antes de ejecutar cualquier comando: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"`. El shell de las herramientas puede arrancar con Node 18.
- **Rama `feat/rediseno-consultora`.** Después de cada tarea: commit **y** `git push`, porque GitHub es la memoria del proyecto. Nunca se hace push a `main`.
- **Commits** con el pie `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- **Sin dependencias nuevas.** Al final se **quita** `recharts`.
- **Solo la fundadora:** ningún texto dice "equipo", "nuestro/nuestros", "trabajamos" ni usa el plural de equipo. La voz de marca va en tercera persona ("N-AI diseña…") y los llamados a la acción en **tú**.
- **Cero datos inventados:** solo las cifras reales (+400%, >2.4M, 47, 8, 7, <1 s), los puntajes de las 12 instituciones anonimizadas y los de las 8 dimensiones de riesgo. Ningún gráfico usa `Math.random` ni `mulberry32`.
- **Correo de contacto:** `nanyrr25@gmail.com` en todo el sitio.
- **Accesibilidad:**
  - contraste ≥4,5:1;
  - texto funcional ≥12 px (prohibido `text-[9px]`, `text-[10px]` y `text-[11px]`);
  - `:focus-visible` visible;
  - `active:scale-[0.97]` en botones;
  - hover solo con `(hover: hover)`;
  - con movimiento reducido: sin bucles, pulsos ni desplazamientos.
- **Movimiento:** curva `cubic-bezier(0.23, 1, 0.32, 1)`; UI ≤300 ms; entradas ≤500 ms; nada de `transition-all`.
- **Estilo C (aprobado):** azul noche `#0A1024 → #070B18`; acentos `#8FB4FF` y `#35E0FF`; alerta `#FF6B78`; warn `#FFC35D`; live `#7FF0C8`; panel 3D con brillo; titular con degradado. No se "corrige" esta estética.
- **Nada llega a producción:** la última tarea abre un PR y **no** hace merge.

## Mapa de archivos

| Archivo | Responsabilidad | Tarea |
|---|---|---|
| `package.json` | script `test` | 1 |
| `tests/sicop-data.test.mts` | invariantes de los datos del caso | 1 |
| `src/content/data/sicop.ts` | datos reales del caso y funciones puras | 1 |
| `docs/superpowers/reviews/assets/lighthouse-antes.json` | medición previa de rendimiento | 1 |
| `tailwind.config.ts`, `src/styles/tokens.css`, `src/app/globals.css` | sistema visual C | 2 |
| `src/components/motion/Reveal.tsx`, `ui/Button.tsx`, `layout/Container.tsx`, `layout/Section.tsx` | primitivas con el nuevo movimiento | 2 |
| `src/app/(es)/layout.tsx`, `src/app/(en)/layout.tsx` | viewport oscuro; metadata en la tarea 12 | 2, 12 |
| `src/lib/routes.ts`, `tests/routes.test.mts` | rutas por idioma y conmutador | 3 |
| `src/lib/i18n.tsx` | usa `routes.ts` | 3 |
| `src/components/layout/Nav.tsx`, `Footer.tsx`, `SkipToContent.tsx` | menú siempre visible y pie | 3 |
| `src/content/site.ts` | correo | 3 |
| `src/components/charts/BarList.tsx` | barras horizontales con `scaleX` | 4 |
| `src/components/sections/LiveDashboard.tsx` | tablero en vivo | 4 |
| `src/components/sections/Hero.tsx` | portada | 4 |
| `src/content/services.ts`, `src/components/sections/Services.tsx` | servicios | 5 |
| `src/components/sections/CaseBand.tsx` | banda del caso | 6 |
| `src/content/demos.ts`, `ui/Badge.tsx`, `sections/DemoShowcase.tsx` | demos (6) | 7 |
| `sections/Method.tsx`, `sections/Leadership.tsx` | método y quién lidera | 8 |
| `sections/FAQ.tsx`, `sections/Contact.tsx`, `seo/StructuredData.tsx` | preguntas, contacto y JSON-LD | 9 |
| `src/app/_shell/CaseSicop.tsx`, `src/app/(es)/casos/sicop/page.tsx`, `src/app/(en)/en/cases/sicop/page.tsx` | página del caso | 10 |
| `src/app/_shell/HomeSections.tsx` + eliminación de lo viejo, `tests/i18n.test.mts`, `tests/source-guards.test.mts` | composición final y limpieza | 11 |
| `src/app/sitemap.ts`, `src/app/opengraph-image.tsx`, `public/llms.txt`, `HANDOFF.md`, layouts | SEO y documentación | 12 |
| `docs/superpowers/reviews/2026-09-14-verificacion-rediseno.md` | evidencia de verificación y PR | 13 |

---

### Tarea 1: Arnés de pruebas, datos reales del caso y medición previa

**Archivos:**
- Modificar: `package.json` (bloque `scripts`)
- Crear: `src/content/data/sicop.ts`
- Crear: `tests/sicop-data.test.mts`
- Crear: `docs/superpowers/reviews/assets/lighthouse-antes.json`

**Interfaces:**
- Produce (en `@/content/data/sicop`):
  - `type RiskTier = "low" | "medium" | "high" | "critical"`
  - `type DimensionKey = "contractingVelocity" | "supplierConcentration" | "priceDispersion" | "addendumExposure" | "sanctionProximity" | "transparencyPosture" | "controlMaturity" | "signalDensity"`
  - `interface Institution { id: string; score: number; tier: RiskTier }`
  - `interface RiskDimension { key: DimensionKey; score: number }`
  - `const institutions: readonly Institution[]` (12, en orden A–L)
  - `const riskDimensions: readonly RiskDimension[]` (8)
  - `const caseFacts: { recordsMillions: 2.4; anomalyPatterns: 47; riskDimensions: 8; sources: 7; scoringSeconds: 1 }`
  - `compositeScore(dims?): number`, `topDimensions(n, dims?): RiskDimension[]`, `tierCounts(list?): Record<RiskTier, number>`, `isAlert(inst): boolean`, `lastAlertIndex(list?): number`

- [ ] **Paso 1: medir el rendimiento actual en producción (antes de cualquier cambio)**

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
cd ~/WebSite_personal
mkdir -p docs/superpowers/reviews/assets
npx --yes lighthouse@12.8.2 https://n-ai.dev --only-categories=performance --form-factor=mobile --screenEmulation.mobile --output=json --output-path=docs/superpowers/reviews/assets/lighthouse-antes.json --chrome-flags="--headless=new" --quiet
node -e 'const r=require("./docs/superpowers/reviews/assets/lighthouse-antes.json");console.log("Rendimiento móvil antes:",Math.round(r.categories.performance.score*100))'
```

Esperado: imprime `Rendimiento móvil antes: NN`. Anotar NN: es la línea base del criterio "no bajar más de 5 puntos". Si Lighthouse no puede abrir Chrome, repetir con `--chrome-flags="--headless=new --no-sandbox"`.

- [ ] **Paso 2: agregar el script de pruebas**

En `package.json`, dentro de `"scripts"`, agregar después de `"lint"`:

```json
    "test": "node --test tests/*.test.mts",
```

- [ ] **Paso 3: escribir la prueba que falla**

Crear `tests/sicop-data.test.mts`:

```ts
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
```

- [ ] **Paso 4: correr la prueba y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL con `Cannot find module '.../src/content/data/sicop.ts'`.

- [ ] **Paso 5: implementar el módulo de datos**

Crear `src/content/data/sicop.ts`:

```ts
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
```

- [ ] **Paso 6: correr las pruebas y verificar que pasan**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: `# pass 7` y `# fail 0`.

- [ ] **Paso 7: verificar que el sitio sigue compilando**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm lint && pnpm build`
Esperado: `✔ No ESLint warnings or errors` y `✓ Generating static pages`.

- [ ] **Paso 8: commit y push**

```bash
cd ~/WebSite_personal
git add package.json tests/sicop-data.test.mts src/content/data/sicop.ts docs/superpowers/reviews/assets/lighthouse-antes.json
git commit -m "Datos reales del caso SICOP como modulo puro, con pruebas

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 2: Sistema visual del estilo C y primitivas de movimiento

**Archivos:**
- Reemplazar: `tailwind.config.ts`, `src/styles/tokens.css`, `src/app/globals.css`
- Reemplazar: `src/components/motion/Reveal.tsx`, `src/components/ui/Button.tsx`
- Modificar: `src/components/layout/Container.tsx`, `src/components/layout/Section.tsx`
- Modificar: `src/app/(es)/layout.tsx`, `src/app/(en)/layout.tsx` (solo `viewport`)

**Interfaces:**
- Produce clases de Tailwind:
  - colores: `navy`, `navy-deep`, `navy-panel`, `navy-band`, `surface`, `line`, `line-strong`, `ink`, `ink-2`, `ink-muted`, `ink-soft`, `accent`, `accent-cyan`, `alert`, `warn`, `live`;
  - otros: `rounded-card` (22 px), `rounded-band` (32 px), `shadow-panel`, `shadow-btn-glow`, `shadow-btn-glow-hover`, `shadow-toast`, `bg-grid-48` (imagen), `bg-cell-48` (tamaño), `bg-fact-text`, `animate-pulse-dot`, `animate-pulse-live`, `ease-out` (curva del proyecto).
- Produce utilidades CSS: `text-display-xl` (H1), `text-display-l` (H2), `text-eyebrow`, `text-body`, `text-grad`, `mask-hero-grid`.
- Produce `<LinkButton variant="primary" | "ghost" | "subtle" withArrow href>` y `<Reveal delay>` con la misma API que antes.
- **Alias heredados** (`bg-bg-*`, `text-text-*`, `border-border-*`, `accent-mint`, `accent-deep`, `accent-teal`, `accent-emerald`, `danger`, `ease-smooth`) se mantienen solo hasta la Tarea 11, para que las secciones viejas sigan compilando.

- [ ] **Paso 1: reemplazar `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,css}"],
  // Hover solo en dispositivos que lo soportan: evita estados "pegados" al tocar.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1024",
          deep: "#070B18",
          panel: "#0C1328",
          band: "#0F1A3A",
          cta: "#0E1834",
        },
        surface: { DEFAULT: "rgba(255,255,255,0.045)", strong: "rgba(255,255,255,0.07)" },
        line: { DEFAULT: "rgba(255,255,255,0.10)", strong: "rgba(255,255,255,0.18)" },
        ink: { DEFAULT: "#FFFFFF", 2: "#AEB8CF", muted: "#8C98B3", soft: "#D3DAEA" },
        accent: {
          DEFAULT: "#8FB4FF",
          cyan: "#35E0FF",
          // Alias heredados: se eliminan en la Tarea 11.
          mint: "#35E0FF",
          deep: "#1A2C5E",
        },
        alert: "#FF6B78",
        warn: "#FFC35D",
        live: "#7FF0C8",
        // ---- Alias heredados: se eliminan en la Tarea 11 ----
        bg: {
          base: "#0A1024",
          elevated: "rgba(255,255,255,0.045)",
          glass: "rgba(255,255,255,0.045)",
        },
        border: { subtle: "rgba(255,255,255,0.10)", strong: "rgba(255,255,255,0.18)" },
        text: { primary: "#FFFFFF", secondary: "#AEB8CF", muted: "#8C98B3" },
        danger: "#FF6B78",
        "accent-teal": "#35E0FF",
        "accent-emerald": "#7FF0C8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: { content: "1240px" },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        card: "22px",
        band: "32px",
      },
      letterSpacing: {
        eyebrow: "0.14em",
        display: "-0.04em",
        tightish: "-0.02em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        // Alias heredado: se elimina en la Tarea 11.
        smooth: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      boxShadow: {
        panel: "0 60px 120px -30px rgba(0,0,0,0.75), 0 0 80px -20px rgba(79,134,230,0.35)",
        "btn-glow": "0 10px 30px -12px rgba(143,180,255,0.6)",
        "btn-glow-hover": "0 14px 38px -10px rgba(143,180,255,0.85)",
        toast: "0 20px 40px -12px rgba(0,0,0,0.6)",
        // Alias heredados: se eliminan en la Tarea 11.
        glow: "0 0 0 1px rgba(143,180,255,0.25), 0 12px 34px -16px rgba(143,180,255,0.5)",
        card: "0 18px 44px -26px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-48":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "fact-text": "linear-gradient(180deg, #FFFFFF, #AFC6FF)",
        // Alias heredado: se elimina en la Tarea 11.
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: { "cell-48": "48px 48px" },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "pulse-live": "pulseDot 1.2s ease-in-out infinite",
        beam: "beam 2.2s cubic-bezier(0.23, 1, 0.32, 1) 2 forwards",
        // Alias heredados: se eliminan en la Tarea 11.
        "marquee-slow": "marquee 38s linear infinite",
        "scroll-pulse": "scrollPulse 2.4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "aurora-drift": "auroraDrift 18s ease-in-out infinite",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
        // El destello recorre la línea con transform (no con `left`).
        beam: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(530%)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollPulse: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        auroraDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%,-1%,0) scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Paso 2: reemplazar `src/styles/tokens.css`**

```css
/* Tokens del estilo C (maqueta v3). Espejo de tailwind.config.ts. */
:root {
  --navy: #0a1024;
  --navy-deep: #070b18;
  --navy-panel: #0c1328;
  --navy-band: #0f1a3a;
  --surface: rgba(255, 255, 255, 0.045);
  --line: rgba(255, 255, 255, 0.1);
  --line-strong: rgba(255, 255, 255, 0.18);
  --ink: #ffffff;
  --ink-2: #aeb8cf;
  --ink-muted: #8c98b3;
  --accent: #8fb4ff;
  --accent-cyan: #35e0ff;
  --alert: #ff6b78;
  --warn: #ffc35d;
  --live: #7ff0c8;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);

  /* Alias heredados: se eliminan en la Tarea 11. */
  --bg-base: #0a1024;
  --text-primary: #ffffff;
  --text-secondary: #aeb8cf;
  --text-muted: #8c98b3;
  --accent-teal: #35e0ff;
  --accent-emerald: #7ff0c8;
  --accent-teal-soft: #35e0ff;
  --accent-emerald-soft: #7ff0c8;
  --danger: #ff6b78;
  --ease-smooth: cubic-bezier(0.23, 1, 0.32, 1);
}
```

- [ ] **Paso 3: reemplazar `src/app/globals.css`**

```css
@import "../styles/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    background-color: var(--navy-deep);
  }

  body {
    background: linear-gradient(180deg, var(--navy) 0%, var(--navy-deep) 100%);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  h1,
  h2,
  h3 {
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  /* El menú es sticky de 68 px: las anclas aterrizan debajo de él. */
  section[id],
  [id]:target {
    scroll-margin-top: 84px;
  }

  ::selection {
    background-color: rgba(143, 180, 255, 0.35);
    color: #ffffff;
  }

  :focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 3px;
    border-radius: 6px;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.14);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.26);
  }
}

@layer utilities {
  /* H1 del hero */
  .text-display-xl {
    font-family: var(--font-display);
    font-size: clamp(40px, 4.9vw, 74px);
    line-height: 1.02;
    letter-spacing: -0.04em;
    font-weight: 800;
  }

  /* H2 de sección */
  .text-display-l {
    font-family: var(--font-display);
    font-size: clamp(32px, 4.4vw, 58px);
    line-height: 1.03;
    letter-spacing: -0.04em;
    font-weight: 800;
  }

  .text-h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.2vw, 40px);
    line-height: 1.08;
    letter-spacing: -0.02em;
    font-weight: 700;
  }

  .text-h3 {
    font-family: var(--font-display);
    font-size: clamp(20px, 1.8vw, 22px);
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-weight: 700;
  }

  .text-eyebrow {
    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--accent);
    font-weight: 600;
  }

  .text-body {
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-2);
  }

  .text-body-sm {
    font-size: 16px;
    line-height: 1.6;
    color: var(--ink-2);
  }

  /* Degradado del acento del H1 (decisión de estilo C aprobada). */
  .text-grad {
    background-image: linear-gradient(90deg, #8fb4ff, #35e0ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .mask-hero-grid {
    -webkit-mask-image: radial-gradient(ellipse at 70% 40%, #000 20%, transparent 70%);
    mask-image: radial-gradient(ellipse at 70% 40%, #000 20%, transparent 70%);
  }

  /* Alias heredados: se eliminan en la Tarea 11. */
  .mask-fade-x {
    mask-image: linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%);
  }
  .mask-radial-soft {
    mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
  }
}

/* Movimiento reducido: sin bucles, pulsos ni desplazamientos. Los fundidos
 * breves (≤150 ms) los controla cada componente con useReducedMotion. */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation: none !important;
  }
}
```

- [ ] **Paso 4: reemplazar `src/components/motion/Reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "header" | "article" | "li" | "span";
  once?: boolean;
}

/**
 * Aparición al entrar en pantalla. Usa `transform` como cadena (acelerado por
 * GPU) en lugar de la propiedad `y` de framer-motion, que corre en el hilo
 * principal. Con movimiento reducido solo hay un fundido de 150 ms.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, transform: `translateY(${reduce ? 0 : y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.15 : 0.5,
        ease: [0.23, 1, 0.32, 1],
        delay: reduce ? 0 : delay,
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Paso 5: reemplazar `src/components/ui/Button.tsx`**

```tsx
import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "subtle";

interface BaseProps {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-4 text-[15px] font-semibold leading-none transition-[transform,box-shadow,background-color,color] duration-200 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-white text-navy shadow-btn-glow hover:shadow-btn-glow-hover",
  ghost: "border border-white/25 bg-white/[0.03] text-ink hover:bg-white/[0.08]",
  subtle: "px-0 py-2 text-accent hover:text-accent-cyan",
};

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none"
    />
  );
}

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  withArrow = false,
  className,
  children,
  href,
  ...rest
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </a>
  );
}
```

- [ ] **Paso 6: ajustar `Container` y `Section`**

En `src/components/layout/Container.tsx`, reemplazar la clase:

```tsx
    <div className={cn("mx-auto w-full max-w-content px-5 md:px-10", className)} {...rest}>
```

En `src/components/layout/Section.tsx`, reemplazar la clase del `<section>` (menos alto en móvil, para acercarse a la meta de ≤9.000 px):

```tsx
      className={cn("relative py-20 md:py-28", className)}
```

- [ ] **Paso 7: viewport oscuro en los dos layouts**

En `src/app/(es)/layout.tsx` y en `src/app/(en)/layout.tsx`, reemplazar el bloque `viewport`:

```tsx
export const viewport: Viewport = {
  themeColor: "#0A1024",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
```

- [ ] **Paso 8: compilar y revisar a ojo**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm lint && pnpm build && pnpm test`
Esperado: sin errores; `# pass 7`. El fondo pasa a azul noche. Las secciones viejas pueden verse descuadradas hasta que se reemplacen: es esperado.

- [ ] **Paso 9: commit y push**

```bash
cd ~/WebSite_personal
git add tailwind.config.ts src/styles/tokens.css src/app/globals.css src/components/motion/Reveal.tsx src/components/ui/Button.tsx src/components/layout/Container.tsx src/components/layout/Section.tsx "src/app/(es)/layout.tsx" "src/app/(en)/layout.tsx"
git commit -m "Sistema visual del estilo C: tokens, CSS base, botones y Reveal

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 3: Rutas por idioma, menú siempre visible, pie de página y correo

**Archivos:**
- Crear: `src/lib/routes.ts`, `tests/routes.test.mts`
- Modificar: `src/lib/i18n.tsx`, `src/content/site.ts`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (bloques `nav`, `navCTA`, `themeLabel`, `footer`; nuevo bloque `menu`)
- Reemplazar: `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/SkipToContent.tsx`

**Interfaces:**
- Consume: clases de la Tarea 2.
- Produce (en `@/lib/routes`):
  - `type Lang = "es" | "en"`
  - `HOME_PATH: Record<Lang, string>` = `{ es: "/", en: "/en" }`
  - `CASE_SICOP_PATH: Record<Lang, string>` = `{ es: "/casos/sicop", en: "/en/cases/sicop" }`
  - `homeAnchor(lang: Lang, hash: string): string`, por ejemplo `homeAnchor("en", "#demos") === "/en#demos"`
  - `alternateHref(pathname: string, lang: Lang): string`
- Produce en i18n:
  - `t.nav: { label: string; href: string }[]`, con los hash `#servicios`, `#caso-sicop`, `#demos`, `#metodo` y `#contact`
  - `t.navCTA: string`
  - `t.menu: { label, open, close, home }`
  - `t.footer: { navTitle, location }`

- [ ] **Paso 1: escribir la prueba que falla**

Crear `tests/routes.test.mts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { HOME_PATH, CASE_SICOP_PATH, homeAnchor, alternateHref } from "../src/lib/routes.ts";

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
});
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL con `Cannot find module '.../src/lib/routes.ts'`.

- [ ] **Paso 3: implementar `src/lib/routes.ts`**

```ts
export type Lang = "es" | "en";

/** El español vive en la raíz por ser el idioma canónico. */
export const HOME_PATH: Record<Lang, string> = { es: "/", en: "/en" };

export const CASE_SICOP_PATH: Record<Lang, string> = {
  es: "/casos/sicop",
  en: "/en/cases/sicop",
};

/** Enlace a una sección de la portada que funciona desde cualquier página. */
export function homeAnchor(lang: Lang, hash: string): string {
  return lang === "es" ? `/${hash}` : `/en${hash}`;
}

/** Ruta equivalente en el otro idioma, para el conmutador del menú. */
export function alternateHref(pathname: string, lang: Lang): string {
  const other: Lang = lang === "es" ? "en" : "es";
  if (pathname === CASE_SICOP_PATH[lang]) return CASE_SICOP_PATH[other];
  return HOME_PATH[other];
}
```

- [ ] **Paso 4: correr y verificar que pasa**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: `# pass 10`, `# fail 0`.

- [ ] **Paso 5: `src/lib/i18n.tsx` usa las rutas**

Reemplazar las líneas desde `export type Lang = "es" | "en";` hasta la definición de `LANG_PATH` incluida:

```tsx
import { HOME_PATH, type Lang } from "@/lib/routes";

export type { Lang };

export const DEFAULT_LANG: Lang = "es";

const DICTIONARY: Record<Lang, Strings> = { es, en };
```

Dentro de `LanguageProvider`, cambiar `otherHref: LANG_PATH[other]` por `otherHref: HOME_PATH[other]`. Mover el `import { HOME_PATH, type Lang }` junto a los demás imports del inicio del archivo.

- [ ] **Paso 6: correo de contacto**

En `src/content/site.ts`, reemplazar la línea del correo:

```ts
    email: "nanyrr25@gmail.com",
```

- [ ] **Paso 7: claves de i18n en español**

En `src/content/i18n/es.ts`, reemplazar desde `  nav: [` hasta `  themeLabel: "Tema · Oscuro",` (inclusive) por:

```ts
  nav: [
    { label: "Servicios", href: "#servicios" },
    { label: "Caso SICOP", href: "#caso-sicop" },
    { label: "Demos", href: "#demos" },
    { label: "Método", href: "#metodo" },
    { label: "Contacto", href: "#contact" },
  ],
  navCTA: "Agendar diagnóstico",
  menu: {
    label: "Menú principal",
    open: "Menú",
    close: "Cerrar",
    home: "inicio",
  },
  skipToContent: "Saltar al contenido",
```

Y reemplazar el bloque `footer: { ... },` por:

```ts
  footer: {
    navTitle: "Navegar",
    location: "San José, Costa Rica",
  },
```

- [ ] **Paso 8: claves de i18n en inglés**

En `src/content/i18n/en.ts`, reemplazar desde `  nav: [` hasta `  themeLabel: "Theme · Dark",` (inclusive) por:

```ts
  nav: [
    { label: "Services", href: "#servicios" },
    { label: "SICOP case", href: "#caso-sicop" },
    { label: "Demos", href: "#demos" },
    { label: "Method", href: "#metodo" },
    { label: "Contact", href: "#contact" },
  ],
  navCTA: "Book a diagnostic",
  menu: {
    label: "Main menu",
    open: "Menu",
    close: "Close",
    home: "home",
  },
  skipToContent: "Skip to content",
```

Y reemplazar el bloque `footer: { ... },` por:

```ts
  footer: {
    navTitle: "Navigate",
    location: "San José, Costa Rica",
  },
```

- [ ] **Paso 9: reemplazar `src/components/layout/Nav.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { alternateHref, homeAnchor } from "@/lib/routes";

/**
 * Menú siempre visible (sticky). Antes aparecía recién a los 80 px de scroll
 * y en móvil el botón no respondía en el primer pantallazo.
 */
export default function Nav() {
  const { lang, t } = useLanguage();
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-button")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const switchLabel =
    lang === "es" ? t.langToggle.switchToEnglish : t.langToggle.switchToSpanish;
  const otherCode = lang === "es" ? "en" : "es";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled || open
          ? "border-line bg-navy/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-content items-center justify-between gap-6 px-5 md:px-10">
        <a
          href={homeAnchor(lang, "#top")}
          aria-label={`${site.brand.name}, ${t.menu.home}`}
          className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tightish text-ink"
        >
          <span
            aria-hidden
            className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-white text-base text-navy"
          >
            N
          </span>
          {site.brand.name}
        </a>

        <nav aria-label={t.menu.label} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={homeAnchor(lang, item.href)}
                  className="text-ink-2 transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={alternateHref(pathname, lang)}
            hrefLang={otherCode}
            aria-label={switchLabel}
            className="text-[13px] font-semibold text-ink-2 transition-colors duration-150 hover:text-ink"
          >
            {lang === "es" ? t.langToggle.en : t.langToggle.es}
          </Link>
          <a
            href={homeAnchor(lang, "#contact")}
            className="hidden rounded-full bg-white px-[18px] py-[11px] text-sm font-semibold leading-none text-navy shadow-btn-glow transition-[transform,box-shadow] duration-200 ease-out hover:shadow-btn-glow-hover active:scale-[0.97] lg:inline-flex"
          >
            {t.navCTA}
          </a>
          <button
            id="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex rounded-full border border-line-strong px-3.5 py-2 text-sm font-semibold text-ink active:scale-[0.97] lg:hidden"
          >
            {open ? t.menu.close : t.menu.open}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={t.menu.label}
        hidden={!open}
        className="border-t border-line bg-navy lg:hidden"
      >
        <ul className="px-5 pb-5 pt-2">
          {[...t.nav, { label: t.navCTA, href: "#contact" }].map((item) => (
            <li key={item.label}>
              <a
                href={homeAnchor(lang, item.href)}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3.5 text-[17px] text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Paso 10: reemplazar `src/components/layout/Footer.tsx`**

```tsx
"use client";

import Container from "./Container";
import { site } from "@/content/site";
import { useLanguage } from "@/lib/i18n";
import { homeAnchor } from "@/lib/routes";

const SOCIAL = [
  { label: "LinkedIn", href: site.contact.linkedin },
  { label: "Google Scholar", href: site.contact.scholar },
  { label: "GitHub", href: site.contact.github },
];

export default function Footer() {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line py-12 md:mt-32">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a
            href={homeAnchor(lang, "#top")}
            className="flex items-center gap-2.5 font-display text-xl font-extrabold text-ink"
          >
            <span
              aria-hidden
              className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-white text-base text-navy"
            >
              N
            </span>
            {site.brand.name}
          </a>
          <p className="mt-3 text-[13px] text-ink-muted">
            © {year} {site.brand.name} · {t.footer.location}
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-1 block text-[13px] text-ink-2 transition-colors duration-150 hover:text-ink"
          >
            {site.contact.email}
          </a>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={homeAnchor(lang, item.href)}
                  className="text-ink-2 transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {SOCIAL.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors duration-150 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
```

- [ ] **Paso 11: `src/components/layout/SkipToContent.tsx` con los colores nuevos**

```tsx
"use client";

import { useT } from "@/lib/i18n";

export default function SkipToContent() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-navy"
    >
      {t.skipToContent}
    </a>
  );
}
```

- [ ] **Paso 12: compilar y probar**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && grep -rn "t\.themeLabel\|LANG_PATH\|t\.footer\.contactTitle" src ; pnpm lint && pnpm build && pnpm test`
Esperado: el `grep` no imprime nada; lint y build sin errores; `# pass 10`.

- [ ] **Paso 13: verificar el menú en el navegador**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm start -p 3100` (en segundo plano). Abrir `http://localhost:3100` a 375×812.
Esperado: el botón "Menú" se ve arriba sin hacer scroll; al tocarlo se abre la lista y Escape la cierra; "EN" lleva a `/en`. Detener el servidor.

- [ ] **Paso 14: commit y push**

```bash
cd ~/WebSite_personal
git add src/lib/routes.ts tests/routes.test.mts src/lib/i18n.tsx src/content/site.ts src/content/i18n/es.ts src/content/i18n/en.ts src/components/layout/Nav.tsx src/components/layout/Footer.tsx src/components/layout/SkipToContent.tsx
git commit -m "Menu siempre visible, pie nuevo, rutas por idioma y correo nanyrr25@gmail.com

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 4: Hero con tablero en vivo (datos reales)

**Archivos:**
- Crear: `src/components/charts/BarList.tsx`
- Crear: `src/components/sections/LiveDashboard.tsx`
- Reemplazar: `src/components/sections/Hero.tsx`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (bloque `hero`; nuevo bloque `dashboard`)
- Modificar: `tests/sicop-data.test.mts` (resumen accesible coherente con los datos)

**Interfaces:**
- Consume:
  - de `@/content/data/sicop`: `institutions`, `caseFacts`, `compositeScore`, `topDimensions`, `isAlert`, `lastAlertIndex`, `RiskTier` (Tarea 1);
  - `CASE_SICOP_PATH` (Tarea 3);
  - `LinkButton`, `Reveal` y `Container` (Tarea 2).
- Produce:
  - `<BarList items={{ label: string; value: number }[]} animate={boolean} reduce={boolean} max?={number} barWidth?={string} className?={string} />`;
  - `<LiveDashboard />` (sin props);
  - i18n `t.hero: { pill, headlineStart, headlineHighlight, subhead, primaryCta, secondaryCta, proof: {value,label}[] }`;
  - i18n `t.dashboard: { title, live, pause, resume, kpiRecords, kpiPatterns, kpiComposite, chartTitle, institution, gaugeTitle, topDimsTitle, alertCritical, alertHigh, tiers: Record<RiskTier,string>, level, caption, srSummary, dimensions: Record<DimensionKey,string> }`.

- [ ] **Paso 1: prueba que falla (el resumen accesible debe coincidir con los datos)**

Agregar al final de `tests/sicop-data.test.mts`:

```ts
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
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL con `Cannot read properties of undefined (reading 'srSummary')`.

- [ ] **Paso 3: claves de i18n en español**

En `src/content/i18n/es.ts`, reemplazar el bloque completo `  hero: { ... },` (desde `  hero: {` hasta la línea anterior a `  sicop: {`) por:

```ts
  hero: {
    pill: "Consultoría de IA y analítica avanzada · Costa Rica y Latinoamérica",
    headlineStart: "Consultoría experta en IA, automatización y",
    headlineHighlight: "analítica avanzada.",
    subhead:
      "N-AI diseña, construye y pone en producción soluciones de datos para empresas e instituciones en Costa Rica y Latinoamérica.",
    primaryCta: "Agendar un diagnóstico",
    secondaryCta: "Ver el caso SICOP",
    proof: [
      { value: "+400%", label: "créditos colocados" },
      { value: ">2.4M", label: "registros de compra pública analizados" },
      { value: "47", label: "patrones de anomalía modelados" },
    ],
  },

  dashboard: {
    title: "Caso SICOP · monitor de riesgo",
    live: "EN VIVO",
    pause: "Pausar",
    resume: "Reanudar",
    kpiRecords: "Registros analizados",
    kpiPatterns: "Patrones de anomalía",
    kpiComposite: "Riesgo compuesto",
    chartTitle: "Puntaje de riesgo · 12 instituciones anonimizadas",
    institution: "Institución",
    gaugeTitle: "Compuesto de 8 dimensiones",
    topDimsTitle: "Dimensiones con mayor puntaje",
    alertCritical: "Riesgo crítico detectado",
    alertHigh: "Riesgo alto detectado",
    tiers: { low: "bajo", medium: "medio", high: "alto", critical: "crítico" },
    level: "nivel",
    caption:
      "Recorrido animado sobre los resultados reales del caso SICOP · instituciones anonimizadas",
    srSummary:
      "Tablero del caso SICOP con resultados reales: más de 2,4 millones de registros analizados, 47 patrones de anomalía y riesgo compuesto de 62 sobre 100. De 12 instituciones anonimizadas, 2 tienen riesgo crítico, con puntajes de 91 y 84.",
    dimensions: {
      contractingVelocity: "Velocidad de contratación",
      supplierConcentration: "Concentración de proveedores",
      priceDispersion: "Dispersión de precios",
      addendumExposure: "Exposición a adendas",
      sanctionProximity: "Proximidad a sanciones",
      transparencyPosture: "Postura de transparencia",
      controlMaturity: "Madurez de controles",
      signalDensity: "Densidad de señales",
    },
  },

```

- [ ] **Paso 4: claves de i18n en inglés**

En `src/content/i18n/en.ts`, reemplazar el bloque completo `  hero: { ... },` por:

```ts
  hero: {
    pill: "AI and advanced analytics consulting · Costa Rica and Latin America",
    headlineStart: "Expert consulting in AI, automation and",
    headlineHighlight: "advanced analytics.",
    subhead:
      "N-AI designs, builds and deploys data solutions for companies and institutions across Costa Rica and Latin America.",
    primaryCta: "Book a diagnostic",
    secondaryCta: "See the SICOP case",
    proof: [
      { value: "+400%", label: "credit placements" },
      { value: ">2.4M", label: "public procurement records analyzed" },
      { value: "47", label: "anomaly patterns modeled" },
    ],
  },

  dashboard: {
    title: "SICOP case · risk monitor",
    live: "LIVE",
    pause: "Pause",
    resume: "Resume",
    kpiRecords: "Records analyzed",
    kpiPatterns: "Anomaly patterns",
    kpiComposite: "Composite risk",
    chartTitle: "Risk score · 12 anonymized institutions",
    institution: "Institution",
    gaugeTitle: "8-dimension composite",
    topDimsTitle: "Highest-scoring dimensions",
    alertCritical: "Critical risk detected",
    alertHigh: "High risk detected",
    tiers: { low: "low", medium: "medium", high: "high", critical: "critical" },
    level: "level",
    caption: "Animated walkthrough of the real SICOP case results · anonymized institutions",
    srSummary:
      "SICOP case dashboard with real results: over 2.4 million records analyzed, 47 anomaly patterns and a composite risk of 62 out of 100. Of 12 anonymized institutions, 2 are at critical risk, scoring 91 and 84.",
    dimensions: {
      contractingVelocity: "Contracting velocity",
      supplierConcentration: "Supplier concentration",
      priceDispersion: "Price dispersion",
      addendumExposure: "Addendum exposure",
      sanctionProximity: "Sanction proximity",
      transparencyPosture: "Transparency posture",
      controlMaturity: "Control maturity",
      signalDensity: "Signal density",
    },
  },

```

- [ ] **Paso 5: crear `src/components/charts/BarList.tsx`**

```tsx
"use client";

import { cn } from "@/lib/cn";

export interface BarItem {
  label: string;
  value: number;
}

interface BarListProps {
  items: BarItem[];
  /** Arranca la animación de las barras (una sola vez). */
  animate: boolean;
  /** Con movimiento reducido las barras aparecen en su valor final. */
  reduce: boolean;
  max?: number;
  /** Ancho de la columna de la barra. */
  barWidth?: string;
  className?: string;
}

/** Barras horizontales animadas con `scaleX` (sin recálculo de layout). */
export default function BarList({
  items,
  animate,
  reduce,
  max = 100,
  barWidth = "70px",
  className,
}: BarListProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, i) => (
        <li
          key={item.label}
          className="grid items-center gap-2 text-xs text-[#C3CBDD]"
          style={{ gridTemplateColumns: `minmax(0,1fr) ${barWidth} 26px` }}
        >
          <span className="truncate">{item.label}</span>
          <span className="h-1.5 overflow-hidden rounded bg-white/[0.08]">
            <span
              className="block h-full origin-left rounded bg-gradient-to-r from-accent to-accent-cyan"
              style={{
                transform: `scaleX(${animate || reduce ? item.value / max : 0})`,
                transition: reduce
                  ? "none"
                  : `transform 900ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 60}ms`,
              }}
            />
          </span>
          <span className="text-right tabular-nums text-ink">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Paso 6: crear `src/components/sections/LiveDashboard.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import BarList from "@/components/charts/BarList";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import {
  caseFacts,
  compositeScore,
  institutions,
  isAlert,
  lastAlertIndex,
  topDimensions,
  type RiskTier,
} from "@/content/data/sicop";

const TIER_COLOR: Record<RiskTier, string> = {
  low: "#35E0FF",
  medium: "#8FB4FF",
  high: "#FFC35D",
  critical: "#FF6B78",
};
const STEP_MS = 1100;
const W = 560;
const H = 170;
const PAD = 20;
const ARC_LENGTH = 188.5;

const POINTS = institutions.map((inst, i) => ({
  ...inst,
  cx: PAD + (i * (W - PAD * 2)) / (institutions.length - 1),
  cy: 162 - (inst.score / 100) * 150,
}));
const LINE = "M" + POINTS.map((p) => `${p.cx.toFixed(1)} ${p.cy.toFixed(1)}`).join(" L");
const AREA = `${LINE} L${W - PAD} ${H} L${PAD} ${H} Z`;

/** Cuenta una sola vez hasta el valor real cuando el tablero entra en pantalla. */
function useCountUp(target: number, decimals: number, active: boolean, reduce: boolean) {
  const [value, setValue] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200);
      setValue(target * (1 - Math.pow(1 - progress, 4)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, reduce]);
  return value.toFixed(decimals);
}

function Kpi({
  label,
  value,
  suffix,
  className,
}: {
  label: string;
  value: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-white/[0.06] bg-white/[0.04] px-3.5 py-3",
        className,
      )}
    >
      <span className="text-xs text-ink-muted">{label}</span>
      <b className="mt-1 block font-display text-2xl font-bold tabular-nums text-ink">
        {value}
        {suffix && <small className="text-[0.55em] font-semibold text-ink-muted">{suffix}</small>}
      </b>
    </div>
  );
}

/**
 * Tablero del hero. Solo usa resultados reales del caso SICOP: un cursor
 * recorre las 12 instituciones anonimizadas y muestra un aviso en las de
 * riesgo alto o crítico. El recorrido dura más de 5 s, así que tiene botón
 * de pausa (WCAG 2.2.2), y se detiene fuera de pantalla o con la pestaña oculta.
 */
export default function LiveDashboard() {
  const t = useT();
  const d = t.dashboard;
  const reduce = !!useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(reduce ? institutions.length - 1 : 0);
  const [alertIndex, setAlertIndex] = useState(lastAlertIndex);
  const [toastVisible, setToastVisible] = useState(true);
  const composite = compositeScore();

  // useReducedMotion es null en el primer render: al conocerse, fija el estado final.
  useEffect(() => {
    if (reduce) setIndex(institutions.length - 1);
  }, [reduce]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !visible) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % institutions.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, visible]);

  useEffect(() => {
    if (!isAlert(institutions[index]) || index === alertIndex) return;
    if (reduce) {
      setAlertIndex(index);
      return;
    }
    setToastVisible(false);
    const id = window.setTimeout(() => {
      setAlertIndex(index);
      setToastVisible(true);
    }, 300);
    return () => window.clearTimeout(id);
  }, [index, alertIndex, reduce]);

  const records = useCountUp(caseFacts.recordsMillions, 1, started, reduce);
  const patterns = useCountUp(caseFacts.anomalyPatterns, 0, started, reduce);
  const compositeShown = useCountUp(composite, 0, started, reduce);
  const current = POINTS[index];
  const alert = institutions[alertIndex];

  return (
    <div ref={rootRef} className="relative [perspective:1600px]">
      <p className="sr-only">{d.srSummary}</p>

      <div
        aria-hidden="true"
        className={cn(
          "relative z-10 mb-3 flex max-w-[310px] items-center gap-2.5 rounded-[14px] bg-white px-3.5 py-2.5 text-navy shadow-toast transition-[opacity,transform] duration-[450ms] ease-out motion-reduce:transition-none lg:absolute lg:-right-4 lg:-top-7 lg:mb-0",
          toastVisible ? "translate-y-0 opacity-100" : "-translate-y-2.5 opacity-0",
        )}
      >
        <span className="grid h-7 w-7 flex-none place-items-center rounded-[9px] bg-[#FFE3E6] font-extrabold text-[#B42335]">
          !
        </span>
        <span>
          <b className="block text-[13px]">
            {alert.tier === "critical" ? d.alertCritical : d.alertHigh}
          </b>
          <small className="text-xs text-slate-600">
            {d.institution} {alert.id} · {alert.score}/100 · {d.level} {d.tiers[alert.tier]}
          </small>
        </span>
      </div>

      <div className="rounded-[22px] border border-white/10 bg-navy-panel/80 p-[18px] shadow-panel backdrop-blur-md transition-transform duration-[600ms] ease-out motion-reduce:transition-none lg:[transform:rotateY(-11deg)_rotateX(5deg)] lg:hover:[transform:rotateY(-4deg)_rotateX(2deg)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-1 pb-3.5 text-[13px] text-[#C3CBDD]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <i key={i} className="h-[9px] w-[9px] rounded-full bg-white/20" />
              ))}
            </span>
            {d.title}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-[#FF8F99]">
              <i aria-hidden className="h-[7px] w-[7px] animate-pulse-live rounded-full bg-alert" />
              {d.live}
            </span>
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                className="rounded-full border border-white/15 px-2.5 py-1 text-xs font-semibold text-[#C3CBDD] transition-colors duration-150 hover:border-white/30 active:scale-[0.97]"
              >
                {paused ? d.resume : d.pause}
              </button>
            )}
          </div>
        </div>

        <div aria-hidden="true" className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <Kpi label={d.kpiRecords} value={`>${records}M`} />
          <Kpi label={d.kpiPatterns} value={patterns} />
          <Kpi
            label={d.kpiComposite}
            value={compositeShown}
            suffix="/100"
            className="hidden sm:block"
          />
        </div>

        <div
          aria-hidden="true"
          className="mt-2.5 rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-2.5 pb-2 pt-3"
        >
          <div className="flex justify-between gap-2.5 px-1 pb-1.5 text-xs text-ink-muted">
            <span>{d.chartTitle}</span>
            <b className="font-semibold text-ink">
              {d.institution} {current.id} · {current.score}
            </b>
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="block h-[150px] w-full sm:h-[170px]"
          >
            <defs>
              <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#4F86E6" stopOpacity="0.45" />
                <stop offset="1" stopColor="#4F86E6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={AREA} fill="url(#dash-area)" />
            <path d={LINE} fill="none" stroke="#8FB4FF" strokeWidth={2.2} />
            {POINTS.map((p) => (
              <circle
                key={p.id}
                cx={p.cx}
                cy={p.cy}
                r={p.tier === "critical" ? 5 : 4}
                fill={TIER_COLOR[p.tier]}
              />
            ))}
            <g
              style={{
                transform: `translateX(${current.cx}px)`,
                transition: reduce ? "none" : "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <line x1={0} x2={0} y1={8} y2={162} stroke="#35E0FF" strokeOpacity={0.6} />
              <circle
                cx={0}
                cy={current.cy}
                r={7}
                fill="none"
                stroke={TIER_COLOR[current.tier]}
                strokeWidth={2}
              />
            </g>
          </svg>
        </div>

        <div aria-hidden="true" className="mt-2.5 grid gap-2.5 sm:grid-cols-[0.8fr_1.2fr]">
          <div className="hidden flex-col items-center rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 sm:flex">
            <span className="self-start text-xs text-ink-muted">{d.gaugeTitle}</span>
            <svg width="150" height="92" viewBox="0 0 150 92">
              <defs>
                <linearGradient id="dash-gauge">
                  <stop offset="0" stopColor="#35E0FF" />
                  <stop offset="0.6" stopColor="#FFC35D" />
                  <stop offset="1" stopColor="#FF6B78" />
                </linearGradient>
              </defs>
              <path
                d="M15 80 A60 60 0 0 1 135 80"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={12}
                strokeLinecap="round"
              />
              <path
                d="M15 80 A60 60 0 0 1 135 80"
                fill="none"
                stroke="url(#dash-gauge)"
                strokeWidth={12}
                strokeLinecap="round"
                strokeDasharray={ARC_LENGTH}
                strokeDashoffset={started || reduce ? ARC_LENGTH * (1 - composite / 100) : ARC_LENGTH}
                style={{
                  transition: reduce
                    ? "none"
                    : "stroke-dashoffset 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              />
              <text
                x="75"
                y="76"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="var(--font-display)"
                fontWeight={800}
                fontSize={26}
              >
                {composite}
              </text>
            </svg>
          </div>
          <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
            <span className="text-xs text-ink-muted">{d.topDimsTitle}</span>
            <BarList
              className="mt-2"
              animate={started}
              reduce={reduce}
              items={topDimensions(4).map((dim) => ({
                label: d.dimensions[dim.key],
                value: dim.score,
              }))}
            />
          </div>
        </div>
      </div>

      <p className="mt-3.5 text-right text-xs text-ink-muted">{d.caption}</p>
    </div>
  );
}
```

- [ ] **Paso 7: reemplazar `src/components/sections/Hero.tsx`**

```tsx
"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import LiveDashboard from "@/components/sections/LiveDashboard";
import { useLanguage } from "@/lib/i18n";
import { CASE_SICOP_PATH } from "@/lib/routes";

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(1100px_650px_at_78%_18%,#1A2C5E_0%,transparent_70%)]"
    >
      <div
        aria-hidden
        className="mask-hero-grid pointer-events-none absolute inset-0 bg-grid-48 bg-cell-48"
      />
      <Container className="relative grid min-h-[calc(100svh-68px)] items-center gap-10 py-8 md:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-ink-soft sm:text-[13px]">
              <span
                aria-hidden
                className="h-[7px] w-[7px] flex-none animate-pulse-dot rounded-full bg-accent-cyan shadow-[0_0_12px_#35E0FF]"
              />
              {t.hero.pill}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-display-xl mt-5 text-ink sm:mt-6">
              {t.hero.headlineStart}{" "}
              <span className="text-grad pr-[0.08em] font-serif text-[1.1em] font-normal italic leading-none tracking-[-0.01em]">
                {t.hero.headlineHighlight}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-[520px] text-base leading-relaxed text-ink-2 sm:mt-6 sm:text-lg">
              {t.hero.subhead}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <LinkButton href="#contact" variant="primary" withArrow>
                {t.hero.primaryCta}
              </LinkButton>
              <LinkButton href={CASE_SICOP_PATH[lang]} variant="ghost">
                {t.hero.secondaryCta}
              </LinkButton>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-6 grid grid-cols-3 gap-3.5 sm:mt-10 sm:flex sm:flex-wrap sm:gap-8">
              {t.hero.proof.map((item) => (
                <div key={item.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 max-w-[16ch] text-xs leading-snug text-ink-muted sm:text-[13px]">
                    {item.label}
                  </dt>
                  <dd className="font-display text-[26px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-ink sm:text-[34px]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <LiveDashboard />
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Paso 8: correr pruebas y compilar**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test && pnpm lint && pnpm build`
Esperado: `# pass 11`, `# fail 0`; lint y build sin errores. Si falla por `t.hero.eyebrowFull`, `t.hero.marquee` u otra clave vieja en otro archivo, buscar con `grep -rn "t\.hero\." src` y confirmar que solo `Hero.tsx` usa `t.hero`.

- [ ] **Paso 9: verificar en el navegador (1440×900 y 375×812)**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm start -p 3100` (en segundo plano).
Medir en la consola del navegador en `http://localhost:3100`:

```js
const r = (s) => { const b = document.querySelector(s).getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
({ vh: innerHeight, h1: r("h1"), dl: r("#top dl"), panel: r("[class*='shadow-panel']") });
```

Esperado:
- a 1440×900, el `bottom` de `dl` y el del panel son ≤ 900;
- a 375×812, el `bottom` de `dl` es ≤ 812 y el aviso **no** tapa la cabecera del panel;
- el cursor recorre las instituciones;
- "Pausar" detiene el recorrido;
- con movimiento reducido (DevTools → Rendering → `prefers-reduced-motion: reduce`), no hay recorrido, el botón "Pausar" no aparece y el cursor queda en la institución L.

Detener el servidor.

- [ ] **Paso 10: commit y push**

```bash
cd ~/WebSite_personal
git add src/components/charts/BarList.tsx src/components/sections/LiveDashboard.tsx src/components/sections/Hero.tsx src/content/i18n/es.ts src/content/i18n/en.ts tests/sicop-data.test.mts
git commit -m "Hero del estilo C con tablero en vivo alimentado por datos reales

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 5: Servicios (4 tarjetas con evidencia)

**Archivos:**
- Crear: `src/content/services.ts`
- Crear: `src/components/sections/Services.tsx`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (nuevo bloque `services`, después de `dashboard`)
- Modificar: `src/app/_shell/HomeSections.tsx` (montar `Services` después de `Hero`)
- Crear: `tests/i18n.test.mts`

**Interfaces:**
- Consume: `Section` y `Reveal` (Tarea 2).
- Produce:
  - `type ServiceIcon = "sparkles" | "workflow" | "trending" | "database"` y `serviceIcons: readonly ServiceIcon[]`;
  - i18n `t.services: { eyebrow, title, body, evidenceLabel, sectorsLabel, sectors: string[], items: { title, description, tags: string[], evidence: string }[] }`;
  - `<Services />` con `id="servicios"`.

- [ ] **Paso 1: prueba que falla**

Crear `tests/i18n.test.mts`:

```ts
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
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL con `Cannot find module '.../src/content/services.ts'`.

Nota: si la primera prueba (`misma estructura`) falla por diferencias heredadas entre `es.ts` y `en.ts` en bloques viejos (por ejemplo, `sicop.sections[i].lead`), dejarla fallando y seguir: esos bloques se eliminan en la Tarea 11, y la prueba debe quedar en verde al final de esa tarea. Anotar en el commit qué claves difieren.

- [ ] **Paso 3: crear `src/content/services.ts`**

```ts
export type ServiceIcon = "sparkles" | "workflow" | "trending" | "database";

/** Íconos de las 4 líneas de servicio, en el mismo orden que `t.services.items`. */
export const serviceIcons: readonly ServiceIcon[] = [
  "sparkles",
  "workflow",
  "trending",
  "database",
];
```

- [ ] **Paso 4: bloque `services` en español**

En `src/content/i18n/es.ts`, insertar después del bloque `dashboard`:

```ts
  services: {
    eyebrow: "Servicios",
    title: "Lo que N-AI hace por tu organización.",
    body:
      "Cuatro líneas de servicio con un mismo estándar: cada solución se mide por su impacto en el negocio, no por la tecnología que usa.",
    evidenceLabel: "Evidencia:",
    sectorsLabel: "Sectores",
    sectors: ["Sector público", "Banca y crédito", "Consumo masivo", "Retail", "Marketing y medios"],
    items: [
      {
        title: "Inteligencia artificial y machine learning",
        description:
          "Modelos predictivos, detección de anomalías, scoring de riesgo e IA generativa aplicada a tu operación.",
        tags: ["Predicción", "Scoring", "IA generativa"],
        evidence: "caso SICOP, 47 patrones y 8 dimensiones de riesgo.",
      },
      {
        title: "Automatización inteligente",
        description:
          "Procesos que hoy son manuales, resueltos con flujos y agentes de IA conectados a tus sistemas.",
        tags: ["Agentes de IA", "Flujos", "Integraciones"],
        evidence: "ingesta, reportes y pronósticos automatizados para consumo masivo.",
      },
      {
        title: "Analítica avanzada y BI",
        description:
          "Tableros ejecutivos, segmentación de clientes, pronósticos y medición del desempeño de campañas.",
        tags: ["Dashboards", "RFM", "Pronósticos"],
        evidence: "",
      },
      {
        title: "Arquitectura y gobierno de datos",
        description:
          "Ingesta, calidad y gobierno en la nube, para que la IA trabaje sobre datos confiables.",
        tags: ["Nube", "Calidad", "Gobierno"],
        evidence: "",
      },
    ],
  },

```

- [ ] **Paso 5: bloque `services` en inglés**

En `src/content/i18n/en.ts`, insertar después del bloque `dashboard`:

```ts
  services: {
    eyebrow: "Services",
    title: "What N-AI does for your organization.",
    body:
      "Four service lines held to one standard: every solution is measured by its business impact, not by the technology it uses.",
    evidenceLabel: "Proof:",
    sectorsLabel: "Sectors",
    sectors: ["Public sector", "Banking and credit", "Consumer goods", "Retail", "Marketing and media"],
    items: [
      {
        title: "Artificial intelligence and machine learning",
        description:
          "Predictive models, anomaly detection, risk scoring and generative AI applied to your operations.",
        tags: ["Prediction", "Scoring", "Generative AI"],
        evidence: "SICOP case, 47 patterns and 8 risk dimensions.",
      },
      {
        title: "Intelligent automation",
        description:
          "Processes that are manual today, solved with workflows and AI agents connected to your systems.",
        tags: ["AI agents", "Workflows", "Integrations"],
        evidence: "automated ingestion, reporting and forecasting for consumer goods.",
      },
      {
        title: "Advanced analytics and BI",
        description:
          "Executive dashboards, customer segmentation, forecasting and campaign performance measurement.",
        tags: ["Dashboards", "RFM", "Forecasting"],
        evidence: "",
      },
      {
        title: "Data architecture and governance",
        description:
          "Cloud ingestion, quality and governance, so AI runs on data you can trust.",
        tags: ["Cloud", "Quality", "Governance"],
        evidence: "",
      },
    ],
  },

```

- [ ] **Paso 6: crear `src/components/sections/Services.tsx`**

```tsx
"use client";

import type { PointerEvent } from "react";
import { Database, Sparkles, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";
import { serviceIcons, type ServiceIcon } from "@/content/services";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  sparkles: Sparkles,
  workflow: Workflow,
  trending: TrendingUp,
  database: Database,
};

/** Posición del puntero para la luz que sigue al mouse (solo decorativa). */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export default function Services() {
  const t = useT();
  const s = t.services;

  return (
    <Section id="servicios">
      <Reveal>
        <p className="text-eyebrow">{s.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{s.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-body mt-4 max-w-[62ch]">{s.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((item, i) => {
          const Icon = ICONS[serviceIcons[i]];
          return (
            <Reveal key={item.title} delay={i * 0.06} className="h-full">
              <article
                onPointerMove={trackPointer}
                className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-[360px]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,50%),rgba(143,180,255,0.18),transparent_45%)] group-hover:opacity-100"
                />
                <span className="absolute right-6 top-6 font-display text-[13px] font-bold tabular-nums text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-[50px] w-[50px] place-items-center rounded-[14px] bg-accent/15 text-accent">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-8 font-display text-[22px] font-bold leading-tight text-ink lg:mt-auto lg:pt-8">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{item.description}</p>
                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-2">
                      {tag}
                    </li>
                  ))}
                </ul>
                {item.evidence && (
                  <p className="mt-3.5 border-t border-line pt-3 text-[13px] text-ink-soft">
                    <b className="font-semibold text-accent-cyan">{s.evidenceLabel}</b> {item.evidence}
                  </p>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2.5 border-t border-line pt-6 text-base font-semibold text-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {s.sectorsLabel}
          </span>
          {s.sectors.map((sector) => (
            <span key={sector}>{sector}</span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Paso 7: montar la sección**

En `src/app/_shell/HomeSections.tsx`, agregar `import Services from "@/components/sections/Services";` y colocar `<Services />` justo después de `<Hero />`. La composición final se ordena en la Tarea 11.

- [ ] **Paso 8: pruebas y compilación**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test ; pnpm lint && pnpm build`
Esperado: la prueba "4 servicios" pasa. La de "misma estructura" puede fallar solo por bloques heredados (ver nota del Paso 2). Lint y build sin errores.

- [ ] **Paso 9: commit y push**

```bash
cd ~/WebSite_personal
git add src/content/services.ts src/components/sections/Services.tsx src/content/i18n/es.ts src/content/i18n/en.ts src/app/_shell/HomeSections.tsx tests/i18n.test.mts
git commit -m "Servicios: 4 tarjetas con evidencia real del estilo C

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 6: Banda del caso SICOP

**Archivos:**
- Crear: `src/components/sections/CaseBand.tsx`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (nuevo bloque `caseBand`, después de `services`)
- Modificar: `src/app/_shell/HomeSections.tsx` (montar `CaseBand` después de `Services`)
- Modificar: `tests/i18n.test.mts`

**Interfaces:**
- Consume:
  - `CASE_SICOP_PATH` (Tarea 3);
  - `caseFacts` (Tarea 1);
  - `LinkButton`, `Reveal` y `Container` (Tarea 2).
- Produce:
  - i18n `t.caseBand: { eyebrow, title, context, resultLabel, result, cta, facts: { value, label }[] }`;
  - `<CaseBand />` con `id="caso-sicop"`.

- [ ] **Paso 1: prueba que falla**

Agregar al final de `tests/i18n.test.mts`:

```ts
import { caseFacts } from "../src/content/data/sicop.ts";

test("la banda del caso muestra los hechos reales en orden", () => {
  for (const dict of [es, en]) {
    assert.deepEqual(
      dict.caseBand.facts.map((f) => f.value),
      [String(caseFacts.sources), String(caseFacts.anomalyPatterns), String(caseFacts.riskDimensions), `<${caseFacts.scoringSeconds} s`],
    );
  }
});
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL con `Cannot read properties of undefined (reading 'facts')`.

- [ ] **Paso 3: bloque `caseBand` en español**

En `src/content/i18n/es.ts`, insertar después del bloque `services`:

```ts
  caseBand: {
    eyebrow: "Caso destacado",
    title: "Inteligencia de compras públicas para la Contraloría General de la República.",
    context:
      "La supervisión de las compras públicas era reactiva: las irregularidades aparecían después del daño, con datos repartidos en fuentes y taxonomías distintas.",
    resultLabel: "Resultado",
    result:
      "El riesgo se vuelve visible antes de convertirse en un caso legal: los auditores actúan sobre señales, no sobre hallazgos.",
    cta: "Leer el caso completo",
    facts: [
      { value: "7", label: "fuentes de datos unificadas" },
      { value: "47", label: "patrones de anomalía" },
      { value: "8", label: "dimensiones de riesgo institucional" },
      { value: "<1 s", label: "para calcular un puntaje de riesgo" },
    ],
  },

```

- [ ] **Paso 4: bloque `caseBand` en inglés**

En `src/content/i18n/en.ts`, insertar después del bloque `services`:

```ts
  caseBand: {
    eyebrow: "Featured case",
    title: "Public procurement intelligence for Costa Rica's Comptroller General.",
    context:
      "Public procurement oversight was reactive: irregularities surfaced after the damage was done, with data spread across different sources and taxonomies.",
    resultLabel: "Outcome",
    result:
      "Risk becomes visible before it turns into a legal case: auditors act on signals, not on findings.",
    cta: "Read the full case",
    facts: [
      { value: "7", label: "unified data sources" },
      { value: "47", label: "anomaly patterns" },
      { value: "8", label: "institutional risk dimensions" },
      { value: "<1 s", label: "to compute a risk score" },
    ],
  },

```

- [ ] **Paso 5: crear `src/components/sections/CaseBand.tsx`**

```tsx
"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n";
import { CASE_SICOP_PATH } from "@/lib/routes";

export default function CaseBand() {
  const { lang, t } = useLanguage();
  const c = t.caseBand;

  return (
    <section id="caso-sicop" aria-labelledby="caso-sicop-title" className="py-6 md:py-10">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-band border border-line bg-navy-band bg-[radial-gradient(70%_100%_at_85%_0%,#233E85_0%,transparent_70%)] p-7 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">
            <div>
              <p className="text-eyebrow">{c.eyebrow}</p>
              <h2 id="caso-sicop-title" className="text-display-l mt-3.5 text-ink">
                {c.title}
              </h2>
              <p className="text-body mt-5 max-w-[52ch]">{c.context}</p>
              <div className="mt-6 max-w-[50ch] border-l-2 border-accent-cyan pl-4">
                <span className="block text-[13px] text-ink-muted">{c.resultLabel}</span>
                <p className="mt-1 text-lg text-ink">{c.result}</p>
              </div>
              <div className="mt-8">
                <LinkButton href={CASE_SICOP_PATH[lang]} variant="primary" withArrow>
                  {c.cta}
                </LinkButton>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {c.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col-reverse justify-end rounded-[18px] border border-line bg-white/5 p-5"
                >
                  <dt className="mt-2.5 text-sm text-ink-2">{fact.label}</dt>
                  <dd className="bg-fact-text bg-clip-text font-display text-[clamp(40px,4.4vw,56px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-transparent">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Paso 6: montar la sección**

En `src/app/_shell/HomeSections.tsx`, agregar `import CaseBand from "@/components/sections/CaseBand";` y colocar `<CaseBand />` justo después de `<Services />`.

- [ ] **Paso 7: pruebas, compilación y revisión visual**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test ; pnpm lint && pnpm build`
Esperado: la prueba de la banda pasa; lint y build sin errores. En `pnpm start -p 3100`, la banda se ve como en la maqueta v3 y "Leer el caso completo" apunta a `/casos/sicop` (la página se crea en la Tarea 10; hasta entonces da 404, lo cual es esperado).

- [ ] **Paso 8: commit y push**

```bash
cd ~/WebSite_personal
git add src/components/sections/CaseBand.tsx src/content/i18n/es.ts src/content/i18n/en.ts src/app/_shell/HomeSections.tsx tests/i18n.test.mts
git commit -m "Banda del caso SICOP con hechos reales

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 7: Demos (6 sistemas, con el caso de automatización)

**Archivos:**
- Reemplazar: `src/content/demos.ts`, `src/components/ui/Badge.tsx`, `src/components/sections/DemoShowcase.tsx`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (bloques `demosSection`, `demos`, `statusLabels`)
- Modificar: `tests/i18n.test.mts`

**Interfaces:**
- Consume: `CASE_SICOP_PATH` (Tarea 3); `Section` y `Reveal` (Tarea 2).
- Produce:
  - `type DemoStatus = "Live" | "In Build" | "Concept"`;
  - `type DemoPreview = "anomaly" | "automation" | "decision" | "heat" | "consumer" | "graph"`;
  - `demoStatic: readonly { slug: string; preview: DemoPreview }[]` (6);
  - `<Badge tone="live" | "build" | "concept">`;
  - i18n `t.demosSection: { eyebrow, title, body, cta }`, `t.demos: { slug, title, status, description }[]` (6) y `t.statusLabels: Record<DemoStatus, string>`.

- [ ] **Paso 1: prueba que falla**

Agregar al final de `tests/i18n.test.mts`:

```ts
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
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL en "6 demos" (hoy hay 5 y el orden es otro).

- [ ] **Paso 3: reemplazar `src/content/demos.ts`**

```ts
// Configuración visual de las demos. Los textos viven en src/content/i18n/{es,en}.ts (`t.demos`).

export type DemoStatus = "Live" | "In Build" | "Concept";
export type DemoPreview = "anomaly" | "automation" | "decision" | "heat" | "consumer" | "graph";

export interface DemoStatic {
  slug: string;
  preview: DemoPreview;
}

export const demoStatic: readonly DemoStatic[] = [
  { slug: "public-procurement-intelligence", preview: "anomaly" },
  { slug: "data-automation", preview: "automation" },
  { slug: "credit-preapproval", preview: "decision" },
  { slug: "heatsight-ai", preview: "heat" },
  { slug: "consumer-intelligence", preview: "consumer" },
  { slug: "data-governance-intelligence", preview: "graph" },
];
```

- [ ] **Paso 4: textos en español**

En `src/content/i18n/es.ts`, reemplazar desde `  demosSection: {` hasta el cierre del bloque `statusLabels` (inclusive) por:

```ts
  demosSection: {
    eyebrow: "Demos",
    title: "Sistemas en producción y en construcción.",
    body: "Cada sistema responde una pregunta real de negocio.",
    cta: "Ver el caso",
  },
  demos: [
    {
      slug: "public-procurement-intelligence",
      title: "Inteligencia de compras públicas",
      status: "Live" as const,
      description: "Detección de anomalías, scoring de riesgo y monitoreo preventivo sobre SICOP.",
    },
    {
      slug: "data-automation",
      title: "Ingesta, reportes y pronósticos automatizados",
      status: "Live" as const,
      description:
        "Para una empresa regional de consumo masivo: los datos de varias fuentes se centralizan, limpian y unifican solos, y los reportes se actualizan, analizan y proyectan sin trabajo manual.",
    },
    {
      slug: "credit-preapproval",
      title: "Crédito preaprobado · motor de decisión",
      status: "Live" as const,
      description:
        "Preaprobación automática para una entidad financiera regulada: más de 200 reglas de negocio (NIF y SUGEF) y decisión en menos de un segundo. Resultado: +400% de créditos colocados.",
    },
    {
      slug: "heatsight-ai",
      title: "HeatSight AI",
      status: "In Build" as const,
      description:
        "Demanda del consumidor por geografía y SKU: micro-tendencias visibles antes de que lleguen al reporte.",
    },
    {
      slug: "consumer-intelligence",
      title: "Inteligencia de consumidor",
      status: "In Build" as const,
      description:
        "Segmentación de comportamiento y preferencias reveladas para líderes de categoría y retail.",
    },
    {
      slug: "data-governance-intelligence",
      title: "Inteligencia de gobierno de datos",
      status: "Concept" as const,
      description:
        "Linaje, calidad, responsables y postura regulatoria de los datos, visibles a escala institucional.",
    },
  ],
  statusLabels: {
    Live: "En vivo",
    "In Build": "En construcción",
    Concept: "Concepto",
  },
```

- [ ] **Paso 5: textos en inglés**

En `src/content/i18n/en.ts`, reemplazar el mismo rango por:

```ts
  demosSection: {
    eyebrow: "Demos",
    title: "Systems in production and in the making.",
    body: "Each system answers a real business question.",
    cta: "See the case",
  },
  demos: [
    {
      slug: "public-procurement-intelligence",
      title: "Public procurement intelligence",
      status: "Live" as const,
      description: "Anomaly detection, risk scoring and preventive monitoring on SICOP.",
    },
    {
      slug: "data-automation",
      title: "Automated data ingestion, reporting and forecasting",
      status: "Live" as const,
      description:
        "For a regional consumer goods company: data from multiple sources is centralized, cleaned and unified automatically, and reports are refreshed, analyzed and forecast with no manual work.",
    },
    {
      slug: "credit-preapproval",
      title: "Pre-approved credit · decision engine",
      status: "Live" as const,
      description:
        "Automated pre-approval for a regulated financial institution: 200+ business rules (NIF and SUGEF) and sub-second decisions. Result: +400% credit placements.",
    },
    {
      slug: "heatsight-ai",
      title: "HeatSight AI",
      status: "In Build" as const,
      description:
        "Consumer demand by geography and SKU: micro-trends visible before they reach the report.",
    },
    {
      slug: "consumer-intelligence",
      title: "Consumer intelligence",
      status: "In Build" as const,
      description:
        "Behavioral segmentation and revealed preferences for category and retail leaders.",
    },
    {
      slug: "data-governance-intelligence",
      title: "Data governance intelligence",
      status: "Concept" as const,
      description:
        "Lineage, quality, ownership and regulatory posture of data, visible at institutional scale.",
    },
  ],
  statusLabels: {
    Live: "Live",
    "In Build": "In build",
    Concept: "Concept",
  },
```

- [ ] **Paso 6: reemplazar `src/components/ui/Badge.tsx`**

```tsx
import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Tone = "live" | "build" | "concept";

const tones: Record<Tone, string> = {
  live: "border-live/30 text-live",
  build: "border-warn/30 text-warn",
  concept: "border-line text-ink-2",
};

const dots: Record<Tone, string> = {
  live: "animate-pulse-dot bg-live shadow-[0_0_10px_#7FF0C8]",
  build: "bg-warn",
  concept: "bg-ink-muted",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone: Tone;
}

export default function Badge({ tone, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className={cn("h-[7px] w-[7px] rounded-full", dots[tone])} />
      {children}
    </span>
  );
}
```

- [ ] **Paso 7: reemplazar `src/components/sections/DemoShowcase.tsx`**

```tsx
"use client";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { CASE_SICOP_PATH } from "@/lib/routes";
import { demoStatic, type DemoPreview, type DemoStatus } from "@/content/demos";

const TONE: Record<DemoStatus, "live" | "build" | "concept"> = {
  Live: "live",
  "In Build": "build",
  Concept: "concept",
};

export default function DemoShowcase() {
  const { lang, t } = useLanguage();

  return (
    <Section id="demos">
      <Reveal>
        <p className="text-eyebrow">{t.demosSection.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{t.demosSection.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-body mt-4 max-w-[62ch]">{t.demosSection.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {t.demos.map((demo, i) => {
          const preview = demoStatic[i].preview;
          return (
            <Reveal key={demo.slug} delay={(i % 3) * 0.06} className="h-full">
              <article className="flex h-full min-h-[300px] flex-col rounded-card border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <Badge tone={TONE[demo.status]}>{t.statusLabels[demo.status]}</Badge>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink">{demo.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{demo.description}</p>
                <div className="mt-auto pt-5">
                  <PreviewVisual kind={preview} />
                </div>
                {preview === "anomaly" && (
                  <a
                    href={CASE_SICOP_PATH[lang]}
                    className="group mt-3.5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-cyan"
                  >
                    {t.demosSection.cta}
                    <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
                      →
                    </span>
                  </a>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function PreviewVisual({ kind }: { kind: DemoPreview }) {
  const svg = "block h-auto max-h-[84px] w-full";
  switch (kind) {
    case "anomaly":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <defs>
            <linearGradient id="demo-anomaly" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4F86E6" stopOpacity="0.4" />
              <stop offset="1" stopColor="#4F86E6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 46 L24 40 L48 44 L72 34 L96 38 L120 30 L144 40 L168 22 L192 34 L216 12 L240 26 L240 64 L0 64Z" fill="url(#demo-anomaly)" />
          <polyline points="0,46 24,40 48,44 72,34 96,38 120,30 144,40 168,22 192,34 216,12 240,26" fill="none" stroke="#8FB4FF" strokeWidth="1.8" />
          <circle cx="216" cy="12" r="4" fill="#FF6B78" />
          <circle cx="168" cy="22" r="4" fill="#FF6B78" />
        </svg>
      );
    case "automation":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g fill="none" stroke="rgba(143,180,255,0.55)">
            <path d="M14 10h36M14 32h36M14 54h36M50 10l28 22M50 54l28-22M50 32h28M104 32h14" />
          </g>
          <g fill="#8FB4FF">
            <circle cx="10" cy="10" r="4" />
            <circle cx="10" cy="32" r="4" />
            <circle cx="10" cy="54" r="4" />
          </g>
          <rect x="80" y="22" width="24" height="20" rx="4" fill="#35E0FF" fillOpacity="0.85" />
          <g fill="#8FB4FF" fillOpacity="0.8">
            <rect x="124" y="40" width="10" height="20" />
            <rect x="138" y="30" width="10" height="30" />
            <rect x="152" y="34" width="10" height="26" />
            <rect x="166" y="22" width="10" height="38" />
          </g>
          <path d="M176 22l16-6 16-4 16-6" fill="none" stroke="#35E0FF" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      );
    case "decision":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g fill="rgba(143,180,255,0.12)" stroke="#8FB4FF">
            <rect x="8" y="22" width="44" height="20" rx="4" />
            <rect x="104" y="6" width="44" height="20" rx="4" />
            <rect x="104" y="38" width="44" height="20" rx="4" />
          </g>
          <path d="M52 32h28M80 32l24-16M80 32l24 16M148 48h40" stroke="rgba(143,180,255,0.5)" fill="none" />
          <rect x="188" y="38" width="44" height="20" rx="4" fill="rgba(53,224,255,0.2)" stroke="#35E0FF" />
        </svg>
      );
    case "heat":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          {Array.from({ length: 36 }, (_, i) => {
            // Patrón fijo (seno), no datos: es una ilustración de la demo en construcción.
            const intensity = (Math.sin(i * 0.7) + 1) / 2;
            const peak = intensity > 0.93;
            return (
              <rect
                key={i}
                x={(i % 12) * 20}
                y={Math.floor(i / 12) * 21}
                width="18"
                height="19"
                rx="3"
                fill={peak ? "#35E0FF" : "#8FB4FF"}
                fillOpacity={peak ? 1 : 0.1 + intensity * 0.6}
              />
            );
          })}
        </svg>
      );
    case "consumer":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g fill="#8FB4FF" fillOpacity="0.55">
            <rect x="0" y="40" width="30" height="24" rx="3" />
            <rect x="40" y="26" width="30" height="38" rx="3" />
            <rect x="120" y="30" width="30" height="34" rx="3" />
            <rect x="160" y="44" width="30" height="20" rx="3" />
            <rect x="200" y="36" width="30" height="28" rx="3" />
          </g>
          <rect x="80" y="10" width="30" height="54" rx="3" fill="#35E0FF" />
        </svg>
      );
    case "graph":
      return (
        <svg viewBox="0 0 240 64" className={svg} aria-hidden>
          <g stroke="rgba(143,180,255,0.35)">
            <line x1="30" y1="14" x2="80" y2="44" />
            <line x1="80" y1="44" x2="130" y2="14" />
            <line x1="130" y1="14" x2="180" y2="46" />
            <line x1="180" y1="46" x2="220" y2="18" />
            <line x1="55" y1="54" x2="105" y2="26" />
            <line x1="105" y1="26" x2="155" y2="54" />
          </g>
          <g fill="#8FB4FF">
            <circle cx="30" cy="14" r="4" />
            <circle cx="80" cy="44" r="4" />
            <circle cx="130" cy="14" r="4" />
            <circle cx="180" cy="46" r="4" />
            <circle cx="55" cy="54" r="4" />
            <circle cx="105" cy="26" r="4" />
            <circle cx="155" cy="54" r="4" />
          </g>
          <circle cx="220" cy="18" r="5" fill="#35E0FF" />
        </svg>
      );
  }
}
```

- [ ] **Paso 8: pruebas y compilación**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test ; pnpm lint && pnpm build`
Esperado: la prueba "6 demos" pasa; lint y build sin errores. Si `pnpm build` falla porque otro componente usa `<Badge pulse>` o `tone="neutral"`, correr `grep -rn "components/ui/Badge" src`: solo `DemoShowcase.tsx` debe importarlo.

- [ ] **Paso 9: commit y push**

```bash
cd ~/WebSite_personal
git add src/content/demos.ts src/components/ui/Badge.tsx src/components/sections/DemoShowcase.tsx src/content/i18n/es.ts src/content/i18n/en.ts tests/i18n.test.mts
git commit -m "Demos del estilo C: 6 sistemas, incluido el caso de automatizacion

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 8: Método y Quién lidera

**Archivos:**
- Crear: `src/components/sections/Method.tsx`, `src/components/sections/Leadership.tsx`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (nuevos bloques `method` y `leadership`, después de `caseBand`)
- Modificar: `src/app/_shell/HomeSections.tsx` (montar `Method` y `Leadership` después de `DemoShowcase`)
- Modificar: `tests/i18n.test.mts`

**Interfaces:**
- Consume: `site.contact` (Tarea 3); `Section` y `Reveal` (Tarea 2).
- Produce:
  - i18n `t.method: { eyebrow, title, deliverableLabel, steps: { title, body, deliverable }[] }` (4);
  - i18n `t.leadership: { eyebrow, title, name, role, disciplines, bio, quote, areasLabel, areas: string[], portraitAlt, credentials: { value, label }[] }`;
  - `<Method />` con `id="metodo"` y `<Leadership />` con `id="quien-lidera"`.

- [ ] **Paso 1: prueba que falla**

Agregar al final de `tests/i18n.test.mts`:

```ts
test("método de 4 fases y 4 credenciales reales", () => {
  for (const dict of [es, en]) {
    assert.equal(dict.method.steps.length, 4);
    assert.deepEqual(
      dict.leadership.credentials.slice(0, 3).map((c) => c.value),
      ["+400%", ">2.4M", "47"],
    );
  }
});
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL con `Cannot read properties of undefined (reading 'steps')`.

- [ ] **Paso 3: textos en español**

En `src/content/i18n/es.ts`, insertar después del bloque `caseBand`:

```ts
  method: {
    eyebrow: "Método",
    title: "Del diagnóstico a la operación.",
    deliverableLabel: "Entregable",
    steps: [
      {
        title: "Diagnóstico",
        body: "Entender el problema de negocio y evaluar los datos disponibles.",
        deliverable: "Mapa de oportunidades",
      },
      {
        title: "Diseño",
        body: "Definir la solución, las métricas de éxito y el plan de trabajo.",
        deliverable: "Arquitectura y plan",
      },
      {
        title: "Construcción",
        body: "Desarrollar y validar con datos reales, en ciclos cortos.",
        deliverable: "Solución probada",
      },
      {
        title: "Operación",
        body: "Poner en producción, medir resultados y mejorar.",
        deliverable: "Impacto medido",
      },
    ],
  },

  leadership: {
    eyebrow: "Quién lidera",
    title: "Primero la pregunta de negocio. Al final, la tecnología.",
    name: "Nancy Rodríguez",
    role: "Fundadora · Principal Data & AI Consultant",
    disciplines: "Economista · Estadística · Data & AI Leader",
    bio:
      "Nancy Rodríguez es economista, estadística y líder de datos e IA, con experiencia transformando problemas complejos de negocio en soluciones medibles basadas en datos. Cada proyecto de N-AI lo lleva ella directamente.",
    quote: "Datos sin metodología son solo información.",
    areasLabel: "Áreas de trabajo",
    areas: [
      "Inteligencia artificial",
      "Analítica avanzada",
      "Estrategia de datos",
      "Inteligencia de consumidor",
      "Modelado predictivo",
      "Gobierno de datos",
    ],
    portraitAlt: "Retrato de Nancy Rodríguez, fundadora de N-AI",
    credentials: [
      { value: "+400%", label: "créditos colocados con motores de decisión" },
      { value: ">2.4M", label: "registros de compra pública analizados" },
      { value: "47", label: "patrones de anomalía modelados" },
      { value: "Investigación", label: "publicaciones académicas en economía y estadística" },
    ],
  },

```

- [ ] **Paso 4: textos en inglés**

En `src/content/i18n/en.ts`, insertar después del bloque `caseBand`:

```ts
  method: {
    eyebrow: "Method",
    title: "From diagnosis to operation.",
    deliverableLabel: "Deliverable",
    steps: [
      {
        title: "Diagnosis",
        body: "Understand the business problem and assess the available data.",
        deliverable: "Opportunity map",
      },
      {
        title: "Design",
        body: "Define the solution, success metrics and work plan.",
        deliverable: "Architecture and plan",
      },
      {
        title: "Build",
        body: "Develop and validate with real data, in short cycles.",
        deliverable: "Tested solution",
      },
      {
        title: "Operate",
        body: "Deploy to production, measure results and improve.",
        deliverable: "Measured impact",
      },
    ],
  },

  leadership: {
    eyebrow: "Who leads",
    title: "Business question first. Technology last.",
    name: "Nancy Rodríguez",
    role: "Founder · Principal Data & AI Consultant",
    disciplines: "Economist · Statistician · Data & AI Leader",
    bio:
      "Nancy Rodríguez is an economist, statistician and data & AI leader with experience turning complex business problems into measurable, data-driven solutions. She leads every N-AI project personally.",
    quote: "Data without methodology is just information.",
    areasLabel: "Areas of work",
    areas: [
      "Artificial intelligence",
      "Advanced analytics",
      "Data strategy",
      "Consumer intelligence",
      "Predictive modeling",
      "Data governance",
    ],
    portraitAlt: "Portrait of Nancy Rodríguez, founder of N-AI",
    credentials: [
      { value: "+400%", label: "credit placements with decision engines" },
      { value: ">2.4M", label: "public procurement records analyzed" },
      { value: "47", label: "anomaly patterns modeled" },
      { value: "Research", label: "academic publications in economics and statistics" },
    ],
  },

```

- [ ] **Paso 5: crear `src/components/sections/Method.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

export default function Method() {
  const t = useT();
  const m = t.method;
  const lineRef = useRef<HTMLDivElement>(null);
  // El destello recorre la línea dos veces al entrar en pantalla y se detiene.
  const inView = useInView(lineRef, { once: true, amount: 0.4 });

  return (
    <Section id="metodo">
      <Reveal>
        <p className="text-eyebrow">{m.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{m.title}</h2>
      </Reveal>

      <div ref={lineRef} className="relative mt-14">
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-[27px] hidden h-0.5 bg-gradient-to-r from-accent to-accent-cyan opacity-35 md:block"
        />
        <div
          aria-hidden
          className={cn(
            "absolute left-[6%] top-[25px] hidden h-1.5 w-[14%] rounded-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-0 blur-[1px] md:block",
            inView && "animate-beam",
          )}
        />
        <ol className="grid gap-9 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
          {m.steps.map((step, i) => (
            <li key={step.title} className="relative md:pr-6">
              <Reveal delay={i * 0.06}>
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-accent bg-navy font-display text-lg font-extrabold tabular-nums text-ink">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 font-display text-[21px] font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{step.body}</p>
                <p className="mt-3.5 inline-block rounded-full border border-accent/35 px-2.5 py-1 text-xs font-semibold text-accent">
                  <span className="sr-only">{m.deliverableLabel}: </span>
                  {step.deliverable}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
```

- [ ] **Paso 6: crear `src/components/sections/Leadership.tsx`**

```tsx
"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { useT } from "@/lib/i18n";

const SOCIAL = [
  { label: "LinkedIn", href: site.contact.linkedin },
  { label: "Google Scholar", href: site.contact.scholar },
  { label: "GitHub", href: site.contact.github },
];

export default function Leadership() {
  const t = useT();
  const l = t.leadership;

  return (
    <Section id="quien-lidera">
      <Reveal>
        <p className="text-eyebrow">{l.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-display-l mt-3.5 max-w-[19ch] text-ink">{l.title}</h2>
      </Reveal>

      <div className="mt-12 grid gap-3.5 lg:grid-cols-[5fr_7fr]">
        <Reveal className="h-full">
          <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
            <div className="relative aspect-[4/4.2] bg-gradient-to-br from-accent/25 to-accent-cyan/10">
              <Image
                src="/nancy-retrato.webp"
                alt={l.portraitAlt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-[center_22%]"
              />
            </div>
            <div className="px-5 pb-6 pt-5">
              <h3 className="font-display text-[22px] font-bold text-ink">{l.name}</h3>
              <p className="mt-1 text-sm font-semibold text-accent">{l.role}</p>
              <p className="mt-2 text-sm text-ink-2">{l.disciplines}</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.06} className="h-full">
          <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6 md:p-9">
            <p className="text-[17px] leading-relaxed text-ink-2">{l.bio}</p>
            <blockquote className="mt-6 border-l-2 border-accent-cyan pl-4 font-serif text-[clamp(26px,2.6vw,34px)] italic leading-tight text-ink">
              {l.quote}
            </blockquote>
            <ul aria-label={l.areasLabel} className="mt-6 flex flex-wrap gap-2">
              {l.areas.map((area) => (
                <li key={area} className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-soft">
                  {area}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-6 pt-6">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-accent transition-colors duration-150 hover:text-accent-cyan"
                >
                  {item.label}
                  <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <dl className="mt-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {l.credentials.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.06}>
            <div className="flex h-full flex-col-reverse justify-end rounded-[18px] border border-line bg-surface p-5">
              <dt className="mt-2 text-sm leading-snug text-ink-2">{c.label}</dt>
              <dd className="font-display text-4xl font-extrabold leading-none tracking-[-0.035em] tabular-nums text-ink">
                {c.value}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
```

- [ ] **Paso 7: montar las secciones**

En `src/app/_shell/HomeSections.tsx`, agregar los imports de `Method` y `Leadership` y colocar `<Method />` y `<Leadership />`, en ese orden, justo después de `<DemoShowcase />`.

- [ ] **Paso 8: pruebas, compilación y revisión**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && ls public/nancy-retrato.webp && pnpm test ; pnpm lint && pnpm build`
Esperado:
- el retrato existe y la prueba "método de 4 fases" pasa;
- lint y build sin errores;
- en `pnpm start -p 3100`, el destello de la línea corre dos veces y se detiene;
- con movimiento reducido no corre.

- [ ] **Paso 9: commit y push**

```bash
cd ~/WebSite_personal
git add src/components/sections/Method.tsx src/components/sections/Leadership.tsx src/content/i18n/es.ts src/content/i18n/en.ts src/app/_shell/HomeSections.tsx tests/i18n.test.mts
git commit -m "Metodo de 4 fases y seccion Quien lidera

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 9: Preguntas clave, contacto y datos estructurados

**Archivos:**
- Reemplazar: `src/components/sections/FAQ.tsx`, `src/components/sections/Contact.tsx`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (bloques `faq` y `contact`)
- Modificar: `src/components/seo/StructuredData.tsx`
- Modificar: `tests/i18n.test.mts`

**Interfaces:**
- Consume:
  - `site.contact.email` y `site.contact.whatsapp` (Tarea 3);
  - `t.services.items` (Tarea 5);
  - `Section`, `Container`, `Reveal` y `LinkButton` (Tarea 2).
- Produce:
  - i18n `t.faq: { eyebrow, title, moreLabel, items: { q, a, featured: boolean }[] }` (6 preguntas, 3 destacadas);
  - i18n `t.contact: { eyebrow, title, body, primaryCta, secondaryCta, nextLabel, steps: { title, body }[], whatsappMessage, mailtoSubject, mailtoBody }`;
  - JSON-LD con `Service` ×4 y `FAQPage` con las 6 preguntas por idioma.

- [ ] **Paso 1: prueba que falla**

Agregar al final de `tests/i18n.test.mts`:

```ts
test("FAQ compacta: 6 preguntas, 3 destacadas abiertas", () => {
  for (const dict of [es, en]) {
    assert.equal(dict.faq.items.length, 6);
    assert.equal(dict.faq.items.filter((item) => item.featured).length, 3);
    assert.deepEqual(
      dict.faq.items.map((item) => item.featured),
      [true, true, true, false, false, false],
    );
  }
});

test("el contacto propone el diagnóstico y no usa el correo del dominio", () => {
  assert.match(es.contact.whatsappMessage, /diagnóstico/);
  assert.match(en.contact.whatsappMessage, /diagnostic/);
  assert.equal(es.contact.steps.length, 3);
  const all = JSON.stringify(es) + JSON.stringify(en);
  assert.doesNotMatch(all, /nancyrodriguez@n-ai\.dev/);
});
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL en las dos pruebas nuevas (hoy hay 15 preguntas y el correo del dominio aparece en la FAQ).

- [ ] **Paso 3: textos en español**

En `src/content/i18n/es.ts`, reemplazar el bloque completo `  faq: { ... },` y el bloque completo `  contact: { ... },` por:

```ts
  faq: {
    eyebrow: "Preguntas clave",
    title: "Lo que conviene saber antes de empezar.",
    moreLabel: "Más preguntas",
    items: [
      {
        q: "¿Cómo se cobra una consultoría con N-AI?",
        a: "Cada proyecto se cotiza según su alcance, profundidad técnica y duración. Hay tres modalidades: proyecto cerrado (de la idea a la puesta en producción), acompañamiento mensual o asesoría por horas.",
        featured: true,
      },
      {
        q: "¿Cómo empieza un proyecto?",
        a: "Con una conversación inicial sin compromiso para entender el problema y los datos disponibles. De ahí sale una propuesta con alcance, modalidad y plan.",
        featured: true,
      },
      {
        q: "¿Qué hace diferente a N-AI?",
        a: "Cada proyecto lo lleva directamente la fundadora, Nancy Rodríguez. Une el método cuantitativo de una economista y estadística con experiencia técnica en ciencia de datos, machine learning y arquitectura de datos.",
        featured: true,
      },
      {
        q: "¿Qué servicios ofrece N-AI?",
        a: "Inteligencia artificial y machine learning, automatización inteligente, analítica avanzada y BI, y arquitectura y gobierno de datos.",
        featured: false,
      },
      {
        q: "¿Quién hace consultoría de IA en Costa Rica?",
        a: "N-AI (n-ai.dev), fundada por Nancy Rodríguez, ofrece consultoría de IA, automatización, analítica avanzada y arquitectura de datos para empresas e instituciones en Costa Rica y Latinoamérica.",
        featured: false,
      },
      {
        q: "¿Quién hace inteligencia de compras públicas en Costa Rica?",
        a: "N-AI desarrolló la arquitectura de inteligencia para SICOP con la Contraloría General de la República: detección de anomalías sobre 47 patrones, scoring de riesgo en 8 dimensiones institucionales y monitoreo preventivo.",
        featured: false,
      },
    ],
  },

  contact: {
    eyebrow: "Agendar un diagnóstico",
    title: "¿Tienes un problema de datos que vale la pena resolver?",
    body:
      "En una conversación inicial se identifica dónde la IA, la automatización o la analítica avanzada pueden generar impacto en tu organización.",
    primaryCta: "Escribir por WhatsApp",
    secondaryCta: "Escribir por correo",
    nextLabel: "Qué pasa después",
    steps: [
      {
        title: "Escribes",
        body: "Por WhatsApp (respuesta más rápida) o por correo (propuestas y documentos).",
      },
      { title: "Nancy te responde", body: "Para coordinar la conversación inicial." },
      { title: "Conversación inicial", body: "Sin compromiso: el problema, los datos y el siguiente paso." },
    ],
    whatsappMessage:
      "Hola Nancy, te escribo desde n-ai.dev. Me interesa agendar un diagnóstico para un proyecto de datos / IA.",
    mailtoSubject: "Diagnóstico con N-AI",
    mailtoBody:
      "Hola Nancy,\n\nMe interesa agendar un diagnóstico para un proyecto de datos o IA.\n\nContexto:\n• Organización:\n• Objetivo:\n• Plazo:\n\nGracias,\n",
  },
```

- [ ] **Paso 4: textos en inglés**

En `src/content/i18n/en.ts`, reemplazar los mismos dos bloques por:

```ts
  faq: {
    eyebrow: "Key questions",
    title: "What to know before you start.",
    moreLabel: "More questions",
    items: [
      {
        q: "How is N-AI consulting priced?",
        a: "Each project is quoted by scope, technical depth and duration. There are three models: fixed-scope project (from idea to production), monthly engagement or hourly advisory.",
        featured: true,
      },
      {
        q: "How does a project start?",
        a: "With a no-commitment introductory conversation to understand the problem and the available data. It leads to a proposal with scope, engagement model and plan.",
        featured: true,
      },
      {
        q: "What makes N-AI different?",
        a: "Every project is led directly by the founder, Nancy Rodríguez. She combines the quantitative method of an economist and statistician with hands-on expertise in data science, machine learning and data architecture.",
        featured: true,
      },
      {
        q: "What services does N-AI offer?",
        a: "Artificial intelligence and machine learning, intelligent automation, advanced analytics and BI, and data architecture and governance.",
        featured: false,
      },
      {
        q: "Who does AI consulting in Costa Rica?",
        a: "N-AI (n-ai.dev), founded by Nancy Rodríguez, provides AI, automation, advanced analytics and data architecture consulting for companies and institutions across Costa Rica and Latin America.",
        featured: false,
      },
      {
        q: "Who does public procurement intelligence in Costa Rica?",
        a: "N-AI built the intelligence architecture for SICOP at Costa Rica's Comptroller General (Contraloría General de la República): anomaly detection across 47 patterns, risk scoring across 8 institutional dimensions and preventive monitoring.",
        featured: false,
      },
    ],
  },

  contact: {
    eyebrow: "Book a diagnostic",
    title: "Have a data problem worth solving?",
    body:
      "An introductory conversation identifies where AI, automation or advanced analytics can create impact in your organization.",
    primaryCta: "Message on WhatsApp",
    secondaryCta: "Send an email",
    nextLabel: "What happens next",
    steps: [
      { title: "You write", body: "On WhatsApp (fastest reply) or by email (proposals and documents)." },
      { title: "Nancy replies", body: "To schedule the introductory conversation." },
      { title: "Introductory conversation", body: "No commitment: the problem, the data and the next step." },
    ],
    whatsappMessage:
      "Hi Nancy, I'm writing from n-ai.dev. I'd like to book a diagnostic for a data / AI project.",
    mailtoSubject: "Diagnostic with N-AI",
    mailtoBody:
      "Hi Nancy,\n\nI'd like to book a diagnostic for a data or AI project.\n\nContext:\n• Organization:\n• Goal:\n• Timeline:\n\nThanks,\n",
  },
```

- [ ] **Paso 5: reemplazar `src/components/sections/FAQ.tsx`**

```tsx
"use client";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n";

export default function FAQ() {
  const t = useT();
  const featured = t.faq.items.filter((item) => item.featured);
  const more = t.faq.items.filter((item) => !item.featured);

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-eyebrow">{t.faq.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display-l mt-3.5 text-ink">{t.faq.title}</h2>
          </Reveal>
        </div>

        <div>
          <div className="grid gap-3.5">
            {featured.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.06}>
                <div className="rounded-[18px] border border-line bg-surface px-6 py-5">
                  <h3 className="font-display text-[19px] font-bold leading-snug text-ink">{item.q}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-2">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-7">
              <p className="mb-2 text-sm text-ink-muted">{t.faq.moreLabel}</p>
              {more.map((item) => (
                <details key={item.q} className="group border-b border-line first-of-type:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[18px] text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden className="text-2xl font-normal leading-none text-accent group-open:hidden">
                      +
                    </span>
                    <span aria-hidden className="hidden text-2xl font-normal leading-none text-accent group-open:inline">
                      –
                    </span>
                  </summary>
                  <p className="pb-5 text-base leading-relaxed text-ink-2">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Paso 6: reemplazar `src/components/sections/Contact.tsx`**

```tsx
"use client";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useT } from "@/lib/i18n";

export default function Contact() {
  const t = useT();
  const c = t.contact;
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(c.mailtoSubject)}&body=${encodeURIComponent(c.mailtoBody)}`;
  const whatsapp = `${site.contact.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-6 md:py-10">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-band border border-line bg-navy-cta bg-[radial-gradient(60%_90%_at_15%_0%,rgba(47,98,200,0.55),transparent_70%),radial-gradient(50%_80%_at_95%_100%,rgba(53,224,255,0.18),transparent_70%)] p-7 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">
            <div>
              <p className="text-eyebrow text-ink-soft">{c.eyebrow}</p>
              <h2 id="contact-title" className="text-display-l mt-3.5 text-ink">
                {c.title}
              </h2>
              <p className="text-body mt-4">{c.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={whatsapp} target="_blank" rel="noreferrer" variant="primary" withArrow>
                  {c.primaryCta}
                </LinkButton>
                <LinkButton href={mailto} variant="ghost">
                  {c.secondaryCta}
                </LinkButton>
              </div>
              <p className="mt-5 text-[15px] text-ink-2">
                <span className="tabular-nums">{site.contact.whatsappDisplay}</span> · {site.contact.email}
              </p>
            </div>
            <ol aria-label={c.nextLabel} className="grid gap-2.5">
              {c.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[40px_1fr] gap-1 rounded-2xl border border-line bg-white/5 px-[18px] py-4"
                >
                  <span
                    aria-hidden
                    className="grid h-7 w-7 place-items-center rounded-full border border-accent font-display text-[13px] font-bold text-accent"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <b className="font-semibold text-ink">{step.title}</b>
                    <span className="block text-sm text-ink-2">{step.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Paso 7: actualizar `src/components/seo/StructuredData.tsx`**

1. En el objeto `organization`, reemplazar `description` por:

```ts
    description:
      "Consultoría experta en inteligencia artificial, automatización y analítica avanzada para empresas e instituciones en Costa Rica y Latinoamérica.",
```

2. En `organization.knowsAbout`, agregar al inicio `"Intelligent Automation", "Automatización inteligente", "Advanced Analytics", "Forecasting",`.

3. Reemplazar el bloque que empieza en `const flatCapabilities = es.verticals.flatMap(` y termina en el cierre de `const services = ...;` por:

```ts
  // Un Service por cada línea de servicio visible en la portada.
  const services = es.services.items.map((item, idx) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service-${idx}`,
    serviceType: item.title,
    name: item.title,
    description: `${item.description} ${item.tags.join(" · ")}.`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "Place", name: "Latin America" },
    ],
  }));
```

4. En el comentario inicial del archivo, cambiar `Service[] (one per capability — 8 services)` por `Service[] (one per service line — 4 services)`.

El `faqPage` no se toca: ya se construye con `es.faq.items` y `en.faq.items`, que ahora tienen exactamente las 6 preguntas visibles.

- [ ] **Paso 8: pruebas y compilación**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test ; pnpm lint && pnpm build`
Esperado: las pruebas de FAQ y contacto pasan; lint y build sin errores. Si `pnpm build` falla por `t.faq.body` o `t.contact.headlineStart` en otro archivo, `grep -rn "t\.faq\.body\|t\.contact\.headline" src` debe quedar vacío.

- [ ] **Paso 9: verificar el JSON-LD**

Run: `pnpm start -p 3100` (en segundo plano) y luego:

```bash
curl -s http://localhost:3100/ | python3 -c '
import sys,re,json
blocks=[json.loads(b) for b in re.findall(r"<script type=\"application/ld\+json\">(.*?)</script>", sys.stdin.read())]
print("Service:", sum(1 for b in blocks if b.get("@type")=="Service"))
faq=[b for b in blocks if b.get("@type")=="FAQPage"][0]
print("Preguntas FAQPage:", len(faq["mainEntity"]))'
```

Esperado: `Service: 4` y `Preguntas FAQPage: 12` (6 en español y 6 en inglés). Detener el servidor.

- [ ] **Paso 10: commit y push**

```bash
cd ~/WebSite_personal
git add src/components/sections/FAQ.tsx src/components/sections/Contact.tsx src/components/seo/StructuredData.tsx src/content/i18n/es.ts src/content/i18n/en.ts tests/i18n.test.mts
git commit -m "FAQ compacta de 6 preguntas, contacto con diagnostico y JSON-LD actualizado

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 10: Página `/casos/sicop` y `/en/cases/sicop`

**Archivos:**
- Crear: `src/app/_shell/CaseSicop.tsx`
- Crear: `src/app/(es)/casos/sicop/page.tsx`, `src/app/(en)/en/cases/sicop/page.tsx`
- Modificar: `src/content/i18n/es.ts`, `src/content/i18n/en.ts` (nuevo bloque `caseSicop`, después de `leadership`)
- Modificar: `tests/i18n.test.mts`

**Interfaces:**
- Consume:
  - de `@/content/data/sicop`: `institutions`, `riskDimensions`, `compositeScore`, `tierCounts`, `caseFacts` (Tarea 1);
  - `BarList` (Tarea 4);
  - `t.dashboard.dimensions` y `t.dashboard.tiers` (Tarea 4);
  - `homeAnchor` y `CASE_SICOP_PATH` (Tarea 3);
  - `Container`, `Reveal` y `LinkButton` (Tarea 2).
- Produce:
  - i18n `t.caseSicop` (ver Paso 3);
  - `<CaseSicop />`;
  - dos rutas con `metadata` propia y JSON-LD `Article`.

- [ ] **Paso 1: prueba que falla**

Agregar al final de `tests/i18n.test.mts`:

```ts
test("la página del caso tiene 7 fuentes, 7 etapas y 3 impactos", () => {
  for (const dict of [es, en]) {
    assert.equal(dict.caseSicop.sources.length, caseFacts.sources);
    assert.equal(dict.caseSicop.pipeline.length, 7);
    assert.equal(dict.caseSicop.impact.length, 3);
    assert.deepEqual(
      Object.keys(dict.caseSicop.sections),
      ["summary", "challenge", "architecture", "ai", "institutions", "impact"],
    );
  }
});
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL con `Cannot read properties of undefined (reading 'sources')`.

- [ ] **Paso 3: textos en español**

En `src/content/i18n/es.ts`, insertar después del bloque `leadership`:

```ts
  caseSicop: {
    metaTitle: "Caso SICOP: inteligencia de compras públicas",
    metaDescription:
      "Cómo N-AI construyó detección de anomalías sobre 47 patrones y scoring de riesgo en 8 dimensiones para la supervisión de compras públicas en Costa Rica.",
    back: "Volver al inicio",
    eyebrow: "Caso de estudio",
    title: "Inteligencia de compras públicas para la Contraloría General de la República",
    lead:
      "Arquitectura de datos e inteligencia artificial para pasar de una supervisión reactiva a una preventiva sobre SICOP.",
    railTitle: "En esta página",
    sections: {
      summary: "Resumen",
      challenge: "El reto",
      architecture: "Fuentes y arquitectura",
      ai: "Capa de IA",
      institutions: "Instituciones",
      impact: "Impacto",
    },
    contextLabel: "Contexto",
    context:
      "La supervisión de las compras públicas era reactiva: las irregularidades aparecían después del daño, con datos repartidos en fuentes y taxonomías distintas.",
    resultLabel: "Resultado",
    result:
      "El riesgo se vuelve visible antes de convertirse en un caso legal: los auditores actúan sobre señales, no sobre hallazgos.",
    challengeTitle: "Por qué la supervisión llegaba tarde",
    challengePoints: [
      "Datos repartidos en fuentes y formatos distintos",
      "Clasificaciones que cambian entre instituciones",
      "Irregularidades que se detectaban después del daño",
      "Patrones de riesgo sistémico que nadie modelaba",
    ],
    architectureTitle: "Siete fuentes, siete etapas",
    sourcesLabel: "Fuentes",
    sources: [
      "Solicitudes",
      "Adjudicaciones",
      "Contratos",
      "Adendas",
      "Registro de proveedores",
      "Sanciones",
      "Datos de las instituciones",
    ],
    pipelineLabel: "Etapas del pipeline",
    pipeline: [
      { title: "Extracción", body: "Trae los registros de cada fuente de SICOP de forma continua." },
      { title: "Inventario", body: "Documenta cada campo y cada relación entre fuentes." },
      { title: "Unificación", body: "Reúne los distintos formatos en un solo modelo de datos." },
      { title: "Validación", body: "Revisa tipos, consistencia y trazabilidad antes de usar los datos." },
      { title: "Detección de anomalías", body: "Evalúa 47 patrones sobre señales de tiempo, estructura y comportamiento." },
      { title: "Scoring de riesgo", body: "Combina 8 dimensiones en un puntaje auditable por institución." },
      { title: "Monitoreo preventivo", body: "Muestra eventos, tendencias y comparaciones entre pares a quien decide." },
    ],
    aiTitle: "47 patrones y 8 dimensiones de riesgo",
    aiBody:
      "Las reglas detectan lo evidente y los modelos, lo sutil: velocidad inusual de adjudicación, concentración de proveedores, precios fuera de rango y secuencias de adendas que suelen anteceder irregularidades. Cada institución recibe un puntaje que se descompone en 8 dimensiones.",
    compositeLabel: "Compuesto",
    institutionsTitle: "12 instituciones, anonimizadas",
    institutionsBody: "Puntaje de riesgo de cada institución, en escala de 0 a 100.",
    impactTitle: "Qué cambia para quien decide",
    impact: [
      {
        title: "Supervisión preventiva",
        body: "El riesgo se ve antes de convertirse en un caso legal: se actúa sobre señales, no sobre hallazgos.",
      },
      {
        title: "Decisiones más rápidas",
        body: "Quien decide ve el riesgo en la primera pantalla y llega a una decisión defendible en minutos, no semanas.",
      },
      {
        title: "Transparencia verificable",
        body: "Cada puntaje se rastrea hasta sus componentes, y cada componente hasta un registro.",
      },
    ],
    dataNote: "Resultados del proyecto con instituciones anonimizadas.",
    ctaTitle: "¿Tu organización enfrenta un reto parecido?",
    ctaBody: "En una conversación inicial se identifica cómo aplicar este enfoque a tus datos.",
    ctaButton: "Agendar un diagnóstico",
  },

```

- [ ] **Paso 4: textos en inglés**

En `src/content/i18n/en.ts`, insertar después del bloque `leadership`:

```ts
  caseSicop: {
    metaTitle: "SICOP case: public procurement intelligence",
    metaDescription:
      "How N-AI built anomaly detection across 47 patterns and risk scoring across 8 dimensions for public procurement oversight in Costa Rica.",
    back: "Back to home",
    eyebrow: "Case study",
    title: "Public procurement intelligence for Costa Rica's Comptroller General",
    lead:
      "Data architecture and artificial intelligence to move SICOP oversight from reactive to preventive.",
    railTitle: "On this page",
    sections: {
      summary: "Summary",
      challenge: "The challenge",
      architecture: "Sources and architecture",
      ai: "AI layer",
      institutions: "Institutions",
      impact: "Impact",
    },
    contextLabel: "Context",
    context:
      "Public procurement oversight was reactive: irregularities surfaced after the damage was done, with data spread across different sources and taxonomies.",
    resultLabel: "Outcome",
    result:
      "Risk becomes visible before it turns into a legal case: auditors act on signals, not on findings.",
    challengeTitle: "Why oversight arrived too late",
    challengePoints: [
      "Data spread across different sources and formats",
      "Classifications that change between institutions",
      "Irregularities detected after the damage was done",
      "Systemic risk patterns nobody modeled",
    ],
    architectureTitle: "Seven sources, seven stages",
    sourcesLabel: "Sources",
    sources: [
      "Solicitations",
      "Awards",
      "Contracts",
      "Addenda",
      "Supplier registry",
      "Sanctions",
      "Institutional data",
    ],
    pipelineLabel: "Pipeline stages",
    pipeline: [
      { title: "Extraction", body: "Continuously pulls records from every SICOP source." },
      { title: "Inventory", body: "Documents every field and every relationship between sources." },
      { title: "Unification", body: "Brings the different formats together into a single data model." },
      { title: "Validation", body: "Checks types, consistency and traceability before the data is used." },
      { title: "Anomaly detection", body: "Evaluates 47 patterns across time, structure and behavior signals." },
      { title: "Risk scoring", body: "Combines 8 dimensions into an auditable score per institution." },
      { title: "Preventive monitoring", body: "Shows events, trends and peer comparisons to decision makers." },
    ],
    aiTitle: "47 patterns and 8 risk dimensions",
    aiBody:
      "Rules catch the obvious and models catch the subtle: unusual award velocity, supplier concentration, out-of-range prices and addendum sequences that often precede irregularities. Each institution gets a score that breaks down into 8 dimensions.",
    compositeLabel: "Composite",
    institutionsTitle: "12 institutions, anonymized",
    institutionsBody: "Risk score for each institution, on a 0 to 100 scale.",
    impactTitle: "What changes for decision makers",
    impact: [
      {
        title: "Preventive oversight",
        body: "Risk is visible before it turns into a legal case: action is taken on signals, not findings.",
      },
      {
        title: "Faster decisions",
        body: "Decision makers see risk on the first screen and reach a defensible decision in minutes, not weeks.",
      },
      {
        title: "Verifiable transparency",
        body: "Every score traces back to its components, and every component to a record.",
      },
    ],
    dataNote: "Project results with anonymized institutions.",
    ctaTitle: "Facing a similar challenge?",
    ctaBody: "An introductory conversation identifies how to apply this approach to your data.",
    ctaButton: "Book a diagnostic",
  },

```

- [ ] **Paso 5: crear `src/app/_shell/CaseSicop.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import BarList from "@/components/charts/BarList";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { homeAnchor } from "@/lib/routes";
import {
  caseFacts,
  compositeScore,
  institutions,
  riskDimensions,
  tierCounts,
  type RiskTier,
} from "@/content/data/sicop";

const TIER_STYLE: Record<RiskTier, string> = {
  low: "border-accent-cyan/30 text-accent-cyan",
  medium: "border-accent/30 text-accent",
  high: "border-warn/35 text-warn",
  critical: "border-alert/40 text-alert",
};

type SectionId = "summary" | "challenge" | "architecture" | "ai" | "institutions" | "impact";
const SECTION_IDS: SectionId[] = ["summary", "challenge", "architecture", "ai", "institutions", "impact"];

export default function CaseSicop() {
  const { lang, t } = useLanguage();
  const c = t.caseSicop;
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState<SectionId>("summary");
  const counts = tierCounts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id.replace(/^cs-/, "") as SectionId);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(`cs-${id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="relative overflow-hidden bg-[radial-gradient(1000px_560px_at_80%_0%,#1A2C5E_0%,transparent_70%)]">
        <Container className="py-14 md:py-20">
          <a
            href={homeAnchor(lang, "#caso-sicop")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-cyan"
          >
            <span aria-hidden className="transition-transform duration-200 ease-out group-hover:-translate-x-[3px]">
              ←
            </span>
            {c.back}
          </a>
          <p className="text-eyebrow mt-8">{c.eyebrow}</p>
          <h1 className="text-display-xl mt-4 max-w-[22ch] text-ink">{c.title}</h1>
          <p className="text-body mt-5 max-w-[60ch]">{c.lead}</p>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: `>${caseFacts.recordsMillions}M`, label: t.dashboard.kpiRecords },
              { value: String(caseFacts.anomalyPatterns), label: t.dashboard.kpiPatterns },
              { value: String(caseFacts.riskDimensions), label: c.sections.ai },
              { value: `<${caseFacts.scoringSeconds} s`, label: t.caseBand.facts[3].label },
            ].map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse justify-end rounded-[18px] border border-line bg-surface p-5">
                <dt className="mt-2 text-sm text-ink-2">{fact.label}</dt>
                <dd className="bg-fact-text bg-clip-text font-display text-[clamp(36px,4vw,48px)] font-extrabold leading-none tabular-nums text-transparent">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <Container className="grid gap-12 pb-10 md:grid-cols-[200px_1fr] md:gap-16">
        <aside className="hidden md:block">
          <nav aria-label={c.railTitle} className="sticky top-28">
            <p className="text-eyebrow mb-4">{c.railTitle}</p>
            <ol className="space-y-3 text-sm">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#cs-${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className={cn(
                      "flex items-center gap-3 transition-colors duration-150",
                      active === id ? "text-ink" : "text-ink-muted hover:text-ink-2",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn("block h-px bg-current transition-[width] duration-200", active === id ? "w-8" : "w-4")}
                    />
                    {c.sections[id]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="space-y-20 md:space-y-28">
          <section id="cs-summary" aria-labelledby="cs-summary-title">
            <h2 id="cs-summary-title" className="text-eyebrow">{c.sections.summary}</h2>
            <Reveal>
              <div className="mt-6 grid gap-3.5 lg:grid-cols-2">
                <div className="rounded-card border border-line bg-surface p-6">
                  <p className="text-[13px] text-ink-muted">{c.contextLabel}</p>
                  <p className="mt-2 text-lg leading-relaxed text-ink">{c.context}</p>
                </div>
                <div className="rounded-card border border-line bg-surface p-6">
                  <p className="text-[13px] text-ink-muted">{c.resultLabel}</p>
                  <p className="mt-2 text-lg leading-relaxed text-ink">{c.result}</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="cs-challenge" aria-labelledby="cs-challenge-title">
            <p className="text-eyebrow">{c.sections.challenge}</p>
            <h2 id="cs-challenge-title" className="text-h2 mt-3 text-ink">{c.challengeTitle}</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {c.challengePoints.map((point) => (
                <li key={point} className="flex gap-3 rounded-[14px] border border-line bg-surface p-4 text-[15px] text-ink-2">
                  <span aria-hidden className="mt-[7px] h-2 w-2 flex-none rounded-full bg-alert" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section id="cs-architecture" aria-labelledby="cs-architecture-title">
            <p className="text-eyebrow">{c.sections.architecture}</p>
            <h2 id="cs-architecture-title" className="text-h2 mt-3 text-ink">{c.architectureTitle}</h2>
            <div className="mt-6 grid gap-3.5 lg:grid-cols-[1fr_2fr]">
              <div className="rounded-card border border-line bg-surface p-6">
                <h3 className="text-[13px] font-semibold text-ink-muted">{c.sourcesLabel}</h3>
                <ul className="mt-3 space-y-2">
                  {c.sources.map((source) => (
                    <li key={source} className="rounded-[10px] border border-line px-3 py-2 text-sm text-ink-2">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card border border-line bg-surface p-6">
                <h3 className="text-[13px] font-semibold text-ink-muted">{c.pipelineLabel}</h3>
                <ol className="mt-3 space-y-3">
                  {c.pipeline.map((stage, i) => (
                    <li key={stage.title} className="grid grid-cols-[36px_1fr] gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-accent font-display text-[13px] font-bold tabular-nums text-accent">
                        {i + 1}
                      </span>
                      <div>
                        <b className="font-semibold text-ink">{stage.title}</b>
                        <p className="text-sm text-ink-2">{stage.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section id="cs-ai" aria-labelledby="cs-ai-title">
            <p className="text-eyebrow">{c.sections.ai}</p>
            <h2 id="cs-ai-title" className="text-h2 mt-3 text-ink">{c.aiTitle}</h2>
            <p className="text-body mt-4 max-w-[64ch]">{c.aiBody}</p>
            <div className="mt-6 rounded-card border border-line bg-surface p-6">
              <p className="flex items-baseline justify-between text-sm text-ink-2">
                {t.dashboard.gaugeTitle}
                <span>
                  {c.compositeLabel}{" "}
                  <b className="font-display text-2xl font-extrabold tabular-nums text-ink">{compositeScore()}</b>
                  /100
                </span>
              </p>
              <BarList
                className="mt-4"
                animate
                reduce={reduce}
                barWidth="minmax(0,2fr)"
                items={riskDimensions.map((dim) => ({ label: t.dashboard.dimensions[dim.key], value: dim.score }))}
              />
            </div>
          </section>

          <section id="cs-institutions" aria-labelledby="cs-institutions-title">
            <p className="text-eyebrow">{c.sections.institutions}</p>
            <h2 id="cs-institutions-title" className="text-h2 mt-3 text-ink">{c.institutionsTitle}</h2>
            <p className="text-body mt-4">{c.institutionsBody}</p>
            <p className="mt-2 text-sm text-ink-muted">
              {(Object.keys(counts) as RiskTier[]).map((tier) => `${t.dashboard.tiers[tier]} · ${counts[tier]}`).join("  ·  ")}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {institutions.map((inst) => (
                <li key={inst.id} className={cn("rounded-[14px] border bg-surface p-4", TIER_STYLE[inst.tier])}>
                  <span className="text-xs font-semibold">{t.dashboard.tiers[inst.tier]}</span>
                  <p className="mt-1.5 text-[15px] text-ink">
                    {t.dashboard.institution} {inst.id}
                  </p>
                  <p className="mt-2 font-display text-4xl font-extrabold tabular-nums text-ink">{inst.score}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-muted">{c.dataNote}</p>
          </section>

          <section id="cs-impact" aria-labelledby="cs-impact-title">
            <p className="text-eyebrow">{c.sections.impact}</p>
            <h2 id="cs-impact-title" className="text-h2 mt-3 text-ink">{c.impactTitle}</h2>
            <div className="mt-6 grid gap-3.5 md:grid-cols-3">
              {c.impact.map((item) => (
                <div key={item.title} className="rounded-card border border-line bg-surface p-6">
                  <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="cs-cta-title" className="rounded-band border border-line bg-navy-band bg-[radial-gradient(70%_100%_at_85%_0%,#233E85_0%,transparent_70%)] p-7 md:p-12">
            <h2 id="cs-cta-title" className="text-display-l text-ink">{c.ctaTitle}</h2>
            <p className="text-body mt-4 max-w-[56ch]">{c.ctaBody}</p>
            <div className="mt-7">
              <LinkButton href={homeAnchor(lang, "#contact")} variant="primary" withArrow>
                {c.ctaButton}
              </LinkButton>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
```

- [ ] **Paso 6: crear `src/app/(es)/casos/sicop/page.tsx`**

```tsx
import type { Metadata } from "next";
import CaseSicop from "../../../_shell/CaseSicop";
import { SITE_URL } from "../../../_shell/RootShell";
import { es } from "@/content/i18n/es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: es.caseSicop.metaTitle,
  description: es.caseSicop.metaDescription,
  alternates: {
    canonical: "/casos/sicop",
    languages: { "es-CR": "/casos/sicop", "en-US": "/en/cases/sicop", "x-default": "/casos/sicop" },
  },
  openGraph: {
    type: "article",
    locale: "es_CR",
    url: "/casos/sicop",
    title: es.caseSicop.metaTitle,
    description: es.caseSicop.metaDescription,
  },
};

export default function CaseSicopPage() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: es.caseSicop.title,
    description: es.caseSicop.metaDescription,
    inLanguage: "es-CR",
    url: `${SITE_URL}/casos/sicop`,
    author: { "@id": `${SITE_URL}/#nancy` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <CaseSicop />
    </>
  );
}
```

- [ ] **Paso 7: crear `src/app/(en)/en/cases/sicop/page.tsx`**

```tsx
import type { Metadata } from "next";
import CaseSicop from "../../../../_shell/CaseSicop";
import { SITE_URL } from "../../../../_shell/RootShell";
import { en } from "@/content/i18n/en";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: en.caseSicop.metaTitle,
  description: en.caseSicop.metaDescription,
  alternates: {
    canonical: "/en/cases/sicop",
    languages: { "es-CR": "/casos/sicop", "en-US": "/en/cases/sicop", "x-default": "/casos/sicop" },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/en/cases/sicop",
    title: en.caseSicop.metaTitle,
    description: en.caseSicop.metaDescription,
  },
};

export default function CaseSicopPageEn() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: en.caseSicop.title,
    description: en.caseSicop.metaDescription,
    inLanguage: "en-US",
    url: `${SITE_URL}/en/cases/sicop`,
    author: { "@id": `${SITE_URL}/#nancy` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <CaseSicop />
    </>
  );
}
```

- [ ] **Paso 8: pruebas, compilación y revisión**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test ; pnpm lint && pnpm build`
Esperado:
- la prueba del caso pasa;
- el build lista `○ /casos/sicop` y `○ /en/cases/sicop`.

Luego, con `pnpm start -p 3100`:
- `/casos/sicop` y `/en/cases/sicop` cargan;
- "EN" y "ES" del menú cambian entre ambas páginas;
- el índice lateral marca la sección visible;
- "Volver al inicio" lleva a `/#caso-sicop`;
- la banda de la portada ahora abre la página.

- [ ] **Paso 9: commit y push**

```bash
cd ~/WebSite_personal
git add src/app/_shell/CaseSicop.tsx "src/app/(es)/casos/sicop/page.tsx" "src/app/(en)/en/cases/sicop/page.tsx" src/content/i18n/es.ts src/content/i18n/en.ts tests/i18n.test.mts
git commit -m "Pagina propia del caso SICOP en espanol e ingles, con datos reales

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 11: Composición final de la portada, limpieza y pruebas de guardia

**Archivos:**
- Reemplazar: `src/app/_shell/HomeSections.tsx`
- Crear: `tests/source-guards.test.mts`
- Eliminar (tras verificar que nadie los importa):
  - secciones: `src/components/sections/{About,CaseStudyHero,CaseStudyDeepDive,IntelligencePipeline,Capabilities,BuildingInPublic}.tsx`;
  - fondos: `src/components/backgrounds/*`;
  - gráficos: `src/components/charts/{AnomalyChart,RiskScoreGauge,PipelineDiagram}.tsx`;
  - contenido: `src/content/{caseStudy.sicop,capabilities}.ts`;
  - UI: `src/components/ui/{GlassCard,KpiCard,Eyebrow,GradientText,Logo,LogoMark3D}.tsx`;
  - movimiento: `src/components/motion/{MagneticHover,StaggerChildren}.tsx`.
- Modificar:
  - `src/content/i18n/es.ts` y `en.ts` (quitar bloques sin uso);
  - `tailwind.config.ts`, `src/styles/tokens.css`, `src/app/globals.css` (quitar alias heredados);
  - `next.config.mjs`, `package.json`, `pnpm-lock.yaml` (quitar `recharts`).

**Interfaces:**
- Consume: todas las secciones de las Tareas 4 a 9.
- Produce: la portada final (8 secciones) y pruebas que impiden volver a introducir datos aleatorios, texto <12 px, `transition-all`, clases del tema anterior, el correo del dominio o textos de "equipo".

- [ ] **Paso 1: escribir las pruebas de guardia (fallan hoy)**

Crear `tests/source-guards.test.mts`:

```ts
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
```

- [ ] **Paso 2: correr y verificar que falla**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL en varias guardias:
- `mulberry32` en `AnomalyChart.tsx`;
- `text-[10px]` y `text-[11px]` en componentes viejos;
- clases `bg-bg-*`;
- el correo en `llms.txt`;
- `#case-study` en `llms.txt` (se corrige en la Tarea 12, así que esa prueba seguirá fallando hasta entonces).

- [ ] **Paso 3: reemplazar `src/app/_shell/HomeSections.tsx`**

```tsx
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CaseBand from "@/components/sections/CaseBand";
import DemoShowcase from "@/components/sections/DemoShowcase";
import Method from "@/components/sections/Method";
import Leadership from "@/components/sections/Leadership";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

/**
 * Portada del estilo C (maqueta v3), compartida por los dos idiomas.
 * Cada componente resuelve sus textos con `useT()` según el layout raíz.
 */
export default function HomeSections() {
  return (
    <>
      <Hero />
      <Services />
      <CaseBand />
      <DemoShowcase />
      <Method />
      <Leadership />
      <FAQ />
      <Contact />
    </>
  );
}
```

- [ ] **Paso 4: eliminar los archivos sin uso, verificando antes**

```bash
cd ~/WebSite_personal
for f in \
  src/components/sections/About.tsx src/components/sections/CaseStudyHero.tsx \
  src/components/sections/CaseStudyDeepDive.tsx src/components/sections/IntelligencePipeline.tsx \
  src/components/sections/Capabilities.tsx src/components/sections/BuildingInPublic.tsx \
  src/components/backgrounds/NetworkBand.tsx src/components/backgrounds/ParticleNetwork.tsx \
  src/components/backgrounds/AuroraGradient.tsx src/components/backgrounds/GridGlow.tsx \
  src/components/charts/AnomalyChart.tsx src/components/charts/RiskScoreGauge.tsx \
  src/components/charts/PipelineDiagram.tsx src/content/caseStudy.sicop.ts src/content/capabilities.ts \
  src/components/ui/GlassCard.tsx src/components/ui/KpiCard.tsx src/components/ui/Eyebrow.tsx \
  src/components/ui/GradientText.tsx src/components/ui/Logo.tsx src/components/ui/LogoMark3D.tsx \
  src/components/motion/MagneticHover.tsx src/components/motion/StaggerChildren.tsx; do
  name=$(basename "$f" | sed 's/\.tsx\{0,1\}$//')
  users=$(grep -rlE "/${name}\"|/${name}'" src --include='*.ts' --include='*.tsx' | grep -v "^$f$" || true)
  if [ -n "$users" ]; then echo "NO BORRAR $f, lo usa: $users"; else git rm -q "$f" && echo "borrado $f"; fi
done
ls src/components/backgrounds 2>/dev/null || echo "backgrounds vacío"
```

Esperado: todas las líneas dicen `borrado …`. Si alguna dice `NO BORRAR`, abrir el archivo que lo usa: debe ser un componente viejo que también está en la lista. Borrarlo primero y repetir el bucle.

- [ ] **Paso 5: quitar de i18n los bloques sin uso**

Primero confirmar qué claves de primer nivel ya no se usan:

```bash
cd ~/WebSite_personal
for key in brand sicop pipeline bip about capsule capabilitiesSection verticals metadata themeLabel; do
  n=$(grep -rnE "(t|es|en|dict)\.${key}\b" src --include='*.tsx' --include='*.ts' | grep -v "src/content/i18n/" | wc -l | tr -d ' ')
  echo "$key: $n usos"
done
```

Esperado: `0 usos` en todas. Luego eliminar esos bloques de ambos archivos con este script, que corta desde `  <clave>:` hasta la siguiente clave de primer nivel:

```bash
cd ~/WebSite_personal
python3 - <<'EOF'
import re
KEYS = ["brand", "sicop", "pipeline", "bip", "about", "capsule", "capabilitiesSection", "verticals", "metadata", "themeLabel"]
for path in ["src/content/i18n/es.ts", "src/content/i18n/en.ts"]:
    lines = open(path, encoding="utf-8").read().split("\n")
    out, skipping = [], False
    for line in lines:
        m = re.match(r"^  ([A-Za-z]+):", line)
        if m:
            skipping = m.group(1) in KEYS
        elif re.match(r"^};?\s*$", line) or line.startswith("export type"):
            skipping = False
        if not skipping:
            out.append(line)
    open(path, "w", encoding="utf-8").write("\n".join(out))
    print("limpio", path)
EOF
grep -nE "^  (brand|sicop|pipeline|bip|about|capsule|capabilitiesSection|verticals|metadata|themeLabel):" src/content/i18n/es.ts src/content/i18n/en.ts || echo "sin bloques viejos"
```

Esperado: `sin bloques viejos`. Revisar con `git diff src/content/i18n/es.ts` que no se haya cortado ningún bloque vigente. Los comentarios `//` que quedaron huérfanos sobre bloques borrados se pueden eliminar a mano.

- [ ] **Paso 6: quitar los alias heredados del sistema visual**

En `tailwind.config.ts`, eliminar exactamente estas entradas (todas marcadas con el comentario "Alias heredado(s)"):
- en `colors.accent`: `mint` y `deep`;
- en `colors`: los bloques `bg`, `border`, `text` y las claves `danger`, `"accent-teal"` y `"accent-emerald"`;
- en `transitionTimingFunction`: `smooth`;
- en `boxShadow`: `glow` y `card`;
- en `backgroundImage`: `"grid-faint"`;
- en `animation`: `"marquee-slow"`, `"scroll-pulse"`, `"gradient-shift"` y `"aurora-drift"`;
- en `keyframes`: `marquee`, `scrollPulse`, `gradientShift` y `auroraDrift`;
- los comentarios "Alias heredado(s)".

En `src/styles/tokens.css`, eliminar el bloque que empieza en `/* Alias heredados: se eliminan en la Tarea 11. */` hasta `--ease-smooth` inclusive.

En `src/app/globals.css`, eliminar el comentario `/* Alias heredados… */` y las reglas `.mask-fade-x` y `.mask-radial-soft`.

- [ ] **Paso 7: quitar `recharts`**

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
cd ~/WebSite_personal
grep -rn "recharts" src || echo "recharts sin uso en src"
pnpm remove recharts
```

En `next.config.mjs`, cambiar la línea de `optimizePackageImports` por:

```js
    optimizePackageImports: ["lucide-react", "framer-motion"],
```

- [ ] **Paso 8: pruebas y compilación**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test ; pnpm lint && pnpm build`
Esperado: todas las pruebas pasan, **salvo** `llms.txt apunta a las secciones nuevas` y la parte de `llms.txt` de `el correo del dominio…`, que se corrigen en la Tarea 12. `español e inglés tienen exactamente la misma estructura` debe pasar ahora. Lint y build sin errores, y el build ya no incluye `recharts`.

Si una guardia de clases falla, abrir el archivo que lista y reemplazar la clase vieja por su equivalente:

| Clase vieja | Clase nueva |
|---|---|
| `text-text-primary` | `text-ink` |
| `text-text-secondary` | `text-ink-2` |
| `text-text-muted` | `text-ink-muted` |
| `border-border-subtle` | `border-line` |
| `bg-bg-elevated` | `bg-surface` |
| `ease-smooth` | `ease-out` |

- [ ] **Paso 9: revisar la portada completa**

Run: `pnpm start -p 3100` (en segundo plano). Recorrer `http://localhost:3100` y `http://localhost:3100/en` a 1440 px y 375 px.
Esperado:
- orden Hero → Servicios → Caso SICOP → Demos → Método → Quién lidera → Preguntas clave → Contacto;
- todos los enlaces del menú llegan a su sección;
- sin errores en la consola;
- en la consola del navegador a 375×812, `document.documentElement.scrollHeight` da ≤ 9000.

Si pasa de 9.000, reducir en móvil el padding de `Section` (`py-16 md:py-28`) y los `mt-12` de las cuadrículas a `mt-8 md:mt-12`, y volver a medir. Detener el servidor.

- [ ] **Paso 10: commit y push**

```bash
cd ~/WebSite_personal
git add -A src tests tailwind.config.ts next.config.mjs package.json pnpm-lock.yaml
git commit -m "Portada final de 8 secciones, limpieza del tema anterior y pruebas de guardia

Elimina las secciones, fondos y graficos viejos (incluida la serie
aleatoria), los alias de tokens y recharts.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 12: SEO, imagen para redes, llms.txt y documentación

**Archivos:**
- Modificar: `src/app/(es)/layout.tsx`, `src/app/(en)/layout.tsx` (description, openGraph, twitter, keywords)
- Reemplazar: `src/app/sitemap.ts`, `src/app/opengraph-image.tsx`
- Modificar: `public/llms.txt`, `HANDOFF.md`
- Modificar: `docs/superpowers/specs/2026-09-14-rediseno-consultora-design.md` (ajustes surgidos durante el plan)

**Interfaces:**
- Consume: `CASE_SICOP_PATH` (Tarea 3); rutas de la Tarea 10.
- Produce: sitemap con 4 URL, imagen OG del estilo C y `llms.txt` actualizado (hace pasar las guardias pendientes de la Tarea 11).

- [ ] **Paso 1: correr las guardias y ver cuáles faltan**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test`
Esperado: FAIL solo en `llms.txt apunta a las secciones nuevas` y `el correo del dominio no aparece en el sitio`.

- [ ] **Paso 2: metadata de los layouts**

En `src/app/(es)/layout.tsx`, reemplazar las **tres** apariciones del texto de description (`description:`, `openGraph.description`, `twitter.description`) por:

```ts
"Consultoría experta en IA, automatización y analítica avanzada en Costa Rica y Latinoamérica. Caso SICOP, motores de decisión y reportes automatizados."
```

En la lista `keywords`, reemplazar `"segmentacion RFM consumo masivo"` por `"consultoria automatizacion Costa Rica"` y `"inteligencia de consumidor LATAM"` por `"analitica avanzada Costa Rica"`.

En `src/app/(en)/layout.tsx`, reemplazar las tres apariciones de la description por:

```ts
"Expert AI, automation and advanced analytics consulting in Costa Rica and Latin America. SICOP case, decision engines and automated reporting."
```

Aplicar el mismo cambio de `keywords`.

- [ ] **Paso 3: reemplazar `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-ai.dev";

/** Portada y caso SICOP, cada uno con su versión en el otro idioma. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const home = {
    languages: {
      "es-CR": `${SITE_URL}/`,
      "en-US": `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/`,
    },
  };
  const caseSicop = {
    languages: {
      "es-CR": `${SITE_URL}/casos/sicop`,
      "en-US": `${SITE_URL}/en/cases/sicop`,
      "x-default": `${SITE_URL}/casos/sicop`,
    },
  };

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1.0, alternates: home },
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: home },
    { url: `${SITE_URL}/casos/sicop`, lastModified, changeFrequency: "yearly", priority: 0.8, alternates: caseSicop },
    { url: `${SITE_URL}/en/cases/sicop`, lastModified, changeFrequency: "yearly", priority: 0.7, alternates: caseSicop },
  ];
}
```

- [ ] **Paso 4: reemplazar `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "N-AI · Consultoría experta en IA, automatización y analítica avanzada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(180deg, #0A1024 0%, #070B18 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 820,
            height: 620,
            display: "flex",
            background: "radial-gradient(circle, rgba(26,44,94,0.95) 0%, rgba(26,44,94,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#FFFFFF",
              color: "#0A1024",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>N-AI</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 74,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              maxWidth: 1040,
            }}
          >
            <span>Consultoría experta en IA, automatización y&nbsp;</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #8FB4FF, #35E0FF)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
              }}
            >
              analítica avanzada.
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#AEB8CF" }}>
            +400% créditos colocados · &gt;2.4M registros analizados · 47 patrones de anomalía
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#8C98B3" }}>
          <div style={{ display: "flex" }}>n-ai.dev</div>
          <div style={{ display: "flex" }}>Costa Rica y Latinoamérica</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Paso 5: actualizar `public/llms.txt`**

```bash
cd ~/WebSite_personal
python3 - <<'EOF'
p = "public/llms.txt"
s = open(p, encoding="utf-8").read()

def rep(old, new):
    global s
    assert s.count(old) == 1, old[:60]
    s = s.replace(old, new)

rep("> Consultoría de IA, Business Intelligence y arquitectura de datos para empresas en Costa Rica y Latinoamérica. Founder-led por Nancy Rodríguez. Especialidades: inteligencia de compras públicas (SICOP), segmentación RFM, perfiles de consumidor para consumo masivo, detección de anomalías y dashboards ejecutivos.",
    "> Consultoría experta en inteligencia artificial, automatización y analítica avanzada para empresas e instituciones en Costa Rica y Latinoamérica. Founder-led por Nancy Rodríguez. Especialidades: inteligencia de compras públicas (SICOP), automatización de ingesta y reportes, motores de decisión crediticia, segmentación RFM y analítica predictiva.")
rep("- **Email:** nancyrodriguez@n-ai.dev", "- **Email:** nanyrr25@gmail.com")
rep("Email nancyrodriguez@n-ai.dev | ", "Email nanyrr25@gmail.com | ")
rep("## Mercados servidos",
    "### 10. Automatización de ingesta, reportes y pronósticos\nIngesta, limpieza y unificación automática de datos de varias fuentes, con reportes que se actualizan, analizan y proyectan sin trabajo manual. Caso en producción para una empresa regional de consumo masivo.\n\n## Mercados servidos")

start = s.index("- https://n-ai.dev/ — Home")
end = s.index("- https://n-ai.dev/sitemap.xml")
s = s[:start] + """- https://n-ai.dev/ — Portada: servicios, caso destacado, demos, método y contacto
- https://n-ai.dev/#servicios — 4 líneas de servicio: IA y machine learning, automatización inteligente, analítica avanzada y BI, arquitectura y gobierno de datos
- https://n-ai.dev/casos/sicop — Caso SICOP completo (Contraloría General de la República)
- https://n-ai.dev/#demos — Sistemas en producción y en construcción
- https://n-ai.dev/#metodo — Método de 4 fases, del diagnóstico a la operación
- https://n-ai.dev/#quien-lidera — Fundadora: Nancy Rodríguez
- https://n-ai.dev/#faq — Preguntas clave
- https://n-ai.dev/#contact — Contacto y agenda de diagnóstico
- https://n-ai.dev/en — English version
""" + s[end:]
open(p, "w", encoding="utf-8").write(s)
print("llms.txt actualizado")
EOF
```

- [ ] **Paso 6: actualizar `HANDOFF.md`**

```bash
cd ~/WebSite_personal
python3 - <<'EOF'
p = "HANDOFF.md"
s = open(p, encoding="utf-8").read()

def rep(old, new):
    global s
    assert s.count(old) == 1, old[:60]
    s = s.replace(old, new)

rep("- Node 18.20.8 (via nvm)", "- Node 22.23.2 (via nvm; es el `default`)")
rep("- Recharts (lazy-loaded, solo en case study)\n", "")
rep("- **Tu email:** `nancyrodriguez@n-ai.dev`",
    "- **Correo publicado en el sitio:** `nanyrr25@gmail.com`. El reenvío de `nancyrodriguez@n-ai.dev` está configurado en Porkbun, pero no se ha probado.")
rep("- 9 secciones: Hero · About · Case Study · Deep Dive · Pipeline · Demos · Capabilities · Building in Public · FAQ · Contact",
    "- Portada de 8 secciones (estilo C): Hero con tablero en vivo · Servicios · Caso SICOP · Demos · Método · Quién lidera · Preguntas clave · Contacto\n- Página del caso: `/casos/sicop` y `/en/cases/sicop`\n- Datos reales del caso en `src/content/data/sicop.ts`; pruebas con `pnpm test` (Node 22)\n- Diseño y decisiones: `docs/superpowers/specs/2026-09-14-rediseno-consultora-design.md`")
open(p, "w", encoding="utf-8").write(s)
print("HANDOFF actualizado")
EOF
```

- [ ] **Paso 7: registrar en la especificación los ajustes del plan**

Agregar al final de `docs/superpowers/specs/2026-09-14-rediseno-consultora-design.md`:

```markdown

## Ajustes durante el plan de implementación

- **Cápsula de cita:** el bloque `capsule` no se muestra en la página, porque la maqueta v3 aprobada no lo incluye. Su contenido sigue en `public/llms.txt` y en los datos estructurados.
- **Gráficos:** no se crea `LineSeries.tsx`. El gráfico de instituciones vive dentro de `LiveDashboard.tsx`, y `BarList.tsx` se reutiliza en el tablero y en la página del caso.
- **Menú:** el eyebrow de la sección de método es "Método" y no "Cómo trabajamos", para no usar el plural de equipo.
- **Umbrales:** el tablero no dibuja una línea de umbral de riesgo, porque el caso no publica los cortes entre niveles.
```

- [ ] **Paso 8: pruebas y compilación**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test && pnpm lint && pnpm build`
Esperado:
- `# fail 0`: todas las pruebas pasan;
- lint y build sin errores ni aviso de `metadataBase`. Si el aviso persiste, ubicar la ruta con `pnpm build 2>&1 | grep -B3 metadataBase` y agregar `metadataBase: new URL(SITE_URL)` a la `metadata` de esa ruta (importando `SITE_URL` desde `src/app/_shell/RootShell`);
- el build lista `/`, `/en`, `/casos/sicop`, `/en/cases/sicop`, `/opengraph-image`, `/robots.txt` y `/sitemap.xml`.

- [ ] **Paso 9: revisar sitemap e imagen OG**

Run: `pnpm start -p 3100` (en segundo plano), luego:

```bash
curl -s http://localhost:3100/sitemap.xml | grep -c "<url>"
curl -s -o /tmp/og.png -w "%{http_code} %{content_type}\n" http://localhost:3100/opengraph-image
```

Esperado: `4` y `200 image/png`. Abrir `/tmp/og.png`: fondo azul noche y titular con el acento en degradado. Detener el servidor.

- [ ] **Paso 10: commit y push**

```bash
cd ~/WebSite_personal
git add "src/app/(es)/layout.tsx" "src/app/(en)/layout.tsx" src/app/sitemap.ts src/app/opengraph-image.tsx public/llms.txt HANDOFF.md docs/superpowers/specs/2026-09-14-rediseno-consultora-design.md
git commit -m "SEO del rediseno: metadata, sitemap con el caso, imagen OG, llms.txt y HANDOFF

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

---

### Tarea 13: Verificación final y PR (sin merge)

**Archivos:**
- Crear: `docs/superpowers/reviews/2026-09-14-verificacion-rediseno.md`
- Crear: `docs/superpowers/reviews/assets/detect-final-{es,en,caso-es,caso-en}.json`, `lighthouse-despues.json`

**Interfaces:**
- Consume: todo lo anterior.
- Produce: evidencia de los 4 criterios de éxito y un PR abierto hacia `main`, **sin merge**.

- [ ] **Paso 1: suite completa**

Run: `export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH" && cd ~/WebSite_personal && pnpm test && pnpm lint && pnpm build`
Esperado: `# fail 0`, lint limpio, build limpio.

- [ ] **Paso 2: detector de impeccable sobre el sitio construido (criterio 2)**

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
cd ~/WebSite_personal
pnpm start -p 3100 > /tmp/n-ai-start.log 2>&1 &
sleep 6
D=/Users/nancyrodriguez/.claude/skills/impeccable/scripts/impeccable
A=docs/superpowers/reviews/assets
$D detect --json http://localhost:3100/ > $A/detect-final-es.json
$D detect --json http://localhost:3100/en > $A/detect-final-en.json
$D detect --json http://localhost:3100/casos/sicop > $A/detect-final-caso-es.json
$D detect --json http://localhost:3100/en/cases/sicop > $A/detect-final-caso-en.json
python3 - <<'EOF'
import json, collections
BLOQUEANTES = {"undersized-ui-text", "tiny-text", "low-contrast", "nested-cards", "line-length"}
total = 0
for name in ["es", "en", "caso-es", "caso-en"]:
    items = json.load(open(f"docs/superpowers/reviews/assets/detect-final-{name}.json"))
    counts = collections.Counter(i["antipattern"] for i in items)
    bad = {k: v for k, v in counts.items() if k in BLOQUEANTES}
    total += sum(bad.values())
    print(name, "bloqueantes:", bad or 0, "| estéticas del estilo C:", {k: v for k, v in counts.items() if k not in BLOQUEANTES})
print("TOTAL BLOQUEANTES:", total)
EOF
```

Esperado: `TOTAL BLOQUEANTES: 0`. Las reglas estéticas del estilo C (`gradient-text`, `dark-glow`, `pulsing-dot`, `radial-halo`, `codex-grid-background`) pueden aparecer: son intencionales. Si hay bloqueantes, corregir cada uno en su componente (subir tamaño a ≥12 px, aclarar el color o acortar la línea), volver a correr las pruebas y repetir este paso **una sola vez**.

- [ ] **Paso 3: criterios 1 y 4 en el navegador**

Con el servidor aún corriendo, abrir cada URL y ejecutar en la consola:

```js
const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
({ vh: innerHeight, h1: r("h1"), cta: r("#top a[href='#contact']"), cifras: r("#top dl"), alto: document.documentElement.scrollHeight, desborde: document.documentElement.scrollWidth > innerWidth });
```

Esperado en `/` y `/en`:
- **1440×900:** el `bottom` de `cta` y de `cifras` es ≤ 900, y el tablero se ve completo.
- **375×812:** el `bottom` de `cifras` es ≤ 812, `alto` ≤ 9000 y `desborde: false`.

Revisar además:
- **Teclado:** Tab recorre menú, botones, "Pausar" y acordeones con foco visible; Escape cierra el menú móvil.
- **Movimiento reducido** (DevTools → Rendering): sin recorrido ni pulsos, y el botón "Pausar" no aparece.
- **Consola:** sin errores.

- [ ] **Paso 4: contraste de los colores del tablero**

```bash
python3 - <<'EOF'
def L(h):
    r, g, b = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def cr(a, b):
    x, y = sorted([L(a), L(b)], reverse=True)
    return (x + 0.05) / (y + 0.05)
for fg, bg in [("#FF8F99", "#0C1328"), ("#C3CBDD", "#0C1328"), ("#8C98B3", "#0C1328"), ("#8C98B3", "#0F1A3A"), ("#7FF0C8", "#0A1024"), ("#FFC35D", "#0A1024"), ("#B42335", "#FFE3E6")]:
    print(fg, "sobre", bg, f"{cr(fg, bg):.2f}:1", "OK" if cr(fg, bg) >= 4.5 else "FALLA")
EOF
```

Esperado: todas las filas en `OK`. Detener el servidor (`kill %1`).

- [ ] **Paso 5: abrir el PR (sin merge)**

```bash
cd ~/WebSite_personal
git push
GH_TOKEN=$(gh auth token -u nayrr25) gh pr create --repo nayrr25/WebSite_personal --base main --head feat/rediseno-consultora \
  --title "Rediseño de la portada: consultora con tablero en vivo (estilo C)" \
  --body "$(cat <<'BODY'
## Qué cambia

- Portada de 8 secciones en el estilo C aprobado (maqueta v3): hero con tablero en vivo alimentado por los datos reales del caso SICOP, servicios, banda del caso, demos (incluido el caso de automatización), método, quién lidera, preguntas clave y contacto.
- Página nueva del caso: `/casos/sicop` y `/en/cases/sicop`.
- Correo de contacto: `nanyrr25@gmail.com`.
- Se eliminan las secciones viejas, la serie aleatoria del gráfico de anomalías y `recharts`.

## Cómo se verificó

- `pnpm test` (Node 22), `pnpm lint` y `pnpm build` limpios.
- Detector de impeccable sin hallazgos de accesibilidad ni legibilidad (evidencia en `docs/superpowers/reviews/assets/detect-final-*.json`).
- Primer pantallazo a 1440×900 y 375×812 revisado en español e inglés.

## Pendiente antes del merge

- [ ] Revisar la vista previa de Vercel.
- [ ] Comparar Lighthouse móvil con la medición previa (`lighthouse-antes.json`).
- [ ] Aprobación de Nancy. **Hacer merge publica en n-ai.dev.**

Diseño: `docs/superpowers/specs/2026-09-14-rediseno-consultora-design.md` · Plan: `docs/superpowers/plans/2026-09-14-rediseno-consultora.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
BODY
)"
```

Esperado: imprime la URL del PR. **No** ejecutar `gh pr merge`.

- [ ] **Paso 6: rendimiento en la vista previa de Vercel**

Esperar a que el check de Vercel termine y tomar la URL de la vista previa:

```bash
GH_TOKEN=$(gh auth token -u nayrr25) gh pr view --repo nayrr25/WebSite_personal --json comments --jq '.comments[].body' | grep -o 'https://[a-z0-9-]*\.vercel\.app' | head -1
```

Luego medir (reemplazar `PREVIEW` por esa URL):

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
cd ~/WebSite_personal
npx --yes lighthouse@12.8.2 PREVIEW --only-categories=performance --form-factor=mobile --output=json --output-path=docs/superpowers/reviews/assets/lighthouse-despues.json --chrome-flags="--headless=new" --quiet
node -e 'const a=require("./docs/superpowers/reviews/assets/lighthouse-antes.json"),d=require("./docs/superpowers/reviews/assets/lighthouse-despues.json");console.log("antes",Math.round(a.categories.performance.score*100),"después",Math.round(d.categories.performance.score*100))'
```

Esperado: "después" ≥ "antes" − 5. Si la vista previa exige iniciar sesión en Vercel (protección de despliegue), anotarlo en el informe y dejar la comparación para después del merge.

- [ ] **Paso 7: informe de verificación**

Crear `docs/superpowers/reviews/2026-09-14-verificacion-rediseno.md` con:
- una tabla de los 4 criterios de éxito de la especificación, cada uno con su resultado medido (valores de los Pasos 2, 3 y 6);
- la lista de pruebas (`pnpm test`) con el total;
- el enlace al PR;
- los insumos pendientes de Nancy (I1 y I5–I9).

Escribir solo valores observados, no esperados.

- [ ] **Paso 8: commit y push del informe**

```bash
cd ~/WebSite_personal
git add docs/superpowers/reviews
git commit -m "Verificacion final del rediseno: detector, primer pantallazo y rendimiento

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push
```

- [ ] **Paso 9: nueva crítica de impeccable (criterio de éxito 3)**

Ejecutar `/impeccable critique` sobre `src/app/_shell/HomeSections.tsx` (con los dos agentes independientes) y comparar con el 18/36 anterior. Meta: ≥28/36. Las reglas estéticas del estilo C no cuentan como problema: fueron aprobadas por Nancy. Subir el informe a `docs/superpowers/reviews/`, agregar el puntaje al informe de verificación y al PR, y hacer commit y push.
