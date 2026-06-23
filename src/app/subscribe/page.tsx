import type { Metadata } from 'next';
import { CheckCircle2, Mail, ArrowRight, Bell } from 'lucide-react';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Subscribe to Job Alerts',
  description:
    'You\'re now subscribed to job alerts on JOBR Kenya. Receive daily or weekly email notifications with the latest job opportunities matched to your preferences.',
  alternates: { canonical: '/subscribe' },
  openGraph: {
    title: 'Subscribe to Job Alerts',
    description:
      'Stay ahead with personalised job alerts from JOBR Kenya. Get the latest jobs delivered to your inbox daily or weekly.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscribe to Job Alerts',
    description:
      'Stay ahead with personalised job alerts from JOBR Kenya.',
  },
};

// ============================================================
// PAGE
// ============================================================

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'Job Alerts' }]} />

      {/* ── Confirmation Section ── */}
      <section className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-gray-200/60 bg-white/70 p-8 text-center backdrop-blur-sm sm:p-12">
          {/* Checkmark Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            You&apos;re{' '}
            <span className="text-emerald-600">Subscribed!</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-600">
            Your job alert is now active. You&apos;ll start receiving curated
            job recommendations straight to your inbox.
          </p>
        </div>
      </section>

      {/* ── What You'll Receive ── */}
      <section className="mx-auto mt-12 max-w-2xl">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
          What You&apos;ll Receive
        </h2>

        <div className="space-y-4">
          {[
            {
              icon: Bell,
              title: 'Daily or Weekly Job Alerts',
              description:
                'Choose your frequency and receive a curated digest of new jobs matching your preferences — category, location, and experience level.',
            },
            {
              icon: Mail,
              title: 'Personalised Recommendations',
              description:
                'Our system filters thousands of listings to send you only the most relevant opportunities. No noise, no irrelevant listings.',
            },
            {
              icon: CheckCircle2,
              title: 'Early Access to Featured Jobs',
              description:
                'Subscribers get first look at premium and featured job postings before they appear in general search results.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-gray-200/60 bg-white/70 p-5 backdrop-blur-sm transition hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto mt-12 max-w-2xl">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-8 text-center backdrop-blur-sm sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Start Browsing Now
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-600">
            Why wait for the next alert? Explore thousands of verified job
            listings already available on JOBR Kenya.
          </p>
          <a
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Browse All Jobs
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}