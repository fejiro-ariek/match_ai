import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, MessageCircle, Sparkles, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReplyGateProps {
  brandName: string;
  onUnlock?: () => void;
}

/**
 * Brief 8.H — Reply Support / Premium Unlock
 * Triggered only when a brand sends a real human reply (not auto-reply).
 */
const ReplyGate = ({ brandName, onUnlock }: ReplyGateProps) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"creator" | "growth" | "partner">("growth");

  const plans = [
    { key: "creator" as const, name: "Creator", price: "$19/mo", desc: "Reply support for your first brand conversations" },
    { key: "growth"  as const, name: "Growth",  price: "$39/mo", desc: "Full negotiation + follow-up workflow", popular: true },
    { key: "partner" as const, name: "Partner", price: "$79/mo", desc: "Premium deal partner, unlimited conversations" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      {/* Headline */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-pill bg-primary/15 border border-primary/30 mb-4">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-display text-h2 mb-3">
          {brandName} replied — <span className="gradient-text">unlock your AI reply agent</span>
        </h2>
        <p className="text-body text-foreground-secondary">
          A real human reply means it's time to negotiate. Choose a plan to unlock AI-suggested replies, negotiation support, and follow-up workflow.
        </p>
      </div>

      {/* Reply support modules */}
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { icon: MessageCircle, title: "Reply summary", desc: "What the brand actually said and what they want" },
          { icon: Sparkles, title: "AI-suggested replies", desc: "Drafts that match your tone and protect your rate" },
          { icon: Sparkles, title: "Negotiation support", desc: "Counter-offer guidance based on the brand's position" },
          { icon: ArrowRight, title: "Recommended next step", desc: "Always know what to do next, no guessing" },
        ].map(m => (
          <div key={m.title} className="border border-border rounded-xl p-4 surface-1">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <m.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-supporting mb-0.5">{m.title}</p>
                <p className="text-micro text-foreground-secondary leading-relaxed">{m.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid sm:grid-cols-3 gap-3">
        {plans.map(p => {
          const isSelected = selected === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setSelected(p.key)}
              className={`text-left border rounded-2xl p-5 transition-all ${
                isSelected
                  ? "border-primary surface-2 lavender-glow"
                  : "border-border surface-1 hover:border-border-strong"
              } ${p.popular ? "relative" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-pill font-medium">
                  Most popular
                </span>
              )}
              <div className="flex items-center justify-between mb-2">
                <p className="font-display font-bold">{p.name}</p>
                {isSelected && <Check className="h-4 w-4 text-primary" />}
              </div>
              <p className="font-display text-2xl font-bold mb-1">{p.price}</p>
              <p className="text-micro text-foreground-secondary leading-relaxed">{p.desc}</p>
            </button>
          );
        })}
      </div>

      <Button
        size="lg"
        className="w-full gradient-primary text-primary-foreground rounded-lg"
        onClick={() => {
          if (onUnlock) onUnlock();
          else navigate("/pricing");
        }}
      >
        Unlock {plans.find(p => p.key === selected)?.name} support <ArrowRight className="h-4 w-4 ml-1" />
      </Button>

      <p className="text-center text-micro text-foreground-secondary">
        Cancel anytime · Auto-replies don't trigger a paid plan
      </p>
    </motion.div>
  );
};

export default ReplyGate;
