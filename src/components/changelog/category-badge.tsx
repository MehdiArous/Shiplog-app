import { CATEGORY_META, CATEGORY_BADGE_CLASSES } from "@/lib/changelog-categories";

export function CategoryBadge({ category }: { category: string }) {
  const meta = CATEGORY_META.find((c) => c.key === category) ?? CATEGORY_META[0];
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase ${
        CATEGORY_BADGE_CLASSES[meta.key]
      }`}
    >
      {meta.label}
    </span>
  );
}
