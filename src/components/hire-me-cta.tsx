"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Download, Github, Linkedin, Mail } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function HireMeCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await submitContactForm(null, formData);

    if (result.success) {
      toast({ title: "Message Sent!", description: result.message });
      form.reset();
      setIsOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message || "Please check the form for errors.",
      });
    }
  };


  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg shadow-primary/30 animate-pulse"
      >
        <Briefcase className="h-7 w-7" />
        <span className="sr-only">Hire Me</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg bg-card/80 backdrop-blur-lg border-primary/30">
          <SheetHeader>
            <SheetTitle className="text-3xl font-headline text-primary">Work With DevMahnX</SheetTitle>
            <SheetDescription className="text-base pt-2">
              Hire me to bring your vision to life — sci-fi dashboards, AI control systems, immersive platforms, and more.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div>
                <h3 className="font-semibold text-primary-foreground mb-2">Services Offered</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Web Dev (Fullstack)</li>
                    <li>Cybersecurity UI</li>
                    <li>AI-powered MVPs</li>
                </ul>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea placeholder="Let's build something amazing..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          <SheetFooter className="sm:justify-between flex-col sm:flex-row gap-4">
             <div className="flex items-center gap-4">
                 {/* Replace with your actual LinkedIn profile URL */}
                 <a href="https://linkedin.com/in/your-profile-name" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent"><Linkedin className="h-6 w-6"/></a>
                 {/* Replace with your actual GitHub profile URL */}
                 <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent"><Github className="h-6 w-6"/></a>
                 {/* Replace with your actual email address */}
                 <a href="mailto:your-email@example.com" className="text-muted-foreground hover:text-accent"><Mail className="h-6 w-6"/></a>
             </div>
             <Button asChild variant="outline">
                <a href="/resume.pdf" download="DevMahnX_Resume.pdf">
                 <Download className="mr-2 h-4 w-4"/> Download Resume
                </a>
             </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
