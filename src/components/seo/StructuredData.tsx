import { site } from "@/content/site";
import { es } from "@/content/i18n/es";
import { en } from "@/content/i18n/en";

/**
 * JSON-LD structured data. Renders 6 schemas:
 *  - Organization / ProfessionalService (N-AI brand entity)
 *  - Person (Nancy Rodríguez, founder)
 *  - WebSite (with SearchAction)
 *  - Service[] (one per capability — 8 services)
 *  - FAQPage (every Q&A in the visible FAQ section)
 *  - ItemList of services (helps Google show service-list rich results)
 *
 * These power rich results in Google, AI Overview answers, ChatGPT/Perplexity
 * citations, and entity disambiguation for queries like "Nai", "N-AI", "IA",
 * "Nancy Artificial Intelligence", "consultor IA Costa Rica".
 *
 * Strings come from the Spanish dictionary (canonical locale). FAQ entries
 * also include English versions so AI answers in either language can cite.
 */
export default function StructuredData({
  siteUrl,
  lang = "es",
}: {
  siteUrl: string;
  /** Idioma de la página que incrusta este bloque. Se usa en inLanguage. */
  lang?: "es" | "en";
}) {
  const inLanguage = lang === "es" ? "es-CR" : "en-US";
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: "N-AI",
    alternateName: [
      "NAI",
      "Nai",
      "Nancy AI",
      "Nancy Artificial Intelligence",
      "Neural Artificial Intelligence",
      "Neural AI",
      "N-AI · Nancy Artificial Intelligence",
      "N-AI · Neural Artificial Intelligence",
    ],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 1200,
      height: 600,
    },
    image: `${siteUrl}/Nancy.jpg`,
    description:
      "Consultoría ejecutiva de IA e inteligencia de datos. Detección de anomalías, risk scoring, segmentación RFM, perfiles de consumidor, arquitectura de datos y dashboards ejecutivos.",
    founder: { "@id": `${siteUrl}/#nancy` },
    foundingDate: "2026",
    slogan: "Datos · Insights · IA",
    areaServed: [
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "Place", name: "Latin America" },
      { "@type": "Place", name: "Global Spanish-speaking markets" },
    ],
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Inteligencia Artificial",
      "Artificial Intelligence",
      "Data Intelligence",
      "Business Intelligence",
      "Anomaly Detection",
      "Risk Scoring",
      "Predictive Analytics",
      "Consumer Intelligence",
      "Customer Segmentation",
      "RFM Segmentation",
      "Executive Dashboards",
      "Data Governance",
      "Data Architecture",
      "Machine Learning",
      "Public Procurement Intelligence",
      "SICOP",
      "Credit Pre-Approval",
      "Credit Decision Engines",
      "Pre-aprobación crediticia",
      "Motor de decisión crediticia",
      "NIF compliance",
      "SUGEF compliance",
      "Financial services automation",
      "Regulated banking analytics",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: site.contact.email,
      availableLanguage: ["es", "en"],
    },
    sameAs: [site.contact.linkedin, site.contact.scholar, site.contact.github],
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
    // Person -> retrato recortado (es lo que Google puede mostrar en un panel
    // de conocimiento). La organizacion usa la composicion de marca completa.
    image: `${siteUrl}/nancy-retrato.jpg`,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Escazú",
      addressRegion: "San José",
      addressCountry: "CR",
    },
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Artificial Intelligence",
      "Data Science",
      "Advanced Analytics",
      "Business Intelligence",
      "Data Strategy",
      "Consumer Intelligence",
      "Predictive Modeling",
      "Data Governance",
      "Data Architecture",
      "Executive Intelligence Systems",
      "RFM Segmentation",
      "Public Procurement Intelligence",
    ],
    sameAs: [site.contact.linkedin, site.contact.scholar, site.contact.github],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "N-AI",
    alternateName: [
      "NAI",
      "Nai",
      "Nancy Artificial Intelligence",
      "Neural Artificial Intelligence",
    ],
    description: "Consultoría ejecutiva de IA e inteligencia de datos.",
    inLanguage,
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

  // One Service entity per capability — gives AI engines structured "this entity offers X"
  // so prompts like "who offers data architecture consulting in Costa Rica" can match.
  const services = es.capabilities.map((cap, idx) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service-${idx}`,
    serviceType: cap.title,
    name: cap.title,
    description: cap.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "Place", name: "Latin America" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: ["Executive teams", "Government innovation leads", "Category leaders"],
    },
  }));

  // FAQPage schema — Google can show "People also ask" rich result + AI engines
  // grab citation-ready answers directly. We include both ES and EN so AIs in either
  // language can cite. (Duplicating Q&A in two languages is acceptable and common.)
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: [
      ...es.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
        inLanguage: "es",
      })),
      ...en.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
        inLanguage: "en",
      })),
    ],
  };

  const allSchemas = [organization, person, website, ...services, faqPage];

  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // dangerouslySetInnerHTML is the standard pattern for JSON-LD blobs.
          // Content is fully controlled (no user input), so this is safe.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
