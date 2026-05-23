import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto prose prose-invert prose-sm">
          <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 2026</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">What we collect</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">When you use MatchAI, we collect the information you provide (platform, follower count, niche, content description) to generate personalized brand suggestions and emails. We also collect basic usage data (which features you use, emails copied or regenerated) to improve the product.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">How we use it</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Your data is used solely to power the MatchAI experience — generating analysis, brand suggestions, and emails. We do not sell your data to third parties. Usage analytics help us improve our AI models and user experience.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Data storage</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Your data is stored securely using industry-standard encryption. Free tier usage is session-based. Paid accounts retain history for the duration of your subscription.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Your rights</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">You can request deletion of your data at any time by contacting hello@matchai.com. We will process deletion requests within 30 days.</p>

          <h2 className="font-display text-xl font-semibold mt-8 mb-3">Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">For privacy questions, email hello@matchai.com.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
