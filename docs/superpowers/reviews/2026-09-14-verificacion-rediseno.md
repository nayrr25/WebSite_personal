# Verificación del rediseño N-AI (estilo C) · 2026-09-14

Rama `feat/rediseno-consultora` · PR https://github.com/nayrr25/WebSite_personal/pull/12 (abierto, sin merge).

Solo valores observados. Medido sobre el build de producción local (`next build` + `next start -p 3100`, Node 22.23.2), porque la vista previa de Vercel está protegida por SSO (responde 302).

## Criterios de éxito de la especificación

| # | Criterio | Meta | Observado | Estado |
|---|---|---|---|---|
| 1 | Primera pantalla comunica "consultora experta en IA, automatización y analítica" | Titular, CTA y cifras visibles sin scroll | 1440×900: la fila de cifras termina en y=854 y el panel en y=754. 390×844: la fila de cifras termina en y=672. Sin desbordamiento horizontal ni errores de consola | Cumple |
| 2 | Detector de impeccable sin fallas de legibilidad | 0 undersized / tiny / line-length; accesibilidad real resuelta | 0 undersized, tiny y line-length. `text-occlusion` 2 → 0 y `layout-transition` 1 → 0 tras las correcciones. El resto son rasgos del estilo C aprobado o falsos positivos (ver abajo) | Cumple, con explicación |
| 3 | Crítica de diseño (heurísticas de Nielsen) | ≥ 28/36 (sitio anterior: 18/36) | Primera ronda: 26/36. Segunda ronda (otro revisor, tras las correcciones): **23/36** | No cumple |
| 4 | Alto de la portada en celular (390 px) | ≤ 9.000 px | Español: 13.045 → 12.257 → 9.869 → **9.425 px**. Inglés: 9.602 → **9.079 px** | No cumple (español +425 px, inglés +79 px) |

### Sobre la nota de la crítica

- Las dos rondas las hicieron revisores distintos, así que la diferencia 26 → 23 mezcla cambios del sitio con variación entre revisores. Ninguna llega a 28.
- La ronda C sí encontró un defecto real introducido por la tanda de correcciones: con "EN VIVO" sin partirse, la cabecera del tablero fijó un ancho mínimo de 439 px, la columna del hero no podía encogerse y `overflow:hidden` recortaba titular, subtítulo y botón en celular (89 px en español a 390 px). No aparecía como scroll horizontal, por eso la medición anterior no lo detectó.
- Se corrigió con `grid-cols-[minmax(0,1fr)]` en el hero. Verificado sin recorte a 360, 375 y 390 px en español y a 390 px en inglés. Las alturas de celular de la tabla son las posteriores a esta corrección (las de 9.224 / 8.978 px se midieron con el hero recortado y no son válidas).
- No se hizo una tercera ronda: la verificación visual es acotada por diseño y los hallazgos restantes de C dependen de contenido o de decisiones de la dueña (ver abajo).

## Detector de impeccable, pasada posterior a la crítica

Evidencia: `assets/detect-post-critica-{es,en,caso-es,caso-en}.json`.

| Página | Hallazgos antes | Hallazgos después | Cambios |
|---|---|---|---|
| `/` y `/en` | 48 | 46 | `text-occlusion` 2 → 0; `low-contrast` 2 → 1; `dark-glow` 9 → 10 |
| `/casos/sicop` y `/en/cases/sicop` | 31 | 31 | `layout-transition` 1 → 0; `dark-glow` 2 → 3 |

- `dark-glow` +1: el detector cuenta el brillo de los puntos que pulsan y el resultado depende del instante de la muestra. No hubo cambio de código en esos brillos.
- `low-contrast` que queda: título del panel "Caso SICOP · monitor de riesgo" sobre `backdrop-blur`. Medido a mano mezclando `#0C1328` al 80 % sobre el fondo: 11,41:1 sobre el fondo base, 10,77:1 en el centro del halo `#1A2C5E` y 10,66:1 con la línea de cuadrícula encima. **Falso positivo** (el muestreo de píxeles no es fiable sobre backdrop-filter).
- `nested-cards`, `ai-color-palette`, `gradient-text`, `radial-spotlight-glow`: rasgos del estilo C aprobado por la dueña (ver la especificación, revisión 3).

## Correcciones aplicadas tras la primera crítica

