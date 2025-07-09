export type ProjectCategory = "All" | "Web" | "AI" | "Cybersecurity" | "HealthTech" | "Fintech";

export type ProjectType = "project" | "lab" | "archive";

export type ProjectStatus = "✅ Live" | "🔒 In Dev" | "🧪 Prototype" | "Legacy";

export type Project = {
  id: string;
  title: string;
  description: string;
  features: string[];
  category: ProjectCategory[];
  stack: string[];
  image: string;
  live: string;
  github: string;
  role: string;
  status: ProjectStatus;
  type: ProjectType;
  date: string; // YYYY-MM-DD
};
