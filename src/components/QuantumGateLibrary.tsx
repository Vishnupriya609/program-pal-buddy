import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QuantumGate {
  id: string;
  name: string;
  symbol: string;
  description: string;
  color: string;
}

const gates: QuantumGate[] = [
  {
    id: "h",
    name: "Hadamard",
    symbol: "H",
    description: "Creates superposition - puts qubit in equal probability of 0 and 1",
    color: "bg-primary"
  },
  {
    id: "x",
    name: "Pauli-X",
    symbol: "X",
    description: "Quantum NOT gate - flips qubit state",
    color: "bg-secondary"
  },
  {
    id: "y",
    name: "Pauli-Y",
    symbol: "Y",
    description: "Rotation around Y-axis on Bloch sphere",
    color: "bg-cyan-500"
  },
  {
    id: "z",
    name: "Pauli-Z",
    symbol: "Z",
    description: "Phase flip - changes sign of |1⟩ state",
    color: "bg-pink-500"
  },
  {
    id: "cnot",
    name: "CNOT",
    symbol: "⊕",
    description: "Controlled-NOT - flips target if control is |1⟩",
    color: "bg-amber-500"
  },
  {
    id: "t",
    name: "T Gate",
    symbol: "T",
    description: "π/4 phase rotation",
    color: "bg-green-500"
  }
];

interface Props {
  selectedGate: string | null;
  onSelectGate: (gateId: string) => void;
}

const QuantumGateLibrary = ({ selectedGate, onSelectGate }: Props) => {
  return (
    <Card className="p-4 bg-card/50 backdrop-blur border-primary/20">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Gate Library
      </h3>
      
      <TooltipProvider>
        <div className="space-y-2">
          {gates.map((gate) => (
            <Tooltip key={gate.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onSelectGate(gate.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedGate === gate.id
                      ? `${gate.color} border-white/50 shadow-lg scale-105`
                      : "bg-muted/30 border-border hover:border-primary/50 hover:scale-102"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-2xl font-bold mb-1">{gate.symbol}</div>
                      <div className="text-xs opacity-80">{gate.name}</div>
                    </div>
                    <Info className="w-4 h-4 opacity-50" />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="font-medium mb-1">{gate.name} Gate</p>
                <p className="text-sm text-muted-foreground">{gate.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <div className="mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-xs text-muted-foreground">
          💡 Select a gate and click on the circuit to place it
        </p>
      </div>
    </Card>
  );
};

export default QuantumGateLibrary;