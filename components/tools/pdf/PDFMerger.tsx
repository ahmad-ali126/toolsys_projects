"use client";

import { useState, useRef } from "react";
import { Upload, Info, FileText, Download, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

export function PDFMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const fmtSize = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  const moveUp = (i: number) => { if (i === 0) return; const n = [...files]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setFiles(n); };
  const moveDown = (i: number) => { if (i === files.length - 1) return; const n = [...files]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; setFiles(n); };
  const remove = (i: number) => setFiles(files.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-700 dark:text-blue-400">
        <Info className="h-4 w-4 shrink-0" /><p>PDF merging requires server-side processing. This demo shows the upload and reordering interface.</p>
      </div>
      <div onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const f = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf"); setFiles([...files, ...f]); }} className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors" role="button" tabIndex={0} aria-label="Upload PDF files">
        <Upload className="h-8 w-8 text-muted-foreground" /><p className="font-medium text-sm">Add PDF Files</p><p className="text-xs text-muted-foreground">Upload up to 20 PDFs</p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={`${f.name}-${i}`} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
              <FileText className="h-5 w-5 text-rose-500 shrink-0" />
              <div className="min-w-0 flex-1"><p className="text-sm font-medium truncate">{f.name}</p><p className="text-xs text-muted-foreground">{fmtSize(f.size)}</p></div>
              <div className="flex items-center gap-1">
                <button onClick={() => moveUp(i)} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors" aria-label="Move up"><ArrowUp className="h-3.5 w-3.5" /></button>
                <button onClick={() => moveDown(i)} disabled={i === files.length - 1} className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors" aria-label="Move down"><ArrowDown className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(i)} className="p-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 transition-colors" aria-label="Remove file"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
          <div className="p-6 rounded-xl border-2 border-dashed border-border text-center mt-4">
            <Download className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Click &quot;Merge&quot; to combine {files.length} PDFs into one.</p>
            <button className="mt-3 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">Merge PDFs</button>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept=".pdf" multiple onChange={e => { if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]); }} className="hidden" />
    </div>
  );
}
