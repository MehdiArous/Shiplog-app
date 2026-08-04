export function StatusBadge({ status }: { status: "DRAFT" | "PUBLISHED" }) {
  const published = status === "PUBLISHED";
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase ${
        published
          ? "border-success/30 bg-success/10 text-success"
          : "border-border bg-muted text-muted-foreground"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
