'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  suggestNextProject,
  type ProjectSuggestionOutput,
} from '@/ai/flows/project-suggestion';
import { Sparkles, Bot } from 'lucide-react';

type AiSuggestionDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuggestionSelect: (projectId: string) => void;
};

export default function AiSuggestionDialog({
  isOpen,
  onOpenChange,
  onSuggestionSelect,
}: AiSuggestionDialogProps) {
  const [interest, setInterest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<ProjectSuggestionOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interest.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please tell me what you are interested in.',
      });
      return;
    }
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestNextProject(interest);
      setSuggestion(result);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: 'The AI is busy pondering the universe. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProject = () => {
    if (suggestion) {
      onSuggestionSelect(suggestion.projectId);
      handleClose();
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after a short delay to allow for fade-out animation
    setTimeout(() => {
      setInterest('');
      setSuggestion(null);
      setIsLoading(false);
    }, 300);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-2xl text-primary font-headline">
            <Bot /> AI Project Recommender
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground pt-2">
            Tell me what you're passionate about, and I'll suggest a project from the Zizo_Verse you might like.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {!suggestion ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="interest">What technologies or ideas excite you?</Label>
              <Input
                id="interest"
                placeholder="e.g., 'cybersecurity', 'fintech', 'generative art'"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Thinking...' : 'Get Suggestion'}
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="pt-4 space-y-4">
             <div className="p-4 rounded-lg bg-muted border border-border">
                <p className="font-semibold text-primary-foreground/90">Based on your interest, you might like:</p>
                <p className="text-xl font-bold text-accent my-2">{suggestion.projectId}</p>
                <p className="italic text-muted-foreground">"{suggestion.reason}"</p>
             </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSelectProject}>
                View Project
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
