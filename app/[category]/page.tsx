import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, getCategoryBySlug } from "@/lib/config/categories";
import { getToolsByCategory } from "@/lib/config/tools";
import { siteConfig } from "@/lib/config/seo";
import { ToolCard } from "@/components/ui/ToolCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FAQSection } from "@/components/ui/FAQSection";
import { CTASection } from "@/components/ui/CTASection";
import { Newsletter } from "@/components/ui/Newsletter";
import {
  StructuredData,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/components/ui/StructuredData";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};

  const title = `${category.name} — Free Online ${category.name} | ${siteConfig.name}`;
  const description = `${category.description} All tools are free, browser-based, and require no sign-up.`;

  return {
    title,
    description,
    keywords: [`free ${category.name.toLowerCase()}`, `online ${category.name.toLowerCase()}`, `${category.slug} free`],
    alternates: { canonical: `${siteConfig.url}/${categorySlug}` },
    openGraph: { title, description, url: `${siteConfig.url}/${categorySlug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(categorySlug);
  const Icon = category.icon;

  const breadcrumbItems = [{ name: "Home", url: siteConfig.url }, { name: category.name, url: `${siteConfig.url}/${categorySlug}` }];

  return (
    <>
      <StructuredData data={buildBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={buildFAQSchema(category.faqs)} />

      {/* Hero */}
      <section className="hero-gradient py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb items={[{ label: category.name }]} />
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient}`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Free Online {category.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
          {/* Category stats */}
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {category.toolCount} free tools
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              No sign-up required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Browser-based
            </span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-20" aria-labelledby="tools-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 id="tools-heading" className="text-2xl font-bold mb-8">
            All {category.name} ({categoryTools.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <FAQSection
            faqs={category.faqs}
            title={`Frequently Asked Questions About ${category.name}`}
          />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold mb-6">Explore Other Tool Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== categorySlug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-medium"
                >
                  <cat.icon className={`h-4 w-4 ${cat.color}`} />
                  {cat.name}
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <Newsletter />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <CTASection
            title={`Explore All ${category.name}`}
            description={`All ${category.name.toLowerCase()} are free, fast, and private. No account needed.`}
          />
        </div>
      </section>
    </>
  );
}
