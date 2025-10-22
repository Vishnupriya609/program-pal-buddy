import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Award } from "lucide-react";

const ProjectInfo = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Institution */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Malla Reddy University</h3>
            <p className="text-muted-foreground mb-4">Department of Internet of Things</p>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Faculty Mentor</p>
              <p>Dr M V N Srujan Manohar</p>
            </div>
          </Card>

          {/* Team */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Team Size</h3>
            <p className="text-4xl font-bold text-primary mb-4">~10</p>
            <p className="text-muted-foreground">
              Collaborative team of IoT and mechatronics engineering students
            </p>
          </Card>

          {/* Recognition */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Eligible For</h3>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>IIC Innovation Challenge 2025</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>AICTE IDEA Lab</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Smart India Hackathon 2025</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Project Phases */}
        <Card className="mt-8 p-8 bg-card/50 backdrop-blur border-primary/20">
          <h3 className="text-2xl font-bold mb-6 text-center">Implementation Phases</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { phase: 1, title: "Design & Simulation", desc: "Build quantum gate simulator (2-3 qubits)" },
              { phase: 2, title: "Embedded Prototype", desc: "Port simulator to ESP32" },
              { phase: 3, title: "IoT Integration", desc: "Connect to cloud dashboards" },
              { phase: 4, title: "Documentation", desc: "Prepare demo and canvas" }
            ].map((item) => (
              <div key={item.phase} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-primary">
                  {item.phase}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProjectInfo;