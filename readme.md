# SaaS Boilerplate

A modern Next.js SaaS boilerplate with Clerk authentication, Stripe payments, and PostgreSQL database using Drizzle ORM.

## Tech Stack

- **Framework:** Next.js with App Router
- **Authentication:** Clerk
- **Database:** PostgreSQL with Drizzle ORM
- **Payments:** Stripe
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Form Handling:** react-hook-form with zod validation
- **Notifications:** Sonner toast
- **Deployment:** Vercel

## Prerequisites

Before you begin, ensure you have the following:

- Node.js 18+ and npm
- PostgreSQL database
- Clerk account
- Stripe account

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/saas-boilerplate.git && cd saas-boilerplate
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env.local` file with required variables:**

   ```ini
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_WEBHOOK_SECRET=whsec_...

   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. **Initialize the database:**

   ```sh
   npm run generate
   npm run push
   ```

5. **Start the development server:**

   ```sh
   npm run dev
   ```

## Project Structure

```
app/             # Next.js App Router pages and layouts
 ├── actions/    # Server actions for data mutations
 ├── api/        # API routes for webhooks and external services
components/      # Reusable UI components
 ├── ui/         # shadcn/ui components
lib/             # Utility functions and shared code
 ├── db/         # Database schema and connection
public/          # Static assets
```

## Key Features

- **Authentication:** Complete authentication flow with Clerk
- **Subscription Management:** Stripe integration for subscription billing
- **Database Schema:** Ready-to-use schema with Drizzle ORM
- **UI Components:** Comprehensive set of shadcn/ui components
- **Error Handling:** Consistent error handling with AppError class
- **Responsive Design:** Mobile-friendly UI with Tailwind CSS
- **Dark Mode:** Built-in dark mode support

## Development Guidelines

- **Server vs Client Components:** Build components as server components by default. Use `'use client'` only when necessary.
- **Server Actions:** Use Next.js server actions for all data mutations and server-side logic.
- **Error Handling:** Always use the `AppError` class from `lib/errors.ts` for consistent error handling.
- **Database Operations:** Define database schema in `lib/db/schema.ts` using Drizzle ORM.
- **Styling:** Use Tailwind CSS with custom theme variables defined in `app/globals.css`.
- **Form Handling:** Use react-hook-form for form state management with zod for validation.

## Database Migrations

- **Generate migration:**
  ```sh
  npm run generate
  ```
- **Apply migration:**
  ```sh
  npm run push
  ```
- **Open Drizzle Studio:**
  ```sh
  npm run studio
  ```

## Deployment

This project is configured for deployment on Vercel.

## License

This project is licensed under the MIT License.