"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projectsData, type Project } from "@/lib/projects-data";
import { useUser } from "@/firebase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { ProjectFormDialog } from "@/components/project-form-dialog";

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
  const user = useUser();
  const [projects, setProjects] = useState(projectsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSaveProject = (project: Project) => {
    if (project.id) {
      setProjects(projects.map(p => p.id === project.id ? { ...p, ...project } : p));
    } else {
      const newProject = { ...project, id: projects.length + 1 };
      setProjects([...projects, newProject]);
    }
  };

  const handleAddNew = () => {
    setSelectedProject(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = (projectId: number) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };


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
          {user && (
            <Button variant="ghost" size="icon" onClick={handleAddNew}>
              <PlusCircle className="h-6 w-6 text-primary" />
            </Button>
          )}
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
        {projects.map((project) => (
          <div key={project.id} className="relative group">
            <ProjectCard
              project={project}
            />
            {user && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="icon" onClick={() => handleEdit(project)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      <ProjectFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </div>
  );
}
