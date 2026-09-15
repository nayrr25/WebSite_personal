# Rediseño de n-ai.dev: consultora con prueba en vivo

- **Fecha:** 2026-09-14 (revisión 3: se recupera el estilo C tras descartar la v2; la revisión 2 incorporó la [crítica de impeccable](../reviews/2026-09-14-critica-impeccable.md))
- **Estado:** decisiones aprobadas en conversación; pendiente de revisión de este documento
- **Rama:** `feat/rediseno-consultora`
- **Referencia visual:** [maqueta v3](assets/2026-09-14-maqueta-v3.src.html), la portada completa en el estilo C elegido, con datos reales. La [v2](assets/2026-09-14-maqueta-v2.src.html) (gris con coral) quedó descartada: Nancy indicó que perdía el diseño aprobado. Manda este documento.

## Objetivo

Que quien entra a n-ai.dev entienda en el primer pantallazo que N-AI es una **consultora experta en IA, automatización y analítica avanzada**, con prueba creíble, y que la página se vea de **nivel senior**: propia de N-AI, no una plantilla de sitio de IA.

**Criterios de éxito**

1. **Primer pantallazo, a 1440×900 y a 375×812:** se ven sin scroll el H1, el botón "Agendar un diagnóstico" y al menos una prueba real (la fila de cifras). En escritorio también se ve el panel de prueba. En móvil, su versión compacta empieza justo debajo.
2. **Detector:** `impeccable detect` sobre la vista previa de Vercel da **0 hallazgos** de accesibilidad y legibilidad: `undersized-ui-text`, `tiny-text`, `low-contrast`, `nested-cards`, `line-length`. Las reglas estéticas propias del estilo C (`gradient-text`, `dark-glow`, `pulsing-dot`, `radial-halo`, `codex-grid-background`) se aceptan de forma intencional (ver Sistema visual).
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

- **Composición (estilo C):** dos columnas, con el mensaje a la izquierda y el tablero en vivo a la derecha. Fondo con halo azul radial (`#1A2C5E`) arriba a la derecha y cuadrícula de 48 px con máscara radial. Altura `min-height: calc(100svh - 68px)`.
- **Etiqueta:** píldora con punto cian pulsante: "Consultoría de IA y analítica avanzada · Costa Rica y Latinoamérica".
- **H1:** "Consultoría experta en IA, automatización y *analítica avanzada.*". El final va en Instrument Serif itálica con degradado azul→cian (`#8FB4FF → #35E0FF`). Escala `clamp(40px, 4.9vw, 74px)`, interlineado 1.02.
- **Subtítulo:** "N-AI diseña, construye y pone en producción soluciones de datos para empresas e instituciones en Costa Rica y Latinoamérica."
- **Botones:** primario blanco "Agendar un diagnóstico →" → `#contact`; secundario con borde "Ver el caso SICOP" → `/casos/sicop`.
- **Cifras:** +400% créditos colocados · >2.4M registros de compra pública analizados · 47 patrones de anomalía modelados. 34 px con `tabular-nums`.
- **`LiveDashboard`:** panel inclinado en 3D (`rotateY(-11deg) rotateX(5deg)`, se endereza al pasar el mouse) con brillo azul. **Solo usa datos reales del caso:**
  - **Cabecera:** "Caso SICOP · monitor de riesgo", indicador "EN VIVO" con punto rojo pulsante y botón **Pausar/Reanudar** (WCAG 2.2.2, porque el recorrido dura más de 5 s).
  - **3 KPI** que cuentan una sola vez hasta su valor: >2.4M registros, 47 patrones y riesgo compuesto 62/100 (promedio de las 8 dimensiones).
  - **Gráfico de área** con los puntajes de las 12 instituciones anonimizadas (A–L). Un cursor las recorre en bucle cada 1,1 s y muestra "Institución X · puntaje".
  - **Aviso emergente** cuando el cursor pasa por una institución de riesgo alto o crítico (H, I, J, K, L), con su puntaje real y su nivel.
  - **Medidor** del compuesto (62) y las 4 dimensiones con mayor puntaje en barras (`scaleX`).
  - **Leyenda plana** bajo el panel: "Recorrido animado sobre los resultados reales del caso SICOP · instituciones anonimizadas".
  - **Pausa automática:** el recorrido se detiene fuera de pantalla, con la pestaña oculta o al pulsar Pausar.
  - **Movimiento reducido:** sin bucle, cursor fijo en la institución L y KPI en su valor final.
  - **Menos de 1000 px:** panel sin inclinación y aviso dentro del panel. En celular se ocultan el medidor y un KPI.
  - **Si llega I1,** el gráfico puede cambiar a la serie temporal real.

