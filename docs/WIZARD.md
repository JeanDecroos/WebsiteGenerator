# Wizard UI

> **Last Updated:** January 3, 2026

The wizard is a 5-step form that guides users through website generation.

---

## Flow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: FEATURES                                               │
│  ├─ Site Name* (required)                                       │
│  ├─ URL                                                         │
│  ├─ Description                                                 │
│  └─ Feature Selection (16 options in 4 categories)              │
├─────────────────────────────────────────────────────────────────┤
│  Step 2: STRUCTURE                                              │
│  ├─ Structure Type (Single/Multi/Hybrid)                        │
│  └─ Per-Feature Configuration                                   │
│      ├─ Homepage toggle (show as section)                       │
│      └─ Own Page toggle (create dedicated route)                │
├─────────────────────────────────────────────────────────────────┤
│  Step 3: INDUSTRY                                               │
│  └─ Select from 10 industry presets                             │
│      (sets colors, fonts, tone)                                 │
├─────────────────────────────────────────────────────────────────┤
│  Step 4: STYLE                                                  │
│  └─ Select from 8 visual style presets                          │
│      (sets border-radius, shadows, dark/light mode)             │
├─────────────────────────────────────────────────────────────────┤
│  Step 5: GENERATE                                               │
│  ├─ Live Website Preview                                        │
│  ├─ Configuration Summary                                       │
│  └─ Generate Button → Creates project in /output                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step Details

### Step 1: Features

**Site Details Form:**
- Site Name (required) - used for project folder name
- URL (optional) - defaults to https://example.com
- Description (optional)

**Feature Categories:**

| Category | Features |
|----------|----------|
| Content | Blog, Portfolio, Team Section, Testimonials, FAQ |
| Interaction | Contact Form, Newsletter, Booking, Live Chat |
| Commerce | Pricing Tables, Customer Portal, Authentication |
| Utility | Analytics, Advanced SEO, Dark Mode, Multi-language |

**Default Selected:** Contact Form, Newsletter, Dark Mode, Advanced SEO

### Step 2: Structure

**Structure Types:**

| Type | Description | Best For |
|------|-------------|----------|
| Single Page | All content on one scrolling page | Landing pages, simple sites |
| Multi-Page | Each feature gets its own route | Content-rich sites |
| Hybrid | Mix of homepage sections + separate pages | Most flexible |

**Per-Feature Configuration:**
- **Homepage Toggle**: Show feature as a section on the main page
- **Own Page Toggle**: Create a dedicated `/feature-name` route

Note: Some features can only be homepage sections (testimonials, newsletter, live-chat) and cannot have their own page.

### Step 3: Industry

10 industry presets, each with:
- Primary color (HSL)
- Accent color (HSL)
- Heading font
- Body font
- Example business types

### Step 4: Style

8 visual style presets:

| Style | Border Radius | Characteristics |
|-------|---------------|-----------------|
| Minimal | Small | Clean, whitespace, thin borders |
| Bold | Large | High contrast, vibrant |
| Elegant | None | Refined, serif headings |
| Playful | Full | Rounded, bright, bouncy |
| Corporate | Medium | Grid-based, conservative |
| Luxe | None | Dark mode, gold accents |
| Organic | Extra Large | Soft curves, earth tones |
| Tech | Large | Gradients, glass effects, dark |

### Step 5: Generate

**Left Column - Live Preview:**
- Browser mockup with URL bar
- Responsive navbar with navigation links
- Hero section with industry colors
- Feature sections based on pageConfigs
- Footer

**Right Column - Summary:**
- Site name
- Structure type
- Features count
- Industry with color preview
- Style name
- Site structure (pages that will be created)
- Generate button

---

## State Management

All state is managed with React `useState`:

```typescript
// Step management
const [currentStep, setCurrentStep] = useState<Step>("features");

// Form state
const [siteName, setSiteName] = useState("");
const [siteDescription, setSiteDescription] = useState("");
const [siteUrl, setSiteUrl] = useState("");
const [selectedFeatures, setSelectedFeatures] = useState<string[]>([...]);
const [selectedStructure, setSelectedStructure] = useState<string>("hybrid");
const [pageConfigs, setPageConfigs] = useState<PageConfig[]>([]);
const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

// Generation state
const [status, setStatus] = useState<"idle" | "generating" | "success" | "error">("idle");
const [result, setResult] = useState<GenerationResult | null>(null);
```

---

## Navigation Behavior

- **Next Button**: Enabled only when current step requirements are met
- **Back Button**: Always enabled (except on step 1)
- **Step Indicators**: Clickable to navigate to completed steps
- **Auto-Scroll**: Page scrolls to top when changing steps

---

## UI Components (Inline)

The wizard contains several inline components:

1. **StructurePreview** - Visual sitemap of configured structure
2. **WebsitePreview** - Full browser mockup for step 5
3. **StylePreview** - Mini preview card for each style option

---

## API Integration

On "Generate" button click:

```typescript
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
```

Response:
```typescript
{
  success: true,
  projectPath: "/path/to/output/project-name",
  filesCount: 25,
  files: ["package.json", "app/page.tsx", ...]
}
```

