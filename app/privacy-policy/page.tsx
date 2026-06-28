import type { Metadata } from "next";
import { ShieldCheck, Info } from "lucide-react";
import { siteConfig } from "@/lib/config/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Understand how Toolsys handles your data. Almost all of our tools process files and text locally in your browser. We never store your inputs.`,
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Read about our privacy-first philosophy, local browser processing, cookies usage, and data security.`,
    url: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <div className="mt-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              Privacy <span className="text-gradient-blue">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: June 20, 2026. Your privacy is our highest priority.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-8">
          {/* Important Alert */}
          <div className="flex gap-4 p-5 rounded-2xl border border-primary/20 bg-primary/5 text-primary text-sm leading-relaxed">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            <div>
              <strong className="font-semibold block mb-0.5">Privacy-First Architecture</strong>
              Unlike other utilities that upload your files to remote cloud servers, the majority of the tools on Toolsys run entirely in your web browser. Your images, documents, passwords, and JSON inputs are processed locally on your machine and never uploaded to our servers.
            </div>
          </div>

          {/* Privacy Text */}
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Information We Do Not Collect</h2>
              <p>
                Because our utilities are designed to execute client-side using JavaScript, we do not collect, store, inspect, or process:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Images uploaded to the Image Compressor, Image Resizer, or format converters.</li>
                <li>Inputs formatted in the JSON Formatter, UUID Generator, or UTM Builder.</li>
                <li>Password inputs, tax entries, or calculator details.</li>
                <li>PDF documents queued in our merger, splitter, or compressor tool shells.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Web Server Logs</h2>
              <p>
                Like most websites, our host web server automatically collects standard, non-identifying access log entries. These logs include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Your IP address (anonymized/hashed where supported).</li>
                <li>Your browser type and operating system.</li>
                <li>The specific pages or tools you visited.</li>
                <li>The timestamp and referring URL.</li>
              </ul>
              <p className="mt-2">
                This information is used strictly for server health diagnostics, performance monitoring, and traffic analysis. We cannot match web server log entries to any client-side file conversions or calculations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Cookies and Analytics</h2>
              <p>
                We use cookies to improve your user experience and gather general stats:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>Preferences:</strong> To remember your interface settings (such as light/dark mode preference or selected currencies).</li>
                <li><strong>Analytics:</strong> We use Google Analytics (or other lightweight privacy-friendly analytics providers) to track aggregate visitor volumes, popular tools, and drop-off rates. These services compile anonymous metrics and do not track individual file details.</li>
                <li><strong>Advertising:</strong> To keep this platform free, we serve advertisements. Our advertising partners (e.g., Google AdSense) may place cookies to serve ads based on your previous visits to this or other websites.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Third-Party Services</h2>
              <p>
                Our tools may link to third-party APIs. For example, our QR Code Generator sends input URL strings to `api.qrserver.com` to draw the QR block. These services are subject to their respective privacy terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Data Retention</h2>
              <p>
                We retain zero client-side tool outputs. For browser-based tools, once you close the browser tab or navigate away, all processed data in the memory allocation of the browser is deleted.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Changes to this Policy</h2>
              <p>
                We reserve the right to modify this privacy policy at any time. Any changes will be posted on this page with an updated modification timestamp.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Contact Information</h2>
              <p>
                If you have any questions or concerns regarding our privacy practices, please contact us by email at <a href="mailto:hello@Toolsys.app" className="text-primary hover:underline">hello@Toolsys.app</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
