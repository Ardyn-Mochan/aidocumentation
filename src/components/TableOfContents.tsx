import { useState, useEffect } from "react";
import { getDocContent } from "@/lib/docsData";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  section: string;
  page: string;
}

const TableOfContents = ({ section, page }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const content = getDocContent(section, page);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    content.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content, section, page]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <aside className="fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-52 border-l border-border bg-background overflow-y-auto">
      <div className="p-4">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">
          On this page
        </h4>
        <nav className="space-y-1">
          {content.sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "block w-full text-left text-sm py-1 transition-colors",
                activeId === item.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default TableOfContents;