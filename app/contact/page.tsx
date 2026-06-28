import type { Metadata } from "next";
import { Mail, MessageSquare, Bug, Compass } from "lucide-react";
import { siteConfig } from "@/lib/config/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: `Get in touch with Toolsys. Send suggestions, report bugs, ask questions, or request new free online utilities.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: `Contact the Toolsys team to request new tools, report bugs, or give feedback. We'd love to hear from you.`,
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              Get in <span className="text-gradient-blue">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a tool idea? Found a bug? Or just want to say hi? Send us a message and we will respond as soon as we can.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Other channels & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold">Contact Channels</h2>
              
              <div className="space-y-4">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Direct Email</h3>
                    <a href="mailto:hello@Toolsys.app" className="text-sm text-primary hover:underline font-medium">
                      hello@Toolsys.app
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      For business inquires or direct support.
                    </p>
                  </div>
                </div>

                {/* Bug Reports */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Bug className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Report a Bug</h3>
                    <a 
                      href={siteConfig.links.github + "/issues"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      GitHub Issues
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Help us improve by filing bug reports on GitHub.
                    </p>
                  </div>
                </div>

                {/* Suggest Tools */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Suggest a Tool</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We aim to build the most complete utility toolbox. Let us know what developer, SEO, financial, or image tools you need next!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ card */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Frequently Asked
              </h2>
              <div className="space-y-3 divide-y divide-border text-sm">
                <div className="pt-2">
                  <h4 className="font-semibold mb-1">How fast do you respond?</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    We try to read all emails and form submissions daily. You should hear back within 1–2 business days.
                  </p>
                </div>
                <div className="pt-3">
                  <h4 className="font-semibold mb-1">Is it possible to request a custom API?</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Yes, we are exploring offering APIs for features like Image Compression and QR Code generation. Let us know your requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
