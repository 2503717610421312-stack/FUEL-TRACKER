'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import FuelEntryForm from '@/components/FuelEntryForm';
import FuelHistory, { FuelEntry } from '@/components/FuelHistory';

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<null | { user: { id: string; email?: string } }>(null);
  const [entries, setEntries] = useState<FuelEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const totalExpense = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.amount * entry.price, 0),
    [entries]
  );

  const loadEntries = async (userId: string) => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('fuel_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setEntries(data ?? []);
  };

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const userSession = data.session;
      if (!userSession) {
        router.push('/login');
        return;
      }
      setSession({ user: { id: userSession.user.id, email: userSession.user.email ?? undefined } });
      await loadEntries(userSession.user.id);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (!newSession) {
        router.push('/login');
        return;
      }
      setSession({ user: { id: newSession.user.id, email: newSession.user.email ?? undefined } });
      loadEntries(newSession.user.id);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleRefresh = async () => {
    if (!session) return;
    await loadEntries(session.user.id);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Dashboard</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Fuel Tracker Overview</h1>
              <p className="mt-2 text-slate-600">Manage your fuel entries, view history, and calculate total expenses.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm">
                Signed in as {session?.user.email ?? 'Loading...'}
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
{session?.user.id ? <FuelEntryForm userId={session.user.id} onEntryAdded={handleRefresh} /> : null}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Expense Total</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">${totalExpense.toFixed(2)}</h2>
              </div>
              <button
                onClick={handleRefresh}
                className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Refresh
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600">Your total fuel expense is calculated from all fuel entries.</p>
          </section>
        </div>

        <div className="space-y-4">
          {error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
          ) : null}
          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">Loading fuel history…</div>
          ) : (
            <FuelHistory entries={entries} onEntryDeleted={handleRefresh} />
          )}
        </div>
      </div>
    </main>
  );
}
