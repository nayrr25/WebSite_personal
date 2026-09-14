# Rediseño de n-ai.dev: consultora con tablero en vivo

- **Fecha:** 2026-09-14
- **Estado:** diseño aprobado en conversación; pendiente de revisión de este documento
- **Rama:** `feat/rediseno-consultora`
- **Referencia visual:** [maqueta, estilo C](assets/2026-09-14-maqueta-propuestas.html) (abrir con `#c`). La maqueta es orientativa: los textos que manda son los de este documento.

## Objetivo

Que quien entra a n-ai.dev entienda en el primer pantallazo que N-AI es una **consultora experta en IA, automatización y analítica avanzada**, y que la página sea visualmente mucho más llamativa que la actual (tema claro, marca personal).

**Criterio de éxito:** en el primer pantallazo, a 1440×900 y a 375×812, se ven sin hacer scroll las tres cosas: qué hace N-AI (titular), la prueba (cifras reales y tablero) y la acción (botón "Agendar un diagnóstico").

## Restricciones

1. **Solo la fundadora.** No se muestran personas inventadas ni perfiles de ejemplo. Ningún texto dice "equipo", "nuestros expertos" ni equivalentes. Los textos que se conservan se revisan con ese criterio.
2. **Solo cifras reales:** +400% (créditos colocados), >2.4M (registros de compra pública analizados), 47 (patrones de anomalía modelados).
3. **El tablero usa datos simulados** y lo dice en pantalla ("Visualización ilustrativa con datos simulados"). Instituciones genéricas ("Institución A–D") y códigos de contrato ficticios.
4. **Español e inglés** con las mismas claves en `es.ts` y `en.ts`; TypeScript lo verifica. El registro se mantiene en **tú**, como el sitio actual.
5. **Mismo stack:** Next.js 14, Tailwind 3.4, framer-motion 11, lucide-react. Sin dependencias nuevas. Los componentes de 21st.dev se usan como referencia de patrones y se reescriben: están hechos para shadcn/Tailwind 4 y la cuenta gratuita permite 2 descargas diarias.
6. **Accesibilidad:** con `prefers-reduced-motion` todo queda estático. Contraste AA sobre fondo oscuro. El tablero es decorativo (`aria-hidden`) y su contenido no es necesario para entender la página.
7. **Nada llega a producción sin aprobación:** PR hacia `main` con vista previa de Vercel. Hacer merge equivale a publicar en n-ai.dev.

## Estructura de la portada

| # | Sección | `id` | Base |
|---|---|---|---|
| 1 | Hero con tablero en vivo | `top` | `Hero.tsx` reescrito + `LiveDashboard.tsx` nuevo |
| 2 | Servicios | `servicios` | `Services.tsx` nuevo (reemplaza Capacidades) |
| 3 | Demos | `demos` | `DemoShowcase.tsx` con nuevo estilo |
| 4 | Cómo trabajamos | `metodo` | `Method.tsx` nuevo |
| 5 | Quién lidera | `quien-lidera` | `Leadership.tsx` nuevo (reemplaza Sobre mí) |
| 6 | FAQ compacta | `faq` | `FAQ.tsx` reducida |
| 7 | Contacto | `contact` | `Contact.tsx` con nuevo estilo y textos |

**Salen de la portada:** Sobre mí, Caso SICOP (hero y análisis a fondo), Pipeline, Capacidades, Building in Public y las bandas de red (`NetworkBand`).

### 1. Hero

- **Etiqueta:** "Consultoría de IA y analítica avanzada · Costa Rica & LATAM"
- **H1:** "Consultoría experta en IA, automatización y *analítica avanzada.*". La parte final va en Instrument Serif itálica con degradado azul→cian.
- **Subtítulo:** "Diseñamos, construimos y ponemos en producción soluciones de datos para empresas e instituciones en Costa Rica y Latinoamérica."
- **Botones:** primario "Agendar un diagnóstico" → `#contact`; secundario "Ver demos" → `#demos`.
- **Cifras:** fila con las 3 cifras reales.
- **`LiveDashboard`** (columna derecha):
  - Cabecera "Monitor de riesgo · compras públicas" con indicador "EN VIVO".
  - 3 KPI:
    - registros analizados: arranca en 2,401,338 y suma de a poco;
    - alertas de hoy;
    - riesgo promedio.
  - Gráfico de línea en SVG que se desplaza cada 700 ms. Los picos anómalos se marcan en rojo.
  - Medidor de riesgo en 0.82.
  - Barras de 4 instituciones.
  - Aviso emergente que rota entre 4 mensajes cada 3.4 s.
  - Leyenda de datos simulados.
  - **Rendimiento:** la animación se pausa cuando el tablero sale de pantalla o la pestaña está oculta. SVG propio, sin Recharts.
  - **Carga:** el H1 se renderiza en el servidor. El tablero es componente cliente con un contenedor de tamaño fijo, para no mover el layout (CLS).
- **Diseño:**
  - Escritorio (≥1024 px): dos columnas; tablero con inclinación 3D que se reduce al pasar el mouse.
  - Menos de 1024 px: el tablero va debajo del texto, sin inclinación, y el aviso emergente queda dentro del panel.
