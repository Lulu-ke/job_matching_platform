import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';

// Static sample data — this section doesn't heavily depend on DB
const NATIONAL_JOBS = [
  { title: 'Tax Officer', org: 'KRA \u00b7 Nairobi', closes: '30 Jun' },
  { title: 'ICT Officer', org: 'ICT Authority \u00b7 Nairobi', closes: '5 Jul' },
  { title: 'Customs Officer', org: 'KRA \u00b7 Mombasa', closes: '15 Jul' },
  { title: 'Public Health Officer', org: 'MOH \u00b7 Nairobi', closes: '20 Jul' },
];

const COUNTY_JOBS = [
  { title: 'Agricultural Officer', org: 'County Gov. Nakuru', closes: '25 Jun' },
  { title: 'Public Health Officer', org: 'County Gov. Mombasa', closes: '2 Jul' },
  { title: 'Water Engineer', org: 'County Gov. Kisumu', closes: '10 Jul' },
  { title: 'Community Development Officer', org: 'County Gov. Machakos', closes: '18 Jul' },
];

function GovJobList({ jobs }: { jobs: typeof NATIONAL_JOBS }) {
  return (
    <ul className="divide-y divide-gray-200/50 px-4">
      {jobs.map((job, i) => (
        <li
          key={i}
          className="flex flex-wrap items-center justify-between gap-2 py-3 transition"
        >
          <div>
            <span className="text-sm font-semibold text-gray-800 transition hover:text-emerald-600">
              {job.title}
            </span>
            <span className="ml-2 text-sm text-gray-400 transition hover:text-gray-600">
              {job.org}
            </span>
          </div>
          <span className="text-xs text-gray-300">Closes {job.closes}</span>
        </li>
      ))}
    </ul>
  );
}

export function GovernmentJobsSection() {
  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="🏛️ Public Sector Opportunities"
          subtitle="National and county government vacancies, internships, shortlisting updates, and recruitment notices."
          viewAllHref="/jobs?type=government"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* National Government */}
          <div className="overflow-hidden rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-blue-100/60 bg-blue-50/50 px-4 py-3">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-blue-700">
                National
              </span>
              <span className="text-sm font-semibold text-gray-800">Government of Kenya</span>
            </div>
            <GovJobList jobs={NATIONAL_JOBS} />
            <div className="border-t border-gray-200/50 bg-white/30 px-4 py-2">
              <Link
                href="/jobs?type=national-government"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
              >
                View all national jobs <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* County Government */}
          <div className="overflow-hidden rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-green-100/60 bg-green-50/50 px-4 py-3">
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-green-800">
                County
              </span>
              <span className="text-sm font-semibold text-gray-800">County Governments</span>
            </div>
            <GovJobList jobs={COUNTY_JOBS} />
            <div className="border-t border-gray-200/50 bg-white/30 px-4 py-2">
              <Link
                href="/jobs?type=county-government"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                View all county jobs <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}