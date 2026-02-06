import { Rocket, Book, Code2, Database, Cpu, Blocks, Shield, Settings, LucideIcon } from "lucide-react";

export interface DocPage {
  title: string;
  slug: string;
  description?: string;
}

export interface DocSection {
  title: string;
  slug: string;
  icon: LucideIcon;
  pages: DocPage[];
}

export const docsNavigation: DocSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    icon: Rocket,
    pages: [
      { title: "Introduction", slug: "introduction", description: "Welcome to AI Cloud" },
      { title: "Quick Start", slug: "quickstart", description: "Get started in 5 minutes" },
      { title: "Installation", slug: "installation", description: "Install the SDK" },
      { title: "Concepts", slug: "concepts", description: "Core concepts and terminology" },
    ],
  },
  {
    title: "Core Concepts",
    slug: "core-concepts",
    icon: Book,
    pages: [
      { title: "Architecture", slug: "architecture", description: "System architecture overview" },
      { title: "AI Models", slug: "models", description: "Available AI models" },
      { title: "Inference", slug: "inference", description: "Running inference" },
      { title: "Tokens & Pricing", slug: "tokens", description: "Understanding tokens" },
    ],
  },
  {
    title: "API Reference",
    slug: "api-reference",
    icon: Code2,
    pages: [
      { title: "Authentication", slug: "authentication", description: "API authentication" },
      { title: "Chat Completions", slug: "completions", description: "Generate text responses" },
      { title: "Embeddings", slug: "embeddings", description: "Generate embeddings" },
      { title: "Fine-tuning", slug: "finetuning", description: "Custom model training" },
      { title: "Assistants", slug: "assistants", description: "AI assistants API" },
    ],
  },
  {
    title: "Data & Storage",
    slug: "data-storage",
    icon: Database,
    pages: [
      { title: "Datasets", slug: "datasets", description: "Manage training data" },
      { title: "Vector Store", slug: "vectors", description: "Vector database" },
      { title: "File Management", slug: "files", description: "Upload and manage files" },
    ],
  },
  {
    title: "Compute",
    slug: "compute",
    icon: Cpu,
    pages: [
      { title: "GPU Instances", slug: "gpu", description: "GPU compute resources" },
      { title: "Scaling", slug: "scaling", description: "Auto-scaling configuration" },
      { title: "Batch Processing", slug: "batch", description: "Batch inference jobs" },
    ],
  },
  {
    title: "Integrations",
    slug: "integrations",
    icon: Blocks,
    pages: [
      { title: "SDKs", slug: "sdks", description: "Official SDKs" },
      { title: "Webhooks", slug: "webhooks", description: "Event webhooks" },
      { title: "Third-party", slug: "thirdparty", description: "Third-party integrations" },
    ],
  },
  {
    title: "Security",
    slug: "security",
    icon: Shield,
    pages: [
      { title: "API Keys", slug: "apikeys", description: "Manage API keys" },
      { title: "Permissions", slug: "permissions", description: "Access control" },
      { title: "Compliance", slug: "compliance", description: "Security compliance" },
    ],
  },
  {
    title: "Configuration",
    slug: "configuration",
    icon: Settings,
    pages: [
      { title: "Environment", slug: "environment", description: "Environment variables" },
      { title: "Rate Limits", slug: "ratelimits", description: "API rate limits" },
      { title: "Billing", slug: "billing", description: "Billing and usage" },
    ],
  },
];

