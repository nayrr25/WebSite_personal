# Crítica final del rediseño (impeccable) · 2026-09-14

Dos evaluaciones independientes sobre el build de producción local, antes de la tanda de correcciones posterior a la crítica (ver `2026-09-14-verificacion-rediseno.md`).

# Evaluación A · Crítica de diseño: portada de n-ai.dev, rediseño estilo C

## Veredicto de especificidad

**La parte de arriba es propia de N-AI; la mitad de abajo podría ser de cualquier consultora.** El hero y la banda del caso solo podrían existir para N-AI:
- el tablero recorre las 12 instituciones reales de SICOP;
- el aviso muestra "Institución L · 91/100";
- se nombra a la Contraloría y el retrato es de la fundadora.

Desde Método hacia abajo, en cambio, el patrón se repite en cada sección: eyebrow, H2 en Archivo 800 y rejilla de tarjetas con borde sutil. Los círculos numerados sobre una línea y la tarjeta de bio con cita y etiquetas son propios de la categoría. Dentro del estilo C la ejecución es limpia: tokens coherentes, halos contenidos y buen contraste. Pero pierde carácter a medida que se baja.

## Heurísticas de Nielsen

| # | Heurística | Nota | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | El tablero tiene EN VIVO y Pausar, y el caso tiene índice lateral activo. El menú principal no marca la sección actual. |
| 2 | Lenguaje del usuario | 3 | "Riesgo compuesto 62/100", "Postura de transparencia", "RFM" y "NIF y SUGEF" aparecen sin explicar. "Ver el caso SICOP" sale antes de decir qué es SICOP. |
| 3 | Control y libertad | 3 | Hay pausa, Escape y "Volver al inicio". Los carruseles móviles no indican cuántas tarjetas hay. |
| 4 | Consistencia | 3 | La tarjeta de demo se eleva al pasar el mouse aunque 5 de 6 no son enlaces. El CTA "Agendar diagnóstico" es un enlace plano en el menú móvil y termina en "Escribir por WhatsApp". |
| 5 | Prevención de errores | 3 | WhatsApp y el correo llegan con plantilla precargada. |
| 6 | Reconocer antes que recordar | 3 | Menú fijo con 5 anclas claras. |
| 7 | Flexibilidad | n/a | Es una portada. |
| 8 | Estética y minimalismo | 2 | Las mismas 3 cifras se repiten hasta 5 veces. Hay vacíos grandes en Quién lidera y Método. Demos mezcla sistemas vivos con conceptos. |
| 9 | Recuperación de errores | 3 | Si el `mailto` falla, el correo y el teléfono están visibles como texto. |
| 10 | Ayuda | 3 | La FAQ y "Qué pasa después" responden lo esencial, salvo precio y plazos. |

**Total: 26/36, banda "Bueno".** Queda por debajo de la meta de 28 del spec. La brecha está casi toda en la heurística 8 y en la tranquilidad que da el cierre.

## Carga cognitiva

- **Cifras duplicadas en el mismo pantallazo.** A 1440 px, ">2.4M" y "47" aparecen en la fila de cifras del hero y en los KPI del tablero, uno al lado del otro. Luego vuelven en Servicios (evidencia), en la banda del caso, en las credenciales de Quién lidera y en la FAQ.
- **Demasiados elementos en Quién lidera:** 6 etiquetas de áreas, 3 enlaces sociales, 4 credenciales y la cita, compitiendo entre sí.
- **Decisiones con más de 4 opciones visibles:**
  - cabecera de escritorio: 5 enlaces, el idioma y el CTA (7);
  - menú móvil: 6 enlaces;
  - Demos: 6 tarjetas con tres estados distintos;
  - Servicios: 4 tarjetas con 11 etiquetas y 5 sectores.

## Recorrido emocional

