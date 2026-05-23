import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your <span className="gradient-text">AI brand deals agent</span> is ready
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Set up your creator profile and get brand-fit opportunities, pricing guidance, and personalized outreach in minutes.
          </p>
          <Button
            size="lg"
            className="gradient-primary text-primary-foreground px-8 text-base"
            onClick={() => navigate("/auth")}
          >
            Start free <ArrowRight size={18} className="ml-1" />
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Free until a real brand replies · No credit card · Built for creators without agencies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
