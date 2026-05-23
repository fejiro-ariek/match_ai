import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border border-border bg-surface-1/60 text-micro text-foreground-secondary mb-6">
          <Sparkles size={14} className="text-primary" />
          For creators under 100K followers
        </div>

        <h1 className="font-display text-h1 mb-6">
          Your own <span className="gradient-text">AI brand deals agent</span>
        </h1>

        <p className="text-body-lg text-foreground-secondary max-w-2xl mx-auto mb-8">
          MatchAI helps you find brand-fit opportunities, pricing guidance, package suggestions, personalized outreach, and reply support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="gradient-primary text-primary-foreground px-8 text-body rounded-lg">
            <Link to="/match">Start free <ArrowRight size={18} className="ml-1" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-body border-border-strong rounded-lg">
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>

        <p className="text-supporting text-foreground-secondary mt-5">
          Free until a real brand replies · No credit card · Built for creators without agencies
        </p>
      </motion.div>

      {/* Product mockup placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 max-w-4xl mx-auto rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm p-1"
      >
        <div className="rounded-lg bg-muted/30 aspect-video flex items-center justify-center">
          <div className="text-center space-y-3 px-8">
            <div className="inline-flex items-center gap-2 text-primary">
              <Sparkles size={20} />
              <span className="font-display font-semibold">MatchAI Dashboard</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Enter your profile → Get brand matches → Send personalized emails
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              {["Profile", "Brands", "Emails", "Sent"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full ${i === 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {step}
                  </span>
                  {i < 3 && <ArrowRight size={12} className="text-muted-foreground/40" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
