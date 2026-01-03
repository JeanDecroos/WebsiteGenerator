/**
 * Base package.json template
 */
export function generatePackageJson(config: {
  name: string;
  features: string[];
}): string {
  const dependencies: Record<string, string> = {
    next: "^14.2.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.460.0",
    clsx: "^2.1.1",
    "tailwind-merge": "^2.5.0",
    "class-variance-authority": "^0.7.0",
  };

  const devDependencies: Record<string, string> = {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    autoprefixer: "^10.4.20",
    postcss: "^8.4.47",
    tailwindcss: "^3.4.14",
    typescript: "^5.3.0",
  };

  // Add feature-specific dependencies
  if (config.features.includes("blog")) {
    dependencies["@mdx-js/loader"] = "^3.0.0";
    dependencies["@mdx-js/react"] = "^3.0.0";
    dependencies["@next/mdx"] = "^14.2.0";
    dependencies["gray-matter"] = "^4.0.3";
    dependencies["reading-time"] = "^1.5.0";
    devDependencies["@types/mdx"] = "^2.0.10";
  }

  if (config.features.includes("contact-form")) {
    dependencies["react-hook-form"] = "^7.53.0";
    dependencies["@hookform/resolvers"] = "^3.9.0";
    dependencies["zod"] = "^3.23.0";
    dependencies["resend"] = "^4.0.0";
  }

  if (config.features.includes("newsletter")) {
    dependencies["react-hook-form"] = "^7.53.0";
    dependencies["zod"] = "^3.23.0";
  }

  if (config.features.includes("auth") || config.features.includes("customer-portal")) {
    dependencies["next-auth"] = "^5.0.0-beta.25";
    dependencies["@auth/prisma-adapter"] = "^2.7.0";
    dependencies["@prisma/client"] = "^5.22.0";
    devDependencies["prisma"] = "^5.22.0";
  }

  if (config.features.includes("booking")) {
    dependencies["date-fns"] = "^4.1.0";
    dependencies["react-day-picker"] = "^9.3.0";
  }

  if (config.features.includes("analytics")) {
    dependencies["@vercel/analytics"] = "^1.3.0";
  }

  if (config.features.includes("i18n")) {
    dependencies["next-intl"] = "^3.23.0";
  }

  if (config.features.includes("dark-mode")) {
    dependencies["next-themes"] = "^0.4.3";
  }

  return JSON.stringify(
    {
      name: config.name.toLowerCase().replace(/\s+/g, "-"),
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
        ...(config.features.includes("auth") && {
          "db:push": "prisma db push",
          "db:studio": "prisma studio",
        }),
      },
      dependencies,
      devDependencies,
    },
    null,
    2
  );
}

