import type { CategoryKey } from "@/lib/changelog-categories";

// Swap all of this for Prisma queries once the CRUD routes exist:
//   prisma.project.findMany({ where: { userId }, include: { _count: ... } })
//   prisma.changelog.findMany({ where: { status: "PUBLISHED" }, include: { project: { include: { user: true } } } })

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  initials: string;
  owner: { name: string; username: string; avatar: string };
  publishedCount: number;
  draftCount: number;
}

export interface Changelog {
  id: string;
  projectId: string;
  version: string;
  title: string;
  preview: string;
  content: string;
  date: string;
  category: CategoryKey;
  status: "DRAFT" | "PUBLISHED";
}

export const projects: Project[] = [
  {
    id: "p1",
    slug: "api-gateway",
    name: "API Gateway",
    description: "High-performance REST proxy with rate limiting and auth middleware.",
    color: "#4179c3",
    initials: "AG",
    owner: { name: "Alex Rivera", username: "alexbuilds", avatar: "https://i.pravatar.cc/150?u=alexbuilds" },
    publishedCount: 3,
    draftCount: 2,
  },
  {
    id: "p2",
    slug: "dashboard-ui",
    name: "Dashboard UI",
    description: "Open-source React component library for developer dashboards.",
    color: "#ff8a5c",
    initials: "DU",
    owner: { name: "Priya Singh", username: "priyaui", avatar: "https://i.pravatar.cc/150?u=priyaui" },
    publishedCount: 3,
    draftCount: 0,
  },
  {
    id: "p3",
    slug: "auth-service",
    name: "Auth Service",
    description: "OAuth2 & OIDC authentication microservice.",
    color: "#6fcea0",
    initials: "AS",
    owner: { name: "Sam Wilson", username: "samdev", avatar: "https://i.pravatar.cc/150?u=samdev" },
    publishedCount: 2,
    draftCount: 0,
  },
];

