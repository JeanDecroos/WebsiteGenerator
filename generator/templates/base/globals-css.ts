/**
 * Global CSS template generator
 */
export function generateGlobalsCss(config: {
  primaryColor?: string;
  features: string[];
}): string {
  // Default to a nice violet if not specified
  const primary = config.primaryColor || "262 83% 58%";

  return `/**
 * Global Styles
 * =============
 * CSS Variable System - Edit these to change your site's look.
 * Uses HSL format (without hsl() wrapper) for Tailwind compatibility.
 */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Background & Foreground */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    /* Card */
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    /* Popover */
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    /* Primary - Your Brand Color */
    --primary: ${primary};
    --primary-foreground: 0 0% 100%;

    /* Secondary */
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    /* Muted */
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    /* Accent */
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    /* Destructive */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    /* Border, Input, Ring */
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: ${primary};

    /* Border Radius */
    --radius: 0.75rem;

    /* Typography */
    --font-heading: "Plus Jakarta Sans", system-ui, sans-serif;
    --font-body: "Inter", system-ui, sans-serif;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    --primary: ${primary.replace(/58%$/, "68%")};
    --primary-foreground: 0 0% 100%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: ${primary.replace(/58%$/, "68%")};
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-body;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading tracking-tight;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent;
  }

  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background;
  }

  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
  .animation-delay-500 { animation-delay: 500ms; }
}
`;
}

