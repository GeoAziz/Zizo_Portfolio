"use client";

import { useState } from "react";
import type { Project } from "@/types";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import { motion, AnimatePresence } from "framer-motion";

type PortfolioClientPageProps = {
  projects: Project[];
};

export default function PortfolioClientPage({ projects }: PortfolioClientPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  
  return (
    <>
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
    </>
  );
}
