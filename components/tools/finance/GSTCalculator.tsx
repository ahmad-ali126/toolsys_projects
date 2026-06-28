"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

export function GSTCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [calcType, setCalcType] = useState<"add" | "remove">("add");

  let baseAmount: number, gstAmount: number, totalAmount: number;
  if (calcType === "add") {
    baseAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    totalAmount = amount + gstAmount;
  } else {
    totalAmount = amount;
    baseAmount = amount / (1 + gstRate / 100);
    gstAmount = totalAmount - baseAmount;
  }
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
        <h3 className="text-base font-semibold text-card-foreground">GST Parameters</h3>
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="gst-amount" className="block text-sm font-medium mb-1.5">
            {calcType === "add" ? `Base Amount (${getCurrencySymbol(currency)})` : `GST-Inclusive Amount (${getCurrencySymbol(currency)})`}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {getCurrencySymbol(currency)}
            </span>
            <input
              id="gst-amount"
              type="number"
              value={amount}
              onChange={e => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Amount"
            />
          </div>
        </div>
        <div>
          <label htmlFor="gst-rate" className="block text-sm font-medium mb-1.5">GST Rate</label>
          <div className="flex gap-2">
            {[5, 12, 18, 28].map(r => (
              <button key={r} onClick={() => setGstRate(r)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${gstRate === r ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/30"}`} aria-label={`${r}% GST rate`}>{r}%</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Calculation Type</label>
          <div className="flex gap-2">
            <button onClick={() => setCalcType("add")} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${calcType === "add" ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/30"}`}>Add GST</button>
            <button onClick={() => setCalcType("remove")} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${calcType === "remove" ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/30"}`}>Remove GST</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="rounded-xl bg-muted/50 border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Base Amount</p>
          <p className="text-lg font-bold">{formatCurrency(baseAmount, currency)}</p>
        </div>
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">GST ({gstRate}%)</p>
          <p className="text-lg font-bold text-primary">{formatCurrency(gstAmount, currency)}</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">CGST ({gstRate / 2}%)</p>
          <p className="text-lg font-bold">{formatCurrency(cgst, currency)}</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">SGST ({gstRate / 2}%)</p>
          <p className="text-lg font-bold">{formatCurrency(sgst, currency)}</p>
        </div>
        <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total</p>
          <p className="text-lg font-bold text-emerald-600">{formatCurrency(totalAmount, currency)}</p>
        </div>
      </div>
    </div>
  );
}
