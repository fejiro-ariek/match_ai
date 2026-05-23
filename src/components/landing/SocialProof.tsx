import { motion } from "framer-motion";
import { Users, Clock, MessageSquare } from "lucide-react";

const cards = [
  {
    icon: Users,
    title: "Built for small creators",
    desc: "10K–100K followers. Not agencies. Not celebrities. You.",
  },
  {
    icon: Clock,
    title: "Save hours every week",
    desc: "Stop researching brands and writing emails from scratch.",
  },
  {
    icon: MessageSquare,
    title: "Emails that sound like you",
    desc: "Not templates. Real outreach based on your actual content.",
  },
];

const SocialProof = () => (
  <section className="py-20 border-t border-border/30">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm text-muted-foreground mb-10">
        Built for smaller creators who usually do all of this alone
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border/40 bg-card/50 p-6 text-center"
          >
            <c.icon size={24} className="mx-auto mb-3 text-primary" />
            <h3 className="font-display font-semibold text-sm mb-1">{c.title}</h3>
            <p className="text-xs text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