export const changelogs: Changelog[] = [
  {
    id: "c1",
    projectId: "p1",
    version: "v2.4.0",
    title: "Rate limiting improvements",
    preview:
      "Per-route rate limiting with configurable time windows. Redis is now the default backend for distributed setups.",
    content:
      "## What changed\n\nIntroduced per-route rate limiting with configurable time windows and burst allowances. Redis backend is now the default for distributed deployments.\n\n## How to upgrade\n\nSet `RATE_LIMIT_BACKEND=redis` in your environment variables.\n\n## New configuration\n\nA new `rateLimit.routes` key lets you override limits per path prefix.",
    date: "Jun 10, 2025",
    category: "IMPROVEMENT",
    status: "PUBLISHED",
  },
  {
    id: "c2",
    projectId: "p2",
    version: "v0.8.0",
    title: "Chart components & dark mode",
    preview:
      "Added LineChart, BarChart, and DonutChart. All components ship with full dark mode support out of the box.",
    content:
      "## New components\n\nThis release adds three new chart components: `LineChart`, `BarChart`, and `DonutChart`.\n\n## Dark mode\n\nEvery component reads from CSS custom properties, so toggling your app theme updates all charts automatically.\n\n## Breaking change\n\nThe old `Chart` base component is removed.",
    date: "Jun 8, 2025",
    category: "FEATURE",
    status: "PUBLISHED",
  },
  {
    id: "c3",
    projectId: "p3",
    version: "v1.1.0",
    title: "GitHub OAuth provider",
    preview: "Added GitHub as a social login provider. All tokens are stored encrypted at rest using AES-256-GCM.",
    content:
      "## GitHub OAuth\n\nUsers can now sign in with their GitHub account.\n\n## Token encryption\n\nAll access and refresh tokens are now encrypted at rest using `AES-256-GCM`.\n\n## Migration\n\nExisting sessions are unaffected.",
    date: "Jun 5, 2025",
    category: "FEATURE",
    status: "PUBLISHED",
  },
  {
    id: "c4",
    projectId: "p1",
    version: "v2.3.1",
    title: "Hotfix: memory leak in proxy handler",
    preview: "Fixed a memory leak in the proxy handler that occurred under sustained high-traffic load. Closes #341.",
    content:
      "## Root cause\n\nThe proxy handler held references to completed request contexts in a global registry that was never cleared.\n\n## Fix\n\nRequest contexts are now removed from the registry immediately after the response is flushed.\n\n## Recommended action\n\nUpgrade and restart your gateway instances.",
    date: "Jun 3, 2025",
    category: "FIX",
    status: "PUBLISHED",
  },
  {
    id: "c5",
    projectId: "p3",
    version: "v1.0.5",
    title: "Patched token refresh vulnerability",
    preview:
      "Fixed a vulnerability in the token refresh flow that could allow replay attacks under specific timing conditions.",
    content:
      "## Vulnerability\n\nA timing issue in the token refresh flow could allow a replay attack under specific conditions.\n\n## Fix\n\nRefresh tokens are now single-use and invalidated immediately after exchange.\n\n## Severity\n\nRated medium. No known exploitation in the wild.",
    date: "May 30, 2025",
    category: "SECURITY",
    status: "PUBLISHED",
  },
  {
    id: "c6",
    projectId: "p2",
    version: "v1.0.0",
    title: "Removed legacy Chart component",
    preview: "The base Chart component is removed in favor of typed chart components. This is a breaking change.",
    content:
      '## Breaking change\n\nThe generic `Chart` component has been removed entirely.\n\n## Migration\n\nReplace `<Chart type="line" />` with `<LineChart />`, and so on.\n\n## Why\n\nThe generic API made type-safe props impossible.',
    date: "May 28, 2025",
    category: "BREAKING",
    status: "PUBLISHED",
  },
  {
    id: "c7",
    projectId: "p1",
    version: "v2.2.0",
    title: "Legacy REST client deprecated",
    preview: "The v1 REST client is now deprecated and will be removed in a future major version.",
    content:
      "## Deprecation notice\n\nThe `RestClientV1` class is deprecated as of this release.\n\n## Timeline\n\nIt will continue to work through the v2.x series and be removed in v3.0.\n\n## What to use instead\n\nMigrate to `RestClientV2`.",
    date: "May 22, 2025",
    category: "DEPRECATED",
    status: "PUBLISHED",
  },
  {
    id: "c8",
    projectId: "p2",
    version: "v0.7.2",
    title: "Removed jQuery dependency",
    preview: "jQuery has been fully removed from the package. No action needed unless you were importing it directly.",
    content:
      "## Removed\n\njQuery is no longer a dependency of this package.\n\n## Impact\n\nIf you relied on jQuery as a side effect of importing this package, add it directly.\n\n## Bundle size\n\nThis reduces the minified bundle size by roughly 28kb.",
    date: "May 18, 2025",
    category: "REMOVED",
    status: "PUBLISHED",
  },
  {
    id: "c9",
    projectId: "p1",
    version: "v2.5.0-rc",
    title: "WebSocket proxy (WIP)",
    preview: "Bidirectional WebSocket proxy with sticky sessions and connection pooling.",
    content:
      "## Work in progress\n\nBidirectional WebSocket proxy with sticky sessions and connection pooling.\n\n## Status\n\nCore proxy logic is complete. Still working on connection pool management.",
    date: "—",
    category: "FEATURE",
    status: "DRAFT",
  },
  {
    id: "c10",
    projectId: "p1",
    version: "v2.4.1-rc",
    title: "Structured request logging (WIP)",
    preview: "JSON-structured request logs with trace IDs, for easier correlation with downstream services.",
    content:
      "## Work in progress\n\nRequest logs are moving to structured JSON with a `traceId` on every line.\n\n## Status\n\nCore logging middleware is done. Still wiring up trace ID propagation.",
    date: "—",
    category: "IMPROVEMENT",
    status: "DRAFT",
  },
];

// Derived view for the homepage's live feed preview panel
export const recentChangelogs = changelogs
  .filter((c) => c.status === "PUBLISHED")
  .slice(0, 4)
  .map((c) => {
    const project = projects.find((p) => p.id === c.projectId)!;
    return {
      id: c.id,
      projectName: project.name,
      projectInitials: project.initials,
      projectColor: project.color,
      version: c.version,
      title: c.title,
      relativeDate: c.date,
    };
  });

export const stats = [
  { value: "48", label: "published changelogs" },
  { value: "12", label: "active projects" },
  { value: "$0", label: "forever, no tiers" },
];
