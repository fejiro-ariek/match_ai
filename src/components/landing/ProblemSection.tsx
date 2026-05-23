import { motion } from "framer-motion";
import { Search, DollarSign, Mail, TrendingDown, Clock, UserX } from "lucide-react";

const problems = [
  { icon: Search, title: "Finding the right brands", desc: "You scroll endlessly trying to figure out who to pitch." },
  { icon: DollarSign, title: "Knowing what to charge", desc: "You guess your pricing and either undercharge or scare brands off." },
  { icon: Mail, title: "Writing your first pitch", desc: "You stare at a blank screen, unsure what to say or how to ask." },
  { icon: TrendingDown, title: "Getting ghosted", desc: "You send one email, hear nothing, and give up." },
  { icon: Clock, title: "Wasting hours", desc: "Research, drafting, follow-ups — it eats your creative time." },
  { icon: UserX, title: "No system in place", desc: "You're winging it every time instead of following a repeatable process." },
];

const ProblemSection = () => (
  <section className="py-20">
    <div className="mx-auto max-w-5xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          What creators actually <span className="gradient-text">struggle with</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Most creators under 100K don&rsquo;t have an agency. MatchAI is the AI brand deals agent that handles the whole flow — fits, pricing, packages, and outreach.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid gap-px border border-border rounded-md overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {problems.map((p) => (
          <div
            key={p.title}
            className="bg-background p-6 space-y-3 hover:bg-card/60 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <p.icon size={16} className="text-primary" />
              <span className="font-display text-sm font-semibold">{p.title}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
