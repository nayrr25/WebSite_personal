// Static, language-agnostic site data. Everything translatable lives in src/content/i18n/.
export const site = {
  brand: {
    name: "N-AI",
    fullName: "Nancy Artificial Intelligence",
  },
  contact: {
    email: "nancyrodriguez@n-ai.dev",
    linkedin: "https://www.linkedin.com/in/nancy-raquel-rodríguez-ramos",
    scholar: "https://scholar.google.com/citations?hl=es&user=8_wBYo4AAAAJ",
    github: "https://github.com/nayrr25",
    // WhatsApp uses wa.me format with country code, no + or spaces
    whatsapp: "https://wa.me/50660028160",
    whatsappDisplay: "+506 6002 8160",
  },
  url: "https://n-ai.dev",
} as const;

export type Site = typeof site;