- **Pico:** el primer pantallazo. El aviso "Riesgo crítico detectado" sobre el tablero inclinado da el "esto es real" que buscaba el brief.
- **Segundo pico:** la banda del caso, con 7 fuentes, 47 patrones, 8 dimensiones y menos de 1 s.
- **Valle:** Método es genérico y visualmente vacío. En Demos, 3 de 6 tarjetas dicen "En construcción" o "Concepto" bajo el título "Sistemas en producción".
- **Final:** la banda de contacto está bien resuelta, con 3 pasos, "sin compromiso" y el nombre de Nancy. Pero no dice cuándo responde ni cuánto dura o cuesta el diagnóstico (el insumo I6 sigue pendiente). La respuesta sobre precio ("se cotiza según alcance") no alivia la duda justo antes del contacto.
- **Credibilidad:** para una consultora "senior", ver `nanyrr25@gmail.com` junto a los botones resta. Es una decisión consciente de Nancy, pero es un costo de persuasión.

## Fortalezas

1. **El tablero demuestra en vez de decorar.** Usa datos reales del caso, tiene pausa (WCAG 2.2.2), resumen para lectores de pantalla, estado final con movimiento reducido y se detiene fuera de pantalla. Cumple el estilo C con disciplina técnica.
2. **Contenido honesto y trazable.** Las líneas "Evidencia:" conectan cada servicio con una prueba, las instituciones van anonimizadas y no se inventa equipo. Coincide con el modo Persuadir sin exagerar.
3. **El paso al contacto quita fricción.** "Qué pasa después" en 3 pasos y los mensajes precargados ayudan. La página del caso tiene índice lateral, pipeline de 7 etapas y los 12 puntajes: da profundidad a quien la busca.

## Problemas prioritarios

**[P1] Las mismas cifras se repiten en toda la portada**
- **Qué pasa:** +400%, >2.4M y 47 aparecen en el hero, en el tablero (en el mismo pantallazo), en Servicios, en la banda del caso, en Quién lidera y en la FAQ.
- **Por qué importa:** en vez de mostrar amplitud, deja ver que todo descansa en un solo caso. Además, "+400%" no tiene contexto en el hero.
- **Arreglo:**
  - en los KPI del tablero, cambiar las cifras repetidas por datos reales del caso que no están en ningún otro lado: "2 críticas · 3 altas" (`tierCounts`) y el compuesto 62;
  - en Quién lidera, quitar la fila de credenciales o dejar solo "Investigación" con enlace a Scholar;
  - en el hero, añadir "en banca regulada" a "+400% créditos colocados".
- **Comando:** `/impeccable distill`

**[P1] La portada móvil mide 9.869 px, sobre la meta de 9.000**
- **Qué pasa:** las secciones más altas son el hero (1.385 px), Quién lidera (1.674), FAQ (1.332) y la banda del caso (1.105). Además, el aviso flota encima del panel y "EN VIVO" se parte en dos líneas.
- **Arreglo:**
  - retrato con proporción 16/9 y sin credenciales en móvil;
  - en móvil, las 3 preguntas destacadas de la FAQ pasan a acordeón;
  - datos de la banda en una sola fila de 4;
  - en el panel, `whitespace-nowrap` para "EN VIVO" y el título truncado.
- **Comando:** `/impeccable adapt`

**[P2] El contacto no da tranquilidad concreta**
- **Qué pasa:** "Nancy te responde" no dice en cuánto tiempo, y no se sabe qué es ni cuánto dura el "diagnóstico".
- **Arreglo:** poner un plazo de respuesta real (por ejemplo "en 1 día hábil", si Nancy lo confirma) y una línea tipo "Conversación de 30 min, sin costo", cuando llegue I6. Evaluar volver al correo del dominio en cuanto se verifique el reenvío.
- **Comando:** `/impeccable clarify`

**[P2] Vacíos de composición en Quién lidera y Método**
- **Qué pasa:** en escritorio, la tarjeta de bio se estira a la altura del retrato y deja unos 250 px vacíos entre las etiquetas y los enlaces sociales. Método ocupa 630 px con contenido de apenas unos 250.
- **Arreglo:** alinear la bio al inicio (`items-start`) o usar ese espacio para publicaciones (I8). Reducir el padding vertical de Método o sumar las duraciones de cada fase (I7).
- **Comando:** `/impeccable layout`

**[P3] Las tarjetas de demo prometen un clic que no existe**
- **Qué pasa:** `hover:-translate-y-1` en cinco `<article>` sin enlace, y la mitad no están en producción.
- **Arreglo:** dejar la elevación solo en la tarjeta de SICOP y separar visualmente "En producción" de "En desarrollo", o ajustar el H2.
- **Comando:** `/impeccable polish`

