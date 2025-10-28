import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GateMatrix {
  name: string;
  symbol: string;
  matrix: string[][];
  color: string;
  description: string;
}

const gateMatrices: GateMatrix[] = [
  {
    name: "Hadamard",
    symbol: "H",
    matrix: [
      ["1/√2", "1/√2"],
      ["1/√2", "-1/√2"]
    ],
    color: "bg-blue-500/20 border-blue-500",
    description: "Creates superposition"
  },
  {
    name: "Pauli-X",
    symbol: "X",
    matrix: [
      ["0", "1"],
      ["1", "0"]
    ],
    color: "bg-red-500/20 border-red-500",
    description: "Quantum NOT gate"
  },
  {
    name: "Pauli-Y",
    symbol: "Y",
    matrix: [
      ["0", "-i"],
      ["i", "0"]
    ],
    color: "bg-green-500/20 border-green-500",
    description: "Rotation around Y-axis"
  },
  {
    name: "Pauli-Z",
    symbol: "Z",
    matrix: [
      ["1", "0"],
      ["0", "-1"]
    ],
    color: "bg-purple-500/20 border-purple-500",
    description: "Phase flip gate"
  },
  {
    name: "T Gate",
    symbol: "T",
    matrix: [
      ["1", "0"],
      ["0", "e^(iπ/4)"]
    ],
    color: "bg-amber-500/20 border-amber-500",
    description: "π/8 phase gate"
  },
  {
    name: "CNOT",
    symbol: "CNOT",
    matrix: [
      ["1", "0", "0", "0"],
      ["0", "1", "0", "0"],
      ["0", "0", "0", "1"],
      ["0", "0", "1", "0"]
    ],
    color: "bg-cyan-500/20 border-cyan-500",
    description: "Controlled-NOT gate"
  }
];

const GateMatrixDisplay = () => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Quantum Gate Matrices</h3>
      <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
        {gateMatrices.map((gate) => (
          <div key={gate.symbol} className={`p-4 rounded-lg border ${gate.color}`}>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="font-mono text-lg">
                {gate.symbol}
              </Badge>
              <span className="text-sm text-muted-foreground">{gate.name}</span>
            </div>
            <div className="font-mono text-sm my-3">
              <div className="flex items-center justify-center">
                <span className="text-2xl mr-2">[</span>
                <div className="flex flex-col gap-1">
                  {gate.matrix.map((row, i) => (
                    <div key={i} className="flex gap-2">
                      {row.map((val, j) => (
                        <span key={j} className="w-16 text-center">{val}</span>
                      ))}
                    </div>
                  ))}
                </div>
                <span className="text-2xl ml-2">]</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">{gate.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GateMatrixDisplay;
