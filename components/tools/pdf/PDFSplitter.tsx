"use client";

import { useState, useRef } from "react";
import { Upload, Info, FileText, Download } from "lucide-react";

export function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("1-3");
  const inputRef = useRef<HTMLInputElement>(null);
  const fmtSize = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-700 dark:text-blue-400">
        <Info className="h-4 w-4 shrink-0" /><p>PDF splitting requires server-side processing. This demo shows the interface for specifying page ranges.</p>
      </div>
      {!file ? (
        <div onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }} className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors" role="button" tabIndex={0} aria-label="Upload PDF">
          <Upload className="h-10 w-10 text-muted-foreground" /><p className="font-medium">Upload PDF to Split</p><p className="text-sm text-muted-foreground">Click or drag PDF here</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
            <FileText className="h-8 w-8 text-rose-500 shrink-0" />
            <div className="min-w-0"><p className="font-medium text-sm truncate">{file.name}</p><p className="text-xs text-muted-foreground">{fmtSize(file.size)}</p></div>
            <button onClick={() => setFile(null)} className="ml-auto px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted transition-colors">Remove</button>
          </div>
          <div>
            <label htmlFor="split-range" className="block text-sm font-medium mb-1.5">Page Range</label>
            <input id="split-range" type="text" value={pageRange} onChange={e => setPageRange(e.target.value)} placeholder="e.g. 1-3, 5, 7-10" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Page range" />
            <p className="text-xs text-muted-foreground mt-1">Enter page numbers or ranges separated by commas (e.g., 1-3, 5, 7-10)</p>
          </div>
          <div className="p-6 rounded-xl border-2 border-dashed border-border text-center">
            <Download className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Split pages will be available for download here.</p>
            <button className="mt-3 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">Split PDF</button>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept=".pdf" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} className="hidden" />
    </div>
  );
}
