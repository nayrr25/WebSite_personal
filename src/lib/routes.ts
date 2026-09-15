export type Lang = "es" | "en";

/** El español vive en la raíz por ser el idioma canónico. */
export const HOME_PATH: Record<Lang, string> = { es: "/", en: "/en" };

export const CASE_SICOP_PATH: Record<Lang, string> = {
  es: "/casos/sicop",
  en: "/en/cases/sicop",
};

/** Enlace a una sección de la portada que funciona desde cualquier página. */
export function homeAnchor(lang: Lang, hash: string): string {
  return lang === "es" ? `/${hash}` : `/en${hash}`;
}

/** Ruta equivalente en el otro idioma, para el conmutador del menú. */
export function alternateHref(pathname: string, lang: Lang): string {
  const other: Lang = lang === "es" ? "en" : "es";
  if (pathname === CASE_SICOP_PATH[lang]) return CASE_SICOP_PATH[other];
  return HOME_PATH[other];
}
