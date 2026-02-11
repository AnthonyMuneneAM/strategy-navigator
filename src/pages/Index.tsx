import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FrameworkSection from "@/components/FrameworkSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import TowersSection from "@/components/TowersSection";
import ExploreSection from "@/components/ExploreSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FrameworkSection />
      <ValuePropsSection />
      <TowersSection />
      <ExploreSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
