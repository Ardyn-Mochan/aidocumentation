import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = "Search documentation..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/docs/getting-started/introduction?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          isFocused ? "glow-primary" : ""
        }`}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/50 via-glow-secondary/30 to-primary/50 p-[1px]">
          <div className="h-full w-full rounded-xl bg-card" />
        </div>

        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent py-4 pl-12 pr-32 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <motion.button
            type="submit"
            className="absolute right-2 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="h-4 w-4" />
            Ask AI
          </motion.button>
        </div>
      </motion.div>

      {/* Keyboard shortcut hint */}
      <motion.div
        className="mt-3 flex items-center justify-center gap-4 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="flex items-center gap-1">
          Press <kbd className="rounded bg-secondary px-2 py-0.5 font-mono text-xs">⌘K</kbd> to search
        </span>
        <span className="text-muted-foreground/50">|</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded bg-secondary px-2 py-0.5 font-mono text-xs">/</kbd> for commands
        </span>
      </motion.div>
    </motion.form>
  );
};

export default SearchBar;
