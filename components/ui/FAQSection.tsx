"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/config/tools";

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-2xl font-bold text-center mb-8"
      >
        {title}
      </h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-xl overflow-hidden transition-colors hover:border-primary/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium hover:bg-muted/50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className="pr-4">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
                  openIndex === index && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={cn(
                "overflow-hidden transition-all duration-200",
                openIndex === index ? "max-h-96" : "max-h-0"
              )}
            >
              <p className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
