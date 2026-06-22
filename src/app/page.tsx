"use client";

import { SiteFooter } from "@/components/site/site-footer";
// 1. Import your brand new local shadcn button component!
import { Button } from "@/components/ui/button";
// 2. Import your Better-Auth frontend client wrapper tool
import { recentChangelogs, stats } from "@/lib/mock-data";
import { ArrowRight, Command } from "lucide-react";
import Link from "next/link";

const howItWorks = [
  {
    n: "01",
    title: "Add a project",
    body: "Name, description, optional website. One project per product. Takes 30 seconds.",
  },
  {
    n: "02",
    title: "Write a changelog",
    body: "Title, version tag, type, and a Markdown body. Save as draft until ready, then publish in one click.",
  },
  {
    n: "03",
    title: "Goes public",
    body: "Published entries appear on the shared feed. Anyone can browse by project, type, or date.",
  },
];

export default function HomePage() {
  return (
    <> 
      {/* ── Site header section: hero ──────────────────────────────────── */}
      <section className="hero-glow hero-grid relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-14 px-6 pt-18 pb-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                community-run · MIT licensed
              </span>
            </div>
 
            <h1 className="text-[54px] leading-[1.08] font-extrabold tracking-tight text-foreground">
              Ship changes.
              <br />
              <span className="text-primary">Not silence.</span>
            </h1>
 
            <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-muted-foreground">
              Shiplog is a free, open platform for developers to publish and track project
              changelogs — structured, versioned, and always public.
            </p>
 
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Button size="lg" className="gap-2">
                <Command className="size-4" />
                Sign in with GitHub
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/feed">
                  Browse changelogs
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
 
            <div className="mt-9 flex gap-9 border-t border-border pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-[22px] font-bold tracking-tight text-foreground">
                    {s.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Live feed preview card */}
          <div className="pt-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-2 animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                  </span>
                  <span className="font-mono text-xs text-foreground/80">Public feed</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    · latest changes
                  </span>
                </div>
                <Link href="/feed" className="font-mono text-[11px] text-primary">
                  view all →
                </Link>
              </div>
 
              {recentChangelogs.map((log, i) => (
                <Link
                  key={log.id}
                  href={`/changelog/${log.id}`}
                  className={`flex items-center gap-2.5 px-4 py-2.5 transition-colors hover:bg-muted ${
                    i < recentChangelogs.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div
                    className="flex size-6.5 shrink-0 items-center justify-center rounded-md border font-mono text-[9px] font-bold"
                    style={{
                      backgroundColor: `${log.projectColor}18`,
                      borderColor: `${log.projectColor}28`,
                      color: log.projectColor,
                    }}
                  >
                    {log.projectInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium text-foreground">
                      {log.title}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="font-mono text-[10px]" style={{ color: log.projectColor }}>
                        {log.projectName}
                      </span>
                      <span className="text-border">·</span>
                      <span className="rounded border border-border bg-muted px-1.5 py-px font-mono text-[10px] text-muted-foreground">
                        {log.version}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                    {log.relativeDate}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── Site content: how it works ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1100px] px-6 pb-20">
        <div className="mb-14 border-t border-border" />
 
        <div className="mb-3.5 inline-flex items-center gap-1.5 font-mono text-[11px] text-primary">
          <span className="h-px w-4 bg-primary" />
          HOW IT WORKS
        </div>
        <h2 className="mb-2.5 max-w-[560px] text-[32px] leading-tight font-extrabold tracking-tight text-foreground">
          Write once. Everyone knows.
        </h2>
        <p className="mb-9 max-w-[500px] text-sm text-muted-foreground">
          Add your project, write entries with a version and a type, publish — they land on
          the shared feed instantly.
        </p>
 
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {howItWorks.map((step) => (
            <div key={step.n} className="rounded-xl border border-border bg-card p-5.5">
              <span className="font-mono text-[10px] text-muted-foreground">/ {step.n}</span>
              <h3 className="mt-3 mb-2 text-[15px] font-bold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── Site footer ─────────────────────────────────────────────────── */}
      <SiteFooter />
    </>
  );
}
