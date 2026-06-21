import Link from "next/link";

const columns = [
  {
    label: "Product",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "API", href: "/docs/api" },
    ],
  },
  {
    label: "Community",
    links: [
      { label: "Methodology", href: "/methodology" },
      { label: "Sponsors", href: "/sponsors" },
      { label: "Contribute", href: "https://github.com" },
    ],
  },
  {
    label: "Project",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1100px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3.5 flex items-center gap-2">
              <span className="text-base">⚡</span>
              <span className="font-sans text-sm font-bold tracking-tight text-foreground">
                Shiplog
              </span>
            </div>
            <p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              A free, open platform for developers to publish and track project changelogs.
              Built by developers, for developers.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.label}>
              <div className="mb-3.5 font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                {col.label}
              </div>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono">© {new Date().getFullYear()} Shiplog · MIT licensed</span>
          <span className="font-mono">Open development · Community governed</span>
        </div>
      </div>
    </footer>
  );
}
