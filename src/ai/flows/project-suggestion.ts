// src/ai/flows/project-suggestion.ts
'use server';

/**
 * @fileOverview AI-powered project suggestion flow.
 *
 * This file defines a Genkit flow that evaluates user navigation patterns
 * and suggests the next most relevant project in the portfolio.
 *
 * @example
 * ```typescript
 * // Usage in a Next.js component:
 * import { suggestNextProject } from '@/ai/flows/project-suggestion';
 *
 * async function MyComponent() {
 *   const projectId = 'some-project-id';
 *   const nextProjectSuggestion = await suggestNextProject({ currentProjectId: projectId });
 *   return <div>Next project suggestion: {nextProjectSuggestion.projectId}</div>;
 * }
 * ```
 *
 * @requires genkit
 * @requires zod
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const ProjectSuggestionInputSchema = z.object({
  currentProjectId: z.string().describe('The ID of the project the user is currently viewing.'),
  userHistory: z.array(z.string()).optional().describe('A list of project IDs the user has previously viewed, in order.'),
});
export type ProjectSuggestionInput = z.infer<typeof ProjectSuggestionInputSchema>;

const ProjectSuggestionOutputSchema = z.object({
  projectId: z.string().describe('The ID of the suggested next project to view.'),
  reason: z.string().describe('The AI’s reason for suggesting this project.'),
});
export type ProjectSuggestionOutput = z.infer<typeof ProjectSuggestionOutputSchema>;


export async function suggestNextProject(input: ProjectSuggestionInput): Promise<ProjectSuggestionOutput> {
  return suggestNextProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectSuggestionPrompt',
  input: {
    schema: ProjectSuggestionInputSchema,
  },
  output: {
    schema: ProjectSuggestionOutputSchema,
  },
  prompt: `You are an AI assistant that suggests the next project a user should view in a portfolio.

  The user is currently viewing project with ID: {{{currentProjectId}}}.

  Here's a list of projects the user has viewed previously:
  {{#if userHistory}}
    {{#each userHistory}}
      - {{{this}}}
    {{/each}}
  {{else}}
    The user has no browsing history.
  {{/if}}

  Suggest the next project the user should view, and explain your reasoning.
  Ensure that the project ID in the response is valid.
  Be creative in the suggestion, avoid suggesting the same project twice in a row.
  Do not suggest the current project.
  Take into account the projects the user has already viewed.
  `, 
});

const suggestNextProjectFlow = ai.defineFlow(
  {
    name: 'suggestNextProjectFlow',
    inputSchema: ProjectSuggestionInputSchema,
    outputSchema: ProjectSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
