# Architecture

> **Last Updated:** January 3, 2026

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS framework |
| **Lucide React** | Icon library |
| **clsx + tailwind-merge** | Conditional class utilities |

---

## Project Structure

```
WebsiteGenerator/
│
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # POST /api/generate - Main generation endpoint
│   ├── globals.css               # Global styles for the generator UI
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # ⭐ WIZARD UI - The 5-step generator interface
│
├── components/
│   ├── ui/                       # Atomic UI primitives (empty, for shadcn)
│   ├── modules/                  # Reusable feature components
│   │   ├── hero.tsx              # Hero section component
│   │   └── index.ts              # Module exports
│   └── custom/                   # One-off client components (empty)
│
├── config/
│   └── site.ts                   # Site configuration for the generator tool itself
│
├── generator/                    # ⭐ CORE GENERATION ENGINE
│   ├── index.ts                  # Main generateWebsite() function
│   ├── features.ts               # Feature definitions and dependency resolver
│   ├── industries.ts             # Industry presets (colors, fonts)
│   ├── styles.ts                 # Visual style presets
│   └── templates/
│       ├── base/                 # Base template files
│       │   ├── package.json.ts   # Package.json generator
│       │   ├── site-config.ts    # Site config generator
│       │   └── globals-css.ts    # CSS variables generator
│       └── features/             # Feature-specific templates
│           ├── blog.ts           # Blog feature files
│           ├── contact-form.ts   # Contact form files
│           ├── customer-portal.ts# Portal files
│           └── newsletter.ts     # Newsletter files
│
├── lib/
│   └── utils.ts                  # cn() utility for class merging
│
├── output/                       # ⭐ GENERATED PROJECTS GO HERE
│   └── {project-name}/           # Each generated site gets its own folder
│
├── docs/                         # ⭐ DOCUMENTATION (you are here)
│   ├── README.md                 # Overview and quick links
│   ├── ARCHITECTURE.md           # This file
│   ├── GENERATOR.md              # How generation works
│   ├── WIZARD.md                 # UI wizard documentation
│   ├── CHANGELOG.md              # History of changes
│   └── DEVELOPMENT.md            # Context for AI/developers
│
└── .cursorrules                  # AI development guidelines
```

---

## Key Files Explained

### `app/page.tsx` - The Wizard UI
The main interface. A 5-step wizard that collects:
1. Site details + feature selection
2. Structure configuration (page layout)
3. Industry selection
4. Style selection
5. Review + Generate

**~800 lines** containing:
- All UI components (inline for simplicity)
- Data definitions (features, industries, styles)
- Form state management
- Preview components
- API integration

### `app/api/generate/route.ts` - Generation API
POST endpoint that:
1. Receives configuration from wizard
2. Calls `generateWebsite()` from generator
3. Applies industry-specific fonts
4. Applies style-specific CSS overrides
5. Generates separate pages based on structure config
6. Writes all files to `/output/{project-name}/`

### `generator/index.ts` - Core Generator
The heart of the system. Contains:
- `GeneratorConfig` interface
- `generateWebsite()` function
- Template generators for all base files
- Feature-specific file generators

---

## Data Flow

```
User Input (Wizard)
        │
        ▼
┌───────────────────┐
│ POST /api/generate │
│   - name          │
│   - features[]    │
│   - structure     │
│   - pageConfigs[] │
│   - industry      │
│   - style         │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ generateWebsite() │
│ (generator/index) │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Apply overrides   │
│ - Industry fonts  │
│ - Style CSS vars  │
│ - Page structure  │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Write to disk     │
│ /output/{name}/   │
└───────────────────┘
```

---

## CSS Variable System

All generated sites use HSL color variables:

```css
:root {
  --background: 0 0% 100%;      /* White */
  --foreground: 222 47% 11%;    /* Dark text */
  --primary: 262 83% 58%;       /* Brand color */
  --accent: 187 92% 50%;        /* Accent color */
  /* ...more */
}
```

Industry presets override `--primary` and `--accent`.
Style presets override `--radius` and can swap to dark mode.

---

## Component Conventions

### Server vs Client Components
- Default to **Server Components** (no directive)
- Add `"use client"` only when needed (useState, useEffect, onClick)

### Styling
- Always use Tailwind classes with CSS variables
- Use `cn()` for conditional classes:
  ```tsx
  className={cn("base-class", condition && "conditional-class")}
  ```

### Icons
- Always use `lucide-react`
- Import individually: `import { Menu, X } from "lucide-react"`

