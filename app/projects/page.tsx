"use client";

import { useState, useEffect } from "react";
import { Trash2, FolderOpen, RefreshCw, Home, Calendar, Clock, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  path: string;
  createdAt: string;
  modifiedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (projectName: string) => {
    if (!confirm(`Are you sure you want to delete "${projectName}"? This cannot be undone.`)) {
      return;
    }

    setDeleting(projectName);
    try {
      const response = await fetch(`/api/projects?name=${encodeURIComponent(projectName)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from list
        setProjects((prev) => prev.filter((p) => p.name !== projectName));
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Your Projects</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage and download your generated websites
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchProjects}
                disabled={loading}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border border-border",
                  "bg-background hover:bg-accent hover:text-accent-foreground transition-all",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Wizard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <RefreshCw className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex p-6 rounded-full bg-muted/50 mb-6">
              <FolderOpen className="w-20 h-20 text-muted-foreground/40" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No projects yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start by creating your first website with our wizard. It only takes a few minutes!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Create Your First Website
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {projects.length} {projects.length === 1 ? "project" : "projects"} generated
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className={cn(
                    "group relative bg-card rounded-xl border border-border overflow-hidden",
                    "hover:shadow-xl hover:border-primary/50 transition-all duration-300",
                    "hover:-translate-y-1"
                  )}
                >
                  {/* Card Header with Gradient */}
                  <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent relative">
                    <div className="absolute inset-0 bg-grid-white/10" />
                    <div className="absolute top-4 right-4">
                      <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border">
                        <FolderOpen className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span className="truncate">Created {formatDate(project.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span className="truncate">Modified {formatDate(project.modifiedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Path Badge */}
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground font-mono truncate" title={project.path}>
                        {project.path}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <a
                        href={`/api/download?name=${encodeURIComponent(project.name)}`}
                        download
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg",
                          "bg-primary text-primary-foreground",
                          "hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                        )}
                      >
                        <Download className="w-4 h-4" />
                        <span className="font-medium">Download</span>
                      </a>
                      <button
                        onClick={() => handleDelete(project.name)}
                        disabled={deleting === project.name}
                        className={cn(
                          "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg",
                          "border border-destructive/30 text-destructive",
                          "hover:bg-destructive hover:text-destructive-foreground transition-all",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        title="Delete project"
                      >
                        <Trash2 className={cn("w-4 h-4", deleting === project.name && "animate-pulse")} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

