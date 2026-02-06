import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchDialog from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isDocsPage = location.pathname.startsWith("/docs");
  const isCreatePage = location.pathname === "/create";
  const isLibraryPage = location.pathname === "/library";
  const isGeneratedPage = location.pathname.startsWith("/generated");

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { href: "/docs/getting-started/introduction", label: "Docs", active: isDocsPage },
    { href: "/create", label: "Create", active: isCreatePage },
    { href: "/library", label: "Library", active: isLibraryPage || isGeneratedPage },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4 md:px-6 max-w-screen-2xl mx-auto">
          {/* Left side - Logo & Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground"
              >
                <path
                  d="M12 2L2 19.5h20L12 2z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-semibold text-foreground">
                AI Docs
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    item.active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 h-8 px-3 text-sm text-muted-foreground bg-secondary/80 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search Documentation</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
                ⌘K
              </kbd>
            </button>

            {/* Theme toggle */}
            <ThemeToggle />
            
            <Link to="/create" className="hidden md:block">
              <Button size="sm" className="h-8 text-sm">
                Create Docs
              </Button>
            </Link>

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
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm rounded-md transition-colors",
                    item.active
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-border my-2" />
              <Link to="/create" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Create Docs
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;