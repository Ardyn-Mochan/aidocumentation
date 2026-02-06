import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FeatureCard from "./FeatureCard";
import QuickLinkCard from "./QuickLinkCard";
import { 
  Zap, Code2, Shield, Blocks, Rocket, ArrowRight, Sparkles, 
  FileText, Settings, Database, BookOpen 
} from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const quickLinks = [
    { title: "Getting started with AI Docs", href: "/docs/getting-started/introduction", icon: Rocket },
    { title: "Generate documentation", href: "/create", icon: Sparkles },
    { title: "API Reference", href: "/docs/api-reference/authentication", icon: Code2 },
    { title: "View your library", href: "/library", icon: BookOpen },
    { title: "Configuration guide", href: "/docs/getting-started/quickstart", icon: Settings },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI Documentation Generator",
      description: "Enter any topic and generate comprehensive, multi-page documentation instantly.",
      href: "/create",
    },
    {
      icon: Rocket,
      title: "Quick Start",
      description: "Get up and running in minutes with our getting started guide.",
      href: "/docs/getting-started/quickstart",
    },
    {
      icon: Code2,
      title: "API Reference",
      description: "Complete API documentation with examples in multiple languages.",
      href: "/docs/api-reference/authentication",
    },
    {
      icon: Zap,
      title: "AI Models",
      description: "Learn about state-of-the-art AI models and their capabilities.",
      href: "/docs/core-concepts/models",
    },
    {
      icon: Blocks,
      title: "Integrations",
      description: "Connect with your favorite tools and platforms.",
      href: "/docs/integrations/sdks",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Best practices for securing your AI applications.",
      href: "/docs/security/apikeys",
    },
  ];

  return (
    <div className="pt-14 flex-1">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-3"
          >
            Last updated February 6, 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight"
          >
            AI Docs Documentation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed"
          >
            AI Docs is an AI-powered documentation platform. Generate comprehensive documentation for any topic, 
            or explore our guides to build intelligent applications.
          </motion.p>

          {/* Quick references */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick references</h2>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <QuickLinkCard 
                  key={link.title} 
                  title={link.title} 
                  href={link.href}
                  icon={link.icon}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-semibold text-foreground mb-6"
        >
          Explore the documentation
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              delay={0.05 * i}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-foreground mb-3"
          >
            Generate documentation for any topic
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-muted-foreground mb-6 max-w-xl"
          >
            Enter any technology, framework, or concept and our AI will create comprehensive, 
            multi-page documentation with examples and tutorials.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/create">
              <Button size="default" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Documentation
              </Button>
            </Link>
            <Link to="/library">
              <Button size="default" variant="outline">
                View Library
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;