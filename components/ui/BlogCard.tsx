import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/config/blog";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-start gap-3 py-3 hover:text-primary transition-colors"
      >
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    );
  }

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-200 card-hover">
      <div className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {post.category}
          </span>
          {post.featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              Featured
            </span>
          )}
        </div>
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 pb-5 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min read
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          aria-label={`Read article: ${post.title}`}
        >
          Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
