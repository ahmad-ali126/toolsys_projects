"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

export function MortgageCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [homePrice, setHomePrice] = useState(5000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const results = useMemo(() => {
    const downPayment = (homePrice * downPaymentPercent) / 100;
    const loanAmount = homePrice - downPayment;
    const r = interestRate / 100 / 12; // monthly interest rate
    const n = loanTerm * 12; // total months

    if (r === 0 || loanAmount <= 0) {
      return {
        downPayment: Math.round(downPayment),
        loanAmount: Math.round(loanAmount),
        monthlyPayment: n > 0 ? Math.round(loanAmount / n) : 0,
        totalInterest: 0,
        totalCost: Math.round(homePrice),
      };
    }

    // EMI = [P × r × (1+r)^n] / [(1+r)^n – 1]
    const monthlyPayment =
      (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - loanAmount;
    const totalCost = totalPayment + downPayment;

    return {
      downPayment: Math.round(downPayment),
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
    };
  }, [homePrice, downPaymentPercent, interestRate, loanTerm]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            Mortgage Calculator
          </h2>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        {/* Home Price */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="mort-price"
              className="text-sm font-medium text-foreground"
            >
              Home Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {getCurrencySymbol(currency)}
              </span>
              <input
                id="mort-price"
                type="number"
                value={homePrice}
                onChange={(e) =>
                  setHomePrice(
                    Math.max(1000, Math.min(1000000000, Number(e.target.value)))
                  )
                }
                aria-label={`Home price in ${currency}`}
                className="w-44 rounded-lg border border-border bg-background py-1.5 pl-7 pr-3 text-right text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <input
            type="range"
            min={10000}
            max={50000000}
            step={10000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            aria-label="Home price slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(10000, currency)}</span>
            <span>{formatCurrency(50000000, currency)}</span>
          </div>
        </div>

        {/* Down Payment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="mort-down"
              className="text-sm font-medium text-foreground"
            >
              Down Payment
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formatCurrency(results.downPayment, currency)}
              </span>
              <div className="relative">
                <input
                  id="mort-down"
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) =>
                    setDownPaymentPercent(
                      Math.max(0, Math.min(90, Number(e.target.value)))
                    )
                  }
                  aria-label="Down payment percentage"
                  className="w-20 rounded-lg border border-border bg-background py-1.5 pl-3 pr-7 text-right text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={90}
            step={1}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            aria-label="Down payment slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>90%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="mort-rate"
              className="text-sm font-medium text-foreground"
            >
              Interest Rate (p.a.)
            </label>
            <div className="relative">
              <input
                id="mort-rate"
                type="number"
                step={0.1}
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(
                    Math.max(1, Math.min(20, Number(e.target.value)))
                  )
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
            max={20}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            aria-label="Interest rate slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="mort-term"
              className="text-sm font-medium text-foreground"
            >
              Loan Term
            </label>
            <div className="relative">
              <input
                id="mort-term"
                type="number"
                value={loanTerm}
                onChange={(e) =>
                  setLoanTerm(
                    Math.max(1, Math.min(30, Number(e.target.value)))
                  )
                }
                aria-label="Loan term in years"
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
            max={30}
            step={1}
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            aria-label="Loan term slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Yr</span>
            <span>30 Yr</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <h3 className="text-base font-semibold text-card-foreground">
          Mortgage Summary
        </h3>

        {/* Monthly Payment highlight */}
        <div
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}
        >
          <p className="text-sm text-muted-foreground mb-1">
            Monthly Payment (EMI)
          </p>
          <p
            className="text-3xl font-bold"
            style={{ color: "hsl(var(--primary))" }}
          >
            {formatCurrency(results.monthlyPayment, currency)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4">
            <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
            <p className="text-base font-bold text-foreground">
              {formatCurrency(results.loanAmount, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4">
            <p className="text-xs text-muted-foreground mb-1">Down Payment</p>
            <p className="text-base font-bold text-foreground">
              {formatCurrency(results.downPayment, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4">
            <p className="text-xs text-muted-foreground mb-1">
              Total Interest
            </p>
            <p
              className="text-base font-bold"
              style={{ color: "hsl(0 84% 60%)" }}
            >
              {formatCurrency(results.totalInterest, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
            <p className="text-base font-bold text-foreground">
              {formatCurrency(results.totalCost, currency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
