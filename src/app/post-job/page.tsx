import type { Metadata } from 'next';
import {
  Megaphone,
  ShieldCheck,
  BarChart3,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { WaitlistForm } from '@/components/shared/WaitlistForm';
import { Button } from '@/components/ui/button';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Post a Job',
  description:
    'Post job listings on JOBR Kenya and reach over 2 million verified job seekers. Get access to an employer dashboard, featured listings, and applicant tracking tools.',
  alternates: { canonical: '/post-job' },
  openGraph: {
    title: 'Post a Job',
    description:
      'Post job listings on JOBR Kenya and reach over 2 million verified job seekers. Employer tools, featured listings, and applicant tracking.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Post a Job',
    description:
      'Post job listings on JOBR Kenya and reach over 2 million verified job seekers.',
  },
};

// ============================================================
// DATA
// ============================================================

const EMPLOYER_FEATURES = [
  {
    icon: Megaphone,
    title: 'Reach 2M+ Job Seekers',
    description:
      'Your listing will be visible to Kenya\'s largest verified audience of active job seekers across all 47 counties.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description:
      'All employer accounts are vetted. Verified badges build trust and increase application rates by up to 3x.',
  },
  {
    icon: BarChart3,
    title: 'Employer Dashboard',
    description:
      'Track views, applications, and shortlist candidates from a single dashboard. Manage all your postings in one place.',
  },
];

const PRICING_PLANS = [
  {
    name: 'Free',
    price: 'KSh 0',
    period: '/month',
    description: 'Perfect for small businesses posting occasionally.',
    features: [
      '1 active job listing',
      'Standard visibility in search',
      'Email notifications for applications',
      '7-day listing duration',
      'Basic employer profile',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 'KSh 4,999',
    period: '/month',
    description: 'For growing companies that need more reach.',
    features: [
      '10 active job listings',
      'Featured badge & priority placement',
      'Applicant tracking dashboard',
      '30-day listing duration',
      'Company branding & logo',
      'Highlighted in category pages',
      'Analytics & performance reports',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organisations and recruitment agencies.',
    features: [
      'Unlimited job listings',
      'Dedicated account manager',
      'Bulk upload via CSV/API',
      'Custom branded career page',
      'Priority support (24h SLA)',
      'ATS integrations',
      'Bulk applicant screening',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

// ============================================================
// PAGE
// ============================================================

export default function PostJobPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'Post a Job' }]} />

      {/* ── Hero Section ── */}
      <section className="mb-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Megaphone className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Post Your{' '}
          <span className="text-emerald-600">Job Listing</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Reach millions of qualified Kenyan job seekers with verified listings,
          powerful employer tools, and AI-driven candidate matching. Post your
          first job in under 5 minutes.
        </p>
      </section>

      {/* ── Employer Features ── */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Why Employers Choose JOBR
          </h2>
          <p className="mt-2 text-gray-500">
            Everything you need to find the right candidate, fast.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {EMPLOYER_FEATURES.map((item) => {
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

      {/* ── Pricing Cards ── */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Simple, Transparent{' '}
            <span className="text-emerald-600">Pricing</span>
          </h2>
          <p className="mt-2 text-gray-500">
            Choose the plan that fits your hiring needs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-6 backdrop-blur-sm transition hover:shadow-md ${
                plan.highlighted
                  ? 'border-emerald-300 bg-white ring-2 ring-emerald-600/20'
                  : 'border-gray-200/60 bg-white/70'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-emerald-600">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>

              <ul className="mb-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'border border-gray-300 bg-white/70 text-gray-700 hover:bg-white'
                }`}
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coming Soon / Early Access ── */}
      <section className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-8 text-center backdrop-blur-sm sm:p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Employer Portal Coming Soon
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-600">
            We&apos;re putting the finishing touches on the employer dashboard.
            Sign up to get early access and post your first job for free.
          </p>
          <WaitlistForm
            source="employer-waitlist"
            placeholder="Enter your work email"
            buttonText="Get Early Access"
            className="mx-auto mt-6 max-w-md"
          />
          <p className="mt-3 text-xs text-gray-500">
            We&apos;ll only email you about the employer launch. No spam.
          </p>
        </div>
      </section>
    </div>
  );
}