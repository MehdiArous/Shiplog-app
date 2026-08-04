import Link from "next/link";

import type { Project } from "@/lib/mock-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/dashboard/${project.id}`}
      className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-input"
    >
      <div
        className="mb-3.5 flex size-9 items-center justify-center rounded-lg border font-mono text-[11px] font-bold"
        style={{ backgroundColor: `${project.color}18`, borderColor: `${project.color}28`, color: project.color }}
      >
        {project.initials}
      </div>
      <h3 className="mb-1 text-sm font-bold tracking-tight text-foreground">{project.name}</h3>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="flex items-center gap-2 border-t border-border pt-3 font-mono text-[11px] text-muted-foreground">
        <span>{project.publishedCount} published</span>
        {project.draftCount > 0 && (
          <>
            <span className="text-border">·</span>
            <span className="text-warning">
              {project.draftCount} draft{project.draftCount > 1 ? "s" : ""}
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
