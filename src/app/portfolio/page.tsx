import { getProjects, getCategories } from "@/lib/projects";
import PortfolioClientPage from "./portfolio-client-page";
import PortfolioHeader from "@/components/portfolio-header";

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const allProjects = await getProjects();
  const categories = await getCategories();
  const currentCategory = searchParams?.category || "All";

  const projects = allProjects.filter(p => {
    if (p.type !== 'project') return false;
    if (currentCategory === "All") return true;
    return p.category.includes(currentCategory as any);
  });

  return (
    <>
      <PortfolioHeader
        title="Project Deck"
        categories={categories}
        showFilters={true}
      />
      <main className="container mx-auto px-4 py-8">
        <PortfolioClientPage projects={projects} />
      </main>
    </>
  );
}
