"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projectsData, type Project } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import { Plus, X, Edit } from "lucide-react";
import { ProjectFormDialog } from "@/components/project-form-dialog";
import { useUser } from "@/firebase";

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
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const handleSaveProject = (project: Project) => {
    if (project.id) {
      // Editing existing project
      setProjects(projects.map((p) => (p.id === project.id ? project : p)));
    } else {
      // Adding new project
      const newProject = { ...project, id: Date.now(), imageHint: 'custom project' };
      setProjects([...projects, newProject]);
    }
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
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <X /> : <Edit />}
              <span className="sr-only">{isEditing ? 'Cancel' : 'Edit Projects'}</span>
            </Button>
          )}
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          A selection of projects I've worked on.
        </p>
      </motion.div>

      {isEditing && user && (
        <div className="text-center">
          <Button onClick={handleAddProject}>
            <Plus className="mr-2" /> Add Project
          </Button>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isEditing={isEditing && !!user}
            onEdit={() => handleEditProject(project)}
            onDelete={() => handleDeleteProject(project.id)}
          />
        ))}
      </motion.div>

      <ProjectFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
}
