"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Plus, Hash, Trash2 } from "lucide-react";

type UUIDFormat = "standard" | "no-hyphens" | "uppercase";

function generateUUIDv4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Manual fallback implementation
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  // Set version 4
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant 10
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function formatUUID(uuid: string, format: UUIDFormat): string {
  switch (format) {
    case "no-hyphens":
      return uuid.replace(/-/g, "");
    case "uppercase":
      return uuid.toUpperCase();
    case "standard":
    default:
      return uuid;
  }
}

export function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [format, setFormat] = useState<UUIDFormat>("standard");
  const [bulkCount, setBulkCount] = useState(10);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerateSingle = useCallback(() => {
    const uuid = generateUUIDv4();
    setUuids((prev) => [uuid, ...prev]);
  }, []);

  const handleGenerateBulk = useCallback(() => {
    const newUuids = Array.from({ length: bulkCount }, () => generateUUIDv4());
    setUuids((prev) => [...newUuids, ...prev]);
  }, [bulkCount]);

  const handleClear = () => {
    setUuids([]);
    setCopiedIndex(null);
  };

  const handleCopy = useCallback(
    async (uuid: string, index: number) => {
      const formatted = formatUUID(uuid, format);
      try {
        await navigator.clipboard.writeText(formatted);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = formatted;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    },
    [format]
  );

  const handleCopyAll = useCallback(async () => {
    const allFormatted = uuids.map((u) => formatUUID(u, format)).join("\n");
    try {
      await navigator.clipboard.writeText(allFormatted);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = allFormatted;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, [uuids, format]);

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        {/* Format selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Format</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "standard" as const, label: "Standard (with hyphens)", example: "550e8400-e29b-41d4-a716-446655440000" },
              { value: "no-hyphens" as const, label: "No hyphens", example: "550e8400e29b41d4a716446655440000" },
              { value: "uppercase" as const, label: "Uppercase", example: "550E8400-E29B-41D4-A716-446655440000" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFormat(value)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  format === value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-pressed={format === value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleGenerateSingle}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label="Generate single UUID"
          >
            <Plus className="h-4 w-4" />
            Generate UUID
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateBulk}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              aria-label={`Generate ${bulkCount} UUIDs`}
            >
              <Hash className="h-4 w-4" />
              Generate Bulk
            </button>
            <select
              value={bulkCount}
              onChange={(e) => setBulkCount(Number(e.target.value))}
              className="rounded-lg border border-border bg-card px-2 py-2 text-sm text-foreground"
              aria-label="Number of UUIDs to generate"
            >
              {[5, 10, 15, 20, 25, 30, 40, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {uuids.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                aria-label="Copy all UUIDs"
              >
                {copiedIndex === -1 ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    Copied All!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy All
                  </>
                )}
              </button>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Clear all UUIDs"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Generated UUIDs */}
      {uuids.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">
              Generated UUIDs ({uuids.length})
            </h3>
          </div>

          <div className="max-h-96 space-y-1.5 overflow-y-auto pr-1">
            {uuids.map((uuid, i) => {
              const formatted = formatUUID(uuid, format);
              return (
                <div
                  key={`${uuid}-${i}`}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 hover:bg-muted transition-colors"
                >
                  <span className="w-8 shrink-0 text-xs text-muted-foreground text-right">
                    {i + 1}.
                  </span>
                  <code className="flex-1 font-mono text-sm text-foreground select-all break-all">
                    {formatted}
                  </code>
                  <button
                    onClick={() => handleCopy(uuid, i)}
                    className="shrink-0 rounded-md p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all"
                    aria-label={`Copy UUID ${i + 1}`}
                  >
                    {copiedIndex === i ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
