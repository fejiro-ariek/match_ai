import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Brain, Target, Mail, Sliders, RefreshCw, BarChart3, Shield, Zap, Copy, History, Users, Globe } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Creator Analysis", desc: "Get a personalized summary of your creator profile, including your strengths, positioning, and what makes your content valuable to brands." },
  { icon: Target, title: "Smart Brand Matching", desc: "Receive 3 brand suggestions tailored to your niche, content style, and audience. Each comes with a pitch angle you can use immediately." },
  { icon: BarChart3, title: "Pricing Guidance", desc: "Know what to charge based on your follower count and engagement. We use real market ranges so you never undercharge or scare brands off." },
  { icon: Mail, title: "Email Generation", desc: "Get a full outreach email (100–140 words), two follow-ups, and a reply template. Each email is personalized to your selected brand." },
  { icon: Sliders, title: "Tone Controls", desc: "Switch between casual, professional, direct, or shorter tones. The AI rewrites the email to match — not just swapping a few words." },
  { icon: RefreshCw, title: "One-Click Regeneration", desc: "Don't like an email? Regenerate it instantly. Each version is different, not just reshuffled." },
  { icon: Copy, title: "Copy & Edit", desc: "Every email has a copy button. You can also edit inline before copying. The goal: send without rewriting." },
  { icon: Shield, title: "Honest Guidance", desc: "We tell you what's realistic. No inflated metrics, no fake testimonials, no promises we can't back up." },
  { icon: Zap, title: "Fast Experience", desc: "From profile input to send-ready emails in under 2 minutes. Loading states keep you informed at every step." },
  { icon: History, title: "Email History", desc: "Review and reuse emails you've generated. Coming in Pro and Studio plans." },
  { icon: Users, title: "Team Access", desc: "Manage outreach across multiple profiles. Coming in the Studio plan." },
  { icon: Globe, title: "Multi-Platform", desc: "Works with Instagram, TikTok, YouTube, Twitter, LinkedIn, and more." },
];

const FeaturesPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Features</span> built for creators
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to go from "I want brand deals" to actually landing them.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border/40 bg-card/40 p-6 hover:bg-card/60 transition-colors">
              <f.icon size={22} className="text-primary mb-3" />
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default FeaturesPage;
