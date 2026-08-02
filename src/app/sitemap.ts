import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-ai.dev";

/**
 * Las dos versiones de idioma, cada una con sus alternativas declaradas.
 *
 * Antes el sitemap tenía una sola URL porque el idioma vivía en localStorage
 * y no existía una dirección para el inglés. Ahora Google puede descubrir e
 * indexar las dos.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alternates = {
    languages: {
      "es-CR": `${SITE_URL}/`,
      "en-US": `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/`,
    },
  };

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates,
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates,
    },
  ];
}
