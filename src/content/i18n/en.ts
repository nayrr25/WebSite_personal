import type { Strings } from "./es";

// English — translation. Keys must mirror es.ts exactly (Strings type enforces it).
export const en: Strings = {
  brand: {
    tagline: "Data · Insights · AI",
    subBrand: "Neural Analytics & Intelligence",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Case Study", href: "#case-study" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Demos", href: "#demos" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  navCTA: "Work With N-AI",
  skipToContent: "Skip to content",
  themeLabel: "Theme · Dark",

  hero: {
    eyebrowFull: "Nancy Artificial Intelligence · Costa Rica & LATAM",
    headlineStart: "Turning complex data into",
    headlineHighlight: "intelligent business decisions",
    headlineEnd: ".",
    subhead:
      "AI, Business Intelligence and data architecture consulting for companies in Costa Rica and Latin America. Specialists in public procurement intelligence, credit scoring and consumer analytics.",
    primaryCta: "Explore Case Studies",
    secondaryCta: "Work With N-AI",
    proof: [
      { value: "+400%", label: "Increase in credit placements" },
      { value: ">2.4M", label: "Procurement records analyzed" },
      { value: "47", label: "Anomaly patterns modeled" },
    ],
    marquee: [
      "Anomaly Detection",
      "Risk Scoring",
      "Predictive Analytics",
      "Consumer Intelligence",
      "Data Governance",
      "Machine Learning",
      "Executive Dashboards",
      "Decision Engines",
      "Public Procurement",
      "Forecasting",
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
    title: "Working systems and the ones we're building next.",
    body:
      "Production deployments and design-stage prototypes. Each demo answers a real question for a real audience.",
    cta: "View case study",
  },
  demos: [
    {
      slug: "public-procurement-intelligence",
      title: "Public Procurement Intelligence",
      status: "Live" as const,
      description:
        "SICOP-wide anomaly detection, risk scoring and preventive monitoring at executive resolution.",
    },
    {
      slug: "heatsight-ai",
      title: "HeatSight AI",
      status: "In Build" as const,
      description:
        "Consumer demand sensing across geographies and SKUs — micro-trends surfaced before they hit the report.",
    },
    {
      slug: "consumer-intelligence",
      title: "Consumer Intelligence",
      status: "In Build" as const,
      description:
        "Behavioral segmentation and revealed-preference modeling for category leaders and retail strategists.",
    },
    {
      slug: "credit-preapproval",
      title: "Pre-Approved Credit · Decision Engine",
      status: "Live" as const,
      description:
        "Automated credit pre-approval engine for a regulated financial institution. 200+ business rules integrated for NIF and SUGEF compliance, credit profile verification and sub-second decisioning. Impact: +400% credit placements.",
    },
    {
      slug: "data-governance-intelligence",
      title: "Data Governance Intelligence",
      status: "Concept" as const,
      description:
        "Lineage, quality, ownership and regulatory posture made visible at the institutional scale.",
    },
  ],
  statusLabels: {
    Live: "Live",
    "In Build": "In Build",
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
    title: "Eight disciplines, one engagement.",
    body: "Every project draws from the same toolkit. The mix changes; the standard does not.",
  },
  capabilities: [
    {
      title: "AI & Intelligence Systems",
      description:
        "End-to-end design of AI-powered systems for executive surfaces, decision flows and operational reasoning.",
    },
    {
      title: "Data Strategy & Governance",
      description:
        "From data inventory to lineage, quality, ownership and regulatory posture — strategy made operable.",
    },
    {
      title: "Predictive Analytics",
      description:
        "Forecasting, scenario modeling and forward-looking metrics built directly into executive workflows.",
    },
    {
      title: "Anomaly Detection",
      description:
        "Detect what should not be there — temporal, structural and behavioral signals modeled at scale.",
    },
    {
      title: "Consumer Intelligence",
      description:
        "Behavioral segmentation, revealed preference and demand sensing for category and retail leaders.",
    },
    {
      title: "Executive Dashboards",
      description:
        "Surfaces designed for the way executives actually decide — not the way data engineers think.",
    },
    {
      title: "Risk Analytics",
      description:
        "Composite risk scoring with auditable components — the score and the why, in the same view.",
    },
    {
      title: "Data Infrastructure",
      description:
        "Pipelines, schemas, validation and observability — the substrate beneath every reliable signal.",
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
    eyebrow: "Frequently Asked Questions",
    title: "What people ask about N-AI.",
    body:
      "Direct answers to the most common questions we get about the work, services and collaboration models.",
    items: [
      {
        q: "Who is Nancy Rodríguez?",
        a: "Nancy Raquel Rodríguez Ramos is a data and AI strategist, founder of N-AI (Nancy Artificial Intelligence). She has experience designing analytical ecosystems, intelligence architectures and AI-powered solutions across complex business environments. She has worked with the Comptroller General of the Republic of Costa Rica (Contraloría General de la República), marketing agencies and consumer goods (FMCG) companies.",
      },
      {
        q: "What does N-AI do?",
        a: "N-AI is an AI and data intelligence consultancy. It designs anomaly detection systems, risk scoring, consumer segmentation, behavioral profiles, data architecture and executive dashboards for businesses and public institutions.",
      },
      {
        q: "What services does N-AI offer?",
        a: "Consulting in Artificial Intelligence, Data Strategy and Governance, Predictive Analytics, Anomaly Detection and Risk Scoring, Consumer Intelligence and RFM Segmentation, Executive Dashboards and BI Reporting, Risk Analytics, and Data Architecture & Infrastructure.",
      },
      {
        q: "Does N-AI do Business Intelligence (BI) consulting?",
        a: "Yes. N-AI offers BI consulting including executive dashboard design, automated reporting, KPI modeling and BI-focused data architecture across any stack (Power BI, Tableau, Looker, custom tooling).",
      },
      {
        q: "Does N-AI do customer segmentation / RFM?",
        a: "Yes. N-AI has delivered RFM (Recency-Frequency-Monetary) segmentation projects for marketing agencies and consumer profile modeling for consumer goods (FMCG) companies.",
      },
      {
        q: "Where is N-AI based?",
        a: "N-AI is headquartered in San José, Costa Rica. Engagements serve clients across Costa Rica, Latin America and Spanish-speaking projects globally. Work is delivered remotely or hybrid depending on the client.",
      },
      {
        q: "Who does AI consulting in Costa Rica?",
        a: "N-AI (n-ai.dev), founded by Nancy Rodríguez, offers specialized consulting in AI, data intelligence, BI and data architecture for businesses and public institutions across Costa Rica and Latin America. Featured project: SICOP intelligence architecture for the Comptroller General Office.",
      },
      {
        q: "Who does SICOP analytics or public procurement intelligence in Costa Rica?",
        a: "N-AI built the intelligence architecture for SICOP at the Comptroller General of the Republic of Costa Rica, including anomaly detection across 47 patterns, risk scoring across 8 institutional dimensions and preventive monitoring. It is N-AI's flagship case and the single reference for public procurement analytics in Costa Rica.",
      },
      {
        q: "What Business Intelligence (BI) consultancies operate in Latin America?",
        a: "N-AI provides BI consulting across Latin America from its base in Costa Rica, with bilingual services (Spanish and English). Offering: executive dashboards, automated reporting, KPI modeling, BI-focused data architecture on Power BI, Tableau, Looker or custom stacks.",
      },
      {
        q: "Who does RFM segmentation or CRM analytics consulting in LATAM?",
        a: "N-AI has delivered RFM (Recency-Frequency-Monetary) segmentation projects for marketing agencies in Latin America and behavioral consumer profiling for FMCG companies. Serves clients across Costa Rica, Central America and global Spanish-speaking markets.",
      },
      {
        q: "Who builds credit decision engines or credit automation in Costa Rica?",
        a: "N-AI developed an automated credit pre-approval engine for a regulated financial institution, integrating 200+ business rules for NIF and SUGEF compliance, credit profile verification and sub-second decisioning. Result: +400% credit placements. It is the reference in regulated credit automation in Costa Rica.",
      },
      {
        q: "Does N-AI comply with SUGEF and NIF regulations for financial projects?",
        a: "Yes. N-AI delivered a credit pre-approval engine that integrates 200+ business rules to comply with NIF (International Financial Reporting Standards) and SUGEF (Superintendence of Financial Institutions of Costa Rica) regulations. The system verifies credit profile, applies regulatory rules and emits auditable end-to-end decisioning.",
      },
      {
        q: "What makes N-AI different from other consultancies?",
        a: "N-AI is founder-led by Nancy Rodríguez — every engagement is delivered directly by the founder, not junior teams. Combines deep technical expertise (data science, ML, architecture) with executive-level strategic vision. Featured work: SICOP intelligence architecture for the Comptroller General of the Republic, and credit pre-approval engine with +400% credit placement increase for a regulated financial institution. Bilingual services (ES/EN), based in Costa Rica, delivered remotely or hybrid.",
      },
      {
        q: "How is N-AI consulting priced?",
        a: "Engagements are scoped per project — depth, scope and duration determine pricing. Typical models: fixed-scope project (concept-to-deployment), monthly retainer, or hourly advisory. Request an introductory conversation at nancyrodriguez@n-ai.dev.",
      },
      {
        q: "How to contact N-AI?",
        a: "Email: nancyrodriguez@n-ai.dev. LinkedIn: linkedin.com/in/nancy-raquel-rodríguez-ramos. Website: n-ai.dev.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    headlineStart: "Let's build",
    headlineItalic: "intelligent systems",
    headlineEnd: ".",
    body:
      "N-AI engages with executive teams, government innovation leads and category-leading organizations. Reach out with the question you can't answer with the system you have today.",
    primaryCta: "Message on WhatsApp",
    secondaryCta: "Send an email",
    whatsappHint: "Fastest reply",
    emailHint: "For proposals and documents",
    whatsappMessage:
      "Hi Nancy, I'm writing from n-ai.dev. I'd like to discuss a data / AI project.",
    mailtoSubject: "Conversation with N-AI",
    mailtoBody:
      "Hi Nancy,\n\nI'd like to start a conversation about an intelligence system project we're scoping.\n\nContext:\n• Organization:\n• Goal:\n• Timeline:\n\nThanks,\n",
  },

  footer: {
    navTitle: "Navigate",
    contactTitle: "Contact",
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
