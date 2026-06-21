import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { searchJobs, getFeaturedJobs } from '@/lib/data/jobs';
import { getAllCategories } from '@/lib/data/categories';
import { slugToEmploymentType, slugToExperienceLevel, employmentTypeToSlug } from '@/lib/enums';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/seo';
import { JobResults } from '@/components/jobs/JobResults';
import {
  SmartMatchingWidget,
  TrendingSearchesWidget,
  CVAdWidget,
  JobAlertsWidget,
  GoogleAdPlaceholder,
} from '@/components/shared/MarketingSidebar';
import { AdBanner } from '@/components/shared/AdBanner';
import { JobFiltersSidebar } from '@/components/jobs/JobFiltersSidebar';
import type { EmploymentType, ExperienceLevel } from '@prisma/client';

// ============================================================
// RENDERING MODE
// ============================================================

export const dynamic = 'force-dynamic';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  searchParams: Promise<{
    q?: string;
    employmentType?: string;
    experienceLevel?: string;
    county?: string;
    category?: string;
    remote?: string;
    salary?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q;

  const title = query
    ? `"${query}" Jobs in Kenya`
    : 'Browse Jobs in Kenya';

  const description = query
    ? `Search results for "${query}" — find the latest ${query} job openings, government jobs, internships, and career opportunities across Kenya.`
    : 'Browse all verified job listings in Kenya. Filter by category, location, employment type, and experience level. Find your next career move today.';

  return {
    title,
    description,
    openGraph: { title, description, siteName: 'JOBR Kenya', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: '/jobs' },
  };
}

// ============================================================
// FILTER CHIPS
// ============================================================

const FILTER_CHIPS: { label: string; value: string }[] = [
  { label: 'All Jobs', value: 'all' },
  { label: 'Full-time', value: 'FULL_TIME' },
  { label: 'Part-time', value: 'PART_TIME' },
  { label: 'Contract', value: 'CONTRACT' },
  { label: 'Internship', value: 'INTERNSHIP' },
  { label: 'Remote', value: 'remote' },
  { label: 'Government', value: 'government' },
];

