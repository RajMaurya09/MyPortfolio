"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendEmail(
  prevState,
  formData
) {
  
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data. Please check your entries.",
      status: 'error',
    };
  }
  
  const { name, email, message } = validatedFields.data;

  try {
    // In a real application, you would integrate an email service here.
    // e.g., using Nodemailer, Resend, or SendGrid.
    console.log("--- New Contact Form Submission ---");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log("------------------------------------");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: "Thank you for your message! I'll get back to you soon.",
      status: 'success',
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      message: "Something went wrong. Please try again later.",
      status: 'error',
    };
  }
}
