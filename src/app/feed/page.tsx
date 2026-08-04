"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CategoryTabs } from "@/components/changelog/category-tabs";
import { Input } from "@/components/ui/input";
import { FeedChangelogCard } from "@/components/changelog/changelog-card";
import { CATEGORY_META } from "@/lib/changelog-categories";
import { changelogs, projects } from "@/lib/mock-data";
import { Search } from "lucide-react";

const PAGE_SIZE = 4;

export default function FeedPage() {
  const [category, setCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const published = changelogs.filter((c) => c.status === "PUBLISHED");
  const [usernameSearch, setUsernameSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  
  const searched = published.filter((c) => {
    const project = projects.find((p) => p.id === c.projectId)!;
    const matchProject =
    !projectSearch ||
    project.name.toLowerCase().includes(projectSearch.toLowerCase());
    const matchUser =
    !usernameSearch ||
    project.owner.username.toLowerCase().includes(usernameSearch.toLowerCase());
    return matchProject && matchUser;
  });
  const filtered = searched.filter((c) => category === "ALL" || c.category === category);
  const visible = filtered.slice(0, visibleCount);

  const categoryItems = [
    { key: "ALL", label: "All", count: searched.length },
    ...CATEGORY_META.map((c) => ({
      key: c.key,
      label: c.label,
      count: searched.filter((item) => item.category === c.key).length,
    })),
  ];

  const changeCategory = (key: string) => {
    setCategory(key);
    setVisibleCount(PAGE_SIZE);
  };


  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Public feed</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Latest changelogs from all projects — newest first.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 pt-1">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">{published.length} changelogs</span>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-border pb-4">
        <CategoryTabs items={categoryItems} active={category} onChange={changeCategory} />
        <div className="flex ml-auto gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Project name…"
              value={projectSearch}
              onChange={(e) => {
                setProjectSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="h-9 w-44 pl-8 text-sm"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="@username…"
              value={usernameSearch}
              onChange={(e) => {
                setUsernameSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="h-9 w-36 pl-8 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((changelog) => (
          <FeedChangelogCard
            key={changelog.id}
            changelog={changelog}
            project={projects.find((p) => p.id === changelog.projectId)!}
          />
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No changelogs match these filters.
          </p>
        )}
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
            Show more · {filtered.length - visibleCount} left
          </Button>
        </div>
      )}
    </main>
  );
}
