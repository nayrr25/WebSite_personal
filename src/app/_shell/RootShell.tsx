import type { ReactNode } from "react";
import { Public_Sans, Archivo, Instrument_Serif } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import SkipToContent from "@/components/layout/SkipToContent";
import StructuredData from "@/components/seo/StructuredData";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleTagManager";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

/**
 * Cascarón común de los dos layouts raíz.
 *
 * El sitio usa el patrón de MÚLTIPLES LAYOUTS RAÍZ de Next App Router:
 * `src/app/(es)/layout.tsx` sirve `/` en español y `src/app/(en)/layout.tsx`
 * sirve `/en` en inglés. Los grupos entre paréntesis no aparecen en la URL.
 *
 * Solo un layout raíz puede renderizar <html>, así que cada idioma tiene el
 * suyo y puede declarar su propio `lang`. Este componente concentra todo lo
 * que comparten para que no se dupliquen fuentes, analítica ni estructura.
 *
 * Por qué se hizo así: antes el idioma vivía en `localStorage` y ambos
 * idiomas compartían la URL `/`. Para Google eso significaba una sola página
 * en español — la traducción completa al inglés era invisible para los
 * buscadores. Ahora cada idioma tiene su propia URL, su propio HTML servido
 * desde el servidor y su `hreflang` apuntando al otro.
 */

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: true,
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  adjustFontFallback: true,
});

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-ai.dev";

export default function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang === "es" ? "es-CR" : "en"}
      className={`${publicSans.variable} ${archivo.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <GoogleTagManager />
        <GoogleTagManagerNoScript />
        <GoogleAnalytics />
        <StructuredData siteUrl={SITE_URL} lang={lang} />
        <LanguageProvider lang={lang}>
          <SkipToContent />
          <Nav />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
