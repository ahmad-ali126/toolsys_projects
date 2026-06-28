import type { Metadata } from "next";
import { Shield, Zap, Heart, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn more about Toolsys, our mission to build free browser-based tools, and our commitment to user privacy and lightning-fast utilities.`,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About Us | ${siteConfig.name}`,
    description: `Discover how Toolsys provides free, secure, and instant online tools for images, PDFs, SEO, and financial calculations.`,
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <Breadcrumb items={[{ label: "About Us" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              About <span className="text-gradient-blue">Toolsys</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We build lightning-fast, private, and 100% free digital utilities. No accounts, no paywalls, and no hidden catches.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most online utilities have become bloated with annoying popups, aggressive tracking, or sudden paywalls just when you need to compress an image or convert a file.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Toolsys was founded to offer an alternative: a clean, responsive, and secure platform where all tools are free, processed directly in your browser, and fully functional without requiring an account.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold">Why browser-based processing?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whenever you convert an image, format JSON, or generate a QR code, the logic runs on your local machine using standard browser APIs. 
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This means your files and private inputs are never sent to external servers, providing maximum speed and total data privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Core Values</h2>
            <p className="text-muted-foreground">What guides our development and user experience choices.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Total Privacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe your data belongs to you. We do not store your files or track your inputs. Most tools perform calculations entirely client-side.
              </p>
            </div>
            {/* Value 2 */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Instant Performance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By bypassing server upload delays, our utilities deliver results instantly. The site is optimized to render in milliseconds.
              </p>
            </div>
            {/* Value 3 */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">100% Free</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No subscription models, paywalled features, or premium upgrades. Every single tool is fully featured and freely accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-5xl px-4">
        <CTASection 
          title="Ready to get started?" 
          description="Explore our 30+ browser-based tools and see the performance difference for yourself." 
        />
      </section>
    </div>
  );
}
