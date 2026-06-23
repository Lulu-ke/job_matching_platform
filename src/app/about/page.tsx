import type { Metadata } from 'next';
import {
  ShieldCheck,
  Layers,
  MapPin,
  Sparkles,
  Users,
  Target,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about JOBR Kenya — the country\'s most trusted job board connecting Kenyans with verified job opportunities across all 47 counties.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us',
    description:
      'Learn about JOBR Kenya — the country\'s most trusted job board connecting Kenyans with verified job opportunities across all 47 counties.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us',
    description:
      'Learn about JOBR Kenya — the country\'s most trusted job board connecting Kenyans with verified job opportunities across all 47 counties.',
  },
};

// ============================================================
// DATA
// ============================================================

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description:
      'Every job posted on JOBR goes through a verification process so you can apply with confidence. No scams, no misleading postings.',
  },
  {
    icon: Layers,
    title: '49 Job Categories',
    description:
      'From Accounting to Welding, we cover every industry. Browse opportunities across 49 curated categories tailored to the Kenyan market.',
  },
  {
    icon: MapPin,
    title: 'All 47 Counties',
    description:
      "Whether you're in Nairobi, Mombasa, Kisumu, or Garissa — we list jobs from every county so opportunities are never out of reach.",
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Matching',
    description:
      'Our smart matching engine analyses your profile and preferences to surface the most relevant opportunities, saving you hours of searching.',
  },
];

const STATS = [
  { value: '50,000+', label: 'Jobs Posted Monthly' },
  { value: '2M+', label: 'Job Seekers' },
  { value: '10,000+', label: 'Trusted Employers' },
  { value: '47', label: 'Counties Covered' },
];

// ============================================================
// PAGE
// ============================================================

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'About Us' }]} />

      {/* ── Hero Section ── */}
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          About{' '}
          <span className="text-emerald-600">JOBR Kenya</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Kenya&apos;s fastest-growing job board, built with one mission: to
          connect every Kenyan with verified, meaningful employment
          opportunities — no matter where they live.
        </p>
      </section>

      {/* ── Stats Bar ── */}
      <section className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200/60 bg-white/70 px-4 py-6 text-center backdrop-blur-sm transition hover:shadow-md"
          >
            <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ── Mission Section ── */}
      <section className="mb-16">
        <div className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 sm:h-20 sm:w-20">
              <Target className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Our Mission
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                JOBR Kenya exists to bridge the gap between talented Kenyans
                and legitimate employers. We believe that access to
                verified job opportunities should be universal — whether
                you&apos;re a fresh graduate in Nairobi or an experienced
                professional in Lodwar. By curating listings, leveraging
                AI-powered matching, and covering all 47 counties, we&apos;re
                building a job market that works for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Makes JOBR Different ── */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            What Makes JOBR Different
          </h2>
          <p className="mt-2 text-gray-500">
            Four pillars that set us apart from other job boards in Kenya.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Our Commitment ── */}
      <section className="mb-16">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-6 backdrop-blur-sm sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white sm:h-20 sm:w-20">
              <Users className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Our Commitment to You
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                We are deeply committed to the success of every job seeker and
                employer on our platform. Our team of moderators reviews
                listings daily, our AI engine is continuously improved, and our
                support team is always ready to help. We are proudly Kenyan —
                designed in Nairobi, built for the nation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/jobs"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Browse Jobs
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-white"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Row ── */}
      <section className="mb-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Heart,
              title: 'Built for Kenya',
              body: 'Localised for the Kenyan job market with county-level search, KES salary info, and government job listings.',
            },
            {
              icon: ShieldCheck,
              title: 'Trust & Safety',
              body: 'Every employer is vetted. Every listing is checked. We take fraud seriously and act fast to protect our community.',
            },
            {
              icon: Sparkles,
              title: 'Always Improving',
              body: 'We release new features every month based on feedback from Kenyan job seekers and employers.',
            },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-xl border border-gray-200/60 bg-white/70 p-6 text-center backdrop-blur-sm transition hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{v.body}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
