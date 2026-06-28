import type { Metadata } from "next";
import { blogPosts } from "@/lib/config/blog";
import { siteConfig } from "@/lib/config/seo";
import { BlogCard } from "@/components/ui/BlogCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Newsletter } from "@/components/ui/Newsletter";
import { CTASection } from "@/components/ui/CTASection";
import {
  StructuredData,
  buildBreadcrumbSchema,
} from "@/components/ui/StructuredData";

export const metadata: Metadata = {
  title: "Blog — Tips, Guides & Tutorials",
  description:
    "Read expert guides, tutorials, and tips about image optimization, SEO, finance, and developer tools. Free resources from Toolsys.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog — Tips, Guides & Tutorials | Toolsys",
    description:
      "Expert guides and tutorials on SEO, image optimization, finance, and developer tools.",
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const breadcrumbSchema = [
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
  ];

  return (
    <>
      <StructuredData data={buildBreadcrumbSchema(breadcrumbSchema)} />

      {/* Hero */}
      <section className="hero-gradient py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <div className="mt-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expert guides, tutorials, and tips on image optimization, SEO,
              finance, and developer tools.
            </p>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 md:py-20" aria-labelledby="all-posts-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 id="all-posts-heading" className="text-2xl font-bold mb-8">
            All Articles ({blogPosts.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
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
            title="Explore Our Free Tools"
            description="Use the tools we write about. All free, fast, and private."
          />
        </div>
      </section>
    </>
  );
}
