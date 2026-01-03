# Generator Engine

> **Last Updated:** January 3, 2026

The generator engine creates complete Next.js projects based on user configuration.

---

## Entry Point

```typescript
// generator/index.ts
export function generateWebsite(config: GeneratorConfig): GeneratedFile[]
```

### GeneratorConfig Interface

```typescript
interface GeneratorConfig {
  name: string;                              // Site name
  description: string;                       // Site description
  url: string;                               // Site URL
  selectedFeatures: string[];                // Feature IDs to include
  primaryColor?: string;                     // HSL color (e.g., "262 83% 58%")
  structure?: "single-page" | "multi-page" | "hybrid";
  pageConfigs?: PageConfig[];                // Per-feature page settings
}

interface PageConfig {
  featureId: string;
  onHomepage: boolean;   // Show as section on homepage
  hasOwnPage: boolean;   // Create dedicated /feature route
}
```

---

## Available Features

Defined in `generator/features.ts`:

| ID | Name | Can Be Page | Dependencies |
|----|------|-------------|--------------|
| `blog` | Blog | ✅ | seo |
| `portfolio` | Portfolio | ✅ | - |
| `team` | Team Section | ✅ | - |
| `testimonials` | Testimonials | ❌ | - |
| `faq` | FAQ Section | ✅ | - |
| `contact-form` | Contact Form | ✅ | - |
| `newsletter` | Newsletter | ❌ | - |
| `booking` | Booking System | ✅ | auth |
| `live-chat` | Live Chat | ❌ | - |
| `pricing` | Pricing Tables | ✅ | - |
| `customer-portal` | Customer Portal | ✅ | auth |
| `auth` | Authentication | ✅ | - |
| `analytics` | Analytics | ❌ | - |
| `seo` | Advanced SEO | ❌ | - |
| `dark-mode` | Dark Mode | ❌ | - |
| `i18n` | Multi-language | ❌ | - |

### Feature Dependencies

When a feature is selected, its dependencies are automatically included:
- `blog` → includes `seo`
- `booking` → includes `auth`
- `customer-portal` → includes `auth`

---

## Industries

Defined in `generator/industries.ts`:

| ID | Name | Primary Color | Font Pairing |
|----|------|---------------|--------------|
| `restaurant-food` | Restaurant & Food | Orange | Playfair Display + Lato |
| `professional-services` | Professional Services | Navy | Libre Baskerville + Source Sans |
| `tech-saas` | Tech & SaaS | Purple | Space Grotesk + Inter |
| `healthcare` | Healthcare | Teal | Nunito + Open Sans |
| `creative-agency` | Creative & Agency | Black | Syne + DM Sans |
| `ecommerce-retail` | E-commerce | Dark + Gold | Poppins + Roboto |
| `real-estate` | Real Estate | Blue | Montserrat + Raleway |
| `education` | Education | Blue | Merriweather + Source Sans |
| `nonprofit` | Non-profit | Green | Cabin + Lora |
| `entertainment` | Entertainment | Purple | Bebas Neue + Archivo |

---

## Styles

Defined in `generator/styles.ts`:

| ID | Name | Border Radius | Dark Mode |
|----|------|---------------|-----------|
| `minimal` | Minimal | 0.25rem | ❌ |
| `bold` | Bold | 1rem | ❌ |
| `elegant` | Elegant | 0.125rem | ❌ |
| `playful` | Playful | 9999px (full) | ❌ |
| `corporate` | Corporate | 0.5rem | ❌ |
| `luxe` | Luxe | 0rem | ✅ |
| `organic` | Organic | 1.5rem | ❌ |
| `tech` | Tech | 0.75rem | ✅ |

---

## Generated Files

### Base Files (Always Generated)

```
{project}/
├── package.json           # Dependencies based on features
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind with CSS variable mapping
├── postcss.config.mjs     # PostCSS config
├── next.config.mjs        # Next.js config (MDX if blog)
├── .gitignore
├── .cursorrules           # AI guidelines
├── config/
│   └── site.ts            # Site configuration
├── lib/
│   └── utils.ts           # cn() utility
├── app/
│   ├── globals.css        # CSS variables (colors from industry)
│   ├── layout.tsx         # Root layout (fonts from industry)
│   └── page.tsx           # Homepage (sections based on pageConfigs)
└── components/
    ├── modules/
    │   ├── hero.tsx
    │   ├── navbar.tsx
    │   ├── footer.tsx
    │   └── index.ts
    ├── ui/.gitkeep
    └── custom/.gitkeep
```

### Feature-Specific Files

When features are selected, additional files are generated:

**Blog:**
- `app/blog/page.tsx`
- `components/modules/blog-grid.tsx`

**Contact Form:**
- `app/contact/page.tsx` (if hasOwnPage)
- `components/modules/contact-form.tsx`
- `app/api/contact/route.ts`

**Newsletter:**
- `components/modules/newsletter.tsx`
- `app/api/newsletter/route.ts`

**Pricing:**
- `app/pricing/page.tsx` (if hasOwnPage)
- `components/modules/pricing-table.tsx`

**Customer Portal:**
- `app/portal/page.tsx`
- `components/modules/portal-dashboard.tsx`

**Dark Mode:**
- `components/theme-provider.tsx`
- `components/theme-toggle.tsx`

---

## Separate Page Generation

When `pageConfig.hasOwnPage = true`, the API route generates dedicated pages:

```typescript
// Supported feature pages
const featurePages = {
  blog: { title: "Blog", path: "app/blog/page.tsx" },
  portfolio: { title: "Portfolio", path: "app/portfolio/page.tsx" },
  team: { title: "Our Team", path: "app/team/page.tsx" },
  "contact-form": { title: "Contact", path: "app/contact-form/page.tsx" },
  pricing: { title: "Pricing", path: "app/pricing/page.tsx" },
  faq: { title: "FAQ", path: "app/faq/page.tsx" },
  booking: { title: "Booking", path: "app/booking/page.tsx" },
  "customer-portal": { title: "Dashboard", path: "app/customer-portal/page.tsx" },
  auth: { title: "Sign In", path: "app/auth/page.tsx" },
};
```

---

## Extending the Generator

### Adding a New Feature

1. Add to `generator/features.ts`:
   ```typescript
   { id: "new-feature", name: "New Feature", ... }
   ```

2. Create template in `generator/templates/features/new-feature.ts`

3. Add generation logic in `generator/index.ts`:
   ```typescript
   if (resolvedFeatures.includes("new-feature")) {
     files.push({ path: "...", content: "..." });
   }
   ```

4. Update wizard UI in `app/page.tsx` to include the feature

### Adding a New Industry

Add to both:
- `app/page.tsx` (wizard UI)
- `app/api/generate/route.ts` (industryStyles mapping)

### Adding a New Style

Add to both:
- `app/page.tsx` (wizard UI)
- `app/api/generate/route.ts` (styleOverrides mapping)

