'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="border-t border-gray-200/50 py-12">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-3 inline-flex items-center justify-center rounded-full bg-emerald-100 p-3">
          <Mail className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800">Never Miss an Opportunity</h2>
        <p className="mt-1 text-sm text-gray-500">
          Get new jobs, deadlines, and career opportunities delivered directly to your inbox.
        </p>

        {submitted ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="font-semibold text-emerald-700">✓ You&apos;re subscribed!</p>
            <p className="mt-1 text-sm text-emerald-600">
              Check your inbox for a confirmation email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-lg border border-gray-300 bg-white/70 px-4 py-3 text-sm focus:border-emerald-600 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <p className="mt-3 text-xs text-gray-400">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}