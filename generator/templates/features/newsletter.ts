/**
 * Newsletter Feature Templates
 */

export const newsletterComponent = `"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: "inline" | "card";
}

export function Newsletter({
  title = "Subscribe to our newsletter",
  description = "Get the latest updates and news delivered to your inbox.",
  className,
  variant = "card",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center p-8",
          variant === "card" && "rounded-lg border bg-card",
          className
        )}
      >
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">You're subscribed!</h3>
        <p className="text-muted-foreground">
          Thank you for subscribing. Check your inbox to confirm.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    );
  }

  return (
    <div className={cn("rounded-lg border bg-card p-8", className)}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={cn(
            "flex-1 rounded-lg border bg-background px-4 py-3",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3",
            "font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              Subscribe
            </>
          )}
        </button>
      </form>

      {status === "error" && (
        <p className="text-destructive text-sm mt-2">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}

export default Newsletter;
`;

export const newsletterApiRoute = `import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Implement your newsletter subscription logic here
    // Options:
    // 1. Mailchimp: https://mailchimp.com/developer/
    // 2. ConvertKit: https://convertkit.com/
    // 3. Resend: https://resend.com
    // 4. Store in database

    console.log("Newsletter subscription:", email);

    // Simulate a delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
`;

