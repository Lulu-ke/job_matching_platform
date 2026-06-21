import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ExternalLink,
  MapPin,
  Globe,
  BadgeCheck,
  Building2,
  SearchX,
} from 'lucide-react';
import { getOrganizationBySlug, getActiveOrganizationSlugs, getSimilarOrganizations } from '@/lib/data/organizations';
import { getJobsByOrganization } from '@/lib/data/jobs';
import { getOpportunitiesByOrganization } from '@/lib/data/opportunities';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { JobCard } from '@/components/shared/JobCard';
import {
  SmartMatchingWidget,
  TrendingSearchesWidget,
  CVAdWidget,
  GoogleAdPlaceholder,
} from '@/components/shared/MarketingSidebar';
import {
  getOrganizationTypeLabel,
  getOrganizationIndustryLabel,
  OpportunityTypeLabels,
  OpportunityTypeColors,
} from '@/lib/enums';
import { generateBreadcrumbSchema, formatRelativeDate } from '@/lib/utils/seo';
import { Badge } from '@/components/ui/badge';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// ============================================================
// STATIC PARAMS
// ============================================================

export async function generateStaticParams() {
  try {
    const slugs = await getActiveOrganizationSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const org = await getOrganizationBySlug(slug).catch(() => null);

  if (!org) return { title: 'Organization Not Found | JOBR Kenya' };

  const title = `${org.orgName} Jobs & Careers`;
  const description =
    org.orgDescription
      ? org.orgDescription.slice(0, 155)
      : `Find the latest jobs and career opportunities at ${org.orgName}. Browse verified positions and apply directly on JOBR Kenya.`;

  const isEmpty = org._count.jobs === 0;

  return {
    title,
    description,
    alternates: { canonical: `/organizations/${slug}` },
    openGraph: {
      title,
      description,
      siteName: 'JOBR Kenya',
      type: 'profile',
    },
    twitter: { card: 'summary_large_image', title, description },
    ...(isEmpty && { robots: { index: false, follow: true } }),
  };
}

// ============================================================
// HELPERS
// ============================================================

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// ============================================================
// PAGE
// ============================================================

export default async function OrganizationProfilePage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);

  const org = await getOrganizationBySlug(slug).catch(() => null);
  if (!org) notFound();

  // Fetch jobs, opportunities, and similar orgs in parallel
  const [jobsResult, opportunities, similarOrgs] = await Promise.all([
    getJobsByOrganization(org.id, page, 20),
    getOpportunitiesByOrganization(org.id, 6).catch(() => []),
    getSimilarOrganizations(org.orgIndustry, org.id, 5).catch(() => []),
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Organizations', href: 'https://jobr.co.ke/organizations' },
    { name: org.orgName, href: `https://jobr.co.ke/organizations/${slug}` },
  ]);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.orgName,
    url: `https://jobr.co.ke/organizations/${slug}`,
    ...(org.orgWebsite && { sameAs: org.orgWebsite }),
    ...(org.headquarters && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: org.headquarters,
        addressCountry: 'KE',
      },
    }),
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Organizations', href: '/organizations' },
    { label: org.orgName },
  ];

  const activeJobs = org._count.jobs;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* ── Organization Header Card ── */}
            <div className="rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                {/* Logo / Avatar */}
                <div className="shrink-0">
                  {org.orgLogoUrl ? (
                    <img
                      src={org.orgLogoUrl}
                      alt={org.orgName}
                      className="h-20 w-20 rounded-2xl object-cover shadow-md sm:h-24 sm:w-24"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-2xl font-extrabold text-emerald-700 shadow-md sm:h-24 sm:w-24 sm:text-3xl">
                      {getInitials(org.orgName)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
                      {org.orgName}
                    </h1>
                    {org.isVerified && (
                      <span
                        className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700"
                        title="Verified Organization"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Badges row */}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700"
                    >
                      <Building2 className="mr-1 h-3 w-3" />
                      {getOrganizationTypeLabel(org.orgType)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-200 bg-gray-50 text-xs font-medium text-gray-600"
                    >
                      {getOrganizationIndustryLabel(org.orgIndustry as any)}
                    </Badge>
                    {org.headquarters && (
                      <Badge
                        variant="outline"
                        className="border-gray-200 bg-gray-50 text-xs font-medium text-gray-600"
                      >
                        <MapPin className="mr-1 h-3 w-3" />
                        {org.headquarters}
                      </Badge>
                    )}
                  </div>

                  {/* Website link */}
                  {org.orgWebsite && (
                    <div className="mt-3">
                      <a
                        href={org.orgWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Visit Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      <span className="font-semibold text-emerald-600">{activeJobs}</span> active{' '}
                      {activeJobs === 1 ? 'job' : 'jobs'}
                    </span>
                    {opportunities.length > 0 && (
                      <span>
                        <span className="font-semibold text-emerald-600">{opportunities.length}</span>{' '}
                        {opportunities.length === 1 ? 'opportunity' : 'opportunities'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Organization Description ── */}
            {org.orgDescription && (
              <div className="rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
                <h2 className="mb-3 text-lg font-extrabold text-gray-800">About {org.orgName}</h2>
                <div className="prose prose-sm max-w-none text-gray-600">
                  {org.orgDescription.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* ── Active Jobs ── */}
            <div>
              <SectionHeading
                title={`Jobs at ${org.orgName}`}
                subtitle={`${jobsResult.total} active ${jobsResult.total === 1 ? 'position' : 'positions'}`}
              />
              {jobsResult.data.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {jobsResult.data.map((job) => (
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

                  {/* Pagination */}
                  {jobsResult.totalPages > 1 && (
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200/50 pt-4">
                      <p className="text-sm text-gray-500">
                        Showing{' '}
                        <span className="font-medium text-gray-700">
                          {(page - 1) * 20 + 1}-{Math.min(page * 20, jobsResult.total)}
                        </span>{' '}
                        of{' '}
                        <span className="font-medium text-gray-700">
                          {jobsResult.total.toLocaleString()}
                        </span>{' '}
                        jobs
                      </p>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(jobsResult.totalPages, 7) }, (_, i) => {
                          let pageNum: number;
                          if (jobsResult.totalPages <= 7) {
                            pageNum = i + 1;
                          } else if (page <= 4) {
                            pageNum = i + 1;
                          } else if (page >= jobsResult.totalPages - 3) {
                            pageNum = jobsResult.totalPages - 6 + i;
                          } else {
                            pageNum = page - 3 + i;
                          }
                          return (
                            <Link
                              key={pageNum}
                              href={
                                pageNum === 1
                                  ? `/organizations/${slug}`
                                  : `/organizations/${slug}?page=${pageNum}`
                              }
                              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                                page === pageNum
                                  ? 'border-emerald-600 bg-emerald-600 text-white'
                                  : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                              }`}
                            >
                              {pageNum}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <SearchX className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-800">No open positions</h3>
                  <p className="mt-1.5 max-w-sm text-sm text-gray-500">
                    {org.orgName} doesn&apos;t have any active job listings at the moment. Check back
                    soon or browse other employers.
                  </p>
                  <Link
                    href="/jobs"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    Browse All Jobs &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* ── Opportunities ── */}
            {opportunities.length > 0 && (
              <div className="mt-8">
                <SectionHeading
                  title="Opportunities"
                  subtitle={`Scholarships, grants, and programs from ${org.orgName}`}
                />
                <div className="mt-4 space-y-3">
                  {opportunities.map((opp) => (
                    <Link
                      key={opp.id}
                      href={`/opportunities/${opp.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm transition hover:border-emerald-300 hover:bg-emerald-50/30"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700">
                        {opp.type.slice(0, 3).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-gray-800 transition group-hover:text-emerald-600">
                          {opp.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <Badge
                            variant="outline"
                            className={`text-xs font-medium ${
                              (OpportunityTypeColors as any)[opp.type] ??
                              'border-gray-200 bg-gray-50 text-gray-600'
                            }`}
                          >
                            {(OpportunityTypeLabels as any)[opp.type] ?? opp.type}
                          </Badge>
                          {opp.deadline && (
                            <span className="text-xs text-gray-400">
                              Deadline: {formatRelativeDate(opp.deadline)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6 lg:col-span-1">
            <SmartMatchingWidget />
            <GoogleAdPlaceholder />

            {/* Similar Organizations */}
            {similarOrgs.length > 0 && (
              <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
                <h4 className="mb-4 flex items-center gap-2 border-b border-gray-200/60 pb-3 text-sm font-bold uppercase tracking-wider text-gray-700">
                  <Building2 className="h-4 w-4" />
                  Similar Organizations
                </h4>
                <ul className="space-y-3">
                  {similarOrgs.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/organizations/${s.orgSlug}`}
                        className="group flex items-center gap-3 rounded-lg p-2 transition hover:bg-emerald-50/50"
                      >
                        {s.orgLogoUrl ? (
                          <img
                            src={s.orgLogoUrl}
                            alt={s.orgName}
                            className="h-9 w-9 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-extrabold text-emerald-700">
                            {getInitials(s.orgName)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-gray-700 transition group-hover:text-emerald-600">
                            {s.orgName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {s._count.jobs} {s._count.jobs === 1 ? 'job' : 'jobs'}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <TrendingSearchesWidget />
            <CVAdWidget />
          </div>
        </div>
      </div>
    </>
  );
}
