"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

export function CAGRCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [beginValue, setBeginValue] = useState(100000);
  const [endValue, setEndValue] = useState(250000);
  const [years, setYears] = useState(5);

  const cagr = beginValue > 0 && years > 0 ? (Math.pow(endValue / beginValue, 1 / years) - 1) * 100 : 0;
  const absoluteReturn = beginValue > 0 ? ((endValue - beginValue) / beginValue) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
        <h3 className="text-base font-semibold text-card-foreground">CAGR Parameters</h3>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="cagr-begin" className="block text-sm font-medium mb-1.5">
            Beginning Value ({getCurrencySymbol(currency)})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {getCurrencySymbol(currency)}
            </span>
            <input
              id="cagr-begin"
              type="number"
              value={beginValue}
              onChange={e => setBeginValue(Math.max(0.1, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Beginning value"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cagr-end" className="block text-sm font-medium mb-1.5">
            Ending Value ({getCurrencySymbol(currency)})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {getCurrencySymbol(currency)}
            </span>
            <input
              id="cagr-end"
              type="number"
              value={endValue}
              onChange={e => setEndValue(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Ending value"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cagr-years" className="block text-sm font-medium mb-1.5">Number of Years</label>
          <input id="cagr-years" type="number" step="0.5" value={years} onChange={e => setYears(Math.max(0.1, Number(e.target.value)))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Number of years" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">CAGR</p>
          <p className="text-3xl font-bold text-primary">{cagr.toFixed(2)}%</p>
          <p className="text-xs text-muted-foreground mt-1">per annum</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Absolute Return</p>
          <p className={`text-2xl font-bold ${absoluteReturn >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{absoluteReturn.toFixed(2)}%</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Net Gain</p>
          <p className={`text-2xl font-bold ${endValue - beginValue >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{formatCurrency(endValue - beginValue, currency)}</p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-muted/30 border border-border text-sm text-muted-foreground">
        <p><strong>CAGR Formula:</strong> CAGR = (Ending Value / Beginning Value)^(1/Years) - 1</p>
      </div>
    </div>
  );
}
