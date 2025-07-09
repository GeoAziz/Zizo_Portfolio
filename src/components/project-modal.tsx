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
import { Github, ExternalLink, ListChecks } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] bg-card/80 backdrop-blur-lg border-accent/30 shadow-2xl shadow-accent/10 p-0">
         <ScrollArea className="max-h-[90vh]">
            <div className="p-6">
                <DialogHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-3xl font-headline text-primary">{project.title}</DialogTitle>
                            <p className="text-sm text-muted-foreground mt-1">Role: {project.role} | Status: {project.status}</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-8 mt-4">
                    <div className="flex flex-col gap-4">
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                            <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            data-ai-hint="abstract code"
                            />
                        </div>
                         <div className="flex gap-4">
                            <Button asChild className="flex-1" >
                                <a href={project.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                </a>
                            </Button>
                            <Button asChild variant="secondary" className="flex-1">
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> View Code
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                         <div>
                            <h4 className="font-semibold text-lg mb-3 text-primary-foreground">Description</h4>
                            <p className="text-muted-foreground">{project.description}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-lg mb-3 text-primary-foreground flex items-center"><ListChecks className="mr-2 h-5 w-5 text-accent"/> Features</h4>
                             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                {project.features.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                        </div>
                        <div>
                        <h4 className="font-semibold text-lg mb-3 text-primary-foreground">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-sm border-accent/50 text-accent/90 bg-accent/10">
                                {tech}
                            </Badge>
                            ))}
                        </div>
                        </div>
                        <div>
                        <h4 className="font-semibold text-lg mb-3 text-primary-foreground">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.category.map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-sm bg-primary/20 text-primary-foreground/80">
                                {cat}
                            </Badge>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
         </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
