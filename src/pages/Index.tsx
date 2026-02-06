import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <HeroSection />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
