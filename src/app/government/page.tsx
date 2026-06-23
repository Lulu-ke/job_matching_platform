import type { Metadata } from 'next';
import Link from 'next/link';
import { OrganizationType } from '@prisma/client';
import { getGovernmentJobsByType } from '@/lib/data/jobs';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { JobCard } from '@/components/shared/JobCard';
import {
  SmartMatchingWidget,
  TrendingSearchesWidget,
  CVAdWidget,
  JobAlertsWidget,
  GoogleAdPlaceholder,
} from '@/components/shared/MarketingSidebar';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/seo';
import { Building2, Landmark, SearchX } from 'lucide-react';

export const dynamic = 'force-dynamic';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Government Jobs in Kenya',
  description:
    'Browse the latest government jobs in Kenya — national government ministries, state corporations, county government positions, TSC teaching jobs, KRA, and public service board vacancies. Apply directly on JOBR Kenya.',
  alternates: { canonical: '/government' },
  openGraph: {
    title: 'Government Jobs in Kenya',
    description:
      'Find the latest national and county government job vacancies in Kenya. Verified listings from ministries, state corporations, and county public service boards.',
    siteName: 'JOBR Kenya',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Jobs in Kenya',
    description:
      'Find the latest national and county government job vacancies in Kenya. Verified listings from ministries, state corporations, and county public service boards.',
  },
};

// ============================================================
// SEO CONTENT
// ============================================================

const GOVERNMENT_SEO_TEXT = `Government jobs in Kenya remain among the most sought-after career opportunities in the country. They offer competitive salaries, job security, comprehensive benefits packages, and clear pension schemes under the Public Service Superannuation Act. On JOBR Kenya, we aggregate verified government job listings from national government ministries, state corporations, independent commissions, and all 47 county governments.

Key government employers in Kenya include the Teachers Service Commission (TSC), which recruits thousands of teachers annually for primary and secondary schools across all counties. The Kenya Revenue Authority (KRA) regularly hires tax officers, auditors, and IT specialists. County Public Service Boards advertise positions ranging from county administrators and health workers to engineers and planners. Other major recruiters include the Kenya Defence Forces, National Police Service, Ministry of Health, Ministry of Education, and the Judiciary.

Whether you are a fresh graduate seeking an entry-level position or an experienced professional looking for senior leadership roles in the public sector, JOBR Kenya provides up-to-date, verified listings with clear application deadlines and requirements. Bookmark this page and check back frequently — government vacancies close quickly and competition is high.`;

// ============================================================
// PAGE
// ============================================================

