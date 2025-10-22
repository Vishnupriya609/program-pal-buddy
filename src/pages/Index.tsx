import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CircuitBuilder from "@/components/CircuitBuilder";
import HardwareSetup from "@/components/HardwareSetup";
import TechStack from "@/components/TechStack";
import ProjectInfo from "@/components/ProjectInfo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CircuitBuilder />
      <HardwareSetup />
      <TechStack />
      <ProjectInfo />
    </div>
  );
};

export default Index;