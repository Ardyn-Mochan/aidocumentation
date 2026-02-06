import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Github, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchDialog from "./SearchDialog";
import VersionSelector from "./VersionSelector";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isDocsPage = location.pathname.startsWith("/docs");

  const navItems = [
    { href: "/docs/getting-started/introduction", label: "Documentation", active: isDocsPage },
    { href: "/docs/api-reference/authentication", label: "API Reference", active: false },
    { href: "#", label: "Examples", active: false },
    { href: "#", label: "Changelog", active: false },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border glass"
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-glow-secondary">
                <span className="text-sm font-bold text-primary-foreground">AI</span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                AI Cloud <span className="hidden sm:inline text-muted-foreground font-normal">Docs</span>
              </span>
            </Link>

            {/* Version selector */}
            <div className="hidden md:block">
              <VersionSelector />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    item.active
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <Button variant="default" size="sm" className="hidden md:flex">
              Get API Key
            </Button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
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
            className="lg:hidden border-t border-border bg-background"
          >
            <nav className="flex flex-col p-4 gap-1">
              <div className="mb-3">
                <VersionSelector />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm rounded-lg transition-colors",
                    item.active
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-border my-2" />
              <a href="#" className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground rounded-lg hover:bg-secondary">
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

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;