| Hallazgo | Corrección | Verificación |
|---|---|---|
| El aviso del tablero tapaba "EN VIVO" y "Pausar" en lg y se quedaba con el clic | `pointer-events-none` y `lg:-top-16` | 1440×900: el aviso termina en y=182 y Pausar empieza en y=198; `elementFromPoint` en el centro de Pausar devuelve el botón |
| Cifras del hero repetidas en el tablero y en Quién lidera | KPI del tablero con datos del caso que no aparecen en otro lado: 5/12 instituciones en alerta, 2/12 en riesgo crítico, compuesto 62/100. Se quitó la fila de credenciales | Prueba `tests/i18n.test.mts` |
| Vacío de 234 px en la tarjeta de bio (escritorio) | Retrato `lg:aspect-[16/10]` | Ambas tarjetas 428 px; vacío 32 px |
| Tarjetas de demo que se elevan sin ser enlace | Elevación solo en la tarjeta del caso SICOP | Revisión de código |
| Áreas táctiles menores de 44 px | Pausar e idioma con área ampliada; enlaces del pie y "Ver el caso" con `min-h-11`; CTA del menú móvil como botón | Enlace del pie: 44 px medidos |
| "EN VIVO" partido en dos líneas en celular | `whitespace-nowrap` y título truncado | 390 px: 16 px de alto (una línea) |
| (Ronda C) Hero recortado en celular por la corrección anterior | `grid-cols-[minmax(0,1fr)]` y `minmax(0,…)` en lg | Sin recorte a 360/375/390 px |
| (Ronda C) Etiquetas del caso: "Capa de IA · 8" y "para calcular un puntaje de riesgo · <1 s" | "dimensiones de riesgo institucional" y "tiempo para calcular un puntaje de riesgo" | Revisión de código |
| (Ronda C) Insignia "En vivo" en demos sin enlace | "En producción" / "In production" | Revisión de código |
| (Ronda C) Áreas táctiles de LinkedIn/Scholar/GitHub (23 px), Menú (38 px), "Volver al inicio" (20 px) | `min-h-11` | Revisión de código |
| Índice lateral del caso animaba `width` | `transform: scaleX` | Detector: `layout-transition` 0 |

## Pruebas y build

- `node --test tests/*.test.mts`: **27 pruebas, 27 pasan**.
- `npm run build` con Node 22.23.2: compila, 9 páginas estáticas. Primera carga de JS: 156 kB en `/`.

## Lighthouse (celular)

- Producción antes del rediseño: **76** (`assets/lighthouse-antes.json`).
- Build local del rediseño: **94** (`assets/lighthouse-despues-local.json`).
- Indicativo: la vista previa de Vercel no se pudo medir por el SSO, y un servidor local no reproduce la red de producción.

## Insumos pendientes de la dueña

| Insumo | Qué falta | Dónde se usa |
|---|---|---|
| I1 | Serie temporal real de SICOP, si existe | Gráfico de la página del caso |
| I5 | Rol, resultado y periodo del caso | Página del caso |
| I6 | Diagnóstico: duración, costo, entregable y plazo de respuesta | Contacto y FAQ (la crítica lo marca como la mayor fuente de duda antes del contacto) |
| I7 | Duración de cada fase | Sección Método |
| I8 | Publicaciones confirmadas | Quién lidera |
| I9 | Cifras del caso de automatización: volumen ingestado, tiempo ahorrado, frecuencia de reportes | Tarjeta de demo y servicio de automatización |

## Pendiente fuera de alcance

Decisiones de contenido que la ronda C propone y que no se aplicaron sin la dueña:
- Botón "Agendar un diagnóstico" lleva a WhatsApp o correo: cambiar el verbo (por ejemplo "Solicitar") o conectar un calendario real.
- "+400% créditos colocados" sin línea base ni origen; ">2.4M" en formato inglés dentro de la página en español.
- "47" aparece 4 veces en la portada (quitarlo de la evidencia de Servicios).
- Preguntas de la FAQ escritas para buscadores ("¿Quién hace consultoría de IA en Costa Rica?").
- Biografía sin años, sectores ni organizaciones; carruseles sin indicador de posición.

- Alto en celular en español (9.224 px): la crítica propone retrato 16/9 en celular, FAQ destacada como acordeón en celular y cifras de la banda en una fila. Son cambios de composición que conviene aprobar antes.
- Correo del dominio: volver a `@n-ai.dev` cuando se confirme que recibe correo.
