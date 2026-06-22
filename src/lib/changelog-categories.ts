// Mirrors the Prisma `Category` enum. Single source of truth for label + color
// across the editor's Type select, the badge, and the category filter tabs.

export const CATEGORY_META = [
  { key: "FEATURE", label: "Feature" },
  { key: "FIX", label: "Fix" },
  { key: "IMPROVEMENT", label: "Improvement" },
  { key: "SECURITY", label: "Security" },
  { key: "BREAKING", label: "Breaking" },
  { key: "DEPRECATED", label: "Deprecated" },
  { key: "REMOVED", label: "Removed" },
] as const;

export type CategoryKey = (typeof CATEGORY_META)[number]["key"];

export function categoryLabel(key: string): string {
  return CATEGORY_META.find((c) => c.key === key)?.label ?? key;
}

// Tailwind needs to see full literal class strings to generate them — a template
// string like `bg-${color}/10` would get purged. Keep this as a static lookup.
export const CATEGORY_BADGE_CLASSES: Record<string, string> = {
  FEATURE: "border-info/30 bg-info/10 text-info",
  FIX: "border-destructive/30 bg-destructive/10 text-destructive",
  IMPROVEMENT: "border-success/30 bg-success/10 text-success",
  SECURITY: "border-violet/30 bg-violet/10 text-violet",
  BREAKING: "border-primary/30 bg-primary/10 text-primary",
  DEPRECATED: "border-warning/30 bg-warning/10 text-warning",
  REMOVED: "border-border bg-muted text-muted-foreground",
};
