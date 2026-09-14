# Rediseño de n-ai.dev: consultora con prueba en vivo

- **Fecha:** 2026-09-14 (revisión 2, tras la [crítica de impeccable](../reviews/2026-09-14-critica-impeccable.md))
- **Estado:** decisiones aprobadas en conversación; pendiente de revisión de este documento
- **Rama:** `feat/rediseno-consultora`
- **Referencia visual:** [maqueta v1](assets/2026-09-14-maqueta-propuestas.html), estilo C. **Queda superada** en color, efectos y datos; manda este documento. Antes de implementar se hace una maqueta v2 (ver Entrega).

## Objetivo

Que quien entra a n-ai.dev entienda en el primer pantallazo que N-AI es una **consultora experta en IA, automatización y analítica avanzada**, con prueba creíble, y que la página se vea de **nivel senior**: propia de N-AI, no una plantilla de sitio de IA.

**Criterios de éxito**

1. **Primer pantallazo, a 1440×900 y a 375×812:** se ven sin scroll el H1, el botón "Agendar un diagnóstico" y al menos una prueba real (la fila de cifras). En escritorio también se ve el panel de prueba. En móvil, su versión compacta empieza justo debajo.
2. **Detector:** `impeccable detect` sobre la vista previa de Vercel da **0 hallazgos** en estas reglas:
   - `gradient-text`, `radial-spotlight-glow`, `radial-halo`, `dark-glow`, `pulsing-dot`, `ai-color-palette`, `marquee`, `codex-grid-background`;
   - `undersized-ui-text`, `tiny-text`, `low-contrast`, `nested-cards`.
3. **Puntaje:** una nueva `/impeccable critique` de la portada da **≥ 28/36** (hoy 18/36).
4. **Portada:** en móvil mide **≤ 9.000 px** (hoy unos 30.000).

## Restricciones

1. **Solo la fundadora.** No se muestran personas inventadas ni se dice "equipo", "nuestros expertos" ni se usa el plural de equipo. Voz de marca en tercera persona ("N-AI diseña…"); llamados a la acción en imperativo con **tú**.
2. **Cero datos inventados.** Se publican las cifras reales y los resultados del caso SICOP que ya están en el sitio, confirmados por Nancy el 2026-09-14:
   - los puntajes de las 8 dimensiones de riesgo (`sicop.riskDimensions`);
   - los puntajes de las 12 instituciones anonimizadas (`caseStudy.sicop.ts`).

   Se elimina la serie de 60 semanas de `AnomalyChart`: el código la genera con números aleatorios (`mulberry32`) y no es un dato del proyecto.
3. **Español e inglés** con las mismas claves en `es.ts` y `en.ts`; TypeScript lo verifica.
4. **Mismo stack:** Next.js 14, Tailwind 3.4, framer-motion 11. Sin dependencias nuevas. Recharts se elimina (gráficos en SVG propio). Los patrones de 21st.dev se usan como referencia y se reescriben.
5. **Accesibilidad AA:**
   - contraste de al menos 4,5:1 en todo el texto;
   - texto funcional de al menos 12 px;
   - foco visible;
   - menú usable en el primer pantallazo en móvil;
   - movimiento reducido: sin desplazamientos, con fundidos ≤150 ms.
6. **Nada llega a producción sin aprobación:** PR hacia `main` con vista previa de Vercel. Hacer merge equivale a publicar.

## Insumos que debe entregar Nancy

Cada insumo tiene una alternativa explícita, para que su ausencia no bloquee el resto del trabajo.

| # | Insumo | Formato | Si no llega a tiempo |
|---|---|---|---|
| I1 | Serie temporal real de anomalías (por mes o semana), solo si existe y es publicable | CSV/Excel | No hay gráfico temporal; el panel usa las 8 dimensiones y la distribución de instituciones |
| I5 | Ficha del caso: contexto, rol de Nancy, resultado publicable, periodo del proyecto | Texto | La banda del caso usa solo los hechos ya publicados (7 fuentes, pipeline de 7 etapas, 47 patrones, 8 dimensiones, <1 s) |
| I6 | Diagnóstico: duración, costo (o "sin costo") y qué recibe el cliente | Texto | El contacto dice "conversación inicial" sin prometer duración ni costo |
| I7 | Duración típica de cada fase del método | Texto | La línea de tiempo muestra entregables sin duraciones |
| I8 | Publicaciones confirmadas (título, año, enlace), excluyendo las 4 de homónimos que aparecen en Scholar | Lista | Solo el enlace al perfil de Google Scholar |
| I9 | Caso de automatización: volumen ingestado (registros o fuentes), tiempo manual ahorrado y frecuencia de los reportes automáticos | Texto | La tarjeta y la evidencia describen qué hace el sistema, sin cifras |

