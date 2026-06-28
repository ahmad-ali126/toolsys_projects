import type { Metadata } from "next";
import { CheckSquare, Scale } from "lucide-react";
import { siteConfig } from "@/lib/config/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Read the Terms of Service for Toolsys. Free web-based utilities provided on an "as-is" and "as-available" basis.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Understand the terms under which you may use Toolsys's free online utilities.`,
    url: `${siteConfig.url}/terms`,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <Breadcrumb items={[{ label: "Terms of Service" }]} />
          <div className="mt-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              Terms of <span className="text-gradient-blue">Service</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: June 20, 2026. Please read these terms carefully before using our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-8">
          {/* Important Alert */}
          <div className="flex gap-4 p-5 rounded-2xl border border-primary/20 bg-primary/5 text-primary text-sm leading-relaxed">
            <Scale className="h-5 w-5 shrink-0" />
            <div>
              <strong className="font-semibold block mb-0.5">Summary of Terms</strong>
              We build these tools to be as helpful and accessible as possible. By accessing or using Toolsys, you agree to comply with these basic rules. We provide all tools for free, without warranty of any kind.
            </div>
          </div>

          {/* Terms Text */}
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using Toolsys (the &quot;Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must immediately discontinue using our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
              <p>
                Toolsys provides access to a collection of free online tools, including image compressors, PDF utility shells, financial calculators, developer helper tools, and SEO utility systems. These services are provided free of charge, supported by online advertisements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Acceptable Use Policy</h2>
              <p>
                You agree not to use the Platform to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Violate any local, national, or international laws or regulations.</li>
                <li>Attempt to scrape, harvest, or extract data from the Platform using automated scripts or scrapers without express written permission.</li>
                <li>Conduct denial-of-service (DoS) attacks or interfere with the server operations hosting the Platform.</li>
                <li>Use our tools or utilities to create malicious content, distribute viruses, or generate spam.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
              <p>
                The designs, layout, codebase, logos, branding, and text content of Toolsys are the intellectual property of Toolsys. You may not copy, republish, or redistribute our assets without permission. 
              </p>
              <p className="mt-2">
                All client outputs (e.g. generated QR codes, compressed images, formulated spreadsheets, or JSON results) belong entirely to you. We assert zero ownership over any inputs or outputs processed using our tools.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Disclaimer of Warranties</h2>
              <p className="bg-muted/40 p-4 rounded-xl border border-border italic text-xs leading-relaxed">
                THE SERVICE AND ALL UTILITIES ARE PROVIDED ON AN &quot;AS-IS&quot; AND &quot;AS-AVAILABLE&quot; BASIS. Toolsys DISCLAIMS ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE CALCULATIONS, FILE CONVERSIONS, OR OUTPUTS ARE 100% ACCURATE OR ERROR-FREE.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
              <p>
                In no event shall Toolsys or its developers be liable for any direct, indirect, incidental, special, or consequential damages (including loss of data, profits, or business interruption) arising out of or in connection with the use or inability to use the Platform, even if advised of the possibility of such damages.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with local regulations, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">8. Contact Us</h2>
              <p>
                If you have any questions or feedback regarding these terms, please contact us at <a href="mailto:hello@Toolsys.app" className="text-primary hover:underline">hello@Toolsys.app</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
