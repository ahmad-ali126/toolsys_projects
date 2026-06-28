"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { categories } from "@/lib/config/categories";
import { tools } from "@/lib/config/tools";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchResults = searchQuery.length > 1
    ? tools
        .filter(
          (t) =>
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled
          ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "border-transparent bg-background/80 backdrop-blur"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl shrink-0"
            aria-label="ToolsHub Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="hidden sm:block text-gradient-blue">ToolsHub</span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent transition-colors"
              >
                <cat.icon className={cn("h-3.5 w-3.5", cat.color)} />
                <span>{cat.name.replace(" Tools", "")}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                aria-label="Search tools"
                aria-autocomplete="list"
                aria-controls="search-results"
              />
            </div>
            {isSearchOpen && searchResults.length > 0 && (
              <div
                id="search-results"
                role="listbox"
                className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-xl overflow-hidden z-50"
              >
                {searchResults.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.category}/${tool.slug}`}
                    role="option"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted text-sm transition-colors"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 shrink-0">
                      <Search className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-xs text-muted-foreground">{tool.categoryName}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Blog
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-border py-4 space-y-1"
          >
            {/* Mobile Search */}
            <div className="px-2 mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search tools..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label="Search tools mobile"
                />
              </div>
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <cat.icon className={cn("h-4 w-4", cat.color)} />
                {cat.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="/blog"
                className="flex w-full justify-center items-center py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
