"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import placeholderData from "@/lib/placeholder-images.json";
import { Code, Server, Wind, Pencil } from "lucide-react";
import { useUser } from "@/firebase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const aboutImage = placeholderData.placeholderImages.find(
  (img) => img.id === "about-raj"
);

const initialSkills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "Firebase", "PostgreSQL", "Prisma"],
  tools: ["Git", "Docker", "Vite", "Webpack"],
};

export default function AboutPage() {
  const user = useUser();
  const [skills, setSkills] = useState(initialSkills);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editableSkills, setEditableSkills] = useState(skills);

  const handleSave = () => {
    setSkills(editableSkills);
    setIsDialogOpen(false);
  };
  
  const handleSkillsChange = (category: keyof typeof skills, value: string) => {
    setEditableSkills(prev => ({
        ...prev,
        [category]: value.split(',').map(s => s.trim())
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1 flex justify-center"
        >
          <div className="relative w-64 h-64">
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
          </div>
        </motion.div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="font-headline text-4xl font-bold text-primary">About Me</h1>
          <p className="text-lg text-muted-foreground">
            I'm a passionate Front-End developer with a knack for creating dynamic, user-friendly web applications. With a foundation in both front-end and back-end technologies, I enjoy bringing ideas to life from concept to deployment.
          </p>
          <p className="text-lg text-muted-foreground">
            My journey in web development started with a simple "Hello, World!" and has since grown into a full-fledged passion for building scalable and efficient solutions. I thrive in collaborative environments and am always eager to learn new technologies and improve my craft.
          </p>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="flex justify-center items-center gap-4">
            <h2 className="text-center font-headline text-3xl font-bold">My Tech Stack</h2>
            {user && (
              <Button variant="ghost" size="icon" onClick={() => { setEditableSkills(skills); setIsDialogOpen(true); }}>
                <Pencil className="h-5 w-5 text-primary" />
              </Button>
            )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tech Stack</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="frontend-skills">Frontend (comma-separated)</Label>
              <Input 
                id="frontend-skills"
                value={editableSkills.frontend.join(', ')}
                onChange={(e) => handleSkillsChange('frontend', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="backend-skills">Backend (comma-separated)</Label>
              <Input 
                id="backend-skills"
                value={editableSkills.backend.join(', ')}
                onChange={(e) => handleSkillsChange('backend', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tools-skills">Tools & Technologies (comma-separated)</Label>
              <Input 
                id="tools-skills"
                value={editableSkills.tools.join(', ')}
                onChange={(e) => handleSkillsChange('tools', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

const SkillCard = ({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) => {
  return (
    <motion.div
        whileHover={{ y: -5 }}
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
    </motion.div>
  )
}
