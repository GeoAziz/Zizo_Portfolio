"use client";

import { useState, useMemo, useEffect } from "react";
import type { Project, ProjectCategory } from "@/types";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import AiSuggestionDialog from "@/components/ai-suggestion-dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { suggestNextProject, ProjectSuggestionOutput } from "@/ai/flows/project-suggestion";
import { useToast } from "@/hooks/use-toast";
import { getProjectById } from "@/lib/projects";

type PortfolioClientPageProps = {
  projects: Project[];
  categories: ProjectCategory[];
};

export default function PortfolioClientPage({ projects, categories }: PortfolioClientPageProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  const [lastViewedId, setLastViewedId] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<ProjectSuggestionOutput | null>(null);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [suggestedProject, setSuggestedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category.includes(activeFilter));
  }, [activeFilter, projects]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    if (!viewHistory.includes(project.id)) {
      setViewHistory((prev) => [...prev, project.id]);
    }
  };

  const handleCloseModal = () => {
    if (selectedProject) {
      setLastViewedId(selectedProject.id);
    }
    setSelectedProject(null);
  };
  
  useEffect(() => {
    if (lastViewedId) {
      const fetchSuggestion = async () => {
        setIsSuggestionLoading(true);
        toast({
          title: "🤖 Analyzing navigation...",
          description: "Suggesting your next project.",
        });
        try {
          const suggestion = await suggestNextProject({
            currentProjectId: lastViewedId,
            userHistory: viewHistory,
            allProjects: projects.map((p) => ({ id: p.id, title: p.title })),
          });
          
          const nextProject = projects.find(p => p.id === suggestion.projectId);
          
          if (nextProject) {
              setAiSuggestion(suggestion);
              setSuggestedProject(nextProject);
          } else {
             // Log the error but don't throw, to let the catch block handle user feedback.
             console.error("AI suggested a project ID that was not found:", suggestion.projectId);
             throw new Error("Suggested project not found");
          }

        } catch (error) {
          console.error("AI suggestion failed:", error);
          toast({
            variant: "destructive",
            title: "AI Suggestion Error",
            description: "Could not fetch a project suggestion.",
          });
        } finally {
          setIsSuggestionLoading(false);
          setLastViewedId(null);
        }
      };
      fetchSuggestion();
    }
  }, [lastViewedId, viewHistory, toast, projects]);

  const handleViewSuggestion = () => {
    if (suggestedProject) {
      handleViewDetails(suggestedProject);
    }
    setAiSuggestion(null);
    setSuggestedProject(null);
  };

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? "default" : "outline"}
            onClick={() => setActiveFilter(category)}
            className={cn(
              "transition-all duration-300",
              activeFilter === category &&
                "shadow-[0_0_10px_hsl(var(--accent)),0_0_20px_hsl(var(--accent))] text-accent-foreground"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
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
        </AnimatePresence>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
      
      <AiSuggestionDialog
        suggestion={aiSuggestion}
        isOpen={!!aiSuggestion && !isSuggestionLoading}
        onClose={() => setAiSuggestion(null)}
        onViewProject={handleViewSuggestion}
      />
    </>
  );
}
