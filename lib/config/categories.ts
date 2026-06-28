import {
  Image,
  Calculator,
  FileText,
  Search,
  Code2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  toolCount: number;
  faqs: Array<{ question: string; answer: string }>;
}

export const categories: Category[] = [
  {
    slug: "image-tools",
    name: "Image Tools",
    description:
      "Compress, convert, resize, and edit images online for free. Support for PNG, JPG, WebP, and more.",
    icon: Image,
    color: "text-violet-500",
    gradient: "from-violet-500/20 to-violet-600/5",
    toolCount: 6,
    faqs: [
      {
        question: "Are image tools free to use?",
        answer:
          "Yes, all image tools on Toolsys are 100% free with no sign-up required.",
      },
      {
        question: "Is my image data secure?",
        answer:
          "All image processing happens in your browser. We never upload your images to our servers.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "We support JPG, PNG, WebP, GIF, BMP, and TIFF formats across our various image tools.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Most tools support files up to 10MB. For best performance we recommend files under 5MB.",
      },
      {
        question: "Can I use these tools on mobile?",
        answer:
          "Yes, all tools are fully responsive and work on mobile, tablet, and desktop.",
      },
    ],
  },
  {
    slug: "finance-tools",
    name: "Finance Tools",
    description:
      "Calculate SIP returns, EMI payments, compound interest, mortgage, ROI, GST, and more financial metrics.",
    icon: Calculator,
    color: "text-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    toolCount: 9,
    faqs: [
      {
        question: "How accurate are the finance calculators?",
        answer:
          "Our calculators use standard financial formulas and are highly accurate for planning purposes.",
      },
      {
        question: "Are the calculators free?",
        answer: "Yes, all finance calculators are completely free to use.",
      },
      {
        question: "Do you store my financial data?",
        answer:
          "No. All calculations happen in your browser and no data is stored or transmitted.",
      },
      {
        question: "Can I use the EMI calculator for car loans?",
        answer:
          "Yes, the EMI calculator works for home loans, car loans, personal loans, and any fixed-rate loan.",
      },
      {
        question: "What currency do the calculators use?",
        answer:
          "Calculators default to INR (Indian Rupee) but the formulas are universal for any currency.",
      },
    ],
  },
  {
    slug: "pdf-tools",
    name: "PDF Tools",
    description:
      "Compress, merge, split, and convert PDF files. Convert PDF to Word and Word to PDF instantly.",
    icon: FileText,
    color: "text-rose-500",
    gradient: "from-rose-500/20 to-rose-600/5",
    toolCount: 5,
    faqs: [
      {
        question: "Are PDF tools safe to use?",
        answer:
          "Yes. Files are processed securely and deleted immediately after conversion.",
      },
      {
        question: "What is the maximum PDF file size?",
        answer: "We support PDF files up to 100MB per file.",
      },
      {
        question: "Can I merge more than 2 PDFs?",
        answer: "Yes, you can merge up to 20 PDF files at once.",
      },
      {
        question: "Does PDF to Word preserve formatting?",
        answer:
          "We preserve formatting as accurately as possible, though complex layouts may need minor adjustments.",
      },
      {
        question: "Is there a daily limit on PDF conversions?",
        answer: "No daily limits. Convert as many files as you need for free.",
      },
    ],
  },
  {
    slug: "seo-tools",
    name: "SEO Tools",
    description:
      "Generate meta tags, schema markup, robots.txt, XML sitemaps, UTM links, and check keyword density.",
    icon: Search,
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-600/5",
    toolCount: 6,
    faqs: [
      {
        question: "What SEO tools are available?",
        answer:
          "We offer meta tag generator, schema markup generator, robots.txt generator, XML sitemap generator, UTM builder, and keyword density checker.",
      },
      {
        question: "Do I need technical knowledge to use SEO tools?",
        answer:
          "No. Our tools are designed for beginners and experts alike with clear instructions.",
      },
      {
        question: "Is the schema markup valid?",
        answer:
          "Yes, generated schema follows Google's structured data guidelines and can be validated with Google's Rich Results Test.",
      },
      {
        question: "Can I generate a sitemap for any website?",
        answer:
          "You can use our generator to create a sitemap template and customize URLs for your website.",
      },
      {
        question: "Are the generated meta tags SEO optimized?",
        answer:
          "Yes, our meta tag generator follows current best practices including optimal character lengths.",
      },
    ],
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description:
      "Format JSON, generate secure passwords, create UUIDs, and access essential developer utilities.",
    icon: Code2,
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-600/5",
    toolCount: 3,
    faqs: [
      {
        question: "Is the JSON formatter free?",
        answer: "Yes, completely free with syntax highlighting and validation.",
      },
      {
        question: "How secure is the password generator?",
        answer:
          "We use the Web Crypto API to generate cryptographically secure random passwords.",
      },
      {
        question: "What UUID version does the generator produce?",
        answer: "We generate UUID v4 (random) by default, the most widely used version.",
      },
      {
        question: "Can I use developer tools without an account?",
        answer: "Yes, no account or sign-up is required for any tool.",
      },
      {
        question: "Do you store my JSON or password data?",
        answer:
          "No. All processing happens in your browser. Nothing is sent to our servers.",
      },
    ],
  },
  {
    slug: "utility-tools",
    name: "Utility Tools",
    description:
      "Generate QR codes, access everyday utilities, and solve common digital tasks online for free.",
    icon: Wrench,
    color: "text-cyan-500",
    gradient: "from-cyan-500/20 to-cyan-600/5",
    toolCount: 1,
    faqs: [
      {
        question: "What utility tools are available?",
        answer:
          "Currently we offer a QR code generator with more tools being added regularly.",
      },
      {
        question: "Can I download generated QR codes?",
        answer: "Yes, you can download QR codes as PNG images.",
      },
      {
        question: "Are there any usage limits?",
        answer: "No limits. Use all utility tools as many times as you need.",
      },
      {
        question: "Do utility tools work offline?",
        answer:
          "Some tools like QR code generator work fully in the browser and can function offline.",
      },
      {
        question: "Will more utility tools be added?",
        answer:
          "Yes! We regularly add new tools based on user feedback and demand.",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
