"use client";

import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]"
    >
      <div className="w-full max-w-sm glass-card p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-headline text-primary">
            Admin Login
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to manage your portfolio.
          </p>
        </div>
        <Button onClick={handleSignIn} className="w-full" size="lg">
          Sign In with Google
        </Button>
      </div>
    </motion.div>
  );
}
