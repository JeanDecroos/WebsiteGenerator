/**
 * Feature Definitions
 * ====================
 * Each feature that can be added to a generated website.
 * Features include metadata and file templates.
 */

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  category: "content" | "interaction" | "commerce" | "utility";
  dependencies?: string[]; // Other feature IDs this depends on
}

export const features: Feature[] = [
  // Content Features
  {
    id: "blog",
    name: "Blog",
    description: "Full blog system with posts, categories, and MDX support",
    icon: "FileText",
    category: "content",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase projects with images, descriptions, and filters",
    icon: "Briefcase",
    category: "content",
  },
  {
    id: "team",
    name: "Team Section",
    description: "Display team members with photos and bios",
    icon: "Users",
    category: "content",
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Customer reviews and testimonials carousel",
    icon: "Quote",
    category: "content",
  },
  {
    id: "faq",
    name: "FAQ Section",
    description: "Frequently asked questions with accordion",
    icon: "HelpCircle",
    category: "content",
  },

  // Interaction Features
  {
    id: "contact-form",
    name: "Contact Form",
    description: "Contact form with validation and email notifications",
    icon: "Mail",
    category: "interaction",
  },
  {
    id: "newsletter",
    name: "Newsletter Signup",
    description: "Email capture form for building mailing lists",
    icon: "Newspaper",
    category: "interaction",
  },
  {
    id: "booking",
    name: "Booking System",
    description: "Calendar-based appointment scheduling",
    icon: "Calendar",
    category: "interaction",
  },
  {
    id: "live-chat",
    name: "Live Chat Widget",
    description: "Real-time chat support integration",
    icon: "MessageCircle",
    category: "interaction",
  },

  // Commerce Features
  {
    id: "pricing",
    name: "Pricing Tables",
    description: "Pricing plans with feature comparison",
    icon: "CreditCard",
    category: "commerce",
  },
  {
    id: "customer-portal",
    name: "Customer Portal",
    description: "Authenticated area for customers with dashboard",
    icon: "Lock",
    category: "commerce",
    dependencies: ["auth"],
  },
  {
    id: "auth",
    name: "Authentication",
    description: "User login, registration, and session management",
    icon: "Key",
    category: "commerce",
  },

  // Utility Features
  {
    id: "analytics",
    name: "Analytics",
    description: "Page views, events, and visitor tracking",
    icon: "BarChart",
    category: "utility",
  },
  {
    id: "seo",
    name: "Advanced SEO",
    description: "Sitemap, robots.txt, structured data, meta tags",
    icon: "Search",
    category: "utility",
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Light/dark theme toggle with system preference detection",
    icon: "Moon",
    category: "utility",
  },
  {
    id: "i18n",
    name: "Multi-language",
    description: "Internationalization with language switcher",
    icon: "Globe",
    category: "utility",
  },
];

export const featureCategories = [
  { id: "content", name: "Content", description: "Pages and sections" },
  { id: "interaction", name: "Interaction", description: "User engagement" },
  { id: "commerce", name: "Commerce", description: "Business features" },
  { id: "utility", name: "Utility", description: "Technical features" },
] as const;

export function getFeatureById(id: string): Feature | undefined {
  return features.find((f) => f.id === id);
}

export function getFeaturesByCategory(category: Feature["category"]): Feature[] {
  return features.filter((f) => f.category === category);
}

export function resolveDependencies(selectedIds: string[]): string[] {
  const resolved = new Set<string>(selectedIds);
  
  for (const id of selectedIds) {
    const feature = getFeatureById(id);
    if (feature?.dependencies) {
      feature.dependencies.forEach((dep) => resolved.add(dep));
    }
  }
  
  return Array.from(resolved);
}

