"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useAuth, useFirestore } from "@/firebase/client";
import { saveUser } from "@/firebase/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAuthError = (error: AuthError) => {
    setIsLoading(false);
    let title = "An error occurred";
    let description = "Please try again later.";

    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        title = "Invalid Credentials";
        description = "The email or password you entered is incorrect.";
        break;
      case "auth/email-already-in-use":
        title = "Email Already in Use";
        description =
          "This email address is already associated with an account.";
        break;
      case "auth/weak-password":
        title = "Weak Password";
        description = "The password must be at least 6 characters long.";
        break;
      default:
        title = "Authentication Error";
        description = error.message;
        break;
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
  };

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    if (!auth) return;
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/");
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    if (!auth || !firestore) return;
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      saveUser(firestore, userCredential.user);
      router.push("/");
    } catch (error) {
      handleAuthError(error as AuthError);
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
        <Form {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={form.handleSubmit(handleSignIn)}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <Button
                onClick={form.handleSubmit(handleSignUp)}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
