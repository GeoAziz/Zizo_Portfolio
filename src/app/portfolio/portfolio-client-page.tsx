"use client";

import { useState } from "react";
import type { Project } from "@/types";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import AiSuggestionDialog from "@/components/ai-suggestion-dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PortfolioClientPageProps = {
  projects: Project[];
};

export default function PortfolioClientPage({ projects }: PortfolioClientPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleSuggestionSelect = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        setSelectedProject(project);
    }
  };
  
  return (
    <>
      <div className="mb-8 flex justify-center">
        <Button onClick={() => setIsSuggestionOpen(true)} variant="outline">
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          Get an AI Project Suggestion
        </Button>
      </div>
      
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard
                project={project}
                onViewDetails={() => handleViewDetails(project)}
              />
            </motion.div>
          ))}
           {projects.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              <p>No projects found for this category.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />

      <AiSuggestionDialog
        isOpen={isSuggestionOpen}
        onOpenChange={setIsSuggestionOpen}
        onSuggestionSelect={handleSuggestionSelect}
       />
    </>
  );
}
