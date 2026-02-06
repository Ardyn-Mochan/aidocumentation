import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, FileText, Loader2, ArrowRight, Zap, Database, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const exampleTopics = [
  { label: "React Hooks", description: "Comprehensive guide to React Hooks" },
  { label: "REST API Design", description: "Best practices for designing RESTful APIs" },
  { label: "Docker", description: "Container orchestration with Docker" },
  { label: "TypeScript", description: "TypeScript fundamentals and advanced patterns" },
  { label: "PostgreSQL", description: "PostgreSQL database administration" },
  { label: "GraphQL", description: "Building GraphQL APIs" },
];

const CreateDocsPage = () => {
  const [topic, setTopic] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic to generate documentation for.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress while waiting for AI
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 90));
    }, 500);

    try {
      const fullTopic = additionalContext 
        ? `${topic}. Additional context: ${additionalContext}`
        : topic;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-docs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ topic: fullTopic, save: true }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate documentation");
      }

      const data = await response.json();
      
      clearInterval(progressInterval);
      setProgress(100);

      toast({
        title: "Documentation generated!",
        description: `Created ${data.sections?.length || 0} sections for "${topic}"`,
      });

      // Navigate to the generated docs
      setTimeout(() => {
        navigate(`/generated/${data.docId}`);
      }, 500);
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Documentation Generator
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Generate Comprehensive Docs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter any topic and our AI will create a complete, multi-page documentation 
              suite with examples, tutorials, and API references.
            </p>
          </motion.div>

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 mb-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Documentation Topic *
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., React Hooks, Kubernetes, Python FastAPI..."
                  className="text-lg h-14"
                  disabled={isGenerating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Context (optional)
                </label>
                <Textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Add any specific requirements, target audience, or focus areas..."
                  className="min-h-[100px]"
                  disabled={isGenerating}
                />
              </div>

              {/* Progress bar */}
              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Generating documentation...</span>
                    <span className="text-primary font-medium">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-glow-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                size="lg"
                className="w-full h-14 text-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Documentation...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Documentation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Example Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
              Try these popular topics
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleTopics.map((example) => (
                <button
                  key={example.label}
                  onClick={() => setTopic(example.label)}
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-full bg-secondary/50 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Multi-Page Structure</h3>
              <p className="text-sm text-muted-foreground">
                Generates 6-8 comprehensive sections with sidebar navigation
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Saved to Cloud</h3>
              <p className="text-sm text-muted-foreground">
                All generated docs are saved and accessible anytime
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Export Options</h3>
              <p className="text-sm text-muted-foreground">
                Download as Markdown or PDF for offline use
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateDocsPage;
