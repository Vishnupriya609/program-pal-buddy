import { useState } from "react";

interface CircuitGate {
  gate: string;
  qubit: number;
  position: number;
}

interface Props {
  circuit: CircuitGate[];
  selectedGate: string | null;
  onUpdateCircuit: (circuit: CircuitGate[]) => void;
}

const QuantumCircuit = ({ circuit, selectedGate, onUpdateCircuit }: Props) => {
  const numQubits = 3;
  const numColumns = 10;

  const getGateSymbol = (gateId: string) => {
    const symbols: Record<string, string> = {
      h: "H",
      x: "X",
      y: "Y",
      z: "Z",
      cnot: "⊕",
      t: "T"
    };
    return symbols[gateId] || gateId.toUpperCase();
  };

  const getGateColor = (gateId: string) => {
    const colors: Record<string, string> = {
      h: "bg-primary",
      x: "bg-secondary",
      y: "bg-cyan-500",
      z: "bg-pink-500",
      cnot: "bg-amber-500",
      t: "bg-green-500"
    };
    return colors[gateId] || "bg-primary";
  };

  const handleCellClick = (qubit: number, position: number) => {
    if (!selectedGate) return;

    const existingGateIndex = circuit.findIndex(
      g => g.qubit === qubit && g.position === position
    );

    if (existingGateIndex >= 0) {
      // Remove existing gate
      onUpdateCircuit(circuit.filter((_, i) => i !== existingGateIndex));
    } else {
      // Add new gate
      onUpdateCircuit([...circuit, { gate: selectedGate, qubit, position }]);
    }
  };

  const getGateAtPosition = (qubit: number, position: number) => {
    return circuit.find(g => g.qubit === qubit && g.position === position);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-sm font-medium text-muted-foreground">Qubits:</div>
        {[...Array(numQubits)].map((_, i) => (
          <div key={i} className="text-sm font-mono">
            |q{i}⟩
          </div>
        ))}
      </div>

      <div className="relative overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          {[...Array(numQubits)].map((_, qubitIndex) => (
            <div key={qubitIndex} className="flex items-center gap-2 mb-4">
              <div className="w-12 text-sm font-mono text-muted-foreground text-right">
                q{qubitIndex}
              </div>
              
              <div className="flex-1 flex items-center gap-2 relative">
                {/* Qubit line */}
                <div className="absolute left-0 right-0 h-0.5 bg-primary/30" 
                     style={{ top: '50%', transform: 'translateY(-50%)' }} />
                
                {/* Gate positions */}
                <div className="flex gap-2 relative z-10 w-full">
                  {[...Array(numColumns)].map((_, colIndex) => {
                    const gate = getGateAtPosition(qubitIndex, colIndex);
                    return (
                      <button
                        key={colIndex}
                        onClick={() => handleCellClick(qubitIndex, colIndex)}
                        className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-xl font-bold ${
                          gate
                            ? `${getGateColor(gate.gate)} border-white/30 shadow-lg quantum-glow`
                            : selectedGate
                            ? "border-primary/30 hover:border-primary bg-muted/20 hover:bg-primary/10 cursor-pointer"
                            : "border-transparent bg-transparent"
                        }`}
                      >
                        {gate && getGateSymbol(gate.gate)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-12 text-sm font-mono text-muted-foreground">
                |ψ{qubitIndex}⟩
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        {circuit.length === 0 
          ? "Circuit is empty. Select a gate and click to place it."
          : `${circuit.length} gate${circuit.length > 1 ? 's' : ''} placed`
        }
      </div>
    </div>
  );
};

export default QuantumCircuit;