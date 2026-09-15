// Configuración visual de las demos. Los textos viven en src/content/i18n/{es,en}.ts (`t.demos`).

export type DemoStatus = "Live" | "In Build" | "Concept";
export type DemoPreview = "anomaly" | "automation" | "decision" | "heat" | "consumer" | "graph";

export interface DemoStatic {
  slug: string;
  preview: DemoPreview;
}

export const demoStatic: readonly DemoStatic[] = [
  { slug: "public-procurement-intelligence", preview: "anomaly" },
  { slug: "data-automation", preview: "automation" },
  { slug: "credit-preapproval", preview: "decision" },
  { slug: "heatsight-ai", preview: "heat" },
  { slug: "consumer-intelligence", preview: "consumer" },
  { slug: "data-governance-intelligence", preview: "graph" },
];
