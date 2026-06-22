import Link from "next/link";

import { CategoryBadge } from "@/components/changelog/category-badge";
import { VersionTag } from "@/components/changelog/version-tag";
import { UserAvatar } from "@/components/site/user-avatar";
import type { Changelog, Project } from "@/lib/mock-data";

export function FeedChangelogCard({ changelog, project }: { changelog: Changelog; project: Project }) {
  return (
    <Link
      href={`/changelog/${changelog.id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-input"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className="flex size-5 items-center justify-center rounded border font-mono text-[8px] font-bold"
              style={{ backgroundColor: `${project.color}18`, borderColor: `${project.color}28`, color: project.color }}
            >
              {project.initials}
            </span>
            <span className="font-mono text-[11px]" style={{ color: project.color }}>
              {project.name}
            </span>
            <span className="text-border">·</span>
            <VersionTag>{changelog.version}</VersionTag>
            <CategoryBadge category={changelog.category} />
          </div>

          <h3 className="mb-1.5 text-sm font-bold tracking-tight text-foreground">{changelog.title}</h3>
          <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">{changelog.preview}</p>

          <div className="flex items-center gap-2">
            <UserAvatar src={project.owner.avatar} name={project.owner.name} size="sm" />
            <span className="text-xs text-muted-foreground">@{project.owner.username}</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="block font-mono text-[11px] text-muted-foreground">{changelog.date}</span>
          <span className="mt-1.5 block font-mono text-[11px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}
