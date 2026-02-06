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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Link
        to={href}
        className="group block rounded-lg border border-border bg-background p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm h-full"
      >
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-foreground">
          <Icon className="h-4 w-4" />
        </div>

        <h3 className="mb-1.5 text-sm font-medium text-foreground">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="mt-3 flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Learn more
          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;