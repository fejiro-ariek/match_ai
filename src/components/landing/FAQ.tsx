import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is MatchAI?", a: "MatchAI helps you get brand deals. It finds brands that fit you, writes outreach emails, and helps you manage conversations all in one place." },
  { q: "How does it work?", a: "You tell us about your content. We match you with relevant brands, generate personalized emails, and help you send and track outreach." },
  { q: "Is it really free until a brand replies?", a: "Yes. You can use the platform and send outreach for free. You only pay once a brand shows real interest." },
  { q: "How many brands can I reach out to?", a: "Unlimited. You can keep reaching out until you get your first reply." },
  { q: "What counts as a \"reply\"?", a: "A real response from a brand showing interest or continuing the conversation. Automated replies don't count." },
  { q: "What happens when a brand replies?", a: "You'll get notified instantly and can unlock the full conversation to respond, negotiate, and close the deal." },
  { q: "Is outreach sent automatically?", a: "No. You stay in control. MatchAI drafts personalized outreach based on your positioning and the brand fit, and you decide what to send." },
  { q: "Will the outreach sound like me?", a: "Yes. Personalized outreach is tailored to your content, niche, and chosen tone — casual, professional, direct, or short." },
  { q: "How does MatchAI find the right brands?", a: "We match you based on your content, audience, niche, and brand-fit signals — and we show you the reasoning for every match." },
  { q: "Do I need to connect my social accounts?", a: "No, but it helps MatchAI personalize outreach and improve brand-fit recommendations." },
  { q: "Can I track my deals?", a: "Yes. The pipeline shows your active conversations, deal status, and upcoming follow-ups in one place." },
  { q: "What if I never get a reply?", a: "You don't pay anything." },
];

const FAQ = () => (
  <section id="faq" className="py-20 border-t border-border/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Frequently asked <span className="gradient-text">questions</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-2xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border/40 bg-card/40 px-5 data-[state=open]:bg-card/60"
            >
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
