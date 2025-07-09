
# Remaining Tasks & Future Recommendations

This document outlines the final steps to personalize the portfolio and provides recommendations for future enhancements.

## ✅ Final Personalization Checklist

Your portfolio is functionally complete, but these final steps will make it truly yours.

-   [ ] **Update Project Data**:
    -   Open `public/data/projects.json`.
    -   Replace all the placeholder project information with your real projects.

-   [ ] **Add Your Images**:
    -   Place your project screenshots and images inside the `public/images/` folder.
    -   Update the `image` paths in `projects.json` to point to your new images.

-   [ ] **Add Your Resume**:
    -   Place your resume file, named `resume.pdf`, inside the `public/` folder, replacing the placeholder.

-   [ ] **Activate the Contact Form**:
    -   Create a `.env` file in the project root.
    -   Add your Resend API key: `RESEND_API_KEY=your_key_here`.

-   [ ] **Update Social Links**:
    -   Open `src/components/hire-me-cta.tsx`.
    -   Update the `href` attributes for the LinkedIn, GitHub, and Mail icons with your personal URLs.

## 🔮 Future Recommendations

Once you've personalized the content, consider these ideas to enhance the portfolio even further.

### 1. AI-Generated Project Images

-   **Idea**: Instead of static images, use Genkit's image generation capabilities (`gemini-2.0-flash-preview-image-generation`) to create unique, sci-fi-themed art for each project.
-   **Implementation**: Create a new Genkit flow that takes a project's title and description as input and returns a data URI for a generated image. This could be triggered on-demand or during a build step.

### 2. Deeper AI Integration: A Portfolio Assistant

-   **Idea**: Expand the AI recommender into a full-fledged chatbot. Visitors could ask questions like, "Which projects use Firebase?" or "Tell me more about your work in fintech."
-   **Implementation**: Use Genkit's tool-calling features. Create tools that can search the `projects.json` data. The AI would use these tools to answer user questions dynamically.

### 3. CMS Integration

-   **Idea**: For even easier content management, move the project data from `projects.json` to a headless CMS like [Sanity](https://www.sanity.io/), [Contentful](https://www.contentful.com/), or [Firebase Firestore](https://firebase.google.com/docs/firestore).
-   **Implementation**: Replace the `getProjects` function in `src/lib/projects.ts` with a function that fetches data from the chosen CMS API.

### 4. Advanced Animations & Page Transitions

-   **Idea**: Add more sophisticated animations, such as seamless transitions between pages or more complex micro-interactions on UI elements.
-   **Implementation**: Leverage Framer Motion's `AnimatePresence` for page transitions and explore its more advanced features like `useScroll` or `useSpring`.

### 5. Add a Blog or Writing Section

-   **Idea**: Showcase your expertise by adding a blog to share technical articles, case studies, or thoughts on industry trends.
-   **Implementation**: Create a new section in the app for blog posts, likely managed via Markdown files or a headless CMS.
