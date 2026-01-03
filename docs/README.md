# Website Generator - Documentation

> **Last Updated:** January 3, 2026  
> **Status:** Active Development  
> **Current Phase:** Core Generator Complete, UI Wizard Complete

## Quick Links

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Project structure, folder organization, tech stack |
| [GENERATOR.md](./GENERATOR.md) | How the website generator engine works |
| [WIZARD.md](./WIZARD.md) | The 5-step wizard UI flow |
| [CHANGELOG.md](./CHANGELOG.md) | History of all changes and features added |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | **START HERE** - Context for continuing development |

---

## What is This Project?

A **Website Generator Tool** that allows you to:

1. **Select features** for a website (blog, contact form, customer portal, etc.)
2. **Configure structure** (single-page, multi-page, or hybrid layout)
3. **Choose industry** (restaurant, tech, healthcare, etc.) for appropriate styling
4. **Pick a visual style** (minimal, bold, elegant, tech, etc.)
5. **Generate** a complete Next.js project with all selected options

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEBSITE GENERATOR TOOL                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐   ┌───────────┐   ┌──────────┐   ┌─────────┐     │
│  │ Features │ → │ Structure │ → │ Industry │ → │  Style  │     │
│  └──────────┘   └───────────┘   └──────────┘   └─────────┘     │
│        │              │              │              │            │
│        ▼              ▼              ▼              ▼            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    GENERATE                              │   │
│  │  Creates complete Next.js project in /output folder     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Generated Output

When you generate a website, it creates a complete project in:
```
output/
└── {project-name}/
    ├── app/           # Next.js pages
    ├── components/    # UI and feature components
    ├── config/        # Site configuration
    ├── lib/           # Utilities
    └── ...config files
```

## Key Concepts

### 1. Features (16 available)
Selectable functionality like Blog, Contact Form, Pricing, FAQ, etc.

### 2. Structure Types
- **Single Page**: Everything on one scrolling page
- **Multi-Page**: Each feature gets its own route
- **Hybrid**: Mix of homepage sections and separate pages

### 3. Industries (10 presets)
Pre-configured color palettes and font pairings for different business types.

### 4. Styles (8 presets)
Visual styles like Minimal, Bold, Elegant, Playful, Corporate, Luxe, Organic, Tech.

---

## For AI/Cursor

**Always read [DEVELOPMENT.md](./DEVELOPMENT.md) first** when continuing work on this project. It contains:
- Current state and last completed work
- Pending tasks and next steps
- Important context for decision making

