export const site = {
  brand: {
    name: "N-AI",
    fullName: "Nancy Artificial Intelligence",
    tagline: "Data · Insights · AI",
    subBrand: "Neural Analytics & Intelligence",
  },
  contact: {
    email: "hello@n-ai.dev",
    linkedin: "https://www.linkedin.com/in/nancy-rodriguez",
  },
  url: "https://n-ai.dev",
  nav: [
    { label: "Case Study", href: "#case-study" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Demos", href: "#demos" },
    { label: "About", href: "#about" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Contact", href: "#contact" },
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
} as const;

export type Site = typeof site;