Los datos del caso se reúnen en `src/content/data/sicop.json`, versionado en el repositorio: hechos, 8 dimensiones, 12 instituciones anonimizadas y, si llega I1, la serie temporal. La fuente va como metadato.

## Arquitectura de páginas

| Ruta ES | Ruta EN | Contenido |
|---|---|---|
| `/` | `/en` | Portada (ver abajo) |
| `/casos/sicop` | `/en/cases/sicop` | Caso completo, **nueva página** |

La portada pasa de 11 secciones a 8, en este orden:

| # | Sección | `id` |
|---|---|---|
| 1 | Hero con panel de prueba | `top` |
| 2 | Servicios | `servicios` |
| 3 | Caso destacado SICOP (banda) | `caso-sicop` |
| 4 | Demos | `demos` |
| 5 | Cómo trabajamos | `metodo` |
| 6 | Quién lidera | `quien-lidera` |
| 7 | Preguntas clave | `faq` |
| 8 | Contacto | `contact` |

**Salen de la portada:** Sobre mí, CaseStudyHero, CaseStudyDeepDive, Pipeline, Capacidades, Building in Public y NetworkBand. El contenido útil del caso y del Pipeline se muda a `/casos/sicop`.

### 1. Hero

- **H1:** "Consultoría experta en IA, automatización y *analítica avanzada.*". El final va en Instrument Serif itálica **color sólido** `text.primary`, sin degradado.
- **Escala:** H1 `clamp(42px, 5.4vw, 78px)`, interlineado 0.95, tracking −0.035em. El tope de 78 px viene de la maqueta v2: con más tamaño, el panel de prueba no cabe en 1440×900.
- **Etiqueta:** una sola línea en sentence case, sin mayúsculas ni punto pulsante: "Consultoría de IA y analítica avanzada · Costa Rica y Latinoamérica".
- **Subtítulo:** "N-AI diseña, construye y pone en producción soluciones de datos para empresas e instituciones."
- **Botones:** "Agendar un diagnóstico" (primario, relleno de acento) → `#contact`; "Ver el caso SICOP" (enlace de texto con flecha) → `/casos/sicop`.
- **Cifras:** 56–72 px con `tabular-nums` y la unidad en peso menor. +400% créditos colocados · >2.4M registros de compra pública analizados · 47 patrones de anomalía modelados.
- **Panel de prueba `ProofPanel`** (plano, sin inclinación ni brillo):
  - **Cabecera:** "Caso SICOP · compras públicas", con la línea de estado en texto "Resultados del proyecto · instituciones anonimizadas".
  - **KPI estáticos:** >2.4M registros analizados · 47 patrones de anomalía.
  - **Barras horizontales** con las 8 dimensiones de riesgo (escala 0–100) y su compuesto.
  - **Distribución de las 12 instituciones anonimizadas** por nivel (bajo, medio, alto, crítico), con las 2 críticas marcadas en acento.
  - **Si llega I1,** se agrega el gráfico temporal sin reemplazar nada.
  - **Animación:** una sola vez al entrar en pantalla (la línea se dibuja y las barras crecen con `scaleX`), ≤1,2 s en total, sin bucles, sin contadores que suben y sin avisos rotando. Como no dura más de 5 s, no requiere control de pausa (WCAG 2.2.2).
  - **Móvil:** versión compacta con un KPI y un gráfico de 120 px de alto, justo debajo de las cifras.
- **Fondo:** base oscura neutra y grano sutil del 3%. Sin halos, cuadrícula ni partículas. Altura `min-height: 100svh`.

### 2. Servicios

- **H2:** "Lo que N-AI hace por tu organización." Sin etiqueta en mayúsculas; numeración editorial.
- **Servicio ancla** (bloque ancho, dos columnas): **Inteligencia artificial y machine learning**. Descripción: modelos predictivos, detección de anomalías, scoring de riesgo e IA generativa aplicada. A la derecha, el caso SICOP como evidencia (una línea de resultado y enlace).
- **Los otros 3, en lista editorial** (filas separadas por una línea, sin tarjetas ni íconos):
  - **Automatización inteligente:** procesos manuales resueltos con flujos y agentes de IA conectados a tus sistemas. Evidencia: "ingesta, limpieza, reportes y pronósticos automatizados para una empresa regional de consumo masivo" (con cifras de I9 cuando lleguen).
  - **Analítica avanzada y BI:** tableros ejecutivos, segmentación de clientes, pronósticos y medición de campañas.
  - **Arquitectura y gobierno de datos:** ingesta, calidad y gobierno en la nube, para que la IA trabaje sobre datos confiables.