export const getDocContent = (section: string, page: string) => {
  const contents: Record<string, Record<string, DocPageContent>> = {
    "getting-started": {
      introduction: {
        title: "Introduction to AI Cloud",
        description: "Welcome to AI Cloud — the most powerful platform for building AI-powered applications.",
        sections: [
          {
            id: "what-is-ai-cloud",
            title: "What is AI Cloud?",
            content: `AI Cloud is a comprehensive platform that provides developers with access to state-of-the-art AI models, scalable compute infrastructure, and powerful APIs to build intelligent applications.

Our platform offers:
- **Advanced AI Models**: Access to cutting-edge language models, vision models, and multimodal systems
- **Scalable Infrastructure**: Auto-scaling compute resources that grow with your needs
- **Developer-First APIs**: RESTful APIs with SDKs for all major programming languages
- **Enterprise Security**: SOC 2 Type II certified with end-to-end encryption`,
          },
          {
            id: "why-ai-cloud",
            title: "Why Choose AI Cloud?",
            content: `AI Cloud stands out from other platforms with:

1. **Unmatched Performance**: Our optimized inference engines deliver responses up to 3x faster than competitors
2. **Flexible Pricing**: Pay only for what you use with no hidden fees or minimum commitments
3. **Global Infrastructure**: Deploy your AI workloads across 12 regions worldwide
4. **24/7 Support**: Enterprise customers receive round-the-clock support from our AI experts`,
          },
          {
            id: "getting-help",
            title: "Getting Help",
            content: `Need assistance? We're here to help:

- **Documentation**: You're in the right place! Browse our comprehensive docs
- **Community Discord**: Join thousands of developers in our Discord server
- **GitHub Issues**: Report bugs and request features on GitHub
- **Enterprise Support**: Contact our enterprise team for dedicated assistance`,
          },
        ],
      },
      quickstart: {
        title: "Quick Start Guide",
        description: "Get up and running with AI Cloud in under 5 minutes.",
        sections: [
          {
            id: "prerequisites",
            title: "Prerequisites",
            content: `Before you begin, make sure you have:
- Node.js 18+ or Python 3.8+
- An AI Cloud account (sign up at cloud.ai)
- Your API key from the dashboard`,
          },
          {
            id: "install-sdk",
            title: "Install the SDK",
            content: `Install our official SDK using your preferred package manager:`,
            code: {
              language: "bash",
              title: "Terminal",
              content: `# Using npm
npm install @ai-cloud/sdk

# Using yarn
yarn add @ai-cloud/sdk

# Using pnpm
pnpm add @ai-cloud/sdk`,
            },
          },
          {
            id: "first-request",
            title: "Make Your First Request",
            content: `Here's a simple example to get you started:`,
            code: {
              language: "typescript",
              title: "index.ts",
              content: `import { AICloud } from '@ai-cloud/sdk';

const client = new AICloud({
  apiKey: process.env.AI_CLOUD_API_KEY,
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'ai-cloud-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello! What can you help me with?' }
    ],
  });

  console.log(response.choices[0].message.content);
}

main();`,
            },
          },
        ],
      },
      installation: {
        title: "Installation",
        description: "Install the AI Cloud SDK in your project.",
        sections: [
          {
            id: "node-installation",
            title: "Node.js Installation",
            content: `Our Node.js SDK supports Node.js 18 and above.`,
            code: {
              language: "bash",
              title: "Terminal",
              content: `npm install @ai-cloud/sdk`,
            },
          },
          {
            id: "python-installation",
            title: "Python Installation",
            content: `Our Python SDK supports Python 3.8 and above.`,
            code: {
              language: "bash",
              title: "Terminal",
              content: `pip install ai-cloud`,
            },
          },
          {
            id: "environment-setup",
            title: "Environment Setup",
            content: `Store your API key as an environment variable for security:`,
            code: {
              language: "bash",
              title: ".env",
              content: `AI_CLOUD_API_KEY=your-api-key-here`,
            },
          },
        ],
      },
      concepts: {
        title: "Core Concepts",
        description: "Understand the fundamental concepts of AI Cloud.",
        sections: [
          {
            id: "models",
            title: "Models",
            content: `AI Cloud provides access to various AI models optimized for different tasks:

- **ai-cloud-4**: Our flagship model for complex reasoning and generation
- **ai-cloud-4-mini**: Fast and efficient for simpler tasks
- **ai-cloud-vision**: Multimodal model for image understanding
- **ai-cloud-embed**: High-quality text embeddings`,
          },
          {
            id: "tokens",
            title: "Tokens",
            content: `Tokens are the basic units of text processing:

- 1 token ≈ 4 characters in English
- 1 token ≈ 0.75 words
- Pricing is based on input and output tokens`,
          },
          {
            id: "context-window",
            title: "Context Window",
            content: `The context window is the maximum amount of text a model can process:

| Model | Context Window |
|-------|---------------|
| ai-cloud-4 | 128K tokens |
| ai-cloud-4-mini | 32K tokens |
| ai-cloud-vision | 64K tokens |`,
          },
        ],
      },
    },
    "api-reference": {
      authentication: {
        title: "Authentication",
        description: "Learn how to authenticate with the AI Cloud API.",
        sections: [
          {
            id: "api-keys",
            title: "API Keys",
            content: `All API requests require authentication using an API key. Include your key in the Authorization header:`,
            code: {
              language: "bash",
              title: "Request Header",
              content: `Authorization: Bearer YOUR_API_KEY`,
            },
          },
          {
            id: "managing-keys",
            title: "Managing API Keys",
            content: `You can create and manage API keys from your dashboard:

1. Navigate to Settings → API Keys
2. Click "Create New Key"
3. Give your key a descriptive name
4. Set appropriate permissions
5. Store your key securely — it won't be shown again`,
          },
          {
            id: "key-permissions",
            title: "Key Permissions",
            content: `API keys can have different permission levels:

- **Read**: Access to list and retrieve resources
- **Write**: Create and update resources
- **Admin**: Full access including deletion and key management`,
          },
        ],
      },
      completions: {
        title: "Chat Completions",
        description: "Generate AI-powered text responses with the Chat Completions API.",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: `The Chat Completions API generates responses based on a conversation history. It's the core API for building chatbots, assistants, and content generation tools.`,
          },
          {
            id: "basic-usage",
            title: "Basic Usage",
            content: `Here's a simple example:`,
            code: {
              language: "typescript",
              title: "chat.ts",
              content: `const response = await client.chat.completions.create({
  model: 'ai-cloud-4',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain quantum computing in simple terms.' }
  ],
  max_tokens: 500,
  temperature: 0.7,
});`,
            },
          },
          {
            id: "streaming",
            title: "Streaming Responses",
            content: `For real-time responses, use streaming:`,
            code: {
              language: "typescript",
              title: "stream.ts",
              content: `const stream = await client.chat.completions.create({
  model: 'ai-cloud-4',
  messages: [{ role: 'user', content: 'Write a story' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`,
            },
          },
          {
            id: "parameters",
            title: "Parameters",
            content: `| Parameter | Type | Description |
|-----------|------|-------------|
| model | string | Model ID to use (required) |
| messages | array | Conversation messages (required) |
| max_tokens | number | Maximum response length |
| temperature | number | Randomness (0-2, default 1) |
| top_p | number | Nucleus sampling (0-1) |
| stream | boolean | Enable streaming |`,
          },
        ],
      },
      embeddings: {
        title: "Embeddings",
        description: "Generate vector embeddings for semantic search and similarity.",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: `Embeddings convert text into numerical vectors that capture semantic meaning. Use them for:

- Semantic search
- Similarity matching
- Clustering
- Recommendations`,
          },
          {
            id: "generate-embeddings",
            title: "Generate Embeddings",
            content: `Create embeddings for text:`,
            code: {
              language: "typescript",
              title: "embeddings.ts",
              content: `const response = await client.embeddings.create({
  model: 'ai-cloud-embed',
  input: 'The quick brown fox jumps over the lazy dog',
});

console.log(response.data[0].embedding);
// [0.0023, -0.0145, 0.0067, ...]`,
            },
          },
          {
            id: "batch-embeddings",
            title: "Batch Embeddings",
            content: `Generate embeddings for multiple texts at once:`,
            code: {
              language: "typescript",
              title: "batch.ts",
              content: `const response = await client.embeddings.create({
  model: 'ai-cloud-embed',
  input: [
    'First document text',
    'Second document text',
    'Third document text',
  ],
});

response.data.forEach((item, i) => {
  console.log(\`Document \${i}: \${item.embedding.length} dimensions\`);
});`,
            },
          },
        ],
      },
      finetuning: {
        title: "Fine-tuning",
        description: "Train custom models on your own data.",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: `Fine-tuning allows you to customize AI Cloud models for your specific use case by training them on your own examples.`,
          },
          {
            id: "prepare-data",
            title: "Prepare Training Data",
            content: `Format your data as JSONL with messages:`,
            code: {
              language: "json",
              title: "training.jsonl",
              content: `{"messages": [{"role": "user", "content": "Hello"}, {"role": "assistant", "content": "Hi there!"}]}
{"messages": [{"role": "user", "content": "What's your name?"}, {"role": "assistant", "content": "I'm your custom assistant."}]}`,
            },
          },
          {
            id: "create-job",
            title: "Create Fine-tuning Job",
            content: `Start a fine-tuning job:`,
            code: {
              language: "typescript",
              title: "finetune.ts",
              content: `const job = await client.fineTuning.jobs.create({
  training_file: 'file-abc123',
  model: 'ai-cloud-4-mini',
  hyperparameters: {
    n_epochs: 3,
  },
});

console.log(job.id); // ft-xyz789`,
            },
          },
        ],
      },
      assistants: {
        title: "Assistants API",
        description: "Build stateful AI assistants with tools and file access.",
        sections: [
          {
            id: "overview",
            title: "Overview",
            content: `The Assistants API helps you build AI assistants that can:

- Maintain conversation context
- Use tools (code interpreter, retrieval, functions)
- Access uploaded files
- Run multi-step workflows`,
          },
          {
            id: "create-assistant",
            title: "Create an Assistant",
            content: `Create a new assistant with specific capabilities:`,
            code: {
              language: "typescript",
              title: "assistant.ts",
              content: `const assistant = await client.assistants.create({
  name: 'Data Analyst',
  instructions: 'You are a data analyst. Analyze data and create visualizations.',
  model: 'ai-cloud-4',
  tools: [
    { type: 'code_interpreter' },
    { type: 'retrieval' },
  ],
});`,
            },
          },
        ],
      },
    },
  };

  const sectionContent = contents[section];
  if (!sectionContent) {
    return getDefaultContent(section, page);
  }

  const pageContent = sectionContent[page];
  if (!pageContent) {
    return getDefaultContent(section, page);
  }

  return pageContent;
};

const getDefaultContent = (section: string, page: string): DocPageContent => {
  const sectionData = docsNavigation.find(s => s.slug === section);
  const pageData = sectionData?.pages.find(p => p.slug === page);

  return {
    title: pageData?.title || "Documentation",
    description: pageData?.description || "Documentation content coming soon.",
    sections: [
      {
        id: "coming-soon",
        title: "Coming Soon",
        content: `This documentation page is currently being written. Check back soon for comprehensive content on ${pageData?.title || "this topic"}.

In the meantime, feel free to:
- Explore other sections of the documentation
- Ask our AI assistant for help
- Join our Discord community for support`,
      },
    ],
  };
};

export interface DocPageContent {
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    content: string;
    code?: {
      language: string;
      title: string;
      content: string;
    };
  }[];
}
