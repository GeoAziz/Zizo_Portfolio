import { getProjects, getCategories } from "@/lib/projects";
import PortfolioClientPage from "../../portfolio-client-page";
import PortfolioHeader from "@/components/portfolio-header";
import type { ProjectCategory } from "@/types";
import { redirect } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { tag: string };
}) {
  const allProjects = await getProjects();
  const categories = await getCategories();
  
  // Capitalize first letter for display
  const tag = decodeURIComponent(params.tag);
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  // Validate category
  if (!categories.map(c => c.toLowerCase()).includes(tag.toLowerCase())) {
      redirect("/portfolio");
  }

  const projects = allProjects.filter(p => 
    p.type === 'project' && p.category.map(c => c.toLowerCase()).includes(tag.toLowerCase())
  );
  
  return (
    <>
      <PortfolioHeader
        title={`${formattedTag} Projects`}
        backLink={{ href: "/portfolio", label: "View All Projects" }}
      />
      <main className="container mx-auto px-4 py-8">
        <PortfolioClientPage projects={projects} />
      </main>
    </>
  );
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.filter(c => c !== "All").map(category => ({
        tag: category.toLowerCase(),
    }));
}
