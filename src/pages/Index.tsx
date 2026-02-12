import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import DBPSection from "@/components/DBPSection";
import FrameworkSection from "@/components/FrameworkSection";
import OutcomesSection from "@/components/OutcomesSection";
import GetStartedSection from "@/components/GetStartedSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <DBPSection />
      <FrameworkSection />
      <OutcomesSection />
      <GetStartedSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
