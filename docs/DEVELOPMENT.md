# Development Guide

> **Last Updated:** January 3, 2026  
> **READ THIS FIRST** when continuing development

---

## Current State

### ✅ Completed
- [x] Core generator engine with 16 features
- [x] 5-step wizard UI (Features → Structure → Industry → Style → Generate)
- [x] 10 industry presets with colors and fonts
- [x] 8 visual style presets
- [x] Structure configuration (single-page, multi-page, hybrid)
- [x] Per-feature page configuration (homepage section vs own page)
- [x] Live website preview in final step
- [x] Auto-scroll on step change
- [x] File generation to /output folder
- [x] Documentation in /docs
- [x] **Projects management page** - View and delete generated projects
- [x] **ZIP export** - Download projects as ZIP files
- [x] **State persistence** - Wizard state saved to localStorage

### 🔄 In Progress
- Nothing currently in progress

### 📋 Potential Next Steps
1. Add more feature templates (portfolio gallery, team grid, etc.)
2. Custom color picker (override industry defaults)
3. Template preview gallery
4. Vercel deployment integration
5. More style presets
6. Custom font selection
7. Component library expansion
8. Quick preview mode (spin up dev server in iframe)

---

## Quick Reference

### Key Files to Know

| File | Purpose | When to Edit |
|------|---------|--------------|
| `app/page.tsx` | Wizard UI | Adding wizard steps, changing UI |
| `app/api/generate/route.ts` | Generation API | Changing how files are generated |
| `generator/index.ts` | Core generator | Adding new generated files |
| `generator/features.ts` | Feature definitions | Adding new features |

### Important Patterns

**Adding a new feature:**
1. Add to `featureCategories` in `app/page.tsx`
2. Add to `features` array in `generator/features.ts`
3. Add template in `generator/templates/features/`
4. Add generation logic in `generator/index.ts`
5. Update `app/api/generate/route.ts` if separate page needed

**Adding a new industry:**
1. Add to `industries` array in `app/page.tsx`
2. Add to `industryStyles` in `app/api/generate/route.ts`

**Adding a new style:**
1. Add to `stylePresets` array in `app/page.tsx`
2. Add to `styleOverrides` in `app/api/generate/route.ts`

---

## Code Conventions

### TypeScript
- Strict mode enabled
- No `any` types
- Interfaces over types for objects

### React
- Server Components by default
- `"use client"` only when needed
- Functional components with hooks

### Styling
- Tailwind utility classes
- CSS variables for colors (`bg-primary`, `text-foreground`)
- `cn()` utility for conditional classes

### File Naming
- kebab-case for files: `hero-section.tsx`
- PascalCase for components: `HeroSection`

---

## Testing the Generator

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Fill out wizard steps
4. Click Generate
5. Check `/output/{project-name}/` for generated files
6. Test generated project:
   ```bash
   cd output/{project-name}
   npm install
   npm run dev
   ```

---

## Common Tasks

### Run the generator UI
```bash
npm run dev
# Open http://localhost:3000
```

### Clear generated output
```bash
rm -rf output/*
```

### Check for TypeScript errors
```bash
npx tsc --noEmit
```

### Format code
```bash
npx prettier --write .
```

---

## Known Limitations

1. **Browser Automation**: React controlled inputs don't work well with browser automation tools (Playwright/Puppeteer) due to synthetic events. Test manually in browser.

2. **Large page.tsx**: The wizard UI is ~800 lines in one file. Could be split but currently manageable.

3. **No persistence**: Wizard state is lost on page refresh. Could add localStorage.

4. **Limited templates**: Feature templates are basic. Could be expanded with more variants.

---

## Architecture Notes

### Why `/output` folder?
Generated projects go to `/output/{project-name}/` to:
- Keep them separate from generator code
- Allow multiple test generations
- Easy to delete/reset

### Why inline components in page.tsx?
The wizard keeps components inline because:
- State is tightly coupled
- Easier to follow data flow
- Can be extracted later if needed

### Why HSL colors?
- Shadcn UI convention
- Easy to manipulate (lighten/darken)
- Clean CSS variable syntax

---

## Updating Documentation

**IMPORTANT**: Update these docs after significant changes:

1. **DEVELOPMENT.md** - Update "Current State" and "Potential Next Steps"
2. **CHANGELOG.md** - Add entry for what was changed
3. **Other docs** - Update if architecture/features changed

This ensures the next session (human or AI) has full context.

---

## Questions to Ask User

When starting a new session, consider asking:
1. "What would you like to work on next?"
2. "Should I review the current state first?"
3. "Are there any bugs or issues to address?"

---

## File Locations Quick Reference

```
WIZARD UI:           app/page.tsx
API ENDPOINT:        app/api/generate/route.ts
GENERATOR ENGINE:    generator/index.ts
FEATURE DEFINITIONS: generator/features.ts
INDUSTRY PRESETS:    app/page.tsx + app/api/generate/route.ts
STYLE PRESETS:       app/page.tsx + app/api/generate/route.ts
OUTPUT FOLDER:       output/
DOCUMENTATION:       docs/
AI GUIDELINES:       .cursorrules
```