## Señales de alerta por persona

- **Jordan (primera visita):**
  - "SICOP" en el CTA secundario antes de explicarse;
  - "Riesgo compuesto 62/100" sin decir si más alto es peor;
  - "diagnóstico" sin definición ni precio.
- **Riley (pone todo a prueba):**
  - "Sistemas en producción" frente a tarjetas "Concepto";
  - el nivel de riesgo "bajo" usa el mismo cian que el acento de marca, así que en el gráfico parece que se destaca en vez de ser neutral;
  - tarjetas que se elevan sin ser enlaces;
  - correo de Gmail en una consultora senior.
- **Casey (móvil):**
  - áreas táctiles bajo 44 px: el selector EN (20 px), Pausar (26), "Ver el caso" (20) y los enlaces del pie (17);
  - carruseles sin contador;
  - en el primer pantallazo el tablero queda fuera y se ve un espacio vacío debajo de las cifras, aunque el spec lo permite.

## Observaciones menores

- El H2 de la banda del caso ocupa 5 líneas a 1440 px por la columna de 1.1fr. Conviene acortarlo o ensanchar la columna.
- El H1 en inglés ocupa 5 líneas en escritorio, frente a 4 en español.
- En la tarjeta "Crédito preaprobado · motor de decisión", el "·" queda al inicio de la segunda línea.
- Las píldoras de entregable en Método (12 px) se leen como metadato. Merecen más peso porque son la promesa.
- En el menú móvil, "Agendar diagnóstico" es un enlace más en la lista. Debería ser un botón.
- Hubo capturas en negro tras saltos de scroll por JavaScript. El DOM estaba sano y la vista volvió con la rueda del mouse, así que parece un problema de la herramienta de captura y no del sitio. No está confirmado.

## Tres preguntas incómodas

1. Si las mismas tres cifras aparecen cinco veces, ¿el visitante lee "experiencia profunda" o "solo tienen un caso"?
2. El CTA dice "Agendar" pero lleva a escribir por WhatsApp. ¿Qué ganaría la conversión con un plazo de respuesta explícito, aunque no haya agenda real?
3. ¿Serían más convincentes 3 demos vivas que 6 con la mitad en concepto?

---

# Evaluación B · Detector de impeccable (CLI y overlay)

**(a) CLI `detect --json src`**: exit 2, **1 hallazgo**
- `gradient-text` (warning): `src/app/globals.css:122`, clase `.text-grad` (el comentario del código dice "estilo C aprobado"). **Estético aprobado.**

**(b) URLs** (exit 2 en las cuatro; el JSON no trae archivo ni línea, solo el snippet)

