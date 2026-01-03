"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Hero Module
 * ===========
 * A reusable hero section component that reads from siteConfig.
 * Place in components/modules as this is a "Harvested" generic feature.
 * 
 * Features:
 * - Animated entrance effects
 * - Responsive design
 * - Configurable via siteConfig
 * - Uses CSS variable theming
 */

interface HeroProps {
  /** Override the default title */
  title?: string;
  /** Override the default description */
  description?: string;
  /** Custom className for the section */
  className?: string;
}

export function Hero({ title, description, className }: HeroProps) {
  const displayTitle = title || siteConfig.name;
  const displayDescription = description || siteConfig.description;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "px-4 py-24 md:py-32 lg:py-40",
        className
      )}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Golden Master Architecture</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up animation-delay-100">
          Build Websites at
          <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Agency Scale
          </span>
        </h1>

        {/* Description */}
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-200">
          {displayDescription}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
          <button
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "px-8 py-4 rounded-lg",
              "bg-primary text-primary-foreground",
              "font-medium text-base",
              "transition-all duration-200",
              "hover:bg-primary/90 hover:scale-105",
              "focus-ring"
            )}
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "px-8 py-4 rounded-lg",
              "bg-secondary text-secondary-foreground",
              "font-medium text-base",
              "border border-border",
              "transition-all duration-200",
              "hover:bg-secondary/80",
              "focus-ring"
            )}
          >
            View Documentation
          </button>
        </div>

        {/* Stats or trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up animation-delay-400">
          {[
            { value: "50+", label: "Sites Deployed" },
            { value: "99%", label: "Uptime SLA" },
            { value: "10x", label: "Faster Builds" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;

