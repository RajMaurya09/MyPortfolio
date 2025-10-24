"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import placeholderData from "@/lib/placeholder-images.json";
import { Code, Database, Edit, Plus, Server, Save, Trash2, Wind, X, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useUser } from "@/firebase";

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
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSkills = (category: keyof typeof initialSkills, newSkills: string[]) => {
    setSkills(prev => ({ ...prev, [category]: newSkills }));
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
            I'm a passionate full-stack developer with a knack for creating dynamic, user-friendly web applications. With a foundation in both front-end and back-end technologies, I enjoy bringing ideas to life from concept to deployment.
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
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <X /> : <Edit />}
                  <span className="sr-only">{isEditing ? 'Cancel' : 'Edit Skills'}</span>
              </Button>
            )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCard 
            icon={<Code />} 
            title="Frontend" 
            skills={skills.frontend}
            isEditing={isEditing}
            onUpdate={(newSkills) => handleUpdateSkills('frontend', newSkills)}
          />
          <SkillCard 
            icon={<Server />} 
            title="Backend" 
            skills={skills.backend} 
            isEditing={isEditing}
            onUpdate={(newSkills) => handleUpdateSkills('backend', newSkills)}
          />
          <SkillCard 
            icon={<Wind />} 
            title="Tools & Technologies" 
            skills={skills.tools} 
            isEditing={isEditing}
            onUpdate={(newSkills) => handleUpdateSkills('tools', newSkills)}
          />
        </div>
      </div>
    </motion.div>
  );
}

const SkillCard = ({ icon, title, skills, isEditing, onUpdate }: { icon: React.ReactNode, title: string, skills: string[], isEditing: boolean, onUpdate: (skills: string[]) => void }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      onUpdate([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdate(skills.filter(skill => skill !== skillToRemove));
  };

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
                <Badge key={skill} variant="secondary" className="text-sm relative group">
                    {skill}
                    {isEditing && (
                      <button onClick={() => handleRemoveSkill(skill)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-4 w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                </Badge>
            ))}
        </div>
        {isEditing && (
          <div className="flex gap-2">
            <Input 
              placeholder="Add skill" 
              value={newSkill} 
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button size="icon" onClick={handleAddSkill}>
              <Plus />
            </Button>
          </div>
        )}
    </motion.div>
  )
}
