"use client";

import { useAuth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center h-full"
    >
      <div className="glass-card p-8 md:p-12">
        <h1 className="font-headline text-3xl font-bold text-primary mb-4">
          Admin Login
        </h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to manage your portfolio.
        </p>
        <Button onClick={handleSignIn} size="lg">
          Sign In with Google
        </Button>
      </div>
    </motion.div>
  );
}
