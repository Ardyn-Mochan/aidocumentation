import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Book, 
  Zap, 
  Code2, 
  Blocks, 
  Shield, 
  Settings,
  Rocket,
  Database,
  Cpu
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  items?: { title: string; href: string }[];
  href?: string;
}

const navigation: NavItem[] = [
  {
    title: "Getting Started",
    icon: <Rocket className="h-4 w-4" />,
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Quick Start", href: "#quickstart" },
      { title: "Installation", href: "#installation" },
    ],
  },
  {
    title: "Core Concepts",
    icon: <Book className="h-4 w-4" />,
    items: [
      { title: "Architecture", href: "#architecture" },
      { title: "AI Models", href: "#models" },
      { title: "Inference", href: "#inference" },
    ],
  },
  {
    title: "API Reference",
    icon: <Code2 className="h-4 w-4" />,
    items: [
      { title: "Authentication", href: "#auth" },
      { title: "Completions", href: "#completions" },
      { title: "Embeddings", href: "#embeddings" },
      { title: "Fine-tuning", href: "#finetuning" },
    ],
  },
  {
    title: "Data & Storage",
    icon: <Database className="h-4 w-4" />,
    items: [
      { title: "Datasets", href: "#datasets" },
      { title: "Vector Store", href: "#vectors" },
      { title: "File Management", href: "#files" },
    ],
  },
  {
    title: "Compute",
    icon: <Cpu className="h-4 w-4" />,
    items: [
      { title: "GPU Instances", href: "#gpu" },
      { title: "Scaling", href: "#scaling" },
      { title: "Batch Processing", href: "#batch" },
    ],
  },
  {
    title: "Integrations",
    icon: <Blocks className="h-4 w-4" />,
    items: [
      { title: "SDKs", href: "#sdks" },
      { title: "Webhooks", href: "#webhooks" },
      { title: "Third-party", href: "#thirdparty" },
    ],
  },
  {
    title: "Security",
    icon: <Shield className="h-4 w-4" />,
    items: [
      { title: "API Keys", href: "#apikeys" },
      { title: "Permissions", href: "#permissions" },
      { title: "Compliance", href: "#compliance" },
    ],
  },
  {
    title: "Configuration",
    icon: <Settings className="h-4 w-4" />,
    items: [
      { title: "Environment", href: "#environment" },
      { title: "Rate Limits", href: "#ratelimits" },
      { title: "Billing", href: "#billing" },
    ],
  },
];

const DocsSidebar = () => {
  const [expanded, setExpanded] = useState<string[]>(["Getting Started", "API Reference"]);

  const toggleExpand = (title: string) => {
    setExpanded((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <div key={item.title}>
            <button
              onClick={() => toggleExpand(item.title)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <span className="flex items-center gap-3">
                <span className="text-primary">{item.icon}</span>
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: expanded.includes(item.title) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </motion.span>
            </button>

            <AnimatePresence>
              {expanded.includes(item.title) && item.items && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-4 border-l border-border pl-3 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DocsSidebar;
