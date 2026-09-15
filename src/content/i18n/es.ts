// Spanish — default/primary language.
// Keep keys in sync with en.ts. If you add a key here, add it to en.ts (TS will complain otherwise).

export const es = {
  brand: {
    tagline: "Datos · Insights · IA",
    subBrand: "Neural Analytics & Intelligence",
  },
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

  sicop: {
    eyebrow: "Caso de Estudio Destacado",
    title: "Inteligencia de Compras Públicas",
    subtitle:
      "Arquitectura completa de inteligencia para SICOP — detección de anomalías, risk scoring y monitoreo preventivo.",
    architecturePreviewTitle: "Vista previa de arquitectura",
    architecturePreviewBody:
      "Las fuentes alimentan el pipeline; el pipeline produce inteligencia; la inteligencia activa la capa ejecutiva — cada componente rastreable de punta a punta.",
    archCells: [
      ["Fuentes", "Solicitudes · Adjudicaciones · Contratos"],
      ["Pipeline", "7 etapas · Replicable · Auditado"],
      ["Capa de IA", "47 patrones · Scoring explicable"],
      ["Resultados", "Índice de riesgo · Triage · Drilldown"],
    ] as ReadonlyArray<readonly [string, string]>,
    archNodes: [
      { label: "Fuentes", sub: "SICOP" },
      { label: "Pipeline", sub: "7 etapas" },
      { label: "Capa de IA", sub: "Anomalía + Riesgo" },
      { label: "Resultados", sub: "Ejecutivo" },
    ],
    kpis: [
      { value: ">2.4M", label: "Registros de compras analizados" },
      { value: "47", label: "Patrones de anomalía modelados" },
      { value: "8", label: "Dimensiones de riesgo institucional" },
      { value: "<1s", label: "Latencia de scoring de riesgo" },
    ],
    sections: [
      {
        id: "challenge",
        number: "01",
        title: "El Reto",
        lead:
          "Las compras públicas operan sobre ecosistemas opacos: datos fragmentados, taxonomías inconsistentes y supervisión que llega después del daño.",
        body:
          "Auditores, reguladores y tomadores de decisión enfrentan un problema que se acumula — millones de transacciones cruzando miles de instituciones, codificadas en esquemas heterogéneos. El resultado es supervisión reactiva: las anomalías se descubren cuando las irregularidades ya escalaron a casos legales, y los patrones de riesgo sistémico nunca se modelan. La brecha no son los datos — es la inteligencia.",
      },
      {
        id: "infrastructure",
        number: "02",
        title: "Infraestructura de Datos",
        lead:
          "Inventario y estructuración del ecosistema completo de SICOP — cada fuente, cada esquema, cada relación.",
        body:
          "Mapeamos el grafo de datos de SICOP de punta a punta: solicitudes, adjudicaciones, contratos, adendas, registro de proveedores, sanciones, metadatos institucionales. Cada fuente fue inventariada, esquemas reconciliados y relaciones modeladas en un grafo unificado sobre el cual los pipelines aguas abajo pueden razonar.",
      },
      {
        id: "pipeline",
        number: "03",
        title: "Pipeline de Inteligencia",
        lead:
          "Pipeline de siete etapas, desde la extracción cruda hasta el monitoreo preventivo — la columna vertebral del sistema.",
        body:
          "Cada etapa es testeable, observable y replicable de forma independiente. Las fuentes crudas fluyen por extracción, inventario estructural, unificación, validación, detección de anomalías, scoring de riesgo y luego a la capa de monitoreo que alimenta la vigilancia ejecutiva.",
      },
      {
        id: "anomaly",
        number: "04",
        title: "Detección de Anomalías con IA",
        lead:
          "Cuarenta y siete patrones de anomalía modelados sobre señales temporales, estructurales y de comportamiento.",
        body:
          "Detectores basados en reglas capturan lo obvio; modelos aprendidos descubren lo sutil: velocidad inusual de adjudicación, deriva en concentración de proveedores, rupturas de precio frente a baselines de pares y secuencias de adendas que estadísticamente preceden irregularidades. Los resultados son priorizados, rankeados y explicables.",
      },
      {
        id: "risk",
        number: "05",
        title: "Sistema de Risk Scoring",
        lead:
          "Ocho dimensiones de riesgo institucional compuestas en un solo score ejecutivo, con componentes trazables.",
        body:
          "Cada institución lleva un score que se descompone en las dimensiones sobre las cuales auditores y decisores realmente razonan: velocidad de contratación, concentración de proveedores, dispersión de precios, exposición a adendas, proximidad a sanciones, postura de transparencia, madurez de controles y densidad histórica de señales.",
      },
      {
        id: "institutional",
        number: "06",
        title: "Inteligencia Institucional",
        lead:
          "Una sola superficie ejecutiva donde cada institución tiene su perfil de riesgo, comparadores y tendencia.",
        body:
          "Un triage estilo heatmap muestra la población de un vistazo; los drilldowns revelan series de tiempo, contribuciones de anomalía y eventos históricos. La misma superficie responde dos preguntas a la vez: dónde mirar primero y por qué.",
      },
      {
        id: "impact",
        number: "07",
        title: "Impacto Estratégico",
        lead:
          "Tres resultados ejecutivos que el sistema desbloquea — medibles en meses, no trimestres.",
        body:
          "La supervisión preventiva reemplaza la auditoría reactiva. La velocidad de decisión mejora porque el riesgo es visible en la superficie, no enterrado en registros. Y la transparencia se vuelve un entregable, no una aspiración.",
      },
    ],
    challengePoints: [
      "Ecosistemas opacos de compras públicas",
      "Fuentes de datos fragmentadas y heterogéneas",
      "Taxonomías inconsistentes entre instituciones",
      "Supervisión reactiva — las irregularidades emergen después del daño",
      "Patrones de riesgo sistémico que nunca se modelan",
    ],
    infrastructureSources: [
      "Solicitudes",
      "Adjudicaciones",
      "Contratos",
      "Adendas",
      "Registro de Proveedores",
      "Sanciones",
      "Metadatos Institucionales",
    ],
    infrastructure: {
      ingestionTitle: "Ingesta",
      ingestionItems: [
        "Extracción continua",
        "Reconciliación de esquemas",
        "Captura de lineage",
        "Reglas de validación",
      ],
      unifiedTitle: "Grafo Unificado",
      unifiedBody:
        "Esquema canónico. Relaciones cross-source modeladas. Transformaciones replicables. Sustrato para cada señal aguas abajo.",
      sourcesLabel: "Fuentes",
    },
    pipelineLinkLabel: "Ver el pipeline de siete etapas en acción",
    pipelineNodes: [
      {
        label: "Extracción de Datos",
        description: "Extrae registros crudos de cada fuente SICOP de manera continua.",
      },
      {
        label: "Inventario y Estructuración",
        description: "Cataloga cada campo, documenta cada relación, versiona cada esquema.",
      },
      {
        label: "Unificación de Datos",
        description: "Reconcilia esquemas heterogéneos en un grafo canónico único.",
      },
      {
        label: "Reglas de Validación",
        description: "Aplica tipado, lineage y consistencia referencial antes del uso aguas abajo.",
      },
      {
        label: "Detección de Anomalías con IA",
        description:
          "Puntúa 47 patrones de anomalía sobre señales temporales, estructurales y de comportamiento.",
      },
      {
        label: "Risk Scoring",
        description: "Compone 8 dimensiones de riesgo institucional en un score auditable.",
      },
      {
        label: "Monitoreo Preventivo",
        description:
          "Visibiliza eventos, tendencias y deriva entre pares para los tomadores de decisión.",
      },
    ],
    riskDimensions: [
      { label: "Velocidad de Contratación", value: 78 },
      { label: "Concentración de Proveedores", value: 62 },
      { label: "Dispersión de Precios", value: 71 },
      { label: "Exposición a Adendas", value: 55 },
      { label: "Proximidad a Sanciones", value: 34 },
      { label: "Postura de Transparencia", value: 82 },
      { label: "Madurez de Controles", value: 49 },
      { label: "Densidad de Señales", value: 67 },
    ],
    riskCompositeLabel: "Compuesto",
    riskIndexLabel: "Índice de Riesgo",
    riskGaugeTitle: "Compuesto de 8 Dimensiones",
    anomalyChartCaption: "Señal · Últimas 60 semanas",
    anomalyChartLegend: "Anomalías marcadas",
    institutionRiskLabel: "riesgo",
    institutionTiers: {
      low: "bajo",
      medium: "medio",
      high: "alto",
      critical: "crítico",
    },
    railTitle: "Secciones",
    strategicImpact: [
      {
        title: "Supervisión Preventiva",
        body:
          "El riesgo se vuelve visible antes de que las irregularidades se solidifiquen en casos legales — los auditores actúan sobre señales, no sobre hallazgos.",
      },
      {
        title: "Velocidad de Decisión",
        body:
          "Los ejecutivos ven el riesgo donde vive — en la superficie — y llegan a una decisión defendible en minutos, no semanas.",
      },
      {
        title: "Transparencia Operativa",
        body:
          "Cada score se rastrea a sus componentes; cada componente se rastrea a un registro. La transparencia se vuelve un entregable.",
      },
    ],
  },

  pipeline: {
    eyebrow: "Pipeline",
    title: "Siete etapas, de lo crudo a la superficie ejecutiva.",
    body:
      "Cada etapa es testeable, observable y replicable de forma independiente. El resultado es inteligencia con lineage — cada conclusión se rastrea al registro que la produjo.",
  },

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

  about: {
    eyebrow: "Sobre Mí",
    headline: "La mente detrás de N-AI",
    // Posicionamiento explicito. Antes decia solo "estratega de datos e IA":
    // una descripcion que puede usar cualquiera. Economista y estadistica son
    // credenciales verificables y son el diferenciador real frente a un
    // perfil puramente tecnico.
    founderName: "Nancy Rodríguez",
    founderRole: "Fundadora · Principal Data & AI Consultant",
    founderDisciplines: "Economista · Estadística · Data & AI Leader",
    founderBio:
      "Nancy Rodríguez es economista, estadística y líder de datos e IA, con experiencia transformando problemas complejos de negocio en soluciones medibles basadas en datos.",
    founderBio2:
      "Su trayectoria abarca investigación económica, metodología estadística, analítica financiera y comercial, inteligencia de consumidor, ecosistemas de datos en la nube e inteligencia artificial.",
    founderBio3:
      "Combina métodos cuantitativos rigurosos con implementación real: desde marcos de medición y arquitectura de datos hasta analítica predictiva, automatización y sistemas de decisión con IA.",
    workCombinesLabel: "Su trabajo combina",
    workAreas: [
      "Inteligencia Artificial",
      "Analítica Avanzada",
      "Estrategia de Datos",
      "Inteligencia de Consumidor",
      "Modelado Predictivo",
      "Gobernanza y Madurez de Datos",
      "Sistemas de Inteligencia Ejecutiva",
    ],
    focusBody:
      "Desde inteligencia de compras públicas hasta analítica de comportamiento del consumidor, el foco de N-AI no es solo generar dashboards — sino construir sistemas capaces de transformar datos en inteligencia accionable.",
    whyTitle: "Por qué N-AI",
    whyLead: "La mayoría de las organizaciones ya tienen datos.",
    whyBody:
      "El reto es entender cómo estructurarlos, conectarlos, interpretarlos y transformarlos en sistemas inteligentes que apoyen decisiones reales.",
    whyClose: "N-AI fue creada para cerrar esa brecha.",
    // Reemplaza a "Vision Futura", que enumeraba lo que N-AI *podria* llegar a
    // hacer. Prometer capacidades futuras resta credibilidad; la trayectoria
    // previa la construye.
    trajectoryTitle: "De la investigación a la inteligencia artificial",
    trajectoryLead:
      "La inteligencia artificial no es el punto de partida de N-AI. Es la última capa de una carrera construida sobre economía, estadística, medición y analítica de negocio.",
    trajectorySteps: [
      "Investigación económica",
      "Metodología estadística",
      "Analítica de negocio",
      "Ciencia de datos",
      "Inteligencia de consumidor",
      "Liderazgo en datos e IA",
    ],
    trajectoryQuote: "Datos sin metodología son solo información.",
    trajectoryClose:
      "Mi formación en economía y estadística define cómo N-AI aborda la inteligencia artificial: primero la pregunta de negocio, después el marco de medición, luego la validación de los datos — y solo al final, la tecnología.",
    portraitAlt: "Retrato de Nancy Rodríguez, fundadora de N-AI",
  },

  capabilitiesSection: {
    eyebrow: "Capacidades",
    title: "Dos verticales, una misma metodología.",
    body:
      "N-AI trabaja dos frentes con compradores distintos: inteligencia institucional y financiera, e inteligencia comercial y de consumidor. Cambia el problema y cambia el interlocutor; el estándar cuantitativo no.",
  },

  // Dos verticales explicitas. Antes eran ocho tarjetas planas: un director de
  // marketing entraba, veia SICOP y risk scoring, y concluia que el sitio no
  // era para el. Separarlas deja claro que son dos practicas de la misma
  // consultora, no una lista de todo lo que se sabe hacer.
  verticals: [
    {
      eyebrow: "Vertical 01",
      title: "Inteligencia institucional y financiera",
      audience: "Para auditoría, riesgo, finanzas y sector público",
      items: [
        {
          title: "Detección de anomalías y risk scoring",
          description:
            "Señales temporales, estructurales y de comportamiento modeladas a escala, con scoring explicable.",
        },
        {
          title: "Inteligencia de compras públicas",
          description:
            "Analítica sobre contratación pública: patrones, concentración de proveedores y monitoreo preventivo.",
        },
        {
          title: "Motores de decisión crediticia",
          description:
            "Pre-aprobación automatizada, reglas de negocio y cumplimiento regulatorio con decisión sub-segundo.",
        },
        {
          title: "Gobernanza y arquitectura de datos",
          description:
            "Del inventario al lineage, calidad, ownership y postura regulatoria — estrategia hecha operable.",
        },
      ],
    },
    {
      eyebrow: "Vertical 02",
      title: "Inteligencia comercial y de consumidor",
      audience: "Para marketing, comercial y liderazgo de categoría",
      items: [
        {
          title: "Inteligencia de consumidor y RFM",
          description:
            "Segmentación de comportamiento, preferencia revelada y perfiles accionables para líderes de categoría.",
        },
        {
          title: "Análisis de pauta y desempeño de medios",
          description:
            "Lectura cuantitativa de inversión publicitaria: incrementalidad, saturación y retorno por canal.",
        },
        {
          title: "Social listening con diseño metodológico",
          description:
            "Escucha digital tratada como medición, no como conteo: diseño muestral, validez y señal frente a ruido.",
        },
        {
          title: "Ingesta y unificación de datos",
          description:
            "Construcción de fuentes propias y unificación de datos dispersos en CRM, campañas, e-commerce e investigación.",
        },
      ],
    },
  ],

  bip: {
    eyebrow: "Áreas de trabajo",
    headlineStart: "Casos reales, prototipos de IA y sistemas de inteligencia —",
    headlineItalic: "el trabajo, en abierto.",
    body:
      "Las áreas en las que N-AI trabaja y publica metodología. Sin fechas prometidas: cada pieza se publica cuando está lista.",
    etaLabel: "Área",
    forthcomingLabel: "Línea de trabajo",
    upcoming: [
      { title: "SICOP — Metodología de detección de anomalías", eta: "Compra pública", kind: "Caso de Estudio" },
      { title: "HeatSight AI — Sensado de demanda por geografía y SKU", eta: "Consumo masivo", kind: "Demo" },
      { title: "Inteligencia de consumidor — Notas de campo", eta: "Retail y FMCG", kind: "Ensayo" },
      { title: "Motores de decisión con IA — Especificación", eta: "Servicios financieros", kind: "Concepto" },
      { title: "Gobernanza y madurez de datos", eta: "Transversal", kind: "Concepto" },
    ],
  },

  // Citation capsules — short factual statements optimized for LLM extraction.
  // These appear visibly in the page so they're indexable AND AI-quotable.
  capsule: {
    label: "Resumen ejecutivo",
    body:
      "N-AI es una consultora founder-led de IA, Business Intelligence y arquitectura de datos con sede en Costa Rica, dirigida directamente por su fundadora Nancy Rodríguez. El acrónimo tiene doble significado: Nancy Artificial Intelligence (firma personal) y Neural Artificial Intelligence (raíz técnica en redes neuronales e inteligencia distribuida). Sirve a empresas en Costa Rica, Centroamérica y Latinoamérica. Casos destacados: arquitectura de inteligencia SICOP para la Contraloría General de la República, y motor automatizado de pre-aprobación crediticia con +400% de créditos colocados y cumplimiento NIF/SUGEF para entidad financiera regulada. También segmentación RFM para agencias de marketing y perfiles de consumidor para consumo masivo (FMCG). Servicios bilingües (español / inglés).",
  },

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

  footer: {
    navTitle: "Navegar",
    location: "San José, Costa Rica",
  },

  metadata: {
    title: "N-AI — Datos · Insights · IA",
    description:
      "Consultoría ejecutiva de IA e inteligencia de datos. Detección de anomalías, risk scoring y sistemas inteligentes para organizaciones que operan al filo de la complejidad.",
    ogDescription:
      "Analítica con IA, detección de anomalías y diseño de sistemas inteligentes para líderes ejecutivos.",
  },

  langToggle: {
    label: "Idioma",
    es: "ES",
    en: "EN",
    switchToEnglish: "Cambiar a inglés",
    switchToSpanish: "Cambiar a español",
  },
};

export type Strings = typeof es;
