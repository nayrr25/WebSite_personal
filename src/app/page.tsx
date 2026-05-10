import Hero from "@/components/sections/Hero";
import CaseStudyHero from "@/components/sections/CaseStudyHero";
import CaseStudyDeepDive from "@/components/sections/CaseStudyDeepDive";
import IntelligencePipeline from "@/components/sections/IntelligencePipeline";
import DemoShowcase from "@/components/sections/DemoShowcase";
import About from "@/components/sections/About";
import Capabilities from "@/components/sections/Capabilities";
import BuildingInPublic from "@/components/sections/BuildingInPublic";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <CaseStudyHero />
      <CaseStudyDeepDive />
      <IntelligencePipeline />
      <DemoShowcase />
      <About />
      <Capabilities />
      <BuildingInPublic />
      <Contact />
    </>
  );
}
