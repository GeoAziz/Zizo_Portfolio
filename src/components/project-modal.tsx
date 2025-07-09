"use client";

import Image from "next/image";
import type { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] bg-card/80 backdrop-blur-lg border-accent/30 shadow-2xl shadow-accent/10 grid-rows-[auto_1fr] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-3xl font-headline text-primary">{project.title}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[80vh]">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint="abstract code"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-primary-foreground">Stack & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm border-accent/50 text-accent/90 bg-accent/10">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
             <div>
              <h4 className="font-semibold text-lg mb-2 text-primary-foreground">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {project.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-sm bg-primary/20 text-primary-foreground/80">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-auto pt-4">
              <Button asChild className="flex-1" >
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
