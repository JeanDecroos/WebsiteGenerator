/**
 * Site config template generator
 */
export function generateSiteConfig(config: {
  name: string;
  description: string;
  url: string;
  features: string[];
}): string {
  return `/**
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
    ${config.features.map(f => `${f.replace(/-/g, '')}: boolean;`).join('\n    ')}
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyrightHolder?: string;
}

export const siteConfig: SiteConfig = {
  name: "${config.name}",
  description: "${config.description}",
  url: "${config.url}",
  ogImage: "/og-image.png",
  
  navItems: [
    { label: "Home", href: "/" },
    ${config.features.includes("blog") ? '{ label: "Blog", href: "/blog" },' : ''}
    ${config.features.includes("portfolio") ? '{ label: "Portfolio", href: "/portfolio" },' : ''}
    ${config.features.includes("pricing") ? '{ label: "Pricing", href: "/pricing" },' : ''}
    { label: "Contact", href: "/contact" },
  ],
  
  socials: [
    { platform: "twitter", href: "https://twitter.com/yourhandle", label: "Twitter" },
    { platform: "github", href: "https://github.com/yourhandle", label: "GitHub" },
    { platform: "linkedin", href: "https://linkedin.com/company/yourcompany", label: "LinkedIn" },
  ],
  
  features: {
    ${config.features.map(f => `${f.replace(/-/g, '')}: true,`).join('\n    ')}
  },
  
  contact: {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
  },
  
  copyrightHolder: "${config.name}",
};

export default siteConfig;
`;
}

