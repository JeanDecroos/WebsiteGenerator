import { NextResponse } from "next/server";
import { generateWebsite, GeneratorConfig } from "@/generator";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// Industry color/font mappings
const industryStyles: Record<string, { primary: string; accent: string; headingFont: string; bodyFont: string }> = {
  "restaurant-food": {
    primary: "24 95% 53%",
    accent: "43 96% 56%",
    headingFont: "Playfair Display",
    bodyFont: "Lato",
  },
  "professional-services": {
    primary: "222 47% 31%",
    accent: "43 74% 49%",
    headingFont: "Libre Baskerville",
    bodyFont: "Source Sans Pro",
  },
  "tech-saas": {
    primary: "262 83% 58%",
    accent: "187 92% 50%",
    headingFont: "Space Grotesk",
    bodyFont: "Inter",
  },
  healthcare: {
    primary: "173 58% 39%",
    accent: "142 76% 36%",
    headingFont: "Nunito",
    bodyFont: "Open Sans",
  },
  "creative-agency": {
    primary: "0 0% 9%",
    accent: "358 75% 59%",
    headingFont: "Syne",
    bodyFont: "DM Sans",
  },
  "ecommerce-retail": {
    primary: "0 0% 15%",
    accent: "45 93% 47%",
    headingFont: "Poppins",
    bodyFont: "Roboto",
  },
  "real-estate": {
    primary: "210 40% 35%",
    accent: "142 76% 36%",
    headingFont: "Montserrat",
    bodyFont: "Raleway",
  },
  education: {
    primary: "221 83% 53%",
    accent: "38 92% 50%",
    headingFont: "Merriweather",
    bodyFont: "Source Sans Pro",
  },
  nonprofit: {
    primary: "142 76% 36%",
    accent: "210 40% 50%",
    headingFont: "Cabin",
    bodyFont: "Lora",
  },
  entertainment: {
    primary: "280 68% 60%",
    accent: "340 82% 52%",
    headingFont: "Bebas Neue",
    bodyFont: "Archivo",
  },
};

// Style preset CSS overrides
const styleOverrides: Record<string, { radius: string; spacingScale: number; darkMode: boolean }> = {
  minimal: { radius: "0.25rem", spacingScale: 1.5, darkMode: false },
  bold: { radius: "1rem", spacingScale: 1.2, darkMode: false },
  elegant: { radius: "0.125rem", spacingScale: 1.4, darkMode: false },
  playful: { radius: "9999px", spacingScale: 1.1, darkMode: false },
  corporate: { radius: "0.5rem", spacingScale: 1.0, darkMode: false },
  luxe: { radius: "0rem", spacingScale: 1.6, darkMode: true },
  organic: { radius: "1.5rem", spacingScale: 1.3, darkMode: false },
  tech: { radius: "0.75rem", spacingScale: 1.2, darkMode: true },
};

