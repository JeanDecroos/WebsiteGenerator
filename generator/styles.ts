/**
 * Style Presets
 * =============
 * Visual styles that can be applied to any industry.
 * Each style defines layout, spacing, and aesthetic choices.
 */

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  /** Visual characteristics */
  characteristics: {
    corners: "sharp" | "rounded" | "pill"; // Border radius style
    spacing: "compact" | "balanced" | "spacious"; // Whitespace
    contrast: "subtle" | "medium" | "bold"; // Color contrast
    typography: "classic" | "modern" | "expressive"; // Font weight/style
    layout: "structured" | "asymmetric" | "centered"; // Page layout
  };
  /** CSS variable overrides */
  cssOverrides: {
    radius: string;
    // Additional spacing multiplier
    spacingScale: number;
  };
  /** Preview description for UI */
  previewHints: string[];
  /** Best suited industries */
  suitedFor: string[];
}

export const stylePresets: StylePreset[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, understated, lots of whitespace",
    characteristics: {
      corners: "sharp",
      spacing: "spacious",
      contrast: "subtle",
      typography: "modern",
      layout: "centered",
    },
    cssOverrides: {
      radius: "0.25rem",
      spacingScale: 1.5,
    },
    previewHints: [
      "Thin borders",
      "Generous padding",
      "Subtle hover effects",
      "Monochromatic accents",
    ],
    suitedFor: ["tech-saas", "creative-agency", "professional-services"],
  },
  {
    id: "bold",
    name: "Bold",
    description: "High contrast, strong colors, impactful",
    characteristics: {
      corners: "rounded",
      spacing: "balanced",
      contrast: "bold",
      typography: "expressive",
      layout: "asymmetric",
    },
    cssOverrides: {
      radius: "1rem",
      spacingScale: 1.2,
    },
    previewHints: [
      "Large headings",
      "Vibrant colors",
      "Strong shadows",
      "Dynamic layouts",
    ],
    suitedFor: ["entertainment", "creative-agency", "ecommerce-retail"],
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Refined, sophisticated, timeless",
    characteristics: {
      corners: "sharp",
      spacing: "spacious",
      contrast: "medium",
      typography: "classic",
      layout: "centered",
    },
    cssOverrides: {
      radius: "0.125rem",
      spacingScale: 1.4,
    },
    previewHints: [
      "Serif headings",
      "Muted color palette",
      "Fine details",
      "Symmetrical layouts",
    ],
    suitedFor: ["professional-services", "real-estate", "restaurant-food"],
  },
  {
    id: "playful",
    name: "Playful",
    description: "Fun, colorful, approachable",
    characteristics: {
      corners: "pill",
      spacing: "balanced",
      contrast: "bold",
      typography: "expressive",
      layout: "asymmetric",
    },
    cssOverrides: {
      radius: "9999px",
      spacingScale: 1.1,
    },
    previewHints: [
      "Rounded shapes",
      "Bright accents",
      "Bouncy animations",
      "Friendly tone",
    ],
    suitedFor: ["education", "entertainment", "nonprofit", "restaurant-food"],
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional, trustworthy, structured",
    characteristics: {
      corners: "rounded",
      spacing: "compact",
      contrast: "medium",
      typography: "modern",
      layout: "structured",
    },
    cssOverrides: {
      radius: "0.5rem",
      spacingScale: 1.0,
    },
    previewHints: [
      "Grid-based layout",
      "Conservative colors",
      "Clear hierarchy",
      "Data-focused",
    ],
    suitedFor: ["professional-services", "tech-saas", "healthcare"],
  },
  {
    id: "luxe",
    name: "Luxe",
    description: "Premium, exclusive, high-end",
    characteristics: {
      corners: "sharp",
      spacing: "spacious",
      contrast: "bold",
      typography: "classic",
      layout: "centered",
    },
    cssOverrides: {
      radius: "0rem",
      spacingScale: 1.6,
    },
    previewHints: [
      "Gold accents",
      "Dark backgrounds",
      "Dramatic imagery",
      "Cinematic feel",
    ],
    suitedFor: ["real-estate", "restaurant-food", "ecommerce-retail", "creative-agency"],
  },
  {
    id: "organic",
    name: "Organic",
    description: "Natural, warm, earthy",
    characteristics: {
      corners: "rounded",
      spacing: "balanced",
      contrast: "subtle",
      typography: "classic",
      layout: "asymmetric",
    },
    cssOverrides: {
      radius: "1.5rem",
      spacingScale: 1.3,
    },
    previewHints: [
      "Soft curves",
      "Earth tones",
      "Natural textures",
      "Flowing layouts",
    ],
    suitedFor: ["healthcare", "nonprofit", "restaurant-food", "education"],
  },
  {
    id: "tech",
    name: "Tech",
    description: "Futuristic, gradient-heavy, glass effects",
    characteristics: {
      corners: "rounded",
      spacing: "balanced",
      contrast: "bold",
      typography: "modern",
      layout: "structured",
    },
    cssOverrides: {
      radius: "0.75rem",
      spacingScale: 1.2,
    },
    previewHints: [
      "Gradient backgrounds",
      "Glass morphism",
      "Neon accents",
      "Dark mode default",
    ],
    suitedFor: ["tech-saas", "entertainment", "creative-agency"],
  },
];

export function getStyleById(id: string): StylePreset | undefined {
  return stylePresets.find((s) => s.id === id);
}

export function getStylesForIndustry(industryId: string): StylePreset[] {
  return stylePresets.filter((s) => s.suitedFor.includes(industryId));
}

