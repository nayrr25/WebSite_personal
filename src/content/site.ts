// Static, language-agnostic site data. Everything translatable lives in src/content/i18n/.
export const site = {
  brand: {
    name: "N-AI",
    fullName: "Nancy Artificial Intelligence",
  },
  contact: {
    email: "nancyrodriguez@n-ai.dev",
    linkedin: "https://www.linkedin.com/in/nancy-raquel-rodríguez-ramos",
  },
  url: "https://n-ai.dev",
} as const;

export type Site = typeof site;
