import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import OnboardingWizard, { type WizardData } from "@/components/matchai/OnboardingWizard";
import LoadingScreen from "@/components/matchai/LoadingScreen";
import AnalysisResults from "@/components/matchai/AnalysisResults";
import EmailGeneration from "@/components/matchai/EmailGeneration";
import ThemeLogo from "@/components/ThemeLogo";
import type { Brand } from "@/components/matchai/AnalysisResults";
import type { FormData } from "@/components/matchai/InputForm";
import { supabase } from "@/integrations/supabase/client";

const MatchPage = () => {
  const location = useLocation();
  const incomingState = location.state as { selectedBrand?: Brand; formData?: FormData } | null;

  const [step, setStep] = useState(0); // 0 wizard · 1 loading · 2 results · 3 outreach
  const [formData, setFormData] = useState<FormData | null>(incomingState?.formData ?? null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(incomingState?.selectedBrand ?? null);
  const [runId, setRunId] = useState<string | null>(null);

  // If user came back from /opportunity with a selected brand, jump straight to outreach
  useEffect(() => {
    if (incomingState?.selectedBrand && incomingState?.formData) {
      setStep(3);
    }
  }, []);

  const handleWizardComplete = async (data: WizardData) => {
    // Map WizardData → FormData (backwards-compat with existing edge functions)
    const fd: FormData = {
      platform: data.platform,
      followers: data.followers,
      niche: data.niche,
      description: data.description,
      handle: data.profileLink,
    };
    setFormData(fd);
    setStep(1);

    // Track this match run as a draft for the signed-in user
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: inserted } = await supabase
        .from("match_runs")
        .insert({
          user_id: user.id,
          status: "draft",
          niche: data.niche,
          platform: data.platform,
        })
        .select("id")
        .single();
      if (inserted?.id) setRunId(inserted.id);
    }
  };

  const handleLoadingComplete = useCallback(() => setStep(2), []);

  const handleSelectBrand = async (brand: Brand) => {
    setSelectedBrand(brand);
    setStep(3);
    if (runId) {
      await supabase
        .from("match_runs")
        .update({
          status: "active",
          brand_name: brand.name,
          brand_data: brand as any,
          creator_profile: formData as any,
          updated_at: new Date().toISOString(),
        })
        .eq("id", runId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-supporting text-foreground-secondary hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Home
          </Link>
          <Link to="/"><ThemeLogo className="h-8 w-auto" /></Link>
          <Link to="/pipeline" className="text-supporting text-foreground-secondary hover:text-foreground transition-colors">
            Pipeline
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 0 && <OnboardingWizard key="wizard" onComplete={handleWizardComplete} />}
            {step === 1 && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}
            {step === 2 && formData && (
              <AnalysisResults key="results" onSelectBrand={handleSelectBrand} formData={formData} />
            )}
            {step === 3 && selectedBrand && formData && (
              <EmailGeneration
                key="email"
                brand={selectedBrand}
                creatorHandle={formData.handle || formData.platform}
                creatorProfile={formData}
                onBack={() => setStep(2)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
