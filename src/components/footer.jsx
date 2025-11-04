import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
];

export default function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Raj Maurya. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                    {socialLinks.map((link) => (
                        <Button asChild key={link.name} variant="ghost" size="icon">
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                <link.icon className="h-4 w-4" />
                                <span className="sr-only">{link.name}</span>
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
        </footer>
    );
}
