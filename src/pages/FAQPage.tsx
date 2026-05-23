import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FAQ from "@/components/landing/FAQ";

const FAQPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-28 pb-10">
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Everything you need to know about MatchAI.
        </p>
      </div>
    </main>
    <FAQ />
    <Footer />
  </div>
);

export default FAQPage;
