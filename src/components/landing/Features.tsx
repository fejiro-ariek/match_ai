import { motion } from "framer-motion";
import { Search, Send, ShieldCheck, Kanban, Wallet, LineChart } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Discovery",
    desc: "Surface brand-fit opportunities tuned to your niche, audience size, and tone — with the reasoning behind every match.",
  },
  {
    icon: Send,
    title: "Outreach",
    desc: "Personalized first emails written in your voice. Review, tweak, and send in one click — no templates.",
  },
  {
    icon: ShieldCheck,
    title: "Pricing Protection",
    desc: "Realistic rate ranges and package structures so you never underprice or get talked down in negotiation.",
  },
  {
    icon: Kanban,
    title: "Pipeline",
    desc: "Every brand, conversation, and next step in one calm view. Know exactly who to follow up with today.",
  },
  {
    icon: Wallet,
    title: "Payments",
    desc: "Track deal value, invoices, and paid status across partnerships — so income stops slipping through the cracks.",
  },
  {
    icon: LineChart,
    title: "Learning Insights",
    desc: "MatchAI learns from each reply and outcome, sharpening matches and messaging the more you use it.",
  },
];

const Features = () => (
  <section id="features" className="relative py-24 border-t border-border/30">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-surface-1/60 backdrop-blur-md text-xs font-light text-muted-foreground mb-5">
          Everything you need to land deals
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Your creator business, <span className="gradient-text">run end to end</span>
        </h2>
        <p className="text-base font-light text-muted-foreground">
          Six tools working as one agent — from finding the right brand to getting paid.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-depth"
          >
            <div className="absolute -right-16 -top-16 size-40 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-depth">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
