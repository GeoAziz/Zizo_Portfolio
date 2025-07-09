"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProjectCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rocket, FileText, FlaskConical, Archive, ArrowLeft } from "lucide-react";

type PortfolioHeaderProps = {
  categories?: ProjectCategory[];
  title: string;
  showFilters?: boolean;
  backLink?: {
    href: string;
    label: string;
  };
};

export default function PortfolioHeader({
  categories = [],
  title,
  showFilters = false,
  backLink,
}: PortfolioHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("category") || "All";

  const handleFilterClick = (category: ProjectCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <nav className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/portfolio" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">Zizo_ResumeVerse</span>
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm">
             <Link href="/portfolio" className={cn("transition-colors hover:text-accent", pathname === "/portfolio" ? "text-accent" : "text-muted-foreground")}>
                <FileText className="inline-block mr-1 h-4 w-4"/> Projects
            </Link>
             <Link href="/portfolio/labs" className={cn("transition-colors hover:text-accent", pathname === "/portfolio/labs" ? "text-accent" : "text-muted-foreground")}>
                <FlaskConical className="inline-block mr-1 h-4 w-4"/> Labs
            </Link>
             <Link href="/portfolio/archive" className={cn("transition-colors hover:text-accent", pathname === "/portfolio/archive" ? "text-accent" : "text-muted-foreground")}>
                <Archive className="inline-block mr-1 h-4 w-4"/> Archive
            </Link>
          </div>
        </div>
      </nav>
      <div className="container py-6">
        <div className="text-center">
            {backLink && (
                 <Link href={backLink.href} className="text-muted-foreground hover:text-foreground inline-flex items-center mb-4">
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     {backLink.label}
                 </Link>
             )}
          <h1 className="text-4xl md:text-6xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            {title}
          </h1>
        </div>

        {showFilters && (
          <div className="flex justify-center flex-wrap gap-2 mt-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => handleFilterClick(category)}
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
        )}
      </div>
    </header>
  );
}
