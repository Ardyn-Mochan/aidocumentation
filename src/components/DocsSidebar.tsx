import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { docsNavigation } from "@/lib/docsData";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  activeSection: string;
  activePage: string;
}

const DocsSidebar = ({ activeSection, activePage }: DocsSidebarProps) => {
  const [expanded, setExpanded] = useState<string[]>([activeSection]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!expanded.includes(activeSection)) {
      setExpanded(prev => [...prev, activeSection]);
    }
  }, [activeSection]);

  const toggleExpand = (slug: string) => {
    setExpanded((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]
    );
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar overflow-y-auto">
      <nav className="p-4 space-y-1">
        {docsNavigation.map((section) => {
          const Icon = section.icon;
          const isExpanded = expanded.includes(section.slug);
          const isActiveSection = activeSection === section.slug;

          return (
            <div key={section.slug}>
              <button
                onClick={() => toggleExpand(section.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActiveSection 
                    ? "text-foreground bg-sidebar-accent" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn(isActiveSection ? "text-primary" : "text-muted-foreground")}>
                    <Icon className="h-4 w-4" />
                  </span>
                  {section.title}
                </span>
                <motion.span
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 border-l border-border pl-3 mt-1 space-y-1">
                      {section.pages.map((page) => {
                        const isActivePage = isActiveSection && activePage === page.slug;
                        
                        return (
                          <Link
                            key={page.slug}
                            to={`/docs/${section.slug}/${page.slug}`}
                            className={cn(
                              "block rounded-md px-3 py-1.5 text-sm transition-colors",
                              isActivePage
                                ? "text-primary bg-primary/10 font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                            )}
                          >
                            {page.title}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default DocsSidebar;
