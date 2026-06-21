'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ClientSearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl flex-col items-stretch gap-2 pt-1 sm:flex-row"
    >
      <input
        type="text"
        placeholder="Job title, skill, or company"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-emerald-600 focus:outline-none"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Find Matching Jobs
      </button>
    </form>
  );
}