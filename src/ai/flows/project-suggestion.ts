'use server';

/**
 * @fileOverview An AI flow to suggest projects based on user interest.
 *
 * - suggestNextProject - A function that suggests a project.
 * - ProjectSuggestionInput - The input type for the suggestNextProject function.
 * - ProjectSuggestionOutput - The return type for the suggestNextProject function.
 */

import { ai } from '@/ai/genkit';
import { getProjects } from '@/lib/projects';
import { z } from 'zod';

const ProjectSuggestionInputSchema = z.object({
  interest: z.string().describe("The user's stated interest."),
  projects: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        category: z.array(z.string()),
      })
    )
    .describe('The list of available projects to choose from.'),
});
export type ProjectSuggestionInput = z.infer<typeof ProjectSuggestionInputSchema>;

const ProjectSuggestionOutputSchema = z.object({
  projectId: z
    .string()
    .describe('The ID of the suggested project. This MUST be one of the IDs from the input projects list.'),
  reason: z.string().describe('A short, compelling reason for suggesting this project, based on the user\'s interest.'),
});
export type ProjectSuggestionOutput = z.infer<typeof ProjectSuggestionOutputSchema>;

export async function suggestNextProject(
  interest: string
): Promise<ProjectSuggestionOutput> {
  const projects = await getProjects();
  const projectDataForPrompt = projects
    .filter((p) => p.type === 'project')
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
    }));

  return projectSuggestionFlow({ interest, projects: projectDataForPrompt });
}

const suggestionPrompt = ai.definePrompt({
  name: 'projectSuggestionPrompt',
  input: { schema: ProjectSuggestionInputSchema },
  output: { schema: ProjectSuggestionOutputSchema },
  prompt: `You are an AI assistant in a developer's portfolio. Your goal is to recommend a project to a visitor based on their interests.

Given the user's interest: "{{interest}}", analyze the following list of available projects.

Available Projects:
{{#each projects}}
- ID: {{id}}
  Title: {{title}}
  Description: {{description}}
  Categories: {{#each category}}{{{this}}}{{/each}}
{{/each}}

Please select the single best project from the list that matches the user's interest.

Your response must be in the specified JSON format. You must choose a 'projectId' from the provided list and provide a 'reason' for your choice.`,
});

const projectSuggestionFlow = ai.defineFlow(
  {
    name: 'projectSuggestionFlow',
    inputSchema: ProjectSuggestionInputSchema,
    outputSchema: ProjectSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await suggestionPrompt(input);
    return output!;
  }
);
