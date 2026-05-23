import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto prose prose-invert prose-sm">
          <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: April 2026</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Service description</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">MatchAI is an AI-powered tool that helps creators generate brand outreach materials including creator analysis, brand suggestions, and outreach emails. The service is provided as-is.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Usage limits</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Free accounts receive 3 generations. Paid plans have monthly limits as described on our pricing page. Unused generations do not roll over.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">No guarantees</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">MatchAI does not guarantee that using our service will result in brand deals, sponsorships, or income. We provide tools and suggestions — outcomes depend on many factors outside our control.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Content ownership</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">You own the content generated using MatchAI. You are free to use, modify, and send any emails or materials created through the platform.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Account termination</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">We reserve the right to terminate accounts that violate these terms or use the service for spam, harassment, or any unlawful purpose.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">For questions about these terms, email hello@matchai.com.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
