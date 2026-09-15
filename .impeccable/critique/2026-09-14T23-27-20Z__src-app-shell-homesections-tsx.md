---
target: portada de n-ai.dev y dirección C
total_score: 18
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 4
target_identity: "file:/Users/nancyrodriguez/WebSite_personal/src/app/_shell/HomeSections.tsx"
target_fingerprint: "sha256:891363c2511c2e217438605a590d37028e8239a635c5201e4feaef49dc08a9fa"
target_path: /Users/nancyrodriguez/WebSite_personal/src/app/_shell/HomeSections.tsx
timestamp: 2026-09-14T23-27-20Z
slug: src-app-shell-homesections-tsx
---
# Crítica de diseño · n-ai.dev (portada) y dirección aprobada C

- **Fecha:** 2026-09-14
- **Herramientas:** `/impeccable critique`, emil-design-eng, redesign-existing-projects
- **Método:** dos evaluaciones independientes que no compartieron resultados. A es la revisión de diseño (código + navegador, 1440 px y 375 px). B es el detector de impeccable y la evidencia del navegador.
- **Objetivo evaluado:** portada actual (`src/app/_shell/HomeSections.tsx`, https://n-ai.dev) y la dirección aprobada C ([especificación](../specs/2026-09-14-rediseno-consultora-design.md) + [maqueta](../specs/assets/2026-09-14-maqueta-propuestas.html)).
- **Evidencia cruda del detector:** [`assets/detect-live-es.json`](assets/detect-live-es.json) (página publicada), [`assets/detect-src.json`](assets/detect-src.json) (código), [`assets/detect-mockup.json`](assets/detect-mockup.json) (maqueta).

## Puntaje de diseño (sitio actual)

| # | Heurística | Nota | Problema principal |
|---|---|---|---|
| 1 | Visibilidad del estado | 2 | El menú está invisible e inactivo hasta 80 px de scroll. En móvil, el botón de menú no responde arriba |
| 2 | Lenguaje del usuario | 2 | Jerga y anglicismos ("lineage", "superficie ejecutiva", "aguas abajo") para quien compra consultoría |
| 3 | Control y libertad | 2 | Las 5 tarjetas de demo dicen "Ver caso de estudio" y enlazan a `#slug` que no existen |
| 4 | Consistencia | 2 | "Tema · Oscuro" en un sitio claro, plural de equipo en un sitio de una sola persona, nombres del menú distintos a los de las secciones |
| 5 | Prevención de errores | 3 | Canales de contacto explicados y correo con plantilla |
| 6 | Reconocer antes que recordar | 2 | 21.000 px en escritorio y 30.000 px en móvil; solo el caso tiene índice |
| 7 | Flexibilidad y eficiencia | n/a | Landing sin usuarios recurrentes |
| 8 | Estética y minimalismo | 1 | Cifras repetidas 3 o más veces, 15 preguntas frecuentes, y partículas, cinta y degradado animados a la vez |
| 9 | Recuperación de errores | 2 | Los enlaces rotos fallan en silencio |
| 10 | Ayuda y documentación | 2 | FAQ escrita para buscadores; faltan precio, cómo empezar y plazos |
| **Total** | | **18/36** | **Aceptable (50%), en el límite con Pobre** |

## ¿El diseño es propio de N-AI o sirve para cualquier consultora?

**Revisión de diseño.** Sin el caso SICOP, la página podría ser de cualquier consultora de datos:
- Logo gigante centrado, red de partículas, H1 con degradado azul animado y cinta de píldoras en mayúsculas.
- Todas las secciones repiten la misma receta (etiqueta en mayúsculas, H2, párrafo gris, cuadrícula de tarjetas, mismo padding).
- Lo único propio (SICOP, el motor de crédito, la formación de economista y estadística) está enterrado en 6.600 px de prosa técnica.

**Detector sobre la página publicada: 76 hallazgos** (74 warnings, 2 advisory). Confirma la revisión de diseño y agrega detalles que esta no vio:

| Grupo | Reglas | Qué significa |
|---|---|---|
| Huellas de plantilla de IA (16) | `radial-spotlight-glow` ×7, `gradient-text` ×3, `ai-color-palette` ×2, `kicker-above-heading` ×2, `marquee` ×1, `codex-grid-background` ×1 | Coincide con el veredicto de que la página sirve para cualquier consultora |
| Piso tipográfico y accesibilidad (55) | `undersized-ui-text` ×22, `tiny-text` ×9, `wide-tracking` ×10, `low-contrast` ×9, `all-caps-body` ×5 | Etiquetas de 10 px en el medidor de riesgo ("bajo", "medio", "alto", "Índice de Riesgo"), "Founder · N-AI" a 10 px, texto `#828BA0` sobre `#F3F5F9` a 3,1:1 (la revisión de diseño midió 3,2:1), eyebrows en mayúsculas con tracking 0.18em |
| Estructura (5) | `nested-cards` ×2, `line-length` ×2, `shape-assembled-illustration` ×1 | Tarjetas dentro de tarjetas y líneas de unos 85 caracteres. La revisión de diseño no los había detectado |

**Detector sobre el código (`src`): 0 hallazgos.** No es una señal limpia: el análisis estático de TSX con Tailwind no puede evaluar contraste ni brillos. La evidencia válida es el escaneo de la página publicada.

**Overlay en el navegador: no disponible.** La inyección funcionó, pero la CSP del sitio bloqueó `http://localhost:8400/detect.js` (`script-src`). No hay overlay visible. El live server se detuvo.

**Detector sobre la maqueta: 32 hallazgos; 7 son propios del estilo C** (el aprobado): `dark-glow` ×2-3, `gradient-text` (H1 en serif), `pulsing-dot` ("EN VIVO"), `radial-halo`, `codex-grid-background` y `low-contrast` (ícono del aviso emergente). Descartados como falsos positivos: `skipped-heading` (notas de la maqueta), `broken-image` (el `src` se asigna por JS) y `flat-type-hierarchy` (mezcla con las notas).

## Impresión general

La página actual es sólida en contenido y débil en dirección. El trabajo real está, pero enterrado bajo efectos de plantilla de IA y demasiado texto. **La mayor oportunidad** es que el primer pantallazo diga "consultora experta" y muestre una prueba creíble. El riesgo es que la dirección C, tal como está en la maqueta, cambie una plantilla de IA clara por una plantilla de IA oscura.

## Lo que funciona

1. **Cifras reales y bien marcadas.** `<dl>` semántico con `tabular-nums`, sin inflar nada (+400%, >2.4M, 47).
2. **El caso SICOP tiene profundidad real.** Índice fijo, numeración 01–07 y gráfico de anomalías: demuestra pericia de verdad.
3. **Contacto pensado para Costa Rica.** WhatsApp como canal principal, indicación en cada canal, `:focus-visible`, `scroll-margin-top` y `useReducedMotion` respetado.

## Problemas prioritarios

1. **[P1] El primer pantallazo no dice "consultora experta".**
   - *Por qué importa:* es el objetivo principal. El logo ocupa media pantalla móvil, el H1 no nombra la categoría y el botón principal lleva al caso, no al contacto.
   - *Arreglo:* H1 con categoría y mercado; logo solo en el menú; "Agendar un diagnóstico" como acción principal; quitar partículas y cinta.
   - *Comando:* `/impeccable clarify` + `/impeccable bolder`.
2. **[P1] La dirección C todavía se ve como plantilla de IA.**
   - *Por qué importa:* 7 hallazgos del detector sobre C y la revisión de diseño coinciden. Texto con degradado azul→cian, punto rojo pulsante, halo, cuadrícula, panel inclinado. Además, datos al azar con números que se contradicen (medidor en 0.82 frente a "riesgo promedio 0.34") y un contador que sube, lo que resta credibilidad a la cifra real ">2.4M".
   - *Arreglo:* tinta sólida en el H1, una sola capa de ambiente, estado en texto ("Actualizado 14:02 · datos simulados"), repetición determinista de datos agregados con unidades y fuente, aviso sin bucle y botón de pausa (WCAG 2.2.2), panel plano.
   - *Comando:* `/impeccable quieter` + `/impeccable polish`.
3. **[P1] Longitud y arquitectura.**
   - *Por qué importa:* 30.000 px en móvil, con el contacto a unas 35 pantallas. El caso de 6.600 px vive en la portada.
   - *Arreglo:* llevar el caso a su propia página (`/casos/sicop`), dejar en la portada un resumen de resultados enlazado y apuntar a unas 8 pantallas.
   - *Comando:* `/impeccable distill`.
4. **[P1] Piso de accesibilidad.**
   - *Por qué importa:* 55 hallazgos del detector (texto de 10 px, contraste de 3,1:1, mayúsculas con tracking amplio) y un menú que no se puede usar arriba en móvil.
   - *Arreglo:*
     - texto funcional de al menos 12 px;
     - contraste AA en todo el texto tenue;
     - como máximo dos eyebrows en mayúsculas;
     - menú siempre visible, que solo cambie el fondo al hacer scroll.
   - *Comando:* `/impeccable harden` + `/impeccable typeset`.
5. **[P2] Detalles que delatan descuido.**
   - *Por qué importa:* le quitan credibilidad a un sitio que se presenta como senior.
   - *Casos:*
     - enlaces de demo rotos;
     - "Tema · Oscuro" en un sitio claro;
     - plural de equipo ("Diseñamos", "Cómo trabajamos") en un sitio de una sola fundadora;
     - 0 estados `active:` y 57 `hover:` sin limitar a `(hover: hover)`;
     - `transition-all`;
     - `metadataBase` sin definir: la imagen para redes sociales se arma con `localhost:3000`, según aviso del build.
   - *Comando:* `/impeccable polish`.

## Señales de alarma por persona

- **Jordan (visita por primera vez):**
  - el H1 no dice qué vende N-AI;
  - no queda claro el siguiente paso ("Explorar Casos" frente a "Trabaja con N-AI");
  - jerga en el caso y el Pipeline.
- **Riley (pone todo a prueba):**
  - las tarjetas de demo prometen un caso que no existe;
  - "Tema · Oscuro" contradice lo que ve;
  - el menú se parte cerca de 800 px;
  - los valores de riesgo (78, 62…) no dicen que son ilustrativos.
- **Casey (móvil, con prisa):**
  - el menú no responde arriba;
  - el H1 empieza a 341 px;
  - el botón principal queda en el borde de la pantalla (757 de 812 px) y las cifras, fuera;
  - el contacto está a unas 35 pantallas;
  - la cinta usa texto de 11 px.

## Nivel senior: cómo elevar la dirección C

| Antes (lo planeado) | Después (nivel senior) | Por qué |
| --- | --- | --- |
| H1 en serif itálica con degradado azul→cian | Tinta sólida; énfasis por contraste de familia o peso | El texto con degradado es la huella número 1 de sitios de IA (detector: `gradient-text`) |
| Punto pulsante, halo radial, cuadrícula enmascarada y brillo del panel | Una sola capa de ambiente; estado en texto | Tres efectos de brillo se leen como plantilla (detector: `dark-glow`, `pulsing-dot`, `radial-halo`) |
| Datos al azar, "Institución A–D", aviso cada 3,4 s, contador que sube | Repetición determinista, unidades y fuente, aviso único y botón de pausa | Números que se contradicen delatan que son falsos |
| Panel con `rotateY(-11deg)` | Plano o inclinación mínima estática | Cliché de Dribbble; el texto de 11 px rotado se lee peor |
| 4 tarjetas de servicio iguales con ícono lucide y luz que sigue al mouse | Un servicio ancla con su caso y 3 en lista editorial | La cuadrícula de 4 tarjetas iguales sirve para cualquier sitio |
| Método: 4 círculos con destello infinito | Línea de tiempo con duración por fase y miniatura del entregable; animación solo al entrar | "Método probado" sin evidencia es una afirmación vacía |
| Eyebrow en mayúsculas en todas las secciones | Máximo dos; en el resto, numeración editorial | Detector: `wide-tracking` ×10 y `all-caps-body` ×5 |
| FAQ en acordeón | Precio, cómo empezar y en qué se diferencia, abiertas; el resto en acordeón | Esconder el precio frena la conversión |
| Credenciales en 4 tarjetas iguales | Caso con contexto → rol de Nancy → resultado → periodo; publicaciones con título y año | Es lo que busca quien compra consultoría |
| H1 de hasta 76 px y cifras de 30 px | H1 de hasta unos 96 px con interlineado 0.95; cifras de 56–72 px con unidad en peso menor | La escala actual es tímida para un sitio que quiere impactar |
| Sin `:active` y hover sin limitar | `active:scale-[0.97]` de 120 ms; hover solo con `(hover: hover)` | Sin respuesta al tocar; hover "pegado" en pantallas táctiles |
| Entradas de 0,9 s, barras de 1,2 s animando `width` | ≤300 ms en UI con `cubic-bezier(.23,1,.32,1)`; barras con `scaleX` | Principios de Emil Kowalski: solo `transform`/`opacity` |
| Movimiento reducido = todo estático | Quitar desplazamientos y conservar fundidos breves | Movimiento reducido es menos movimiento, no cero |
| `min-height:100vh` | `100svh`/`100dvh` | La barra del navegador móvil tapa el botón |
| "Tablero visible sin scroll a 375 px" con el tablero debajo en móvil | Tablero mínimo para móvil (un KPI y un gráfico pequeño) o corregir el criterio | El criterio de la especificación es imposible de cumplir |
| Degradado navy plano | Grano sutil del 2–3% | Sin textura, el fondo se ve digital y genérico |
| Todas las secciones con el mismo ancho y padding | Banda completa para el caso, columna estrecha para "Quién lidera", tabla densa para el método | Ritmo y asimetría |
| "Diseñamos…", "Cómo trabajamos" | "N-AI diseña…" o primera persona singular | Choca con la restricción de no hablar de equipo |
| Navy + azul eléctrico | Color de marca propio, por ejemplo el rojo de alerta de SICOP | Es el color por defecto de las consultoras de IA de 2024–2026 (detector: `ai-color-palette`) |

## Observaciones menores

- `GradientText` con animación infinita de 8 s.
- `Reveal` de 600 ms en cada bloque.
- Las ilustraciones de las demos siguen con `#5EE9F0` y `#7CF5C4` del tema oscuro anterior.
- Hay 9 textos de 10 px en `RiskScoreGauge`.

## Preguntas para pensar

1. Si SICOP es la prueba más fuerte, ¿por qué el rediseño lo saca de la portada y pone en su lugar un tablero con datos simulados?
2. ¿Qué frase de la página solo podría decirla N-AI?
3. ¿Qué recibe exactamente quien pulsa "Agendar un diagnóstico": duración, costo, entregable?
