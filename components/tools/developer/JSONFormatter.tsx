"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Braces, Minimize2, ShieldCheck, Trash2 } from "lucide-react";

export function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const clearError = () => setError(null);

  const handleFormat = useCallback(() => {
    clearError();
    if (!input.trim()) {
      setError("Please enter JSON to format.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const match = msg.match(/position (\d+)/i);
      if (match) {
        const pos = parseInt(match[1], 10);
        const beforeError = input.substring(0, pos);
        const lineNumber = beforeError.split("\n").length;
        setError(`Error at line ${lineNumber}: ${msg}`);
      } else {
        setError(msg);
      }
    }
  }, [input, indentSize]);

  const handleMinify = useCallback(() => {
    clearError();
    if (!input.trim()) {
      setError("Please enter JSON to minify.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    clearError();
    if (!input.trim()) {
      setError("Please enter JSON to validate.");
      return;
    }
    try {
      JSON.parse(input);
      setError(null);
      setOutput("✅ Valid JSON");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const match = msg.match(/position (\d+)/i);
      if (match) {
        const pos = parseInt(match[1], 10);
        const beforeError = input.substring(0, pos);
        const lineNumber = beforeError.split("\n").length;
        setError(`❌ Invalid JSON at line ${lineNumber}: ${msg}`);
      } else {
        setError(`❌ Invalid JSON: ${msg}`);
      }
    }
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleFormat}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          aria-label="Format JSON"
        >
          <Braces className="h-4 w-4" />
          Format / Beautify
        </button>
        <button
          onClick={handleMinify}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          aria-label="Minify JSON"
        >
          <Minimize2 className="h-4 w-4" />
          Minify
        </button>
        <button
          onClick={handleValidate}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          aria-label="Validate JSON"
        >
          <ShieldCheck className="h-4 w-4" />
          Validate
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          aria-label="Clear all"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="indent-size" className="text-sm text-muted-foreground">
            Indent:
          </label>
          <select
            id="indent-size"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="rounded-lg border border-border bg-card px-2 py-1.5 text-sm text-foreground"
            aria-label="Indentation size"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Input / Output */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-sm font-medium text-foreground">
            Input JSON
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              clearError();
            }}
            placeholder='{"key": "value", "array": [1, 2, 3]}'
            className="h-80 w-full resize-y rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            spellCheck={false}
            aria-label="JSON input"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Output</label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Copy output to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="h-80 w-full overflow-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm text-foreground whitespace-pre-wrap break-words">
            {output || <span className="text-muted-foreground italic">Output will appear here…</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
