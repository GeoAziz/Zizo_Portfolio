'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// The user must add their RESEND_API_KEY to the .env file
// The RESEND_API_KEY environment variable is automatically picked up by the Resend SDK.
const resend = new Resend(process.env.RESEND_API_KEY);

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
  
  const { name, email, message } = validatedFields.data;

  try {
    // Replace with your desired email address to receive notifications
    const toEmail = "your-email@example.com"; 
    
    // Replace with your verified Resend domain email.
    // This email must be from a domain you've verified in your Resend account.
    // Example: "contact@yourdomain.com"
    const fromEmail = "onboarding@resend.dev"; 

    await resend.emails.send({
      from: `Contact Form <${fromEmail}>`,
      to: [toEmail],
      subject: `New message from ${name} via Zizo_ResumeVerse`,
      reply_to: email,
      html: `<p>You have a new contact form submission:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return {
      message: 'Thank you for your message! I will get back to you soon.',
      errors: {},
      success: true,
    };
  } catch (error) {
      console.error("Email sending failed:", error);
      return {
          message: 'Sorry, something went wrong and the message could not be sent. Please try again later.',
          errors: {},
          success: false,
      };
  }
}
