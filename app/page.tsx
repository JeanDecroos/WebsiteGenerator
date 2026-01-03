"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Check,
  Loader2,
  FolderOpen,
  FileCode,
  Download,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Zap,
  FileText,
  Briefcase,
  Users,
  Quote,
  HelpCircle,
  Mail,
  Newspaper,
  Calendar,
  MessageCircle,
  CreditCard,
  Lock,
  Key,
  BarChart,
  Search,
  Moon,
  Globe,
  UtensilsCrossed,
  Cpu,
  Heart,
  Palette,
  ShoppingBag,
  Home,
  GraduationCap,
  HeartHandshake,
  Music,
  ChevronRight,
  Menu,
  LayoutTemplate,
  Layers,
  PanelTop,
  ScrollText,
  SplitSquareHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// DATA DEFINITIONS
// ============================================================================

const featureCategories = [
  {
    id: "content",
    name: "Content",
    description: "Pages and sections",
    features: [
      { id: "blog", name: "Blog", description: "Blog with MDX support", icon: FileText, canBePage: true },
      { id: "portfolio", name: "Portfolio", description: "Project showcase", icon: Briefcase, canBePage: true },
      { id: "team", name: "Team Section", description: "Team member profiles", icon: Users, canBePage: true },
      { id: "testimonials", name: "Testimonials", description: "Customer reviews", icon: Quote, canBePage: false },
      { id: "faq", name: "FAQ Section", description: "Accordion FAQ", icon: HelpCircle, canBePage: true },
    ],
  },
  {
    id: "interaction",
    name: "Interaction",
    description: "User engagement",
    features: [
      { id: "contact-form", name: "Contact Form", description: "Email contact form", icon: Mail, canBePage: true },
      { id: "newsletter", name: "Newsletter", description: "Email signup", icon: Newspaper, canBePage: false },
      { id: "booking", name: "Booking System", description: "Appointment scheduling", icon: Calendar, canBePage: true },
      { id: "live-chat", name: "Live Chat", description: "Chat widget", icon: MessageCircle, canBePage: false },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    description: "Business features",
    features: [
      { id: "pricing", name: "Pricing Tables", description: "Plan comparison", icon: CreditCard, canBePage: true },
      { id: "customer-portal", name: "Customer Portal", description: "User dashboard", icon: Lock, canBePage: true },
      { id: "auth", name: "Authentication", description: "Login/signup", icon: Key, canBePage: true },
    ],
  },
  {
    id: "utility",
    name: "Utility",
    description: "Technical features",
    features: [
      { id: "analytics", name: "Analytics", description: "Visitor tracking", icon: BarChart, canBePage: false },
      { id: "seo", name: "Advanced SEO", description: "Sitemap & meta", icon: Search, canBePage: false },
      { id: "dark-mode", name: "Dark Mode", description: "Theme toggle", icon: Moon, canBePage: false },
      { id: "i18n", name: "Multi-language", description: "Internationalization", icon: Globe, canBePage: false },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed,
  Briefcase,
  Cpu,
  Heart,
  Palette,
  ShoppingBag,
  Home,
  GraduationCap,
  HeartHandshake,
  Music,
};

const industries = [
  {
    id: "restaurant-food",
    name: "Restaurant & Food",
    description: "Restaurants, bakeries, cafes",
    icon: "UtensilsCrossed",
    colors: { primary: "24 95% 53%", accent: "43 96% 56%" },
    examples: ["Bakery", "Italian Restaurant", "Coffee Shop"],
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Law firms, accountants, consultants",
    icon: "Briefcase",
    colors: { primary: "222 47% 31%", accent: "43 74% 49%" },
    examples: ["Law Firm", "Accounting", "Consulting"],
  },
  {
    id: "tech-saas",
    name: "Tech & SaaS",
    description: "Software, startups, tech companies",
    icon: "Cpu",
    colors: { primary: "262 83% 58%", accent: "187 92% 50%" },
    examples: ["SaaS Platform", "Dev Tools", "AI Startup"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    description: "Clinics, therapists, fitness",
    icon: "Heart",
    colors: { primary: "173 58% 39%", accent: "142 76% 36%" },
    examples: ["Medical Clinic", "Yoga Studio", "Wellness Spa"],
  },
  {
    id: "creative-agency",
    name: "Creative & Agency",
    description: "Design studios, agencies",
    icon: "Palette",
    colors: { primary: "0 0% 9%", accent: "358 75% 59%" },
    examples: ["Design Agency", "Photographer", "Marketing"],
  },
  {
    id: "ecommerce-retail",
    name: "E-commerce & Retail",
    description: "Online stores, boutiques",
    icon: "ShoppingBag",
    colors: { primary: "0 0% 15%", accent: "45 93% 47%" },
    examples: ["Fashion Boutique", "Home Goods", "Jewelry"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Agents, property management",
    icon: "Home",
    colors: { primary: "210 40% 35%", accent: "142 76% 36%" },
    examples: ["Real Estate Agent", "Property Management"],
  },
  {
    id: "education",
    name: "Education & Training",
    description: "Schools, courses, coaching",
    icon: "GraduationCap",
    colors: { primary: "221 83% 53%", accent: "38 92% 50%" },
    examples: ["Online Course", "Coaching", "Training"],
  },
  {
    id: "nonprofit",
    name: "Non-profit",
    description: "Charities, organizations",
    icon: "HeartHandshake",
    colors: { primary: "142 76% 36%", accent: "210 40% 50%" },
    examples: ["Charity", "Foundation", "Community Org"],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Musicians, venues, events",
    icon: "Music",
    colors: { primary: "280 68% 60%", accent: "340 82% 52%" },
    examples: ["Band/Musician", "Event Venue", "DJ"],
  },
];

const stylePresets = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, understated, lots of whitespace",
    preview: { bg: "bg-white", accent: "bg-slate-900", radius: "rounded-sm", shadow: "shadow-none", isDark: false },
    hints: ["Thin borders", "Generous padding", "Subtle hovers"],
  },
  {
    id: "bold",
    name: "Bold",
    description: "High contrast, strong colors, impactful",
    preview: { bg: "bg-slate-50", accent: "bg-violet-600", radius: "rounded-xl", shadow: "shadow-xl", isDark: false },
    hints: ["Large headings", "Vibrant colors", "Strong shadows"],
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Refined, sophisticated, timeless",
    preview: { bg: "bg-stone-50", accent: "bg-stone-800", radius: "rounded-none", shadow: "shadow-sm", isDark: false },
    hints: ["Serif headings", "Muted palette", "Fine details"],
  },
  {
    id: "playful",
    name: "Playful",
    description: "Fun, colorful, approachable",
    preview: { bg: "bg-amber-50", accent: "bg-orange-500", radius: "rounded-full", shadow: "shadow-lg", isDark: false },
    hints: ["Rounded shapes", "Bright accents", "Bouncy feel"],
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional, trustworthy, structured",
    preview: { bg: "bg-slate-100", accent: "bg-blue-700", radius: "rounded-md", shadow: "shadow-md", isDark: false },
    hints: ["Grid-based", "Conservative", "Clear hierarchy"],
  },
  {
    id: "luxe",
    name: "Luxe",
    description: "Premium, exclusive, high-end",
    preview: { bg: "bg-zinc-900", accent: "bg-amber-500", radius: "rounded-none", shadow: "shadow-2xl", isDark: true },
    hints: ["Gold accents", "Dark mode", "Dramatic"],
  },
  {
    id: "organic",
    name: "Organic",
    description: "Natural, warm, earthy tones",
    preview: { bg: "bg-emerald-50", accent: "bg-emerald-700", radius: "rounded-2xl", shadow: "shadow-sm", isDark: false },
    hints: ["Soft curves", "Earth tones", "Natural feel"],
  },
  {
    id: "tech",
    name: "Tech",
    description: "Futuristic, gradients, glass effects",
    preview: { bg: "bg-slate-950", accent: "bg-gradient-to-r from-violet-500 to-cyan-500", radius: "rounded-lg", shadow: "shadow-xl shadow-violet-500/20", isDark: true },
    hints: ["Gradients", "Glass morphism", "Neon accents"],
  },
];

// Structure options
const structureOptions = [
  {
    id: "single-page",
    name: "Single Page",
    description: "Everything on one scrolling page. Great for simple sites and landing pages.",
    icon: ScrollText,
    preview: "single",
  },
  {
    id: "multi-page",
    name: "Multi-Page",
    description: "Each section gets its own dedicated page. Best for content-rich sites.",
    icon: Layers,
    preview: "multi",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Key sections on homepage, detailed content on separate pages. Most flexible.",
    icon: SplitSquareHorizontal,
    preview: "hybrid",
  },
];

// ============================================================================
// TYPES
// ============================================================================

type Step = "features" | "structure" | "industry" | "style" | "generate";

interface GenerationResult {
  success: boolean;
  projectPath: string;
  filesCount: number;
  files: string[];
}

interface PageConfig {
  featureId: string;
  onHomepage: boolean;
  hasOwnPage: boolean;
}

// ============================================================================
// STRUCTURE PREVIEW COMPONENT
// ============================================================================

function StructurePreview({
  structure,
  features,
  pageConfigs,
}: {
  structure: string;
  features: string[];
  pageConfigs: PageConfig[];
}) {
  const getFeatureName = (id: string) => {
    const feature = featureCategories.flatMap((c) => c.features).find((f) => f.id === id);
    return feature?.name || id;
  };

  const homepageSections = pageConfigs.filter((p) => p.onHomepage);
  const separatePages = pageConfigs.filter((p) => p.hasOwnPage);

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
      <div className="flex gap-4">
        {/* Sitemap visualization */}
        <div className="flex-1">
          <div className="text-xs text-slate-400 mb-3">Site Structure:</div>
          
          {/* Homepage */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-white">Homepage</span>
            </div>
            <div className="ml-6 space-y-1">
              {homepageSections.length > 0 ? (
                homepageSections.map((p) => (
                  <div key={p.featureId} className="text-xs text-slate-500 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    {getFeatureName(p.featureId)} section
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-600 italic">Hero only</div>
              )}
            </div>
          </div>

          {/* Separate Pages */}
          {separatePages.length > 0 && (
            <div>
              <div className="text-xs text-slate-400 mb-2">Separate Pages:</div>
              <div className="ml-2 space-y-1">
                {separatePages.map((p) => (
                  <div key={p.featureId} className="text-xs text-slate-400 flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    /{p.featureId}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Visual preview */}
        <div className="w-32">
          <div className="text-xs text-slate-400 mb-2">Preview:</div>
          <div className="bg-slate-800 rounded border border-slate-700 p-2">
            {/* Mini navbar */}
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-700">
              <div className="w-6 h-1.5 bg-violet-500 rounded" />
              <div className="flex gap-0.5">
                {separatePages.slice(0, 3).map((_, i) => (
                  <div key={i} className="w-3 h-1 bg-slate-600 rounded" />
                ))}
              </div>
            </div>
            {/* Content blocks */}
            <div className="space-y-1">
              <div className="h-6 bg-slate-700 rounded" /> {/* Hero */}
              {homepageSections.slice(0, 3).map((_, i) => (
                <div key={i} className="h-3 bg-slate-700/50 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WEBSITE PREVIEW COMPONENT
// ============================================================================

function WebsitePreview({
  siteName,
  industry,
  style,
  features,
  pageConfigs,
}: {
  siteName: string;
  industry: (typeof industries)[0] | null;
  style: (typeof stylePresets)[0] | null;
  features: string[];
  pageConfigs: PageConfig[];
}) {
  if (!industry || !style) return null;

  const isDark = style.preview.isDark;
  const bgColor = style.preview.bg;
  const textColor = isDark ? "text-white" : "text-slate-900";
  const mutedColor = isDark ? "text-slate-400" : "text-slate-500";
  const borderColor = isDark ? "border-slate-700" : "border-slate-200";
  const cardBg = isDark ? "bg-slate-800/50" : "bg-white";

  const homepageSections = pageConfigs.filter((p) => p.onHomepage);
  const separatePages = pageConfigs.filter((p) => p.hasOwnPage);

  const getFeatureName = (id: string) => {
    const feature = featureCategories.flatMap((c) => c.features).find((f) => f.id === id);
    return feature?.name || id;
  };

  return (
    <div className={cn("rounded-xl overflow-hidden border border-slate-600", bgColor)}>
      {/* Browser Chrome */}
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
            {siteName.toLowerCase().replace(/\s+/g, "-")}.com
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
        {/* Navbar */}
        <div className={cn("flex items-center justify-between pb-3 border-b", borderColor)}>
          <div className={cn("font-bold text-sm", textColor)}>{siteName}</div>
          <div className="flex gap-4">
            <span className={cn("text-xs", mutedColor)}>Home</span>
            {separatePages.slice(0, 4).map((p) => (
              <span key={p.featureId} className={cn("text-xs", mutedColor)}>
                {getFeatureName(p.featureId)}
              </span>
            ))}
          </div>
          <div className={cn("w-6 h-6 flex items-center justify-center", style.preview.radius, style.preview.accent)}>
            <Menu className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center py-8">
          <div
            className={cn("inline-block px-3 py-1 text-xs mb-3", style.preview.radius)}
            style={{ backgroundColor: `hsl(${industry.colors.primary} / 0.1)`, color: `hsl(${industry.colors.primary})` }}
          >
            Welcome to {siteName}
          </div>
          <h1 className={cn("text-2xl font-bold mb-2", textColor)}>Your Headline Here</h1>
          <p className={cn("text-sm mb-4 max-w-xs mx-auto", mutedColor)}>
            A compelling description that explains what you do.
          </p>
          <div className="flex gap-2 justify-center">
            <button
              className={cn("px-4 py-2 text-xs font-medium text-white", style.preview.radius)}
              style={{ backgroundColor: `hsl(${industry.colors.primary})` }}
            >
              Get Started
            </button>
            <button className={cn("px-4 py-2 text-xs font-medium border", style.preview.radius, textColor, borderColor)}>
              Learn More
            </button>
          </div>
        </div>

        {/* Homepage Sections */}
        {homepageSections.map((config) => {
          const feature = featureCategories.flatMap((c) => c.features).find((f) => f.id === config.featureId);
          if (!feature) return null;

          return (
            <div key={config.featureId} className="py-4">
              <h2 className={cn("text-sm font-semibold text-center mb-4", textColor)}>
                {feature.name}
              </h2>
              {config.featureId === "testimonials" && (
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={cn("p-3 border", style.preview.radius, borderColor, cardBg)}>
                      <Quote className={cn("w-4 h-4 mb-2", mutedColor)} />
                      <div className={cn("text-[10px]", mutedColor)}>"Great service!"</div>
                    </div>
                  ))}
                </div>
              )}
              {config.featureId === "pricing" && (
                <div className="grid grid-cols-3 gap-2">
                  {["Basic", "Pro", "Enterprise"].map((plan, i) => (
                    <div key={plan} className={cn("p-3 border text-center", style.preview.radius, borderColor, cardBg)}>
                      <div className={cn("text-[10px] font-medium", textColor)}>{plan}</div>
                      <div className={cn("text-sm font-bold", textColor)}>${i === 0 ? 9 : i === 1 ? 29 : 99}</div>
                    </div>
                  ))}
                </div>
              )}
              {config.featureId === "newsletter" && (
                <div className={cn("p-4 text-center", style.preview.radius)} style={{ backgroundColor: `hsl(${industry.colors.primary} / 0.1)` }}>
                  <div className="flex gap-1 max-w-xs mx-auto">
                    <div className={cn("flex-1 h-6 border bg-white/50", style.preview.radius, borderColor)} />
                    <button className={cn("px-3 h-6 text-[10px] text-white", style.preview.radius)} style={{ backgroundColor: `hsl(${industry.colors.primary})` }}>
                      Subscribe
                    </button>
                  </div>
                </div>
              )}
              {config.featureId === "faq" && (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className={cn("p-2 border", style.preview.radius, borderColor, cardBg)}>
                      <div className={cn("text-[10px] font-medium", textColor)}>Question {i}?</div>
                    </div>
                  ))}
                </div>
              )}
              {(config.featureId === "blog" || config.featureId === "portfolio") && (
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map((i) => (
                    <div key={i} className={cn("border overflow-hidden", style.preview.radius, borderColor, cardBg)}>
                      <div className="h-10" style={{ background: `linear-gradient(135deg, hsl(${industry.colors.primary} / 0.2), hsl(${industry.colors.accent} / 0.2))` }} />
                      <div className="p-2">
                        <div className={cn("text-[10px] font-medium", textColor)}>Item {i}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {config.featureId === "contact-form" && (
                <div className={cn("p-4 border", style.preview.radius, borderColor, cardBg)}>
                  <div className="space-y-2">
                    <div className={cn("h-5 border", style.preview.radius, borderColor)} />
                    <div className={cn("h-5 border", style.preview.radius, borderColor)} />
                    <div className={cn("h-10 border", style.preview.radius, borderColor)} />
                    <button className={cn("w-full h-5 text-[10px] text-white", style.preview.radius)} style={{ backgroundColor: `hsl(${industry.colors.primary})` }}>
                      Send
                    </button>
                  </div>
                </div>
              )}
              {config.featureId === "team" && (
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={cn("p-2 border text-center", style.preview.radius, borderColor, cardBg)}>
                      <div className="w-8 h-8 rounded-full bg-slate-300 mx-auto mb-1" />
                      <div className={cn("text-[10px] font-medium", textColor)}>Person {i}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div className={cn("pt-4 mt-4 border-t text-center", borderColor)}>
          <div className={cn("text-[10px]", mutedColor)}>© 2024 {siteName}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STYLE PREVIEW COMPONENT
// ============================================================================

function StylePreview({
  style,
  features,
  selected,
  onClick,
}: {
  style: (typeof stylePresets)[0];
  features: string[];
  selected: boolean;
  onClick: () => void;
}) {
  const hasBlog = features.includes("blog");
  const hasContact = features.includes("contact-form");
  const hasPricing = features.includes("pricing");
  const hasTestimonials = features.includes("testimonials");

  const isDark = style.preview.isDark;
  const borderColor = isDark ? "border-slate-700" : "border-slate-200";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col overflow-hidden transition-all duration-200 border-2 rounded-xl",
        selected ? "border-violet-500 ring-2 ring-violet-500/20" : "border-slate-700 hover:border-slate-500"
      )}
    >
      <div className={cn("w-full aspect-[4/3] overflow-hidden", style.preview.bg)}>
        <div className="w-full h-full p-3 flex flex-col">
          <div className={cn("flex items-center justify-between mb-3 pb-2 border-b", borderColor)}>
            <div className={cn("w-12 h-2 rounded", style.preview.accent)} />
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn("w-6 h-1.5 rounded", isDark ? "bg-slate-600" : "bg-slate-300")} />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center mb-2">
            <div className={cn("w-20 h-2 mb-1 rounded", style.preview.accent)} />
            <div className={cn("w-16 h-1.5 rounded", isDark ? "bg-slate-600" : "bg-slate-300")} />
            <div className={cn("w-10 h-3 mt-2", style.preview.radius, style.preview.accent)} />
          </div>
          <div className="flex gap-1 justify-center">
            {hasBlog && <div className={cn("w-8 h-6 border", style.preview.radius, borderColor)} />}
            {hasPricing && <div className={cn("w-8 h-6 border", style.preview.radius, borderColor)} />}
            {hasTestimonials && <div className={cn("w-8 h-6 border", style.preview.radius, borderColor)} />}
            {hasContact && <div className={cn("w-8 h-6", style.preview.radius, style.preview.accent, "opacity-30")} />}
          </div>
        </div>
      </div>
      <div className="p-4 bg-slate-800/50 text-left">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-white">{style.name}</span>
          {selected && <Check className="w-4 h-4 text-violet-400" />}
        </div>
        <p className="text-xs text-slate-400 mb-2">{style.description}</p>
        <div className="flex flex-wrap gap-1">
          {style.hints.slice(0, 2).map((hint) => (
            <span key={hint} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
              {hint}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function GeneratorPage() {
  // Step management
  const [currentStep, setCurrentStep] = useState<Step>("features");

  // Form state
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "contact-form",
    "newsletter",
    "dark-mode",
    "seo",
  ]);
  const [selectedStructure, setSelectedStructure] = useState<string>("hybrid");
  const [pageConfigs, setPageConfigs] = useState<PageConfig[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  // Generation state
  const [status, setStatus] = useState<"idle" | "generating" | "success" | "error">("idle");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("websiteGeneratorState");
      if (saved) {
        const state = JSON.parse(saved);
        setSiteName(state.siteName || "");
        setSiteDescription(state.siteDescription || "");
        setSiteUrl(state.siteUrl || "");
        setSelectedFeatures(state.selectedFeatures || ["contact-form", "newsletter", "dark-mode", "seo"]);
        setSelectedStructure(state.selectedStructure || "hybrid");
        setPageConfigs(state.pageConfigs || []);
        setSelectedIndustry(state.selectedIndustry || null);
        setSelectedStyle(state.selectedStyle || null);
        setCurrentStep(state.currentStep || "features");
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return; // Don't save until initial load is complete

    const state = {
      siteName,
      siteDescription,
      siteUrl,
      selectedFeatures,
      selectedStructure,
      pageConfigs,
      selectedIndustry,
      selectedStyle,
      currentStep,
    };

    try {
      localStorage.setItem("websiteGeneratorState", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [
    isLoaded,
    siteName,
    siteDescription,
    siteUrl,
    selectedFeatures,
    selectedStructure,
    pageConfigs,
    selectedIndustry,
    selectedStyle,
    currentStep,
  ]);

  // Initialize page configs when features change
  useEffect(() => {
    const newConfigs: PageConfig[] = selectedFeatures.map((featureId) => {
      const feature = featureCategories.flatMap((c) => c.features).find((f) => f.id === featureId);
      const existing = pageConfigs.find((p) => p.featureId === featureId);
      
      if (existing) return existing;
      
      // Default configuration based on structure
      if (selectedStructure === "single-page") {
        return { featureId, onHomepage: true, hasOwnPage: false };
      } else if (selectedStructure === "multi-page") {
        return { featureId, onHomepage: false, hasOwnPage: feature?.canBePage ?? false };
      } else {
        // Hybrid - some on homepage, some separate
        const onHomepage = ["testimonials", "newsletter", "faq"].includes(featureId);
        const hasOwnPage = feature?.canBePage && !onHomepage;
        return { featureId, onHomepage, hasOwnPage: hasOwnPage ?? false };
      }
    });
    setPageConfigs(newConfigs);
  }, [selectedFeatures, selectedStructure]);

  // Derived state
  const currentIndustry = useMemo(
    () => industries.find((i) => i.id === selectedIndustry) || null,
    [selectedIndustry]
  );

  const currentStylePreset = useMemo(
    () => stylePresets.find((s) => s.id === selectedStyle) || null,
    [selectedStyle]
  );

  const steps: { id: Step; label: string; completed: boolean }[] = [
    { id: "features", label: "Features", completed: selectedFeatures.length > 0 && siteName.trim().length > 0 },
    { id: "structure", label: "Structure", completed: !!selectedStructure },
    { id: "industry", label: "Industry", completed: !!selectedIndustry },
    { id: "style", label: "Style", completed: !!selectedStyle },
    { id: "generate", label: "Generate", completed: status === "success" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Handlers
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((f) => f !== featureId) : [...prev, featureId]
    );
  };

  const updatePageConfig = (featureId: string, updates: Partial<PageConfig>) => {
    setPageConfigs((prev) =>
      prev.map((p) => (p.featureId === featureId ? { ...p, ...updates } : p))
    );
  };

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "features":
        return siteName.trim().length > 0;
      case "structure":
        return !!selectedStructure;
      case "industry":
        return !!selectedIndustry;
      case "style":
        return !!selectedStyle;
      default:
        return false;
    }
  };

  const handleGenerate = async () => {
    setStatus("generating");
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: siteName,
          description: siteDescription,
          url: siteUrl || "https://example.com",
          selectedFeatures,
          structure: selectedStructure,
          pageConfigs,
          industry: selectedIndustry,
          style: selectedStyle,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setResult(data);
      } else {
        setStatus("error");
        setError(data.error || "Generation failed");
      }
    } catch {
      setStatus("error");
      setError("Failed to connect to generator");
    }
  };

  const resetGenerator = () => {
    setCurrentStep("features");
    setStatus("idle");
    setResult(null);
    setSiteName("");
    setSiteDescription("");
    setSiteUrl("");
    setSelectedFeatures(["contact-form", "newsletter", "dark-mode", "seo"]);
    setSelectedStructure("hybrid");
    setPageConfigs([]);
    setSelectedIndustry(null);
    setSelectedStyle(null);
    
    // Clear localStorage
    try {
      localStorage.removeItem("websiteGeneratorState");
    } catch (error) {
      console.error("Error clearing state:", error);
    }
  };

  // Get configurable features (those selected and can be configured)
  const configurableFeatures = useMemo(() => {
    return featureCategories.flatMap((c) => c.features).filter((f) => selectedFeatures.includes(f.id));
  }, [selectedFeatures]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="relative text-center mb-8">
          <div className="absolute right-0 top-0 flex gap-2">
            <button
              onClick={resetGenerator}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm"
              title="Clear saved state and start fresh"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <Link
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Website Generator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Build Your Website</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Select features, choose structure, pick your industry & style, then generate.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => index <= currentStepIndex && setCurrentStep(step.id)}
                  disabled={index > currentStepIndex}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                    currentStep === step.id
                      ? "bg-violet-500/20 text-violet-400"
                      : step.completed
                      ? "text-slate-300 hover:bg-slate-800"
                      : "text-slate-600 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                      currentStep === step.id
                        ? "bg-violet-500 text-white"
                        : step.completed
                        ? "bg-slate-700 text-white"
                        : "bg-slate-800 text-slate-600"
                    )}
                  >
                    {step.completed && index < currentStepIndex ? <Check className="w-3 h-3" /> : index + 1}
                  </span>
                  <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-slate-700 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Success State */}
        {status === "success" && result ? (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Website Generated!</h2>
                <p className="text-slate-400">Your project has been created with {result.filesCount} files</p>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 text-slate-300 mb-3">
                  <FolderOpen className="w-5 h-5 text-violet-400" />
                  <code className="text-sm">{result.projectPath}</code>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {result.files.map((file) => (
                    <div key={file} className="flex items-center gap-2 text-xs text-slate-500">
                      <FileCode className="w-3 h-3" />
                      {file}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-400 mb-2">Next steps:</p>
                <code className="text-sm text-cyan-400">
                  cd output/{siteName.toLowerCase().replace(/\s+/g, "-")} && npm install && npm run dev
                </code>
              </div>

              <div className="flex gap-3">
                <a
                  href={`/api/download?name=${encodeURIComponent(siteName.toLowerCase().replace(/\s+/g, "-"))}`}
                  download
                  className="flex-1 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download ZIP
                </a>
                <button
                  onClick={resetGenerator}
                  className="flex-1 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
                >
                  Generate Another
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Content */
          <div className="max-w-5xl mx-auto">
            {/* Step 1: Features */}
            {currentStep === "features" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Site Details</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Site Name *</label>
                      <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="My Awesome Site"
                        className="w-full rounded-lg bg-slate-900/50 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">URL</label>
                      <input
                        type="url"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full rounded-lg bg-slate-900/50 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                      <textarea
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        placeholder="A brief description..."
                        rows={2}
                        className="w-full rounded-lg bg-slate-900/50 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                  </div>
                </div>

                {featureCategories.map((category) => (
                  <div key={category.id} className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-slate-400">{category.description}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {category.features.map((feature) => {
                        const isSelected = selectedFeatures.includes(feature.id);
                        const Icon = feature.icon;
                        return (
                          <button
                            key={feature.id}
                            onClick={() => toggleFeature(feature.id)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-xl text-left transition-all border",
                              isSelected
                                ? "bg-violet-500/10 border-violet-500/30 text-white"
                                : "bg-slate-900/30 border-slate-700/50 text-slate-300 hover:border-slate-600"
                            )}
                          >
                            <div className={cn("flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center", isSelected ? "bg-violet-500/20 text-violet-400" : "bg-slate-800 text-slate-500")}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{feature.name}</span>
                                {isSelected && <Check className="w-3 h-3 text-violet-400" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Structure */}
            {currentStep === "structure" && (
              <div className="space-y-6">
                {/* Structure Type Selection */}
                <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">Choose Site Structure</h2>
                    <p className="text-slate-400">How should your content be organized?</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {structureOptions.map((option) => {
                      const isSelected = selectedStructure === option.id;
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setSelectedStructure(option.id)}
                          className={cn(
                            "flex flex-col p-5 rounded-xl text-left transition-all border",
                            isSelected ? "bg-violet-500/10 border-violet-500/30" : "bg-slate-900/30 border-slate-700/50 hover:border-slate-600"
                          )}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", isSelected ? "bg-violet-500/20 text-violet-400" : "bg-slate-800 text-slate-500")}>
                              <Icon className="w-6 h-6" />
                            </div>
                            {isSelected && <Check className="w-5 h-5 text-violet-400" />}
                          </div>
                          <h3 className="font-semibold text-white mb-1">{option.name}</h3>
                          <p className="text-xs text-slate-400">{option.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Page Configuration */}
                <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white mb-2">Configure Pages</h2>
                    <p className="text-slate-400 text-sm">
                      Choose where each feature appears. Toggle "Homepage" to show as a section, "Own Page" for a dedicated page.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {configurableFeatures.map((feature) => {
                      const config = pageConfigs.find((p) => p.featureId === feature.id);
                      if (!config) return null;

                      return (
                        <div
                          key={feature.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-slate-900/30 border border-slate-700/50"
                        >
                          <div className="flex items-center gap-3">
                            <feature.icon className="w-5 h-5 text-slate-400" />
                            <div>
                              <div className="font-medium text-white">{feature.name}</div>
                              <div className="text-xs text-slate-500">{feature.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Homepage toggle */}
                            <label className="flex items-center gap-2 cursor-pointer">
                              <span className="text-xs text-slate-400">Homepage</span>
                              <button
                                onClick={() => updatePageConfig(feature.id, { onHomepage: !config.onHomepage })}
                                className={cn(
                                  "w-10 h-6 rounded-full transition-colors relative",
                                  config.onHomepage ? "bg-violet-500" : "bg-slate-700"
                                )}
                              >
                                <div
                                  className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                    config.onHomepage ? "translate-x-5" : "translate-x-1"
                                  )}
                                />
                              </button>
                            </label>

                            {/* Own page toggle */}
                            {feature.canBePage && (
                              <label className="flex items-center gap-2 cursor-pointer">
                                <span className="text-xs text-slate-400">Own Page</span>
                                <button
                                  onClick={() => updatePageConfig(feature.id, { hasOwnPage: !config.hasOwnPage })}
                                  className={cn(
                                    "w-10 h-6 rounded-full transition-colors relative",
                                    config.hasOwnPage ? "bg-cyan-500" : "bg-slate-700"
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                      config.hasOwnPage ? "translate-x-5" : "translate-x-1"
                                    )}
                                  />
                                </button>
                              </label>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Structure Preview */}
                  <div className="mt-6">
                    <StructurePreview structure={selectedStructure} features={selectedFeatures} pageConfigs={pageConfigs} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Industry */}
            {currentStep === "industry" && (
              <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Choose Your Industry</h2>
                  <p className="text-slate-400">This sets default colors, fonts, and styling for your niche.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {industries.map((industry) => {
                    const isSelected = selectedIndustry === industry.id;
                    const Icon = iconMap[industry.icon] || Briefcase;
                    return (
                      <button
                        key={industry.id}
                        onClick={() => setSelectedIndustry(industry.id)}
                        className={cn(
                          "flex flex-col p-4 rounded-xl text-left transition-all border",
                          isSelected ? "bg-violet-500/10 border-violet-500/30" : "bg-slate-900/30 border-slate-700/50 hover:border-slate-600"
                        )}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={cn("w-10 h-10 rounded-lg flex items-center justify-center", isSelected ? "text-violet-400" : "bg-slate-800 text-slate-500")}
                            style={isSelected ? { backgroundColor: `hsl(${industry.colors.primary} / 0.2)` } : {}}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && <Check className="w-5 h-5 text-violet-400" />}
                        </div>
                        <h3 className="font-semibold text-white mb-1">{industry.name}</h3>
                        <p className="text-xs text-slate-400 mb-3">{industry.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {industry.examples.map((ex) => (
                            <span key={ex} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                              {ex}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${industry.colors.primary})` }} />
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${industry.colors.accent})` }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Style */}
            {currentStep === "style" && (
              <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Choose a Style</h2>
                  <p className="text-slate-400">
                    {currentIndustry && <span className="text-violet-400">Optimized for {currentIndustry.name}. </span>}
                    Pick the visual style that matches your brand.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {stylePresets.map((style) => (
                    <StylePreview key={style.id} style={style} features={selectedFeatures} selected={selectedStyle === style.id} onClick={() => setSelectedStyle(style.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Generate with Preview */}
            {currentStep === "generate" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
                  <WebsitePreview siteName={siteName} industry={currentIndustry} style={currentStylePreset} features={selectedFeatures} pageConfigs={pageConfigs} />
                </div>

                <div>
                  <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Ready to Generate</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Site Name</span>
                        <span className="text-white font-medium">{siteName}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Structure</span>
                        <span className="text-white font-medium">{structureOptions.find((s) => s.id === selectedStructure)?.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Features</span>
                        <span className="text-white font-medium">{selectedFeatures.length} selected</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Industry</span>
                        <div className="flex items-center gap-2">
                          {currentIndustry && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${currentIndustry.colors.primary})` }} />}
                          <span className="text-white font-medium">{currentIndustry?.name}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Style</span>
                        <span className="text-white font-medium">{currentStylePreset?.name}</span>
                      </div>
                    </div>

                    {/* Page structure summary */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-3">Site structure:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-400">Homepage</span>
                        {pageConfigs
                          .filter((p) => p.hasOwnPage)
                          .map((p) => (
                            <span key={p.featureId} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                              /{p.featureId}
                            </span>
                          ))}
                      </div>
                    </div>

                    {error && <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

                    <button
                      onClick={handleGenerate}
                      disabled={status === "generating"}
                      className={cn(
                        "w-full py-4 rounded-lg font-medium inline-flex items-center justify-center gap-2",
                        "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500",
                        "text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {status === "generating" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate Website
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            {currentStep !== "generate" || status === "idle" ? (
              <div className="flex justify-between mt-8">
                <button
                  onClick={goBack}
                  disabled={currentStepIndex === 0}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
                    currentStepIndex === 0 ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-800"
                  )}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
                    canProceed() ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-slate-800 text-slate-600 cursor-not-allowed"
                  )}
                >
                  {currentStep === "style" ? "Review" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
