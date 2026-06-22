import type { Metadata } from 'next';
import { Brain, Zap, ShieldCheck, Upload, Sparkles, ArrowRight } from 'lucide-react';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { WaitlistForm } from '@/components/shared/WaitlistForm';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Upload Your CV',
  description:
    'Upload your CV to JOBR Kenya and let our AI match you with the best job opportunities across Kenya. Get personalised job recommendations based on your skills and experience.',
  alternates: { canonical: '/upload-cv' },
  openGraph: {
    title: 'Upload Your CV',
    description:
      'Upload your CV to JOBR Kenya and let our AI match you with the best job opportunities across Kenya. Get personalised job recommendations based on your skills and experience.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upload Your CV',
    description:
      'Upload your CV to JOBR Kenya and let our AI match you with the best job opportunities across Kenya.',
  },
};

// ============================================================
// DATA
// ============================================================

const BENEFITS = [
  {
    icon: Brain,
    title: 'Skill Analysis',
    description:
      'Our AI reads your CV and identifies your core competencies, technical skills, and industry experience — building a complete skills profile automatically.',
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description:
      'Once analysed, you\'ll be matched to open positions in real time. The more you update your CV, the smarter and more accurate your matches become.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description:
      'Your CV is stored securely and only shared with employers you choose. You control your visibility and can delete your data at any time.',
  },
];

// ============================================================
// PAGE
// ============================================================

export default function UploadCVPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'Upload CV' }]} />

      {/* ── Hero Section ── */}
      <section className="mb-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Upload className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          AI-Powered{' '}
          <span className="text-emerald-600">CV Matching</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Upload your CV once and let our AI do the rest. We&apos;ll analyse
          your skills, map your experience, and match you with the most relevant
          job opportunities across Kenya — instantly and automatically.
        </p>
      </section>

      {/* ── How It Works ── */}
      <section className="mx-auto mb-16 max-w-3xl">
        <div className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm sm:p-10">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            How It Will Work
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Upload Your CV',
                body: 'Drag and drop your CV in PDF or DOCX format. Our system accepts any standard CV layout.',
              },
              {
                step: '2',
                title: 'AI Analyses Skills',
                body: 'Our engine extracts your qualifications, experience, and competencies to build a detailed skills profile.',
              },
              {
                step: '3',
                title: 'Get Matched to Jobs',
                body: 'Receive personalised job recommendations that align with your profile — updated in real time.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Cards ── */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Why Upload Your CV?
          </h2>
          <p className="mt-2 text-gray-500">
            Three reasons to let AI supercharge your job search.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {BENEFITS.map((item) => {
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

      {/* ── Coming Soon / Email Signup ── */}
      <section className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-8 text-center backdrop-blur-sm sm:p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Coming Soon
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-600">
            We&apos;re building the smartest CV matching engine for the Kenyan
            job market. Be the first to know when it launches.
          </p>
          <WaitlistForm
            source="cv-waitlist"
            placeholder="Enter your email address"
            buttonText="Notify Me"
            className="mx-auto mt-6 max-w-md"
          />
          <p className="mt-3 text-xs text-gray-500">
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}