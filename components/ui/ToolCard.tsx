import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/lib/config/tools";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

function RenderIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] || LucideIcons.Wrench;
  return <IconComponent className={className} />;
}

export function ToolCard({ tool, variant = "default", className }: ToolCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/${tool.category}/${tool.slug}`}
        className={cn(
          "group flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 card-hover",
          className
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
            tool.gradient,
            "bg-opacity-10"
          )}
        >
          <RenderIcon name={tool.icon} className={cn("h-4 w-4", tool.color)} />
        </div>
        <div className="min-w-0">
          <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">
            {tool.name}
          </div>
          <div className="text-xs text-muted-foreground truncate">{tool.categoryName}</div>
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/${tool.category}/${tool.slug}`}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 card-hover",
          className
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity", tool.gradient)} />
        <div className="relative">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-4",
              tool.gradient,
              "bg-opacity-10"
            )}
          >
            <RenderIcon name={tool.icon} className={cn("h-6 w-6", tool.color)} />
          </div>
          <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {tool.shortDescription}
          </p>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            Use Tool
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/${tool.category}/${tool.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-200 card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
            tool.gradient,
            "bg-opacity-10"
          )}
        >
          <RenderIcon name={tool.icon} className={cn("h-5 w-5", tool.color)} />
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-2 group-hover:translate-x-0" />
      </div>
      <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
        {tool.shortDescription}
      </p>
    </Link>
  );
}
