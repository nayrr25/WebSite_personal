import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-ai.dev";

/**
 * Portada, caso SICOP y demo de demanda, cada uno con su versión en el otro idioma.
 * La portada va sin barra final, igual que el canonical y og:url.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const home = {
    languages: {
      es: SITE_URL,
      "es-CR": SITE_URL,
      "en-US": `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  };
  const caseSicop = {
    languages: {
      es: `${SITE_URL}/casos/sicop`,
      "es-CR": `${SITE_URL}/casos/sicop`,
      "en-US": `${SITE_URL}/en/cases/sicop`,
      "x-default": `${SITE_URL}/casos/sicop`,
    },
  };

  const demoDemand = {
    languages: {
      es: `${SITE_URL}/demos/planificacion-de-demanda`,
      "es-CR": `${SITE_URL}/demos/planificacion-de-demanda`,
      "en-US": `${SITE_URL}/en/demos/demand-planning`,
      "x-default": `${SITE_URL}/demos/planificacion-de-demanda`,
    },
  };

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1.0, alternates: home },
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: home },
    { url: `${SITE_URL}/casos/sicop`, lastModified, changeFrequency: "yearly", priority: 0.8, alternates: caseSicop },
    { url: `${SITE_URL}/en/cases/sicop`, lastModified, changeFrequency: "yearly", priority: 0.7, alternates: caseSicop },
    { url: `${SITE_URL}/demos/planificacion-de-demanda`, lastModified, changeFrequency: "yearly", priority: 0.8, alternates: demoDemand },
    { url: `${SITE_URL}/en/demos/demand-planning`, lastModified, changeFrequency: "yearly", priority: 0.7, alternates: demoDemand },
  ];
}
