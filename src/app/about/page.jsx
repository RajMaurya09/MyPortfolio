"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import placeholderData from "@/lib/placeholder-images.json";
import { Code, Pencil, Server, Wind, Edit, GraduationCap, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SkillFormDialog } from "@/components/skill-form-dialog";
import { EducationFormDialog } from "@/components/education-form-dialog";
import { AboutImageFormDialog } from "@/components/about-image-form-dialog";
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


const initialAboutImage = placeholderData.placeholderImages.find(
  (img) => img.id === "about-raj"
);

const initialSkills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "Firebase", "PostgreSQL", "Prisma"],
  tools: ["Git", "Docker", "Vite", "Webpack"],
};

const initialEducation = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    year: "2018 - 2022",
    description: "Focused on software development, algorithms, and data structures."
  },
  {
    id: 2,
    degree: "High School Diploma",
    school: "Central High School",
    year: "2016 - 2018",
    description: "Specialized in science and mathematics."
  }
];

export default function AboutPage() {
  const [aboutImage, setAboutImage] = useState(initialAboutImage);
  const [skills, setSkills] = useState(initialSkills);
  const [education, setEducation] = useState(initialEducation);

  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [isAboutImageFormOpen, setIsAboutImageFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [educationToDelete, setEducationToDelete] = useState(null);

  const handleSaveAboutImage = (newImageData) => {
    setAboutImage(prev => ({...prev, imageUrl: newImageData.imageUrl}));
  };

  const handleSaveSkills = (newSkills) => {
    setSkills({
      frontend: newSkills.frontend.split(',').map(s => s.trim()),
      backend: newSkills.backend.split(',').map(s => s.trim()),
      tools: newSkills.tools.split(',').map(s => s.trim()),
    });
  };

  const handleAddEducation = () => {
    setSelectedEducation(null);
    setIsEducationFormOpen(true);
  };
  
  const handleEditEducation = (edu) => {
    setSelectedEducation(edu);
    setIsEducationFormOpen(true);
  };

  const confirmDeleteEducation = (edu) => {
    setEducationToDelete(edu);
    setIsAlertOpen(true);
  };

  const handleDeleteEducation = () => {
    if (educationToDelete) {
      setEducation(education.filter((e) => e.id !== educationToDelete.id));
      setEducationToDelete(null);
      setIsAlertOpen(false);
    }
  };

  const handleSaveEducation = (eduToSave) => {
    if (selectedEducation) {
      setEducation(
        education.map((e) => (e.id === eduToSave.id ? eduToSave : e))
      );
    } else {
      const newEducation = { ...eduToSave, id: Date.now() };
      setEducation([...education, newEducation]);
    }
  };


  return (
    <div
      className="space-y-12 sm:space-y-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div
          className="md:col-span-1 flex justify-center"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 group">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={256}
                height={256}
                className="rounded-full object-cover border-4 border-primary/50 shadow-lg"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
            <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse"></div>
             <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" onClick={() => setIsAboutImageFormOpen(true)}>
                  <Pencil className="h-6 w-6" />
                  <span className="sr-only">Edit Image</span>
                </Button>
              </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-4 text-center md:text-left">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary">About Me</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            I'm a passionate Front-End developer with a knack for creating dynamic, user-friendly web applications. With a foundation in both front-end and back-end technologies, I enjoy bringing ideas to life from concept to deployment.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            My journey in web development started with a simple "Hello, World!" and has since grown into a full-fledged passion for building scalable and efficient solutions. I thrive in collaborative environments and am always eager to learn new technologies and improve my craft.
          </p>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-center font-headline text-2xl sm:text-3xl font-bold">My Tech Stack</h2>
           <Button variant="outline" size="icon" onClick={() => setIsSkillFormOpen(true)}>
             <Edit className="h-4 w-4" />
             <span className="sr-only">Edit Skills</span>
           </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <SkillCard 
            icon={<Code />} 
            title="Frontend" 
            skills={skills.frontend}
          />
          <SkillCard 
            icon={<Server />} 
            title="Backend" 
            skills={skills.backend} 
          />
          <SkillCard 
            icon={<Wind />} 
            title="Tools & Technologies" 
            skills={skills.tools} 
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-center font-headline text-2xl sm:text-3xl font-bold">Education</h2>
           <Button variant="outline" size="icon" onClick={handleAddEducation}>
             <Plus className="h-4 w-4" />
             <span className="sr-only">Add Education</span>
           </Button>
        </div>
        <div className="space-y-6">
          {education.map(edu => (
            <div key={edu.id} className="relative group">
              <EducationCard education={edu} />
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" onClick={() => handleEditEducation(edu)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="icon" variant="destructive" onClick={() => confirmDeleteEducation(edu)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AboutImageFormDialog
        isOpen={isAboutImageFormOpen}
        setIsOpen={setIsAboutImageFormOpen}
        onSave={handleSaveAboutImage}
        imageUrl={aboutImage?.imageUrl}
      />
      <SkillFormDialog
        isOpen={isSkillFormOpen}
        setIsOpen={setIsSkillFormOpen}
        onSave={handleSaveSkills}
        skills={skills}
      />
      <EducationFormDialog
        isOpen={isEducationFormOpen}
        setIsOpen={setIsEducationFormOpen}
        onSave={handleSaveEducation}
        education={selectedEducation}
      />
       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this education entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEducation}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

const SkillCard = ({ icon, title, skills }) => {
  return (
    <div
        className="glass-card p-6 space-y-4"
    >
        <div className="flex items-center gap-4">
            <div className="text-primary bg-primary/10 p-3 rounded-lg">{icon}</div>
            <h3 className="font-headline text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                </Badge>
            ))}
        </div>
    </div>
  )
}

const EducationCard = ({ education }) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start gap-4">
        <div className="text-primary bg-primary/10 p-3 rounded-lg mt-1">
          <GraduationCap />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h3 className="font-headline text-lg font-semibold">{education.degree}</h3>
            <p className="text-sm text-muted-foreground font-medium">{education.year}</p>
          </div>
          <p className="text-md font-medium text-primary">{education.school}</p>
          <p className="mt-2 text-sm text-muted-foreground">{education.description}</p>
        </div>
      </div>
    </div>
  )
}
