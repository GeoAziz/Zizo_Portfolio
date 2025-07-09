"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { ProjectCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectFiltersProps = {
  categories: ProjectCategory[];
};

export default function ProjectFilters({ categories }: ProjectFiltersProps) {
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
  );
}
