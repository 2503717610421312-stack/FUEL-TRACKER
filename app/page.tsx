import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              Fuel Tracker Project
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Track fuel consumption, expenses, and history in one place.
            </h1>
            <p className="mt-6 max-w-xl text-slate-600 leading-8">
              This college mini-project demo uses Next.js App Router, Tailwind CSS, and Supabase.
              Add entries quickly, review your fuel history, and see total expense instantly.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Create Account
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Login
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-8 shadow-inner shadow-slate-200/80">
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Easy fuel entry</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Date, liters, and price in seconds.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">History View</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Review past refuels and totals.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Clean dashboard</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Perfect for project screenshots.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