- **Etiquetas** de cada servicio en texto separado por "·", no en píldoras.
- **Sectores** al pie, en una línea de texto: Sector público · Banca y crédito · Consumo masivo · Retail · Marketing y medios.
- **Interacción:** en filas, cambio de color del título y desplazamiento de la flecha (≤200 ms, solo con `hover: hover`). Sin luz que sigue al mouse.

### 3. Caso destacado SICOP (banda)

- **Banda de ancho completo**, con superficie un tono más clara que la base. Es el único cambio de densidad fuerte de la portada.
- **Estructura:** contexto → rol de Nancy → resultado → periodo (de I5; si falta, los hechos publicados).
- **Contenido:** 4 hechos en fila (7 fuentes · 47 patrones · 8 dimensiones · <1 s) y enlace "Leer el caso completo" → `/casos/sicop`.

### 4. Demos

- Se conservan las 5 demos y sus estados, y se agrega una sexta en vivo: **Ingesta, reportes y pronósticos automatizados**. Cliente anónimo por sector ("empresa regional de consumo masivo"). Los datos de varias fuentes se centralizan, limpian y unifican solos, y los reportes se actualizan, analizan y proyectan (forecasting) sin trabajo manual. Solo lleva cifras de I9.
- Las 6 tarjetas van en una cuadrícula de 3×2, sin tarjetas de doble ancho.
- **Tarjetas sin tarjeta anidada:** superficie única, sin borde interior. Las mini-visualizaciones se recolorean con los tokens nuevos.
- **Enlaces:** la tarjeta de compras públicas enlaza a `/casos/sicop`. Las demás son `<article>` sin enlace ni texto "Ver caso de estudio".

### 5. Cómo trabajamos

- **H2:** "Del diagnóstico a la operación."
- **Línea de tiempo horizontal** en escritorio y vertical en móvil. Cada fase tiene nombre, una frase, duración (I7) y entregable.
  1. **Diagnóstico:** entender el problema de negocio y evaluar los datos disponibles. Entregable: mapa de oportunidades.
  2. **Diseño:** definir la solución, las métricas de éxito y el plan. Entregable: arquitectura y plan.
  3. **Construcción:** desarrollar y validar con datos reales, en ciclos cortos. Entregable: solución probada.
  4. **Operación:** poner en producción, medir y mejorar. Entregable: impacto medido.
- **Animación:** la línea se dibuja una sola vez al entrar en pantalla. Sin destello en bucle.

### 6. Quién lidera

- **Diseño:** columna estrecha (máximo 720 px) con retrato a un lado. Estructura distinta a las demás secciones, para romper la simetría.
- **H2:** "Primero la pregunta de negocio. Al final, la tecnología."
- **Contenido:**
  - Nancy Rodríguez · Fundadora · Principal Data & AI Consultant · Economista y estadística.
  - Un párrafo de bio y el bloque `capsule`.
  - Áreas de trabajo en texto separado por "·".
  - Publicaciones (I8) como lista con título y año, o el enlace a Scholar.
  - LinkedIn, Scholar y GitHub.

### 7. Preguntas clave

- **Tres preguntas abiertas en dos columnas:**
  1. ¿Cómo se cobra una consultoría con N-AI?
  2. ¿Cómo empieza un proyecto? (diagnóstico, I6)
  3. ¿Qué hace que N-AI sea diferente de otras consultorías?
- **Tres más en acordeón** (`<details>`):
  4. ¿Qué servicios ofrece N-AI?
  5. ¿Quién hace consultoría de IA en Costa Rica?
  6. ¿Quién hace inteligencia de compras públicas en Costa Rica?
- Las respuestas se reescriben en lenguaje claro, sin jerga y cumpliendo la restricción 1.
- Las otras 9 preguntas salen de i18n.
- **Datos estructurados:** `FAQPage` con exactamente estas 6 por idioma.

### 8. Contacto

- **H2:** "¿Tienes un problema de datos que vale la pena resolver?"
- **Qué pasa después:** 3 pasos en texto. Escribes → respuesta en {plazo I6} → diagnóstico ({duración y costo I6} o "conversación inicial").
- **Botones:** se conservan WhatsApp (primario) y correo, con sus indicaciones.
- **Correo de contacto:** `nanyrr25@gmail.com` en todo el sitio (`site.contact.email`, `mailto`, JSON-LD, `llms.txt`). Reemplaza a `nancyrodriguez@n-ai.dev` por decisión de Nancy del 2026-09-14, porque no hay certeza de que el reenvío del dominio funcione.
- `whatsappMessage`: "Hola Nancy, te escribo desde n-ai.dev. Me interesa agendar un diagnóstico para un proyecto de datos / IA."

