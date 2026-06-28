import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
      <ol
        className="flex items-center flex-wrap gap-1"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {allItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-1"
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            {index === 0 && (
              <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            {item.href && index < allItems.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span
                className="text-foreground font-medium"
                itemProp="name"
                aria-current={index === allItems.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