// ============================================================
// PAGE
// ============================================================

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // ----- Parse filters from URL -----
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(params.limit) || 20));
  const query = params.q?.trim() || undefined;
  const county = params.county?.trim() || undefined;
  const categoryId = params.category?.trim() || undefined;
  const isRemote = params.remote === 'true' ? true : undefined;
  const hasSalary = params.salary === 'true' ? true : undefined;

  const employmentType: EmploymentType | undefined = params.employmentType
    ? slugToEmploymentType(params.employmentType)
    : undefined;

  const experienceLevel: ExperienceLevel | undefined = params.experienceLevel
    ? slugToExperienceLevel(params.experienceLevel)
    : undefined;

  // ----- Determine active chip -----
  const activeChip = employmentType
    ? employmentType
    : isRemote
      ? 'remote'
      : 'all';

  // ----- Fetch data in parallel -----
  const [jobsResult, categories] = await Promise.all([
    searchJobs({
      query,
      employmentType: employmentType as string | undefined,
      experienceLevel: experienceLevel as string | undefined,
      locationCounty: county,
      categoryId,
      isRemote,
      hasSalary,
      sort: (params.sort as any) || undefined,
      page,
      limit,
    }),
    getAllCategories(),
  ]);

  // ----- Breadcrumb -----
  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Browse Jobs' },
  ];

  if (query) {
    breadcrumbItems[1] = { label: 'Browse Jobs', href: '/jobs' };
    breadcrumbItems.push({ label: `Search: "${query}"` });
  } else if (county) {
    breadcrumbItems[1] = { label: 'Browse Jobs', href: '/jobs' };
    breadcrumbItems.push({ label: `in ${county}` });
  }

  const pageTitle = query
    ? `Search Results for "${query}"`
    : county
      ? `Jobs in ${county}`
      : categoryId
        ? (() => {
            const cat = categories.find((c) => c.id === categoryId);
            return cat ? cat.label + ' Jobs' : 'Browse Jobs';
          })()
        : 'Browse Jobs';

  // ----- Build chip URL helper -----
  function getChipUrl(value: string) {
    const sp = new URLSearchParams();
    if (query) sp.set('q', query);
    if (county) sp.set('county', county);
    if (categoryId) sp.set('category', categoryId);
    if (params.sort) sp.set('sort', params.sort);

    if (value === 'all') {
      // Remove type/remote filters
    } else if (value === 'remote') {
      sp.set('remote', 'true');
    } else {
      sp.set('employmentType', employmentTypeToSlug(value as EmploymentType));
    }
    const qs = sp.toString();
    return qs ? `/jobs?${qs}` : '/jobs';
  }

  // JSON-LD schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Browse Jobs', href: 'https://jobr.co.ke/jobs' },
    ...(query ? [{ name: `Search: ${query}` }] : []),
  ]);

  const collectionSchema = generateCollectionPageSchema({
    name: query ? `Search Results for "${query}"` : 'All Jobs in Kenya',
    description: query
      ? `Verified job listings matching "${query}" across Kenya.`
      : 'Browse all verified job listings in Kenya.',
    url: `https://jobr.co.ke/jobs${query ? `?q=${encodeURIComponent(query)}` : ''}`,
  });

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
      {/* ── Top Bar: Title + Search + Filter Chips + Sort ── */}
      <section className="border-b border-gray-200/50 pb-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Browse Jobs</h1>
            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-semibold text-emerald-600">
                {jobsResult.total}
              </span>{' '}
              opportunities
            </p>
          </div>

          {/* Search bar */}
          <form
            action="/jobs"
            method="GET"
            className="flex w-full flex-col gap-3 sm:flex-row md:w-auto"
          >
            <input
              type="hidden"
              name="employmentType"
              value={params.employmentType || ''}
            />
            <input
              type="hidden"
              name="county"
              value={county || ''}
            />
            <input
              type="hidden"
              name="sort"
              value={params.sort || ''}
            />
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search jobs, companies, or keywords"
                className="w-full rounded-lg border border-gray-300 bg-white/70 py-2.5 pl-9 pr-4 text-sm focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Filter chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            Filters:
          </span>
          {FILTER_CHIPS.map((chip) => {
            const isActive = chip.value === activeChip;
            return (
              <Link
                key={chip.value}
                href={getChipUrl(chip.value)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {chip.label}
              </Link>
            );
          })}

          {/* Sort dropdown */}
          <SortDropdown currentSort={params.sort} />
        </div>
      </section>

      {/* ── Main Grid: Job Cards (2/3) + Marketing Sidebar (1/3) ── */}
      <section className="py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Job cards */}
          <div className="space-y-4 lg:col-span-2">
            <JobResults
              jobs={jobsResult.data}
              total={jobsResult.total}
              page={jobsResult.page}
              totalPages={jobsResult.totalPages}
            />
          </div>

          {/* Right: Marketing Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <SmartMatchingWidget />
            <GoogleAdPlaceholder />
            <TrendingSearchesWidget />
            <CVAdWidget />
            <JobAlertsWidget />
          </div>
        </div>
      </section>

      {/* ── Mobile Filters (sheet) ── */}
      <JobFiltersSidebar categories={categories} />
    </div>
    </>
  );
}

// ============================================================
// SORT DROPDOWN (SSR-safe via native select)
// ============================================================

function SortDropdown({ currentSort }: { currentSort?: string }) {
  const sortOptions = [
    { value: '', label: 'Sort by: Relevance' },
    { value: 'newest', label: 'Sort by: Newest' },
    { value: 'deadline-soon', label: 'Sort by: Deadline' },
  ];

  return (
    <select
      name="sort"
      defaultValue={currentSort || ''}
      onChange={(e) => {
        const form = (e.target as HTMLSelectElement).closest('form');
        // Force page reload with new sort
        const url = new URL(window.location.href);
        if (e.target.value) {
          url.searchParams.set('sort', e.target.value);
        } else {
          url.searchParams.delete('sort');
        }
        url.searchParams.delete('page');
        window.location.href = url.toString();
      }}
      className="ml-2 rounded-full border border-gray-300 bg-white/70 px-3 py-1.5 text-sm focus:border-emerald-600 focus:outline-none"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}