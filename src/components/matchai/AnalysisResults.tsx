import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Loader2, RefreshCw, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { FormData } from "./InputForm";

interface Brand {
  name: string;
  category: string;
  whyItFits: string;
  bestFor: string;
  pitchAngle: string;
  matchScore?: number;
}

interface AnalysisResultsProps {
  onSelectBrand: (brand: Brand) => void;
  formData: FormData;
}

const PRICING_TABS = [
  { key: "single", label: "Single deliverable" },
  { key: "bundle", label: "Bundle" },
  { key: "ugc", label: "UGC" },
  { key: "affiliate", label: "Affiliate hybrid" },
  { key: "monthly", label: "Monthly partner" },
] as const;
type PricingTab = (typeof PRICING_TABS)[number]["key"];

const AnalysisResults = ({ onSelectBrand, formData }: AnalysisResultsProps) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [profileSummary, setProfileSummary] = useState("");
  const [pricingRange, setPricingRange] = useState<{ min: number; max: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showingAnother, setShowingAnother] = useState(false);
  const [activePricingTab, setActivePricingTab] = useState<PricingTab>("single");

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("match-brands", { body: formData });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setBrands(data.brands || []);
      setProfileSummary(data.profileSummary || "");
      setPricingRange(data.pricingRange || null);
      setActiveIdx(0);
    } catch (err: any) {
      toast.error(err.message || "Failed to find brand-fit opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleShowAnother = async () => {
    // Cycle through already-fetched brands first; fetch a fresh one when exhausted
    if (activeIdx < brands.length - 1) {
      setActiveIdx(activeIdx + 1);
      return;
    }
    setShowingAnother(true);
    try {
      const { data, error } = await supabase.functions.invoke("match-brands", {
        body: { ...formData, excludeBrands: brands.map(b => b.name) },
      });
      if (error) throw error;
      if (data?.brands?.[0]) {
        setBrands(prev => [...prev, data.brands[0]]);
        setActiveIdx(brands.length); // index of the new brand
      } else {
        toast.error("No more brand-fit opportunities right now");
      }
    } catch {
      toast.error("Failed to get another match");
    } finally {
      setShowingAnother(false);
    }
  };

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-foreground-secondary text-supporting">Building your pricing guidance and brand-fit opportunities…</p>
      </motion.div>
    );
  }

  // Derive pricing rates per tab from base range
  const baseMin = pricingRange?.min ?? 200;
  const baseMax = pricingRange?.max ?? 600;
  const tabRanges: Record<PricingTab, { min: number; max: number; note: string }> = {
    single: { min: baseMin, max: baseMax, note: "One post, video, or story on your main platform" },
    bundle: { min: Math.round(baseMin * 2.2), max: Math.round(baseMax * 2.5), note: "3–4 deliverables across formats — better value, longer story" },
    ugc: { min: Math.round(baseMin * 0.6), max: Math.round(baseMax * 0.7), note: "Footage delivered to the brand without posting on your channel" },
    affiliate: { min: Math.round(baseMin * 0.5), max: Math.round(baseMax * 0.6), note: "Lower flat fee plus revenue share — caps unknown, can outperform flat" },
    monthly: { min: Math.round(baseMin * 3), max: Math.round(baseMax * 3.5), note: "Recurring monthly content + exclusivity in your niche" },
  };
  const active = tabRanges[activePricingTab];

  // Recommended packages derived from base range
  const packages = [
    { name: "Starter", deliverables: "1 reel + 1 story", price: Math.round(baseMin * 1.4) },
    { name: "Standard", deliverables: "2 reels + 2 stories + 1 carousel", price: Math.round((baseMin + baseMax) * 1.3) },
    { name: "Long-term", deliverables: "Monthly partnership · 4 reels + 8 stories", price: Math.round(baseMax * 3.2) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-8"
    >
      {/* Module 1: Your creator positioning */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-border rounded-xl p-6 surface-1"
      >
        <h2 className="font-display text-h3 mb-3">Your creator positioning</h2>
        <p className="text-body text-foreground-secondary leading-relaxed">{profileSummary}</p>
      </motion.section>

      {/* Module 2: What you can realistically charge — 5 tabs */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-border rounded-xl p-6 surface-1"
      >
        <h2 className="font-display text-h3 mb-1">What you can realistically charge</h2>
        <p className="text-supporting text-foreground-secondary mb-5">
          Pricing guidance based on your audience size, engagement, and niche. Use ranges as a starting point — never quoted as guarantees.
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {PRICING_TABS.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActivePricingTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-pill text-supporting font-medium transition-colors border ${
                activePricingTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "surface-2 text-foreground-secondary border-border hover:border-border-strong"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="surface-2 border border-border rounded-lg p-5">
          <p className="font-display text-2xl font-bold mb-1">
            ${active.min.toLocaleString()} – ${active.max.toLocaleString()}
            <span className="text-supporting font-sans font-normal text-foreground-secondary ml-2">
              {activePricingTab === "monthly" ? "per month" : "per deliverable"}
            </span>
          </p>
          <p className="text-supporting text-foreground-secondary">{active.note}</p>
        </div>
      </motion.section>

      {/* Module 3: Recommended packages */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border border-border rounded-xl p-6 surface-1"
      >
        <h2 className="font-display text-h3 mb-1">Recommended packages</h2>
        <p className="text-supporting text-foreground-secondary mb-5">
          Editable suggestions to bundle your deliverables. Adjust based on what each brand needs.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {packages.map(pkg => (
            <div key={pkg.name} className="surface-2 border border-border rounded-lg p-4">
              <p className="font-display font-semibold text-supporting mb-1">{pkg.name}</p>
              <p className="text-micro text-foreground-secondary mb-3 leading-relaxed">{pkg.deliverables}</p>
              <p className="font-display text-xl font-bold">${pkg.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Module 4: Brand suggestion — one at a time, exactly one selection */}
      <section>
        <div className="flex items-end justify-between gap-4 mb-1">
          <h2 className="font-display text-h3">Your best brand-fit opportunity</h2>
          {brands.length > 0 && (
            <span className="text-micro text-foreground-secondary tabular-nums shrink-0">
              Match {activeIdx + 1} of {brands.length}
            </span>
          )}
        </div>
        <p className="text-supporting text-foreground-secondary mb-5">
          We surface one brand-fit opportunity at a time. Choose to use this company, or ask MatchAI to show another.
        </p>

        {brands[activeIdx] && (() => {
          const company = brands[activeIdx];
          return (
            <motion.div
              key={`${company.name}-${activeIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="border border-primary/50 lavender-glow rounded-xl p-6 surface-1 max-w-2xl mx-auto"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Star className="h-5 w-5 text-primary fill-primary shrink-0" />
                  <h3 className="font-display font-bold text-h3 truncate">{company.name}</h3>
                </div>
                <Badge className="bg-primary/15 text-primary border-primary/30 whitespace-nowrap">
                  Best fit
                </Badge>
              </div>

              <Badge variant="secondary" className="text-micro mb-4">{company.category}</Badge>

              {company.matchScore !== undefined && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${company.matchScore}%` }} />
                  </div>
                  <span className="text-supporting text-foreground-secondary font-medium tabular-nums">{company.matchScore}%</span>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-supporting font-semibold text-foreground mb-1">Why this fits</p>
                  <p className="text-supporting text-foreground-secondary leading-relaxed">{company.whyItFits}</p>
                </div>
                <div>
                  <p className="text-supporting font-semibold text-foreground mb-1">Best content ideas</p>
                  <p className="text-supporting text-foreground-secondary leading-relaxed">{company.bestFor}</p>
                </div>
                <div>
                  <p className="text-supporting font-semibold text-foreground mb-1">Suggested angle</p>
                  <p className="text-supporting text-foreground-secondary leading-relaxed">{company.pitchAngle}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-5 border-t border-border">
                <Button
                  size="lg"
                  className="flex-1 rounded-lg gradient-primary text-primary-foreground"
                  onClick={() => onSelectBrand(company)}
                >
                  Use this company <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 rounded-lg border-border-strong"
                  onClick={handleShowAnother}
                  disabled={showingAnother}
                >
                  {showingAnother ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Finding another</>
                  ) : (
                    <><RefreshCw className="h-4 w-4 mr-2" /> Show another</>
                  )}
                </Button>
              </div>

              <button
                type="button"
                onClick={() => navigate("/opportunity", { state: { brand: company, formData } })}
                className="w-full text-supporting text-foreground-secondary hover:text-foreground transition-colors mt-3 text-center"
              >
                View full opportunity details →
              </button>
            </motion.div>
          );
        })()}
      </section>
    </motion.div>
  );
};

export type { Brand };
export default AnalysisResults;
