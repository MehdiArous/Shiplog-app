"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CategoryTabs } from "@/components/changelog/category-tabs";
import { CategoryBadge } from "@/components/changelog/category-badge";
import { StatusBadge } from "@/components/changelog/status-badge";
import { VersionTag } from "@/components/changelog/version-tag";
import {
  ChangelogEditorDialog,
  type ChangelogFormValues,
} from "@/components/changelog/changelog-editor-dialog";
import { CATEGORY_META } from "@/lib/changelog-categories";
import type { Changelog, Project } from "@/lib/mock-data";

const PAGE_SIZE = 2;

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type EditorState = "closed" | "new" | Changelog;

export function ProjectDetailClient({
  project,
  initialChangelogs,
}: {
  project: Project;
  initialChangelogs: Changelog[];
}) {
  const [logs, setLogs] = useState(initialChangelogs);
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [category, setCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [editorState, setEditorState] = useState<EditorState>("closed");

  const statusFiltered = logs.filter((l) => l.status === status);
  const filtered = statusFiltered.filter(
    (l) => category === "ALL" || l.category === category,
  );
  const visible = filtered.slice(0, visibleCount);

  const categoryItems = [
    { key: "ALL", label: "All", count: statusFiltered.length },
    ...CATEGORY_META.map((c) => ({
      key: c.key,
      label: c.label,
      count: statusFiltered.filter((l) => l.category === c.key).length,
    })),
  ];

  const changeStatus = (s: "PUBLISHED" | "DRAFT") => {
    setStatus(s);
    setCategory("ALL");
    setVisibleCount(PAGE_SIZE);
  };

  const changeCategory = (key: string) => {
    setCategory(key);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSave = (data: ChangelogFormValues) => {
    if (editorState === "new") {
      setLogs((prev) => [
        {
          id: `c${Date.now()}`,
          projectId: project.id,
          version: data.version || "v0.1.0",
          title: data.title,
          preview: data.content.replace(/##.+\n*/g, "").slice(0, 140),
          content: data.content,
          date: data.status === "PUBLISHED" ? todayLabel() : "—",
          category: data.category as Changelog["category"],
          status: data.status,
        },
        ...prev,
      ]);
    } else if (editorState !== "closed") {
      const id = editorState.id;
      setLogs((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
                ...l,
                ...data,
                category: data.category as Changelog["category"],
                date:
                  data.status === "PUBLISHED" && l.status !== "PUBLISHED"
                    ? todayLabel()
                    : l.date,
              }
            : l,
        ),
      );
    }
    setEditorState("closed");
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-7 flex items-center gap-2 text-sm">
        <Link
          href="/dashboard"
          className="font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          ← Dashboard
        </Link>
        <span className="text-border">/</span>
        <div
          className="flex size-5 items-center justify-center rounded font-mono text-[8px] font-bold"
          style={{ backgroundColor: `${project.color}18`, color: project.color }}
        >
          {project.initials}
        </div>
        <span className="font-semibold text-foreground">{project.name}</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">
            {project.name}
          </h1>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <Button onClick={() => setEditorState("new")}>+ New changelog</Button>
      </div>

      {/* Status tabs */}
      <div className="mb-4 flex border-b border-border">
        {(["PUBLISHED", "DRAFT"] as const).map((s) => (
          <button
            key={s}
            onClick={() => changeStatus(s)}
            className={`border-b-2 px-4 py-2 font-mono text-[11px] font-semibold tracking-wide uppercase transition-colors ${
              status === s
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground"
            }`}
          >
            {s === "PUBLISHED" ? "Published" : "Drafts"}
            <span className="ml-1.5 rounded bg-muted px-1.5 py-px font-mono text-[10px] text-muted-foreground">
              {logs.filter((l) => l.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="mb-6 border-b border-border pb-4">
        <CategoryTabs
          items={categoryItems}
          active={category}
          onChange={changeCategory}
        />
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-4">
        {/* Vertical connecting line — only shown when there are visible cards */}
        {visible.length > 0 && (
          <div className="absolute left-[7px] top-5 bottom-5 w-px bg-gradient-to-b from-border via-border to-transparent" />
        )}

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="py-12 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              No {status.toLowerCase()} changelogs match these filters.
            </p>
            <Button variant="outline" onClick={() => setEditorState("new")}>
              {status === "PUBLISHED"
                ? "+ Write and publish one"
                : "+ Save a draft"}
            </Button>
          </div>
        )}

        {/* Changelog cards */}
        {visible.map((log) => (
          <div key={log.id} className="flex gap-4">
            {/* Timeline dot */}
            <div className="relative z-10 mt-[22px] flex size-3.5 shrink-0 items-center justify-center">
              <div
                className={`size-2.5 rounded-full border-2 ${
                  log.status === "PUBLISHED"
                    ? "border-primary/40 bg-primary"
                    : "border-border bg-muted"
                }`}
              />
            </div>

            {/* Card */}
            <div className="flex-1 rounded-xl border border-border bg-card p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <VersionTag>{log.version}</VersionTag>
                  <CategoryBadge category={log.category} />
                  <h3 className="text-sm font-bold tracking-tight text-foreground">
                    {log.title}
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {log.date}
                  </span>
                  <StatusBadge status={log.status} />
                </div>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                {log.preview}
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditorState(log)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() =>
                    setLogs((prev) => prev.filter((l) => l.id !== log.id))
                  }
                >
                  Delete
                </Button>
                {log.status === "DRAFT" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-success hover:text-success"
                    onClick={() =>
                      setLogs((prev) =>
                        prev.map((l) =>
                          l.id === log.id
                            ? { ...l, status: "PUBLISHED", date: todayLabel() }
                            : l,
                        ),
                      )
                    }
                  >
                    ↑ Publish
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more */}
      {visibleCount < filtered.length && (
        <div className="mt-5 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
          >
            Show more · {filtered.length - visibleCount} left
          </Button>
        </div>
      )}

      <ChangelogEditorDialog
        open={editorState !== "closed"}
        onOpenChange={(open) => !open && setEditorState("closed")}
        existing={
          editorState === "new" || editorState === "closed" ? null : editorState
        }
        onSave={handleSave}
      />
    </main>
  );
}
