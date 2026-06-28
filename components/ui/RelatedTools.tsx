import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedTools } from "@/lib/config/tools";
import { ToolCard } from "./ToolCard";

interface RelatedToolsProps {
  slugs: string[];
  currentSlug?: string;
}

export function RelatedTools({ slugs, currentSlug }: RelatedToolsProps) {
  const related = getRelatedTools(slugs).filter((t) => t.slug !== currentSlug);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-tools-heading">
      <div className="flex items-center justify-between mb-6">
        <h2 id="related-tools-heading" className="text-2xl font-bold">
          Related Tools
        </h2>
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} variant="featured" />
        ))}
      </div>
    </section>
  );
}
