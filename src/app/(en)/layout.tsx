import type { Metadata, Viewport } from "next";
import "../globals.css";
import RootShell, { SITE_URL } from "../_shell/RootShell";

/* Layout raíz del INGLÉS — sirve /en. */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "AI & Data Consulting in Costa Rica · N-AI",
    template: "%s · N-AI",
  },
  description:
    "AI, Business Intelligence and data architecture consulting in Costa Rica and LATAM. Public procurement intelligence, credit scoring and RFM. Let's talk.",
  // hreflang REAL: cada idioma apunta a su propia URL. Antes ambos apuntaban
  // a "/" y Google veía una sola página, en español.
  alternates: {
    canonical: "/en",
    languages: {
      "es-CR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  keywords: [
    // Diez terminos, no 67. Google ignora esta etiqueta desde 2009, asi que su
    // unico efecto real era documentar una estrategia dispersa. Estos diez son
    // los que el sitio puede defender de verdad: los nichos donde hay casos
    // reales detras y practicamente ninguna competencia comercial.
    "consultoria IA Costa Rica",
    "consultoria Business Intelligence Costa Rica",
    "inteligencia de compras publicas SICOP",
    "analitica SICOP Costa Rica",
    "deteccion de anomalias compras publicas",
    "motor de decision crediticia",
    "automatizacion crediticia SUGEF",
    "segmentacion RFM consumo masivo",
    "inteligencia de consumidor LATAM",
    "Nancy Rodriguez consultora datos",
  ],
  authors: [{ name: "Nancy Rodríguez", url: SITE_URL }],
  creator: "Nancy Rodríguez",
  publisher: "N-AI · Nancy Artificial Intelligence",
  category: "Technology",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_CR"],
    url: "/en",
    title: "AI & Data Consulting in Costa Rica · N-AI",
    description: "AI, Business Intelligence and data architecture consulting in Costa Rica and LATAM. Public procurement intelligence, credit scoring and RFM. Let's talk.",
    siteName: "N-AI · Nancy Artificial Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Data Consulting in Costa Rica · N-AI",
    description: "AI, Business Intelligence and data architecture consulting in Costa Rica and LATAM. Public procurement intelligence, credit scoring and RFM. Let's talk.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F5F9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="en">{children}</RootShell>;
}
