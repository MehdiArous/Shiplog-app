import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/changelog/category-badge";
import { StatusBadge } from "@/components/changelog/status-badge";
import { VersionTag } from "@/components/changelog/version-tag";
import { MarkdownRenderer } from "@/components/changelog/markdown-renderer";
import { changelogs, projects } from "@/lib/mock-data";

export default async function ChangelogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;

  const changelog = changelogs.find((c) => c.id === id);
  if (!changelog) notFound();

  const project = projects.find((p) => p.id === changelog.projectId);
  if (!project) notFound();

  // "from" lets the back link go to either the feed or the project page
  const backHref = from === "project" ? `/dashboard/${project.id}` : "/feed";
  const backLabel = from === "project" ? `← Back to ${project.name}` : "← Back to feed";

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* Back link */}
      <Link
        href={backHref}
        className="mb-6 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        {backLabel}
      </Link>

      {/* Article card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {/* Card header */}
        <div className="border-b border-border px-8 py-6">
          {/* Project + date row */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="flex size-7 items-center justify-center rounded-lg border font-mono text-[9px] font-bold"
                style={{
                  backgroundColor: `${project.color}18`,
                  borderColor: `${project.color}28`,
                  color: project.color,
                }}
              >
                {project.initials}
              </div>
              <span className="font-mono text-sm font-semibold" style={{ color: project.color }}>
                {project.name}
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{changelog.date}</span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-foreground">
            {changelog.title}
          </h1>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <VersionTag>{changelog.version}</VersionTag>
            <StatusBadge status={changelog.status} />
            <CategoryBadge category={changelog.category} />
          </div>
        </div>

        {/* Card body — rendered markdown */}
        <div className="px-8 py-7">
          {changelog.content ? (
            <MarkdownRenderer content={changelog.content} />
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">{changelog.preview}</p>
          )}
        </div>
      </div>

      {/* Bottom back link */}
      <div className="mt-6 flex justify-center">
        <Link
          href={backHref}
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {backLabel}
        </Link>
      </div>
    </main>
  );
}
