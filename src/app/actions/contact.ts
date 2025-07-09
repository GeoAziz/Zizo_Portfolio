'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      success: false,
    };
  }
  
  // For MVP, we'll just log the data to the console.
  // In a real app, you would send an email, save to a database, etc.
  console.log('New contact form submission:');
  console.log(validatedFields.data);

  return {
    message: 'Thank you for your message! I will get back to you soon.',
    errors: {},
    success: true,
  };
}
