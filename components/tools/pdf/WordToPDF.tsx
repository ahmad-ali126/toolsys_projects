"use client";

import { useState, useRef } from "react";
import { Upload, Info, FileText, Download } from "lucide-react";

export function WordToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fmtSize = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-700 dark:text-blue-400">
        <Info className="h-4 w-4 shrink-0" /><p>Word to PDF conversion requires server-side processing to preserve formatting perfectly.</p>
      </div>
      {!file ? (
        <div onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }} className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors" role="button" tabIndex={0} aria-label="Upload Word document">
          <Upload className="h-10 w-10 text-muted-foreground" /><p className="font-medium">Upload Word Document</p><p className="text-sm text-muted-foreground">Supports .doc and .docx files</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
            <FileText className="h-8 w-8 text-blue-500 shrink-0" />
            <div className="min-w-0 flex-1"><p className="font-medium text-sm truncate">{file.name}</p><p className="text-xs text-muted-foreground">{fmtSize(file.size)} · DOCX → PDF</p></div>
            <button onClick={() => setFile(null)} className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted transition-colors">Remove</button>
          </div>
          <div className="p-6 rounded-xl border-2 border-dashed border-border text-center">
            <Download className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Your PDF file will be available for download here.</p>
            <button className="mt-3 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">Convert to PDF</button>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept=".doc,.docx" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} className="hidden" />
    </div>
  );
}
