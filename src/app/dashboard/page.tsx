"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/dashboard/project-card";
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog";
import { authClient } from "@/lib/auth-client";
import { projects as initialProjects } from "@/lib/mock-data";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const [projects, setProjects] = useState(initialProjects);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isPending) return null;

  if (!session) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-muted-foreground">Sign in to access your dashboard.</p>
        <Button
          onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/dashboard" })}
        >
          Sign in with GitHub
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1000px] px-6 py-10">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Your projects</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>+ New project</Button>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <button
          onClick={() => setDialogOpen(true)}
          className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-input text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          <span className="text-2xl opacity-40">+</span>
          <span className="text-sm">New project</span>
        </button>
      </div>

      <NewProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreate={(data: any) =>
          setProjects((prev) => [
            ...prev,
            {
              id: `p${Date.now()}`,
              slug: data.name.toLowerCase().replace(/\s+/g, "-"),
              name: data.name,
              description: data.description,
              color: "#7ba7db",
              initials: data.name.slice(0, 2).toUpperCase(),
              owner: {
                name: session.user.name ?? "You",
                username: session.user.email.split("@")[0],
                avatar: session.user.image ?? "",
              },
              publishedCount: 0,
              draftCount: 0,
            },
          ])
        }
      />
    </main>
  );
}