interface PageConfig {
  featureId: string;
  onHomepage: boolean;
  hasOwnPage: boolean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, url, selectedFeatures, structure, pageConfigs, industry, style } = body;

    // Validate required fields
    if (!name || !selectedFeatures) {
      return NextResponse.json(
        { error: "Missing required fields: name and selectedFeatures" },
        { status: 400 }
      );
    }

    // Get industry-specific styles
    const industryStyle = industry ? industryStyles[industry] : null;
    const stylePreset = style ? styleOverrides[style] : null;

    // Build config
    const config: GeneratorConfig = {
      name,
      description: description || `${name} - Built with Website Generator`,
      url: url || "https://example.com",
      selectedFeatures,
      primaryColor: industryStyle?.primary,
      structure: structure || "hybrid",
      pageConfigs: pageConfigs || [],
    };

    // Generate the website files
    let files = generateWebsite(config);

    // Apply industry fonts to layout.tsx
    if (industryStyle) {
      files = files.map((file) => {
        if (file.path === "app/layout.tsx") {
          // Replace default fonts with industry-specific fonts
          let content = file.content;
          content = content.replace(
            /Plus_Jakarta_Sans/g,
            industryStyle.headingFont.replace(/\s+/g, "_")
          );
          content = content.replace(/Inter(?![\w])/g, industryStyle.bodyFont.replace(/\s+/g, "_"));
          return { ...file, content };
        }
        return file;
      });
    }

    // Apply style preset radius and dark mode to globals.css
    if (stylePreset) {
      files = files.map((file) => {
        if (file.path === "app/globals.css") {
          let content = file.content;
          content = content.replace(
            /--radius:\s*[\d.]+rem;/g,
            `--radius: ${stylePreset.radius};`
          );
          
          // Apply dark mode if style requires it
          if (stylePreset.darkMode) {
            // Swap light/dark mode defaults
            content = content.replace(
              /:root\s*{([^}]+)}/,
              (match, inner) => {
                // Make root use dark values
                return `:root {
    --background: 0 0% 7%;
    --foreground: 0 0% 98%;
    --card: 0 0% 10%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 10%;
    --popover-foreground: 0 0% 98%;
    --primary: ${industryStyle?.primary || "262 83% 58%"};
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;
    --accent: ${industryStyle?.accent || "187 92% 50%"};
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 20%;
    --input: 0 0% 15%;
    --ring: ${industryStyle?.primary || "262 83% 58%"};
    --radius: ${stylePreset.radius};
  }`;
              }
            );
          }
          
          return { ...file, content };
        }
        return file;
      });
    }

    // Generate separate pages based on pageConfigs
    const separatePages = (pageConfigs as PageConfig[] || []).filter((p: PageConfig) => p.hasOwnPage);
    
    for (const pageConfig of separatePages) {
      const pageFile = generateSeparatePage(pageConfig.featureId, name, industryStyle);
      if (pageFile) {
        files.push(pageFile);
      }
    }

    // Update homepage to only include homepage sections
    const homepageSections = (pageConfigs as PageConfig[] || []).filter((p: PageConfig) => p.onHomepage);
    files = files.map((file) => {
      if (file.path === "app/page.tsx") {
        return {
          ...file,
          content: generateHomepage(name, homepageSections, separatePages, selectedFeatures),
        };
      }
      return file;
    });

    // Create output directory
    const projectSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const outputDir = join(process.cwd(), "output", projectSlug);

    // Write files to disk
    for (const file of files) {
      const filePath = join(outputDir, file.path);
      const dirPath = filePath.substring(0, filePath.lastIndexOf("/"));

      await mkdir(dirPath, { recursive: true });
      await writeFile(filePath, file.content, "utf-8");
    }

    return NextResponse.json({
      success: true,
      projectPath: outputDir,
      filesCount: files.length,
      files: files.map((f) => f.path),
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate website", details: String(error) },
      { status: 500 }
    );
  }
}

