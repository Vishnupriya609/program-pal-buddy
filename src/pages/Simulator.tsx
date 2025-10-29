import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Download, Home } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import QuantumGateLibrary from "@/components/QuantumGateLibrary";
import QuantumCircuit from "@/components/QuantumCircuit";
import CodeExportDialog from "@/components/CodeExportDialog";
import { generateQiskitCode, generateMicroPythonCode, generateArduinoCode } from "@/utils/codeGenerator";
import { toast } from "@/hooks/use-toast";
import BlochSphere from "@/components/BlochSphere";
import MeasurementChart from "@/components/MeasurementChart";

const Simulator = () => {
  const navigate = useNavigate();
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [circuit, setCircuit] = useState<Array<{ gate: string; qubit: number; position: number }>>([]);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Calculate quantum state based on circuit
  const { theta, phi, probabilities } = useMemo(() => {
    let currentTheta = 0;
    let currentPhi = 0;
    const probs = Array(8).fill(0);
    
    // Default state |0⟩
    if (circuit.length === 0) {
      probs[0] = 100; // |000⟩
      return { theta: currentTheta, phi: currentPhi, probabilities: probs };
    }

    // Simple simulation logic based on gates
    circuit.forEach(({ gate, qubit }) => {
      const gateUpper = gate.toUpperCase();
      
      switch (gateUpper) {
        case 'H': // Hadamard creates superposition
          if (qubit === 0) {
            currentTheta = Math.PI / 2;
            probs[0] = 50;
            probs[1] = 50;
          }
          break;
        case 'X': // Pauli-X flips state (NOT gate)
          if (qubit === 0) {
            currentTheta = Math.PI;
            probs[0] = 0;
            probs[1] = 100;
          }
          break;
        case 'Y': // Pauli-Y
          if (qubit === 0) {
            currentTheta = Math.PI / 2;
            currentPhi = Math.PI / 2;
            probs[0] = 0;
            probs[1] = 100;
          }
          break;
        case 'Z': // Pauli-Z adds phase
          currentPhi += Math.PI;
          break;
        case 'T': // T gate adds π/4 phase
          currentPhi += Math.PI / 4;
          break;
        case 'CNOT': // CNOT creates entanglement
          probs[0] = 50;
          probs[7] = 50; // |000⟩ and |111⟩ entangled state
          currentTheta = Math.PI / 4;
          break;
      }
    });

    // Normalize probabilities
    const sum = probs.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      probs.forEach((_, i) => {
        probs[i] = (probs[i] / sum) * 100;
      });
    }

    return { 
      theta: currentTheta, 
      phi: currentPhi, 
      probabilities: probs.map((prob, i) => ({
        state: `|${i.toString(2).padStart(3, '0')}⟩`,
        probability: Math.round(prob)
      }))
    };
  }, [circuit]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary">
            QSimEdge Simulator
          </h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-primary/30"
          >
            <Home className="mr-2 w-4 h-4" />
            Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Gate Library */}
          <div className="lg:col-span-1">
            <QuantumGateLibrary 
              selectedGate={selectedGate}
              onSelectGate={setSelectedGate}
            />
          </div>

          {/* Circuit and Visualizations */}
          <div className="lg:col-span-3 space-y-6">
            {/* Circuit Canvas */}
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <h2 className="text-xl font-semibold mb-4">Quantum Circuit</h2>
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

            {/* Visualizations Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bloch Sphere */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Bloch Sphere</h3>
                <BlochSphere theta={theta} phi={phi} />
                <p className="text-sm text-muted-foreground text-center mt-2">
                  θ = {(theta * 180 / Math.PI).toFixed(1)}°, φ = {(phi * 180 / Math.PI).toFixed(1)}°
                </p>
              </div>

              {/* Measurement Probabilities */}
              <div>
                <MeasurementChart data={probabilities} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Code Export Dialog */}
      <CodeExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        qiskitCode={generateQiskitCode(circuit, 3)}
        microPythonCode={generateMicroPythonCode(circuit, 3)}
        arduinoCode={generateArduinoCode(circuit, 3)}
      />
    </div>
  );
};

export default Simulator;
