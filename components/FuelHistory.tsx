'use client';

import { supabase } from '@/lib/supabaseClient';

export interface FuelEntry {
  id: string;
  date: string;
  amount: number;
  price: number;
  created_at: string | null;
}

import { useState } from 'react';

interface FuelHistoryProps {
  entries: FuelEntry[];
  onEntryDeleted: () => void;
}

export default function FuelHistory({ entries, onEntryDeleted }: FuelHistoryProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this fuel entry?')) {
      return;
    }
    setDeletingId(id);
    if (!window.confirm('Delete this fuel entry?')) {
      return;
    }
    const { error } = await supabase.from('fuel_entries').delete().eq('id', id);
    if (error) {
      setDeletingId(null);
      alert(error.message);
      return;
    }
    setDeletingId(null);
    onEntryDeleted();
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Fuel History</h2>
          <p className="mt-1 text-sm text-slate-600">Review entries and manage past refuels.</p>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          No fuel entries yet. Add your first record to start tracking.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{new Date(entry.date).toLocaleDateString()}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{entry.amount.toFixed(1)} L × ${entry.price.toFixed(2)}</h3>
                  <p className="mt-1 text-sm text-slate-600">Created on {entry.created_at ? new Date(entry.created_at).toLocaleString() : '—'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                    ${ (entry.amount * entry.price).toFixed(2) }
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    disabled={deletingId === entry.id}
                    className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === entry.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
