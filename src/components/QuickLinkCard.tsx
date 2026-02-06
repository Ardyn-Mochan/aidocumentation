import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight, FileText } from "lucide-react";

interface QuickLinkCardProps {
  icon?: LucideIcon;
  title: string;
  href?: string;
}

const QuickLinkCard = ({ icon: Icon = FileText, title, href = "#" }: QuickLinkCardProps) => {
  return (
    <Link
      to={href}
      className="group flex items-center justify-between py-3 px-4 rounded-lg border border-border bg-background hover:bg-secondary/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground group-hover:text-foreground">
          {title}
        </span>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
    </Link>
  );
};

export default QuickLinkCard;