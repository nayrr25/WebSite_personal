// Spanish — default/primary language.
// Keep keys in sync with en.ts. If you add a key here, add it to en.ts (TS will complain otherwise).

export const es = {
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
    headlineHighlight: "analítica avanzada",
    headlineEnd: "en Costa Rica.",
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
    kpiAlerts: "Instituciones en alerta",
    kpiCritical: "En riesgo crítico",
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
    stackCaption: "Herramientas con las que N-AI construye cada fase",
    stackSrLabel: "Herramientas por fase",
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
  },

  caseSicop: {
    metaTitle: "Caso SICOP: inteligencia de compras públicas",
    metaDescription:
      "Cómo N-AI construyó detección de anomalías sobre 47 patrones y scoring de riesgo en 8 dimensiones para la supervisión de compras públicas en Costa Rica.",
    back: "Volver al inicio",
    scoringLabel: "tiempo para calcular un puntaje de riesgo",
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
    Live: "En producción",
    "In Build": "En construcción",
    Concept: "Concepto",
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

  langToggle: {
    label: "Idioma",
    es: "ES",
    en: "EN",
    switchToEnglish: "Cambiar a inglés",
    switchToSpanish: "Cambiar a español",
  },
};

export type Strings = typeof es;
