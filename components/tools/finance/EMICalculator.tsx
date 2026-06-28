"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { CurrencySelector, getCurrencySymbol } from "./CurrencySelector";

export function EMICalculator() {
  const [currency, setCurrency] = useState("USD");
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  const results = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12; // monthly interest rate
    const n = tenure * 12; // total months

    if (r === 0) {
      const emi = P / n;
      return {
        monthlyEMI: Math.round(emi),
        totalInterest: 0,
        totalPayment: Math.round(P),
      };
    }

    // EMI = [P × r × (1+r)^n] / [(1+r)^n – 1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [loanAmount, interestRate, tenure]);

  const principalPercent =
    results.totalPayment > 0
      ? (loanAmount / results.totalPayment) * 100
      : 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            EMI Calculator
          </h2>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        {/* Loan Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="emi-loan"
              className="text-sm font-medium text-foreground"
            >
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {getCurrencySymbol(currency)}
              </span>
              <input
                id="emi-loan"
                type="number"
                value={loanAmount}
                onChange={(e) =>
                  setLoanAmount(
                    Math.max(1000, Math.min(1000000000, Number(e.target.value)))
                  )
                }
                aria-label={`Loan amount in ${currency}`}
                className="w-40 rounded-lg border border-border bg-background py-1.5 pl-7 pr-3 text-right text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <input
            type="range"
            min={10000}
            max={10000000}
            step={10000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            aria-label="Loan amount slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(10000, currency)}</span>
            <span>{formatCurrency(10000000, currency)}</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="emi-rate"
              className="text-sm font-medium text-foreground"
            >
              Interest Rate (p.a.)
            </label>
            <div className="relative">
              <input
                id="emi-rate"
                type="number"
                step={0.1}
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(
                    Math.max(1, Math.min(30, Number(e.target.value)))
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
            max={30}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            aria-label="Interest rate slider"
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="emi-tenure"
              className="text-sm font-medium text-foreground"
            >
              Loan Tenure
            </label>
            <div className="relative">
              <input
                id="emi-tenure"
                type="number"
                value={tenure}
                onChange={(e) =>
                  setTenure(
                    Math.max(1, Math.min(30, Number(e.target.value)))
                  )
                }
                aria-label="Loan tenure in years"
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
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            aria-label="Loan tenure slider"
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
          EMI Breakdown
        </h3>

        {/* Monthly EMI highlight */}
        <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}>
          <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
          <p className="text-3xl font-bold" style={{ color: "hsl(var(--primary))" }}>
            {formatCurrency(results.monthlyEMI, currency)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4">
            <p className="text-xs text-muted-foreground mb-1">
              Principal Amount
            </p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(loanAmount, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--muted))] p-4">
            <p className="text-xs text-muted-foreground mb-1">
              Total Interest
            </p>
            <p className="text-lg font-bold" style={{ color: "hsl(0 84% 60%)" }}>
              {formatCurrency(results.totalInterest, currency)}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[hsl(var(--muted))] p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            Total Payment (Principal + Interest)
          </p>
          <p className="text-xl font-bold text-foreground">
            {formatCurrency(results.totalPayment, currency)}
          </p>
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
                backgroundColor: "hsl(0 84% 60%)",
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
                style={{ backgroundColor: "hsl(0 84% 60%)" }}
              />
              Interest
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
