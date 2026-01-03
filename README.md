# Agency OS - Golden Master Template

A high-reusability website builder template based on the "Golden Master" architecture. This template separates **Rigid Infrastructure** from **Client Customization** to enable rapid website deployment at agency scale.

## 🏗️ Architecture

```
WebsiteGenerator/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # CSS Variable System (Visual Config)
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # 🔒 Atomic primitives (Button, Input)
│   ├── modules/            # 🌾 Harvested reusable features
│   └── custom/             # 🎨 Vibecoded client-specific components
├── config/
│   └── site.ts             # 📋 Site configuration (The "Skin")
├── lib/
│   └── utils.ts            # Utility functions
└── .cursorrules            # AI development guidelines
```

## 🎯 Core Concepts

### Rigid Infrastructure (Don't Touch)
- `tailwind.config.ts` - Theme mapping to CSS variables
- `lib/utils.ts` - Shared utilities
- `components/ui/` - Atomic UI components

### Client Customization (The "Skin")
- `config/site.ts` - All site content and configuration
- `app/globals.css` - CSS variables for colors, fonts, spacing

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Customization Guide

### 1. Site Content (`config/site.ts`)
```typescript
export const siteConfig = {
  name: "Your Brand",
  description: "Your description",
  navItems: [...],
  socials: [...],
  features: {
    enableBlog: true,
    // ...
  }
};
```

### 2. Visual Theme (`app/globals.css`)
```css
:root {
  --primary: 262 83% 58%;        /* Change brand color */
  --background: 0 0% 100%;       /* Change background */
  --radius: 0.75rem;             /* Change border radius */
}
```

## 📦 Component Types

| Directory | Purpose | Example |
|-----------|---------|---------|
| `ui/` | Atomic primitives | Button, Input, Card |
| `modules/` | Reusable features | Hero, Navbar, Footer |
| `custom/` | One-off features | PizzaCalculator |

## 🤖 AI Development

The `.cursorrules` file ensures AI assistants follow the Golden Master architecture:
- Use `siteConfig` for content
- Use CSS variables for styling
- Place components in correct directories

## 📝 License

MIT © Agency OS

