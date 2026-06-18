# Fuel Tracker

A college mini project Fuel Tracker built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Project Structure

- `app/`
  - `page.tsx` - Home landing page
  - `login/page.tsx` - Login page
  - `signup/page.tsx` - Signup page
  - `dashboard/page.tsx` - Protected dashboard page
- `components/`
  - `FuelEntryForm.tsx` - Add fuel entry form
  - `FuelHistory.tsx` - Fuel history list and delete action
- `lib/`
  - `supabaseClient.ts` - Supabase client setup
- `app/globals.css` - Tailwind and base app styles
- `tailwind.config.ts` / `postcss.config.js` - Tailwind setup

## Setup Steps

1. Open the project folder in VS Code.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the project root with these values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

4. Ensure your Supabase table is configured with these columns:

- `id` (uuid, primary key)
- `user_id` (uuid)
- `date` (date)
- `amount` (numeric or double precision)
- `price` (numeric or double precision)
- `created_at` (timestamp with time zone, default `now()`)

5. Start the development server:

```bash
npm run dev
```

6. Open `http://localhost:3000` in your browser.

## Supabase Integration

The app uses `@supabase/supabase-js` and reads environment variables from `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `lib/supabaseClient.ts`.

## Deployment Steps for Vercel

1. Push the project to GitHub.
2. Create a new Vercel project and connect the repository.
3. In Vercel dashboard, add the environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy the app. Vercel will use the existing `package.json` settings.

## Pages to Screenshot

1. `http://localhost:3000` - Home page dashboard landing
2. `http://localhost:3000/signup` - Signup page
3. `http://localhost:3000/login` - Login page
4. `http://localhost:3000/dashboard` - Dashboard page after login

## Screenshot Actions

- On the Login page, sign in with an existing account.
- On the Signup page, create a new user if needed.
- On the Dashboard page, add at least one fuel entry with date, amount, and price.
- Confirm the new entry appears in the Fuel History list.
- Show the total expense on the dashboard.

## Extra Notes

- The app includes form validation for required fields and positive numbers.
- Loading states and error messages are shown on login, signup, and entry creation.
- Deletion of entries uses a confirmation prompt.
