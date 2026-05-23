import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type TierKey = "starter" | "growth" | "pro";

const tiers = [
  {
    key: "starter" as TierKey,
    name: "Starter",
    price: "$49.99",
    period: "/mo",
    desc: "Everything you need to land your first brand-fit deals.",
    highlight: false,
    features: [
      "Brand-fit opportunities",
      "Pricing guidance and ranges",
      "Editable package suggestions",
      "Personalized outreach workspace",
      "Pipeline & conversation tracking",
    ],
    cta: "Start with Starter",
  },
  {
    key: "growth" as TierKey,
    name: "Growth",
    price: "$99.99",
    period: "/mo",
    desc: "More depth in matching, negotiation, and active deal flow.",
    highlight: true,
    features: [
      "Everything in Starter",
      "Deeper brand-fit reasoning",
      "AI-suggested replies",
      "Negotiation support",
      "Multi-deal pipeline view",
      "Follow-up workflow",
    ],
    cta: "Choose Growth",
  },
  {
    key: "pro" as TierKey,
    name: "Pro",
    price: "$199.99",
    period: "/mo",
    desc: "The full creator business OS for creators running real deal volume.",
    highlight: false,
    features: [
      "Everything in Growth",
      "Priority brand-fit matching",
      "Advanced negotiation support",
      "Package & rate refinement",
      "Highest usage limits",
      "Priority support",
    ],
    cta: "Go Pro",
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-h2 mb-4">
            Pricing that scales with your <span className="gradient-text">deal flow</span>
          </h2>
          <p className="text-body text-foreground-secondary">
            Three tiers, one agent. Pick the plan that matches how much outreach you're running.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative flex flex-col rounded-3xl p-8 glass transition-all duration-300 hover:-translate-y-1 hover:shadow-depth ${
                t.highlight
                  ? "border-primary/50 lavender-glow lg:scale-[1.03]"
                  : ""
              }`}
            >
              {t.highlight && (
                <>
                  <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary-hover/20" aria-hidden />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-micro gradient-primary text-primary-foreground px-3 py-1 rounded-pill font-medium shadow-depth">
                    <Sparkles size={12} /> Most popular
                  </span>
                </>
              )}

              <div className="relative">
                <h3 className="font-display text-h3">{t.name}</h3>
                <div className="mt-3 mb-1 flex items-baseline gap-1">
                  <span className={`font-display text-5xl font-bold ${t.highlight ? "gradient-text" : ""}`}>
                    {t.price}
                  </span>
                  <span className="text-supporting text-foreground-secondary">{t.period}</span>
                </div>
                <p className="text-supporting text-foreground-secondary mb-6 min-h-[3rem]">{t.desc}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-supporting">
                      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${t.highlight ? "gradient-primary" : "bg-primary/15"}`}>
                        <Check size={12} className={t.highlight ? "text-primary-foreground" : "text-primary"} strokeWidth={3} />
                      </span>
                      <span className="text-foreground-secondary">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={t.highlight ? "default" : "outline"}
                  size="lg"
                  className={`w-full rounded-2xl h-12 font-semibold ${
                    t.highlight
                      ? "gradient-primary text-primary-foreground border-0 shadow-depth hover:opacity-95"
                      : ""
                  }`}
                  onClick={() => navigate("/auth")}
                >
                  {t.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-micro text-foreground-secondary mt-10 max-w-xl mx-auto"
        >
          Pricing guidance uses ranges and structural recommendations, not guarantees. Package recommendations are fully editable. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
