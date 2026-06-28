"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Download, Info, RefreshCw, AlertCircle, Image as ImageIcon } from "lucide-react";

export function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setLoading(true);
    setError(null);
    setFile(selectedFile);

    const original = URL.createObjectURL(selectedFile);
    setOriginalUrl(original);

    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(selectedFile);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      console.error(err);
      setError("AI model processing failed. Please try a smaller image or another browser.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);

    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Cleanup Object URLs on unmount/change
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  return (
    <div className="space-y-6">
      {/* Informative notice about local AI processing */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-700 dark:text-blue-400">
        <Info className="h-4 w-4 shrink-0" />
        <p>
          <strong>100% Private & Client-side:</strong> AI processing runs directly in your browser. 
          The first run may take 10-15 seconds to download the 7MB AI model weights.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm text-rose-700 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-primary"); }}
          onDragLeave={e => e.currentTarget.classList.remove("border-primary")}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("border-primary"); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }}
          className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors"
          role="button"
          tabIndex={0}
          aria-label="Upload image for background removal"
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">Click or drag image here</p>
            <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={reset}
              disabled={loading}
              className="px-4 py-2.5 border border-border rounded-xl text-sm hover:bg-muted transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Upload New Image
            </button>
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                AI removing background... (first run downloads the model)
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Preview */}
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Original Image
              </p>
              {originalUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full rounded-xl border border-border max-h-[400px] object-contain bg-muted"
                />
              )}
            </div>

            {/* Processed Result */}
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-emerald-500" /> Removed Background
              </p>
              <div
                className="w-full rounded-xl border border-border min-h-[200px] flex items-center justify-center relative overflow-hidden bg-muted"
                style={{
                  background: resultUrl
                    ? "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50% / 20px 20px"
                    : undefined,
                }}
              >
                {loading ? (
                  <div className="flex flex-col items-center gap-3 p-8 text-center">
                    <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm font-medium text-foreground">AI processing locally...</p>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Downloading & initializing ONNX AI model (takes a few seconds on first launch).
                    </p>
                  </div>
                ) : resultUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resultUrl}
                    alt="Background removed"
                    className="w-full max-h-[400px] object-contain"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground p-8 text-center">
                    AI process will run automatically.
                  </div>
                )}
              </div>

              {resultUrl && !loading && (
                <a
                  href={resultUrl}
                  download={`bg-removed-${file.name.substring(0, file.name.lastIndexOf(".")) || file.name}.png`}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download PNG
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
