import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

export function formatCurrency(amount: number, currency = "USD"): string {
  const locales: Record<string, string> = {
    USD: "en-US",
    EUR: "en-IE",
    GBP: "en-GB",
    INR: "en-IN",
    CAD: "en-CA",
    AUD: "en-AU",
    JPY: "ja-JP",
    ZAR: "en-ZA",
    SGD: "en-SG",
  };
  const locale = locales[currency] || "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
