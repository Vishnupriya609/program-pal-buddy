interface CircuitGate {
  gate: string;
  qubit: number;
  position: number;
}

export const generateQiskitCode = (circuit: CircuitGate[], numQubits: number = 3): string => {
  const sortedCircuit = [...circuit].sort((a, b) => a.position - b.position || a.qubit - b.qubit);
  
  let code = `# Qiskit Quantum Circuit
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit import execute, Aer
from qiskit.visualization import plot_histogram
import matplotlib.pyplot as plt

# Create quantum and classical registers
qr = QuantumRegister(${numQubits}, 'q')
cr = ClassicalRegister(${numQubits}, 'c')
qc = QuantumCircuit(qr, cr)

# Add quantum gates
`;

  sortedCircuit.forEach(({ gate, qubit }) => {
    switch (gate) {
      case 'h':
        code += `qc.h(qr[${qubit}])  # Hadamard gate on qubit ${qubit}\n`;
        break;
      case 'x':
        code += `qc.x(qr[${qubit}])  # Pauli-X gate on qubit ${qubit}\n`;
        break;
      case 'y':
        code += `qc.y(qr[${qubit}])  # Pauli-Y gate on qubit ${qubit}\n`;
        break;
      case 'z':
        code += `qc.z(qr[${qubit}])  # Pauli-Z gate on qubit ${qubit}\n`;
        break;
      case 't':
        code += `qc.t(qr[${qubit}])  # T gate on qubit ${qubit}\n`;
        break;
      case 'cnot':
        const targetQubit = (qubit + 1) % numQubits;
        code += `qc.cx(qr[${qubit}], qr[${targetQubit}])  # CNOT gate: control=${qubit}, target=${targetQubit}\n`;
        break;
    }
  });

  code += `
# Measure all qubits
qc.measure(qr, cr)

# Execute the circuit on a simulator
simulator = Aer.get_backend('qasm_simulator')
job = execute(qc, simulator, shots=1024)
result = job.result()
counts = result.get_counts(qc)

# Display results
print("Measurement results:", counts)
plot_histogram(counts)
plt.show()

# Draw the circuit
print(qc.draw())
`;

  return code;
};

export const generateMicroPythonCode = (circuit: CircuitGate[], numQubits: number = 3): string => {
  const sortedCircuit = [...circuit].sort((a, b) => a.position - b.position || a.qubit - b.qubit);
  
  let code = `# MicroPython Quantum Simulator for ESP32
# QSimEdge - Quantum Computing on Edge Devices

import math
from machine import Pin, I2C
from ssd1306 import SSD1306_I2C
import time

# Initialize OLED Display (128x64)
i2c = I2C(0, scl=Pin(22), sda=Pin(21))
oled = SSD1306_I2C(128, 64, i2c)

# Quantum state representation (simplified)
class QuantumSimulator:
    def __init__(self, num_qubits):
        self.num_qubits = num_qubits
        self.state_size = 2 ** num_qubits
        # Initialize state to |000...0>
        self.state = [0.0] * self.state_size
        self.state[0] = 1.0
    
    def apply_hadamard(self, qubit):
        """Apply Hadamard gate"""
        sqrt2_inv = 1.0 / math.sqrt(2)
        new_state = self.state[:]
        for i in range(self.state_size):
            if i & (1 << qubit):
                j = i ^ (1 << qubit)
                if i > j:
                    val_i = self.state[i]
                    val_j = self.state[j]
                    new_state[i] = sqrt2_inv * (val_j - val_i)
                    new_state[j] = sqrt2_inv * (val_j + val_i)
        self.state = new_state
    
    def apply_pauli_x(self, qubit):
        """Apply Pauli-X (NOT) gate"""
        new_state = self.state[:]
        for i in range(self.state_size):
            j = i ^ (1 << qubit)
            if i < j:
                new_state[i], new_state[j] = self.state[j], self.state[i]
        self.state = new_state
    
    def apply_pauli_z(self, qubit):
        """Apply Pauli-Z gate"""
        for i in range(self.state_size):
            if i & (1 << qubit):
                self.state[i] *= -1
    
    def measure(self):
        """Measure all qubits (simplified)"""
        probabilities = [abs(amp) ** 2 for amp in self.state]
        return probabilities

# Initialize quantum simulator
qsim = QuantumSimulator(${numQubits})

# Apply quantum circuit
print("Running QSimEdge quantum circuit...")
oled.fill(0)
oled.text("QSimEdge", 30, 0)
oled.text("Quantum Sim", 20, 12)
oled.show()

`;

  sortedCircuit.forEach(({ gate, qubit }, index) => {
    switch (gate) {
      case 'h':
        code += `qsim.apply_hadamard(${qubit})  # H gate on q${qubit}\n`;
        break;
      case 'x':
        code += `qsim.apply_pauli_x(${qubit})  # X gate on q${qubit}\n`;
        break;
      case 'z':
        code += `qsim.apply_pauli_z(${qubit})  # Z gate on q${qubit}\n`;
        break;
      case 'y':
        code += `# Pauli-Y = iXZ (simplified)\nqsim.apply_pauli_x(${qubit})\nqsim.apply_pauli_z(${qubit})\n`;
        break;
      case 't':
        code += `# T gate (π/4 phase) - simplified for ESP32\npass  # Phase gates require complex number support\n`;
        break;
      case 'cnot':
        const targetQubit = (qubit + 1) % numQubits;
        code += `# CNOT gate (control=${qubit}, target=${targetQubit}) - simplified\npass  # Multi-qubit gates require full state manipulation\n`;
        break;
    }
    code += `print("Gate ${index + 1}: ${gate.toUpperCase()} on q${qubit}")\n`;
  });

  code += `
# Measure and display results
probabilities = qsim.measure()
print("\\nQuantum State Probabilities:")
for i, prob in enumerate(probabilities):
    if prob > 0.001:  # Only show significant probabilities
        binary = format(i, f'0{${numQubits}}b')
        print(f"|{binary}> : {prob:.4f}")
        
# Display on OLED
oled.fill(0)
oled.text("Results:", 0, 0)
y_offset = 12
for i, prob in enumerate(probabilities[:4]):  # Show top 4 results
    if prob > 0.001:
        binary = format(i, f'0{${numQubits}}b')
        oled.text(f"|{binary}> {int(prob*100)}%", 0, y_offset)
        y_offset += 12
oled.show()

print("\\nQuantum simulation complete!")
`;

  return code;
};

