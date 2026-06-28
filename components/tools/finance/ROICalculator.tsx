"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

export function ROICalculator() {
  const [currency, setCurrency] = useState("USD");
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [finalValue, setFinalValue] = useState(150000);
  const [years, setYears] = useState(3);

  const netProfit = finalValue - initialInvestment;
  const roi = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;
  const annualizedROI = initialInvestment > 0 && years > 0 ? (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
        <h3 className="text-base font-semibold text-card-foreground">ROI Parameters</h3>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="roi-initial" className="block text-sm font-medium mb-1.5">
            Initial Investment ({getCurrencySymbol(currency)})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {getCurrencySymbol(currency)}
            </span>
            <input
              id="roi-initial"
              type="number"
              value={initialInvestment}
              onChange={e => setInitialInvestment(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Initial investment"
            />
          </div>
        </div>
        <div>
          <label htmlFor="roi-final" className="block text-sm font-medium mb-1.5">
            Final Value ({getCurrencySymbol(currency)})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {getCurrencySymbol(currency)}
            </span>
            <input
              id="roi-final"
              type="number"
              value={finalValue}
              onChange={e => setFinalValue(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Final value"
            />
          </div>
        </div>
        <div>
          <label htmlFor="roi-years" className="block text-sm font-medium mb-1.5">Time Period (Years)</label>
          <input id="roi-years" type="number" step="0.5" value={years} onChange={e => setYears(Math.max(0.1, Number(e.target.value)))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Time period in years" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">ROI</p>
          <p className="text-2xl font-bold text-primary">{roi.toFixed(2)}%</p>
        </div>
        <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Annualized ROI</p>
          <p className="text-2xl font-bold text-emerald-600">{annualizedROI.toFixed(2)}%</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Net Profit</p>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{formatCurrency(netProfit, currency)}</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Return</p>
          <p className="text-2xl font-bold">{formatCurrency(finalValue, currency)}</p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-muted/30 border border-border text-sm text-muted-foreground">
        <p><strong>ROI Formula:</strong> ROI = [(Final Value - Initial Cost) / Initial Cost] × 100</p>
        <p className="mt-1"><strong>Annualized ROI Formula:</strong> (Final/Initial)^(1/Years) - 1</p>
      </div>
    </div>
  );
}
