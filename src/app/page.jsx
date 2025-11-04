"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TypewriterEffect from "@/components/typewriter-effect";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center h-full min-h-[calc(100vh-12rem)]"
    >
      <h1
        className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
      >
        Raj Maurya
      </h1>

      <TypewriterEffect
        texts={[
          "A Front-End Developer",
          "A React.js Specialist",
          "JavaScript",
          "A Next.js Enthusiast",
          "A Creative Problem Solver",
        ]}
      />

      <p
        className="mt-6 max-w-xl text-lg text-muted-foreground"
      >
        I build beautiful, responsive, and performant web applications with a focus on user experience and clean code.
      </p>

      <div
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        <Button asChild size="lg">
          <Link href="/projects">
            View My Work <ArrowRight className="ml-2" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  );
}
