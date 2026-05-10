import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Database,
  LineChart,
  AlertTriangle,
  Users,
  LayoutGrid,
  Shield,
  Server,
} from "lucide-react";

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    icon: Brain,
    title: "AI & Intelligence Systems",
    description:
      "End-to-end design of AI-powered systems for executive surfaces, decision flows and operational reasoning.",
  },
  {
    icon: Database,
    title: "Data Strategy & Governance",
    description:
      "From data inventory to lineage, quality, ownership and regulatory posture — strategy made operable.",
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description:
      "Forecasting, scenario modeling and forward-looking metrics built directly into executive workflows.",
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description:
      "Detect what should not be there — temporal, structural and behavioral signals modeled at scale.",
  },
  {
    icon: Users,
    title: "Consumer Intelligence",
    description:
      "Behavioral segmentation, revealed preference and demand sensing for category and retail leaders.",
  },
  {
    icon: LayoutGrid,
    title: "Executive Dashboards",
    description:
      "Surfaces designed for the way executives actually decide — not the way data engineers think.",
  },
  {
    icon: Shield,
    title: "Risk Analytics",
    description:
      "Composite risk scoring with auditable components — the score and the why, in the same view.",
  },
  {
    icon: Server,
    title: "Data Infrastructure",
    description:
      "Pipelines, schemas, validation and observability — the substrate beneath every reliable signal.",
  },
];
