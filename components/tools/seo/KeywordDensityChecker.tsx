"use client";

import { useState, useMemo } from "react";

const STOP_WORDS = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","this","that","these","those","it","its","i","me","my","we","our","you","your","he","him","his","she","her","they","them","their","what","which","who","whom","how","where","when","why","not","no","nor","so","if","then","than","too","very","just","about","above","after","again","all","also","am","any","as","because","before","between","both","each","few","from","further","get","got","here","into","more","most","other","out","over","own","same","some","such","up","only","now","new","one","two"]);

function extractPhrases(text: string, n: number, minLen: number): Map<string, number> {
  const words = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(w => w.length >= minLen);
  const map = new Map<string, number>();
  for (let i = 0; i <= words.length - n; i++) {
    const phrase = words.slice(i, i + n).join(" ");
    if (n === 1 && STOP_WORDS.has(phrase)) continue;
    map.set(phrase, (map.get(phrase) || 0) + 1);
  }
  return map;
}

export function KeywordDensityChecker() {
  const [content, setContent] = useState("");
  const [minLen, setMinLen] = useState(3);
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);

  const stats = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean);
    const totalWords = words.length;
    const totalChars = content.length;
    const totalSentences = content.split(/[.!?]+/).filter(s => s.trim()).length;
    return { totalWords, totalChars, totalSentences };
  }, [content]);

  const phrases = useMemo(() => {
    if (!content.trim()) return [];
    const map = extractPhrases(content, activeTab, minLen);
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: stats.totalWords > 0 ? ((count / stats.totalWords) * 100).toFixed(2) : "0.00",
      }));
  }, [content, activeTab, minLen, stats.totalWords]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="kd-content" className="block text-sm font-medium mb-1.5">Paste your content</label>
        <textarea id="kd-content" value={content} onChange={e => setContent(e.target.value)} rows={8} placeholder="Paste your article, blog post, or web page content here..." className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none font-mono" aria-label="Content for keyword analysis" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3"><p className="text-xl font-bold text-primary">{stats.totalWords}</p><p className="text-xs text-muted-foreground">Words</p></div>
          <div className="rounded-xl bg-muted/50 border border-border px-4 py-3"><p className="text-xl font-bold">{stats.totalChars}</p><p className="text-xs text-muted-foreground">Characters</p></div>
          <div className="rounded-xl bg-muted/50 border border-border px-4 py-3"><p className="text-xl font-bold">{stats.totalSentences}</p><p className="text-xs text-muted-foreground">Sentences</p></div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="kd-minlen" className="text-xs font-medium">Min length:</label>
          <select id="kd-minlen" value={minLen} onChange={e => setMinLen(+e.target.value)} className="px-2 py-1.5 rounded-lg border border-border bg-background text-sm" aria-label="Minimum word length">
            {[2, 3, 4, 5].map(n => <option key={n} value={n}>{n} chars</option>)}
          </select>
        </div>
      </div>
      <div>
        <div className="flex gap-1 mb-4 border-b border-border">
          {([1, 2, 3] as const).map(n => (
            <button key={n} onClick={() => setActiveTab(n)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === n ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{n}-Word</button>
          ))}
        </div>
        {phrases.length > 0 ? (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-muted/50"><th className="text-left px-4 py-2.5 font-medium">Keyword</th><th className="text-center px-4 py-2.5 font-medium">Count</th><th className="text-center px-4 py-2.5 font-medium">Density</th></tr></thead>
              <tbody>
                {phrases.map((p, i) => (
                  <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 font-medium">{p.keyword}</td>
                    <td className="px-4 py-2.5 text-center">{p.count}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${parseFloat(p.density) > 3 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : parseFloat(p.density) > 1 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>{p.density}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground py-8">Enter content above to see keyword density analysis.</p>
        )}
      </div>
    </div>
  );
}
