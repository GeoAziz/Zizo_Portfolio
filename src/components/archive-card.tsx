"use client";

import type { Project } from "@/types";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { GitCommit, Calendar } from "lucide-react";

type ArchiveCardProps = {
  project: Project;
  index: number;
};

export default function ArchiveCard({ project, index }: ArchiveCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex md:w-1/2 items-start",
        isEven ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right flex-row-reverse md:flex-row"
      )}
    >
      {/* Timeline Dot */}
      <div className={cn("absolute top-1 left-4 md:left-auto md:right-full w-4 h-4 rounded-full bg-accent border-4 border-background z-10 -translate-x-1/2 md:translate-x-1/2", isEven && "md:left-0 md:-translate-x-1/2")}></div>

      {/* Content */}
      <div className="ml-10 md:ml-0 p-4 border border-border rounded-lg bg-card/50 backdrop-blur-sm w-full">
        <h3 className="text-xl font-bold font-headline text-primary-foreground">{project.title}</h3>
        <div className={cn("flex items-center gap-2 text-xs text-muted-foreground mt-1 mb-3", isEven ? "md:justify-start" : "md:justify-end")}>
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(project.date), "MMMM yyyy")}</span>
             <Badge variant="outline" className="text-xs">{project.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
        <div className={cn("flex flex-wrap gap-2", isEven ? "md:justify-start" : "md:justify-end")}>
            {project.stack.map(tech => (
                <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary-foreground/80">{tech}</Badge>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
