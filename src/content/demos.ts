export type DemoStatus = "Live" | "In Build" | "Concept";

export interface Demo {
  slug: string;
  title: string;
  status: DemoStatus;
  description: string;
  preview: "anomaly" | "heat" | "flow" | "decision" | "graph";
  span?: 1 | 2;
}

export const demos: Demo[] = [
  {
    slug: "public-procurement-intelligence",
    title: "Public Procurement Intelligence",
    status: "Live",
    description:
      "SICOP-wide anomaly detection, risk scoring and preventive monitoring at executive resolution.",
    preview: "anomaly",
  },
  {
    slug: "heatsight-ai",
    title: "HeatSight AI",
    status: "In Build",
    description:
      "Consumer demand sensing across geographies and SKUs — micro-trends surfaced before they hit the report.",
    preview: "heat",
  },
  {
    slug: "consumer-intelligence",
    title: "Consumer Intelligence",
    status: "In Build",
    description:
      "Behavioral segmentation and revealed-preference modeling for category leaders and retail strategists.",
    preview: "flow",
  },
  {
    slug: "ai-decision-engine",
    title: "AI Decision Engine",
    status: "Concept",
    description:
      "An executive surface for trade-offs: simulate decisions, score outcomes, audit reasoning end-to-end.",
    preview: "decision",
  },
  {
    slug: "data-governance-intelligence",
    title: "Data Governance Intelligence",
    status: "Concept",
    description:
      "Lineage, quality, ownership and regulatory posture made visible at the institutional scale.",
    preview: "graph",
    span: 2,
  },
];
