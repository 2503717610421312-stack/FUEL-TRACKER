'use client';

import { useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface FuelEntryFormProps {
  userId: string;
  onEntryAdded: () => void;
}

export default function FuelEntryForm({ userId, onEntryAdded }: FuelEntryFormProps) {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!date || !amount || !price) {
      setError('Please fill in all fields.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    const parsedPrice = parseFloat(price);

    setLoading(true);
    const { error } = await supabase.from('fuel_entries').insert([{ user_id: userId, date, amount: parsedAmount, price: parsedPrice }]);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess('✓ Entry saved!');
    setDate('');
    setAmount('');
    setPrice('');
    onEntryAdded();
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Add Fuel Entry</h2>
          <p className="mt-1 text-sm text-slate-600">Record a new date, fuel amount, and price.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Fuel Amount (liters)</span>
          <input
            type="number"
            step="0.1"
            min="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            placeholder="e.g. 45.6"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Price per Liter</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            placeholder="e.g. 1.25"
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving entry…' : 'Add fuel entry'}
        </button>
      </form>
    </section>
  );
}
