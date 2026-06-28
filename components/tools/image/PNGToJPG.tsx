"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Download } from "lucide-react";

export function PNGToJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(90);
  const [originalSize, setOriginalSize] = useState(0);
  const [convertedSize, setConvertedSize] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f); setOriginalSize(f.size); setConvertedUrl(null); setConvertedSize(0);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const convert = useCallback(() => {
    if (!preview) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) { setConvertedUrl(URL.createObjectURL(blob)); setConvertedSize(blob.size); }
      }, "image/jpeg", quality / 100);
    };
    img.src = preview;
  }, [preview, quality]);

  const fmtSize = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      {!file ? (
        <div onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }} className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors" role="button" tabIndex={0} aria-label="Upload PNG image">
          <Upload className="h-10 w-10 text-muted-foreground" /><p className="font-medium">Upload PNG Image</p><p className="text-sm text-muted-foreground">Click or drag PNG file here</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4">
            <div><label htmlFor="pngjpg-q" className="block text-sm font-medium mb-1">JPG Quality: {quality}%</label><input id="pngjpg-q" type="range" min={1} max={100} value={quality} onChange={e => setQuality(+e.target.value)} className="w-48 accent-primary" /></div>
            <button onClick={convert} className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">Convert to JPG</button>
            <button onClick={() => { setFile(null); setPreview(null); setConvertedUrl(null); }} className="px-4 py-2.5 border border-border rounded-xl text-sm hover:bg-muted transition-colors">Reset</button>
          </div>
          {convertedUrl && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-muted/50 border border-border p-4 text-center"><p className="text-xs text-muted-foreground mb-1">Original PNG</p><p className="text-lg font-bold">{fmtSize(originalSize)}</p></div>
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center"><p className="text-xs text-muted-foreground mb-1">Converted JPG</p><p className="text-lg font-bold text-primary">{fmtSize(convertedSize)}</p></div>
            </div>
          )}
          {convertedUrl && <a href={convertedUrl} download={`${file.name.replace(/\.png$/i, "")}.jpg`} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"><Download className="h-4 w-4" /> Download JPG</a>}
        </>
      )}
      <input ref={inputRef} type="file" accept="image/png" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} className="hidden" />
    </div>
  );
}
