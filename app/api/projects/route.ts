import { NextResponse } from "next/server";
import { readdir, stat, rm } from "fs/promises";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "output");

export async function GET() {
  try {
    // Read all directories in /output
    const entries = await readdir(OUTPUT_DIR, { withFileTypes: true });
    const projects = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const projectPath = join(OUTPUT_DIR, entry.name);
        const stats = await stat(projectPath);
        
        projects.push({
          name: entry.name,
          path: projectPath,
          createdAt: stats.birthtime.toISOString(),
          modifiedAt: stats.mtime.toISOString(),
        });
      }
    }

    // Sort by modified date, newest first
    projects.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json({ projects: [] });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectName = searchParams.get("name");

    if (!projectName) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    // Security: ensure the path doesn't escape output directory
    if (projectName.includes("..") || projectName.includes("/")) {
      return NextResponse.json(
        { error: "Invalid project name" },
        { status: 400 }
      );
    }

    const projectPath = join(OUTPUT_DIR, projectName);

    // Delete the directory recursively
    await rm(projectPath, { recursive: true, force: true });

    return NextResponse.json({ 
      success: true, 
      message: `Project "${projectName}" deleted successfully` 
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

