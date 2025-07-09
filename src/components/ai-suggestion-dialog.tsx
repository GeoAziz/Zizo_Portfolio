"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProjectSuggestionOutput } from "@/ai/flows/project-suggestion";
import { Lightbulb, ThumbsUp } from "lucide-react";

type AiSuggestionDialogProps = {
  suggestion: ProjectSuggestionOutput | null;
  isOpen: boolean;
  onClose: () => void;
  onViewProject: () => void;
};

export default function AiSuggestionDialog({
  suggestion,
  isOpen,
  onClose,
  onViewProject,
}: AiSuggestionDialogProps) {
  if (!suggestion) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-card/80 backdrop-blur-lg border-primary/30 shadow-2xl shadow-primary/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-2xl font-headline text-primary">
            <Lightbulb className="h-6 w-6" />
            AI Project Suggestion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground pt-4">
            <p className="font-semibold text-primary-foreground/90">Based on your interests, you might like:</p>
            <p className="text-lg font-bold text-accent my-2">{suggestion.projectId}</p>
            <p className="italic">"{suggestion.reason}"</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Maybe later</AlertDialogCancel>
          <AlertDialogAction onClick={onViewProject} className="bg-primary hover:bg-primary/90">
            <ThumbsUp className="mr-2 h-4 w-4" />
            Show Me!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
