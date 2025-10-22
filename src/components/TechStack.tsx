import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TechStack = () => {
  const hardware = [
    { name: "ESP32 Dev Kit", cost: "₹800" },
    { name: "Raspberry Pi Pico W", cost: "₹900" },
    { name: "OLED Display 1.3\"", cost: "₹400" },
    { name: "DHT11 + IR Sensor", cost: "₹300" }
  ];

  const software = [
    "Qiskit", "Cirq", "Q#", "Pennylane",
    "MicroPython", "Arduino IDE", "Python Flask",
    "Node-RED", "Blynk", "ThingsBoard", "AWS IoT Core"
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technology Stack
          </h2>
          <p className="text-xl text-muted-foreground">
            Built with industry-standard tools and affordable hardware
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hardware */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                🔧
              </span>
              Hardware Components
            </h3>
            <div className="space-y-4">
              {hardware.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline" className="border-primary/30">
                    {item.cost}
                  </Badge>
                </div>
              ))}
              <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total Budget</span>
                  <span className="text-2xl font-bold text-primary">~₹20,000</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Software */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                💻
              </span>
              Software Tools
            </h3>
            <div className="flex flex-wrap gap-3">
              {software.map((tool, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm border-primary/30 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  {tool}
                </Badge>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Cloud Integration:</span> AWS IoT Core, ThingSpeak, and IBM Quantum compatibility
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechStack;