import type { Strings } from "./es";

// English — translation. Keys must mirror es.ts exactly (Strings type enforces it).
export const en: Strings = {
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
    kpiAlerts: "Institutions on alert",
    kpiCritical: "At critical risk",
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
  },

  caseSicop: {
    metaTitle: "SICOP case: public procurement intelligence",
    metaDescription:
      "How N-AI built anomaly detection across 47 patterns and risk scoring across 8 dimensions for public procurement oversight in Costa Rica.",
    back: "Back to home",
    scoringLabel: "time to compute a risk score",
    eyebrow: "Case study",
    title: "Public procurement intelligence for Costa Rica's Comptroller General",
    lead:
      "Data architecture and artificial intelligence to move SICOP oversight from reactive to preventive.",
    railTitle: "On this page",
    sections: {
      summary: "Summary",
      challenge: "The challenge",
      architecture: "Sources and architecture",
      ai: "AI layer",
      institutions: "Institutions",
      impact: "Impact",
    },
    contextLabel: "Context",
    context:
      "Public procurement oversight was reactive: irregularities surfaced after the damage was done, with data spread across different sources and taxonomies.",
    resultLabel: "Outcome",
    result:
      "Risk becomes visible before it turns into a legal case: auditors act on signals, not on findings.",
    challengeTitle: "Why oversight arrived too late",
    challengePoints: [
      "Data spread across different sources and formats",
      "Classifications that change between institutions",
      "Irregularities detected after the damage was done",
      "Systemic risk patterns nobody modeled",
    ],
    architectureTitle: "Seven sources, seven stages",
    sourcesLabel: "Sources",
    sources: [
      "Solicitations",
      "Awards",
      "Contracts",
      "Addenda",
      "Supplier registry",
      "Sanctions",
      "Institutional data",
    ],
    pipelineLabel: "Pipeline stages",
    pipeline: [
      { title: "Extraction", body: "Continuously pulls records from every SICOP source." },
      { title: "Inventory", body: "Documents every field and every relationship between sources." },
      { title: "Unification", body: "Brings the different formats together into a single data model." },
      { title: "Validation", body: "Checks types, consistency and traceability before the data is used." },
      { title: "Anomaly detection", body: "Evaluates 47 patterns across time, structure and behavior signals." },
      { title: "Risk scoring", body: "Combines 8 dimensions into an auditable score per institution." },
      { title: "Preventive monitoring", body: "Shows events, trends and peer comparisons to decision makers." },
    ],
    aiTitle: "47 patterns and 8 risk dimensions",
    aiBody:
      "Rules catch the obvious and models catch the subtle: unusual award velocity, supplier concentration, out-of-range prices and addendum sequences that often precede irregularities. Each institution gets a score that breaks down into 8 dimensions.",
    compositeLabel: "Composite",
    institutionsTitle: "12 institutions, anonymized",
    institutionsBody: "Risk score for each institution, on a 0 to 100 scale.",
    impactTitle: "What changes for decision makers",
    impact: [
      {
        title: "Preventive oversight",
        body: "Risk is visible before it turns into a legal case: action is taken on signals, not findings.",
      },
      {
        title: "Faster decisions",
        body: "Decision makers see risk on the first screen and reach a defensible decision in minutes, not weeks.",
      },
      {
        title: "Verifiable transparency",
        body: "Every score traces back to its components, and every component to a record.",
      },
    ],
    dataNote: "Project results with anonymized institutions.",
    ctaTitle: "Facing a similar challenge?",
    ctaBody: "An introductory conversation identifies how to apply this approach to your data.",
    ctaButton: "Book a diagnostic",
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
    Live: "In production",
    "In Build": "In build",
    Concept: "Concept",
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

  langToggle: {
    label: "Language",
    es: "ES",
    en: "EN",
    switchToEnglish: "Switch to English",
    switchToSpanish: "Switch to Spanish",
  },
};