### `/casos/sicop` y `/en/cases/sicop`

- **Estructura:**
  - resumen (contexto, rol, resultado, periodo);
  - el reto;
  - fuentes y arquitectura (las 7 fuentes y el pipeline de 7 etapas, con el texto del Pipeline actual reescrito sin jerga);
  - capa de IA (47 patrones y las 8 dimensiones con sus puntajes reales y qué mide cada una);
  - gráficos del caso: dimensiones de riesgo y distribución de las 12 instituciones anonimizadas (más la serie temporal si llega I1);
  - impacto estratégico;
  - llamado a agendar un diagnóstico.
- **Navegación:** índice lateral fijo en escritorio (se reutiliza el patrón actual) y enlace "Volver al inicio".
- **Datos:** metadata propia, `Article` en JSON-LD y entrada en `sitemap.ts`.

### Menú y pie de página

- **Menú siempre visible** desde el primer pantallazo; al hacer scroll solo cambia el fondo.
- **5 enlaces:** Servicios · Caso SICOP · Demos · Método · Contacto. Además, el botón "Agendar diagnóstico" y el selector de idioma.
- **Móvil:** el botón de menú funciona desde el primer pantallazo y el panel se cierra con Escape.
- **Pie de página:** los mismos enlaces, datos de contacto, © y enlaces a LinkedIn, Scholar y GitHub. Se elimina `themeLabel` ("Tema · Oscuro").

## Sistema visual

### Color: base oscura neutra con un solo acento propio

Coral de alerta, derivado del concepto de "señal" de SICOP. Los tokens se renombran a nombres semánticos y se actualizan todos los usos; TypeScript y la búsqueda de clases viejas lo verifican.

| Token | Valor | Uso |
|---|---|---|
| `bg.base` | `#0F1013` | Fondo |
| `bg.deep` | `#0A0B0D` | Pie de página |
| `bg.raised` | `#17191D` | Banda SICOP, panel de prueba, demos |
| `line.subtle` / `line.strong` | `rgba(242,239,234,0.10)` / `rgba(242,239,234,0.18)` | Bordes y separadores |
| `ink.primary` | `#F2EFEA` | Texto principal |
| `ink.secondary` | `#B5AFA6` | Texto secundario |
| `ink.muted` | `#8C867E` | Texto tenue (debe medir ≥4,5:1 sobre `bg.base` y `bg.raised`) |
| `accent` | `#FF6A4D` | Botón primario, foco, picos en gráficos, enlaces activos |
| `accent.ink` | `#0F1013` | Texto sobre acento |
| `data.neutral` | `#C9C3BA` | Líneas base de gráficos |

- **Un solo acento.** No hay degradados de texto ni de fondo.
- **Sombras:** tintadas con `rgba(5,5,6,…)`.
- **Grano:** SVG de ruido como data URI, opacidad 3%, fijo, `pointer-events: none`.
- **Detalles:** `::selection` en acento al 30%. La barra de scroll se redefine para el tema oscuro.

### Tipografía

- **Archivo** para titulares, **Public Sans** para el texto, **Instrument Serif** itálica solo en el acento del H1 y en citas.
- **Escala de títulos:** H1 hasta 78 px; H2 `clamp(32px, 4.4vw, 56px)`.
- **Texto:** 17–18 px, máximo 68 caracteres por línea.
- **Texto funcional:** mínimo 12 px, `tabular-nums` en todas las cifras.
- **Etiquetas en mayúsculas:** máximo 2 en toda la portada, con tracking ≤0.08em.
- `text-wrap: balance` en títulos y `pretty` en párrafos.

### Movimiento (principios de Emil Kowalski)

- **Tokens:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` y `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- **Duraciones:** interacción de UI ≤200 ms; entradas al scroll ≤500 ms, una sola vez y con desfase de 40–60 ms.
- **Propiedades:** solo `transform` y `opacity`. Nada de `transition-all`.
- **Botones:** `active:scale-[0.97]` de 120 ms.
- **Hover:** solo con `(hover: hover)`, vía `future.hoverOnlyWhenSupported: true` en Tailwind.
- **Movimiento reducido:** sin desplazamientos ni dibujo de gráficos; fundidos ≤150 ms y gráficos en su estado final.
- **Foco:** anillo de 2 px en acento con separación de 2 px.

## Archivos

