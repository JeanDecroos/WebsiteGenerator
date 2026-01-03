# Changelog

> **Last Updated:** January 3, 2026

All notable changes to this project.

---

## [Unreleased]

### Planned
- [ ] More feature templates
- [ ] Custom color picker
- [ ] Template preview gallery
- [ ] Deploy to Vercel integration
- [ ] Quick preview mode (dev server in iframe)

---

## January 3, 2026

### Session 4 - Project Management Features

#### Added
- **Projects Page** (`/projects`) - Central hub for managing generated projects
  - List all generated projects with creation/modification dates
  - Delete projects with confirmation
  - Download projects as ZIP files
  - Refresh button to reload project list
  - Link in wizard header for easy access
- **ZIP Export** - Download any generated project as a ZIP file
  - API endpoint `/api/download?name={project-name}`
  - Download button on success screen after generation
  - Download button on each project in projects page
  - Uses `archiver` npm package for compression
- **State Persistence** - Wizard state automatically saved
  - All wizard inputs saved to localStorage
  - Auto-restore on page load/refresh
  - "Reset" button to clear state and start fresh
  - Prevents data loss from accidental refresh

#### Changed
- Wizard header now includes Reset and Projects buttons
- Success screen now has side-by-side Download ZIP and Generate Another buttons
- Package.json updated with `archiver` dependency

---

### Session 3 - Structure & Documentation

#### Added
- **Structure Step** - New wizard step (Step 2) for configuring site layout
  - Single Page, Multi-Page, Hybrid options
  - Per-feature Homepage/Own Page toggles
  - Live structure preview (sitemap visualization)
- **Separate Page Generation** - Backend generates dedicated routes for features
  - 9 feature page templates (blog, portfolio, team, contact, pricing, faq, booking, portal, auth)
  - Dynamic homepage generation based on pageConfigs
  - Navigation links based on structure
- **Documentation Folder** - Comprehensive docs in `/docs`
  - README.md - Overview
  - ARCHITECTURE.md - Project structure
  - GENERATOR.md - Generation engine
  - WIZARD.md - UI documentation
  - CHANGELOG.md - This file
  - DEVELOPMENT.md - AI/developer context

#### Changed
- Wizard now has 5 steps (was 4)
- API route handles structure and pageConfigs
- Generator config interface extended with structure fields

---

### Session 2 - Industry & Style

#### Added
- **Industry Selection** (Step 3) - 10 industry presets
  - Restaurant & Food
  - Professional Services
  - Tech & SaaS
  - Healthcare & Wellness
  - Creative & Agency
  - E-commerce & Retail
  - Real Estate
  - Education & Training
  - Non-profit
  - Entertainment
- **Style Selection** (Step 4) - 8 visual style presets
  - Minimal, Bold, Elegant, Playful
  - Corporate, Luxe, Organic, Tech
- **Website Preview** - Live preview in Step 5
  - Browser mockup with URL bar
  - Dynamic sections based on features
  - Industry colors applied
- **Auto-Scroll** - Smooth scroll to top on step change

#### Changed
- API route applies industry fonts to layout
- API route applies style border-radius to CSS
- Dark mode styles (Luxe, Tech) swap color scheme

---

### Session 1 - Core Generator

#### Added
- **Initial Project Setup**
  - Next.js 14 with App Router
  - TypeScript strict mode
  - Tailwind CSS with CSS variable system
  - Shadcn-compatible theming
- **Generator Engine** (`generator/`)
  - Feature definitions and dependency resolver
  - Base templates (package.json, tsconfig, tailwind, etc.)
  - Feature templates (blog, contact, portal, newsletter)
- **Wizard UI** - Multi-step form
  - Feature selection with categories
  - Site details form
- **API Route** - POST /api/generate
  - File generation and disk writing
  - Output to /output/{project-name}/
- **Component Structure**
  - modules/ for reusable components
  - ui/ for primitives (empty)
  - custom/ for one-offs (empty)
- **.cursorrules** - AI development guidelines

---

## Architecture Decisions

### Why Inline Components in page.tsx?
The wizard UI (~800 lines) keeps all components inline for simplicity. This could be extracted later but currently:
- All wizard state is local
- Components are tightly coupled to wizard logic
- Easier to understand flow in one file

### Why HSL Colors?
HSL format allows easy manipulation of colors (lightness adjustments) and is the Shadcn UI convention.

### Why Separate /generator Folder?
The generator is conceptually separate from the Next.js app. It could be extracted to its own package later for CLI usage.

### Why Write to /output?
Keeps generated projects isolated from the generator tool itself. Easy to test, delete, and manage multiple generated sites.

