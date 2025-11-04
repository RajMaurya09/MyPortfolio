"use client";

import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary">Get In Touch</h1>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          Have a question or want to work together? Send me a message!
        </p>
      </div>
      <div className="glass-card p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
