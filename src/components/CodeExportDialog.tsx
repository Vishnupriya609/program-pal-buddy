import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qiskitCode: string;
  microPythonCode: string;
  arduinoCode: string;
}

const CodeExportDialog = ({ open, onOpenChange, qiskitCode, microPythonCode, arduinoCode }: Props) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleCopy = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTab(language);
      toast({
        title: "Copied to clipboard!",
        description: `${language} code copied successfully.`,
      });
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or manually copy the code.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started!",
      description: `Downloading ${filename}...`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              💾
            </span>
            Export Quantum Circuit Code
          </DialogTitle>
          <DialogDescription>
            Choose your target platform and download the generated code
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="qiskit" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="qiskit">Qiskit (Python)</TabsTrigger>
            <TabsTrigger value="micropython">MicroPython (ESP32)</TabsTrigger>
            <TabsTrigger value="arduino">Arduino/C++</TabsTrigger>
          </TabsList>

          <TabsContent value="qiskit" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                For IBM Qiskit and quantum computing research
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(qiskitCode, "Qiskit")}
                  className="border-primary/30"
                >
                  {copiedTab === "Qiskit" ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  Copy
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownload(qiskitCode, "quantum_circuit.py")}
                  className="quantum-glow"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="p-4 bg-muted/30 rounded-lg overflow-x-auto text-sm border border-border">
              <code>{qiskitCode}</code>
            </pre>
          </TabsContent>

          <TabsContent value="micropython" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                For ESP32/Raspberry Pi Pico W with MicroPython
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(microPythonCode, "MicroPython")}
                  className="border-primary/30"
                >
                  {copiedTab === "MicroPython" ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  Copy
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownload(microPythonCode, "quantum_esp32.py")}
                  className="quantum-glow"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="p-4 bg-muted/30 rounded-lg overflow-x-auto text-sm border border-border">
              <code>{microPythonCode}</code>
            </pre>
          </TabsContent>

          <TabsContent value="arduino" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                For Arduino IDE and ESP32 development boards
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(arduinoCode, "Arduino")}
                  className="border-primary/30"
                >
                  {copiedTab === "Arduino" ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  Copy
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownload(arduinoCode, "quantum_circuit.ino")}
                  className="quantum-glow"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="p-4 bg-muted/30 rounded-lg overflow-x-auto text-sm border border-border">
              <code>{arduinoCode}</code>
            </pre>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm">
            <span className="font-semibold">💡 Next Steps:</span> Upload the code to your ESP32, connect the OLED display, and run your quantum simulation on edge hardware!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeExportDialog;