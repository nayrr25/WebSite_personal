import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CaseStudyHero from "@/components/sections/CaseStudyHero";
import CaseStudyDeepDive from "@/components/sections/CaseStudyDeepDive";
import IntelligencePipeline from "@/components/sections/IntelligencePipeline";
import DemoShowcase from "@/components/sections/DemoShowcase";
import Capabilities from "@/components/sections/Capabilities";
import BuildingInPublic from "@/components/sections/BuildingInPublic";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CaseStudyHero />
      <CaseStudyDeepDive />
      <IntelligencePipeline />
      <DemoShowcase />
      <Capabilities />
      <BuildingInPublic />
      <Contact />
    </>
  );
}
