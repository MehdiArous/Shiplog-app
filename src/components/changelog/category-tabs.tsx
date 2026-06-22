"use client";

interface CategoryTabsProps {
  items: { key: string; label: string; count: number }[];
  active: string;
  onChange: (key: string) => void;
}

export function CategoryTabs({ items, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {items.map((item) => {
        const selected = item.key === active;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
              selected
                ? "border-border bg-muted font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
            <span
              className={`rounded-full px-1.5 py-px font-mono text-[10px] font-semibold ${
                selected ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
