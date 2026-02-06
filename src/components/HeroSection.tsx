import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FeatureCard from "./FeatureCard";
import { Zap, Code2, Shield, Blocks, BookOpen, Rocket, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const features = [
    {
      icon: Rocket,
      title: "Quick Start",
      description: "Get up and running in minutes with our comprehensive getting started guide.",
      href: "/docs/getting-started/quickstart",
    },
    {
      icon: Code2,
      title: "API Reference",
      description: "Explore our complete API documentation with examples in multiple languages.",
      href: "/docs/api-reference/authentication",
    },
    {
      icon: Zap,
      title: "AI Models",
      description: "Learn about our state-of-the-art AI models and their capabilities.",
      href: "/docs/core-concepts/models",
    },
    {
      icon: Blocks,
      title: "Integrations",
      description: "Connect AI Cloud with your favorite tools and platforms.",
      href: "/docs/integrations/sdks",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Best practices for securing your AI applications and data.",
      href: "/docs/security/apikeys",
    },
    {
      icon: BookOpen,
      title: "Tutorials",
      description: "Step-by-step tutorials for common use cases and advanced patterns.",
      href: "/docs/getting-started/concepts",
    },
  ];

  return (
    <div className="pt-16 flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Build with the power of{" "}
            <span className="gradient-text">AI Cloud</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance"
          >
            Comprehensive documentation for AI Cloud's APIs, SDKs, and tools.
            Everything you need to build intelligent applications.
          </motion.p>

          <SearchBar placeholder="Search documentation... Try 'authentication' or 'embeddings'" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/docs/getting-started/introduction">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/docs/api-reference/authentication">
              <Button size="lg" variant="outline" className="gap-2">
                API Reference
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-semibold text-foreground mb-8"
        >
          Explore the documentation
        </motion.h2>

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              delay={0.1 * i}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground mb-4"
          >
            Ready to start building?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Get your API key and start building with AI Cloud today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="gap-2">
              Get API Key
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
