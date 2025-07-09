
# ZizoVerse Portfolio - Developer Guide

This guide provides all the necessary information for setting up, customizing, and maintaining the ZizoVerse Portfolio project.

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

The contact form uses [Resend](https://resend.com/) to send emails. You will need an API key.

1.  Sign up for a free Resend account and verify your domain.
2.  Create a new file named `.env` in the root of the project.
3.  Add your Resend API key to the `.env` file:

    ```
    RESEND_API_KEY=your_api_key_here
    ```

    *Note: The `.env` file is included in `.gitignore` and will not be committed to your repository.*

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📂 Project Structure

-   `src/app/`: Contains all pages and routes, following the Next.js App Router structure.
-   `src/components/`: Reusable React components.
    -   `src/components/ui/`: Auto-generated ShadCN UI components.
-   `src/lib/`: Utility functions and data fetching logic. `projects.ts` is key here.
-   `src/ai/`: All Genkit-related code, including AI flows.
-   `public/`: Static assets.
    -   `public/data/projects.json`: The single source of truth for all project content.
    -   `public/images/`: Location for project images.
    -   `public/resume.pdf`: Your resume file.

## 📝 Managing Content

This portfolio is designed to be easily updated by modifying a single JSON file.

### Adding or Editing Projects

-   Open `public/data/projects.json`.
-   Add a new JSON object to the `projects` array or modify an existing one.
-   Follow the existing structure for `id`, `title`, `description`, `stack`, etc.
-   The `type` field determines where the project appears: `"project"`, `"lab"`, or `"archive"`.

### Updating Images & Resume

-   **Images**: Place your project images in the `public/images/` directory and update the `image` path in `projects.json`.
-   **Resume**: Replace the placeholder `resume.pdf` in the `public/` directory with your own.

### Updating Social Links

-   Open `src/components/hire-me-cta.tsx`.
-   Find the `SheetFooter` section and replace the placeholder `href` values with your personal URLs for LinkedIn, GitHub, and email.

## 📜 Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Creates a production build of the application.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the codebase for errors.

## ☁️ Deployment

The project is configured for easy deployment on platforms like [Vercel](https://vercel.com/) or [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

1.  Push your code to a GitHub repository.
2.  Import the repository into your hosting provider.
3.  Add your `RESEND_API_KEY` as an environment variable in the hosting platform's settings.
4.  Deploy!