- **Nuevos:**
  - `src/components/sections/ProofPanel.tsx`, `Services.tsx`, `CaseBand.tsx`, `Method.tsx`, `Leadership.tsx`;
  - `src/components/charts/LineSeries.tsx` y `BarList.tsx` (SVG);
  - `src/app/(es)/casos/sicop/page.tsx` y `src/app/(en)/en/cases/sicop/page.tsx`, con su componente compartido en `src/app/_shell/CaseSicop.tsx`;
  - `src/content/services.ts`;
  - `src/content/data/sicop.json`;
  - `src/components/ui/Grain.tsx`.
- **Modificados:**
  - `Hero.tsx`, `DemoShowcase.tsx`, `FAQ.tsx`, `Contact.tsx`, `Nav.tsx`, `Footer.tsx`, `src/content/site.ts` (correo);
  - `HomeSections.tsx`, `tailwind.config.ts`, `src/styles/tokens.css`, `src/app/globals.css`;
  - `es.ts`, `en.ts`;
  - `StructuredData.tsx`, `opengraph-image.tsx`, `sitemap.ts`, los dos `layout.tsx` (description y `metadataBase`);
  - `public/llms.txt`, `HANDOFF.md`.
- **Eliminados si quedan sin uso** (verificar con búsqueda antes de borrar):
  - componentes `About`, `CaseStudyHero`, `CaseStudyDeepDive`, `IntelligencePipeline`, `Capabilities`, `BuildingInPublic`;
  - fondos `NetworkBand`, `ParticleNetwork`, `AuroraGradient`, `GridGlow`;
  - `AnomalyChart`, `RiskScoreGauge`, `PipelineDiagram`;
  - datos `content/caseStudy.sicop.ts`, `content/capabilities.ts`;
  - `GradientText`, `MagneticHover`;
  - la dependencia `recharts`.

## SEO y buscadores con IA

- **`metadataBase`:** `https://n-ai.dev` en ambos layouts. Hoy la imagen OG se resuelve con `localhost:3000`.
- **Datos estructurados:**
  - `Service` ×4;
  - `FAQPage` con las 6 visibles por idioma;
  - `Article` en la página del caso;
  - `Organization`, `Person` y `WebSite` con la nueva descripción.
- **`llms.txt`:** enlaces a `/casos/sicop`, `#servicios`, `#metodo` y `#quien-lidera`; quitar `#case-study` y `#pipeline`; agregar automatización y analítica avanzada.
- **`sitemap.ts`:** incluye las 2 páginas del caso con `alternates` de idioma.

## Verificación

1. `pnpm lint` y `pnpm build` sin errores ni avisos de `metadataBase`, con Node 22.
2. **Revisión visual:** español e inglés, portada y caso, a 1440, 768 y 375 px, contra el criterio de éxito 1.
3. **Detector:** `impeccable detect --json <URL de la vista previa>` para la portada y el caso, en los dos idiomas, contra el criterio de éxito 2. El resultado se guarda en `docs/superpowers/reviews/`.
4. **Crítica:** `/impeccable critique` de la portada, contra el criterio 3; la trayectoria del puntaje queda en `.impeccable/critique/`.
5. **Accesibilidad:**
   - navegación completa con teclado (menú, acordeón, enlaces);
   - foco visible;
   - contraste medido de `ink.muted` y `accent` sobre cada superficie;
   - movimiento reducido activo.
6. **Enlaces y rendimiento:**
   - todos los enlaces internos llegan a una sección o página existente;
   - sin errores en la consola;
   - Lighthouse móvil sin bajar más de 5 puntos frente a la medición previa a los cambios.
7. **Honestidad del contenido:**
   - búsqueda de "equipo", "nuestro", "nuestros" y del plural de equipo en `es.ts` y `en.ts`;
   - ningún número en pantalla que no venga de las cifras reales, de `sicop.json` o de I1;
   - ningún generador de números aleatorios (`Math.random`, `mulberry32`) alimenta un gráfico visible.

## Entrega

1. **Maqueta v2:** hero, banda SICOP y servicios, con la paleta nueva y el panel con los datos reales del caso. Se sube a `docs/superpowers/specs/assets/` para aprobación visual antes de implementar.
2. **Plan de implementación** en `docs/superpowers/plans/`.
3. **Commits en `feat/rediseno-consultora`**, subidos a GitHub después de cada entregable → PR a `main` → vista previa de Vercel → revisión de Nancy → merge solo con su aprobación.
4. **Cuando lleguen I1 e I5–I9,** se incorporan en commits propios, sin rehacer el diseño.

## Fuera de alcance

Páginas individuales por servicio, blog, agenda o calendario real, fotos de equipo, cambios de dominio, analytics o DNS, e ingesta de datos abiertos de SICOP.
