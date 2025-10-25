import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 circuit-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      
      {/* Floating quantum particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Quantum Computing Made Accessible</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary">
          QSimEdge
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          Low-Cost Quantum Computing Simulator
        </p>
        
        <p className="text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
          For Mechatronics & IoT Engineers
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="quantum-glow text-lg px-8 py-6"
            onClick={() => document.getElementById('circuit-builder')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Launch Simulator
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:border-primary">
            <Cpu className="mr-2 w-5 h-5" />
            View Documentation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
            <div className="text-3xl font-bold text-primary mb-2">2-3 Qubits</div>
            <div className="text-sm text-muted-foreground">Simulation Capacity</div>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
            <div className="text-3xl font-bold text-secondary mb-2">₹20K</div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
            <div className="text-3xl font-bold text-cyan-400 mb-2">ESP32</div>
            <div className="text-sm text-muted-foreground">Edge Computing</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;