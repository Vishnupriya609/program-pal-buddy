import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Download } from "lucide-react";
import { useState } from "react";
import QuantumGateLibrary from "./QuantumGateLibrary";
import QuantumCircuit from "./QuantumCircuit";

const CircuitBuilder = () => {
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [circuit, setCircuit] = useState<Array<{ gate: string; qubit: number; position: number }>>([]);

  const handleRunSimulation = () => {
    console.log("Running simulation with circuit:", circuit);
  };

  const handleReset = () => {
    setCircuit([]);
    setSelectedGate(null);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Build Your Quantum Circuit
          </h2>
          <p className="text-xl text-muted-foreground">
            Drag gates to create quantum algorithms
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Gate Library */}
          <div className="lg:col-span-1">
            <QuantumGateLibrary 
              selectedGate={selectedGate}
              onSelectGate={setSelectedGate}
            />
          </div>

          {/* Circuit Canvas */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <QuantumCircuit 
                circuit={circuit}
                selectedGate={selectedGate}
                onUpdateCircuit={setCircuit}
              />
            </Card>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={handleRunSimulation}
                size="lg"
                className="quantum-glow"
                disabled={circuit.length === 0}
              >
                <Play className="mr-2 w-5 h-5" />
                Run Simulation
              </Button>
              <Button 
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="border-primary/30"
              >
                <RotateCcw className="mr-2 w-5 h-5" />
                Reset Circuit
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary/30"
                disabled={circuit.length === 0}
              >
                <Download className="mr-2 w-5 h-5" />
                Export Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircuitBuilder;