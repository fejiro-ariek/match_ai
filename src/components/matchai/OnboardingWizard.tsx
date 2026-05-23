import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface WizardData {
  // Step 1 — Profile
  platform: string;
  followers: string;
  niche: string;
  description: string;
  country?: string;
  profileLink?: string;
  // Step 2 — Stage
  pastDeals?: string;
  brandsFindYou?: string;
  monthlyIncome?: string;
  agencyRep?: string;
  partnershipTypes?: string[];
  // Step 3 — Pricing
  existingDeliverables?: string;
  minRate?: string;
  ugcOnly?: string;
  affiliateOk?: string;
  confusion?: string;
  // Step 4 — Brand prefs
  wantedCategories?: string;
  unwantedCategories?: string;
  dealSize?: string;
  geo?: string;
  values?: string;
}

interface OnboardingWizardProps {
  onComplete: (data: WizardData) => void;
}

const platforms = ["TikTok", "Instagram", "YouTube", "Twitter/X"];
const yesNo = ["Yes", "No", "Some"];
const partnershipOpts = ["Single posts", "Bundles", "UGC", "Affiliate", "Long-term"];
const dealSizes = ["Under $500", "$500–$2K", "$2K–$5K", "$5K+"];

const STEPS = [
  { num: 1, label: "Profile" },
  { num: 2, label: "Stage" },
  { num: 3, label: "Pricing" },
  { num: 4, label: "Brand preferences" },
  { num: 5, label: "Plan summary" },
];

