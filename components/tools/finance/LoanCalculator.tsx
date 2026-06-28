"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

export function LoanCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = r > 0 ? (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : amount / n;
  const totalPayment = emi * n;
  const totalInterest = totalPayment - amount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
        <h3 className="text-base font-semibold text-card-foreground">Loan Parameters</h3>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="loan-amount" className="block text-sm font-medium mb-1.5">
            Loan Amount ({getCurrencySymbol(currency)})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {getCurrencySymbol(currency)}
            </span>
            <input
              id="loan-amount"
              type="number"
              value={amount}
              onChange={e => setAmount(Math.max(1000, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Loan amount"
            />
          </div>
          <input type="range" min={10000} max={10000000} step={10000} value={amount} onChange={e => setAmount(+e.target.value)} className="w-full mt-2 accent-primary" />
        </div>
        <div>
          <label htmlFor="loan-rate" className="block text-sm font-medium mb-1.5">Interest Rate (%)</label>
          <input id="loan-rate" type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Interest rate" />
          <input type="range" min={1} max={30} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} className="w-full mt-2 accent-primary" />
        </div>
        <div>
          <label htmlFor="loan-tenure" className="block text-sm font-medium mb-1.5">Tenure (Years)</label>
          <input id="loan-tenure" type="number" value={years} onChange={e => setYears(+e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Loan tenure" />
          <input type="range" min={1} max={30} value={years} onChange={e => setYears(+e.target.value)} className="w-full mt-2 accent-primary" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(emi, currency)}</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-rose-500">{formatCurrency(totalInterest, currency)}</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPayment, currency)}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Principal</span>
          <span>{formatCurrency(amount, currency)}</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500" style={{ width: `${(amount / totalPayment) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Interest</span>
          <span>{formatCurrency(totalInterest, currency)}</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600" style={{ width: `${(totalInterest / totalPayment) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
