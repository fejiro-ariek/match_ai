import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { UserCircle, Brain, Building2, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: UserCircle, num: "01", title: "Enter your creator profile", desc: "Tell us your platform, follower count, niche, content type, and what kind of deal you're looking for. No account linking needed — just type it in.", details: ["Platform (Instagram, TikTok, YouTube, etc.)", "Follower count and engagement rate", "Your niche and content style", "What kind of deal you want (paid, gifting, affiliate)"] },
  { icon: Brain, num: "02", title: "AI analyzes your value", desc: "We generate a creator summary, estimate your pricing range based on real market data, and identify what makes your content valuable to brands.", details: ["Personalized creator summary", "Pricing guidance based on your tier", "Strength and positioning analysis"] },
  { icon: Building2, num: "03", title: "Get matched with brands", desc: "We suggest 3 brands that actually fit your niche and content style. Each comes with a pitch angle so you know exactly how to approach them.", details: ["3 curated brand suggestions", "Why each brand fits you", "Suggested pitch angle for each", "Option to get more suggestions"] },
  { icon: Send, num: "04", title: "Send ready-made emails", desc: "Get a full outreach email, two follow-ups, and a reply template. Edit the tone, regenerate, or copy and send as-is.", details: ["100–140 word outreach email", "Two follow-up emails", "Reply template", "Tone controls and regeneration"] },
];

const HowItWorksPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How <span className="gradient-text">MatchAI</span> works
          </h1>
          <p className="text-lg text-muted-foreground">
            Four steps from "I need a brand deal" to sending your first outreach email.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-12">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <s.icon size={24} className="text-primary" />
                </div>
              </div>
              <div>
                <span className="text-xs text-primary font-mono">{s.num}</span>
                <h2 className="font-display text-xl font-bold mt-1 mb-2">{s.title}</h2>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{s.desc}</p>
                <ul className="space-y-1">
                  {s.details.map((d) => (
                    <li key={d} className="text-xs text-muted-foreground/80 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="gradient-primary text-primary-foreground px-8">
            Try it free <ArrowRight size={18} className="ml-1" />
          </Button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default HowItWorksPage;
