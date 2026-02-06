import { useState } from "react";
import Header from "@/components/Header";
import DocsSidebar from "@/components/DocsSidebar";
import HeroSection from "@/components/HeroSection";
import DocContent from "@/components/DocContent";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DocsSidebar />
      
      {showDocs ? (
        <DocContent />
      ) : (
        <HeroSection />
      )}
      
      <AIAssistant />
    </div>
  );
};

export default Index;
