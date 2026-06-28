"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Shield } from "lucide-react";

interface PasswordConfig {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  count: number;
}

type Strength = "weak" | "medium" | "strong" | "very strong";

function getCharacterSet(config: PasswordConfig): string {
  const ambiguousChars = "Il1O0o";
  let chars = "";

  if (config.lowercase) {
    chars += "abcdefghijklmnopqrstuvwxyz";
  }
  if (config.uppercase) {
    chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (config.numbers) {
    chars += "0123456789";
  }
  if (config.symbols) {
    chars += "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";
  }

  if (config.excludeAmbiguous) {
    chars = chars
      .split("")
      .filter((c) => !ambiguousChars.includes(c))
      .join("");
  }

  return chars;
}

function generatePassword(config: PasswordConfig): string {
  const chars = getCharacterSet(config);
  if (!chars.length) return "";

  const array = new Uint32Array(config.length);
  crypto.getRandomValues(array);

  return Array.from(array, (val) => chars[val % chars.length]).join("");
}

function calculateStrength(config: PasswordConfig): { strength: Strength; score: number } {
  let score = 0;
  const typesUsed = [config.uppercase, config.lowercase, config.numbers, config.symbols].filter(
    Boolean
  ).length;

  // Length scoring
  if (config.length >= 8) score += 1;
  if (config.length >= 12) score += 1;
  if (config.length >= 16) score += 1;
  if (config.length >= 24) score += 1;

  // Character diversity scoring
  score += typesUsed;

  let strength: Strength;
  if (score <= 2) strength = "weak";
  else if (score <= 4) strength = "medium";
  else if (score <= 6) strength = "strong";
  else strength = "very strong";

  // Normalize score to 0-100
  const normalizedScore = Math.min((score / 8) * 100, 100);

  return { strength, score: normalizedScore };
}

const strengthColors: Record<Strength, string> = {
  weak: "bg-red-500",
  medium: "bg-yellow-500",
  strong: "bg-blue-500",
  "very strong": "bg-green-500",
};

const strengthTextColors: Record<Strength, string> = {
  weak: "text-red-500",
  medium: "text-yellow-500",
  strong: "text-blue-500",
  "very strong": "text-green-500",
};

export function PasswordGenerator() {
  const [config, setConfig] = useState<PasswordConfig>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
    count: 1,
  });

  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const { strength, score } = calculateStrength(config);

  const handleGenerate = useCallback(() => {
    const chars = getCharacterSet(config);
    if (!chars.length) return;

    const newPasswords = Array.from({ length: config.count }, () =>
      generatePassword(config)
    );
    setPasswords(newPasswords);
    setCopiedIndex(null);
  }, [config]);

  const handleCopy = useCallback(async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleCopyAll = useCallback(async () => {
    const allText = passwords.join("\n");
    try {
      await navigator.clipboard.writeText(allText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = allText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, [passwords]);

  const noCharsSelected = !config.uppercase && !config.lowercase && !config.numbers && !config.symbols;

  const updateConfig = (partial: Partial<PasswordConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Configuration */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        {/* Length slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="pw-length" className="text-sm font-medium text-foreground">
              Password Length
            </label>
            <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
              {config.length}
            </span>
          </div>
          <input
            id="pw-length"
            type="range"
            min={8}
            max={128}
            value={config.length}
            onChange={(e) => updateConfig({ length: Number(e.target.value) })}
            className="w-full accent-primary cursor-pointer"
            aria-label="Password length"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Character types */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { key: "uppercase" as const, label: "Uppercase (A-Z)" },
            { key: "lowercase" as const, label: "Lowercase (a-z)" },
            { key: "numbers" as const, label: "Numbers (0-9)" },
            { key: "symbols" as const, label: "Symbols (!@#)" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/50 p-3 cursor-pointer hover:bg-muted transition-colors"
            >
              <input
                type="checkbox"
                checked={config[key]}
                onChange={(e) => updateConfig({ [key]: e.target.checked })}
                className="h-4 w-4 rounded accent-primary"
                aria-label={label}
              />
              <span className="text-sm text-foreground">{label}</span>
            </label>
          ))}
        </div>

        {/* Extra options */}
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={config.excludeAmbiguous}
              onChange={(e) => updateConfig({ excludeAmbiguous: e.target.checked })}
              className="h-4 w-4 rounded accent-primary"
              aria-label="Exclude ambiguous characters"
            />
            <span className="text-sm text-foreground">
              Exclude ambiguous characters (I, l, 1, O, 0, o)
            </span>
          </label>

          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="pw-count" className="text-sm text-muted-foreground">
              Count:
            </label>
            <select
              id="pw-count"
              value={config.count}
              onChange={(e) => updateConfig({ count: Number(e.target.value) })}
              className="rounded-lg border border-border bg-card px-2 py-1.5 text-sm text-foreground"
              aria-label="Number of passwords to generate"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Strength meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              Strength
            </div>
            <span className={`text-sm font-medium capitalize ${strengthTextColors[strength]}`}>
              {strength}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strengthColors[strength]}`}
              style={{ width: `${score}%` }}
              role="progressbar"
              aria-valuenow={score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Password strength: ${strength}`}
            />
          </div>
        </div>

        {noCharsSelected && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
            Please select at least one character type.
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={noCharsSelected}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Generate passwords"
        >
          <RefreshCw className="h-4 w-4" />
          Generate Password{config.count > 1 ? "s" : ""}
        </button>
      </div>

      {/* Generated Passwords */}
      {passwords.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              Generated Password{passwords.length > 1 ? "s" : ""}
            </h3>
            {passwords.length > 1 && (
              <button
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Copy all passwords"
              >
                {copiedIndex === -1 ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Copied All!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy All
                  </>
                )}
              </button>
            )}
          </div>

          {passwords.map((pw, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3"
            >
              <code className="flex-1 break-all font-mono text-sm text-foreground select-all">
                {pw}
              </code>
              <button
                onClick={() => handleCopy(pw, i)}
                className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={`Copy password ${i + 1}`}
              >
                {copiedIndex === i ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
