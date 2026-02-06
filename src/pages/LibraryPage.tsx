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
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Documentation Library</h1>
              <p className="text-muted-foreground mt-1">
                Browse and manage your generated documentation
              </p>
            </div>
            <Button asChild>
              <Link to="/create">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Link>
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="pl-10"
            />
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredDocs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery ? "No matching documentation" : "No documentation yet"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Create your first AI-generated documentation"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link to="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Documentation
                  </Link>
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocs.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <Link to={`/generated/${doc.id}`} className="block">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {doc.topic}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {doc.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                          <Calendar className="h-3 w-3" />
                          {formatDate(doc.created_at)}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
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
