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
    headlineHighlight: "advanced analytics",
    headlineEnd: "in Costa Rica.",
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
    demoLink: "Try the interactive demo",
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
    stackCaption: "Tools N-AI uses to build each phase",
    stackSrLabel: "Tools by phase",
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
    disciplines: "Economist · Master's in AI · 13+ years in data",
    bio:
      "Nancy Rodríguez is an economist with a master's in Artificial Intelligence and more than 13 years in data and analytics across banking, telecom regulation, consumer goods and academia. She has taught data analysis with R at the University of Costa Rica and economics at Universidad Libre de Costa Rica. She leads every N-AI project personally.",
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
    educationTitle: "Education",
    recognizedLabel: "Recognized by the",
    certifications:
      "Plus 12 licenses and certifications, including Applied Generative AI: LLMs and Intelligent Automation (Smart Data).",
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

  demoDemand: {
    metaTitle: "Advanced analytics demo: demand forecasting and patterns",
    metaDescription:
      "Interactive advanced analytics demo with simulated data: automatic file validation, demand forecasting with range and confidence, and a monthly report with pattern analysis written with AI.",
    back: "Back to Demos",
    eyebrow: "Advanced analytics demo",
    title: "Automatic data validation and demand forecasting",
    lead:
      "This is how a monthly planning process works when data delivery, validation, forecasting and reporting are automated end to end. Try it with one of the three sample files.",
    facts: [
      { title: "Data that validates itself", body: "Structure, catalog, integrity and statistical rules before a single number is loaded." },
      { title: "Clear answers for the analyst", body: "Row, column and what to fix, instead of a technical error." },
      { title: "Forecasts with a confidence level", body: "Expected range and observed error; no made-up numbers for new products." },
    ],
    toolsLabel: "Typical tools",
    tools: ["Python", "SQL", "BigQuery", "Cloud Run", "Pipelines", "Power BI", "Looker", "Generative AI for the summary"],
    simNoteTitle: "Simulated data.",
    simNote: "Figures, products, regions and files are fictitious and only illustrate how it works. They do not belong to any company.",
    stepsLabel: "Demo steps",
    steps: ["The file is delivered", "It validates itself", "Answer to the analyst", "Forecast available"],
    stepWord: "Step",
    s1Title: "The analyst delivers the monthly file",
    s1Lead: "They drop it in the usual folder; nothing changes in how they work. Pick one of these three cases to see what happens next.",
    validate: "Validate the delivery",
    hintIdle: "Select a file to continue",
    hintReady: "ready to validate",
    rowsWord: "rows",
    s2Title: "Validation runs on its own",
    s2Lead:
      "Nobody reviews the file by hand. The rules agreed with the business run automatically: first the ones that check the file's shape, then the ones that check whether the figures make sense.",
    ruleOne: "rule",
    ruleMany: "rules",
    s3Title: "The analyst gets a clear answer",
    status: { ok: "Accepted", warn: "Accepted with a note", bad: "Rejected" },
    statusLead: {
      ok: "The delivery meets every rule. The analyst gets a confirmation and has nothing else to do.",
      warn: "The data is loaded, but something deserves a human confirmation. The system doesn't decide for the business: it flags it.",
      bad: "The file is not loaded, and the analyst gets exactly what to fix, with the row and column pointed out.",
    },
    period: "August 2026",
    kpis: ["rows received", "rows loaded", "blocking", "warnings"],
    findingsTitle: "Findings in detail",
    findingsHead: ["Rule", "Severity", "Rows", "Finding", "What to do"],
    severity: { bad: "Blocking", warn: "Warning", info: "Informational" },
    continueOk: "Continue to the forecast",
    continueBad: "See what happens when the file is accepted",
    tryOther: "Try another file",
    s4Title: "The forecast is just another column in the table",
    s4Lead:
      "Planners don't need to learn a new system: the forecast sits next to the history, with its expected range and observed error. Pick any product to see its detail.",
    s4Note:
      "Products without enough history don't get a made-up number: they are flagged as “no model” and handled separately. A forecast you can't stand behind is worse than none.",
    fcHead: {
      code: "Code",
      product: "Product",
      real: "Aug 2026",
      realSub: "actual",
      forecast: "Sep 2026",
      forecastSub: "forecast",
      range: "Expected range",
      error: "Last month error",
      confidence: "Confidence",
    },
    confidence: { high: "High", medium: "Medium", low: "Low", none: "No model" },
    productAria: "See detail for",
    noModel:
      "This product has 3 months of history. No forecast is calculated: there is no basis to stand behind a number, and publishing a made-up one is worse than saying it can't be done yet. It is handled separately, with business judgment, until it builds enough history.",
    detailLead:
      "18 months of validated history. The band shows the range where September demand is expected to fall; last month's error was",
    chartAria: "Monthly demand and September 2026 forecast for",
    legend: ["Actual monthly demand", "Forecast", "Expected range"],
    today: "today",
    forecastWord: "forecast",
    units: "units",
    showMail: "See the summary sent by email",
    closeKicker: "Closing the cycle",
    s5Title: "The report arrives on its own, with pattern analysis",
    s5Lead:
      "Nobody has to go looking for anything. An AI assistant writes the text, but the system calculates every figure: AI doesn't calculate the forecast, it only explains it.",
    mailToLabel: "To:",
    mailTo: "Demand planning",
    mailSubjectLabel: "Subject:",
    mailSubject: "Demand close — August 2026",
    mail: [
      "The August cycle closed with all three deliveries received and validated. The Central Region delivered on time; the North Region corrected and resent the same day; the South Region was accepted with a note about the 18.4% drop versus the three-month average, which the analyst confirmed as the effect of a temporary distribution change.",
      "Last month's forecast error was 9.4% across the whole portfolio, within the range of the last six months. Four products exceeded 20% error and are reviewed in the monthly session.",
      "September is projected at 30,300 units in total, 2.1% below August, consistent with the seasonal pattern of previous years.",
    ],
    patternsTitle: "Patterns detected this month",
    patterns: [
      { title: "Year-end seasonality", body: "In December, Product A rose about 20% above its average; inventory should be planned from October." },
      { title: "Upward trend", body: "Product C grew three months in a row before dropping in August; it is monitored to tell a level shift from a one-off peak." },
      { title: "Erratic demand", body: "Product E alternates high and low months; that is why its forecast has low confidence and is reviewed with the business." },
      { title: "Possible stockouts", body: "31 South Region products had zero sales and zero stock; they are excluded so demand isn't underestimated." },
    ],
    mailNote: "Every figure in this email can be traced back to its source row. If a number can't be traced, the email isn't sent.",
    ctaTitle: "Does your planning depend on files reviewed by hand?",
    ctaBody:
      "A first conversation reviews how your data arrives today and which parts of the process can be validated, forecast and reported automatically.",
    ctaButton: "Let's talk about your case",
    months: ["Mar 25", "Apr 25", "May 25", "Jun 25", "Jul 25", "Aug 25", "Sep 25", "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26"],
    nextMonth: "Sep 26",
    files: [
      {
        tag: "Central Region",
        name: "Demand_Aug2026_CENTRAL.xlsx",
        meta: "delivered on September 4, 08:42",
        note: "Delivery accepted. The data was loaded and is available for the planning cycle. No action is needed.",
        findings: [],
      },
      {
        tag: "North Region",
        name: "Demand_Aug2026_NORTH.xlsx",
        meta: "delivered on September 4, 11:15",
        note: "The whole file is rejected, never in parts: a partial load would make it impossible to reconcile the month's figures. The detail is attached to the reply so the fix takes minutes, not days.",
        findings: [
          { finding: "Row 47 · code = “PA-12”", action: "Not in the product master. Did you mean P-A012?" },
          { finding: "Declared total 48,230 vs. detail 46,905", action: "Difference of 1,325 units. Check the control sheet." },
          { finding: "Row 112 · date = “31/09/2026”", action: "Invalid date: September has 30 days." },
          { finding: "Price of P-C001 went from 1,180 to 41,300", action: "A 3,400% change. Check the decimal separator." },
        ],
      },
      {
        tag: "South Region",
        name: "Demand_Aug2026_SOUTH.xlsx",
        meta: "delivered on September 5, 16:03",
        note: "The data is loaded, but with an open note. The analyst confirms or corrects; either way, who answered and when is recorded.",
        findings: [
          { finding: "Monthly total −18.4% vs. 3-month average", action: "Outside the ±15% threshold. Confirm whether it is expected." },
          { finding: "Products with zero sales and zero stock", action: "Flagged as a possible stockout so the model learns real demand, not sales limited by shortages." },
        ],
      },
    ],
    rules: [
      { group: "Structure", text: "Columns, data types and date format" },
      { group: "Structure", text: "Decimal and thousands separators" },
      { group: "Catalog", text: "Every code against the current product master" },
      { group: "Integrity", text: "Declared totals against the detail, and duplicate rows" },
      { group: "History", text: "Continuity with the months already loaded" },
      { group: "Statistics", text: "Price jumps that can't be explained for the same product" },
      { group: "Statistics", text: "Outliers, using a method robust to legitimate peaks" },
      { group: "Statistics", text: "Comparison against the recent and seasonal level" },
    ],
    products: ["Product A · case of 12", "Product B · case of 24", "Product C · single unit", "Product D · family pack", "Product E · small format", "Product F · new launch"],
  },

  demosSection: {
    eyebrow: "Demos",
    title: "Systems in production and in the making.",
    body: "Each system answers a real business question.",
    cta: "See the case",
    demoCta: "Try the demo",
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
