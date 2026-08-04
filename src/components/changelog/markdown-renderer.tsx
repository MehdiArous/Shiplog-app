import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const blocks = content.split("\n\n").filter(Boolean);

  return (
    <div className={cn("space-y-4", className)}>
      {blocks.map((block, i) => {
        // ## Heading
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="border-b border-border pb-2 pt-3 text-base font-bold tracking-tight text-foreground first:pt-0"
            >
              {block.slice(3)}
            </h2>
          );
        }

        // Paragraph — handle inline backtick `code`
        const parts = block.split("`");
        return (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <code
                  key={j}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-primary"
                >
                  {part}
                </code>
              ) : (
                part
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}
