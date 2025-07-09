export type ProjectCategory = "All" | "Web" | "CyberSec" | "AI" | "Fintech" | "HealthTech";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory[];
  image: string;
  stack: string[];
  live: string;
  github: string;
};
