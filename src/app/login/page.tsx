"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useFirebase, useUser } from "@/firebase";
import { useEffect } from "react";

const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.8 0-5.18-1.88-6.04-4.42H2.34v2.84C4.13 20.98 7.72 23 12 23z" fill="#34A853"/>
        <path d="M5.96 14.25c-.14-.42-.22-.88-.22-1.35s.08-.93.22-1.35V8.71H2.34c-.66 1.32-1.06 2.8-1.06 4.39s.4 3.07 1.06 4.39l3.62-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.72 1 4.13 3.02 2.34 6.29l3.62 2.84c.86-2.54 3.24-4.42 6.04-4.42z" fill="#EA4335"/>
    </svg>
);


export default function LoginPage() {
  const router = useRouter();
  const { auth } = useFirebase();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);


  const handleGoogleSignIn = async () => {
    if (!auth) return;
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
      className="max-w-md mx-auto"
    >
      <div className="glass-card p-8 text-center">
        <h1 className="font-headline text-3xl font-bold text-primary mb-4">
          Login
        </h1>
        <p className="text-muted-foreground mb-8">
          Sign in to manage your portfolio content.
        </p>
        <Button onClick={handleGoogleSignIn} className="w-full">
            <GoogleIcon />
            Sign in with Google
        </Button>
      </div>
    </motion.div>
  );
}
