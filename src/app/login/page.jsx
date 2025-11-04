"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values) => {
    setIsLoading(true);
    // Mock sign-in
    console.log("Signing in with:", values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Signed In", description: "You have been signed in." });
    router.push("/");
    setIsLoading(false);
  };

  const handleSignUp = async (values) => {
    setIsLoading(true);
    // Mock sign-up
    console.log("Signing up with:", values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Signed Up", description: "Your account has been created." });
    router.push("/");
    setIsLoading(false);
  };

  return (
    <div
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
    </div>
  );
}
