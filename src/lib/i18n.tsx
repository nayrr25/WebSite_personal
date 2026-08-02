"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { es, type Strings } from "@/content/i18n/es";
import { en } from "@/content/i18n/en";

export type Lang = "es" | "en";

export const DEFAULT_LANG: Lang = "es";

const DICTIONARY: Record<Lang, Strings> = { es, en };

/** Ruta de cada idioma. El español vive en la raíz por ser el canónico. */
export const LANG_PATH: Record<Lang, string> = { es: "/", en: "/en" };

/** El idioma contrario — lo usa el conmutador del nav. */
export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}

interface LanguageContextValue {
  lang: Lang;
  t: Strings;
  /** El idioma contrario. */
  other: Lang;
  /** Ruta a la versión en el otro idioma. */
  otherHref: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * El idioma lo determina la RUTA, no el estado del cliente.
 *
 * La versión anterior lo guardaba en `localStorage` y lo hidrataba tras el
 * montaje. Consecuencia: los dos idiomas compartían la URL `/`, el HTML que
 * recibía Google siempre estaba en español, y la traducción completa al
 * inglés no existía para los buscadores. Además provocaba un parpadeo en la
 * primera carga cuando el idioma guardado no era el de por defecto.
 *
 * Ahora `lang` llega desde el layout raíz de cada ruta: el HTML sale del
 * servidor ya en el idioma correcto y el conmutador es un enlace normal.
 */
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const value = useMemo<LanguageContextValue>(() => {
    const other = otherLang(lang);
    return { lang, t: DICTIONARY[lang], other, otherHref: LANG_PATH[other] };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}

/** Azúcar — solo las cadenas. */
export function useT(): Strings {
  return useLanguage().t;
}
