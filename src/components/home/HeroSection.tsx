import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getHomeStats } from '@/lib/data/stats';
import { getRecentJobs } from '@/lib/data/jobs';
import { formatRelativeDate } from '@/lib/utils/seo';
import { ClientSearchForm } from '@/components/home/HeroSearchForm';

const POPULAR_SEARCHES = [
  'Software Engineer',
  'Accountant',
  'Nurse',
  'Data Analyst',
  'Internship',
  'Government',
];

function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}K+`;
  return `${n}+`;
}

async function HeroContent() {
  const [stats, recentJobs] = await Promise.all([
    getHomeStats().catch(() => ({
      totalJobs: 0,
      totalOrganizations: 0,
      totalCategories: 49,
      totalOpportunities: 0,
    })),
    getRecentJobs(6).catch(() => []),
  ]);

  const displayStats = stats.totalJobs > 0
    ? stats
    : { totalJobs: 2500, totalOrganizations: 800, totalCategories: 49, totalOpportunities: 350 };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Search + features */}
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Stop Searching. Start Matching.
            </p>
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-800 sm:text-4xl md:text-5xl">
              Find Jobs That Fit You, <br />
              <span className="text-emerald-600">Not Just Your Keywords</span>
            </h1>
            <p className="max-w-lg text-base font-light leading-relaxed text-gray-600 sm:text-lg">
              Discover verified jobs, internships, and opportunities matched to your skills and experience.
              Get real-time alerts and apply directly to trusted employers across Kenya.
            </p>

            {/* Search bar (client component will be hydrated) */}
            <Suspense>
              <HeroSearch />
            </Suspense>

            {/* CV upload + features */}
            <div className="flex flex-col items-stretch gap-x-5 gap-y-2 pt-1 sm:flex-row sm:items-center">
              <a
                href="/upload-cv"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/50 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:border-emerald-500 hover:text-emerald-600"
              >
                <UploadIcon />
                Upload Your CV
              </a>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="mr-1 font-bold text-emerald-600">&#10003;</span> Verified employers
                </span>
                <span className="flex items-center">
                  <span className="mr-1 font-bold text-emerald-600">&#10003;</span> Daily updates
                </span>
                <span className="flex items-center">
                  <span className="mr-1 font-bold text-emerald-600">&#10003;</span> WhatsApp alerts
                </span>
                <span className="flex items-center">
                  <span className="mr-1 font-bold text-emerald-600">&#10003;</span> Free CV upload
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 pt-3">
              <div className="text-center">
                <div className="text-lg font-extrabold text-gray-800">{formatNumber(displayStats.totalJobs)} Jobs</div>
                <div className="text-xs text-gray-400">Posted</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold text-gray-800">{formatNumber(displayStats.totalOrganizations)} Companies</div>
                <div className="text-xs text-gray-400">Hiring</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold text-gray-800">{displayStats.totalCategories}+ Categories</div>
                <div className="text-xs text-gray-400">Available</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold text-gray-800">{formatNumber(displayStats.totalOpportunities)} Opportunities</div>
                <div className="text-xs text-gray-400">Listed</div>
              </div>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-medium text-gray-400">Popular:</span>
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/jobs?q=${encodeURIComponent(term)}`}
                  className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          {/* Right column: Recently posted */}
          <div>
            <div className="mb-3 flex items-center justify-between border-b border-gray-200/70 pb-2">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Recently Posted
                </h2>
              </div>
              <Link
                href="/jobs"
                className="text-xs font-medium text-gray-400 transition hover:text-emerald-600"
              >
                View all &rarr;
              </Link>
            </div>
            {recentJobs.length > 0 ? (
              <ul className="divide-y divide-gray-200/50">
                {recentJobs.map((job) => (
                  <li key={job.id} className="flex items-center justify-between py-2.5">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/jobs/${job.slug}`}
                        className="text-sm font-semibold text-gray-800 transition hover:text-emerald-600"
                      >
                        {job.title}
                      </Link>
                      <span className="ml-2 text-sm text-gray-400">
                        {job.organization?.orgName ?? ''}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-gray-300">
                      {formatRelativeDate(job.datePosted)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="divide-y divide-gray-200/50">
                {[
                  { title: 'Senior Software Engineer', org: 'Safaricom', time: '2h' },
                  { title: 'Public Health Officer', org: 'County Gov. Mombasa', time: '4h' },
                  { title: 'IT Support Intern', org: 'Equity Bank', time: '1d' },
                  { title: 'Project Coordinator', org: 'UNICEF', time: '2d' },
                  { title: 'Retail Sales Assistant', org: 'Naivas', time: '3h' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between py-2.5">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">{item.title}</span>
                      <span className="ml-2 text-sm text-gray-400">{item.org}</span>
                    </div>
                    <span className="text-xs text-gray-300">{item.time}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-start border-t border-gray-200/50 pt-1">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Browse all latest jobs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Client-side search form
function HeroSearch() {
  return <ClientSearchForm />;
}

function UploadIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <Suspense
      fallback={
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-5 animate-pulse">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-12 w-full max-w-md rounded bg-gray-200" />
                <div className="h-4 w-full max-w-lg rounded bg-gray-200" />
                <div className="h-12 w-full max-w-xl rounded-lg bg-gray-200" />
              </div>
              <div className="animate-pulse space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5">
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 rounded bg-gray-200" />
                      <div className="h-3 w-24 rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      }
    >
      <HeroContent />
    </Suspense>
  );
}