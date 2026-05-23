import { motion } from "framer-motion";
import { ShieldCheck, Eye, Pencil } from "lucide-react";

const cards = [
  { icon: ShieldCheck, title: "No fake brands", desc: "We don't pretend companies are partners. Every suggestion is real and relevant to your niche." },
  { icon: Eye, title: "No fake testimonials", desc: "We won't manufacture social proof. When users succeed, you'll hear about it honestly." },
  { icon: Pencil, title: "You control the message", desc: "Every email is editable. We suggest — you decide what to send." },
];

const TrustSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Honest by <span className="gradient-text">design</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          We built MatchAI on trust, not hype.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border/40 bg-card/40 p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <c.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
