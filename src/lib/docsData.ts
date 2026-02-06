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

const gettingStartedContent: Record<string, DocPageContent> = {
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
        content: "Install our official SDK using your preferred package manager:",
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
        content: "Here's a simple example to get you started:",
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
        content: "Our Node.js SDK supports Node.js 18 and above.",
        code: {
          language: "bash",
          title: "Terminal",
          content: "npm install @ai-cloud/sdk",
        },
      },
      {
        id: "python-installation",
        title: "Python Installation",
        content: "Our Python SDK supports Python 3.8 and above.",
        code: {
          language: "bash",
          title: "Terminal",
          content: "pip install ai-cloud",
        },
      },
      {
        id: "environment-setup",
        title: "Environment Setup",
        content: "Store your API key as an environment variable for security:",
        code: {
          language: "bash",
          title: ".env",
          content: "AI_CLOUD_API_KEY=your-api-key-here",
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
};

const apiReferenceContent: Record<string, DocPageContent> = {
  authentication: {
    title: "Authentication",
    description: "Learn how to authenticate with the AI Cloud API.",
    sections: [
      {
        id: "api-keys",
        title: "API Keys",
        content: "All API requests require authentication using an API key. Include your key in the Authorization header:",
        code: {
          language: "bash",
          title: "Request Header",
          content: "Authorization: Bearer YOUR_API_KEY",
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
        content: "The Chat Completions API generates responses based on a conversation history. It's the core API for building chatbots, assistants, and content generation tools.",
      },
      {
        id: "basic-usage",
        title: "Basic Usage",
        content: "Here's a simple example:",
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
        content: "For real-time responses, use streaming:",
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
        content: "Create embeddings for text:",
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
    ],
  },
  finetuning: {
    title: "Fine-tuning",
    description: "Train custom models on your own data.",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: "Fine-tuning allows you to customize AI Cloud models for your specific use case by training them on your own examples.",
      },
      {
        id: "prepare-data",
        title: "Prepare Training Data",
        content: "Format your data as JSONL with messages:",
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
        content: "Start a fine-tuning job:",
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
        content: "Create a new assistant with specific capabilities:",
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
};

const coreConceptsContent: Record<string, DocPageContent> = {
  architecture: {
    title: "System Architecture",
    description: "Understanding AI Cloud's architecture and how components work together.",
    sections: [
      {
        id: "overview",
        title: "Architecture Overview",
        content: `AI Cloud is built on a distributed microservices architecture designed for scale, reliability, and performance.

**Key Components:**
- **API Gateway**: Handles authentication, rate limiting, and request routing
- **Inference Engine**: Optimized model serving with automatic batching
- **Model Registry**: Version-controlled model storage and deployment
- **Data Pipeline**: Secure data processing and storage
- **Monitoring Stack**: Real-time observability and alerting`,
      },
      {
        id: "regions",
        title: "Global Regions",
        content: `AI Cloud operates in multiple regions for low-latency access:

| Region | Location | Status |
|--------|----------|--------|
| us-east-1 | Virginia, USA | Active |
| us-west-2 | Oregon, USA | Active |
| eu-west-1 | Ireland | Active |
| eu-central-1 | Frankfurt | Active |
| ap-northeast-1 | Tokyo | Active |`,
      },
    ],
  },
  models: {
    title: "AI Models",
    description: "Explore the AI models available on AI Cloud.",
    sections: [
      {
        id: "model-overview",
        title: "Available Models",
        content: `AI Cloud offers a range of models optimized for different use cases:

**Language Models:**
- **ai-cloud-4**: Our most capable model for complex reasoning, coding, and creative tasks
- **ai-cloud-4-mini**: Fast and cost-effective for simpler tasks
- **ai-cloud-4-turbo**: Balanced performance and speed

**Vision Models:**
- **ai-cloud-vision**: Multimodal understanding of images and text

**Embedding Models:**
- **ai-cloud-embed**: High-quality 1536-dimension embeddings`,
      },
      {
        id: "model-comparison",
        title: "Model Comparison",
        content: `| Model | Context | Speed | Best For |
|-------|---------|-------|----------|
| ai-cloud-4 | 128K | Medium | Complex tasks |
| ai-cloud-4-mini | 32K | Fast | Simple tasks |
| ai-cloud-4-turbo | 64K | Fast | Balanced |
| ai-cloud-vision | 64K | Medium | Images |
| ai-cloud-embed | N/A | Fast | Search |`,
      },
    ],
  },
  inference: {
    title: "Running Inference",
    description: "Learn how inference works on AI Cloud.",
    sections: [
      {
        id: "inference-basics",
        title: "Inference Basics",
        content: `Inference is the process of generating outputs from AI models. AI Cloud optimizes this process for:

- **Low Latency**: Responses start in under 200ms for most requests
- **High Throughput**: Handle thousands of concurrent requests
- **Reliability**: 99.9% uptime SLA for enterprise customers`,
      },
    ],
  },
  tokens: {
    title: "Tokens & Pricing",
    description: "Understanding tokens and how pricing works.",
    sections: [
      {
        id: "what-are-tokens",
        title: "What are Tokens?",
        content: `Tokens are the basic units of text that AI models process.

**Token Examples:**
- "Hello" = 1 token
- "Hello, world!" = 3 tokens
- A typical paragraph = 50-100 tokens
- A page of text = ~500 tokens`,
      },
      {
        id: "pricing",
        title: "Pricing",
        content: `AI Cloud uses simple, transparent pricing based on token usage:

| Model | Input (per 1M) | Output (per 1M) |
|-------|----------------|-----------------|
| ai-cloud-4 | $10.00 | $30.00 |
| ai-cloud-4-mini | $0.50 | $1.50 |
| ai-cloud-embed | $0.10 | N/A |`,
      },
    ],
  },
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

export const getDocContent = (section: string, page: string): DocPageContent => {
  const allContent: Record<string, Record<string, DocPageContent>> = {
    "getting-started": gettingStartedContent,
    "api-reference": apiReferenceContent,
    "core-concepts": coreConceptsContent,
  };

  const sectionContent = allContent[section];
  if (!sectionContent) {
    return getDefaultContent(section, page);
  }

  const pageContent = sectionContent[page];
  if (!pageContent) {
    return getDefaultContent(section, page);
  }

  return pageContent;
};
