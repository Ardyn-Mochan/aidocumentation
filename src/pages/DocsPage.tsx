import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import DocsSidebar from "@/components/DocsSidebar";
import DocContent from "@/components/DocContent";
import TableOfContents from "@/components/TableOfContents";
import AIAssistant from "@/components/AIAssistant";
import MobileSidebar from "@/components/MobileSidebar";

const DocsPage = () => {
  const { section = "getting-started", page = "introduction" } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <DocsSidebar activeSection={section} activePage={page} />
        </div>
        
        {/* Mobile sidebar */}
        <MobileSidebar activeSection={section} activePage={page} />
        
        {/* Main content */}
        <DocContent section={section} page={page} />
        
        {/* Table of contents - desktop only */}
        <div className="hidden xl:block">
          <TableOfContents section={section} page={page} />
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default DocsPage;
