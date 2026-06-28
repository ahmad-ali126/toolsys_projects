"use client";

import dynamic from "next/dynamic";
import type { Tool } from "@/lib/config/tools";

// ── Lazy-loaded tool components ──────────────────────────────────────────────
// Each tool is dynamically imported to keep the main bundle small.

// Image Tools
const ImageCompressor = dynamic(() => import("@/components/tools/image/ImageCompressor").then(m => ({ default: m.ImageCompressor })), { loading: () => <ToolLoading /> });
const BackgroundRemover = dynamic(() => import("@/components/tools/image/BackgroundRemover").then(m => ({ default: m.BackgroundRemover })), { loading: () => <ToolLoading /> });
const WebPConverter = dynamic(() => import("@/components/tools/image/WebPConverter").then(m => ({ default: m.WebPConverter })), { loading: () => <ToolLoading /> });
const PNGToJPG = dynamic(() => import("@/components/tools/image/PNGToJPG").then(m => ({ default: m.PNGToJPG })), { loading: () => <ToolLoading /> });
const JPGToPNG = dynamic(() => import("@/components/tools/image/JPGToPNG").then(m => ({ default: m.JPGToPNG })), { loading: () => <ToolLoading /> });
const ImageResizer = dynamic(() => import("@/components/tools/image/ImageResizer").then(m => ({ default: m.ImageResizer })), { loading: () => <ToolLoading /> });

// Finance Tools
const SIPCalculator = dynamic(() => import("@/components/tools/finance/SIPCalculator").then(m => ({ default: m.SIPCalculator })), { loading: () => <ToolLoading /> });
const EMICalculator = dynamic(() => import("@/components/tools/finance/EMICalculator").then(m => ({ default: m.EMICalculator })), { loading: () => <ToolLoading /> });
const CompoundInterestCalculator = dynamic(() => import("@/components/tools/finance/CompoundInterestCalculator").then(m => ({ default: m.CompoundInterestCalculator })), { loading: () => <ToolLoading /> });
const MortgageCalculator = dynamic(() => import("@/components/tools/finance/MortgageCalculator").then(m => ({ default: m.MortgageCalculator })), { loading: () => <ToolLoading /> });
const LoanCalculator = dynamic(() => import("@/components/tools/finance/LoanCalculator").then(m => ({ default: m.LoanCalculator })), { loading: () => <ToolLoading /> });
const ROICalculator = dynamic(() => import("@/components/tools/finance/ROICalculator").then(m => ({ default: m.ROICalculator })), { loading: () => <ToolLoading /> });
const CAGRCalculator = dynamic(() => import("@/components/tools/finance/CAGRCalculator").then(m => ({ default: m.CAGRCalculator })), { loading: () => <ToolLoading /> });
const GSTCalculator = dynamic(() => import("@/components/tools/finance/GSTCalculator").then(m => ({ default: m.GSTCalculator })), { loading: () => <ToolLoading /> });
const TaxCalculator = dynamic(() => import("@/components/tools/finance/TaxCalculator").then(m => ({ default: m.TaxCalculator })), { loading: () => <ToolLoading /> });

// PDF Tools
const PDFCompressor = dynamic(() => import("@/components/tools/pdf/PDFCompressor").then(m => ({ default: m.PDFCompressor })), { loading: () => <ToolLoading /> });
const PDFMerger = dynamic(() => import("@/components/tools/pdf/PDFMerger").then(m => ({ default: m.PDFMerger })), { loading: () => <ToolLoading /> });
const PDFSplitter = dynamic(() => import("@/components/tools/pdf/PDFSplitter").then(m => ({ default: m.PDFSplitter })), { loading: () => <ToolLoading /> });
const PDFToWord = dynamic(() => import("@/components/tools/pdf/PDFToWord").then(m => ({ default: m.PDFToWord })), { loading: () => <ToolLoading /> });
const WordToPDF = dynamic(() => import("@/components/tools/pdf/WordToPDF").then(m => ({ default: m.WordToPDF })), { loading: () => <ToolLoading /> });

