import { motion } from "framer-motion";
import { UserCircle, Brain, Building2, Send } from "lucide-react";

const steps = [
  { icon: UserCircle, num: "01", title: "Set up your creator profile", desc: "Platform, follower count, niche, content style, and the kind of deal you want." },
  { icon: Brain, num: "02", title: "Get pricing guidance", desc: "MatchAI builds your positioning and gives realistic pricing ranges and package suggestions." },
  { icon: Building2, num: "03", title: "See your best brand-fit opportunities", desc: "Brands that actually match your content, with the reasoning behind every fit." },
  { icon: Send, num: "04", title: "Send personalized outreach", desc: "Brand-specific outreach you can edit and send. AI-suggested replies kick in when a brand replies." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 border-t border-border/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          How <span className="gradient-text">MatchAI</span> works
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Four steps from "I need a brand deal" to "email sent."
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl border border-border/40 bg-card/40 p-8 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-card/60 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
          >
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-5 transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/10 group-hover:border-primary/40">
              <s.icon size={24} className="text-primary" />
            </div>
            <span className="text-xs text-primary font-mono font-medium">{s.num}</span>
            <h3 className="font-display font-semibold text-base mt-1 mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
