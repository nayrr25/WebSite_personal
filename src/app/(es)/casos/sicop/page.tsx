import type { Metadata } from "next";
import CaseSicop from "../../../_shell/CaseSicop";
import { SITE_URL } from "../../../_shell/RootShell";
import { es } from "@/content/i18n/es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: es.caseSicop.metaTitle,
  description: es.caseSicop.metaDescription,
  alternates: {
    canonical: "/casos/sicop",
    languages: { es: "/casos/sicop", "es-CR": "/casos/sicop", "en-US": "/en/cases/sicop", "x-default": "/casos/sicop" },
  },
  // Al definir openGraph en la página se reemplaza el heredado del layout,
  // así que la imagen para redes se declara de forma explícita.
  openGraph: {
    type: "article",
    locale: "es_CR",
    url: "/casos/sicop",
    title: es.caseSicop.metaTitle,
    description: es.caseSicop.metaDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: es.caseSicop.metaTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: es.caseSicop.metaTitle,
    description: es.caseSicop.metaDescription,
    images: ["/opengraph-image"],
  },
};

export default function CaseSicopPage() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: es.caseSicop.title,
    description: es.caseSicop.metaDescription,
    inLanguage: "es-CR",
    url: `${SITE_URL}/casos/sicop`,
    author: { "@id": `${SITE_URL}/#nancy` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <CaseSicop />
    </>
  );
}