### 2. Servicios

- **Eyebrow:** "Servicios". **H2:** "Lo que N-AI hace por tu organización."
- **Entrada:** "Cuatro líneas de servicio con un mismo estándar: cada solución se mide por su impacto en el negocio, no por la tecnología que usa."
- **4 tarjetas (estilo C):** número, ícono, título, descripción, 3 etiquetas y, cuando exista, una línea de evidencia. Luz que sigue al mouse y elevación al pasar encima, solo con `hover: hover`.
  1. **Inteligencia artificial y machine learning:** modelos predictivos, detección de anomalías, scoring de riesgo e IA generativa aplicada. Evidencia: caso SICOP, 47 patrones y 8 dimensiones de riesgo.
  2. **Automatización inteligente:** procesos manuales resueltos con flujos y agentes de IA conectados a tus sistemas. Evidencia: ingesta, reportes y pronósticos automatizados para consumo masivo (con cifras de I9 cuando lleguen).
  3. **Analítica avanzada y BI:** tableros ejecutivos, segmentación de clientes, pronósticos y medición de campañas.
  4. **Arquitectura y gobierno de datos:** ingesta, calidad y gobierno en la nube, para que la IA trabaje sobre datos confiables.
- **Sectores** al pie: Sector público · Banca y crédito · Consumo masivo · Retail · Marketing y medios.

### 3. Caso destacado SICOP

- **Tarjeta ancha** con halo azul (`#233E85`) sobre `#0F1A3A` y radio de 32 px.
  - **Izquierda:** eyebrow "Caso destacado", H2 "Inteligencia de compras públicas para la Contraloría General de la República.", contexto, resultado y botón "Leer el caso completo" → `/casos/sicop`.
  - **Derecha:** 4 hechos en tarjetas, con la cifra en degradado blanco→azul: 7 fuentes · 47 patrones · 8 dimensiones · <1 s.
- **Estructura del texto:** contexto → rol de Nancy → resultado → periodo. Sin I5, solo el contexto y el resultado ya publicados.

### 4. Demos

- Se conservan las 5 demos y sus estados, y se agrega una sexta en vivo: **Ingesta, reportes y pronósticos automatizados**. Cliente anónimo por sector ("empresa regional de consumo masivo"). Los datos de varias fuentes se centralizan, limpian y unifican solos, y los reportes se actualizan, analizan y proyectan (forecasting) sin trabajo manual. Solo lleva cifras de I9.
- Las 6 tarjetas van en una cuadrícula de 3×2, sin tarjetas de doble ancho.
- **Tarjetas estilo C:** superficie translúcida, borde sutil, insignia de estado (En vivo con punto verde pulsante, En construcción ámbar, Concepto gris) y mini-visualización en azul y cian.
- **Enlaces:** la tarjeta de compras públicas enlaza a `/casos/sicop`. Las demás son `<article>` sin enlace ni texto "Ver caso de estudio".

### 5. Cómo trabajamos

- **H2:** "Del diagnóstico a la operación."
- **4 pasos (estilo C):** círculos numerados sobre una línea azul→cian, con un destello que la recorre dos veces al entrar en pantalla y se detiene. Cada fase tiene nombre, una frase, entregable en píldora y duración (I7).
  1. **Diagnóstico:** entender el problema de negocio y evaluar los datos disponibles. Entregable: mapa de oportunidades.
  2. **Diseño:** definir la solución, las métricas de éxito y el plan. Entregable: arquitectura y plan.
  3. **Construcción:** desarrollar y validar con datos reales, en ciclos cortos. Entregable: solución probada.
  4. **Operación:** poner en producción, medir y mejorar. Entregable: impacto medido.

### 6. Quién lidera

- **Diseño (estilo C):** tarjeta con retrato, nombre y rol, junto a una tarjeta de bio con la cita y las áreas. Debajo, 4 credenciales en tarjetas: +400% · >2.4M · 47 · Investigación (enlace a Scholar).
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

## Sistema visual (estilo C, maqueta v3)

**Decisión de Nancy del 2026-09-14:** se conserva la identidad del estilo C (azul noche, tablero en movimiento, profundidad con brillo, titular con degradado). De la crítica de impeccable se aplican solo las correcciones que no dependen del estilo: datos reales, contraste, tamaño de texto, accesibilidad y estructura.

### Color

