import type { Metadata, Viewport } from "next";
import "../globals.css";
import RootShell, { SITE_URL } from "../_shell/RootShell";

/* Layout raíz del ESPAÑOL — sirve la raíz del sitio (/). Es el canónico. */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Consultoría de IA y Datos en Costa Rica · N-AI",
    template: "%s · N-AI",
  },
  description:
    "Consultoría de IA, Business Intelligence y arquitectura de datos en Costa Rica y LATAM. Inteligencia de compras públicas, scoring y RFM. Conversemos.",
  // hreflang REAL: cada idioma apunta a su propia URL. Antes ambos apuntaban
  // a "/" y Google veía una sola página, en español.
  alternates: {
    canonical: "/",
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

  // Verificacion de propiedad en buscadores.
  //
  // Los tokens NO van hardcodeados: se leen de variables de entorno, asi que
  // agregar o rotar una verificacion no requiere tocar codigo ni abrir un PR.
  // Si la variable no esta definida, la etiqueta simplemente no se emite.
  //
  // Nota: si verificas por DOMINIO via registro TXT de DNS (la opcion
  // recomendada, porque cubre / y /en y ambos protocolos de una vez), no
  // necesitas ninguna de estas variables. Estan aqui como alternativa para
  // la verificacion por prefijo de URL.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION },
    }),
  },
  openGraph: {
    type: "website",
    locale: "es_CR",
    alternateLocale: ["en_US"],
    url: "/",
    title: "Consultoría de IA y Datos en Costa Rica · N-AI",
    description: "Consultoría de IA, Business Intelligence y arquitectura de datos en Costa Rica y LATAM. Inteligencia de compras públicas, scoring y RFM. Conversemos.",
    siteName: "N-AI · Nancy Artificial Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultoría de IA y Datos en Costa Rica · N-AI",
    description: "Consultoría de IA, Business Intelligence y arquitectura de datos en Costa Rica y LATAM. Inteligencia de compras públicas, scoring y RFM. Conversemos.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F5F9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function SpanishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="es">{children}</RootShell>;
}
