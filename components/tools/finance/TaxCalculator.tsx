"use client";

import { useState, useMemo } from "react";

function calcOldRegimeTax(income: number, deductions80C: number, deductions80D: number, hra: number) {
  const standardDeduction = 50000;
  const total80C = Math.min(deductions80C, 150000);
  const totalDeductions = standardDeduction + total80C + deductions80D + hra;
  const taxable = Math.max(income - totalDeductions, 0);

  let tax = 0;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.3;
  if (taxable > 500000) tax += Math.min(taxable - 500000, 500000) * 0.2;
  if (taxable > 250000) tax += Math.min(taxable - 250000, 250000) * 0.05;

  const cess = tax * 0.04;
  return { taxable, tax, cess, total: tax + cess, deductions: totalDeductions };
}

function calcNewRegimeTax(income: number) {
  const standardDeduction = 75000;
  const taxable = Math.max(income - standardDeduction, 0);

  let tax = 0;
  const slabs = [
    { limit: 300000, rate: 0 },
    { limit: 700000, rate: 0.05 },
    { limit: 1000000, rate: 0.10 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ];

  let remaining = taxable;
  let prev = 0;
  for (const slab of slabs) {
    const slabAmount = Math.min(remaining, slab.limit - prev);
    if (slabAmount <= 0) break;
    tax += slabAmount * slab.rate;
    remaining -= slabAmount;
    prev = slab.limit;
  }

  // Rebate u/s 87A for income up to 7L under new regime
  if (taxable <= 700000) tax = 0;

  const cess = tax * 0.04;
  return { taxable, tax, cess, total: tax + cess };
}

export function TaxCalculator() {
  const [income, setIncome] = useState(1200000);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deductions80D, setDeductions80D] = useState(25000);
  const [hra, setHra] = useState(0);

  const oldResult = useMemo(() => calcOldRegimeTax(income, deductions80C, deductions80D, hra), [income, deductions80C, deductions80D, hra]);
  const newResult = useMemo(() => calcNewRegimeTax(income), [income]);
  const recommended = newResult.total <= oldResult.total ? "New" : "Old";

  const fmt = (v: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tax-income" className="block text-sm font-medium mb-1.5">Annual Income (₹)</label>
          <input id="tax-income" type="number" value={income} onChange={e => setIncome(+e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Annual income" />
          <input type="range" min={0} max={5000000} step={50000} value={income} onChange={e => setIncome(+e.target.value)} className="w-full mt-2 accent-primary" />
        </div>
        <div className="space-y-3">
          <div>
            <label htmlFor="tax-80c" className="block text-xs font-medium mb-1">Section 80C Deductions (₹) <span className="text-muted-foreground">max ₹1.5L</span></label>
            <input id="tax-80c" type="number" value={deductions80C} onChange={e => setDeductions80C(+e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="80C deductions" />
          </div>
          <div>
            <label htmlFor="tax-80d" className="block text-xs font-medium mb-1">Section 80D (Health Insurance ₹)</label>
            <input id="tax-80d" type="number" value={deductions80D} onChange={e => setDeductions80D(+e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="80D deductions" />
          </div>
          <div>
            <label htmlFor="tax-hra" className="block text-xs font-medium mb-1">HRA Exemption (₹)</label>
            <input id="tax-hra" type="number" value={hra} onChange={e => setHra(+e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="HRA exemption" />
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className={`rounded-xl p-4 text-center font-semibold border ${recommended === "New" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400" : "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400"}`}>
        ✅ {recommended} Tax Regime saves you {fmt(Math.abs(newResult.total - oldResult.total))} more
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Regime */}
        <div className={`rounded-2xl border p-5 space-y-3 ${recommended === "Old" ? "border-primary/40 bg-primary/5" : "border-border"}`}>
          <h3 className="font-bold text-lg">Old Tax Regime</h3>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Gross Income</span><span>{fmt(income)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Deductions</span><span className="text-emerald-600">-{fmt(oldResult.deductions)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Taxable Income</span><span>{fmt(oldResult.taxable)}</span></div>
            <hr className="border-border" />
            <div className="flex justify-between"><span className="text-muted-foreground">Income Tax</span><span>{fmt(oldResult.tax)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cess (4%)</span><span>{fmt(oldResult.cess)}</span></div>
            <div className="flex justify-between font-bold text-base pt-1"><span>Total Tax</span><span className="text-rose-500">{fmt(oldResult.total)}</span></div>
          </div>
        </div>

        {/* New Regime */}
        <div className={`rounded-2xl border p-5 space-y-3 ${recommended === "New" ? "border-primary/40 bg-primary/5" : "border-border"}`}>
          <h3 className="font-bold text-lg">New Tax Regime</h3>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Gross Income</span><span>{fmt(income)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Standard Deduction</span><span className="text-emerald-600">-{fmt(75000)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Taxable Income</span><span>{fmt(newResult.taxable)}</span></div>
            <hr className="border-border" />
            <div className="flex justify-between"><span className="text-muted-foreground">Income Tax</span><span>{fmt(newResult.tax)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cess (4%)</span><span>{fmt(newResult.cess)}</span></div>
            <div className="flex justify-between font-bold text-base pt-1"><span>Total Tax</span><span className="text-rose-500">{fmt(newResult.total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
