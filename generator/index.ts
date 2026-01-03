/**
 * Website Generator
 * =================
 * Core generation logic for creating new website projects.
 */

import { features, resolveDependencies } from "./features";
import { generatePackageJson } from "./templates/base/package.json";
import { generateSiteConfig } from "./templates/base/site-config";
import { generateGlobalsCss } from "./templates/base/globals-css";
import { blogPage, blogGridComponent } from "./templates/features/blog";
import { contactPage, contactFormComponent, contactApiRoute } from "./templates/features/contact-form";
import { portalPage, portalDashboardComponent } from "./templates/features/customer-portal";
import { newsletterComponent, newsletterApiRoute } from "./templates/features/newsletter";

export interface PageConfig {
  featureId: string;
  onHomepage: boolean;
  hasOwnPage: boolean;
}

export interface GeneratorConfig {
  name: string;
  description: string;
  url: string;
  selectedFeatures: string[];
  primaryColor?: string;
  structure?: "single-page" | "multi-page" | "hybrid";
  pageConfigs?: PageConfig[];
}

export interface GeneratedFile {
  path: string;
  content: string;
}

/**
 * Generates all files for a new website project
 */
export function generateWebsite(config: GeneratorConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  
  // Resolve feature dependencies
  const resolvedFeatures = resolveDependencies(config.selectedFeatures);

  // Base files
  files.push({
    path: "package.json",
    content: generatePackageJson({ name: config.name, features: resolvedFeatures }),
  });

  files.push({
    path: "config/site.ts",
    content: generateSiteConfig({
      name: config.name,
      description: config.description,
      url: config.url,
      features: resolvedFeatures,
    }),
  });

  files.push({
    path: "app/globals.css",
    content: generateGlobalsCss({
      primaryColor: config.primaryColor,
      features: resolvedFeatures,
    }),
  });

  // Static config files
  files.push({
    path: "tsconfig.json",
    content: getTsConfig(),
  });

  files.push({
    path: "tailwind.config.ts",
    content: getTailwindConfig(),
  });

  files.push({
    path: "postcss.config.mjs",
    content: getPostcssConfig(),
  });

  files.push({
    path: "next.config.mjs",
    content: getNextConfig(resolvedFeatures),
  });

  files.push({
    path: ".gitignore",
    content: getGitignore(),
  });

  files.push({
    path: ".cursorrules",
    content: getCursorRules(),
  });

  // Lib files
  files.push({
    path: "lib/utils.ts",
    content: getUtilsFile(),
  });

  // App files
  files.push({
    path: "app/layout.tsx",
    content: getLayoutFile(resolvedFeatures),
  });

  files.push({
    path: "app/page.tsx",
    content: getHomePage(resolvedFeatures),
  });

  // Hero module (always included)
  files.push({
    path: "components/modules/hero.tsx",
    content: getHeroComponent(),
  });

  files.push({
    path: "components/modules/navbar.tsx",
    content: getNavbarComponent(),
  });

  files.push({
    path: "components/modules/footer.tsx",
    content: getFooterComponent(),
  });

  // Feature-specific files
  if (resolvedFeatures.includes("blog")) {
    files.push({ path: "app/blog/page.tsx", content: blogPage });
    files.push({ path: "components/modules/blog-grid.tsx", content: blogGridComponent });
  }

  if (resolvedFeatures.includes("contact-form")) {
    files.push({ path: "app/contact/page.tsx", content: contactPage });
    files.push({ path: "components/modules/contact-form.tsx", content: contactFormComponent });
    files.push({ path: "app/api/contact/route.ts", content: contactApiRoute });
  }

  if (resolvedFeatures.includes("customer-portal")) {
    files.push({ path: "app/portal/page.tsx", content: portalPage });
    files.push({ path: "components/modules/portal-dashboard.tsx", content: portalDashboardComponent });
  }

  if (resolvedFeatures.includes("newsletter")) {
    files.push({ path: "components/modules/newsletter.tsx", content: newsletterComponent });
    files.push({ path: "app/api/newsletter/route.ts", content: newsletterApiRoute });
  }

  if (resolvedFeatures.includes("pricing")) {
    files.push({ path: "app/pricing/page.tsx", content: getPricingPage() });
    files.push({ path: "components/modules/pricing-table.tsx", content: getPricingComponent() });
  }

  if (resolvedFeatures.includes("faq")) {
    files.push({ path: "components/modules/faq.tsx", content: getFaqComponent() });
  }

  if (resolvedFeatures.includes("testimonials")) {
    files.push({ path: "components/modules/testimonials.tsx", content: getTestimonialsComponent() });
  }

  if (resolvedFeatures.includes("dark-mode")) {
    files.push({ path: "components/theme-provider.tsx", content: getThemeProvider() });
    files.push({ path: "components/theme-toggle.tsx", content: getThemeToggle() });
  }

  // Module index
  files.push({
    path: "components/modules/index.ts",
    content: getModuleIndex(resolvedFeatures),
  });

  // Placeholder directories
  files.push({ path: "components/ui/.gitkeep", content: "# UI components directory" });
  files.push({ path: "components/custom/.gitkeep", content: "# Custom components directory" });
  files.push({ path: "public/.gitkeep", content: "# Public assets directory" });

  return files;
}

