'use client';

import { useState } from 'react';
import Link from 'next/link';

// ============================================================
// SMART JOB MATCHING WIDGET
// ============================================================

export function SmartMatchingWidget() {
  return (
    <div className="rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-teal-50/80 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">🧠</span>
        <span className="rounded-full bg-emerald-100/70 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
          Premium
        </span>
      </div>
      <h4 className="mt-1 text-base font-extrabold text-gray-800">
        Smart Job Matching
      </h4>
      <p className="mt-1 text-sm leading-relaxed text-gray-600">
        Upload your CV and let our AI find the perfect roles for you, tailored
        to your skills and experience.
      </p>
      <Link
        href="/upload-cv"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
      >
        Upload CV &amp; Get Matched →
      </Link>
    </div>
  );
}

// ============================================================
// TRENDING SEARCHES WIDGET
// ============================================================

const TRENDING = [
  'Teaching',
  'Nursing',
  'IT & Software',
  'Driving',
  'Accounting',
  'Engineering',
  'Hospitality',
];

export function TrendingSearchesWidget() {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
      <h4 className="mb-4 flex items-center gap-2 border-b border-gray-200/60 pb-3 text-sm font-bold uppercase tracking-wider text-gray-700">
        <span>🔥</span> Trending Searches
      </h4>
      <ul className="space-y-2">
        {TRENDING.map((term) => (
          <li key={term}>
            <Link
              href={`/jobs?q=${encodeURIComponent(term)}`}
              className="group flex items-center justify-between rounded-lg p-2 text-sm text-gray-700 transition hover:bg-emerald-50/50 hover:text-emerald-600"
            >
              <span>{term}</span>
              <span className="text-xs text-gray-400 transition group-hover:text-emerald-600">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// CV AD WIDGET
// ============================================================

export function CVAdWidget() {
  return (
    <div className="rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-teal-50/80 p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">📄</span>
        <span className="rounded-full bg-emerald-100/70 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
          Internal Ad
        </span>
      </div>
      <h4 className="text-base font-extrabold text-gray-800">
        Your CV Opens Doors
      </h4>
      <p className="mt-1 text-sm text-gray-600">
        Professional CV writing, cover letters, and LinkedIn optimization. From{' '}
        <span className="font-bold text-emerald-600">KSh 1,500</span>.
      </p>
      <Link
        href="#"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
      >
        Improve My CV →
      </Link>
    </div>
  );
}

// ============================================================
// JOB ALERTS WIDGET (functional — posts to /api/subscribe)
// ============================================================

export function JobAlertsWidget({ defaultQuery }: { defaultQuery?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          frequency: 'DAILY',
          query: defaultQuery || '',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-teal-50/80 p-5 shadow-sm text-center">
        <span className="text-2xl">✅</span>
        <h4 className="mt-2 text-sm font-bold text-emerald-700">You&apos;re subscribed!</h4>
        <p className="mt-1 text-xs text-gray-600">We&apos;ll send you matching jobs to your inbox.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">📬</span>
        <h4 className="text-sm font-bold text-gray-700">Get Job Alerts</h4>
      </div>
      <p className="text-xs text-gray-600">
        Get new jobs matching your profile delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {errorMsg && (
          <p className="text-xs text-red-600">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}

// ============================================================
// GOOGLE AD PLACEHOLDER
// ============================================================

export function GoogleAdPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-400 ${className}`}
    >
      <div className="text-center">
        <div>📢 Google Ad</div>
        <div className="text-xs">(300x250)</div>
      </div>
    </div>
  );
}