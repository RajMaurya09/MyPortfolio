"use client";

import { ProjectCard } from "@/components/project-card";
import { projectsData } from "@/lib/projects-data";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div
        className="text-center"
      >
        <div className="flex justify-center items-center gap-4">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary">My Projects</h1>
        </div>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          A selection of projects I've worked on.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {projectsData.map((project) => (
          <div key={project.id} className="relative group">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
