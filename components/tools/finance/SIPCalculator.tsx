"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

export function SIPCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const results = useMemo(() => {
    const P = monthlyInvestment;
    const i = expectedReturn / 100 / 12; // monthly rate
    const n = timePeriod * 12; // total months

    if (i === 0) {
      const totalInvestment = P * n;
      return { totalInvestment, estimatedReturns: 0, totalValue: totalInvestment };
    }

    // M = P × [{(1+i)^n – 1}/i] × (1+i)
    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvestment = P * n;
    const estimatedReturns = totalValue - totalInvestment;

    return {
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(totalValue),
    };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const investmentPercent =
    results.totalValue > 0
      ? (results.totalInvestment / results.totalValue) * 100
      : 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            SIP Calculator
          </h2>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        {/* Monthly Investment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="sip-monthly"
              className="text-sm font-medium text-foreground"
            >
              Monthly Investment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {getCurrencySymbol(currency)}
              </span>
              <input
                id="sip-monthly"
                type="number"
                value={monthlyInvestment}
                onChange={(e) =>
                  setMonthlyInvestment(
                    Math.max(500, Math.min(1000000, Number(e.target.value)))
                  )
                }
                aria-label={`Monthly investment amount in ${currency}`}
                className="w-32 rounded-lg border border-border bg-background py-1.5 pl-7 pr-3 text-right text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <input
            type="range"
            min={500}
            max={100000}
            step={500}
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            aria-label="Monthly investment slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{getCurrencySymbol(currency)}500</span>
            <span>{formatCurrency(100000, currency)}</span>
          </div>
        </div>

        {/* Expected Return Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="sip-return"
              className="text-sm font-medium text-foreground"
            >
              Expected Return Rate (p.a.)
            </label>
            <div className="relative">
              <input
                id="sip-return"
                type="number"
                step={0.5}
                value={expectedReturn}
                onChange={(e) =>
                  setExpectedReturn(
                    Math.max(1, Math.min(30, Number(e.target.value)))
                  )
                }
                aria-label="Expected annual return rate percentage"
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
            max={30}
            step={0.5}
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            aria-label="Expected return rate slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Time Period */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="sip-time"
              className="text-sm font-medium text-foreground"
            >
              Time Period
            </label>
            <div className="relative">
              <input
                id="sip-time"
                type="number"
                value={timePeriod}
                onChange={(e) =>
                  setTimePeriod(
                    Math.max(1, Math.min(40, Number(e.target.value)))
                  )
                }
                aria-label="Investment time period in years"
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
            max={40}
            step={1}
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            aria-label="Time period slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Yr</span>
            <span>40 Yr</span>
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
            <p className="text-xs text-muted-foreground mb-1">
              Invested Amount
            </p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(results.totalInvestment, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Est. Returns</p>
            <p className="text-lg font-bold" style={{ color: "hsl(var(--primary))" }}>
              {formatCurrency(results.estimatedReturns, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Value</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(results.totalValue, currency)}
            </p>
          </div>
        </div>

        {/* Comparison Bar */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Investment vs Returns
          </p>
          <div className="w-full h-8 rounded-full overflow-hidden flex bg-[hsl(var(--muted))]">
            <div
              className="h-full rounded-l-full flex items-center justify-center text-xs font-medium text-white transition-all duration-500"
              style={{
                width: `${Math.max(investmentPercent, 5)}%`,
                backgroundColor: "hsl(var(--primary))",
              }}
            >
              {investmentPercent > 15 && `${investmentPercent.toFixed(0)}%`}
            </div>
            <div
              className="h-full rounded-r-full flex items-center justify-center text-xs font-medium text-white transition-all duration-500"
              style={{
                width: `${Math.max(100 - investmentPercent, 5)}%`,
                backgroundColor: "hsl(142 71% 45%)",
              }}
            >
              {100 - investmentPercent > 15 &&
                `${(100 - investmentPercent).toFixed(0)}%`}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--primary))" }}
              />
              Invested
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "hsl(142 71% 45%)" }}
              />
              Returns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
