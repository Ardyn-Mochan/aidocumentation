import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

const versions = [
  { id: "v4", label: "v4.0 (Latest)", default: true },
  { id: "v3", label: "v3.x" },
  { id: "v2", label: "v2.x (Legacy)" },
];

const VersionSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(versions[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary/80 transition-colors"
      >
        <span>{selected.label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 z-50 w-40 rounded-lg border border-border bg-card shadow-lg overflow-hidden"
            >
              {versions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => {
                    setSelected(version);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <span>{version.label}</span>
                  {selected.id === version.id && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VersionSelector;
