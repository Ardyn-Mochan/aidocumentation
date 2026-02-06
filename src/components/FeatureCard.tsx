import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, href = "#", delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={href}
        className="group relative block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:glow-primary-sm h-full"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-glow-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Icon className="h-6 w-6" />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;
