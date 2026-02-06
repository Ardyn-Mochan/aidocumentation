import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: "Docs", href: "/docs/getting-started/introduction" },
    { label: "Create", href: "/create" },
    { label: "Library", href: "/library" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AI Docs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link 
                key={link.label}
                to={link.href} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;