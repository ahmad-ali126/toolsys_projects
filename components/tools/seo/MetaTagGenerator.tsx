"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [copied, setCopied] = useState(false);

  const output = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
${keywords ? `<meta name="keywords" content="${keywords}" />` : ""}
<meta name="robots" content="${robots}" />
${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}" />` : ""}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
${canonicalUrl ? `<meta property="og:url" content="${canonicalUrl}" />` : ""}
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ""}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
${canonicalUrl ? `<meta property="twitter:url" content="${canonicalUrl}" />` : ""}
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
${ogImage ? `<meta property="twitter:image" content="${ogImage}" />` : ""}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="meta-title" className="block text-sm font-medium mb-1.5">Page Title <span className="text-muted-foreground">({title.length}/60)</span></label>
          <input id="meta-title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Your page title" maxLength={60} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Page title" />
        </div>
        <div>
          <label htmlFor="meta-url" className="block text-sm font-medium mb-1.5">Canonical URL</label>
          <input id="meta-url" type="url" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} placeholder="https://example.com/page" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Canonical URL" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="meta-desc" className="block text-sm font-medium mb-1.5">Meta Description <span className="text-muted-foreground">({description.length}/160)</span></label>
          <textarea id="meta-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="A compelling description of your page" maxLength={160} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" aria-label="Meta description" />
        </div>
        <div>
          <label htmlFor="meta-keywords" className="block text-sm font-medium mb-1.5">Keywords <span className="text-muted-foreground">(comma separated)</span></label>
          <input id="meta-keywords" type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Keywords" />
        </div>
        <div>
          <label htmlFor="meta-ogimage" className="block text-sm font-medium mb-1.5">OG Image URL</label>
          <input id="meta-ogimage" type="url" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Open Graph image URL" />
        </div>
        <div>
          <label htmlFor="meta-robots" className="block text-sm font-medium mb-1.5">Robots Directive</label>
          <select id="meta-robots" value={robots} onChange={e => setRobots(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Robots directive">
            <option value="index, follow">index, follow</option>
            <option value="noindex, follow">noindex, follow</option>
            <option value="index, nofollow">index, nofollow</option>
            <option value="noindex, nofollow">noindex, nofollow</option>
          </select>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Generated Meta Tags</h3>
          <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" aria-label="Copy meta tags">
            {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-muted/50 border border-border text-xs overflow-x-auto leading-relaxed"><code>{output}</code></pre>
      </div>
    </div>
  );
}
