import { Hero } from "@/components/modules/hero";

import { PricingTable } from "@/components/modules/pricing-table";
import { FAQ } from "@/components/modules/faq";
import { Newsletter } from "@/components/modules/newsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      <section className="py-16 px-4"><div className="container mx-auto"><h2 className="text-3xl font-bold text-center mb-12">Pricing</h2><PricingTable /></div></section>
      <FAQ />
      <section className="py-16 px-4"><div className="container mx-auto max-w-xl"><Newsletter /></div></section>
    </div>
  );
}
