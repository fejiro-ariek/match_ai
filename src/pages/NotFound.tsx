import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center px-4">
      <h1 className="font-display text-7xl font-bold gradient-text mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">This page doesn't exist.</p>
      <Button asChild variant="outline">
        <Link to="/"><ArrowLeft size={16} className="mr-2" /> Back to home</Link>
      </Button>
    </div>
  </div>
);

export default NotFound;
