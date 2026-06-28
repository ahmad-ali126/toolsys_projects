import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/config/blog";
import { getToolBySlug } from "@/lib/config/tools";
import { siteConfig } from "@/lib/config/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ToolCard } from "@/components/ui/ToolCard";
import { BlogCard } from "@/components/ui/BlogCard";
import { CTASection } from "@/components/ui/CTASection";
import {
  StructuredData,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/components/ui/StructuredData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedTools = post.relatedTools
    .map((s) => getToolBySlug(s))
    .filter(Boolean);
  const relatedPosts = getRelatedPosts(post.relatedPosts);

  const breadcrumbSchema = [
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
  ];

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `${siteConfig.url}/blog/${slug}`,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
  });

  return (
    <>
      <StructuredData data={buildBreadcrumbSchema(breadcrumbSchema)} />
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {post.category}
              </span>
              {post.featured && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-table:text-sm prose-th:bg-muted/50 prose-th:px-4 prose-th:py-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold mb-6">Tools Mentioned</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <ToolCard key={tool!.slug} tool={tool!} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back + CTA */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 space-y-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
          <CTASection
            title="Try Our Free Tools"
            description="Use the tools mentioned in this article. No sign-up needed."
          />
        </div>
      </section>
    </>
  );
}
