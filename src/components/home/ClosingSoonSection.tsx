import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { JobCardSkeletonList } from '@/components/shared/JobCardSkeleton';
import { getClosingSoonJobs } from '@/lib/data/jobs';
import { formatDeadlineCountdown } from '@/lib/utils/seo';
import type { JobWithOrg } from '@/lib/data/jobs';

// Fallback static data when DB is empty
const FALLBACK_CLOSING = [
  { title: 'Marketing Manager', org: 'Co-op Bank', days: 2 },
  { title: 'Data Analyst', org: 'KRA', days: 4 },
  { title: 'Nurse', org: 'County Gov. Kisumu', days: 5 },
  { title: 'Civil Engineer', org: 'KURA', days: 6 },
  { title: 'Finance Officer', org: 'UNICEF', days: 7 },
  { title: 'Retail Sales Assistant', org: 'Naivas', days: 8 },
];

function ClosingSoonContent() {
  return <ClosingSoonInner />;
}

async function ClosingSoonInner() {
  let jobs: JobWithOrg[] = [];
  try {
    jobs = await getClosingSoonJobs(6);
  } catch {
    // DB not available
  }

  // Build display items from DB or fallback
  const items = jobs.length > 0
    ? jobs.map((job) => ({
        title: job.title,
        org: job.organization?.orgName ?? '',
        countdown: job.deadline ? formatDeadlineCountdown(job.deadline) : null,
      }))
    : FALLBACK_CLOSING.map((item) => ({
        title: item.title,
        org: item.org,
        countdown: `${item.days} day${item.days !== 1 ? 's' : ''}`,
      }));

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <SectionHeading
          title="⏳ Don't Miss These Deadlines"
          subtitle="Applications closing soon. Submit your application before time runs out."
          viewAllHref="/jobs?sort=deadline"
        />
        <ul className="divide-y divide-gray-200/50 rounded-xl border border-white/60 bg-white/70 px-4 backdrop-blur-sm">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-3 transition hover:bg-emerald-50/30"
            >
              <div>
                <span className="text-sm font-semibold text-gray-800 transition hover:text-emerald-600">
                  {item.title}
                </span>
                <span className="ml-2 text-sm text-gray-400 transition hover:text-gray-600">
                  {item.org}
                </span>
              </div>
              <span className="text-xs font-medium text-red-600">
                {item.countdown}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center pt-2">
          <Link
            href="/jobs?sort=deadline"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition hover:text-emerald-600"
          >
            View all urgent deadlines <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* CV Promo Card */}
      <div className="space-y-6 lg:col-span-1">
        <CVPromoCard />
      </div>
    </div>
  );
}

function CVPromoCard() {
  return (
    <div className="rounded-xl border border-emerald-100/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-3 text-4xl">📄</div>
      <h3 className="text-xl font-extrabold text-gray-800">
        Professional CV &amp; Cover Letter
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Stand out to Kenyan employers with a professionally written CV and cover letter tailored to your
        industry.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <span className="font-bold text-emerald-600">&#10003;</span> ATS-friendly formatting
        </li>
        <li className="flex items-center gap-2">
          <span className="font-bold text-emerald-600">&#10003;</span> Industry-specific keywords
        </li>
        <li className="flex items-center gap-2">
          <span className="font-bold text-emerald-600">&#10003;</span> Cover letter included
        </li>
      </ul>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-sm font-medium text-gray-500">From</span>
        <span className="text-2xl font-extrabold text-emerald-600">KSh 1,500</span>
      </div>
      <Link
        href="#"
        className="mt-4 inline-block w-full rounded-lg bg-emerald-600 py-3 px-6 text-center font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
      >
        Improve My CV &rarr;
      </Link>
      <p className="mt-3 text-center text-xs text-gray-400">100% satisfaction guarantee</p>
    </div>
  );
}

export function ClosingSoonSection() {
  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <SectionHeading title="⏳ Don't Miss These Deadlines" subtitle="Loading..." />
                <JobCardSkeletonList count={5} />
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
              </div>
            </div>
          }
        >
          <ClosingSoonContent />
        </Suspense>
      </div>
    </section>
  );
}