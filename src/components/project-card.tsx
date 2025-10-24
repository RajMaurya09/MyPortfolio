"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass-card overflow-hidden flex flex-col glow-effect relative"
    >
      <div className="relative aspect-video">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={project.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-headline text-xl font-bold text-primary">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground flex-grow">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          {project.repoUrl && (
            <Button asChild variant="outline" size="sm">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github />
                GitHub
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="sm">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                Live Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
