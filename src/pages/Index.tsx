import { HeroSection } from "@/components/ui/hero-section-1";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import TrustSection from "@/components/landing/TrustSection";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <ProblemSection />
    <HowItWorks />
    <Features />
    <TrustSection />
    <Pricing />
    <FAQ />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