export default async function GovernmentJobsPage() {
  let nationalJobs = { data: [] as any[], total: 0, page: 1, limit: 10, totalPages: 0 };
  let countyJobs = { data: [] as any[], total: 0, page: 1, limit: 10, totalPages: 0 };

  try {
    [nationalJobs, countyJobs] = await Promise.all([
      getGovernmentJobsByType(OrganizationType.NATIONAL_GOVERNMENT, 1, 10),
      getGovernmentJobsByType(OrganizationType.COUNTY_GOVERNMENT, 1, 10),
    ]);
  } catch (err) {
    console.error('GovernmentJobsPage error:', err);
  }

  const totalGovernmentJobs = nationalJobs.total + countyJobs.total;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Government Jobs', href: 'https://jobr.co.ke/government' },
  ]);

  const collectionSchema = generateCollectionPageSchema({
    name: 'Government Jobs in Kenya',
    description:
      'Browse verified national and county government job vacancies across Kenya on JOBR Kenya.',
    url: 'https://jobr.co.ke/government',
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Government Jobs' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* ── Page Header ── */}
        <div className="mb-8 rounded-xl border border-white/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
                Government Jobs in Kenya
              </h1>
              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Verified positions from national government, county governments, state corporations &amp;
                public service boards
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <span className="text-lg font-extrabold text-emerald-600">{totalGovernmentJobs}</span>
              <span className="text-sm text-gray-500">Total Positions</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <span className="text-lg font-extrabold text-emerald-600">{nationalJobs.total}</span>
              <span className="text-sm text-gray-500">National Government</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <span className="text-lg font-extrabold text-emerald-600">{countyJobs.total}</span>
              <span className="text-sm text-gray-500">County Government</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (2/3) */}
          <div className="space-y-10 lg:col-span-2">
            {/* ── SEO Content Block ── */}
            <div className="rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-gray-600">{GOVERNMENT_SEO_TEXT}</p>
            </div>

            {/* ── National Government Jobs ── */}
            <section>
              <SectionHeading
                title="National Government Jobs"
                subtitle={`${nationalJobs.total} active ${nationalJobs.total === 1 ? 'position' : 'positions'} from national ministries, commissions & state corporations`}
              />
              {nationalJobs.data.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {nationalJobs.data.map((job) => (
                    <JobCard
                      key={job.id}
                      title={job.title}
                      slug={job.slug}
                      organizationName={job.organization?.orgName}
                      organizationLogoUrl={job.organization?.orgLogoUrl}
                      organizationSlug={job.organization?.orgSlug}
                      locationCity={job.locationCity}
                      locationCounty={job.locationCounty}
                      employmentType={job.employmentType}
                      experienceLevel={job.experienceLevel}
                      salaryMin={job.salaryMin}
                      salaryMax={job.salaryMax}
                      salaryDisclosure={job.salaryDisclosure}
                      salaryCurrency={job.salaryCurrency}
                      datePosted={job.datePosted}
                      deadline={job.deadline}
                      isRemote={job.isRemote}
                      isFeatured={job.isFeatured}
                    />
                  ))}
                  {nationalJobs.totalPages > 1 && (
                    <div className="mt-6 text-center">
                      <Link
                        href="/jobs?q=government"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                      >
                        View All National Government Jobs &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 px-6 py-12 text-center">
                  <SearchX className="h-8 w-8 text-gray-400" />
                  <h3 className="mt-3 text-base font-bold text-gray-800">
                    No national government openings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Check back soon — new positions are posted regularly.
                  </p>
                </div>
              )}
            </section>

            {/* ── County Government Jobs ── */}
            <section>
              <SectionHeading
                title="County Government Jobs"
                subtitle={`${countyJobs.total} active ${countyJobs.total === 1 ? 'position' : 'positions'} from county public service boards across Kenya's 47 counties`}
              />
              {countyJobs.data.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {countyJobs.data.map((job) => (
                    <JobCard
                      key={job.id}
                      title={job.title}
                      slug={job.slug}
                      organizationName={job.organization?.orgName}
                      organizationLogoUrl={job.organization?.orgLogoUrl}
                      organizationSlug={job.organization?.orgSlug}
                      locationCity={job.locationCity}
                      locationCounty={job.locationCounty}
                      employmentType={job.employmentType}
                      experienceLevel={job.experienceLevel}
                      salaryMin={job.salaryMin}
                      salaryMax={job.salaryMax}
                      salaryDisclosure={job.salaryDisclosure}
                      salaryCurrency={job.salaryCurrency}
                      datePosted={job.datePosted}
                      deadline={job.deadline}
                      isRemote={job.isRemote}
                      isFeatured={job.isFeatured}
                    />
                  ))}
                  {countyJobs.totalPages > 1 && (
                    <div className="mt-6 text-center">
                      <Link
                        href="/jobs?q=county"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                      >
                        View All County Government Jobs &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 px-6 py-12 text-center">
                  <SearchX className="h-8 w-8 text-gray-400" />
                  <h3 className="mt-3 text-base font-bold text-gray-800">
                    No county government openings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    County vacancies are posted as they become available. Stay tuned.
                  </p>
                </div>
              )}
            </section>

            {/* ── Popular Government Search Links ── */}
            <section className="border-t border-gray-200/50 pt-8">
              <SectionHeading
                title="Popular Government Employers"
                subtitle="Quick links to jobs from top government bodies"
              />
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { name: 'Teachers Service Commission (TSC)', query: 'TSC' },
                  { name: 'Kenya Revenue Authority (KRA)', query: 'KRA' },
                  { name: 'Ministry of Health', query: 'Ministry+of+Health' },
                  { name: 'Ministry of Education', query: 'Ministry+of+Education' },
                  { name: 'Kenya Defence Forces', query: 'Kenya+Defence' },
                  { name: 'Judiciary of Kenya', query: 'Judiciary' },
                  { name: 'National Police Service', query: 'Police' },
                  { name: 'County Public Service Boards', query: 'County' },
                ].map((item) => (
                  <Link
                    key={item.query}
                    href={`/jobs?q=${item.query}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/60 bg-white/70 p-3 backdrop-blur-sm transition hover:border-emerald-300 hover:bg-emerald-50/30"
                  >
                    <Building2 className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:text-emerald-600" />
                    <span className="text-sm font-medium text-gray-700 transition group-hover:text-emerald-600">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6 lg:col-span-1">
            <SmartMatchingWidget />
            <GoogleAdPlaceholder />
            <TrendingSearchesWidget />
            <CVAdWidget />
            <JobAlertsWidget />
          </div>
        </div>
      </div>
    </>
  );
}
