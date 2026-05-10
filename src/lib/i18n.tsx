"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { es, type Strings } from "@/content/i18n/es";
import { en } from "@/content/i18n/en";

export type Lang = "es" | "en";
const STORAGE_KEY = "n-ai.lang";
const DEFAULT_LANG: Lang = "es";

const DICTIONARY: Record<Lang, Strings> = { es, en };

interface LanguageContextValue {
  lang: Lang;
  t: Strings;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR-safe: start with default, hydrate from localStorage on mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "es" || stored === "en") {
        setLangState(stored);
      }
    } catch {
      // ignore — private mode, etc.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    // Update <html lang> for accessibility + SEO.
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang, ready]);

  const setLang = (next: Lang) => setLangState(next);
  const toggle = () => setLangState((prev) => (prev === "es" ? "en" : "es"));

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: DICTIONARY[lang], setLang, toggle }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider>");
  }
  return ctx;
}

/** Sugar — just the strings. Convenient when you don't need to toggle. */
export function useT(): Strings {
  return useLanguage().t;
}
