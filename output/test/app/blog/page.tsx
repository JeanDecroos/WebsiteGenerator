import { Metadata } from "next";
import { BlogGrid } from "@/components/modules/blog-grid";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Latest articles and insights from ${siteConfig.name}`,
};

// This would typically fetch from a CMS or MDX files
const posts = [
  {
    slug: "getting-started",
    title: "Getting Started with Our Platform",
    excerpt: "Learn how to get up and running quickly with our comprehensive guide.",
    date: "2024-01-15",
    author: "Team",
    image: "/blog/placeholder.jpg",
    category: "Guides",
  },
  {
    slug: "best-practices",
    title: "Best Practices for Success",
    excerpt: "Discover the top strategies that successful users employ.",
    date: "2024-01-10",
    author: "Team",
    image: "/blog/placeholder.jpg",
    category: "Tips",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Insights, guides, and updates from our team.
        </p>
      </div>
      <BlogGrid posts={posts} />
    </div>
  );
}