| Token | Valor | Uso |
|---|---|---|
| `bg.base` → `bg.deep` | `#0A1024` → `#070B18` | Fondo en degradado vertical |
| `surface` | `rgba(255,255,255,0.045)` | Tarjetas |
| `panel` | `rgba(12,19,40,0.82)`, desenfoque 12 px | Tablero |
| `line.subtle` / `line.strong` | `rgba(255,255,255,0.10)` / `rgba(255,255,255,0.18)` | Bordes |
| `ink.primary` / `ink.secondary` / `ink.muted` | `#FFFFFF` / `#AEB8CF` / `#8C98B3` | Texto |
| `accent` | `#8FB4FF` | Enlaces, íconos, bordes activos |
| `accent.cyan` | `#35E0FF` | Degradados, foco, cursor del tablero |
| `alert` / `warn` | `#FF6B78` / `#FFC35D` | Solo en el tablero y las insignias |

- **Contraste medido:**
  - `ink.muted` da 5,9–6,5:1 sobre fondo, panel y banda;
  - `ink.secondary` da 8,6–9,5:1;
  - `accent` da 8,3–9,1:1;
  - el botón blanco con texto `bg.base` da 18,9:1.
- **Halos y cuadrícula:** halo radial `#1A2C5E` en el hero y `#233E85` en la banda del caso; cuadrícula de 48 px con máscara solo en el hero.
- **Botones:** primario blanco con sombra azul; secundario con borde translúcido; ambos en forma de píldora.

### Tipografía

- **Familias:** Archivo 800 en titulares, Public Sans en el texto e Instrument Serif itálica con degradado en el acento del H1 y en citas.
- **Escala:** H1 `clamp(40px, 4.9vw, 74px)`; H2 `clamp(32px, 4.4vw, 58px)`; texto de 17–18 px.
- **Texto funcional:** mínimo 12 px; `tabular-nums` en todas las cifras.
- **Eyebrows** en mayúsculas con tracking 0.14em al inicio de cada sección, como en C.

### Movimiento

- **Tokens:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- **Entradas al scroll:** ≤500 ms, una sola vez, con desfase de 60 ms.
- **Botones:** `active:scale-[0.97]` de 120 ms. Hover solo con `(hover: hover)`.
- **Tablero:** recorrido en bucle con botón de pausa; KPI, medidor y barras animan una sola vez; solo `transform` y `opacity` (barras con `scaleX`).
- **Puntos pulsantes:** píldora del hero, "EN VIVO" y demos en vivo.
- **Movimiento reducido:** sin bucles, pulsos ni desplazamientos; fundidos ≤150 ms y tablero en estado final.
- **Foco:** anillo de 2 px cian con separación de 3 px.

## Archivos

- **Nuevos:**
  - `src/components/sections/LiveDashboard.tsx`, `Services.tsx`, `CaseBand.tsx`, `Method.tsx`, `Leadership.tsx`;
  - `src/components/charts/LineSeries.tsx` y `BarList.tsx` (SVG);
  - `src/app/(es)/casos/sicop/page.tsx` y `src/app/(en)/en/cases/sicop/page.tsx`, con su componente compartido en `src/app/_shell/CaseSicop.tsx`;
  - `src/content/services.ts`;
  - `src/content/data/sicop.json`;
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
  - `MagneticHover`;
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

1. **Maqueta v3:** portada completa en estilo C con datos reales, en `docs/superpowers/specs/assets/`, para aprobación visual antes de implementar.
2. **Plan de implementación** en `docs/superpowers/plans/`.
3. **Commits en `feat/rediseno-consultora`**, subidos a GitHub después de cada entregable → PR a `main` → vista previa de Vercel → revisión de Nancy → merge solo con su aprobación.
4. **Cuando lleguen I1 e I5–I9,** se incorporan en commits propios, sin rehacer el diseño.

## Fuera de alcance

Páginas individuales por servicio, blog, agenda o calendario real, fotos de equipo, cambios de dominio, analytics o DNS, e ingesta de datos abiertos de SICOP.

## Ajustes durante el plan de implementación

- **Cápsula de cita:** el bloque `capsule` no se muestra en la página, porque la maqueta v3 aprobada no lo incluye. Su contenido sigue en `public/llms.txt` y en los datos estructurados.
- **Gráficos:** no se crea `LineSeries.tsx`. El gráfico de instituciones vive dentro de `LiveDashboard.tsx`, y `BarList.tsx` se reutiliza en el tablero y en la página del caso.
- **Menú:** el eyebrow de la sección de método es "Método" y no "Cómo trabajamos", para no usar el plural de equipo.
- **Umbrales:** el tablero no dibuja una línea de umbral de riesgo, porque el caso no publica los cortes entre niveles.
