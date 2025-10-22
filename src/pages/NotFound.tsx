import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          404
        </div>
        <h1 className="text-3xl font-bold mb-4">Quantum State Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This page exists in a superposition of being and not being...
        </p>
        <Button asChild size="lg" className="quantum-glow">
          <a href="/">
            <Home className="mr-2 w-5 h-5" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;