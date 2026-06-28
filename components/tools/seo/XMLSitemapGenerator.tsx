"use client";

import { useState } from "react";
import { Copy, Check, Plus, Trash2 } from "lucide-react";

interface SitemapEntry {
  id: number;
  url: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

export function XMLSitemapGenerator() {
  const [entries, setEntries] = useState<SitemapEntry[]>([
    { id: 1, url: "https://example.com/", priority: "1.0", changefreq: "weekly", lastmod: new Date().toISOString().split("T")[0] },
  ]);
  const [copied, setCopied] = useState(false);
  let nextId = entries.length + 1;

  const addEntry = () => {
    setEntries([...entries, { id: nextId++, url: "", priority: "0.8", changefreq: "monthly", lastmod: new Date().toISOString().split("T")[0] }]);
  };

  const removeEntry = (id: number) => setEntries(entries.filter(e => e.id !== id));

  const updateEntry = (id: number, field: keyof SitemapEntry, value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const output = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.filter(e => e.url).map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "sitemap.xml"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {entries.map(entry => (
          <div key={entry.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 rounded-xl border border-border bg-muted/20 items-end">
            <div className="sm:col-span-4">
              <label className="block text-xs font-medium mb-1">URL</label>
              <input type="url" value={entry.url} onChange={e => updateEntry(entry.id, "url", e.target.value)} placeholder="https://example.com/page" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Page URL" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">Priority</label>
              <select value={entry.priority} onChange={e => updateEntry(entry.id, "priority", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Priority">
                {["1.0","0.9","0.8","0.7","0.6","0.5","0.4","0.3","0.2","0.1"].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">Change Freq</label>
              <select value={entry.changefreq} onChange={e => updateEntry(entry.id, "changefreq", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Change frequency">
                {["always","hourly","daily","weekly","monthly","yearly","never"].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium mb-1">Last Modified</label>
              <input type="date" value={entry.lastmod} onChange={e => updateEntry(entry.id, "lastmod", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Last modified date" />
            </div>
            <div className="sm:col-span-1 flex justify-end">
              <button onClick={() => removeEntry(entry.id)} className="p-2 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors" aria-label="Remove entry"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        <button onClick={addEntry} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors">
          <Plus className="h-4 w-4" /> Add URL
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Generated XML Sitemap</h3>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
            </button>
            <button onClick={handleDownload} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-primary/30 transition-colors">Download .xml</button>
          </div>
        </div>
        <pre className="p-4 rounded-xl bg-muted/50 border border-border text-xs overflow-x-auto leading-relaxed max-h-64"><code>{output}</code></pre>
      </div>
    </div>
  );
}