// SEO Tools
const MetaTagGenerator = dynamic(() => import("@/components/tools/seo/MetaTagGenerator").then(m => ({ default: m.MetaTagGenerator })), { loading: () => <ToolLoading /> });
const SchemaMarkupGenerator = dynamic(() => import("@/components/tools/seo/SchemaMarkupGenerator").then(m => ({ default: m.SchemaMarkupGenerator })), { loading: () => <ToolLoading /> });
const RobotsTxtGenerator = dynamic(() => import("@/components/tools/seo/RobotsTxtGenerator").then(m => ({ default: m.RobotsTxtGenerator })), { loading: () => <ToolLoading /> });
const XMLSitemapGenerator = dynamic(() => import("@/components/tools/seo/XMLSitemapGenerator").then(m => ({ default: m.XMLSitemapGenerator })), { loading: () => <ToolLoading /> });
const UTMBuilder = dynamic(() => import("@/components/tools/seo/UTMBuilder").then(m => ({ default: m.UTMBuilder })), { loading: () => <ToolLoading /> });
const KeywordDensityChecker = dynamic(() => import("@/components/tools/seo/KeywordDensityChecker").then(m => ({ default: m.KeywordDensityChecker })), { loading: () => <ToolLoading /> });

// Developer Tools
const JSONFormatter = dynamic(() => import("@/components/tools/developer/JSONFormatter").then(m => ({ default: m.JSONFormatter })), { loading: () => <ToolLoading /> });
const PasswordGenerator = dynamic(() => import("@/components/tools/developer/PasswordGenerator").then(m => ({ default: m.PasswordGenerator })), { loading: () => <ToolLoading /> });
const UUIDGenerator = dynamic(() => import("@/components/tools/developer/UUIDGenerator").then(m => ({ default: m.UUIDGenerator })), { loading: () => <ToolLoading /> });

// Utility Tools
const QRCodeGenerator = dynamic(() => import("@/components/tools/utility/QRCodeGenerator").then(m => ({ default: m.QRCodeGenerator })), { loading: () => <ToolLoading /> });

// ── Slug-to-component mapping ────────────────────────────────────────────────
const TOOL_MAP: Record<string, React.ComponentType> = {
  // Image
  "image-compressor": ImageCompressor,
  "background-remover": BackgroundRemover,
  "webp-converter": WebPConverter,
  "png-to-jpg": PNGToJPG,
  "jpg-to-png": JPGToPNG,
  "image-resizer": ImageResizer,
  // Finance
  "sip-calculator": SIPCalculator,
  "emi-calculator": EMICalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "mortgage-calculator": MortgageCalculator,
  "loan-calculator": LoanCalculator,
  "roi-calculator": ROICalculator,
  "cagr-calculator": CAGRCalculator,
  "gst-calculator": GSTCalculator,
  "tax-calculator": TaxCalculator,
  // PDF
  "pdf-compressor": PDFCompressor,
  "pdf-merger": PDFMerger,
  "pdf-splitter": PDFSplitter,
  "pdf-to-word": PDFToWord,
  "word-to-pdf": WordToPDF,
  // SEO
  "meta-tag-generator": MetaTagGenerator,
  "schema-markup-generator": SchemaMarkupGenerator,
  "robots-txt-generator": RobotsTxtGenerator,
  "xml-sitemap-generator": XMLSitemapGenerator,
  "utm-builder": UTMBuilder,
  "keyword-density-checker": KeywordDensityChecker,
  // Developer
  "json-formatter": JSONFormatter,
  "password-generator": PasswordGenerator,
  "uuid-generator": UUIDGenerator,
  // Utility
  "qr-code-generator": QRCodeGenerator,
};

function ToolLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading tool...</p>
      </div>
    </div>
  );
}

interface ToolRendererProps {
  slug: string;
  tool: Tool;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  const ToolComponent = TOOL_MAP[slug];

  if (!ToolComponent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">
          This tool is coming soon. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <ToolComponent />
    </div>
  );
}
