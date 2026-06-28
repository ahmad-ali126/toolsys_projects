"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }
    
    setStatus("loading");
    
    // Simulate submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 md:p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground">Message Sent Successfully!</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Thank you for reaching out. We have received your inquiry and will respond as soon as possible (usually within 24-48 hours).
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="px-4 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Send a Message</h2>
      
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs font-semibold text-foreground">
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-xs font-semibold text-foreground">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="text-xs font-semibold text-foreground">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="How can we help?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={status === "loading"}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-semibold text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us what tool suggestions or questions you have..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-md"
      >
        {status === "loading" ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
            Sending message...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Inquiry
          </>
        )}
      </button>
    </form>
  );
}
