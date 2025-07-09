"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";

export default function SplashPage() {
  const [show, setShow] = useState(true);
  const [render, setRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleEnter();
    }, 5000); // Auto-redirect after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setShow(false);
    setTimeout(() => {
      router.push("/portfolio");
    }, 500); // wait for fade-out animation
  };

  if (!render) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex flex-col items-center text-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-headline">
          Zizo_ResumeVerse
        </h1>
        <div className="mb-8">
          <p className="text-lg md:text-xl text-foreground/80 typing-effect">
            Booting Project Deck...
          </p>
        </div>
        <Button
          onClick={handleEnter}
          size="lg"
          className="bg-primary/90 hover:bg-primary text-primary-foreground font-bold text-lg shadow-[0_0_15px_hsl(var(--primary)),0_0_30px_hsl(var(--primary))] hover:shadow-[0_0_25px_hsl(var(--primary)),0_0_45px_hsl(var(--primary))] transition-shadow duration-300"
        >
          <Rocket className="mr-2 h-5 w-5" />
          Enter Portfolio
        </Button>
      </div>
      <div className="absolute bottom-10 w-full px-8">
          <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-accent animate-[ping_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}></div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">Initializing DevMahnX Control Center</p>
      </div>
    </div>
  );
}
