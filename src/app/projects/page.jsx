"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectFormDialog } from "@/components/project-form-dialog";
import { projectsData } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleSaveProject = (projectToSave) => {
    if (selectedProject) {
      // Edit existing project
      setProjects(
        projects.map((p) => (p.id === projectToSave.id ? projectToSave : p))
      );
    } else {
      // Add new project
      const newProject = { ...projectToSave, id: Date.now() };
      setProjects([...projects, newProject]);
    }
  };

  const confirmDeleteProject = (project) => {
    setProjectToDelete(project);
    setIsAlertOpen(true);
  };

  const handleDeleteProject = () => {
    if (projectToDelete) {
      setProjects(projects.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
      setIsAlertOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div
        className="text-center"
      >
        <div className="flex justify-center items-center gap-4">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary">My Projects</h1>
          <Button variant="outline" size="icon" onClick={handleAddProject}>
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Project</span>
          </Button>
        </div>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          A selection of projects I've worked on.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {projects.map((project) => (
          <div key={project.id} className="relative group">
            <ProjectCard project={project} />
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" onClick={() => handleEditProject(project)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button size="icon" variant="destructive" onClick={() => confirmDeleteProject(project)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ProjectFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onSave={handleSaveProject}
        project={selectedProject}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
