import type { Strings } from "./es";

// English — translation. Keys must mirror es.ts exactly (Strings type enforces it).
export const en: Strings = {
  brand: {
    tagline: "Data · Insights · AI",
    subBrand: "Neural Analytics & Intelligence",
  },
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

  sicop: {
    eyebrow: "Featured Case Study",
    title: "Public Procurement Intelligence",
    subtitle:
      "Complete SICOP intelligence architecture for anomaly detection, risk scoring and preventive monitoring.",
    architecturePreviewTitle: "Architecture Preview",
    architecturePreviewBody:
      "Sources flow into the pipeline; the pipeline emits intelligence; intelligence powers the executive surface — every component traceable end-to-end.",
    archCells: [
      ["Sources", "Solicitations · Awards · Contracts"],
      ["Pipeline", "7 stages · Replayable · Audited"],
      ["AI Layer", "47 patterns · Explainable scoring"],
      ["Outputs", "Risk index · Triage · Drilldown"],
    ],
    archNodes: [
      { label: "Sources", sub: "SICOP" },
      { label: "Pipeline", sub: "7-stage" },
      { label: "AI Layer", sub: "Anomaly + Risk" },
      { label: "Outputs", sub: "Executive" },
    ],
    kpis: [
      { value: ">2.4M", label: "Procurement records analyzed" },
      { value: "47", label: "Anomaly patterns modeled" },
      { value: "8", label: "Institutional risk dimensions" },
      { value: "<1s", label: "Risk scoring latency" },
    ],
    sections: [
      {
        id: "challenge",
        number: "01",
        title: "The Challenge",
        lead:
          "Public procurement operates on opaque ecosystems: fragmented data, inconsistent taxonomies, and oversight that arrives after harm is done.",
        body:
          "Auditors, regulators and decision-makers face a compounding problem — millions of transactions across thousands of institutions, encoded in heterogeneous schemas. The result is reactive oversight: anomalies are caught only after irregularities materialize into legal cases, and patterns of systemic risk go unmodeled. The gap is not data — it is intelligence.",
      },
      {
        id: "infrastructure",
        number: "02",
        title: "Data Infrastructure",
        lead:
          "Inventory and structuring of the complete SICOP ecosystem — every source, every schema, every relationship.",
        body:
          "We mapped the SICOP data graph end-to-end: solicitations, awards, contracts, addenda, supplier registries, sanctions, institutional metadata. Each source was inventoried, schemas reconciled, and relationships modeled into a unified graph that downstream pipelines can reason over.",
      },
      {
        id: "pipeline",
        number: "03",
        title: "Intelligence Pipeline",
        lead:
          "Seven-stage pipeline from raw extraction to preventive monitoring — the spine of the whole system.",
        body:
          "Each stage is independently testable, observable and replayable. Raw sources flow through extraction, structural inventory, unification, validation, anomaly detection, risk scoring and into the monitoring layer that powers executive surveillance.",
      },
      {
        id: "anomaly",
        number: "04",
        title: "AI Anomaly Detection",
        lead:
          "Forty-seven anomaly patterns modeled across temporal, structural and behavioral signals.",
        body:
          "Rule-based detectors catch the obvious; learned models surface the subtle: unusual award velocity, supplier concentration drift, pricing breaks vs. peer baselines, and addendum sequences that statistically precede irregularities. Outputs are scored, ranked, and explainable.",
      },
      {
        id: "risk",
        number: "05",
        title: "Risk Scoring System",
        lead:
          "Eight institutional risk dimensions composed into a single executive score with traceable components.",
        body:
          "Each institution carries a score that decomposes into dimensions auditors and decision-makers actually reason about: contracting velocity, supplier concentration, pricing dispersion, addendum exposure, sanction proximity, transparency posture, control maturity and historical signal density.",
      },
      {
        id: "institutional",
        number: "06",
        title: "Institutional Intelligence",
        lead:
          "A single executive surface where every institution has its own risk profile, peer comparators and trend.",
        body:
          "Heatmap-style triage shows the population at a glance; drilldowns reveal time-series, anomaly contributions and historical events. The same surface answers two questions at once: where to look first, and why.",
      },
      {
        id: "impact",
        number: "07",
        title: "Strategic Impact",
        lead:
          "Three executive outcomes the system unlocks — measured in months, not quarters.",
        body:
          "Preventive oversight replaces reactive audit. Decision velocity improves because risk is visible at the surface, not buried in records. And transparency becomes a deliverable, not an aspiration.",
      },
    ],
    challengePoints: [
      "Opaque procurement ecosystems",
      "Fragmented, heterogeneous data sources",
      "Inconsistent taxonomies across institutions",
      "Reactive oversight — irregularities surface after harm",
      "Systemic risk patterns left unmodeled",
    ],
    infrastructureSources: [
      "Solicitations",
      "Awards",
      "Contracts",
      "Addenda",
      "Supplier Registry",
      "Sanctions",
      "Institutional Metadata",
    ],
    infrastructure: {
      ingestionTitle: "Ingestion",
      ingestionItems: [
        "Continuous extraction",
        "Schema reconciliation",
        "Lineage capture",
        "Validation rules",
      ],
      unifiedTitle: "Unified Graph",
      unifiedBody:
        "Canonical schema. Cross-source relationships modeled. Replayable transforms. Substrate for every downstream signal.",
      sourcesLabel: "Sources",
    },
    pipelineLinkLabel: "See the seven-stage pipeline in motion",
    pipelineNodes: [
      {
        label: "Data Extraction",
        description: "Pull raw records from every SICOP source on a continuous cadence.",
      },
      {
        label: "Inventory & Structuring",
        description: "Catalog every field, document every relationship, version every schema.",
      },
      {
        label: "Data Unification",
        description: "Reconcile heterogeneous schemas into a single canonical graph.",
      },
      {
        label: "Validation Rules",
        description: "Enforce typing, lineage and referential consistency before downstream use.",
      },
      {
        label: "AI Anomaly Detection",
        description: "Score 47 anomaly patterns across temporal, structural and behavioral signals.",
      },
      {
        label: "Risk Scoring",
        description: "Compose 8 institutional risk dimensions into a single auditable score.",
      },
      {
        label: "Preventive Monitoring",
        description: "Surface flagged events, trends and peer drift to executive decision-makers.",
      },
    ],
    riskDimensions: [
      { label: "Contracting Velocity", value: 78 },
      { label: "Supplier Concentration", value: 62 },
      { label: "Pricing Dispersion", value: 71 },
      { label: "Addendum Exposure", value: 55 },
      { label: "Sanction Proximity", value: 34 },
      { label: "Transparency Posture", value: 82 },
      { label: "Control Maturity", value: 49 },
      { label: "Signal Density", value: 67 },
    ],
    riskCompositeLabel: "Composite",
    riskIndexLabel: "Risk Index",
    riskGaugeTitle: "8-Dimension Composite",
    anomalyChartCaption: "Signal · Last 60 weeks",
    anomalyChartLegend: "Flagged anomalies",
    institutionRiskLabel: "risk",
    institutionTiers: {
      low: "low",
      medium: "medium",
      high: "high",
      critical: "critical",
    },
    railTitle: "Sections",
    strategicImpact: [
      {
        title: "Preventive Oversight",
        body:
          "Risk surfaces before irregularities calcify into legal cases — auditors act on signals, not findings.",
      },
      {
        title: "Decision Velocity",
        body:
          "Executives see risk where it lives — at the surface — and reach a defensible decision in minutes, not weeks.",
      },
      {
        title: "Operational Transparency",
        body:
          "Every score traces back to its components; every component traces back to a record. Transparency becomes a deliverable.",
      },
    ],
  },

  pipeline: {
    eyebrow: "Pipeline",
    title: "Seven stages from raw to executive surface.",
    body:
      "Each stage is independently testable, observable and replayable. The result is intelligence with lineage — every conclusion traces back to the record that produced it.",
  },

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

  about: {
    eyebrow: "About",
    headline: "The mind behind N-AI",
    founderName: "Nancy Rodríguez",
    founderRole: "Founder & Principal Data / AI Consultant",
    founderDisciplines: "Economist · Statistician · Data & AI Leader",
    founderBio:
      "Nancy Rodríguez is an economist, statistician and Data & AI leader with experience transforming complex business problems into measurable, data-driven solutions.",
    founderBio2:
      "Her career spans economic research, statistical methodology, financial and commercial analytics, consumer intelligence, cloud data ecosystems and artificial intelligence.",
    founderBio3:
      "She combines rigorous quantitative methods with hands-on implementation — from measurement frameworks and data architecture to predictive analytics, automation and AI-powered decision systems.",
    workCombinesLabel: "Her work combines",
    workAreas: [
      "Artificial Intelligence",
      "Advanced Analytics",
      "Data Strategy",
      "Consumer Intelligence",
      "Predictive Modeling",
      "Data Governance & Maturity",
      "Executive Intelligence Systems",
    ],
    focusBody:
      "From public procurement intelligence to consumer behavior analytics, N-AI's focus is not just building dashboards — it is building systems that turn data into actionable intelligence.",
    whyTitle: "Why N-AI",
    whyLead: "Most organizations already have data.",
    whyBody:
      "The challenge is knowing how to structure it, connect it, interpret it and turn it into intelligent systems that support real decisions.",
    whyClose: "N-AI was created to close that gap.",
    trajectoryTitle: "From research to artificial intelligence",
    trajectoryLead:
      "Artificial intelligence is not the starting point of N-AI's methodology. It is the latest layer of a career built on economics, statistics, measurement and business analytics.",
    trajectorySteps: [
      "Economic research",
      "Statistical methodology",
      "Business analytics",
      "Data science",
      "Consumer intelligence",
      "Data & AI leadership",
    ],
    trajectoryQuote: "Data without methodology is just information.",
    trajectoryClose:
      "My background in economics and statistics shapes how N-AI approaches artificial intelligence: starting with the business question, defining the measurement framework, validating the data — and only then selecting the technology.",
    portraitAlt: "Portrait of Nancy Rodríguez, founder of N-AI",
  },

  capabilitiesSection: {
    eyebrow: "Capabilities",
    title: "Two verticals, one methodology.",
    body:
      "N-AI works two fronts with different buyers: institutional and financial intelligence, and commercial and consumer intelligence. The problem changes and so does the counterpart; the quantitative standard does not.",
  },

  verticals: [
    {
      eyebrow: "Vertical 01",
      title: "Institutional & financial intelligence",
      audience: "For audit, risk, finance and the public sector",
      items: [
        {
          title: "Anomaly detection & risk scoring",
          description:
            "Temporal, structural and behavioral signals modeled at scale, with explainable scoring.",
        },
        {
          title: "Public procurement intelligence",
          description:
            "Analytics on public contracting: patterns, supplier concentration and preventive monitoring.",
        },
        {
          title: "Credit decision engines",
          description:
            "Automated pre-approval, business rules and regulatory compliance with sub-second decisions.",
        },
        {
          title: "Data governance & architecture",
          description:
            "From inventory to lineage, quality, ownership and regulatory posture — strategy made operable.",
        },
      ],
    },
    {
      eyebrow: "Vertical 02",
      title: "Commercial & consumer intelligence",
      audience: "For marketing, commercial and category teams",
      items: [
        {
          title: "Consumer intelligence & RFM",
          description:
            "Behavioral segmentation, revealed preference and actionable profiles for category leaders.",
        },
        {
          title: "Media & ad spend analytics",
          description:
            "A quantitative read on advertising investment: incrementality, saturation and return by channel.",
        },
        {
          title: "Social listening with methodological design",
          description:
            "Digital listening treated as measurement, not counting: sampling design, validity, and signal over noise.",
        },
        {
          title: "Data ingestion & unification",
          description:
            "Building proprietary sources and unifying data scattered across CRM, campaigns, e-commerce and research.",
        },
      ],
    },
  ],

  bip: {
    eyebrow: "Areas of work",
    headlineStart: "Real cases, AI prototypes and intelligence systems —",
    headlineItalic: "the work, in the open.",
    body:
      "The areas N-AI works in and publishes methodology on. No promised dates: each piece ships when it is ready.",
    etaLabel: "Area",
    forthcomingLabel: "Work stream",
    upcoming: [
      { title: "SICOP — Anomaly detection methodology", eta: "Public procurement", kind: "Case Study" },
      { title: "HeatSight AI — Demand sensing by geography and SKU", eta: "FMCG", kind: "Demo" },
      { title: "Consumer intelligence — Field notes", eta: "Retail & FMCG", kind: "Essay" },
      { title: "AI decision engines — Specification", eta: "Financial services", kind: "Concept" },
      { title: "Data governance and maturity", eta: "Cross-industry", kind: "Concept" },
    ],
  },

  capsule: {
    label: "Executive summary",
    body:
      "N-AI is a founder-led AI, Business Intelligence and data architecture consultancy based in Costa Rica, led directly by its founder Nancy Rodríguez. The acronym carries a dual meaning: Nancy Artificial Intelligence (personal signature) and Neural Artificial Intelligence (technical root in neural networks and distributed intelligence). Serves companies across Costa Rica, Central America and Latin America. Featured cases: SICOP intelligence architecture for the Comptroller General of the Republic of Costa Rica, and an automated credit pre-approval engine with +400% credit placements and NIF/SUGEF compliance for a regulated financial institution. Also RFM segmentation for marketing agencies and consumer profiling for FMCG. Bilingual services (Spanish / English).",
  },

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

  footer: {
    navTitle: "Navigate",
    location: "San José, Costa Rica",
  },

  metadata: {
    title: "N-AI — Data · Insights · AI",
    description:
      "Executive AI and data intelligence consultancy. Anomaly detection, risk scoring, and intelligent systems for organizations operating at the edge of complexity.",
    ogDescription:
      "AI-powered analytics, anomaly detection and intelligent systems design for executive leaders.",
  },

  langToggle: {
    label: "Language",
    es: "ES",
    en: "EN",
    switchToEnglish: "Switch to English",
    switchToSpanish: "Switch to Spanish",
  },
};
