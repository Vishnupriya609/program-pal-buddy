import { Card } from "@/components/ui/card";
import { Cpu, Waves, Workflow, BookOpen, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Edge Computing",
    description: "Simulate quantum gates on ESP32 and Raspberry Pi Pico W microcontrollers",
    color: "text-primary"
  },
  {
    icon: Waves,
    title: "Quantum Gates",
    description: "Hadamard, Pauli-X/Y/Z, CNOT, and T gates for building quantum circuits",
    color: "text-secondary"
  },
  {
    icon: Workflow,
    title: "Circuit Builder",
    description: "Visual drag-and-drop interface for designing quantum algorithms",
    color: "text-cyan-400"
  },
  {
    icon: Globe,
    title: "IoT Integration",
    description: "Connect to ThingsBoard, Blynk, or AWS IoT dashboards",
    color: "text-pink-400"
  },
  {
    icon: BookOpen,
    title: "Educational",
    description: "Perfect learning tool for universities without quantum hardware access",
    color: "text-amber-400"
  },
  {
    icon: Zap,
    title: "Low Cost",
    description: "Complete setup under ₹20,000 making quantum computing accessible",
    color: "text-green-400"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Quantum Computing Made Accessible
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit for simulating quantum operations on low-cost hardware
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;