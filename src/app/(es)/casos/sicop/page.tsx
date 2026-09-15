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
    languages: { "es-CR": "/casos/sicop", "en-US": "/en/cases/sicop", "x-default": "/casos/sicop" },
  },
  openGraph: {
    type: "article",
    locale: "es_CR",
    url: "/casos/sicop",
    title: es.caseSicop.metaTitle,
    description: es.caseSicop.metaDescription,
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
