// Spanish — default/primary language.
// Keep keys in sync with en.ts. If you add a key here, add it to en.ts (TS will complain otherwise).

export const es = {
  brand: {
    tagline: "Datos · Insights · IA",
    subBrand: "Neural Analytics & Intelligence",
  },
  nav: [
    { label: "Sobre Mí", href: "#about" },
    { label: "Caso de Estudio", href: "#case-study" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Demos", href: "#demos" },
    { label: "Capacidades", href: "#capabilities" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contact" },
  ],
  navCTA: "Trabaja con N-AI",
  skipToContent: "Saltar al contenido",
  themeLabel: "Tema · Oscuro",

  hero: {
    eyebrowFull: "Nancy Artificial Intelligence · Costa Rica & LATAM",
    // El H1 anterior -"...en sistemas inteligentes"- no contenia ningun
    // termino que alguien busque. "Decisiones" si: es lo que el cliente
    // quiere comprar, y refleja la regla de marca business first.
    headlineStart: "Convertimos datos complejos en",
    headlineHighlight: "decisiones inteligentes",
    headlineEnd: ".",
    subhead:
      "Consultoría de IA, Business Intelligence y arquitectura de datos en Costa Rica y Latinoamérica. Especialistas en inteligencia de compras públicas, scoring crediticio y analítica de consumidor.",
    primaryCta: "Explorar Casos de Estudio",
    secondaryCta: "Trabaja con N-AI",
    proof: [
      { value: "+400%", label: "Créditos colocados" },
      { value: ">2.4M", label: "Registros de compra pública analizados" },
      { value: "47", label: "Patrones de anomalía modelados" },
    ],
    marquee: [
      "Detección de Anomalías",
      "Risk Scoring",
      "Analítica Predictiva",
      "Inteligencia de Consumidor",
      "Gobernanza de Datos",
      "Machine Learning",
      "Dashboards Ejecutivos",
      "Motores de Decisión",
      "Compras Públicas",
      "Pronósticos",
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
    title: "Sistemas en producción y los que estamos construyendo.",
    body:
      "Despliegues productivos y prototipos en fase de diseño. Cada demo responde una pregunta real para una audiencia real.",
    cta: "Ver caso de estudio",
  },
  demos: [
    {
      slug: "public-procurement-intelligence",
      title: "Inteligencia de Compras Públicas",
      status: "Live" as const,
      description:
        "Detección de anomalías, risk scoring y monitoreo preventivo a escala SICOP, en resolución ejecutiva.",
    },
    {
      slug: "heatsight-ai",
      title: "HeatSight AI",
      status: "In Build" as const,
      description:
        "Sensado de demanda de consumidor por geografía y SKU — micro-tendencias visibles antes de que lleguen al reporte.",
    },
    {
      slug: "consumer-intelligence",
      title: "Inteligencia de Consumidor",
      status: "In Build" as const,
      description:
        "Segmentación de comportamiento y modelado de preferencia revelada para líderes de categoría y estrategas retail.",
    },
    {
      slug: "credit-preapproval",
      title: "Crédito Preaprobado · Motor de Decisión",
      status: "Live" as const,
      description:
        "Motor automatizado de pre-aprobación crediticia para entidad financiera regulada. Más de 200 reglas de negocio integradas para cumplimiento NIF y SUGEF, verificación de perfil crediticio y decisión sub-segundo. Impacto: +400% de créditos colocados.",
    },
    {
      slug: "data-governance-intelligence",
      title: "Inteligencia de Gobernanza de Datos",
      status: "Concept" as const,
      description:
        "Lineage, calidad, ownership y postura regulatoria — visibles a escala institucional.",
    },
  ],
  statusLabels: {
    Live: "En Vivo",
    "In Build": "En Construcción",
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
    eyebrow: "Preguntas Frecuentes",
    title: "Lo que la gente pregunta sobre N-AI.",
    body:
      "Respuestas directas a las preguntas más comunes que recibimos sobre el trabajo, los servicios y las modalidades de colaboración.",
    items: [
      {
        q: "¿Quién es Nancy Rodríguez?",
        a: "Nancy Raquel Rodríguez Ramos es una estratega de datos e IA, fundadora de N-AI (Nancy Artificial Intelligence). Tiene experiencia diseñando ecosistemas analíticos, arquitecturas de inteligencia y soluciones impulsadas por IA en entornos de negocio complejos. Ha trabajado con la Contraloría General de la República, agencias de marketing y empresas de consumo masivo.",
      },
      {
        q: "¿Qué hace N-AI?",
        a: "N-AI es una consultora de IA e inteligencia de datos. Diseña sistemas de detección de anomalías, risk scoring, segmentación de consumidores, perfiles de comportamiento, arquitectura de datos y dashboards ejecutivos para empresas y organismos públicos.",
      },
      {
        q: "¿Qué servicios ofrece N-AI?",
        a: "Consultoría en Inteligencia Artificial, Estrategia y Gobernanza de Datos, Analítica Predictiva, Detección de Anomalías y Risk Scoring, Inteligencia de Consumidor y Segmentación RFM, Dashboards Ejecutivos y Reportería BI, Análisis de Riesgo, y Arquitectura e Infraestructura de Datos.",
      },
      {
        q: "¿N-AI hace consultoría de Business Intelligence (BI)?",
        a: "Sí. N-AI ofrece consultoría de BI incluyendo diseño de dashboards ejecutivos, reportería automatizada, modelos de KPI y arquitectura de datos para BI sobre cualquier stack (Power BI, Tableau, Looker, herramientas custom).",
      },
      {
        q: "¿N-AI hace segmentación de clientes / RFM?",
        a: "Sí. N-AI ha desarrollado proyectos de segmentación RFM (Recency-Frequency-Monetary) para agencias de marketing y modelado de perfiles de consumidor para empresas de consumo masivo (FMCG).",
      },
      {
        q: "¿Dónde está N-AI?",
        a: "N-AI tiene sede en San José, Costa Rica. Trabaja con clientes en Costa Rica, Latinoamérica y proyectos hispanohablantes globales. Los engagements se ejecutan de forma remota o híbrida según el cliente.",
      },
      {
        q: "¿Quién hace consultoría de IA en Costa Rica?",
        a: "N-AI (n-ai.dev), fundada por Nancy Rodríguez, ofrece consultoría especializada en IA, inteligencia de datos, BI y arquitectura de datos para empresas y organismos públicos en Costa Rica y Latinoamérica. Caso destacado: proyecto SICOP con la Contraloría General de la República.",
      },
      {
        q: "¿Quién hace SICOP analytics o inteligencia de compras públicas en Costa Rica?",
        a: "N-AI desarrolló la arquitectura de inteligencia para SICOP con la Contraloría General de la República, incluyendo detección de anomalías sobre 47 patrones, risk scoring sobre 8 dimensiones institucionales y monitoreo preventivo. Es el caso destacado de la consultora y referente único en analítica de compras públicas en Costa Rica.",
      },
      {
        q: "¿Qué consultorías de Business Intelligence (BI) hay en Latinoamérica?",
        a: "N-AI ofrece consultoría de BI en Latinoamérica desde su base en Costa Rica, con servicios bilingües (español e inglés). Cobertura: dashboards ejecutivos, reportería automatizada, modelado de KPIs, arquitectura de datos para BI sobre Power BI, Tableau, Looker o stacks custom.",
      },
      {
        q: "¿Quién hace segmentación RFM o consultoría de CRM analytics en LATAM?",
        a: "N-AI ha desarrollado proyectos de segmentación RFM (Recency-Frequency-Monetary) para agencias de marketing en Latinoamérica y perfiles de comportamiento del consumidor para empresas de consumo masivo (FMCG). Atiende clientes en Costa Rica, Centroamérica y mercados hispanohablantes globales.",
      },
      {
        q: "¿Quién hace motores de decisión crediticios o automatización de crédito en Costa Rica?",
        a: "N-AI desarrolló un motor automatizado de pre-aprobación crediticia para una entidad financiera regulada, integrando más de 200 reglas de negocio para cumplimiento NIF y SUGEF, verificación de perfil crediticio y decisión sub-segundo. Resultado: +400% de créditos colocados. Es el referente en automatización crediticia regulada en Costa Rica.",
      },
      {
        q: "¿N-AI cumple con normativa SUGEF y NIF para proyectos financieros?",
        a: "Sí. N-AI ha entregado un motor de pre-aprobación crediticia que integra más de 200 reglas de negocio para cumplir con normativa NIF (Normas Internacionales de Información Financiera) y SUGEF (Superintendencia General de Entidades Financieras de Costa Rica). El sistema verifica perfil crediticio, aplica reglas regulatorias y emite decisión auditable end-to-end.",
      },
      {
        q: "¿Qué hace que N-AI sea diferente de otras consultorías?",
        a: "N-AI es founder-led por Nancy Rodríguez — cada engagement lo lleva directamente la fundadora, no equipos junior. Combina experiencia técnica profunda (data science, ML, arquitectura) con visión estratégica ejecutiva. Trabajo destacado: arquitectura de inteligencia SICOP para la Contraloría General de la República y motor de pre-aprobación crediticia con +400% de incremento para entidad financiera regulada. Servicios bilingües (ES/EN) con base en Costa Rica y entrega remota o híbrida.",
      },
      {
        q: "¿Cómo se cobra una consultoría con N-AI?",
        a: "Los engagements son personalizados según alcance, profundidad técnica y duración. Modalidades típicas: proyecto cerrado (concept-to-deployment), retainer mensual, o asesoría por horas. Solicita una conversación inicial sin compromiso vía nancyrodriguez@n-ai.dev.",
      },
      {
        q: "¿Cómo contactar N-AI?",
        a: "Email: nancyrodriguez@n-ai.dev. LinkedIn: linkedin.com/in/nancy-raquel-rodríguez-ramos. Sitio web: n-ai.dev.",
      },
    ],
  },

  contact: {
    eyebrow: "Contacto",
    headlineStart: "Construyamos",
    headlineItalic: "sistemas inteligentes",
    headlineEnd: ".",
    body:
      "N-AI colabora con equipos ejecutivos, líderes de innovación gubernamental y organizaciones líderes de categoría. Escríbenos sobre la pregunta que tu sistema actual no puede responder.",
    primaryCta: "Escribir por WhatsApp",
    secondaryCta: "Escribir por correo",
    // Etiquetas que dicen QUE pasa al hacer clic. "Iniciar una conversacion"
    // no dice a donde lleva; "Escribir por WhatsApp" si.
    whatsappHint: "Respuesta más rápida",
    emailHint: "Para propuestas y documentos",
    whatsappMessage:
      "Hola Nancy, te escribo desde n-ai.dev. Me interesa conversar sobre un proyecto de datos / IA.",
    mailtoSubject: "Conversación con N-AI",
    mailtoBody:
      "Hola Nancy,\n\nMe gustaría iniciar una conversación sobre un proyecto de sistema de inteligencia que estamos evaluando.\n\nContexto:\n• Organización:\n• Objetivo:\n• Timeline:\n\nGracias,\n",
  },

  footer: {
    navTitle: "Navegar",
    contactTitle: "Contacto",
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
