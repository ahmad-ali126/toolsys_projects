import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, getAllToolSlugs, getToolBySlug } from "@/lib/config/tools";
import { getCategoryBySlug } from "@/lib/config/categories";
import { getLatestPosts } from "@/lib/config/blog";
import { siteConfig } from "@/lib/config/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FAQSection } from "@/components/ui/FAQSection";
import { RelatedTools } from "@/components/ui/RelatedTools";
import { CTASection } from "@/components/ui/CTASection";
import { BlogCard } from "@/components/ui/BlogCard";
import {
  StructuredData,
  buildToolSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/components/ui/StructuredData";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ category: string; tool: string }>;
}

export async function generateStaticParams() {
  return getAllToolSlugs().map(({ category, tool }) => ({ category, tool }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, tool: toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) return {};

  const title = `${tool.name} — Free Online ${tool.name} | ${siteConfig.name}`;
  const description = tool.description;
  const url = `${siteConfig.url}/${categorySlug}/${toolSlug}`;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function RenderIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] || LucideIcons.Wrench;
  return <IconComponent className={className} />;
}

export default async function ToolPage({ params }: Props) {
  const { category: categorySlug, tool: toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) notFound();

  const category = getCategoryBySlug(categorySlug);
  const latestPosts = getLatestPosts(2);

  const breadcrumbSchema = [
    { name: "Home", url: siteConfig.url },
    { name: tool.categoryName, url: `${siteConfig.url}/${categorySlug}` },
    { name: tool.name, url: `${siteConfig.url}/${categorySlug}/${toolSlug}` },
  ];

  return (
    <>
      <StructuredData
        data={buildToolSchema({
          name: tool.name,
          description: tool.description,
          url: `${siteConfig.url}/${categorySlug}/${toolSlug}`,
          category: tool.categoryName,
        })}
      />
      <StructuredData data={buildBreadcrumbSchema(breadcrumbSchema)} />
      <StructuredData data={buildFAQSchema(tool.faqs)} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb
            items={[
              { label: tool.categoryName, href: `/${categorySlug}` },
              { label: tool.name },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br",
                  tool.gradient
                )}
              >
                <RenderIcon name={tool.icon} className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  <span className={tool.color}>{tool.categoryName}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-6">{tool.description}</p>
            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {tool.benefits.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  <LucideIcons.CheckCircle className="h-3 w-3" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tool UI ──────────────────────────────────────────────────── */}
      <section className="py-12" aria-labelledby="tool-section-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 id="tool-section-heading" className="sr-only">
            {tool.name} Tool
          </h2>
          <ToolRenderer slug={toolSlug} tool={tool} />
        </div>
      </section>

      {/* ── How To Use ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-muted/30" aria-labelledby="howto-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 id="howto-heading" className="text-2xl font-bold mb-8 text-center">
            How to Use {tool.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tool.howTo.map((step) => (
              <div
                key={step.step}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16" aria-labelledby="features-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 id="features-heading" className="text-2xl font-bold mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tool.features.map((feature) => {
              return (
                <div
                  key={feature.title}
                  className="flex gap-4 p-5 rounded-2xl border border-border bg-card"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <RenderIcon name={feature.icon} className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <FAQSection faqs={tool.faqs} title={`${tool.name} FAQ`} />
        </div>
      </section>

      {/* ── Related Tools ────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <RelatedTools slugs={tool.relatedTools} currentSlug={toolSlug} />
        </div>
      </section>

      {/* ── Internal Links ───────────────────────────────────────────── */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-lg font-semibold mb-4">More in {tool.categoryName}</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.category === categorySlug && t.slug !== toolSlug)
              .slice(0, 6)
              .map((t) => (
                <a
                  key={t.slug}
                  href={`/${t.category}/${t.slug}`}
                  className="text-sm px-3 py-1.5 rounded-lg border border-border hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {t.name}
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* ── Blog Articles ────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <CTASection
            title={`More Free Tools Like ${tool.name}`}
            description="Explore our complete collection of 30+ free online tools. No sign-up, no watermarks."
          />
        </div>
      </section>
    </>
  );
}
