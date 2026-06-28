"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Download, Lock, Unlock } from "lucide-react";

const PRESETS = [
  { label: "1080×1080", w: 1080, h: 1080 },
  { label: "1920×1080", w: 1920, h: 1080 },
  { label: "800×600", w: 800, h: 600 },
  { label: "500×500", w: 500, h: 500 },
  { label: "1200×630", w: 1200, h: 630 },
  { label: "400×400", w: 400, h: 400 },
];

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f); setResizedUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setPreview(src);
      const img = new window.Image();
      img.onload = () => { setOrigW(img.width); setOrigH(img.height); setWidth(img.width); setHeight(img.height); };
      img.src = src;
    };
    reader.readAsDataURL(f);
  }, []);

  const onWidthChange = (w: number) => {
    setWidth(w);
    if (lockAspect && origW > 0) setHeight(Math.round((w / origW) * origH));
  };
  const onHeightChange = (h: number) => {
    setHeight(h);
    if (lockAspect && origH > 0) setWidth(Math.round((h / origH) * origW));
  };

  const resize = useCallback(() => {
    if (!preview) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) setResizedUrl(URL.createObjectURL(blob));
      }, file?.type || "image/png");
    };
    img.src = preview;
  }, [preview, width, height, file]);

  return (
    <div className="space-y-6">
      {!file ? (
        <div onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }} className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors" role="button" tabIndex={0} aria-label="Upload image to resize">
          <Upload className="h-10 w-10 text-muted-foreground" /><p className="font-medium">Upload Image to Resize</p><p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label htmlFor="resize-w" className="block text-xs font-medium mb-1">Width (px)</label>
              <input id="resize-w" type="number" value={width} onChange={e => onWidthChange(+e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={() => setLockAspect(!lockAspect)} className="p-2 rounded-lg border border-border hover:bg-muted transition-colors mb-0.5" aria-label={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}>
              {lockAspect ? <Lock className="h-4 w-4 text-primary" /> : <Unlock className="h-4 w-4 text-muted-foreground" />}
            </button>
            <div>
              <label htmlFor="resize-h" className="block text-xs font-medium mb-1">Height (px)</label>
              <input id="resize-h" type="number" value={height} onChange={e => onHeightChange(+e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={resize} className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">Resize</button>
            <button onClick={() => { setFile(null); setPreview(null); setResizedUrl(null); }} className="px-4 py-2 border border-border rounded-xl text-sm hover:bg-muted transition-colors">Reset</button>
          </div>
          <div>
            <p className="text-xs font-medium mb-2">Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => { setWidth(p.w); setHeight(p.h); setLockAspect(false); }} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:border-primary/30 hover:text-primary transition-colors">{p.label}</button>
              ))}
            </div>
          </div>
          {origW > 0 && <p className="text-xs text-muted-foreground">Original: {origW}×{origH}px → New: {width}×{height}px</p>}
          {resizedUrl && (
            <div>
              <img src={resizedUrl} alt="Resized" className="max-w-full max-h-80 rounded-xl border border-border" />
              <a href={resizedUrl} download={`resized-${file.name}`} className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"><Download className="h-4 w-4" /> Download</a>
            </div>
          )}
        </>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} className="hidden" />
    </div>
  );
}
