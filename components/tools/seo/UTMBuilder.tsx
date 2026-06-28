"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function UTMBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const params = new URLSearchParams();
  if (source) params.set("utm_source", source);
  if (medium) params.set("utm_medium", medium);
  if (campaign) params.set("utm_campaign", campaign);
  if (term) params.set("utm_term", term);
  if (content) params.set("utm_content", content);

  const generatedUrl = url ? `${url}${url.includes("?") ? "&" : "?"}${params.toString()}` : "";

  const handleCopy = async () => {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = url && source && medium && campaign;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="utm-url" className="block text-sm font-medium mb-1.5">Website URL <span className="text-rose-500">*</span></label>
          <input id="utm-url" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/landing-page" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Website URL" />
        </div>
        <div>
          <label htmlFor="utm-source" className="block text-sm font-medium mb-1.5">Campaign Source <span className="text-rose-500">*</span></label>
          <input id="utm-source" type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="e.g. google, newsletter, facebook" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="UTM source" />
        </div>
        <div>
          <label htmlFor="utm-medium" className="block text-sm font-medium mb-1.5">Campaign Medium <span className="text-rose-500">*</span></label>
          <input id="utm-medium" type="text" value={medium} onChange={e => setMedium(e.target.value)} placeholder="e.g. cpc, email, social" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="UTM medium" />
        </div>
        <div>
          <label htmlFor="utm-campaign" className="block text-sm font-medium mb-1.5">Campaign Name <span className="text-rose-500">*</span></label>
          <input id="utm-campaign" type="text" value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="e.g. spring_sale, product_launch" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="UTM campaign" />
        </div>
        <div>
          <label htmlFor="utm-term" className="block text-sm font-medium mb-1.5">Campaign Term <span className="text-muted-foreground text-xs">(optional)</span></label>
          <input id="utm-term" type="text" value={term} onChange={e => setTerm(e.target.value)} placeholder="e.g. running+shoes" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="UTM term" />
        </div>
        <div>
          <label htmlFor="utm-content" className="block text-sm font-medium mb-1.5">Campaign Content <span className="text-muted-foreground text-xs">(optional)</span></label>
          <input id="utm-content" type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="e.g. banner_ad, text_link" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="UTM content" />
        </div>
      </div>
      {isValid && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Generated UTM URL</h3>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border text-sm break-all leading-relaxed">{generatedUrl}</div>
        </div>
      )}
      {!isValid && <p className="text-sm text-muted-foreground text-center py-4">Fill in the required fields (*) to generate your UTM URL.</p>}
    </div>
  );
}
