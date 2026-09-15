import type { Metadata } from "next";
import DemoDemand from "../../../_shell/DemoDemand";
import { SITE_URL } from "../../../_shell/RootShell";
import { es } from "@/content/i18n/es";
import { DEMO_DEMAND_PATH } from "@/lib/routes";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: es.demoDemand.metaTitle,
  description: es.demoDemand.metaDescription,
  alternates: {
    canonical: DEMO_DEMAND_PATH.es,
    languages: {
      es: DEMO_DEMAND_PATH.es,
      "es-CR": DEMO_DEMAND_PATH.es,
      "en-US": DEMO_DEMAND_PATH.en,
      "x-default": DEMO_DEMAND_PATH.es,
    },
  },
  // Al definir openGraph en la página se reemplaza el heredado del layout,
  // así que la imagen para redes se declara de forma explícita.
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: DEMO_DEMAND_PATH.es,
    title: es.demoDemand.metaTitle,
    description: es.demoDemand.metaDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: es.demoDemand.metaTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: es.demoDemand.metaTitle,
    description: es.demoDemand.metaDescription,
    images: ["/opengraph-image"],
  },
};

export default function DemoDemandPage() {
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: es.demoDemand.metaTitle,
    description: es.demoDemand.metaDescription,
    inLanguage: "es-CR",
    url: `${SITE_URL}${DEMO_DEMAND_PATH.es}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    // Automatización (validación) y analítica avanzada (pronóstico y patrones).
    about: [{ "@id": `${SITE_URL}/#service-1` }, { "@id": `${SITE_URL}/#service-2` }],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page) }} />
      <DemoDemand />
    </>
  );
}
