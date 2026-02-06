import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

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

  // Map language names
  const getLanguage = (lang: string) => {
    const langMap: Record<string, string> = {
      ts: "typescript",
      js: "javascript",
      py: "python",
      sh: "bash",
      shell: "bash",
      json: "json",
      jsx: "jsx",
      tsx: "tsx",
    };
    return langMap[lang.toLowerCase()] || lang.toLowerCase();
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
        <Highlight
          theme={themes.nightOwl}
          code={code.trim()}
          language={getLanguage(language) as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="overflow-x-auto p-4 text-sm font-mono"
              style={{ ...style, backgroundColor: "transparent", margin: 0 }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell pr-4 text-right text-muted-foreground/40 select-none text-xs">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>

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
