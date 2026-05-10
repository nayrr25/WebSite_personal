import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n";
import SkipToContent from "@/components/layout/SkipToContent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-ai.dev";

// Spanish is the default/canonical locale; English is offered via in-page toggle.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "N-AI — Datos · Insights · IA",
    template: "%s · N-AI",
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CR": "/",
      "en-US": "/",
    },
  },
  description:
    "Consultoría ejecutiva de IA e inteligencia de datos. Detección de anomalías, risk scoring y sistemas inteligentes para organizaciones que operan al filo de la complejidad.",
  keywords: [
    "consultoría IA",
    "inteligencia de datos",
    "detección de anomalías",
    "risk scoring",
    "analítica ejecutiva",
    "Nancy Rodriguez",
    "N-AI",
  ],
  authors: [{ name: "Nancy Rodriguez" }],
  creator: "Nancy Rodriguez",
  openGraph: {
    type: "website",
    locale: "es_CR",
    alternateLocale: ["en_US"],
    url: "/",
    title: "N-AI — Datos · Insights · IA",
    description:
      "Analítica con IA, detección de anomalías y diseño de sistemas inteligentes para líderes ejecutivos.",
    siteName: "N-AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-AI — Datos · Insights · IA",
    description:
      "Analítica con IA, detección de anomalías y diseño de sistemas inteligentes para líderes ejecutivos.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
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