const Pill = ({ active, onClick, children }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3.5 py-1.5 rounded-pill text-supporting font-medium transition-colors border ${
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "surface-2 text-foreground-secondary border-border hover:border-border-strong"
    }`}
  >
    {children}
  </button>
);

const Field = ({ label, children, hint }: any) => (
  <div>
    <label className="text-supporting font-medium mb-1.5 block">{label}</label>
    {children}
    {hint && <p className="text-micro text-foreground-secondary mt-1">{hint}</p>}
  </div>
);

const OnboardingWizard = ({ onComplete }: OnboardingWizardProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    platform: "", followers: "", niche: "", description: "",
    partnershipTypes: [],
  });

  const update = (k: keyof WizardData, v: any) => setData(p => ({ ...p, [k]: v }));
  const togglePartnership = (v: string) =>
    setData(p => ({
      ...p,
      partnershipTypes: p.partnershipTypes?.includes(v)
        ? p.partnershipTypes.filter(x => x !== v)
        : [...(p.partnershipTypes || []), v],
    }));

  const canContinue = () => {
    if (step === 1) return data.platform && data.followers && data.niche && data.description && data.profileLink;
    return true;
  };

  const next = () => {
    if (step === 5) onComplete(data);
    else setStep(s => s + 1);
  };

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
        {STEPS.map((s, i) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`h-8 w-8 rounded-pill flex items-center justify-center text-supporting font-semibold transition-colors ${
                step > s.num ? "bg-primary text-primary-foreground"
                : step === s.num ? "bg-primary/20 text-primary border border-primary"
                : "surface-2 text-foreground-secondary border border-border"
              }`}>
                {step > s.num ? <Check className="h-4 w-4" /> : s.num}
              </div>
              <span className={`text-micro hidden sm:block ${step >= s.num ? "text-foreground" : "text-foreground-secondary"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-2 ${step > s.num ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          {step === 1 && (
            <>
              <div>
                <h2 className="font-display text-h2 mb-2">Tell MatchAI about your content</h2>
                <p className="text-body text-foreground-secondary">
                  We'll tailor your positioning, packages, pricing guidance, and brand-fit opportunities to your niche.
                </p>
              </div>
              <Field label="Primary platform">
                <div className="flex flex-wrap gap-2">
                  {platforms.map(p => <Pill key={p} active={data.platform === p} onClick={() => update("platform", p)}>{p}</Pill>)}
                </div>
              </Field>
              <Field label="Follower count" hint="Your main platform follower count">
                <Input value={data.followers} onChange={e => update("followers", e.target.value)} placeholder="e.g. 25,000" />
              </Field>
              <Field label="Country or region">
                <Input value={data.country || ""} onChange={e => update("country", e.target.value)} placeholder="e.g. United States" />
              </Field>
              <Field label="Niche" hint="Comma-separated keywords">
                <Input value={data.niche} onChange={e => update("niche", e.target.value)} placeholder="fitness, gym, workouts" />
              </Field>
              <Field label="What do you create?">
                <Textarea value={data.description} onChange={e => update("description", e.target.value)} rows={2} placeholder="In one sentence, what do you post?" />
              </Field>
              <Field label="Profile link or handle" hint="Used to personalize your outreach emails">
                <Input value={data.profileLink || ""} onChange={e => update("profileLink", e.target.value)} placeholder="@yourhandle or full URL" />
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h2 className="font-display text-h2 mb-2">Tell MatchAI where you are today</h2>
                <p className="text-body text-foreground-secondary">A quick snapshot of your business stage helps us calibrate.</p>
              </div>
              <Field label="Have you done paid brand deals before?">
                <div className="flex flex-wrap gap-2">{yesNo.map(o => <Pill key={o} active={data.pastDeals === o} onClick={() => update("pastDeals", o)}>{o}</Pill>)}</div>
              </Field>
              <Field label="How do brands usually find you?">
                <Input value={data.brandsFindYou || ""} onChange={e => update("brandsFindYou", e.target.value)} placeholder="DMs, email, agencies, not yet…" />
              </Field>
              <Field label="Current monthly creator income (optional)">
                <Input value={data.monthlyIncome || ""} onChange={e => update("monthlyIncome", e.target.value)} placeholder="$0–$500" />
              </Field>
              <Field label="Are you represented by an agency?">
                <div className="flex flex-wrap gap-2">{["Yes","No"].map(o => <Pill key={o} active={data.agencyRep === o} onClick={() => update("agencyRep", o)}>{o}</Pill>)}</div>
              </Field>
              <Field label="What types of partnerships interest you most?">
                <div className="flex flex-wrap gap-2">{partnershipOpts.map(o => <Pill key={o} active={data.partnershipTypes?.includes(o)} onClick={() => togglePartnership(o)}>{o}</Pill>)}</div>
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h2 className="font-display text-h2 mb-2">Set your starting business preferences</h2>
                <p className="text-body text-foreground-secondary">No need to lock anything — these are starting points we can adjust.</p>
              </div>
              <Field label="Are there deliverables you already offer?">
                <Input value={data.existingDeliverables || ""} onChange={e => update("existingDeliverables", e.target.value)} placeholder="reels, stories, UGC, dedicated videos…" />
              </Field>
              <Field label="Do you have a minimum rate in mind? (optional)">
                <Input value={data.minRate || ""} onChange={e => update("minRate", e.target.value)} placeholder="$250 per post" />
              </Field>
              <Field label="Are you open to UGC only?">
                <div className="flex flex-wrap gap-2">{yesNo.map(o => <Pill key={o} active={data.ugcOnly === o} onClick={() => update("ugcOnly", o)}>{o}</Pill>)}</div>
              </Field>
              <Field label="Are you open to affiliate or hybrid deals?">
                <div className="flex flex-wrap gap-2">{yesNo.map(o => <Pill key={o} active={data.affiliateOk === o} onClick={() => update("affiliateOk", o)}>{o}</Pill>)}</div>
              </Field>
              <Field label="What feels most confusing right now?">
                <Textarea value={data.confusion || ""} onChange={e => update("confusion", e.target.value)} rows={2} placeholder="Pricing, packaging, replies, finding brands…" />
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <h2 className="font-display text-h2 mb-2">Help MatchAI narrow your best fits</h2>
                <p className="text-body text-foreground-secondary">Brand preferences shape which opportunities we surface.</p>
              </div>
              <Field label="Brand categories you want">
                <Input value={data.wantedCategories || ""} onChange={e => update("wantedCategories", e.target.value)} placeholder="activewear, supplements, wellness apps" />
              </Field>
              <Field label="Brand categories you do not want">
                <Input value={data.unwantedCategories || ""} onChange={e => update("unwantedCategories", e.target.value)} placeholder="alcohol, gambling, fast fashion" />
              </Field>
              <Field label="Preferred deal size">
                <div className="flex flex-wrap gap-2">{dealSizes.map(o => <Pill key={o} active={data.dealSize === o} onClick={() => update("dealSize", o)}>{o}</Pill>)}</div>
              </Field>
              <Field label="Geographic preferences">
                <Input value={data.geo || ""} onChange={e => update("geo", e.target.value)} placeholder="US-only, global, EU…" />
              </Field>
              <Field label="Values or boundaries">
                <Textarea value={data.values || ""} onChange={e => update("values", e.target.value)} rows={2} placeholder="cruelty-free, sustainable, no diet culture…" />
              </Field>
            </>
          )}

          {step === 5 && (
            <>
              <div>
                <h2 className="font-display text-h2 mb-2">See how MatchAI will support you</h2>
                <p className="text-body text-foreground-secondary">Here's the plan your AI agent will execute next.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Positioning", body: `${data.niche || "Your niche"} on ${data.platform || "your platform"} — refined for brand readability.` },
                  { title: "Pricing", body: "Realistic ranges across single, bundle, UGC, affiliate, and monthly partner formats." },
                  { title: "Packages", body: "3 editable package suggestions calibrated to your follower count and deliverables." },
                  { title: "Outreach", body: "Personalized outreach drafts in casual, professional, direct, and short tones." },
                ].map(c => (
                  <div key={c.title} className="border border-border rounded-xl p-4 surface-1">
                    <p className="font-display font-semibold text-supporting mb-1">{c.title}</p>
                    <p className="text-micro text-foreground-secondary leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              type="button"
              onClick={next}
              disabled={!canContinue()}
              className="gradient-primary text-primary-foreground rounded-lg gap-1.5"
              size="lg"
            >
              {step === 5 ? "See my matches, rates, and package ideas" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingWizard;
