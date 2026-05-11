import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n";
import SkipToContent from "@/components/layout/SkipToContent";
import StructuredData from "@/components/seo/StructuredData";

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
    default: "N-AI — Nancy Artificial Intelligence · Datos · Insights · IA",
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
    "N-AI (Nancy Artificial Intelligence) — Consultoría ejecutiva de IA e inteligencia de datos. Detección de anomalías, risk scoring y sistemas inteligentes para organizaciones que operan al filo de la complejidad.",
  keywords: [
    "N-AI",
    "NAI",
    "Nai",
    "IA",
    "AI",
    "IA Nancy",
    "AI Nancy",
    "IA consultoría",
    "Nancy AI",
    "Nancy IA",
    "Nancy Artificial Intelligence",
    "Nancy Inteligencia Artificial",
    "Nancy Rodríguez",
    "Nancy Rodriguez",
    "Nancy Raquel Rodríguez Ramos",
    "consultoría IA",
    "consultoría inteligencia artificial",
    "inteligencia de datos",
    "data intelligence",
    "detección de anomalías",
    "anomaly detection",
    "risk scoring",
    "analítica ejecutiva",
    "executive analytics",
    "sistemas inteligentes",
    "intelligent systems",
    "inteligencia de compras públicas",
    "public procurement intelligence",
    "SICOP",
    "consultoría AI Costa Rica",
    "data strategy",
    "machine learning consulting",
  ],
  authors: [{ name: "Nancy Rodríguez", url: SITE_URL }],
  creator: "Nancy Rodríguez",
  publisher: "N-AI · Nancy Artificial Intelligence",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "es_CR",
    alternateLocale: ["en_US"],
    url: "/",
    title: "N-AI — Nancy Artificial Intelligence",
    description:
      "Analítica con IA, detección de anomalías y diseño de sistemas inteligentes para líderes ejecutivos.",
    siteName: "N-AI · Nancy Artificial Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-AI — Nancy Artificial Intelligence",
    description:
      "Analítica con IA, detección de anomalías y diseño de sistemas inteligentes para líderes ejecutivos.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Verification meta tags are added at runtime once GSC/Bing verification is set up.
  // verification: { google: "...", other: { "msvalidate.01": "..." } },
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
        <StructuredData siteUrl={SITE_URL} />
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
