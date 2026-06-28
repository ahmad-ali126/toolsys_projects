import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Star,
  CheckCircle,
  Users,
  Upload,
  Settings,
  Download,
} from "lucide-react";
import { categories } from "@/lib/config/categories";
import { tools, popularTools as popularSlugs } from "@/lib/config/tools";
import { getLatestPosts } from "@/lib/config/blog";
import { siteConfig } from "@/lib/config/seo";
import { ToolCard } from "@/components/ui/ToolCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { BlogCard } from "@/components/ui/BlogCard";
import { Newsletter } from "@/components/ui/Newsletter";
import { CTASection } from "@/components/ui/CTASection";
import { FAQSection } from "@/components/ui/FAQSection";
import {
  StructuredData,
  buildWebsiteSchema,
} from "@/components/ui/StructuredData";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Free Online Tools for Images, PDF, SEO & Finance`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: `${siteConfig.name} — Free Online Tools`,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
  },
};

const homeFAQs = [
  {
    question: "Are all tools on ToolsHub free?",
    answer:
      "Yes! Every tool on ToolsHub is 100% free with no sign-up, no watermarks, and no hidden fees.",
  },
  {
    question: "Do you store my files or data?",
    answer:
      "No. Most tools process data entirely in your browser. For tools requiring server processing, files are deleted immediately after processing.",
  },
  {
    question: "How many tools are available?",
    answer:
      "We currently offer 30+ tools across Image, Finance, PDF, SEO, Developer, and Utility categories. New tools are added regularly.",
  },
  {
    question: "Do the tools work on mobile?",
    answer:
      "Yes, all tools are fully responsive and optimized for mobile, tablet, and desktop devices.",
  },
  {
    question: "Can I suggest a new tool?",
    answer:
      "Absolutely! Contact us via the contact page or email us at hello@toolshub.app with your tool suggestion.",
  },
  {
    question: "What makes ToolsHub different from other tool websites?",
    answer:
      "ToolsHub focuses on speed, privacy, and quality. Tools are browser-based (no uploads), load fast, and are designed with a clean, ad-free experience.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Most tools run entirely in your browser. No waiting for uploads or server processing.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description:
      "Your files and data never leave your device. We don't store, track, or sell your information.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "All tools are fully responsive and work perfectly on any device — mobile, tablet, or desktop.",
  },
  {
    icon: Star,
    title: "No Sign-Up",
    description:
      "No accounts, no passwords, no credit cards. Just open a tool and get started instantly.",
  },
  {
    icon: CheckCircle,
    title: "No Watermarks",
    description:
      "Download clean files without watermarks, branding, or quality limits.",
  },
  {
    icon: Users,
    title: "Always Free",
    description:
      "ToolsHub is free forever. Our tools are funded by non-intrusive advertising.",
  },
];

const howItWorks = [
  {
    icon: Upload,
    step: 1,
    title: "Choose Your Tool",
    description: "Browse our 6 categories and select the tool you need.",
  },
  {
    icon: Settings,
    step: 2,
    title: "Set Your Options",
    description: "Configure the tool settings to match your specific needs.",
  },
  {
    icon: Download,
    step: 3,
    title: "Get Your Result",
    description: "Download or copy your result instantly. No waiting.",
  },
];

export default function HomePage() {
  const popular = popularSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);
  const latestPosts = getLatestPosts(3);
  const featuredTools = tools.slice(0, 6);

  return (
    <>
      <StructuredData data={buildWebsiteSchema(siteConfig.url, siteConfig.name)} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-gradient pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            30+ Free Online Tools
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Free Online Tools for{" "}
            <span className="text-gradient-blue">Everyone</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Image compressors, finance calculators, PDF tools, SEO generators,
            developer utilities — all free, fast, and private. No sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Explore All Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-muted border border-border font-semibold rounded-xl hover:bg-accent transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "30+", label: "Free Tools" },
              { value: "100%", label: "Browser-Based" },
              { value: "0", label: "Sign-up Required" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gradient-blue">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Tools ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" aria-labelledby="popular-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 id="popular-heading" className="text-3xl font-bold mb-3">
              Most Popular Tools
            </h2>
            <p className="text-muted-foreground">
              The tools our users love most — free, fast, and no sign-up.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((tool) => (
              <ToolCard key={tool!.slug} tool={tool!} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────── */}
      <section
        id="categories"
        className="py-16 md:py-20 bg-muted/30"
        aria-labelledby="categories-heading"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 id="categories-heading" className="text-3xl font-bold mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Six powerful categories. One free platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Tools ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" aria-labelledby="featured-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 id="featured-heading" className="text-3xl font-bold mb-2">
                Featured Tools
              </h2>
              <p className="text-muted-foreground">Handpicked tools for every use case.</p>
            </div>
            <Link
              href="/#categories"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/30" aria-labelledby="benefits-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 id="benefits-heading" className="text-3xl font-bold mb-3">
              Why Choose ToolsHub?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe great tools should be free, fast, and private. Here&apos;s what makes ToolsHub different.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex gap-4 p-6 rounded-2xl border border-border bg-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" aria-labelledby="how-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 id="how-heading" className="text-3xl font-bold mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">Three simple steps to get your result.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center relative">
                  {i < howItWorks.length - 1 && (
                    <div
                      className="hidden md:block absolute top-6 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-primary/30 to-transparent"
                      aria-hidden="true"
                    />
                  )}
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20 mb-4 relative">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <FAQSection faqs={homeFAQs} title="Frequently Asked Questions" />
        </div>
      </section>

      {/* ── Latest Articles ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20" aria-labelledby="articles-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 id="articles-heading" className="text-3xl font-bold mb-2">
                Latest Articles
              </h2>
              <p className="text-muted-foreground">
                Tips, guides, and tutorials from our team.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <Newsletter />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <CTASection />
        </div>
      </section>
    </>
  );
}
