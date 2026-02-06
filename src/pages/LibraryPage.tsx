import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Calendar, 
  Loader2,
  BookOpen,
  Search
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GeneratedDoc {
  id: string;
  topic: string;
  description: string;
  created_at: string;
}

const LibraryPage = () => {
  const [docs, setDocs] = useState<GeneratedDoc[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<GeneratedDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchDocs();
  }, []);

  useEffect(() => {
    const filtered = docs.filter(
      (doc) =>
        doc.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocs(filtered);
  }, [searchQuery, docs]);

  const fetchDocs = async () => {
    try {
      const { data, error } = await supabase
        .from("generated_docs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocs(data || []);
      setFilteredDocs(data || []);
    } catch (error) {
      console.error("Error fetching docs:", error);
      toast({
        title: "Error loading library",
        description: "Could not load your documentation library.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("generated_docs")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setDocs((prev) => prev.filter((doc) => doc.id !== id));
      toast({ title: "Documentation deleted" });
    } catch (error) {
      console.error("Error deleting doc:", error);
      toast({
        title: "Error deleting",
        description: "Could not delete the documentation.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-14">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Library</h1>
              <p className="text-muted-foreground mt-1">
                Browse and manage your generated documentation
              </p>
            </div>
            <Button asChild size="sm">
              <Link to="/create">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Link>
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="pl-10 h-10"
            />
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredDocs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h2 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? "No matching documentation" : "No documentation yet"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Create your first AI-generated documentation"}
              </p>
              {!searchQuery && (
                <Button asChild size="sm">
                  <Link to="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Documentation
                  </Link>
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-2">
              {filteredDocs.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="group relative flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <Link to={`/generated/${doc.id}`} className="flex-1 flex items-center gap-4 min-w-0">
                    <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {doc.topic}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {doc.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Calendar className="h-3 w-3" />
                      {formatDate(doc.created_at)}
                    </div>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete documentation?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete "{doc.topic}" and all its sections.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(doc.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LibraryPage;