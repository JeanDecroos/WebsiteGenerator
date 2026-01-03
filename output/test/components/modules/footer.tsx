import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-heading text-xl font-bold">
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.contact?.email && (
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact?.phone && (
                <li>{siteConfig.contact.phone}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.copyrightHolder || siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
