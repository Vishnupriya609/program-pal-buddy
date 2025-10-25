import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Download } from "lucide-react";
import { useState } from "react";
import QuantumGateLibrary from "./QuantumGateLibrary";
import QuantumCircuit from "./QuantumCircuit";
import CodeExportDialog from "./CodeExportDialog";
import { generateQiskitCode, generateMicroPythonCode, generateArduinoCode } from "@/utils/codeGenerator";
import { toast } from "@/hooks/use-toast";

const CircuitBuilder = () => {
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [circuit, setCircuit] = useState<Array<{ gate: string; qubit: number; position: number }>>([]);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    console.log("Running simulation with circuit:", circuit);
    
    // Simulate quantum computation
    setTimeout(() => {
      setIsSimulating(false);
      toast({
        title: "Simulation Complete!",
        description: `Executed ${circuit.length} quantum gates successfully.`,
      });
    }, 1500);
  };

  const handleReset = () => {
    setCircuit([]);
    setSelectedGate(null);
    toast({
      title: "Circuit Reset",
      description: "All gates have been removed from the circuit.",
    });
  };

  const handleExport = () => {
    if (circuit.length === 0) {
      toast({
        title: "Empty Circuit",
        description: "Please add some gates before exporting.",
        variant: "destructive",
      });
      return;
    }
    setShowExportDialog(true);
  };

  return (
    <section id="circuit-builder" className="py-20 px-6">
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
                disabled={circuit.length === 0 || isSimulating}
              >
                <Play className="mr-2 w-5 h-5" />
                {isSimulating ? "Simulating..." : "Run Simulation"}
              </Button>
              <Button 
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="border-primary/30"
                disabled={isSimulating}
              >
                <RotateCcw className="mr-2 w-5 h-5" />
                Reset Circuit
              </Button>
              <Button 
                onClick={handleExport}
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

      {/* Code Export Dialog */}
      <CodeExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        qiskitCode={generateQiskitCode(circuit, 3)}
        microPythonCode={generateMicroPythonCode(circuit, 3)}
        arduinoCode={generateArduinoCode(circuit, 3)}
      />
    </section>
  );
};

export default CircuitBuilder;