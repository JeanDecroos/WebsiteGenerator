"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for getting started",
    features: ["Up to 5 projects", "Basic analytics", "Email support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing businesses",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domain"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom integrations"],
    highlighted: false,
  },
];

export function PricingTable() {
  return (
    <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "rounded-lg border p-8 flex flex-col",
            plan.highlighted && "border-primary bg-primary/5 relative"
          )}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Most Popular
            </span>
          )}
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
          <div className="mt-4 mb-6">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>
          <ul className="space-y-3 flex-1">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            className={cn(
              "mt-8 w-full py-3 rounded-lg font-medium transition-colors",
              plan.highlighted
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            Get Started
          </button>
        </div>
      ))}
    </div>
  );
}

export default PricingTable;
