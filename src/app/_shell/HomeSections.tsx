import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CaseBand from "@/components/sections/CaseBand";
import DemoShowcase from "@/components/sections/DemoShowcase";
import Method from "@/components/sections/Method";
import Leadership from "@/components/sections/Leadership";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

/**
 * Portada del estilo C (maqueta v3), compartida por los dos idiomas.
 * Cada componente resuelve sus textos con `useT()` según el layout raíz.
 */
export default function HomeSections() {
  return (
    <>
      <Hero />
      <Services />
      <CaseBand />
      <DemoShowcase />
      <Method />
      <Leadership />
      <FAQ />
      <Contact />
    </>
  );
}
