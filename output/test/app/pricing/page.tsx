import { Metadata } from "next";
import { PricingTable } from "@/components/modules/pricing-table";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for everyone",
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that's right for you
        </p>
      </div>
      <PricingTable />
    </div>
  );
}
