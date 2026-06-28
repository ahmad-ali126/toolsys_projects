"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type SchemaType = "Article" | "FAQ" | "Organization" | "Product" | "BreadcrumbList";

const schemaFields: Record<SchemaType, string[]> = {
  Article: ["headline", "description", "authorName", "datePublished", "imageUrl", "publisherName"],
  FAQ: ["question1", "answer1", "question2", "answer2", "question3", "answer3"],
  Organization: ["name", "url", "logoUrl", "description", "email", "phone"],
  Product: ["name", "description", "brand", "price", "currency", "imageUrl"],
  BreadcrumbList: ["item1Name", "item1Url", "item2Name", "item2Url", "item3Name", "item3Url"],
};

function generateSchema(type: SchemaType, fields: Record<string, string>) {
  switch (type) {
    case "Article":
      return { "@context": "https://schema.org", "@type": "Article", headline: fields.headline || "", description: fields.description || "", author: { "@type": "Person", name: fields.authorName || "" }, datePublished: fields.datePublished || "", image: fields.imageUrl || "", publisher: { "@type": "Organization", name: fields.publisherName || "" } };
    case "FAQ":
      return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [1, 2, 3].filter(i => fields[`question${i}`]).map(i => ({ "@type": "Question", name: fields[`question${i}`], acceptedAnswer: { "@type": "Answer", text: fields[`answer${i}`] || "" } })) };
    case "Organization":
      return { "@context": "https://schema.org", "@type": "Organization", name: fields.name || "", url: fields.url || "", logo: fields.logoUrl || "", description: fields.description || "", email: fields.email || "", telephone: fields.phone || "" };
    case "Product":
      return { "@context": "https://schema.org", "@type": "Product", name: fields.name || "", description: fields.description || "", brand: { "@type": "Brand", name: fields.brand || "" }, image: fields.imageUrl || "", offers: { "@type": "Offer", price: fields.price || "", priceCurrency: fields.currency || "USD" } };
    case "BreadcrumbList":
      return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [1, 2, 3].filter(i => fields[`item${i}Name`]).map((i, idx) => ({ "@type": "ListItem", position: idx + 1, name: fields[`item${i}Name`], item: fields[`item${i}Url`] || "" })) };
  }
}

const fieldLabels: Record<string, string> = {
  headline: "Headline", description: "Description", authorName: "Author Name", datePublished: "Date Published", imageUrl: "Image URL", publisherName: "Publisher Name",
  question1: "Question 1", answer1: "Answer 1", question2: "Question 2", answer2: "Answer 2", question3: "Question 3", answer3: "Answer 3",
  name: "Name", url: "URL", logoUrl: "Logo URL", email: "Email", phone: "Phone",
  brand: "Brand", price: "Price", currency: "Currency",
  item1Name: "Item 1 Name", item1Url: "Item 1 URL", item2Name: "Item 2 Name", item2Url: "Item 2 URL", item3Name: "Item 3 Name", item3Url: "Item 3 URL",
};

export function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const schema = generateSchema(schemaType, fields);
  const output = JSON.stringify(schema, null, 2);
  const scriptTag = `<script type="application/ld+json">\n${output}\n</script>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Schema Type</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(schemaFields) as SchemaType[]).map(t => (
            <button key={t} onClick={() => { setSchemaType(t); setFields({}); }} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${schemaType === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/30"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemaFields[schemaType].map(field => (
          <div key={field}>
            <label htmlFor={`schema-${field}`} className="block text-xs font-medium mb-1">{fieldLabels[field] || field}</label>
            <input id={`schema-${field}`} type={field.includes("date") ? "date" : "text"} value={fields[field] || ""} onChange={e => setFields({ ...fields, [field]: e.target.value })} placeholder={fieldLabels[field]} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label={fieldLabels[field]} />
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Generated JSON-LD</h3>
          <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-muted/50 border border-border text-xs overflow-x-auto leading-relaxed max-h-80"><code>{scriptTag}</code></pre>
      </div>
    </div>
  );
}
