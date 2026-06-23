import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateBreadcrumbSchema } from '@/lib/utils/seo';
import { ResourcesClient } from './resources-client';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Career Advice & Resources',
  description:
    'Expert career advice for Kenyan job seekers. CV tips, interview preparation, salary guides, cover letter templates, and remote work strategies — all tailored to the Kenyan job market.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Career Advice & Resources',
    description:
      'Expert career advice for Kenyan job seekers. CV tips, interview prep, salary guides, and more — all tailored to the Kenyan job market.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Advice & Resources',
    description:
      'Expert career advice for Kenyan job seekers. CV tips, interview prep, salary guides, and more.',
  },
};

// ============================================================
// PAGE
// ============================================================

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', href: 'https://jobr.co.ke' },
              { name: 'Career Advice & Resources', href: 'https://jobr.co.ke/resources' },
            ])
          ),
        }}
      />

      <BreadcrumbNav items={[{ label: 'Career Advice & Resources' }]} />

      {/* ── Hero Section ── */}
      <section className="mb-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Career Advice &{' '}
          <span className="text-emerald-600">Resources</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Expert guides and actionable tips to help you land your next role.
          Tailored specifically for the Kenyan job market.
        </p>
      </section>

      {/* ── Category Filter + Article Grid (client) ── */}
      <ResourcesClient />
    </div>
  );
}