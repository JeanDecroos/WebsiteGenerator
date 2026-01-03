/**
 * Contact Form Feature Templates
 */

export const contactPage = `import { Metadata } from "next";
import { ContactForm } from "@/components/modules/contact-form";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: \`Get in touch with \${siteConfig.name}\`,
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                {siteConfig.contact?.email && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={\`mailto:\${siteConfig.contact.email}\`} className="font-medium hover:text-primary">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                )}
                {siteConfig.contact?.phone && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={\`tel:\${siteConfig.contact.phone}\`} className="font-medium hover:text-primary">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                {siteConfig.contact?.address && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{siteConfig.contact.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border bg-card p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
`;

export const contactFormComponent = `"use client";

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
`;

export const contactApiRoute = `import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Implement your email sending logic here
    // Options:
    // 1. Resend: https://resend.com
    // 2. SendGrid: https://sendgrid.com
    // 3. Nodemailer with SMTP
    // 4. Store in database

    console.log("Contact form submission:", { name, email, subject, message });

    // Simulate a delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
`;

