"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

const FREQUENCIES = [
  { label: "Annually", value: 1 },
  { label: "Semi-Annually", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
] as const;

export function CompoundInterestCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(5);
  const [frequency, setFrequency] = useState(1);

  const results = useMemo(() => {
    const P = principal;
    const r = rate / 100;
    const n = frequency;
    const t = time;

    // A = P(1 + r/n)^(nt)
    const totalAmount = P * Math.pow(1 + r / n, n * t);
    const totalInterest = totalAmount - P;

    return {
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
    };
  }, [principal, rate, time, frequency]);

  const principalPercent =
    results.totalAmount > 0 ? (principal / results.totalAmount) * 100 : 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            Compound Interest Calculator
          </h2>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        {/* Principal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ci-principal"
              className="text-sm font-medium text-foreground"
            >
              Principal Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {getCurrencySymbol(currency)}
              </span>
              <input
                id="ci-principal"
                type="number"
                value={principal}
                onChange={(e) =>
                  setPrincipal(
                    Math.max(100, Math.min(1000000000, Number(e.target.value)))
                  )
                }
                aria-label={`Principal amount in ${currency}`}
                className="w-40 rounded-lg border border-border bg-background py-1.5 pl-7 pr-3 text-right text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <input
            type="range"
            min={1000}
            max={10000000}
            step={1000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            aria-label="Principal amount slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(1000, currency)}</span>
            <span>{formatCurrency(10000000, currency)}</span>
          </div>
        </div>

        {/* Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ci-rate"
              className="text-sm font-medium text-foreground"
            >
              Annual Interest Rate
            </label>
            <div className="relative">
              <input
                id="ci-rate"
                type="number"
                step={0.1}
                value={rate}
                onChange={(e) =>
                  setRate(Math.max(0.1, Math.min(50, Number(e.target.value))))
                }
                aria-label="Annual interest rate percentage"
                className="w-24 rounded-lg border border-border bg-background py-1.5 pl-3 pr-7 text-right text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                %
              </span>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            aria-label="Interest rate slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Time Period */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ci-time"
              className="text-sm font-medium text-foreground"
            >
              Time Period
            </label>
            <div className="relative">
              <input
                id="ci-time"
                type="number"
                value={time}
                onChange={(e) =>
                  setTime(Math.max(1, Math.min(50, Number(e.target.value))))
                }
                aria-label="Time period in years"
                className="w-24 rounded-lg border border-border bg-background py-1.5 pl-3 pr-10 text-right text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                Yr
              </span>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            aria-label="Time period slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Yr</span>
            <span>50 Yr</span>
          </div>
        </div>

        {/* Compounding Frequency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Compounding Frequency
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFrequency(f.value)}
                aria-label={`Compound ${f.label.toLowerCase()}`}
                aria-pressed={frequency === f.value}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  frequency === f.value
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
                    : "border-border bg-background text-muted-foreground hover:border-[hsl(var(--primary)/0.3)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <h3 className="text-base font-semibold text-card-foreground">
          Results
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Principal</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(principal, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Total Interest
            </p>
            <p
              className="text-lg font-bold"
              style={{ color: "hsl(142 71% 45%)" }}
            >
              {formatCurrency(results.totalInterest, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
            <p className="text-lg font-bold" style={{ color: "hsl(var(--primary))" }}>
              {formatCurrency(results.totalAmount, currency)}
            </p>
          </div>
        </div>

        {/* Comparison Bar */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Principal vs Interest
          </p>
          <div className="w-full h-8 rounded-full overflow-hidden flex bg-[hsl(var(--muted))]">
            <div
              className="h-full rounded-l-full flex items-center justify-center text-xs font-medium text-white transition-all duration-500"
              style={{
                width: `${Math.max(principalPercent, 5)}%`,
                backgroundColor: "hsl(var(--primary))",
              }}
            >
              {principalPercent > 15 && `${principalPercent.toFixed(0)}%`}
            </div>
            <div
              className="h-full rounded-r-full flex items-center justify-center text-xs font-medium text-white transition-all duration-500"
              style={{
                width: `${Math.max(100 - principalPercent, 5)}%`,
                backgroundColor: "hsl(142 71% 45%)",
              }}
            >
              {100 - principalPercent > 15 &&
                `${(100 - principalPercent).toFixed(0)}%`}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--primary))" }}
              />
              Principal
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "hsl(142 71% 45%)" }}
              />
              Interest
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