`/` y `/en` dan resultados idénticos, **48 cada una**, todos warning:
- `ai-color-palette` ×11 (9 "Cyan gradient background", 2 "Cyan neon text"). Estético aprobado.
- `nested-cards` ×10 ("Card inside card", el panel dashboard con las cajas KPI y gráfico). Estético aprobado.
- `dark-glow` ×9 (glows #8fb4ff, #35e0ff, #4f86e6 y #7ff0c8 ×3, que son los puntos pulsantes). Estético aprobado.
- `radial-spotlight-glow` ×4 (#8fb4ff a0.18 sobre superficies de 278x431). Estético aprobado (halos).
- `icon-tile-stack` ×4 (tiles de 50px sobre los h3 de Servicios). Estético, pero no está en la lista del estilo C; lo decide la revisión de diseño.
- `gradient-text` ×3. Estético aprobado.
- `kicker-above-heading` ×2 ("Caso destacado", "Agendar un diagnóstico", y sus equivalentes en EN). Estético, fuera del estilo C.
- `text-occlusion` ×2: el toast de alerta tapa al 100% "EN VIVO"/"LIVE" y el botón "Pausar". **Accesibilidad real.** Lo verifiqué en el navegador a 1440x900:
  - En el centro de "EN VIVO" y del botón, `elementFromPoint` devuelve el `div` del toast, así que ese div se queda con el clic.
  - El toast tiene `lg:absolute lg:-right-4 lg:-top-7 z-10` y no tiene `pointer-events-none`: `src/components/sections/LiveDashboard.tsx:160`.
  - A 417px no se solapan, porque el toast va en el flujo normal.
- `low-contrast` ×2:
  - H1 "Consultoría experta en IA, automatización y": mínimo 1.6:1, **mediana 13.4:1**, calculado sobre el degradado. El mínimo sale de muestrear el degradado y los bordes. **Falso positivo.**
  - Título del panel "Caso SICOP · monitor de riesgo" sobre `backdrop-filter` (`backdrop-blur-md`): mínimo 1.1:1, **mediana 2.3:1** (necesita 4.5:1). La mediana también falla, pero el color declarado es `#C3CBDD` sobre `bg-navy-panel/80` y el muestreo de píxeles sobre backdrop-filter no es fiable. **No concluyente, probable falso positivo;** hay que medirlo a mano.
- `tight-leading` ×1 (1.23x, pide ≥1.3). Probablemente es `leading-tight` en texto grande: h3 de 22px en `Services.tsx:59` o la cita de 26–34px en `Leadership.tsx:51`. **Falso positivo** (en texto display ese interlineado es aceptable).

`/casos/sicop` y `/en/cases/sicop` también son idénticos, **31 cada una**:
- `ai-color-palette` ×14 (8 background, 6 neon text). Estético aprobado.
- `gradient-text` ×6 (H1 y números de datos). Estético aprobado.
- `kicker-above-heading` ×5 ("El reto", "Fuentes y arquitectura", "Capa de IA", "Instituciones", "Impacto"). Estético, fuera del estilo C.
- `dark-glow` ×2. Estético aprobado.
- `hero-eyebrow-chip` ×1 ("Caso de estudio" sobre el H1). Estético, fuera del estilo C.
- `layout-transition` ×1 (`transition: width`): la línea de 1px del índice lateral pasa de w-4 a w-8 en 200ms, `src/app/_shell/CaseSicop.tsx:105`. Es real, pero es un tema menor de rendimiento, no de accesibilidad.
- `low-contrast` ×2, ambos sobre texto con degradado:
  - "8": mínimo 2.9:1, **mediana 12.7:1**.
  - "<1 s": mínimo 1.9:1, **mediana 12.1:1**.
  - En los dos el mínimo sale de muestrear el degradado. **Falso positivo.**

**(c) Overlay en el navegador**
- **Preflight:** funcionó. El título cambió a "[Human] …" y apareció `impeccable-preflight-ok` en consola.
- **Live server:** arrancó en el puerto **8400** (pid 62367) e inyecté `detect.js`.
- **`/` a 1440x900:** "41 anti-patterns found".
  - Mismas reglas que el CLI, excepto que no aparecen `kicker-above-heading` ni `low-contrast`, `gradient-text` sale 1 vez y `text-occlusion` 1 vez (solo "EN VIVO").
  - Confirma que el toast tapa "EN VIVO" en ese momento (clases con `opacity-100`).
- **`/en`:** "40 anti-patterns found", sin `text-occlusion`. El solape depende del ciclo del toast, así que aparece de forma intermitente.
- **Cierre:** lo detuve con `live-server stop --keep-inject` ("Stopped live server on port 8400"). El pid ya no existe y el puerto 8400 no responde. Reseteé el viewport a "desktop" y cerré mi tab.

**(d) Resumen** (total de las 4 URLs = 158)

| regla | total en las 4 URLs | clasificación |
|---|---|---|
| ai-color-palette | 50 | estético aprobado |
| dark-glow | 22 | estético aprobado |
| nested-cards | 20 | estético aprobado (panel dashboard) |
| gradient-text | 18 | estético aprobado |
| kicker-above-heading | 14 | estético (fuera del estilo C) |
| low-contrast | 8 | 6 falsos positivos (degradado, mediana ≥12:1); 2 no concluyentes ("Caso SICOP · monitor de riesgo" sobre backdrop-filter, mediana 2.3:1, medir a mano) |
| radial-spotlight-glow | 8 | estético aprobado |
| icon-tile-stack | 8 | estético (fuera del estilo C) |
| text-occlusion | 4 | **accesibilidad real** (el toast tapa "EN VIVO" y el botón Pausar en ≥lg) |
| tight-leading | 2 | falso positivo (texto display) |
| hero-eyebrow-chip | 2 | estético (fuera del estilo C) |
| layout-transition | 2 | real pero menor (rendimiento; línea de 1px) |

El JSON crudo quedó en `/private/tmp/claude-501/-Users-nancyrodriguez/ddda1b6a-a3e9-4287-aa41-0fe1197bd6ed/scratchpad/`:
- `detect_src.json`
- `detect_root_.json`
- `detect_root_en.json`
- `detect_root_casos_sicop.json`
- `detect_root_en_cases_sicop.json`

---

# Evaluación C · Segunda ronda, tras las correcciones (commit a198ecf)

Revisor independiente distinto de A; misma referencia `critique.md`.

DEGRADADO: una sola pasada (hice de subagente revisor). No corrí el detector `impeccable detect` ni la evaluación B aislada. Todo lo que afirmo lo medí en el DOM. A 1440 las capturas del panel salen reducidas e ilegibles, así que ahí me apoyé en mediciones y no en la imagen.

# Crítica UX: portada N-AI (ES/EN) y caso SICOP

## 1. Veredicto de especificidad
La parte que distingue al sitio sí es propia. El tablero del hero usa los datos reales del caso: 12 instituciones anonimizadas, 8 dimensiones y compuesto 62, las mismas cifras de la página del caso. A eso se suman la Contraloría, SUGEF/NIF y los sectores. El resto sigue una plantilla que usaría cualquier consultora:
- El titular podría ser de cualquier empresa del rubro.
- Servicios son 4 tarjetas con ícono y etiquetas.
- El Método son 4 pasos numerados 01–04.
- El patrón etiqueta + H2 se repite 7 veces.
- La biografía es genérica ("con experiencia transformando problemas complejos…").

## 2. Heurísticas de Nielsen

| # | Heurística | Nota | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Buen menú fijo, botón Pausar y riel del caso con `aria-current`. Pero "EN VIVO" sobre una animación de datos históricos se entiende como monitoreo en tiempo real; lo aclara solo un pie de 12 px. |
| 2 | Coincidencia con el mundo real | 2 | "Agendar diagnóstico" promete una agenda y lleva a WhatsApp o correo. ">2.4M" usa formato inglés en la página en español. "+400% créditos colocados" no dice contra qué. En el caso aparece "Capa de IA · 8". |
| 3 | Control y libertad | 3 | Hay pausa, enlace de regreso a `/#caso-sicop` y el cambio de idioma conserva la ruta. Los carruseles no tienen indicador de posición. |
| 4 | Consistencia y estándares | 2 | Solo 2 de 4 servicios traen "Evidencia:". De 3 demos "En vivo", solo 1 tiene enlace. La misma cifra aparece en formatos distintos (">2.4M" frente a "2,4 millones"). |
| 5 | Prevención de errores | 3 | WhatsApp y correo abren con mensaje precargado (Organización/Objetivo/Plazo). Aquí no hay mucho que se pueda hacer mal. |
| 6 | Reconocer antes que recordar | 3 | Menú con texto y riel del caso. En celular, 4 servicios y 6 demos quedan escondidos; la única pista es que la siguiente tarjeta asoma un 18%. |
| 7 | Flexibilidad y eficiencia | n/a | Es una portada. |
| 8 | Estética y diseño minimalista | 2 | "47" aparece 4 veces y "SICOP" 6 en la portada. En celular la página mide 9.224 px (unas 11 pantallas) y el hero, 1.218 px. Además, el hero sale recortado en celular (P1). |
| 9 | Recuperación de errores | 3 | Si `mailto` falla, el correo está escrito en texto visible. Casi no hay estados de error posibles. |
| 10 | Ayuda y documentación | 2 | Las preguntas frecuentes explican cómo se cobra, pero no hay rangos. Faltan plazo de respuesta y duración/costo del diagnóstico (insumos pendientes). "Qué pasa después" no da tiempos. |
| **Total** | | **23/36 (64%)** | **Aceptable** |

## 3. Total
**23/36 = 64%, banda Aceptable.** Sin el recorte del hero en celular y con las etiquetas corregidas, estaría en la zona de "Bueno" (70% o más).

## 4. Carga cognitiva, recorrido emocional y fortalezas

**Carga cognitiva**
- **Primera pantalla de escritorio:** unos 12 datos a la vez. Son 2 botones de acción y 3 cifras de prueba, más un tablero con 3 KPI, gráfico, medidor, 4 barras y aviso flotante.
  - Tiene sentido para el estilo aprobado.
  - Pero las cifras de prueba mezclan dos casos (+400% es del crédito y el tablero es de SICOP), y eso cansa sin aportar.
- **Encabezado de escritorio:** 7 opciones (5 enlaces, idioma y botón). Es estándar y se acepta.
- **Carruseles en celular:** obligan a recordar qué tarjetas faltan, porque no hay contador ni puntos.
- **Jerga sin explicar:** RFM, scoring, pipeline, NIF/SUGEF.

**Recorrido emocional**
- **Picos:** el tablero del hero y la banda del caso.
- **Primer bajón, en Demos:** 5 de 6 tarjetas no llevan a ningún lado, y 2 de ellas dicen "En vivo".
- **Segundo bajón, en Quién lidera:** después de tanta prueba concreta, la biografía es abstracta.
- **En las preguntas desplegables:** "¿Quién hace consultoría de IA en Costa Rica?" se lee escrita para Google, no para una persona.
- **Cierre:** la banda de contacto tranquiliza ("sin compromiso", 3 pasos). Pero justo en el momento de mayor riesgo no dice cuándo llega la respuesta.
- **En celular:** el pico se rompe desde la primera pantalla por el recorte.

**3 fortalezas**
1. **Tablero honesto y accesible.** Usa datos reales del caso y trae:
   - botón Pausar (WCAG 2.2.2);
   - resumen solo para lector de pantalla;
   - respeto a `prefers-reduced-motion`;
   - pausa fuera de pantalla y con la pestaña oculta.
2. **Contacto sin fricción.** Mensaje de WhatsApp precargado, correo con plantilla y 3 pasos claros de "Qué pasa después".
3. **Buena narrativa en la página del caso.** Va de reto a fuentes, arquitectura, IA, instituciones e impacto. Tiene riel con sección activa, regreso al punto exacto de la portada y botón al final.

## 5. Problemas priorizados

**[P1] El hero se recorta en celular.**
- **Qué pasa:** a 390 px la columna del grid del hero mide 438,66 px dentro de un contenedor de 350 px. Como `#top` tiene `overflow:hidden`, no aparece scroll horizontal: el contenido simplemente se corta.
  - En español se cortan 89 px: el H1 ("automatizació…"), el subtítulo, el botón "Ver el caso S…" y la etiqueta "patrones de anomalía mo…". Lo confirmé con `elementFromPoint` (h1.right = 459).
  - En inglés se cortan 22 px.
- **Causa:** la fila de encabezado del tablero (título + "EN VIVO" sin salto de línea + Pausar) exige un ancho mínimo de 401 px. Con el padding del panel suben a 439 px, y el ítem del grid tiene `min-width:auto`.
- **Por qué importa:** es lo primero que ve cualquier visitante en celular, y la marca vende precisión.
- **Arreglo:** en `src/components/sections/Hero.tsx`, usar `grid-cols-[minmax(0,1fr)]` en el `Container` para móvil, o `min-w-0` en los dos `Reveal` hijos. Después verificar a 360, 375 y 390 en los dos idiomas.

**[P2] Etiquetas incorrectas en las cifras del caso.**
- **Qué pasa:** la tarjeta dice "Capa de IA · 8" y la siguiente, "para calcular un puntaje de riesgo · <1 s" (un fragmento en minúscula).
- **Por qué importa:** es la primera prueba que lee alguien escéptico, y la etiqueta no dice qué es el 8.
- **Arreglo:** en `src/app/_shell/CaseSicop.tsx` (el `dl` del header):
  - usar `t.caseBand.facts[2].label` en lugar de `c.sections.ai`;
  - escribir una etiqueta completa para la cuarta cifra, por ejemplo "Tiempo para calcular un puntaje".

**[P2] Demos que prometen más de lo que muestran.**
- **Qué pasa:** la sección se llama "Demos" y 3 tarjetas dicen "En vivo", pero solo SICOP tiene enlace. Crédito (+400%) y automatización no llevan a nada.
- **Por qué importa:** "demo en vivo" hace esperar algo que se puede abrir. Si no hay nada, parece humo.
- **Arreglo:** cambiar la insignia a "En producción" (`statusLabels` en `es.ts`/`en.ts`). Cuando la dueña entregue las cifras, agregar una mini-ficha para crédito y automatización. No inventar datos mientras tanto.

**[P2] Las cifras del hero no se sostienen solas.**
- **Qué pasa:** "+400%" no tiene línea base ni dice de qué caso es, y está al lado de un tablero de otro caso. ">2.4M" rompe el formato en español.
- **Arreglo:**
  - Etiqueta con origen, por ejemplo "créditos colocados · motor de preaprobación". Solo si la dueña confirma la línea base, agregarla.
  - Usar "2,4 M" en `es.ts`.

**[P2] Repetición, largo y verbo de la acción principal.**
- **Qué pasa:** "47" aparece 4 veces y la página en celular mide unas 11 pantallas. "Agendar" hace esperar un calendario.
- **Arreglo:**
  - Quitar el 47 de la evidencia de Servicios.
  - Cambiar el botón a algo como "Solicitar un diagnóstico", o conectar un calendario real.
  - Cuando la dueña lo entregue, poner el plazo de respuesta dentro del paso 2 de contacto ("Nancy te responde").

**[P3] Preguntas escritas para buscadores.**
- **Qué pasa:** "¿Quién hace consultoría de IA / inteligencia de compras públicas en Costa Rica?" aparecen visibles.
- **Arreglo:** mantener el formato de 3 destacadas + 3 desplegables, pero reescribirlas como preguntas de cliente, por ejemplo "¿Trabajan con instituciones públicas?". El texto para SEO puede quedarse en JSON-LD.

**[P3] Áreas táctiles pequeñas en celular.**
- LinkedIn, Scholar y GitHub en `Leadership.tsx`: 23 px de alto.
- Botón Menú en `Nav.tsx`: 38 px de alto.
- "Volver al inicio" en el caso: 20 px de alto.
- EN y Pausar sí llegan a unos 44 px gracias a su `::after`.

## 6. Señales por persona

**Primera visita**
- Tiene que adivinar qué es RFM, scoring, pipeline y NIF/SUGEF.
- "EN VIVO" le hace creer que ve instituciones reales en tiempo real.
- "Agendar" le hace buscar un calendario que no existe.

**Escéptico (comprador corporativo o institucional)**
- "+400%" no tiene base.
- "Capa de IA · 8" en el caso.
- 5 de 6 sistemas sin evidencia enlazable.
- "minutos, no semanas" en Impacto sin dato que lo respalde.
- Sin plazos ni rangos de costo (insumos pendientes).
- Método sin duración por fase (insumo pendiente).
- La biografía no dice años, sectores ni organizaciones.

**Móvil**
- El hero se recorta (P1).
- Los botones de acción quedan bien ubicados (399–448 px, dentro de la primera pantalla).
- En móvil el tablero oculta el KPI compuesto y el medidor, así que el 62 no se ve.
- Carruseles sin indicador.
- Páginas muy largas: la portada suma 9.224 px; Quién lidera mide 1.290 px y las preguntas frecuentes, 1.280 px.
- En el caso, el riel se oculta y no hay otra navegación interna en 6.626 px de página.

**Observaciones menores**
- **Anclas en dos idiomas:** `#contact` va en inglés y el resto (`#servicios`, `#metodo`) en español.
- **Textos del tablero pequeños:** las etiquetas miden 12 px en color #8C98B3. El contraste es suficiente, pero son chicas.
- **Nitidez del retrato (no confirmado):** el archivo es de 880×880 y en escritorio se muestra en 476×297 px a densidad 2×, recortado a 16:10, así que puede verse algo suave. El `naturalWidth` reportó 391; revisar en un navegador real.
- **Evidencia desigual:** Analítica/BI y Arquitectura no tienen "Evidencia:"; las tarjetas quedan de igual alto pero se ven con menos contenido.

Preguntas a la dueña omitidas: soy un subagente y la conversación la lleva el agente principal.

Estado: no edité archivos. Cerré la pestaña que abrí y dejé el viewport de la pestaña principal en "desktop".