import { getProjects } from "@/lib/projects";
import PortfolioHeader from "@/components/portfolio-header";
import ArchiveCard from "@/components/archive-card";

export default async function ArchivePage() {
  const allProjects = await getProjects();
  const archiveProjects = allProjects.filter(p => p.type === 'archive');

  const projectsByYear: { [year: string]: typeof archiveProjects } = {};

  archiveProjects.forEach(project => {
    const year = new Date(project.date).getFullYear().toString();
    if (!projectsByYear[year]) {
      projectsByYear[year] = [];
    }
    projectsByYear[year].push(project);
  });
  
  const sortedYears = Object.keys(projectsByYear).sort((a,b) => parseInt(b) - parseInt(a));

  return (
    <>
      <PortfolioHeader title="Project Archive" />
      <main className="container mx-auto px-4 py-8">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-16">
            {sortedYears.map(year => (
              <div key={year} className="relative">
                <div className="flex justify-center">
                    <div className="absolute top-1 left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background z-10 px-4">
                        <h2 className="text-2xl font-bold text-primary font-headline">{year}</h2>
                    </div>
                </div>
                <div className="mt-12 space-y-8">
                     {projectsByYear[year].map((project, index) => (
                        <ArchiveCard key={project.id} project={project} index={index}/>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