export const generateArduinoCode = (circuit: CircuitGate[], numQubits: number = 3): string => {
  const sortedCircuit = [...circuit].sort((a, b) => a.position - b.position || a.qubit - b.qubit);
  
  let code = `// Arduino/ESP32 Quantum Simulator
// QSimEdge - Quantum Computing on Edge Devices

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const int NUM_QUBITS = ${numQubits};
const int STATE_SIZE = ${2 ** numQubits};
float quantumState[STATE_SIZE];

void setup() {
  Serial.begin(115200);
  
  // Initialize OLED
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(20, 10);
  display.println(F("QSimEdge"));
  display.setCursor(10, 25);
  display.println(F("Quantum Simulator"));
  display.display();
  delay(2000);
  
  // Initialize quantum state to |000...0>
  initializeState();
  
  // Run quantum circuit
  Serial.println("Running quantum circuit...");
  runCircuit();
  
  // Measure and display results
  displayResults();
}

void loop() {
  // Main loop - circuit runs once in setup
  delay(1000);
}

void initializeState() {
  for(int i = 0; i < STATE_SIZE; i++) {
    quantumState[i] = 0.0;
  }
  quantumState[0] = 1.0;  // |000...0> state
}

void applyHadamard(int qubit) {
  float sqrt2_inv = 1.0 / sqrt(2.0);
  float newState[STATE_SIZE];
  
  for(int i = 0; i < STATE_SIZE; i++) {
    newState[i] = quantumState[i];
  }
  
  for(int i = 0; i < STATE_SIZE; i++) {
    if(i & (1 << qubit)) {
      int j = i ^ (1 << qubit);
      if(i > j) {
        newState[i] = sqrt2_inv * (quantumState[j] - quantumState[i]);
        newState[j] = sqrt2_inv * (quantumState[j] + quantumState[i]);
      }
    }
  }
  
  for(int i = 0; i < STATE_SIZE; i++) {
    quantumState[i] = newState[i];
  }
}

void applyPauliX(int qubit) {
  float newState[STATE_SIZE];
  for(int i = 0; i < STATE_SIZE; i++) {
    int j = i ^ (1 << qubit);
    newState[i] = quantumState[j];
  }
  for(int i = 0; i < STATE_SIZE; i++) {
    quantumState[i] = newState[i];
  }
}

void runCircuit() {
`;

  sortedCircuit.forEach(({ gate, qubit }, index) => {
    switch (gate) {
      case 'h':
        code += `  applyHadamard(${qubit});\n  Serial.println("Applied H gate to qubit ${qubit}");\n`;
        break;
      case 'x':
        code += `  applyPauliX(${qubit});\n  Serial.println("Applied X gate to qubit ${qubit}");\n`;
        break;
      default:
        code += `  // ${gate.toUpperCase()} gate on qubit ${qubit} (simplified)\n`;
    }
  });

  code += `}

void displayResults() {
  Serial.println("\\nQuantum State Results:");
  
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println(F("Results:"));
  
  int lineY = 12;
  for(int i = 0; i < STATE_SIZE && lineY < 60; i++) {
    float prob = quantumState[i] * quantumState[i];
    if(prob > 0.001) {
      // Print to serial
      Serial.print("|");
      for(int b = NUM_QUBITS - 1; b >= 0; b--) {
        Serial.print((i & (1 << b)) ? "1" : "0");
      }
      Serial.print("> : ");
      Serial.println(prob, 4);
      
      // Display on OLED
      display.setCursor(0, lineY);
      display.print("|");
      for(int b = NUM_QUBITS - 1; b >= 0; b--) {
        display.print((i & (1 << b)) ? "1" : "0");
      }
      display.print("> ");
      display.print((int)(prob * 100));
      display.println("%");
      lineY += 12;
    }
  }
  display.display();
}
`;

  return code;
};

export const downloadCode = (code: string, filename: string) => {
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};