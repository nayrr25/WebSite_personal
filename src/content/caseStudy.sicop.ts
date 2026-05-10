export const sicop = {
  eyebrow: "Featured Case Study",
  title: "Public Procurement Intelligence",
  subtitle:
    "Complete SICOP intelligence architecture for anomaly detection, risk scoring and preventive monitoring.",
  kpis: [
    { value: ">2.4M", label: "Procurement records analyzed", suffix: "" },
    { value: "47", label: "Anomaly patterns modeled", suffix: "" },
    { value: "8", label: "Institutional risk dimensions", suffix: "" },
    { value: "<1s", label: "Risk scoring latency", suffix: "" },
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
      visual: "ChallengePoints",
    },
    {
      id: "infrastructure",
      number: "02",
      title: "Data Infrastructure",
      lead:
        "Inventory and structuring of the complete SICOP ecosystem — every source, every schema, every relationship.",
      body:
        "We mapped the SICOP data graph end-to-end: solicitations, awards, contracts, addenda, supplier registries, sanctions, institutional metadata. Each source was inventoried, schemas reconciled, and relationships modeled into a unified graph that downstream pipelines can reason over.",
      visual: "InfrastructureDiagram",
    },
    {
      id: "pipeline",
      number: "03",
      title: "Intelligence Pipeline",
      lead:
        "Seven-stage pipeline from raw extraction to preventive monitoring — the spine of the whole system.",
      body:
        "Each stage is independently testable, observable and replayable. Raw sources flow through extraction, structural inventory, unification, validation, anomaly detection, risk scoring and into the monitoring layer that powers executive surveillance.",
      visual: "PipelineLink",
    },
    {
      id: "anomaly",
      number: "04",
      title: "AI Anomaly Detection",
      lead:
        "Forty-seven anomaly patterns modeled across temporal, structural and behavioral signals.",
      body:
        "Rule-based detectors catch the obvious; learned models surface the subtle: unusual award velocity, supplier concentration drift, pricing breaks vs. peer baselines, and addendum sequences that statistically precede irregularities. Outputs are scored, ranked, and explainable.",
      visual: "AnomalyChart",
    },
    {
      id: "risk",
      number: "05",
      title: "Risk Scoring System",
      lead:
        "Eight institutional risk dimensions composed into a single executive score with traceable components.",
      body:
        "Each institution carries a score that decomposes into dimensions auditors and decision-makers actually reason about: contracting velocity, supplier concentration, pricing dispersion, addendum exposure, sanction proximity, transparency posture, control maturity and historical signal density.",
      visual: "RiskGauge",
    },
    {
      id: "institutional",
      number: "06",
      title: "Institutional Intelligence",
      lead:
        "A single executive surface where every institution has its own risk profile, peer comparators and trend.",
      body:
        "Heatmap-style triage shows the population at a glance; drilldowns reveal time-series, anomaly contributions and historical events. The same surface answers two questions at once: where to look first, and why.",
      visual: "InstitutionGrid",
    },
    {
      id: "impact",
      number: "07",
      title: "Strategic Impact",
      lead:
        "Three executive outcomes the system unlocks — measured in months, not quarters.",
      body:
        "Preventive oversight replaces reactive audit. Decision velocity improves because risk is visible at the surface, not buried in records. And transparency becomes a deliverable, not an aspiration.",
      visual: "ImpactCards",
    },
  ],
} as const;

export const challengePoints = [
  "Opaque procurement ecosystems",
  "Fragmented, heterogeneous data sources",
  "Inconsistent taxonomies across institutions",
  "Reactive oversight — irregularities surface after harm",
  "Systemic risk patterns left unmodeled",
] as const;

export const infrastructureSources = [
  "Solicitations",
  "Awards",
  "Contracts",
  "Addenda",
  "Supplier Registry",
  "Sanctions",
  "Institutional Metadata",
] as const;

export const pipelineNodes = [
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
] as const;

export const riskDimensions = [
  { label: "Contracting Velocity", value: 78 },
  { label: "Supplier Concentration", value: 62 },
  { label: "Pricing Dispersion", value: 71 },
  { label: "Addendum Exposure", value: 55 },
  { label: "Sanction Proximity", value: 34 },
  { label: "Transparency Posture", value: 82 },
  { label: "Control Maturity", value: 49 },
  { label: "Signal Density", value: 67 },
] as const;

export const institutions: Array<{
  name: string;
  score: number;
  tier: "low" | "medium" | "high" | "critical";
}> = [
  { name: "INSTITUCIÓN A", score: 23, tier: "low" },
  { name: "INSTITUCIÓN B", score: 31, tier: "low" },
  { name: "INSTITUCIÓN C", score: 28, tier: "low" },
  { name: "INSTITUCIÓN D", score: 47, tier: "medium" },
  { name: "INSTITUCIÓN E", score: 52, tier: "medium" },
  { name: "INSTITUCIÓN F", score: 58, tier: "medium" },
  { name: "INSTITUCIÓN G", score: 49, tier: "medium" },
  { name: "INSTITUCIÓN H", score: 71, tier: "high" },
  { name: "INSTITUCIÓN I", score: 76, tier: "high" },
  { name: "INSTITUCIÓN J", score: 68, tier: "high" },
  { name: "INSTITUCIÓN K", score: 84, tier: "critical" },
  { name: "INSTITUCIÓN L", score: 91, tier: "critical" },
];

export const strategicImpact = [
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
] as const;
