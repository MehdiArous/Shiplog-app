// Placeholder data for the homepage's "live feed" preview panel.
// Swap for something like:
//
//   await prisma.changelog.findMany({
//     where: { status: "PUBLISHED" },
//     orderBy: { createdAt: "desc" },
//     take: 4,
//     include: { project: true },
//   })
//
// once /dashboard and the Project/Changelog CRUD routes exist.

export const recentChangelogs = [
  {
    id: "c1",
    projectName: "API Gateway",
    projectInitials: "AG",
    projectColor: "#4179c3",
    version: "v2.4.0",
    title: "Rate limiting improvements",
    relativeDate: "2d",
  },
  {
    id: "c2",
    projectName: "Dashboard UI",
    projectInitials: "DU",
    projectColor: "#ff8a5c",
    version: "v0.8.0",
    title: "Chart components & dark mode",
    relativeDate: "4d",
  },
  {
    id: "c3",
    projectName: "Auth Service",
    projectInitials: "AS",
    projectColor: "#6fcea0",
    version: "v1.1.0",
    title: "GitHub OAuth provider",
    relativeDate: "1w",
  },
  {
    id: "c4",
    projectName: "API Gateway",
    projectInitials: "AG",
    projectColor: "#4179c3",
    version: "v2.3.1",
    title: "Hotfix: memory leak in proxy handler",
    relativeDate: "1w",
  },
];

export const stats = [
  { value: "48", label: "published changelogs" },
  { value: "12", label: "active projects" },
  { value: "$0", label: "forever, no tiers" },
];
