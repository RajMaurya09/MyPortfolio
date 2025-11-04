"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import placeholderData from "@/lib/placeholder-images.json";
import { Code, Pencil, Server, Wind } from "lucide-react";
import { useState } from "react";

const aboutImage = placeholderData.placeholderImages.find(
  (img) => img.id === "about-raj"
);

const initialSkills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "Firebase", "PostgreSQL", "Prisma"],
  tools: ["Git", "Docker", "Vite", "Webpack"],
};

export default function AboutPage() {
  const [skills] = useState(initialSkills);

  return (
    <div
      className="space-y-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div
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
        </div>
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
