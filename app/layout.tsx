import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuel Tracker',
  description: 'Simple Fuel Tracker app with Supabase authentication and expense management.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
