"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_META } from "@/lib/changelog-categories";
import type { Changelog } from "@/lib/mock-data";

export interface ChangelogFormValues {
  title: string;
  version: string;
  category: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
}

interface ChangelogEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existing: Changelog | null;
  onSave: (data: ChangelogFormValues) => void;
}

export function ChangelogEditorDialog({
  open,
  onOpenChange,
  existing,
  onSave,
}: ChangelogEditorDialogProps) {
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [category, setCategory] = useState("FEATURE");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  // Reset the form to match whichever changelog (or blank) was passed in, each time the dialog opens
  useEffect(() => {
    if (open) {
      setTitle(existing?.title ?? "");
      setVersion(existing?.version ?? "");
      setCategory(existing?.category ?? "FEATURE");
      setContent(existing?.content ?? "");
      setStatus(existing?.status ?? "DRAFT");
    }
  }, [open, existing]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), version, category, content, status });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{existing ? "Edit changelog" : "New changelog"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="changelog-title">Title</Label>
            <Input
              id="changelog-title"
              placeholder="e.g. Rate limiting improvements"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="changelog-version">Version</Label>
              <Input
                id="changelog-version"
                placeholder="v2.4.0"
                className="font-mono"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="changelog-type">Type</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="changelog-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  {CATEGORY_META.map((c) => (
                    <SelectItem key={c.key} value={c.key}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="changelog-content">Content (Markdown)</Label>
            <Textarea
              id="changelog-content"
              placeholder={"## What changed\n\nDescribe what's new in this release…"}
              className="min-h-40 font-mono text-xs"
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <div className="flex gap-2">
              {(["DRAFT", "PUBLISHED"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`rounded-md border px-4 py-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase transition-colors ${
                    status === s
                      ? s === "PUBLISHED"
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-primary/40 bg-primary/10 text-primary"
                      : "border-input text-muted-foreground"
                  }`}
                >
                  {s === "DRAFT" ? "Draft" : "Publish"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        <Button
            onClick={handleSave}
            className={status === "PUBLISHED" ? "bg-success text-success-foreground hover:bg-success/90" : ""}
        >
        {status === "PUBLISHED" ? "✓ Publish" : "Save draft"}
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
