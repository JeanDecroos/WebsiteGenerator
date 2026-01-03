"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface HeroProps {
  title?: string;
  description?: string;
  className?: string;
}

export function Hero({ title, description, className }: HeroProps) {
  return (
    <section className={cn("relative overflow-hidden px-4 py-24 md:py-32", className)}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
          <Sparkles className="w-4 h-4" />
          <span>Welcome to {siteConfig.name}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
          {title || siteConfig.name}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up">
          {description || siteConfig.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
          <button className={cn(
            "inline-flex items-center gap-2 px-8 py-4 rounded-lg",
            "bg-primary text-primary-foreground font-medium",
            "hover:bg-primary/90 transition-colors"
          )}>
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button className={cn(
            "inline-flex items-center gap-2 px-8 py-4 rounded-lg",
            "bg-secondary text-secondary-foreground font-medium border",
            "hover:bg-secondary/80 transition-colors"
          )}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
