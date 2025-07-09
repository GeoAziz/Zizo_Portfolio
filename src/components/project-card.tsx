"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";

type ProjectCardProps = {
  project: Project;
  onViewDetails: () => void;
};

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <motion.div
      whileHover="hover"
      className="group relative h-full w-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        variants={{
          hover: {
            rotateY: 10,
            rotateX: -5,
            scale: 1.05,
          },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex h-full flex-col rounded-lg border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-lg transition-shadow duration-300 group-hover:border-accent group-hover:shadow-2xl group-hover:shadow-accent/20"
      >
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-t-md">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={project.imageHint || "futuristic technology"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="flex h-full flex-col p-6 pt-0">
          <h3 className="mb-2 text-2xl font-bold font-headline text-primary-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mb-4 flex-grow text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary-foreground/80">
                {tech}
              </Badge>
            ))}
          </div>
          <Button onClick={onViewDetails} variant="outline" className="w-full mt-auto border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_0_15px_hsl(var(--accent))]">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