- **Movimiento reducido:** tablero estático en su primer estado, sin avisos rotando.

### 2. Servicios

- **Eyebrow:** "Servicios". **H2:** "Lo que hacemos por tu organización."
- **Entrada:** "Cuatro líneas de servicio con un mismo estándar: cada solución se mide por su impacto en el negocio, no por la tecnología que usa."
- **4 tarjetas:** número, ícono lucide, título, descripción y 3 etiquetas. Datos estáticos en `src/content/services.ts`; textos en i18n.
  1. **Inteligencia artificial y machine learning:** modelos predictivos, detección de anomalías, scoring de riesgo e IA generativa aplicada a tu operación. Etiquetas: Predicción · Scoring · IA generativa.
  2. **Automatización inteligente:** procesos que hoy son manuales, resueltos con flujos y agentes de IA conectados a tus sistemas. Etiquetas: Agentes de IA · Flujos · Integraciones.
  3. **Analítica avanzada y BI:** tableros ejecutivos, segmentación de clientes, pronósticos y medición del desempeño de campañas. Etiquetas: Dashboards · RFM · Pronósticos.
  4. **Arquitectura y gobierno de datos:** ingesta, calidad y gobierno en la nube, para que la IA trabaje sobre datos confiables. Etiquetas: Nube · Calidad · Gobierno.
- **Franja de sectores:** Sector público · Banca y crédito · Consumo masivo · Retail · Marketing y medios.
- **Interacción:** luz que sigue al mouse en cada tarjeta y leve elevación al pasar encima.

### 3. Demos

- Se conservan las 5 demos, sus textos y sus estados (En vivo / En construcción / Concepto).
- Tarjetas con el nuevo estilo oscuro. Las mini-visualizaciones actuales se recolorean con los tokens nuevos.
- **Corrección:** hoy cada tarjeta es un enlace a `#<slug>`, pero esos ids no existen. Pasan a ser `<article>` sin enlace y se quita el texto "Ver caso de estudio".

### 4. Cómo trabajamos

- **Eyebrow:** "Cómo trabajamos". **H2:** "Un método probado, del diagnóstico a la operación."
- **4 pasos**, cada uno con su entregable:
  1. **Diagnóstico:** entendemos el problema de negocio y evaluamos los datos disponibles. Entregable: mapa de oportunidades.
  2. **Diseño:** definimos la solución, las métricas de éxito y el plan de trabajo. Entregable: arquitectura y plan.
  3. **Construcción:** desarrollamos y validamos con datos reales, en ciclos cortos. Entregable: solución probada.
  4. **Operación:** ponemos en producción, medimos resultados y mejoramos. Entregable: impacto medido.
- **Diseño:** en escritorio, línea horizontal con un destello que la recorre. En tablet, 2 columnas; en celular, 1 columna sin línea.

### 5. Quién lidera

- **Eyebrow:** "Quién lidera". **H2:** "Primero la pregunta de negocio. Al final, la tecnología."
- Retrato (`public/nancy-retrato.webp`), "Nancy Rodríguez", rol "Fundadora · Principal Data & AI Consultant", disciplinas "Economista · Estadística · Data & AI Leader".
- Un párrafo de bio (`about.founderBio`) y las áreas de trabajo (`about.workAreas`) como etiquetas.
- Se conserva el bloque `capsule` (cápsula de cita para buscadores con IA).
- **4 credenciales:** +400% créditos colocados · >2.4M registros de compra pública analizados · 47 patrones de anomalía modelados · "Investigación: publicaciones académicas en economía y estadística", con enlace a Google Scholar.
- Enlaces a LinkedIn, Google Scholar y GitHub (`site.contact`).

### 6. FAQ compacta

Acordeón accesible (`<details>`/`<summary>`) con estas 6 preguntas, tomadas de `faq.items` y equivalentes en inglés:

1. ¿Qué hace N-AI?
2. ¿Qué servicios ofrece N-AI?
3. ¿Quién hace consultoría de IA en Costa Rica?
4. ¿Quién hace SICOP analytics o inteligencia de compras públicas en Costa Rica?
5. ¿Qué hace que N-AI sea diferente de otras consultorías?
6. ¿Cómo se cobra una consultoría con N-AI?

- Las respuestas se revisan con la restricción 1 (nada de "equipo") y deben mencionar automatización y analítica avanzada donde corresponda.
- Las 9 preguntas restantes se eliminan de i18n.
- **Datos estructurados:** el `FAQPage` se genera con estas mismas 6 preguntas por idioma, para que coincida con lo visible.

### 7. Contacto

- **Eyebrow:** "Agendar un diagnóstico". **H2:** "¿Tienes un problema de datos que vale la pena resolver?"
- **Texto:** "En una conversación inicial identificamos dónde la IA, la automatización o la analítica avanzada pueden generar impacto en tu organización."
- Se conservan los botones de WhatsApp y correo con sus indicaciones.
- `whatsappMessage` cambia a: "Hola Nancy, te escribo desde n-ai.dev. Me interesa agendar un diagnóstico para un proyecto de datos / IA."

