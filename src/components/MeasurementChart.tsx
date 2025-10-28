import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CircuitGate {
  gate: string;
  qubit: number;
  position: number;
}

interface GatePropertiesProps {
  circuit?: CircuitGate[];
}

const gateInfo: Record<string, { name: string; color: string; effect: string }> = {
  h: { name: "Hadamard", color: "bg-blue-500", effect: "Creates superposition of |0⟩ and |1⟩" },
  x: { name: "Pauli-X", color: "bg-red-500", effect: "Flips |0⟩ ↔ |1⟩ (NOT operation)" },
  y: { name: "Pauli-Y", color: "bg-green-500", effect: "Rotates around Y-axis with phase" },
  z: { name: "Pauli-Z", color: "bg-purple-500", effect: "Applies phase flip to |1⟩" },
  t: { name: "T Gate", color: "bg-amber-500", effect: "Applies π/8 phase rotation" },
  cnot: { name: "CNOT", color: "bg-cyan-500", effect: "Flips target if control is |1⟩" }
};

const GateProperties = ({ circuit = [] }: GatePropertiesProps) => {
  const gateStats = circuit.reduce((acc, gate) => {
    acc[gate.gate] = (acc[gate.gate] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Circuit Gate Analysis</h3>
      
      {circuit.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No gates in circuit</p>
          <p className="text-sm mt-2">Add gates to see analysis</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">Total Gates</p>
              <p className="text-2xl font-bold text-foreground">{circuit.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">Gate Types</p>
              <p className="text-2xl font-bold text-foreground">{Object.keys(gateStats).length}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Gates Used:</p>
            {Object.entries(gateStats).map(([gate, count]) => {
              const info = gateInfo[gate];
              return (
                <div key={gate} className="p-3 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${info.color} text-white`}>
                        {gate.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">{info.name}</span>
                    </div>
                    <Badge variant="outline">×{count}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{info.effect}</p>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">
              Circuit Depth: {Math.max(...circuit.map(g => g.position)) + 1} steps
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default GateProperties;
