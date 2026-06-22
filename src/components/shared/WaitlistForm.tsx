'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface WaitlistFormProps {
  source: 'employer-waitlist' | 'cv-waitlist';
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function WaitlistForm({ source, placeholder, buttonText, className = '' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          frequency: 'DAILY',
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to subscribe');
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 text-sm text-emerald-700 ${className}`}>
        <CheckCircle className="h-4 w-4 shrink-0" />
        <span>You&apos;re on the list! We&apos;ll notify you when it launches.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder || 'Enter your email'}
          required
          className="flex-1 rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-sm focus:border-emerald-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {status === 'loading' ? '...' : (buttonText || 'Get Early Access')}
        </button>
      </div>
      {errorMsg && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" />
          {errorMsg}
        </p>
      )}
    </form>
  );
}