import { useState } from "react";
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
    <div className="group relative rounded-lg border border-border overflow-hidden">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">
            {language}
          </span>
        </div>
      )}

      {/* Code content */}
      <div className="relative bg-[#1a1a1a] dark:bg-[#0d0d0d]">
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
                  <span className="table-cell pr-4 text-right text-neutral-500 select-none text-xs w-8">
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
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md bg-neutral-700/50 text-neutral-400 opacity-0 transition-all hover:bg-neutral-600/50 hover:text-neutral-200 group-hover:opacity-100"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;