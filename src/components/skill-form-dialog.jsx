"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  frontend: z.string().min(1, "Enter at least one skill."),
  backend: z.string().min(1, "Enter at least one skill."),
  tools: z.string().min(1, "Enter at least one skill."),
});

export function SkillFormDialog({ isOpen, setIsOpen, onSave, skills }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frontend: "",
      backend: "",
      tools: "",
    },
  });

  useEffect(() => {
    if (skills) {
      form.reset({
        frontend: skills.frontend.join(", "),
        backend: skills.backend.join(", "),
        tools: skills.tools.join(", "),
      });
    }
  }, [skills, form, isOpen]);

  const onSubmit = (values) => {
    onSave(values);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="frontend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frontend (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="React, Next.js, ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="backend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backend (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Node.js, Express, ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="tools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tools & Technologies (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Git, Docker, ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Skills</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
