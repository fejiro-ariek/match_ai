import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Target, Lightbulb, MessageCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeLogo from "@/components/ThemeLogo";
import type { Brand } from "@/components/matchai/AnalysisResults";
import type { FormData } from "@/components/matchai/InputForm";

interface LocationState {
  brand: Brand;
  formData: FormData;
}

const OpportunityDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.brand) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <p className="text-foreground-secondary mb-4">No opportunity selected.</p>
        <Link to="/match" className="text-primary hover:underline">Back to matches</Link>
      </div>
    );
  }

  const { brand, formData } = state;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-supporting text-foreground-secondary hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <Link to="/"><ThemeLogo className="h-8 w-auto" /></Link>
          <div className="w-16" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          {/* Header card */}
          <div className="border border-border rounded-2xl p-7 surface-1 lavender-glow">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-display text-h2">{brand.name}</h1>
                  <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
                <Badge variant="secondary" className="text-micro mb-3">{brand.category}</Badge>
                {brand.matchScore !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden max-w-xs">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${brand.matchScore}%` }} />
                    </div>
                    <span className="text-supporting font-medium tabular-nums">{brand.matchScore}% fit</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Why this fits */}
          <div className="border border-border rounded-xl p-6 surface-1">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-primary" />
              <h2 className="font-display text-h3">Why this is a fit for you</h2>
            </div>
            <p className="text-body text-foreground-secondary leading-relaxed">{brand.whyItFits}</p>
          </div>

          {/* Best content ideas */}
          <div className="border border-border rounded-xl p-6 surface-1">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-primary" />
              <h2 className="font-display text-h3">Best content ideas</h2>
            </div>
            <p className="text-body text-foreground-secondary leading-relaxed">{brand.bestFor}</p>
          </div>

          {/* Suggested angle */}
          <div className="border border-border rounded-xl p-6 surface-1">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-4 w-4 text-primary" />
              <h2 className="font-display text-h3">Suggested outreach angle</h2>
            </div>
            <p className="text-body text-foreground-secondary leading-relaxed">{brand.pitchAngle}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              className="flex-1 gradient-primary text-primary-foreground rounded-lg"
              onClick={() => navigate("/match", { state: { selectedBrand: brand, formData } })}
            >
              Create personalized outreach <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 rounded-lg border-border-strong"
              onClick={() => navigate("/match")}
            >
              Show another match
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
