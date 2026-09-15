import type { Metadata } from "next";
import CaseSicop from "../../../../_shell/CaseSicop";
import { SITE_URL } from "../../../../_shell/RootShell";
import { en } from "@/content/i18n/en";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: en.caseSicop.metaTitle,
  description: en.caseSicop.metaDescription,
  alternates: {
    canonical: "/en/cases/sicop",
    languages: { es: "/casos/sicop", "es-CR": "/casos/sicop", "en-US": "/en/cases/sicop", "x-default": "/casos/sicop" },
  },
  // Al definir openGraph en la página se reemplaza el heredado del layout,
  // así que la imagen para redes se declara de forma explícita.
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/en/cases/sicop",
    title: en.caseSicop.metaTitle,
    description: en.caseSicop.metaDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: en.caseSicop.metaTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: en.caseSicop.metaTitle,
    description: en.caseSicop.metaDescription,
    images: ["/opengraph-image"],
  },
};

export default function CaseSicopPageEn() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: en.caseSicop.title,
    description: en.caseSicop.metaDescription,
    inLanguage: "en-US",
    url: `${SITE_URL}/en/cases/sicop`,
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
