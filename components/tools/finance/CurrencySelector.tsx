"use client";

import { cn } from "@/lib/utils";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar ($)", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro (€)", locale: "en-IE" },
  { code: "GBP", symbol: "£", name: "British Pound (£)", locale: "en-GB" },
  { code: "INR", symbol: "₹", name: "Indian Rupee (₹)", locale: "en-IN" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar (C$)", locale: "en-CA" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar (A$)", locale: "en-AU" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen (¥)", locale: "ja-JP" },
  { code: "ZAR", symbol: "R", name: "South African Rand (R)", locale: "en-ZA" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar (S$)", locale: "en-SG" },
];

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CurrencySelector({ value, onChange, className }: CurrencySelectorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label htmlFor="currency-select" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Currency:
      </label>
      <select
        id="currency-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs font-medium bg-background border border-border rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 cursor-pointer"
        aria-label="Select currency"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function getCurrencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol || "$";
}
