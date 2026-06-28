import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTASection({
  title = "Explore 30+ Free Online Tools",
  description = "No sign-up required. No watermarks. No limits. Just fast, free tools that work.",
  primaryLabel = "Browse All Tools",
  primaryHref = "/",
  secondaryLabel = "Read Our Blog",
  secondaryHref = "/blog",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-indigo-600 p-8 md:p-12 text-white",
        className
      )}
      aria-labelledby="cta-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          Free Forever
        </div>
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
