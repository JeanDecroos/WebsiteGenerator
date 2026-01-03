/**
 * Industry Definitions
 * ====================
 * Each industry has default styling preferences that serve as a starting point.
 * Users can then customize further with style presets.
 */

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  /** Default color palette for this industry (HSL values) */
  defaultColors: {
    primary: string;
    accent: string;
  };
  /** Suggested font pairing */
  suggestedFonts: {
    heading: string;
    body: string;
  };
  /** Common features for this industry */
  suggestedFeatures: string[];
  /** Example businesses */
  examples: string[];
}

export const industries: Industry[] = [
  {
    id: "restaurant-food",
    name: "Restaurant & Food",
    description: "Restaurants, bakeries, cafes, catering",
    icon: "UtensilsCrossed",
    defaultColors: {
      primary: "24 95% 53%", // Warm orange
      accent: "43 96% 56%", // Golden yellow
    },
    suggestedFonts: {
      heading: "Playfair Display",
      body: "Lato",
    },
    suggestedFeatures: ["contact-form", "booking", "testimonials", "newsletter"],
    examples: ["Bakery", "Italian Restaurant", "Coffee Shop", "Food Truck"],
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Law firms, accountants, consultants",
    icon: "Briefcase",
    defaultColors: {
      primary: "222 47% 31%", // Navy blue
      accent: "43 74% 49%", // Gold
    },
    suggestedFonts: {
      heading: "Libre Baskerville",
      body: "Source Sans Pro",
    },
    suggestedFeatures: ["contact-form", "team", "testimonials", "faq"],
    examples: ["Law Firm", "Accounting", "Consulting", "Financial Advisor"],
  },
  {
    id: "tech-saas",
    name: "Tech & SaaS",
    description: "Software, startups, tech companies",
    icon: "Cpu",
    defaultColors: {
      primary: "262 83% 58%", // Violet
      accent: "187 92% 50%", // Cyan
    },
    suggestedFonts: {
      heading: "Space Grotesk",
      body: "Inter",
    },
    suggestedFeatures: ["pricing", "blog", "newsletter", "faq", "customer-portal"],
    examples: ["SaaS Platform", "Dev Tools", "AI Startup", "Mobile App"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    description: "Clinics, therapists, fitness, spa",
    icon: "Heart",
    defaultColors: {
      primary: "173 58% 39%", // Teal
      accent: "142 76% 36%", // Green
    },
    suggestedFonts: {
      heading: "Nunito",
      body: "Open Sans",
    },
    suggestedFeatures: ["booking", "contact-form", "team", "testimonials", "faq"],
    examples: ["Medical Clinic", "Therapist", "Yoga Studio", "Wellness Spa"],
  },
  {
    id: "creative-agency",
    name: "Creative & Agency",
    description: "Design studios, agencies, freelancers",
    icon: "Palette",
    defaultColors: {
      primary: "0 0% 9%", // Near black
      accent: "358 75% 59%", // Coral red
    },
    suggestedFonts: {
      heading: "Syne",
      body: "DM Sans",
    },
    suggestedFeatures: ["portfolio", "testimonials", "contact-form", "team"],
    examples: ["Design Agency", "Marketing Agency", "Photographer", "Videographer"],
  },
  {
    id: "ecommerce-retail",
    name: "E-commerce & Retail",
    description: "Online stores, boutiques, shops",
    icon: "ShoppingBag",
    defaultColors: {
      primary: "0 0% 15%", // Charcoal
      accent: "45 93% 47%", // Amber
    },
    suggestedFonts: {
      heading: "Poppins",
      body: "Roboto",
    },
    suggestedFeatures: ["newsletter", "testimonials", "faq", "contact-form"],
    examples: ["Fashion Boutique", "Home Goods", "Electronics", "Jewelry"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Agents, property management, rentals",
    icon: "Home",
    defaultColors: {
      primary: "210 40% 35%", // Slate blue
      accent: "142 76% 36%", // Green
    },
    suggestedFonts: {
      heading: "Montserrat",
      body: "Raleway",
    },
    suggestedFeatures: ["contact-form", "portfolio", "testimonials", "team"],
    examples: ["Real Estate Agent", "Property Management", "Luxury Homes", "Commercial"],
  },
  {
    id: "education",
    name: "Education & Training",
    description: "Schools, courses, coaching, tutoring",
    icon: "GraduationCap",
    defaultColors: {
      primary: "221 83% 53%", // Royal blue
      accent: "38 92% 50%", // Orange
    },
    suggestedFonts: {
      heading: "Merriweather",
      body: "Source Sans Pro",
    },
    suggestedFeatures: ["blog", "testimonials", "pricing", "faq", "newsletter"],
    examples: ["Online Course", "Coaching", "School", "Training Center"],
  },
  {
    id: "nonprofit",
    name: "Non-profit & Community",
    description: "Charities, organizations, causes",
    icon: "HeartHandshake",
    defaultColors: {
      primary: "142 76% 36%", // Green
      accent: "210 40% 50%", // Blue
    },
    suggestedFonts: {
      heading: "Cabin",
      body: "Lora",
    },
    suggestedFeatures: ["blog", "team", "testimonials", "newsletter", "contact-form"],
    examples: ["Charity", "Foundation", "Community Org", "Environmental"],
  },
  {
    id: "entertainment",
    name: "Entertainment & Events",
    description: "Musicians, venues, event planners",
    icon: "Music",
    defaultColors: {
      primary: "280 68% 60%", // Purple
      accent: "340 82% 52%", // Pink
    },
    suggestedFonts: {
      heading: "Bebas Neue",
      body: "Archivo",
    },
    suggestedFeatures: ["portfolio", "booking", "contact-form", "testimonials"],
    examples: ["Band/Musician", "Event Venue", "DJ", "Event Planner"],
  },
];

export function getIndustryById(id: string): Industry | undefined {
  return industries.find((i) => i.id === id);
}

