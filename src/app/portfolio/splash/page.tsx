"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SplashPage() {
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleEnter();
    }, 5000); // Auto-redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  const handleEnter = () => {
    setShow(false);
    setTimeout(() => {
      router.push("/portfolio");
    }, 500); // wait for fade-out animation
  };

  const handleSkip = () => {
    router.push("/portfolio");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="text-center p-8">
        <h1 
          className="text-5xl md:text-8xl font-bold text-primary mb-4 font-headline"
          style={{ textShadow: '0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary))' }}
        >
          DevMahnX
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-8">
          Launching Project Console…
        </p>

        <div className="mb-8 max-w-md mx-auto">
          <p className="text-base text-muted-foreground typing-effect">
            Welcome Commander DevMahnX. Your holographic console is being initialized.
          </p>
        </div>

        <Button
          onClick={handleEnter}
          size="lg"
          className="bg-primary/90 hover:bg-primary text-primary-foreground font-bold text-lg rounded-full px-10 py-6 shadow-[0_0_15px_hsl(var(--primary)),0_0_30px_hsl(var(--primary))] hover:shadow-[0_0_25px_hsl(var(--primary)),0_0_45px_hsl(var(--primary))] transition-all duration-300 transform hover:scale-105"
        >
          ENTER PORTFOLIO
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        <button onClick={handleSkip} className="hover:text-accent transition-colors">Skip Intro</button>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        Powered by Zizo_ResumeVerse
      </div>
    </div>
  );
}
