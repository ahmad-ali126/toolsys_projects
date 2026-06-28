"use client";

import { useState, useCallback } from "react";
import { Download, QrCode, RefreshCw } from "lucide-react";

export function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(300);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQR = useCallback(() => {
    if (!text.trim()) {
      setError("Please enter text or a URL to generate a QR code.");
      return;
    }
    setError(null);
    setLoading(true);

    const encodedText = encodeURIComponent(text.trim());
    const fg = fgColor.replace("#", "");
    const bg = bgColor.replace("#", "");

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&color=${fg}&bgcolor=${bg}&format=png`;
    setQrUrl(url);
    setLoading(false);
  }, [text, fgColor, bgColor, size]);

  const handleDownload = useCallback(async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch {
      setError("Failed to download QR code. Please try right-clicking the image to save it.");
    }
  }, [qrUrl]);

  return (
    <div className="w-full space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          {/* Text/URL input */}
          <div className="space-y-2">
            <label htmlFor="qr-text" className="text-sm font-medium text-foreground">
              Text or URL
            </label>
            <textarea
              id="qr-text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError(null);
              }}
              placeholder="Enter text, URL, email, phone number, etc."
              className="h-28 w-full resize-y rounded-lg border border-border bg-muted/50 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              aria-label="QR code content"
            />
          </div>

          {/* Size selection */}
          <div className="space-y-2">
            <label htmlFor="qr-size" className="text-sm font-medium text-foreground">
              Size
            </label>
            <select
              id="qr-size"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground"
              aria-label="QR code size"
            >
              <option value={150}>150 × 150 px</option>
              <option value={200}>200 × 200 px</option>
              <option value={300}>300 × 300 px</option>
              <option value={400}>400 × 400 px</option>
              <option value={500}>500 × 500 px</option>
            </select>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="qr-fg" className="text-sm font-medium text-foreground">
                Foreground Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="qr-fg"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border border-border"
                  aria-label="Foreground color"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground font-mono"
                  aria-label="Foreground color hex value"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="qr-bg" className="text-sm font-medium text-foreground">
                Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="qr-bg"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border border-border"
                  aria-label="Background color"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground font-mono"
                  aria-label="Background color hex value"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
              {error}
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={generateQR}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            aria-label="Generate QR code"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <QrCode className="h-4 w-4" />
            )}
            Generate QR Code
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center space-y-4">
          {qrUrl ? (
            <>
              <div
                className="rounded-xl border border-border p-4"
                style={{ backgroundColor: bgColor }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  width={size}
                  height={size}
                  className="max-w-full h-auto"
                  onError={() => setError("Failed to generate QR code. Please check your input.")}
                />
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                aria-label="Download QR code"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground py-12">
              <QrCode className="h-16 w-16 opacity-20" />
              <p className="text-sm">QR code preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
