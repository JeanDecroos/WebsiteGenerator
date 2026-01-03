/**
 * Site Configuration
 * ==================
 * Edit this file to customize your website content.
 * All components read from this config - no hardcoding!
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: 'twitter' | 'github' | 'linkedin' | 'instagram' | 'facebook' | 'youtube';
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  navItems: NavItem[];
  socials: SocialLink[];
  features: {
    contactform: boolean;
    newsletter: boolean;
    darkmode: boolean;
    seo: boolean;
    blog: boolean;
    portfolio: boolean;
    team: boolean;
    faq: boolean;
    pricing: boolean;
    auth: boolean;
    i18n: boolean;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyrightHolder?: string;
}

export const siteConfig: SiteConfig = {
  name: "test",
  description: "test",
  url: "https://example.com",
  ogImage: "/og-image.png",
  
  navItems: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  
  socials: [
    { platform: "twitter", href: "https://twitter.com/yourhandle", label: "Twitter" },
    { platform: "github", href: "https://github.com/yourhandle", label: "GitHub" },
    { platform: "linkedin", href: "https://linkedin.com/company/yourcompany", label: "LinkedIn" },
  ],
  
  features: {
    contactform: true,
    newsletter: true,
    darkmode: true,
    seo: true,
    blog: true,
    portfolio: true,
    team: true,
    faq: true,
    pricing: true,
    auth: true,
    i18n: true,
  },
  
  contact: {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
  },
  
  copyrightHolder: "test",
};

export default siteConfig;
