import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { docsNavigation } from "@/lib/docsData";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  activeSection: string;
  activePage: string;
}

const MobileSidebar = ({ activeSection, activePage }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([activeSection]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleExpand = (slug: string) => {
    setExpanded((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary border border-border text-foreground shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 z-50 h-full w-72 border-r border-border bg-sidebar overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="text-lg font-semibold text-foreground">Documentation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
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
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "block rounded-md px-3 py-2 text-sm transition-colors",
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
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;
