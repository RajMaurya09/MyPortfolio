"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { useUser } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const user = useUser();
  const auth = getAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
          <span className="inline">Raj Maurya</span>
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="underline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
