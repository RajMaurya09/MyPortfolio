"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold text-primary">Get In Touch</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Have a question or want to work together? Send me a message!
        </p>
      </div>
      <div className="glass-card p-8">
        <ContactForm />
      </div>
    </motion.div>
  );
}
