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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Generated Projects</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchProjects}
                disabled={loading}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                  "hover:bg-slate-100 disabled:opacity-50"
                )}
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                Refresh
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Wizard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No projects yet</h2>
            <p className="text-muted-foreground mb-6">
              Generate your first website to see it here
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Wizard
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Created {formatDate(project.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Modified {formatDate(project.modifiedAt)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">
                      {project.path}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/api/download?name=${encodeURIComponent(project.name)}`}
                      download
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-200 text-cyan-600",
                        "hover:bg-cyan-50 transition-colors"
                      )}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(project.name)}
                      disabled={deleting === project.name}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600",
                        "hover:bg-red-50 transition-colors disabled:opacity-50"
                      )}
                    >
                      <Trash2 className={cn("w-4 h-4", deleting === project.name && "animate-pulse")} />
                      {deleting === project.name ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

