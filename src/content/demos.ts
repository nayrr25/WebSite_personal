// Static demo metadata. Translatable strings live in src/content/i18n/{es,en}.ts under `t.demos`.

export type DemoStatus = "Live" | "In Build" | "Concept";
export type DemoPreview = "anomaly" | "heat" | "flow" | "decision" | "graph";

export interface DemoStatic {
  slug: string;
  preview: DemoPreview;
  span?: 1 | 2;
}

export const demoStatic: DemoStatic[] = [
  { slug: "public-procurement-intelligence", preview: "anomaly" },
  { slug: "heatsight-ai", preview: "heat" },
  { slug: "consumer-intelligence", preview: "flow" },
  { slug: "credit-preapproval", preview: "decision" },
  { slug: "data-governance-intelligence", preview: "graph", span: 2 },
];
