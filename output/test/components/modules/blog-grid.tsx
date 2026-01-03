"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  category?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  className?: string;
}

export function BlogGrid({ posts, className }: BlogGridProps) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-2 lg:grid-cols-3", className)}>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
        >
          {post.image && (
            <div className="relative aspect-video overflow-hidden bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            {post.category && (
              <span className="text-xs font-medium text-primary mb-2">
                {post.category}
              </span>
            )}
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-muted-foreground flex-1 mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Read more <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default BlogGrid;
