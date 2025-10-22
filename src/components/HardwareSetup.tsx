import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cpu, Cable, Wifi, Download } from "lucide-react";

const HardwareSetup = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hardware Connection Guide
          </h2>
          <p className="text-xl text-muted-foreground">
            Step-by-step instructions to build your quantum simulator
          </p>
        </div>

        <Tabs defaultValue="wiring" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="wiring">
              <Cable className="w-4 h-4 mr-2" />
              Wiring
            </TabsTrigger>
            <TabsTrigger value="software">
              <Download className="w-4 h-4 mr-2" />
              Software
            </TabsTrigger>
            <TabsTrigger value="iot">
              <Wifi className="w-4 h-4 mr-2" />
              IoT Setup
            </TabsTrigger>
            <TabsTrigger value="testing">
              <Cpu className="w-4 h-4 mr-2" />
              Testing
            </TabsTrigger>
          </TabsList>

          {/* Wiring Tab */}
          <TabsContent value="wiring" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-2xl font-bold mb-6">ESP32 Pin Connections</h3>
              
              <div className="space-y-6">
                {/* OLED Display */}
                <div className="p-6 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      📺
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">OLED Display (I2C 1.3" 128x64)</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">VCC</span>
                          <Badge variant="outline" className="border-primary/30">3.3V</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">GND</span>
                          <Badge variant="outline" className="border-primary/30">GND</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">SCL</span>
                          <Badge variant="outline" className="border-primary/30">GPIO 22</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">SDA</span>
                          <Badge variant="outline" className="border-primary/30">GPIO 21</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Push Buttons */}
                <div className="p-6 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      🔘
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">Push Buttons (Gate Selection)</h4>
                      <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">Button 1 (H)</span>
                          <Badge variant="outline" className="border-secondary/30">GPIO 25</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">Button 2 (X)</span>
                          <Badge variant="outline" className="border-secondary/30">GPIO 26</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">Button 3 (Run)</span>
                          <Badge variant="outline" className="border-secondary/30">GPIO 27</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        💡 Connect one terminal to GPIO, other to GND. Use 10kΩ pull-up resistors.
                      </p>
                    </div>
                  </div>
                </div>

                {/* LEDs */}
                <div className="p-6 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      💡
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">Status LEDs</h4>
                      <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">LED 1 (Power)</span>
                          <Badge variant="outline" className="border-cyan-500/30">GPIO 32</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">LED 2 (Running)</span>
                          <Badge variant="outline" className="border-cyan-500/30">GPIO 33</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">LED 3 (Error)</span>
                          <Badge variant="outline" className="border-cyan-500/30">GPIO 14</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        💡 Use 220Ω current-limiting resistors for each LED.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Optional Sensors */}
                <div className="p-6 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      🌡️
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">Optional: DHT11 Sensor (IoT Demo)</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">VCC</span>
                          <Badge variant="outline" className="border-amber-500/30">3.3V</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">GND</span>
                          <Badge variant="outline" className="border-amber-500/30">GND</Badge>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-background/50">
                          <span className="text-muted-foreground">Data</span>
                          <Badge variant="outline" className="border-amber-500/30">GPIO 4</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Software Tab */}
          <TabsContent value="software" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-2xl font-bold mb-6">Software Installation Steps</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Install Required Software</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <strong>For MicroPython:</strong> Download Thonny IDE from thonny.org
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <strong>For Arduino:</strong> Install Arduino IDE 2.x from arduino.cc
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Flash MicroPython to ESP32</h4>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border font-mono text-xs space-y-2">
                        <p className="text-muted-foreground"># Download MicroPython firmware for ESP32</p>
                        <p>esptool.py --chip esp32 erase_flash</p>
                        <p>esptool.py --chip esp32 write_flash -z 0x1000 esp32-firmware.bin</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Install Required Libraries</h4>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="font-semibold text-sm mb-2">MicroPython Libraries:</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• ssd1306 (OLED display driver)</li>
                            <li>• machine (GPIO control)</li>
                          </ul>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="font-semibold text-sm mb-2">Arduino Libraries:</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Adafruit_GFX</li>
                            <li>• Adafruit_SSD1306</li>
                            <li>• Wire (built-in)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Upload Your Code</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Export your quantum circuit code from QSimEdge and upload it to your ESP32:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 rounded bg-muted/30 border border-border">
                          <strong>MicroPython:</strong> Save as main.py and upload via Thonny
                        </div>
                        <div className="p-3 rounded bg-muted/30 border border-border">
                          <strong>Arduino:</strong> Open .ino file in Arduino IDE and click Upload
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* IoT Setup Tab */}
          <TabsContent value="iot" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-2xl font-bold mb-6">IoT Dashboard Integration</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* ThingsBoard */}
                <div className="p-6 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    📊
                  </div>
                  <h4 className="font-semibold mb-2">ThingsBoard</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Professional IoT platform for real-time quantum simulation monitoring
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-background/50">
                      <strong>Setup:</strong> Create device, get access token
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <strong>Endpoint:</strong> https://demo.thingsboard.io
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <strong>Protocol:</strong> MQTT or HTTP
                    </div>
                  </div>
                </div>

                {/* Blynk */}
                <div className="p-6 rounded-lg bg-muted/30 border border-border hover:border-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                    📱
                  </div>
                  <h4 className="font-semibold mb-2">Blynk IoT</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Mobile-first platform with drag-and-drop dashboard builder
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-background/50">
                      <strong>Setup:</strong> Create template, get auth token
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <strong>Widgets:</strong> Gauge, Chart, Value Display
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <strong>Library:</strong> Blynk for ESP32
                    </div>
                  </div>
                </div>

                {/* AWS IoT Core */}
                <div className="p-6 rounded-lg bg-muted/30 border border-border hover:border-cyan-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                    ☁️
                  </div>
                  <h4 className="font-semibold mb-2">AWS IoT Core</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enterprise-grade cloud platform for scalable quantum data
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-background/50">
                      <strong>Setup:</strong> Create Thing, certificates
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <strong>Protocol:</strong> MQTT with TLS
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <strong>Integration:</strong> Lambda, DynamoDB
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <h4 className="font-semibold mb-3">Example WiFi Configuration (ESP32)</h4>
                <pre className="p-4 rounded bg-background/50 text-xs overflow-x-auto">
{`import network
import time

# WiFi credentials
SSID = "Your_WiFi_Name"
PASSWORD = "Your_WiFi_Password"

# Connect to WiFi
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)
    
    print("Connecting to WiFi...")
    while not wlan.isconnected():
        time.sleep(1)
    
    print("Connected! IP:", wlan.ifconfig()[0])

connect_wifi()`}
                </pre>
              </div>
            </Card>
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-2xl font-bold mb-6">Testing Your Quantum Simulator</h3>
              
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold mb-3">✅ Pre-Flight Checklist</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-background/50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>All connections verified and secure</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-background/50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>OLED display shows initialization message</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-background/50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>LEDs respond to power and status</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-background/50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Push buttons trigger gate selection</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-background/50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Serial monitor shows quantum state output</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-background/50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>WiFi connects successfully (if IoT enabled)</span>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-semibold mb-3">Test Circuit #1: Superposition</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">Apply Hadamard gate to qubit 0</p>
                      <div className="p-3 rounded bg-background/50 font-mono text-xs">
                        Expected: |0⟩ = 50%, |1⟩ = 50%
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        ✨ This creates quantum superposition!
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-semibold mb-3">Test Circuit #2: Quantum NOT</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">Apply Pauli-X gate to qubit 0</p>
                      <div className="p-3 rounded bg-background/50 font-mono text-xs">
                        Expected: |0⟩ = 0%, |1⟩ = 100%
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        ✨ This flips the qubit state!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span>⚠️</span>
                    Troubleshooting Common Issues
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded bg-background/50">
                      <strong>OLED not displaying:</strong> Check I2C address (0x3C or 0x3D) and wire connections
                    </div>
                    <div className="p-3 rounded bg-background/50">
                      <strong>Code upload fails:</strong> Ensure correct COM port selected and ESP32 in bootloader mode
                    </div>
                    <div className="p-3 rounded bg-background/50">
                      <strong>WiFi won't connect:</strong> Verify SSID/password, check 2.4GHz band (ESP32 doesn't support 5GHz)
                    </div>
                    <div className="p-3 rounded bg-background/50">
                      <strong>Incorrect results:</strong> Verify quantum gate logic implementation and state normalization
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HardwareSetup;