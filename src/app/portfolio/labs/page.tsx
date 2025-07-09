import { getProjects } from "@/lib/projects";
import PortfolioClientPage from "../portfolio-client-page";
import PortfolioHeader from "@/components/portfolio-header";

export default async function LabsPage() {
  const allProjects = await getProjects();
  const labProjects = allProjects.filter(p => p.type === 'lab');

  return (
    <>
      <PortfolioHeader title="Zizo_Labs" />
      <main className="container mx-auto px-4 py-8">
        <div className="font-mono text-center text-accent mb-12 bg-black p-4 rounded-md border border-accent/30">
          <p className="typing-effect">Welcome to Zizo_Labs, Commander. Loading prototypes...</p>
        </div>
        <PortfolioClientPage projects={labProjects} />
      </main>
    </>
  );
}
