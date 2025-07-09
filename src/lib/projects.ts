import { Project, ProjectCategory } from "@/types";
import fs from "fs/promises";
import path from "path";

const projectsFilePath = path.join(process.cwd(), 'public/data/projects.json');

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf-8');
    const projects: Project[] = JSON.parse(data);
    return projects;
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
    project.category.forEach(cat => categories.add(cat));
  });
  return Array.from(categories);
}
