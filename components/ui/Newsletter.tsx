"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      className="rounded-3xl bg-muted/50 border border-border p-8 md:p-12 text-center"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 id="newsletter-heading" className="text-2xl font-bold mb-3">
          Stay Updated with New Tools
        </h2>
        <p className="text-muted-foreground mb-6">
          Get notified when we launch new tools and publish helpful guides. No spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
            <p className="font-semibold text-lg">You&apos;re subscribed!</p>
            <p className="text-sm text-muted-foreground">Thanks for joining. We&apos;ll be in touch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              aria-required="true"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          No spam. Unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
