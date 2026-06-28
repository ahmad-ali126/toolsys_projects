import Link from "next/link";
import { Zap, X, Mail } from "lucide-react";
import { categories } from "@/lib/config/categories";
import { siteConfig } from "@/lib/config/seo";
import { tools } from "@/lib/config/tools";

const popularToolLinks = [
  "json-formatter",
  "password-generator",
  "image-compressor",
  "sip-calculator",
  "meta-tag-generator",
  "qr-code-generator",
];

export function Footer() {
  const popularTools = popularToolLinks
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl mb-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-gradient-blue">ToolsHub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="Follow on Twitter"
              >
                <X className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="View on GitHub"
              >
                <X className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@toolshub.app"
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="Send email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tool Categories */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Popular Tools</h3>
            <ul className="space-y-2.5">
              {popularTools.map((tool) => (
                <li key={tool!.slug}>
                  <Link
                    href={`/${tool!.category}/${tool!.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tool!.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Free online tools — no sign-up required.
          </p>
        </div>
      </div>
    </footer>
  );
}
