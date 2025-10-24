"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projectsData } from "@/lib/projects-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center items-center gap-4">
          <h1 className="font-headline text-4xl font-bold text-primary">My Projects</h1>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          A selection of projects I've worked on.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </motion.div>
    </div>
  );
}
