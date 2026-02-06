import { motion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border glass"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-glow-secondary">
              <span className="text-sm font-bold text-primary-foreground">AI</span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              AI Cloud <span className="text-muted-foreground font-normal">Docs</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              API Reference
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Changelog
            </a>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          
          <Button variant="default" size="sm" className="hidden md:flex">
            Get API Key
          </Button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background"
        >
          <nav className="flex flex-col p-4 gap-2">
            <a href="#" className="px-3 py-2 text-sm text-foreground rounded-lg hover:bg-secondary">
              Documentation
            </a>
            <a href="#" className="px-3 py-2 text-sm text-muted-foreground rounded-lg hover:bg-secondary">
              API Reference
            </a>
            <a href="#" className="px-3 py-2 text-sm text-muted-foreground rounded-lg hover:bg-secondary">
              Examples
            </a>
            <a href="#" className="px-3 py-2 text-sm text-muted-foreground rounded-lg hover:bg-secondary">
              Changelog
            </a>
            <hr className="border-border my-2" />
            <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground rounded-lg hover:bg-secondary">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <Button variant="default" size="sm" className="mt-2">
              Get API Key
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
