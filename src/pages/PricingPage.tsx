import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";

const PricingPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-28 pb-10">
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Simple, <span className="gradient-text">honest pricing</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Start free. Upgrade when you're landing deals consistently.
        </p>
      </div>
    </main>
    <Pricing />
    <FAQ />
    <Footer />
  </div>
);

export default PricingPage;
