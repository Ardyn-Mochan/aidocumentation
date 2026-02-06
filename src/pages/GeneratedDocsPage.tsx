import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText, 
  Loader2,
  BookOpen,
  Rocket,
  Code,
  Settings,
  Database,
  Shield,
  Zap,
  Terminal,
  HelpCircle,
  Layers,
  Box,
  Menu,
  X
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import CodeBlock from "@/components/CodeBlock";
import { useToast } from "@/hooks/use-toast";
import { exportToMarkdown, exportToPDF } from "@/lib/exportUtils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Rocket,
  Code,
  Settings,
  Database,
  Shield,
  Zap,
  Terminal,
  FileText,
  HelpCircle,
  Layers,
  Box,
};

interface DocSection {
  id: string;
  slug: string;
  title: string;
  content: string;
  icon: string;
  order_index: number;
}

interface GeneratedDoc {
  id: string;
  topic: string;
  description: string;
  created_at: string;
}

const GeneratedDocsPage = () => {
  const { docId, sectionSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [doc, setDoc] = useState<GeneratedDoc | null>(null);
  const [sections, setSections] = useState<DocSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const currentSection = sections.find((s) => s.slug === sectionSlug) || sections[0];
  const currentIndex = sections.findIndex((s) => s.slug === currentSection?.slug);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  useEffect(() => {
    const fetchDoc = async () => {
      if (!docId) return;

      try {
        // Fetch the main doc
        const { data: docData, error: docError } = await supabase
          .from("generated_docs")
          .select("*")
          .eq("id", docId)
          .single();

        if (docError) throw docError;
        setDoc(docData);

        // Fetch sections
        const { data: sectionsData, error: sectionsError } = await supabase
          .from("doc_sections")
          .select("*")
          .eq("doc_id", docId)
          .order("order_index");

        if (sectionsError) throw sectionsError;
        setSections(sectionsData || []);

        // Navigate to first section if none specified
        if (!sectionSlug && sectionsData && sectionsData.length > 0) {
          navigate(`/generated/${docId}/${sectionsData[0].slug}`, { replace: true });
        }
      } catch (error) {
        console.error("Error fetching doc:", error);
        toast({
          title: "Error loading documentation",
          description: "The documentation could not be found.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoc();
  }, [docId, sectionSlug, navigate, toast]);

  const handleExportMarkdown = () => {
    if (!doc || !sections.length) return;
    exportToMarkdown(doc.topic, doc.description, sections);
    toast({ title: "Markdown exported!", description: "Check your downloads folder." });
  };

  const handleExportPDF = async () => {
    if (!doc || !sections.length) return;
    await exportToPDF(doc.topic, doc.description, sections);
    toast({ title: "PDF exported!", description: "Check your downloads folder." });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Documentation not found</h2>
          <p className="text-muted-foreground mb-4">This documentation may have been deleted.</p>
          <Button asChild>
            <Link to="/create">Create New Documentation</Link>
          </Button>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <nav className="space-y-1">
      {sections.map((section) => {
        const IconComponent = iconMap[section.icon] || FileText;
        const isActive = section.slug === currentSection?.slug;
        
        return (
          <Link
            key={section.id}
            to={`/generated/${docId}/${section.slug}`}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <IconComponent className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{section.title}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-border">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
            <div className="mb-6">
              <Link 
                to="/library" 
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
              >
                <ChevronLeft className="h-3 w-3" />
                Back to Library
              </Link>
              <h2 className="font-semibold text-foreground truncate">{doc.topic}</h2>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{doc.description}</p>
            </div>
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 h-full w-72 bg-card border-r border-border p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-foreground truncate">{doc.topic}</h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-10">
            {/* Export buttons */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{currentSection?.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
                  <Download className="h-4 w-4 mr-2" />
                  Markdown
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>

            {/* Content */}
            {currentSection && (
              <article className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code: ({ children, className }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !className;
                      
                      if (isInline) {
                        return (
                          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                            {children}
                          </code>
                        );
                      }
                      
                      return (
                        <CodeBlock
                          code={String(children).replace(/\n$/, "")}
                          language={match?.[1] || "text"}
                        />
                      );
                    },
                    pre: ({ children }) => <div className="not-prose my-4">{children}</div>,
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-foreground mt-10 mb-4 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-4">{children}</ol>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-border rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-secondary">{children}</thead>,
                    th: ({ children }) => (
                      <th className="px-4 py-2 text-left text-sm font-semibold text-foreground border-b border-border">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                        {children}
                      </td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {currentSection.content}
                </ReactMarkdown>
              </article>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              {prevSection ? (
                <Link
                  to={`/generated/${docId}/${prevSection.slug}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{prevSection.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextSection && (
                <Link
                  to={`/generated/${docId}/${nextSection.slug}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{nextSection.title}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeneratedDocsPage;