// Helper functions for static templates
function getTsConfig(): string {
  return JSON.stringify({
    compilerOptions: {
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: { "@/*": ["./*"] },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  }, null, 2);
}

function getTailwindConfig(): string {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
`;
}

function getPostcssConfig(): string {
  return `const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
`;
}

function getNextConfig(features: string[]): string {
  const hasMdx = features.includes("blog");
  
  if (hasMdx) {
    return `import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
`;
  }

  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
`;
}

function getGitignore(): string {
  return `# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js
.next/
out/

# Production
build/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*

# Local env
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea/
.vscode/
`;
}

function getCursorRules(): string {
  return `# AI Development Guidelines

## Content & Configuration
- Always read \`config/site.ts\` for text content. Never hardcode.
- Use the typed \`siteConfig\` object for all configurable values.

## Styling
- Use Tailwind classes with CSS variables (e.g., \`bg-primary\`, \`text-foreground\`)
- Never use arbitrary colors like \`bg-blue-500\`
- Use \`cn()\` from \`lib/utils.ts\` for conditional classes

## Components
- \`components/ui\`: Atomic primitives (Button, Input)
- \`components/modules\`: Reusable features (Hero, Navbar)
- \`components/custom\`: Client-specific one-offs

## Icons
- Use \`lucide-react\` for all icons

## Code Style
- TypeScript strict mode
- Server Components by default
- \`"use client"\` only when needed
`;
}

function getUtilsFile(): string {
  return `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
}

function getLayoutFile(features: string[]): string {
  const hasDarkMode = features.includes("dark-mode");
  
  return `import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/modules/navbar";
import { Footer } from "@/components/modules/footer";
${hasDarkMode ? 'import { ThemeProvider } from "@/components/theme-provider";' : ''}
import "./globals.css";

const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: \`%s | \${siteConfig.name}\`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${fontHeading.variable} \${fontBody.variable} min-h-screen antialiased\`}>
        ${hasDarkMode ? '<ThemeProvider>' : ''}
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        ${hasDarkMode ? '</ThemeProvider>' : ''}
      </body>
    </html>
  );
}
`;
}

function getHomePage(features: string[]): string {
  const hasNewsletter = features.includes("newsletter");
  const hasFaq = features.includes("faq");
  const hasTestimonials = features.includes("testimonials");
  const hasPricing = features.includes("pricing");

  return `import { Hero } from "@/components/modules/hero";
${hasTestimonials ? 'import { Testimonials } from "@/components/modules/testimonials";' : ''}
${hasPricing ? 'import { PricingTable } from "@/components/modules/pricing-table";' : ''}
${hasFaq ? 'import { FAQ } from "@/components/modules/faq";' : ''}
${hasNewsletter ? 'import { Newsletter } from "@/components/modules/newsletter";' : ''}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      ${hasTestimonials ? '<Testimonials />' : ''}
      ${hasPricing ? '<section className="py-16 px-4"><div className="container mx-auto"><h2 className="text-3xl font-bold text-center mb-12">Pricing</h2><PricingTable /></div></section>' : ''}
      ${hasFaq ? '<FAQ />' : ''}
      ${hasNewsletter ? '<section className="py-16 px-4"><div className="container mx-auto max-w-xl"><Newsletter /></div></section>' : ''}
    </div>
  );
}
`;
}

function getHeroComponent(): string {
  return `"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface HeroProps {
  title?: string;
  description?: string;
  className?: string;
}

export function Hero({ title, description, className }: HeroProps) {
  return (
    <section className={cn("relative overflow-hidden px-4 py-24 md:py-32", className)}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
          <Sparkles className="w-4 h-4" />
          <span>Welcome to {siteConfig.name}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
          {title || siteConfig.name}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up">
          {description || siteConfig.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
          <button className={cn(
            "inline-flex items-center gap-2 px-8 py-4 rounded-lg",
            "bg-primary text-primary-foreground font-medium",
            "hover:bg-primary/90 transition-colors"
          )}>
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button className={cn(
            "inline-flex items-center gap-2 px-8 py-4 rounded-lg",
            "bg-secondary text-secondary-foreground font-medium border",
            "hover:bg-secondary/80 transition-colors"
          )}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
`;
}

function getNavbarComponent(): string {
  return `"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-heading text-xl font-bold">
          {siteConfig.name}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden border-t p-4">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
`;
}

function getFooterComponent(): string {
  return `import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-heading text-xl font-bold">
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.contact?.email && (
                <li>
                  <a href={\`mailto:\${siteConfig.contact.email}\`} className="hover:text-foreground">
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact?.phone && (
                <li>{siteConfig.contact.phone}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.copyrightHolder || siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
`;
}

function getModuleIndex(features: string[]): string {
  const exports = ['export { Hero } from "./hero";', 'export { Navbar } from "./navbar";', 'export { Footer } from "./footer";'];
  
  if (features.includes("blog")) exports.push('export { BlogGrid } from "./blog-grid";');
  if (features.includes("contact-form")) exports.push('export { ContactForm } from "./contact-form";');
  if (features.includes("customer-portal")) exports.push('export { PortalDashboard } from "./portal-dashboard";');
  if (features.includes("newsletter")) exports.push('export { Newsletter } from "./newsletter";');
  if (features.includes("pricing")) exports.push('export { PricingTable } from "./pricing-table";');
  if (features.includes("faq")) exports.push('export { FAQ } from "./faq";');
  if (features.includes("testimonials")) exports.push('export { Testimonials } from "./testimonials";');

  return exports.join("\n");
}

function getPricingPage(): string {
  return `import { Metadata } from "next";
import { PricingTable } from "@/components/modules/pricing-table";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for everyone",
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that's right for you
        </p>
      </div>
      <PricingTable />
    </div>
  );
}
`;
}

function getPricingComponent(): string {
  return `"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for getting started",
    features: ["Up to 5 projects", "Basic analytics", "Email support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing businesses",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domain"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom integrations"],
    highlighted: false,
  },
];

export function PricingTable() {
  return (
    <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "rounded-lg border p-8 flex flex-col",
            plan.highlighted && "border-primary bg-primary/5 relative"
          )}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Most Popular
            </span>
          )}
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
          <div className="mt-4 mb-6">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>
          <ul className="space-y-3 flex-1">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            className={cn(
              "mt-8 w-full py-3 rounded-lg font-medium transition-colors",
              plan.highlighted
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            Get Started
          </button>
        </div>
      ))}
    </div>
  );
}

export default PricingTable;
`;
}

function getFaqComponent(): string {
  return `"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is included in the starter plan?",
    answer: "The starter plan includes up to 5 projects, basic analytics, and email support. It's perfect for individuals just getting started.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, you can upgrade your plan at any time. Your new features will be available immediately, and billing will be prorated.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied, contact us within 30 days for a full refund.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team via email or through the help center in your dashboard. Pro and Enterprise users get priority support.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full flex items-center justify-between p-4 text-left font-medium"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <ChevronDown className={cn(
                  "h-5 w-5 transition-transform",
                  openIndex === index && "rotate-180"
                )} />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
`;
}

function getTestimonialsComponent(): string {
  return `import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This product has completely transformed how we work. Highly recommended!",
    author: "Sarah Johnson",
    role: "CEO at TechCorp",
  },
  {
    quote: "The best investment we've made this year. Our team productivity has doubled.",
    author: "Michael Chen",
    role: "Product Manager at StartupX",
  },
  {
    quote: "Excellent support and amazing features. We couldn't be happier.",
    author: "Emily Davis",
    role: "Designer at CreativeStudio",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border">
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
`;
}

function getThemeProvider(): string {
  return `"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
`;
}

function getThemeToggle(): string {
  return `"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </button>
  );
}
`;
}

