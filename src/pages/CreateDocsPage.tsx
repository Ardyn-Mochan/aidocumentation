import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, FileText, Loader2, ArrowRight, Zap, Database } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const exampleTopics = [
  "React Hooks",
  "REST API Design",
  "Docker",
  "TypeScript",
  "PostgreSQL",
  "GraphQL",
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
      
      <main className="flex-1 pt-14">
        <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
              Create Documentation
            </h1>
            <p className="text-muted-foreground">
              Enter any topic and our AI will generate comprehensive, multi-page documentation.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Topic
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., React Hooks, Kubernetes, Python FastAPI"
                className="h-11"
                disabled={isGenerating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional context <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Add any specific requirements, target audience, or focus areas..."
                className="min-h-[100px] resize-none"
                disabled={isGenerating}
              />
            </div>

            {/* Progress */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Generating documentation...</span>
                  <span className="text-foreground font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground"
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
              className="w-full h-11"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Example Topics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-8 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-3">
              Try these popular topics
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleTopics.map((example) => (
                <button
                  key={example}
                  onClick={() => setTopic(example)}
                  disabled={isGenerating}
                  className="px-3 py-1.5 rounded-md border border-border bg-background text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors disabled:opacity-50"
                >
                  {example}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-12 grid gap-4 sm:grid-cols-3"
          >
            <div className="rounded-lg border border-border p-4">
              <FileText className="h-5 w-5 text-muted-foreground mb-2" />
              <h3 className="text-sm font-medium text-foreground mb-1">Multi-Page</h3>
              <p className="text-xs text-muted-foreground">
                6-8 comprehensive sections with navigation
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <Database className="h-5 w-5 text-muted-foreground mb-2" />
              <h3 className="text-sm font-medium text-foreground mb-1">Saved to Cloud</h3>
              <p className="text-xs text-muted-foreground">
                All docs are saved and accessible anytime
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <Zap className="h-5 w-5 text-muted-foreground mb-2" />
              <h3 className="text-sm font-medium text-foreground mb-1">Export</h3>
              <p className="text-xs text-muted-foreground">
                Download as Markdown or PDF
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