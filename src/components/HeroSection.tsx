import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import FeatureCard from "./FeatureCard";
import { Zap, Code2, Shield, Blocks, BookOpen, Rocket } from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      icon: Rocket,
      title: "Quick Start",
      description: "Get up and running in minutes with our comprehensive getting started guide.",
    },
    {
      icon: Code2,
      title: "API Reference",
      description: "Explore our complete API documentation with examples in multiple languages.",
    },
    {
      icon: Zap,
      title: "AI Models",
      description: "Learn about our state-of-the-art AI models and their capabilities.",
    },
    {
      icon: Blocks,
      title: "Integrations",
      description: "Connect AI Cloud with your favorite tools and platforms.",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Best practices for securing your AI applications and data.",
    },
    {
      icon: BookOpen,
      title: "Tutorials",
      description: "Step-by-step tutorials for common use cases and advanced patterns.",
    },
  ];

  return (
    <div className="ml-64 pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-4xl mx-auto px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              New: AI Cloud 4.0 is now available
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-foreground mb-6 leading-tight"
          >
            Build with the power of{" "}
            <span className="gradient-text">AI Cloud</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance"
          >
            Comprehensive documentation for AI Cloud's APIs, SDKs, and tools.
            Everything you need to build intelligent applications.
          </motion.p>

          <SearchBar placeholder="Search documentation... Try 'authentication' or 'embeddings'" />
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-semibold text-foreground mb-8"
        >
          Explore the documentation
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * i}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
