import { site } from "@/content/site";

/**
 * JSON-LD structured data. Renders 3 schemas:
 *  - Organization (N-AI brand entity)
 *  - Person (Nancy Rodríguez, founder)
 *  - WebSite (with SearchAction so Google can offer a sitelinks searchbox)
 *
 * These power rich results in Google, AI Overview answers, and improve
 * matching for short brand queries like "Nai", "N-AI", "IA", and
 * "Nancy Artificial Intelligence".
 */
export default function StructuredData({ siteUrl }: { siteUrl: string }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "N-AI",
    alternateName: [
      "NAI",
      "Nai",
      "Nancy AI",
      "Nancy Artificial Intelligence",
      "N-AI · Nancy Artificial Intelligence",
    ],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 1200,
      height: 600,
    },
    description:
      "Consultoría ejecutiva de IA e inteligencia de datos. Detección de anomalías, risk scoring y sistemas inteligentes.",
    founder: { "@id": `${siteUrl}/#nancy` },
    foundingDate: "2026",
    slogan: "Datos · Insights · IA",
    knowsAbout: [
      "Inteligencia Artificial",
      "Artificial Intelligence",
      "Data Intelligence",
      "Anomaly Detection",
      "Risk Scoring",
      "Predictive Analytics",
      "Consumer Intelligence",
      "Executive Dashboards",
      "Data Governance",
      "Machine Learning",
      "Public Procurement Intelligence",
      "SICOP",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: site.contact.email,
      availableLanguage: ["es", "en"],
    },
    sameAs: [site.contact.linkedin],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#nancy`,
    name: "Nancy Rodríguez",
    alternateName: [
      "Nancy Raquel Rodríguez Ramos",
      "Nancy Rodriguez",
      "Nancy Raquel Rodriguez",
    ],
    givenName: "Nancy",
    additionalName: "Raquel",
    familyName: "Rodríguez Ramos",
    jobTitle: "Founder · Data & AI Strategist",
    worksFor: { "@id": `${siteUrl}/#organization` },
    url: siteUrl,
    image: `${siteUrl}/Nancy.png`,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Escazú",
      addressRegion: "San José",
      addressCountry: "CR",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Data Science",
      "Advanced Analytics",
      "Data Strategy",
      "Consumer Intelligence",
      "Predictive Modeling",
      "Data Governance",
      "Executive Intelligence Systems",
    ],
    sameAs: [site.contact.linkedin],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "N-AI",
    alternateName: ["NAI", "Nai", "Nancy Artificial Intelligence"],
    description: "Consultoría ejecutiva de IA e inteligencia de datos.",
    inLanguage: ["es-CR", "en-US"],
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // dangerouslySetInnerHTML is the standard pattern for JSON-LD blobs.
        // Content is fully controlled, no user input — safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
