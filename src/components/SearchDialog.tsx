import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, ArrowRight, Sparkles } from "lucide-react";
import { docsNavigation } from "@/lib/docsData";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // Filter results based on query
  const getResults = () => {
    if (!query.trim()) {
      // Show popular pages when no query
      return docsNavigation.slice(0, 3).flatMap(section =>
        section.pages.slice(0, 2).map(page => ({
          section: section.title,
          sectionSlug: section.slug,
          ...page,
        }))
      );
    }

    const lowerQuery = query.toLowerCase();
    return docsNavigation.flatMap(section =>
      section.pages
        .filter(page =>
          page.title.toLowerCase().includes(lowerQuery) ||
          page.description?.toLowerCase().includes(lowerQuery) ||
          section.title.toLowerCase().includes(lowerQuery)
        )
        .map(page => ({
          section: section.title,
          sectionSlug: section.slug,
          ...page,
        }))
    ).slice(0, 8);
  };

  const results = getResults();

  const handleSelect = (sectionSlug: string, pageSlug: string) => {
    navigate(`/docs/${sectionSlug}/${pageSlug}`);
    onOpenChange(false);
    setQuery("");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        onClick={() => onOpenChange(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              autoFocus
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {results.length > 0 ? (
              <div className="space-y-1">
                {!query.trim() && (
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Popular
                  </div>
                )}
                {results.map((result) => (
                  <button
                    key={`${result.sectionSlug}-${result.slug}`}
                    onClick={() => handleSelect(result.sectionSlug, result.slug)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-secondary transition-colors group"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {result.title}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {result.section} • {result.description}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="text-muted-foreground mb-2">No results found</div>
                <div className="text-sm text-muted-foreground/60">
                  Try searching for something else
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↑</kbd>
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↵</kbd>
                to select
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>AI-powered</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchDialog;
