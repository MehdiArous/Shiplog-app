import { notFound } from "next/navigation";

import { ProjectDetailClient } from "./project-detail-client";
import { changelogs, projects } from "@/lib/mock-data";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = projects.find((p) => p.id === projectId);
  if (!project) notFound();

  const projectChangelogs = changelogs.filter((c) => c.projectId === projectId);

  return <ProjectDetailClient project={project} initialChangelogs={projectChangelogs} />;
}
