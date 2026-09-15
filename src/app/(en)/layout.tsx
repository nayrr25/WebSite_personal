import type { Metadata, Viewport } from "next";
import "../globals.css";
import RootShell, { SITE_URL } from "../_shell/RootShell";

/* Layout raíz del INGLÉS — sirve /en. */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "AI & Data Analytics Consulting in Costa Rica · N-AI",
    template: "%s · N-AI",
  },
  description:
    "Expert AI, automation and advanced analytics consulting in Costa Rica and Latin America. SICOP case, decision engines and automated reporting.",
  // hreflang REAL: cada idioma apunta a su propia URL. Antes ambos apuntaban
  // a "/" y Google veía una sola página, en español.
  alternates: {
    canonical: "/en",
    // "es" cubre toda Latinoamérica; "es-CR" se mantiene para Costa Rica.
    languages: {
      es: "/",
      "es-CR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  // Sin meta keywords: Google la ignora. Los temas se trabajan con contenido.
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
    locale: "en_US",
    alternateLocale: ["es_CR"],
    url: "/en",
    title: "AI & Data Analytics Consulting in Costa Rica · N-AI",
    description: "Expert AI, automation and advanced analytics consulting in Costa Rica and Latin America. SICOP case, decision engines and automated reporting.",
    siteName: "N-AI · Nancy Artificial Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Data Analytics Consulting in Costa Rica · N-AI",
    description: "Expert AI, automation and advanced analytics consulting in Costa Rica and Latin America. SICOP case, decision engines and automated reporting.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1024",
  colorScheme: "dark",
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
