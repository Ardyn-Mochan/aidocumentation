import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import CodeBlock from "./CodeBlock";
import { getDocContent, docsNavigation } from "@/lib/docsData";

interface DocContentProps {
  section: string;
  page: string;
}

const DocContent = ({ section, page }: DocContentProps) => {
  const content = getDocContent(section, page);
  
  // Find current section and page index for navigation
  const sectionIndex = docsNavigation.findIndex(s => s.slug === section);
  const currentSection = docsNavigation[sectionIndex];
  const pageIndex = currentSection?.pages.findIndex(p => p.slug === page) ?? -1;
  
  // Calculate prev/next pages
  let prevPage: { section: string; page: string; title: string } | null = null;
  let nextPage: { section: string; page: string; title: string } | null = null;
  
  if (pageIndex > 0) {
    prevPage = {
      section: section,
      page: currentSection.pages[pageIndex - 1].slug,
      title: currentSection.pages[pageIndex - 1].title,
    };
  } else if (sectionIndex > 0) {
    const prevSection = docsNavigation[sectionIndex - 1];
    prevPage = {
      section: prevSection.slug,
      page: prevSection.pages[prevSection.pages.length - 1].slug,
      title: prevSection.pages[prevSection.pages.length - 1].title,
    };
  }
  
  if (currentSection && pageIndex < currentSection.pages.length - 1) {
    nextPage = {
      section: section,
      page: currentSection.pages[pageIndex + 1].slug,
      title: currentSection.pages[pageIndex + 1].title,
    };
  } else if (sectionIndex < docsNavigation.length - 1) {
    const nextSection = docsNavigation[sectionIndex + 1];
    nextPage = {
      section: nextSection.slug,
      page: nextSection.pages[0].slug,
      title: nextSection.pages[0].title,
    };
  }

  return (
    <main className="flex-1 lg:ml-64 xl:mr-56 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ArrowRight className="h-3 w-3" />
          <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-foreground">{content.title}</span>
        </motion.nav>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Content sections */}
        <div className="space-y-12">
          {content.sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {section.title}
              </h2>
              
              <div className="prose prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, i) => {
                  // Handle markdown-style tables
                  if (paragraph.includes('|')) {
                    const lines = paragraph.split('\n').filter(line => line.trim());
                    if (lines.length >= 2) {
                      const headers = lines[0].split('|').filter(cell => cell.trim());
                      const rows = lines.slice(2).map(line => 
                        line.split('|').filter(cell => cell.trim())
                      );
                      
                      return (
                        <div key={i} className="overflow-x-auto my-6">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-border">
                                {headers.map((header, j) => (
                                  <th key={j} className="text-left py-3 px-4 font-semibold text-foreground">
                                    {header.trim()}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row, j) => (
                                <tr key={j} className="border-b border-border/50">
                                  {row.map((cell, k) => (
                                    <td key={k} className="py-3 px-4 text-muted-foreground">
                                      {cell.trim()}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                  }
                  
                  // Handle lists
                  if (paragraph.startsWith('- ') || paragraph.match(/^\d\. /)) {
                    const items = paragraph.split('\n');
                    const isOrdered = paragraph.match(/^\d\. /);
                    const ListTag = isOrdered ? 'ol' : 'ul';
                    
                    return (
                      <ListTag key={i} className={`my-4 space-y-2 ${isOrdered ? 'list-decimal' : 'list-disc'} list-inside`}>
                        {items.map((item, j) => (
                          <li key={j} className="text-muted-foreground">
                            <span dangerouslySetInnerHTML={{ 
                              __html: item.replace(/^[-\d.]\s*/, '')
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                            }} />
                          </li>
                        ))}
                      </ListTag>
                    );
                  }
                  
                  // Regular paragraphs with bold text support
                  return (
                    <p 
                      key={i} 
                      className="text-muted-foreground mb-4 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">$1</code>')
                      }}
                    />
                  );
                })}
              </div>

              {section.code && (
                <div className="mt-6">
                  <CodeBlock 
                    code={section.code.content} 
                    language={section.code.language} 
                    title={section.code.title} 
                  />
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Footer navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center justify-between border-t border-border pt-8"
        >
          {prevPage ? (
            <Link
              to={`/docs/${prevPage.section}/${prevPage.page}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>{prevPage.title}</span>
            </Link>
          ) : (
            <div />
          )}
          
          {nextPage ? (
            <Link
              to={`/docs/${nextPage.section}/${nextPage.page}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{nextPage.title}</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default DocContent;
