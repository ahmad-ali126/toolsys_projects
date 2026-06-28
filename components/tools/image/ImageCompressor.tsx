"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setOriginalSize(f.size);
    setCompressedUrl(null);
    setCompressedSize(0);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const compress = useCallback(() => {
    if (!file) return;
    setProcessing(true);
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedUrl(URL.createObjectURL(blob));
            setCompressedSize(blob.size);
          }
          setProcessing(false);
        },
        "image/jpeg",
        quality / 100
      );
    };
    img.src = preview!;
  }, [file, preview, quality]);

  const formatSize = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  const reduction = originalSize > 0 && compressedSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-primary"); }}
          onDragLeave={e => e.currentTarget.classList.remove("border-primary")}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("border-primary"); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors"
          role="button"
          tabIndex={0}
          aria-label="Upload image to compress"
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">Click or drag image here</p>
            <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP up to 10MB</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div>
              <label htmlFor="compress-quality" className="block text-sm font-medium mb-1.5">Quality: {quality}%</label>
              <input id="compress-quality" type="range" min={1} max={100} value={quality} onChange={e => setQuality(+e.target.value)} className="w-48 accent-primary" aria-label="Compression quality" />
            </div>
            <button onClick={compress} disabled={processing} className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50">
              {processing ? "Compressing..." : "Compress Image"}
            </button>
            <button onClick={() => { setFile(null); setPreview(null); setCompressedUrl(null); }} className="px-4 py-2.5 border border-border rounded-xl text-sm hover:bg-muted transition-colors">Reset</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Original ({formatSize(originalSize)})</p>
              {preview && <img src={preview} alt="Original" className="w-full rounded-xl border border-border" />}
            </div>
            {compressedUrl && (
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2"><ImageIcon className="h-4 w-4 text-emerald-500" /> Compressed ({formatSize(compressedSize)}) <span className="text-xs text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">-{reduction}%</span></p>
                <img src={compressedUrl} alt="Compressed" className="w-full rounded-xl border border-border" />
                <a href={compressedUrl} download={`compressed-${file.name}`} className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"><Download className="h-4 w-4" /> Download</a>
              </div>
            )}
          </div>
        </>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} className="hidden" aria-hidden="true" />
    </div>
  );
}
