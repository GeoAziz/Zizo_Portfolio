import { getProjects, getCategories } from "@/lib/projects";
import PortfolioClientPage from "./portfolio-client-page";

export default async function PortfolioPage() {
  const projects = await getProjects();
  const categories = await getCategories();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
          Project Deck
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          A multiverse of creations. Filter by category to explore.
        </p>
      </div>
      <PortfolioClientPage projects={projects} categories={categories} />
    </main>
  );
}
