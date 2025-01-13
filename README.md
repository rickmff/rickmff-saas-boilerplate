Prompt to AI:

Let's build a micro-SaaS application using Next.js with the app router. The application already has auth, database, and Stripe implemented. If interacting with the database for saving or retrieving data, use Prisma. Then, send me the Prisma model, and I will push it to the database myself.

This app wil be a Prompt Manager - A micro-SaaS tool for users to store and manage their own prompts and access pre-defined, read-only templates from a centralized database.

Application Features and Pages:
Navbar:
Include a sleek, modern navigation bar at the top of the page.
Logo positioned on the left.
Navigation links: "Dashboard", "Pricing", "Login/Register".
Ensure the design is responsive and adapts seamlessly to mobile and desktop screens.
Landing Page:
Design a modern, call-to-action-oriented landing page with clean lines and vibrant colors.
Hero Section: Captivating headline, supporting text, and a prominent call-to-action button encouraging users to sign up or log in.
Include a visually appealing image or illustration relevant to prompts and templates.
Features Section: Add sections with brief descriptions highlighting the app's functionality (e.g., "Save and Manage Your Prompts", "Access Pre-Defined Templates").
Footer: Include essential links (e.g., About, Contact, Privacy Policy).
Dashboard Page:
Create a user-friendly dashboard page with a sidebar for easy navigation.
Sidebar options:
"My Prompts":
Allow users to create, edit, delete, and view their own prompts.
Display prompts in a clean list or card layout with details (e.g., title, description, date created).
Add a "Create Prompt" button that opens a form for adding new prompts (fields: title, description, tags).
"Prompt Templates":
Display a list of pre-defined prompts fetched from the database.
Templates should be read-only (no edit/delete actions for users).
Organize templates by categories (e.g., "Marketing", "Writing").
Ensure the dashboard layout is intuitive and emphasizes ease of use.
Database Interaction:
Prisma Models:

Use Prisma to manage database interactions. Below is an example schema:
prisma
Copy code
model Prompt {
  id          String   @id @default(cuid())
  userId      String
  title       String
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Template {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
}

For "My Prompts", store user-specific prompts with a userId reference to allow filtering.
For "Prompt Templates", store pre-defined templates that can be fetched for display only.
Additional Considerations:
Design:

Use clean, modern typography with sufficient white space for readability.
Implement a professional color scheme (e.g., gradients or complementary colors).
Ensure accessibility standards (WCAG) for inclusivity.

Optimize the application for fast load times and performance on all devices.

Follow modern web development practices, such as modular architecture and reusable components.
Write clean, maintainable code that prioritizes ease of scaling.
