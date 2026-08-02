import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CaseStudyHero from "@/components/sections/CaseStudyHero";
import CaseStudyDeepDive from "@/components/sections/CaseStudyDeepDive";
import IntelligencePipeline from "@/components/sections/IntelligencePipeline";
import DemoShowcase from "@/components/sections/DemoShowcase";
import Capabilities from "@/components/sections/Capabilities";
import BuildingInPublic from "@/components/sections/BuildingInPublic";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import NetworkBand from "@/components/backgrounds/NetworkBand";

/**
 * Las secciones de la portada, compartidas por los dos idiomas.
 * El contenido lo resuelve cada componente vía `useT()`, que lee el idioma
 * del layout raíz correspondiente.
 */
export default function HomeSections() {
  return (
    <>
      <Hero />
      {/* La red del hero no muere ahí: reaparece en bandas entre secciones.
       * Ver NetworkBand para por qué son bandas y no fondos de seccion. */}
      <NetworkBand />
      <About />
      <CaseStudyHero />
      <CaseStudyDeepDive />
      <IntelligencePipeline />
      <DemoShowcase />
      <NetworkBand />
      <Capabilities />
      <BuildingInPublic />
      <FAQ />
      <NetworkBand />
      <Contact />
    </>
  );
}
