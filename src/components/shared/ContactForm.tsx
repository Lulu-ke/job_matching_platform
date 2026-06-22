'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50/60 p-10 text-center">
        <CheckCircle className="h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-lg font-bold text-gray-900">Message Sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-600">
          Thank you for reaching out. We will get back to you within 24 hours at the email address you provided.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-emerald-600 underline hover:text-emerald-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Wanjiru"
            required
            className="border-gray-300 bg-white/70 focus:border-emerald-600"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
            className="border-gray-300 bg-white/70 focus:border-emerald-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Partnership enquiry"
          required
          className="border-gray-300 bg-white/70 focus:border-emerald-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <Textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us how we can help you..."
          required
          className="border-gray-300 bg-white/70 focus:border-emerald-600"
        />
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}