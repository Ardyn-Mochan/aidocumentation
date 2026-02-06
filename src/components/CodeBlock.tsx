import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock = ({ code, language = "typescript", title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {language}
          </span>
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="font-mono text-foreground">{code}</code>
        </pre>

        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </motion.button>
      </div>
    </div>
  );
};

export default CodeBlock;
