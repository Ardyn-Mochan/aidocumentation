import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";
import { ArrowRight, Lightbulb, AlertTriangle } from "lucide-react";

const DocContent = () => {
  const exampleCode = `import { AICloud } from '@ai-cloud/sdk';

const client = new AICloud({
  apiKey: process.env.AI_CLOUD_API_KEY,
});

const response = await client.chat.completions.create({
  model: 'ai-cloud-4',
  messages: [
    { role: 'user', content: 'Hello, AI Cloud!' }
  ],
});

console.log(response.choices[0].message);`;

  return (
    <main className="ml-64 pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <a href="#" className="hover:text-foreground transition-colors">Docs</a>
          <ArrowRight className="h-3 w-3" />
          <a href="#" className="hover:text-foreground transition-colors">Getting Started</a>
          <ArrowRight className="h-3 w-3" />
          <span className="text-foreground">Quick Start</span>
        </motion.nav>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Quick Start Guide
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get up and running with AI Cloud in minutes. This guide will walk you through
            installation, authentication, and making your first API call.
          </p>
        </motion.div>

        {/* Content sections */}
        <div className="space-y-12">
          {/* Installation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4" id="installation">
              Installation
            </h2>
            <p className="text-muted-foreground mb-6">
              Install the AI Cloud SDK using your preferred package manager:
            </p>
            <CodeBlock
              code="npm install @ai-cloud/sdk"
              language="bash"
              title="Terminal"
            />
          </motion.section>

          {/* Authentication */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4" id="authentication">
              Authentication
            </h2>
            <p className="text-muted-foreground mb-6">
              Set your API key as an environment variable. You can generate an API key from
              the <a href="#" className="text-primary hover:underline">dashboard</a>.
            </p>

            {/* Info callout */}
            <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 mb-6">
              <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Pro tip</p>
                <p className="text-muted-foreground">
                  Store your API key in a <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">.env</code> file
                  and never commit it to version control.
                </p>
              </div>
            </div>

            <CodeBlock
              code="export AI_CLOUD_API_KEY=your-api-key-here"
              language="bash"
              title=".env"
            />
          </motion.section>

          {/* First API Call */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4" id="first-call">
              Your First API Call
            </h2>
            <p className="text-muted-foreground mb-6">
              Initialize the client and make a chat completion request:
            </p>
            <CodeBlock code={exampleCode} language="typescript" title="index.ts" />
          </motion.section>

          {/* Warning callout */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Rate Limits</p>
                <p className="text-muted-foreground">
                  Free tier accounts are limited to 100 requests per minute. Upgrade to a paid
                  plan for higher limits. See <a href="#" className="text-primary hover:underline">Rate Limits</a> for details.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Next steps */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Next Steps</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="#"
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-secondary/50"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Explore Models
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about available AI models and their capabilities
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-secondary/50"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    API Reference
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete API documentation with examples
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </motion.section>
        </div>

        {/* Footer navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center justify-between border-t border-border pt-8"
        >
          <a
            href="#"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            <span>Introduction</span>
          </a>
          <a
            href="#"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Installation</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </main>
  );
};

export default DocContent;
