import type { Metadata, Viewport } from "next";
import "../globals.css";
import RootShell, { SITE_URL } from "../_shell/RootShell";

/* Layout raíz del INGLÉS — sirve /en. */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "N-AI · AI, BI & Data Consulting in Costa Rica and LATAM — Nancy Artificial Intelligence",
    template: "%s · N-AI",
  },
  description:
    "AI consulting, Business Intelligence and data architecture for companies in Costa Rica and Latin America. Specialists in public procurement intelligence (SICOP), RFM segmentation, consumer profiling and executive dashboards. Founded by Nancy Rodríguez.",
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
    // Brand variations
    "N-AI",
    "NAI",
    "Nai",
    "Nancy AI",
    "Nancy IA",
    "Nancy Artificial Intelligence",
    "Nancy Inteligencia Artificial",
    "Nancy Rodríguez consultora",
    // Dual meaning — Neural Artificial Intelligence
    "Neural AI",
    "Neural Artificial Intelligence",
    "Neural Intelligence",
    // Primary commercial intent — Costa Rica & LATAM
    "consultoría IA Costa Rica",
    "consultoría inteligencia artificial Costa Rica",
    "consultor IA Costa Rica",
    "consultoría IA LATAM",
    "consultoría IA Latinoamérica",
    "empresa de IA Costa Rica",
    "consultoría BI Costa Rica",
    "consultoría Business Intelligence LATAM",
    "consultor BI Costa Rica",
    "inteligencia de datos Costa Rica",
    "inteligencia de datos LATAM",
    // SICOP / public procurement (cero competencia)
    "SICOP analytics",
    "SICOP inteligencia",
    "SICOP analítica",
    "inteligencia compras públicas",
    "public procurement intelligence",
    "analítica compras públicas Costa Rica",
    // RFM / consumer
    "consultoría RFM",
    "segmentación RFM Costa Rica",
    "segmentación RFM LATAM",
    "consultoría CRM analytics",
    "inteligencia de consumidor",
    "perfiles de consumidor consumo masivo",
    "consumer intelligence FMCG LATAM",
    // Crédito / financiero / regulación
    "motor de decisión crediticia",
    "pre-aprobación crediticia",
    "credit pre-approval engine",
    "automatización crédito Costa Rica",
    "consultoría crédito SUGEF",
    "consultoría NIF Costa Rica",
    "SUGEF analytics",
    "scoring crediticio",
    "credit decision automation LATAM",
    "cumplimiento NIF SUGEF",
    "automatización banca Costa Rica",
    "consultoría sector financiero IA Costa Rica",
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
    title: "N-AI · AI, BI & Data Consulting in Costa Rica and LATAM — Nancy Artificial Intelligence",
    description: "AI consulting, Business Intelligence and data architecture for companies in Costa Rica and Latin America. Specialists in public procurement intelligence (SICOP), RFM segmentation, consumer profiling and executive dashboards. Founded by Nancy Rodríguez.",
    siteName: "N-AI · Nancy Artificial Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-AI · AI, BI & Data Consulting in Costa Rica and LATAM — Nancy Artificial Intelligence",
    description: "AI consulting, Business Intelligence and data architecture for companies in Costa Rica and Latin America. Specialists in public procurement intelligence (SICOP), RFM segmentation, consumer profiling and executive dashboards. Founded by Nancy Rodríguez.",
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
