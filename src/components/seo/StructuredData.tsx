import { EDUCATION } from "@/content/data/education";
import { site } from "@/content/site";
import { es } from "@/content/i18n/es";
import { en } from "@/content/i18n/en";

/**
 * JSON-LD de la portada:
 *  - Organization / ProfessionalService (N-AI), con dirección y teléfono
 *  - Person (Nancy Rodríguez, fundadora)
 *  - WebSite
 *  - Service[] (una por línea de servicio visible)
 *  - FAQPage (solo las preguntas visibles en el idioma de la página)
 *
 * Regla: el schema describe lo que la página muestra. Nada de preguntas en
 * otro idioma, búsqueda interna inexistente ni alias que confundan la marca.
 */
export default function StructuredData({
  siteUrl,
  lang = "es",
}: {
  siteUrl: string;
  /** Idioma de la página que incrusta este bloque. */
  lang?: "es" | "en";
}) {
  const dict = lang === "es" ? es : en;
  const inLanguage = lang === "es" ? "es-CR" : "en-US";
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Escazú",
    addressRegion: "San José",
    addressCountry: "CR",
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: "N-AI",
    alternateName: ["N-AI · Nancy Artificial Intelligence", "Nancy Artificial Intelligence"],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 600,
      height: 400,
    },
    // Imagen de marca para la organización; el retrato queda para Person.
    image: `${siteUrl}/opengraph-image`,
    description:
      "Consultoría experta en inteligencia artificial, automatización y analítica avanzada para empresas e instituciones en Costa Rica y Latinoamérica.",
    founder: { "@id": `${siteUrl}/#nancy` },
    foundingDate: "2026",
    telephone: site.contact.phone,
    email: site.contact.email,
    address,
    areaServed: [
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "Place", name: "Latin America" },
    ],
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Artificial Intelligence",
      "Inteligencia Artificial",
      "Intelligent Automation",
      "Automatización inteligente",
      "Advanced Analytics",
      "Forecasting",
      "Business Intelligence",
      "Anomaly Detection",
      "Risk Scoring",
      "Predictive Analytics",
      "Consumer Intelligence",
      "Customer Segmentation",
      "Data Governance",
      "Data Architecture",
      "Machine Learning",
      "Public Procurement Intelligence",
      "SICOP",
      "Credit Decision Engines",
      "Motor de decisión crediticia",
      "Regulated banking analytics",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.contact.phone,
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
    alternateName: ["Nancy Raquel Rodríguez Ramos", "Nancy Rodriguez"],
    givenName: "Nancy",
    additionalName: "Raquel",
    familyName: "Rodríguez Ramos",
    jobTitle: dict.leadership.role,
    description: dict.leadership.disciplines,
    // Todas las instituciones donde estudió; solo los títulos obtenidos van como credencial.
    alumniOf: Array.from(new Set(EDUCATION.map((item) => item.school))).map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    })),
    hasCredential: EDUCATION.filter((item) => item.credential).map((item) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: item.credential,
      name: item.title[lang],
      recognizedBy: { "@type": "CollegeOrUniversity", name: item.recognizedBy ?? item.school },
    })),
    worksFor: { "@id": `${siteUrl}/#organization` },
    url: siteUrl,
    image: `${siteUrl}/nancy-retrato.jpg`,
    email: site.contact.email,
    address,
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
    inLanguage,
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  // Un Service por cada línea de servicio visible, en el idioma de la página.
  const services = dict.services.items.map((item, idx) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service-${idx}`,
    serviceType: item.title,
    name: item.title,
    description: `${item.description} ${item.tags.join(" · ")}.`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "Place", name: "Latin America" },
    ],
  }));

  // Google solo muestra resultados enriquecidos de FAQ a sitios de gobierno y
  // salud; aquí el valor es semántico (buscadores y asistentes de IA), así que
  // debe coincidir exactamente con las preguntas visibles.
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    inLanguage,
    mainEntity: dict.faq.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  const allSchemas = [organization, person, website, ...services, faqPage];

  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Patrón estándar para JSON-LD; el contenido es fijo, sin datos del usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