// Generate a separate page for a feature
function generateSeparatePage(
  featureId: string,
  siteName: string,
  industryStyle: { primary: string; accent: string } | null
): { path: string; content: string } | null {
  const featurePages: Record<string, { title: string; content: string }> = {
    blog: {
      title: "Blog",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Insights, updates, and stories from our team.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <article key={i} className="group">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">January {i}, 2024</span>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      Blog Post Title {i}
                    </h2>
                    <p className="text-muted-foreground line-clamp-2">
                      A brief excerpt of the blog post content goes here...
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>`,
    },
    portfolio: {
      title: "Portfolio",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Our Work</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Explore our latest projects and case studies.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-2xl font-bold mb-2">Project {i}</h3>
                      <p className="text-white/80">View Case Study →</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>`,
    },
    team: {
      title: "Our Team",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              The talented people behind our success.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {["Alex Johnson", "Sarah Chen", "Mike Rodriguez", "Emily Park"].map((name, i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4" />
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="text-muted-foreground text-sm">Team Member</p>
                </div>
              ))}
            </div>
          </div>
        </section>`,
    },
    "contact-form": {
      title: "Contact",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground mb-12">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea className="w-full px-4 py-3 rounded-lg border bg-background h-32 resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>
        </section>`,
    },
    pricing: {
      title: "Pricing",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that's right for you.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {[
                { name: "Starter", price: "$9", features: ["5 Projects", "Basic Support", "1GB Storage"] },
                { name: "Pro", price: "$29", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Analytics"] },
                { name: "Enterprise", price: "$99", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "Custom Integrations"] },
              ].map((plan, i) => (
                <div key={i} className={\`p-8 rounded-2xl border \${i === 1 ? "border-primary bg-primary/5" : "bg-card"}\`}>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={\`w-full py-3 rounded-lg font-medium transition-colors \${i === 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}\`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>`,
    },
    faq: {
      title: "FAQ",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
            <p className="text-muted-foreground mb-12 text-center">
              Everything you need to know about our services.
            </p>
            
            <div className="space-y-4">
              {[
                { q: "What services do you offer?", a: "We offer a comprehensive range of services tailored to meet your needs." },
                { q: "How long does a typical project take?", a: "Project timelines vary based on scope, but most projects are completed within 4-8 weeks." },
                { q: "Do you offer support after launch?", a: "Yes, we provide ongoing support and maintenance packages for all our clients." },
                { q: "What is your pricing model?", a: "We offer flexible pricing based on project requirements. Contact us for a custom quote." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border bg-card">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>`,
    },
    booking: {
      title: "Book Appointment",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Book an Appointment</h1>
            <p className="text-muted-foreground mb-12">
              Schedule a time that works for you.
            </p>
            
            <div className="bg-card border rounded-2xl p-8">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Service</label>
                  <select className="w-full px-4 py-3 rounded-lg border bg-background">
                    <option>Consultation</option>
                    <option>Strategy Session</option>
                    <option>Project Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-lg border bg-background" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time</label>
                  <select className="w-full px-4 py-3 rounded-lg border bg-background">
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                  </select>
                </div>
                <button className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </section>`,
    },
    "customer-portal": {
      title: "Dashboard",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {[
                { label: "Active Projects", value: "12" },
                { label: "Completed", value: "48" },
                { label: "Total Hours", value: "320" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border">
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div className="flex-1">
                      <p className="font-medium">Activity Item {i}</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>`,
    },
    auth: {
      title: "Sign In",
      content: `
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-card border rounded-2xl p-8">
              <h1 className="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
              <p className="text-muted-foreground mb-8 text-center">Sign in to your account</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input type="password" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium">
                  Sign In
                </button>
              </form>
              
              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account? <a href="#" className="text-primary">Sign up</a>
              </p>
            </div>
          </div>
        </section>`,
    },
  };

  const page = featurePages[featureId];
  if (!page) return null;

  return {
    path: `app/${featureId}/page.tsx`,
    content: `export default function ${page.title.replace(/\s+/g, "")}Page() {
  return (
    <main className="min-h-screen">
      ${page.content}
    </main>
  );
}
`,
  };
}

// Generate homepage with configurable sections
function generateHomepage(
  siteName: string,
  homepageSections: PageConfig[],
  separatePages: PageConfig[],
  allFeatures: string[]
): string {
  const navLinks = separatePages
    .map((p) => {
      const names: Record<string, string> = {
        blog: "Blog",
        portfolio: "Portfolio",
        team: "Team",
        "contact-form": "Contact",
        pricing: "Pricing",
        faq: "FAQ",
        booking: "Booking",
        "customer-portal": "Dashboard",
        auth: "Sign In",
      };
      return `{ name: "${names[p.featureId] || p.featureId}", href: "/${p.featureId}" }`;
    })
    .join(",\n    ");

  const sections: string[] = [];

  // Generate homepage sections based on config
  for (const config of homepageSections) {
    switch (config.featureId) {
      case "testimonials":
        sections.push(`
        {/* Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-xl bg-card border">
                  <p className="text-muted-foreground mb-4">"Amazing service and results. Highly recommended!"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium">Client {i}</p>
                      <p className="text-sm text-muted-foreground">Company {i}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>`);
        break;
      case "newsletter":
        sections.push(`
        {/* Newsletter */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border bg-background" />
              <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">Subscribe</button>
            </form>
          </div>
        </section>`);
        break;
      case "faq":
        sections.push(`
        {/* FAQ Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "What services do you offer?", a: "We offer a comprehensive range of services." },
                { q: "How can I get started?", a: "Simply reach out to us through our contact form." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border bg-card">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>`);
        break;
      case "pricing":
        sections.push(`
        {/* Pricing Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {[
                { name: "Starter", price: "$9" },
                { name: "Pro", price: "$29" },
                { name: "Enterprise", price: "$99" },
              ].map((plan, i) => (
                <div key={i} className={\`p-6 rounded-xl border \${i === 1 ? "border-primary bg-primary/5" : "bg-card"}\`}>
                  <h3 className="font-semibold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold mb-4">{plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                  <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground">Get Started</button>
                </div>
              ))}
            </div>
          </div>
        </section>`);
        break;
      case "blog":
        sections.push(`
        {/* Blog Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <article key={i} className="group">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Blog Post {i}</h3>
                  <p className="text-sm text-muted-foreground">A brief excerpt...</p>
                </article>
              ))}
            </div>
          </div>
        </section>`);
        break;
      case "portfolio":
        sections.push(`
        {/* Portfolio Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30" />
                </div>
              ))}
            </div>
          </div>
        </section>`);
        break;
      case "team":
        sections.push(`
        {/* Team Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid gap-8 md:grid-cols-4 max-w-4xl mx-auto">
              {["Alex", "Sarah", "Mike", "Emily"].map((name, i) => (
                <div key={i} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-3" />
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">Role</p>
                </div>
              ))}
            </div>
          </div>
        </section>`);
        break;
      case "contact-form":
        sections.push(`
        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-xl">
            <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg border bg-background" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border bg-background" />
              <textarea placeholder="Message" className="w-full px-4 py-3 rounded-lg border bg-background h-32" />
              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium">Send Message</button>
            </form>
          </div>
        </section>`);
        break;
    }
  }

  return `import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  ${navLinks}
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">${siteName}</Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to ${siteName}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your compelling tagline goes here. Describe what makes you special.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Get Started
            </button>
            <button className="px-8 py-3 border rounded-lg font-medium hover:bg-muted transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
      ${sections.join("\n")}

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
`;
}
