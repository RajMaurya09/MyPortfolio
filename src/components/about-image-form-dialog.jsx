"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
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


export function AboutImageFormDialog({ isOpen, setIsOpen, onSave, imageUrl }) {
  const form = useForm();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (imageUrl && isOpen) {
      setPreview(imageUrl);
    }
  }, [imageUrl, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = () => {
    if (preview) {
      onSave({ imageUrl: preview });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Image</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {preview && (
              <div className="mt-4 flex justify-center">
                <Image 
                  src={preview} 
                  alt="Image preview"
                  width={128}
                  height={128}
                  className="rounded-full object-cover w-32 h-32"
                />
              </div>
            )}
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Image</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
