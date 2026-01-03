"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for reaching out. We'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-3",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-colors"
            )}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-3",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-colors"
            )}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={cn(
            "w-full rounded-lg border bg-background px-4 py-3",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-colors"
          )}
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={cn(
            "w-full rounded-lg border bg-background px-4 py-3 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-colors"
          )}
          placeholder="Your message..."
        />
      </div>

      {status === "error" && (
        <p className="text-destructive text-sm">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2",
          "rounded-lg bg-primary text-primary-foreground px-6 py-3",
          "font-medium transition-colors",
          "hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

export default ContactForm;
