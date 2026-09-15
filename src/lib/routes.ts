export type Lang = "es" | "en";

/** El español vive en la raíz por ser el idioma canónico. */
export const HOME_PATH: Record<Lang, string> = { es: "/", en: "/en" };

export const CASE_SICOP_PATH: Record<Lang, string> = {
  es: "/casos/sicop",
  en: "/en/cases/sicop",
};

export const DEMO_DEMAND_PATH: Record<Lang, string> = {
  es: "/demos/planificacion-de-demanda",
  en: "/en/demos/demand-planning",
};

/** Páginas con una versión equivalente en el otro idioma. */
const PAIRED_PAGES = [CASE_SICOP_PATH, DEMO_DEMAND_PATH];

/** Enlace a una sección de la portada que funciona desde cualquier página. */
export function homeAnchor(lang: Lang, hash: string): string {
  return lang === "es" ? `/${hash}` : `/en${hash}`;
}

/** Ruta equivalente en el otro idioma, para el conmutador del menú. */
export function alternateHref(pathname: string, lang: Lang): string {
  const other: Lang = lang === "es" ? "en" : "es";
  for (const page of PAIRED_PAGES) {
    if (pathname === page[lang]) return page[other];
  }
  return HOME_PATH[other];
}
