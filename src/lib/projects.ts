import type { Project, ProjectCategory } from "@/types";
import fs from "fs/promises";
import path from "path";

// In a real app, you might fetch this from a CMS or database
const projectsFilePath = path.join(process.cwd(), 'public/data/projects.json');

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const projects: Project[] = jsonData.projects || [];
    // Sort projects by date descending
    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Failed to read or parse projects.json:", error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find(p => p.id === id);
}

export async function getCategories(): Promise<ProjectCategory[]> {
  const projects = await getProjects();
  const categories = new Set<ProjectCategory>(['All']);
  projects.forEach(project => {
    // Only include categories from main projects in the filter list
    if (project.type === 'project') {
      project.category.forEach(cat => {
        // Ensure we don't add "All" again
        if (cat !== "All") {
          categories.add(cat)
        }
      });
    }
  });
  return Array.from(categories);
}