### Menú y pie de página

- **Menú:** Servicios · Demos · Método · Quién lidera · FAQ · Contacto. Botón "Agendar diagnóstico" → `#contact`. Se mantiene el selector de idioma.
- **Pie de página:** mismo contenido, con el nuevo estilo y los enlaces nuevos.

## Sistema visual

Se cambian los **valores** de los tokens en `tailwind.config.ts` y `src/styles/tokens.css`, sin renombrarlos, para que todos los componentes cambien de forma pareja.

| Token | Valor |
|---|---|
| `bg.base` | `#0A1024` |
| `bg.deep` (nuevo) | `#070B18` |
| `bg.elevated` | `rgba(255,255,255,0.045)` |
| `border.subtle` / `border.strong` | `rgba(255,255,255,0.10)` / `rgba(255,255,255,0.16)` |
| `text.primary` / `secondary` / `muted` | `#FFFFFF` / `#9AA6BF` / `#7F8AA3` |
| `accent.cyan` (acento primario) | `#8FB4FF` |
| `accent.mint` (degradados) | `#35E0FF` |
| `accent.deep` | `#1A2C5E` |
| `danger` / `warn` (nuevo) | `#FF5D6C` / `#FFC35D` (solo en el tablero) |

- **Fondo:** degradado vertical `bg.base` → `bg.deep`. El hero agrega un halo radial azul arriba a la derecha y una cuadrícula de 48 px con máscara radial.
- **Tipografía:** sin cambios (Public Sans, Archivo, Instrument Serif).
- **Botones:** primario blanco con texto `bg.base`; secundario con borde blanco translúcido.
- **Tarjetas:** superficie `bg.elevated`, borde `border.subtle`, radio de 22 px.
- **Imagen OG** (`opengraph-image.tsx`): paleta nueva y titular nuevo.
- **Metadata:** se mantiene el título SEO; la descripción agrega automatización y analítica avanzada.

## Archivos

- **Nuevos:** `src/components/sections/LiveDashboard.tsx`, `Services.tsx`, `Method.tsx`, `Leadership.tsx`; `src/content/services.ts`.
- **Modificados:** `Hero.tsx`, `DemoShowcase.tsx`, `FAQ.tsx`, `Contact.tsx`, `Nav.tsx`, `Footer.tsx`, `src/app/_shell/HomeSections.tsx`, `tailwind.config.ts`, `src/styles/tokens.css`, `src/app/globals.css`, `src/content/i18n/es.ts`, `src/content/i18n/en.ts`, `src/components/seo/StructuredData.tsx`, `src/app/opengraph-image.tsx`, los dos `layout.tsx` (description), `public/llms.txt`, `HANDOFF.md`.
- **Eliminados si quedan sin uso** (verificar con búsqueda antes de borrar): `About.tsx`, `CaseStudyHero.tsx`, `CaseStudyDeepDive.tsx`, `IntelligencePipeline.tsx`, `Capabilities.tsx`, `BuildingInPublic.tsx`, `NetworkBand.tsx`, `ParticleNetwork.tsx`, `AuroraGradient.tsx`, `GridGlow.tsx`, `charts/*`, `content/caseStudy.sicop.ts`, `content/capabilities.ts` y sus claves de i18n. Si Recharts queda sin uso, se quita de `package.json`.

## SEO y buscadores con IA

- **`Service`:** una entidad por cada uno de los 4 servicios (antes 8 capacidades); las etiquetas van en la descripción.
- **`FAQPage`:** las 6 preguntas visibles por idioma.
- **`Organization`, `Person` y `WebSite`:** sin cambios, salvo la descripción.
- **`llms.txt`:**
  - quitar los enlaces a `#case-study` y `#pipeline`;
  - agregar `#servicios`, `#metodo` y `#quien-lidera`;
  - agregar automatización y analítica avanzada a la descripción;
  - mantener el texto del caso SICOP, que sigue siendo verdadero.
- Se mantienen las palabras clave de SICOP en metadata: el caso sigue presente en Demos y en la FAQ.

## Verificación

1. `pnpm lint` y `pnpm build` sin errores.
2. Revisión visual en español e inglés a 1440, 768 y 375 px, que confirme el criterio de éxito.
3. Con `prefers-reduced-motion` no hay animaciones en marcha.
4. Sin errores en la consola. Todos los enlaces internos (`#…`) llevan a una sección existente.
5. El tablero deja de animarse fuera de pantalla (verificado con el panel de rendimiento o un contador).
6. Lighthouse móvil: se mide antes de empezar, y el rendimiento no baja más de 5 puntos frente a esa medición.
7. Los datos estructurados se validan: cada `FAQPage` tiene exactamente las preguntas visibles de su idioma.
8. Se revisan todos los textos para confirmar que ninguno afirma que hay un equipo.

## Entrega

Commits en `feat/rediseno-consultora` → PR a `main` → vista previa de Vercel → revisión de Nancy → merge solo con su aprobación.

## Fuera de alcance

Páginas individuales por servicio, blog, agenda o calendario real para el diagnóstico, fotos de equipo, cambios de dominio, analytics o DNS.
