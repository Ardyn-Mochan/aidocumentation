import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { docsNavigation } from "@/lib/docsData";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  activeSection: string;
  activePage: string;
}

const DocsSidebar = ({ activeSection, activePage }: DocsSidebarProps) => {
  const [expanded, setExpanded] = useState<string[]>([activeSection]);

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
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-60 border-r border-border bg-background overflow-y-auto">
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
                  "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  isActiveSection 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {section.title}
                </span>
                <ChevronRight 
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                    isExpanded && "rotate-90"
                  )} 
                />
              </button>

              {isExpanded && (
                <div className="ml-4 pl-3 border-l border-border mt-1 space-y-0.5">
                  {section.pages.map((page) => {
                    const isActivePage = isActiveSection && activePage === page.slug;
                    
                    return (
                      <Link
                        key={page.slug}
                        to={`/docs/${section.slug}/${page.slug}`}
                        className={cn(
                          "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
                          isActivePage
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {page.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default DocsSidebar;