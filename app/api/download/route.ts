import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { createReadStream, statSync } from "fs";
import archiver from "archiver";

const OUTPUT_DIR = join(process.cwd(), "output");

export async function GET(request: Request) {
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

    // Check if project exists
    try {
      const projectStat = statSync(projectPath);
      if (!projectStat.isDirectory()) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Create a zip archive
    const archive = archiver("zip", {
      zlib: { level: 9 } // Maximum compression
    });

    // Set response headers
    const headers = new Headers();
    headers.set("Content-Type", "application/zip");
    headers.set("Content-Disposition", `attachment; filename="${projectName}.zip"`);

    // Pipe the archive to a response stream
    const stream = new ReadableStream({
      start(controller) {
        archive.on("data", (chunk) => {
          controller.enqueue(chunk);
        });

        archive.on("end", () => {
          controller.close();
        });

        archive.on("error", (err) => {
          controller.error(err);
        });

        // Add the project directory to the archive
        archive.directory(projectPath, projectName);

        // Finalize the archive
        archive.finalize();
      },
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error("Error creating ZIP:", error);
    return NextResponse.json(
      { error: "Failed to create ZIP file" },
      { status: 500 }
    );
  }
}

