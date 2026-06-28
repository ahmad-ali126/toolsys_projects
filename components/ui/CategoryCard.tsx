import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/config/categories";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link
      href={`/${category.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 card-hover",
        className
      )}
      aria-label={`Browse ${category.name}`}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity",
          category.gradient
        )}
      />
      <div className="relative">
        <div
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-4",
            category.gradient
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {category.toolCount} tools
          </span>
          <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
            Explore <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
