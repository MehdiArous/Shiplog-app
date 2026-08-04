"use client";

import { useState } from "react";

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

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: { name: string; description: string }) => void;
}

export function NewProjectDialog({ open, onOpenChange, onCreate }: NewProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: description.trim() });
    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              placeholder="e.g. API Gateway"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project-description">Description</Label>
            <Input
              id="project-description"
              placeholder="What does this project do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
