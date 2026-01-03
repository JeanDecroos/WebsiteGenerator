/**
 * Site Configuration - The "Skin" Data Layer
 * ============================================
 * This file contains all customizable content for client sites.
 * AI agents and developers should ALWAYS read from this config
 * rather than hardcoding values in components.
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

export interface FeatureFlags {
  enableBlog: boolean;
  enableAuth: boolean;
  enableNewsletter: boolean;
  enableAnalytics: boolean;
  enableDarkMode: boolean;
}

export interface SiteConfig {
  /** Site name - used in metadata and branding */
  name: string;
  /** Site description - used in SEO metadata */
  description: string;
  /** Production URL of the site */
  url: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Navigation items for header/footer */
  navItems: NavItem[];
  /** Social media links */
  socials: SocialLink[];
  /** Feature flags to enable/disable functionality */
  features: FeatureFlags;
  /** Contact information */
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  /** Copyright holder name */
  copyrightHolder?: string;
}

export const siteConfig: SiteConfig = {
  name: "Agency OS",
  description: "A powerful website template built with the Golden Master architecture. Transform, customize, and deploy beautiful websites at scale.",
  url: "https://example.com",
  ogImage: "/og-image.png",
  
  navItems: [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  
  socials: [
    { platform: "twitter", href: "https://twitter.com/agencyos", label: "Twitter" },
    { platform: "github", href: "https://github.com/agencyos", label: "GitHub" },
    { platform: "linkedin", href: "https://linkedin.com/company/agencyos", label: "LinkedIn" },
  ],
  
  features: {
    enableBlog: true,
    enableAuth: false,
    enableNewsletter: true,
    enableAnalytics: true,
    enableDarkMode: true,
  },
  
  contact: {
    email: "hello@agencyos.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Street, Tech City, TC 12345",
  },
  
  copyrightHolder: "Agency OS Inc.",
};

export default siteConfig;

