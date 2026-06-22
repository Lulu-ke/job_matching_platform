import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { OrganizationType, OrganizationIndustry } from '@prisma/client';
import { searchOrganizations } from '@/lib/data/organizations';
import { getOrganizationTypeLabel, getOrganizationIndustryLabel } from '@/lib/enums';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/utils/seo';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    industry?: string;
    page?: string;
  }>;
}

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Top Employers & Organizations',
  description: 'Browse verified employers and organizations hiring in Kenya. Explore company profiles, view open positions, and find your next role at top Kenyan companies.',
  alternates: { canonical: '/organizations' },
  openGraph: {
    title: 'Top Employers & Organizations | JOBR Kenya',
    description: 'Browse verified employers and organizations hiring in Kenya.',
    siteName: 'JOBR Kenya',
  },
  twitter: { card: 'summary_large_image' },
};

// ============================================================
// PAGE
// ============================================================

export const dynamic = 'force-dynamic';

export default async function OrganizationsIndexPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = sp.q || '';
  const type = sp.type || '';
  const industry = sp.industry || '';
  const page = Math.max(1, Number(sp.page) || 1);

  const result = await searchOrganizations({
    search: q || undefined,
    orgType: type || undefined,
    orgIndustry: industry || undefined,
    page,
    limit: 24,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Organizations', href: 'https://jobr.co.ke/organizations' },
  ]);

  const itemListSchema = generateItemListSchema(
    'Organizations Hiring in Kenya',
    'https://jobr.co.ke/organizations',
    result.data.slice(0, 50).map((org, i) => ({
      position: i + 1,
      name: org.orgName,
      url: `https://jobr.co.ke/organizations/${org.orgSlug}`,
    }))
  );

  // Build filter URL helper
  function filterUrl(overrides: Record<string, string>) {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (overrides.type !== undefined) {
      if (overrides.type) params.set('type', overrides.type);
    } else if (type) {
      params.set('type', type);
    }
    if (overrides.industry !== undefined) {
      if (overrides.industry) params.set('industry', overrides.industry);
    } else if (industry) {
      params.set('industry', industry);
    }
    const qs = params.toString();
    return qs ? `/organizations?${qs}` : '/organizations';
  }

  // Pagination
  const showingFrom = (page - 1) * 24 + 1;
  const showingTo = Math.min(page * 24, result.total);
  const paginationPages: (number | 'ellipsis')[] = [];
  if (result.totalPages <= 7) {
    for (let i = 1; i <= result.totalPages; i++) paginationPages.push(i);
  } else {
    paginationPages.push(1);
    if (page > 3) paginationPages.push('ellipsis');
    const start = Math.max(2, page - 1);
    const end = Math.min(result.totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) paginationPages.push(i);
    if (page < result.totalPages - 2) paginationPages.push('ellipsis');
    paginationPages.push(result.totalPages);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbNav items={[
          { label: 'Home', href: '/' },
          { label: 'Organizations' },
        ]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            Top Employers & Organizations
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">
            Explore verified employers actively hiring in Kenya. From government ministries and county offices to multinational corporations, NGOs, tech startups, and leading companies across every industry. Click on any organization to view their full profile and all current job openings.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <form action="/organizations" method="get" className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search organizations..."
                className="w-full rounded-lg border border-gray-300 bg-white/70 py-2.5 pl-10 pr-4 text-sm focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Search
            </button>
          </form>

          {/* Filter pills: Type */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 self-center mr-1">Type:</span>
            <Link
              href={filterUrl({ type: '' })}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${!type ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white/70 text-gray-600 hover:border-emerald-300'}`}
            >
              All
            </Link>
            {[OrganizationType.PRIVATE_COMPANY, OrganizationType.NATIONAL_GOVERNMENT, OrganizationType.COUNTY_GOVERNMENT, OrganizationType.NGO_INTERNATIONAL, OrganizationType.NGO_LOCAL, OrganizationType.UNIVERSITY, OrganizationType.STARTUP, OrganizationType.STATE_CORPORATION].map((t) => (
              <Link
                key={t}
                href={filterUrl({ type: t })}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${type === t ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white/70 text-gray-600 hover:border-emerald-300'}`}
              >
                {getOrganizationTypeLabel(t)}
              </Link>
            ))}
          </div>

          {/* Filter pills: Industry */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 self-center mr-1">Industry:</span>
            <Link
              href={filterUrl({ industry: '' })}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${!industry ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white/70 text-gray-600 hover:border-emerald-300'}`}
            >
              All
            </Link>
            {[OrganizationIndustry.INFORMATION_TECHNOLOGY, OrganizationIndustry.HEALTHCARE, OrganizationIndustry.EDUCATION, OrganizationIndustry.BANKING, OrganizationIndustry.GOVERNMENT_PUBLIC_ADMIN, OrganizationIndustry.NON_PROFIT, OrganizationIndustry.MANUFACTURING, OrganizationIndustry.HOSPITALITY_TOURISM].map((ind) => (
              <Link
                key={ind}
                href={filterUrl({ industry: ind })}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${industry === ind ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white/70 text-gray-600 hover:border-emerald-300'}`}
              >
                {getOrganizationIndustryLabel(ind)}
              </Link>
            ))}
          </div>
        </div>

        {/* Results header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{showingFrom}-{showingTo}</span> of{' '}
            <span className="font-medium text-gray-700">{result.total}</span> organizations
            {(q || type || industry) && (
              <button
                onClick={() => { window.location.href = '/organizations'; }}
                className="ml-2 text-emerald-600 hover:underline"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>

        {/* Organizations Grid */}
        {result.data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white/50 p-12 text-center">
            <p className="text-gray-500">No organizations found matching your criteria.</p>
            <Link href="/organizations" className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline">
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((org) => (
              <Link
                key={org.id}
                href={`/organizations/${org.orgSlug}`}
                className="group flex items-center gap-4 rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm transition hover:border-emerald-400 hover:shadow-md"
              >
                {org.orgLogoUrl ? (
                  <img
                    src={org.orgLogoUrl}
                    alt={org.orgName}
                    className="h-12 w-12 rounded-lg border border-gray-100 object-contain"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-lg font-bold text-emerald-600">
                    {org.orgName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-bold text-gray-800 group-hover:text-emerald-600">
                    {org.orgName}
                  </h2>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                    <span>{getOrganizationTypeLabel(org.orgType)}</span>
                    {org.headquarters && <span>· {org.headquarters}</span>}
                  </div>
                  {org._count.jobs > 0 && (
                    <p className="mt-1 text-xs font-medium text-emerald-600">
                      {org._count.jobs} open {org._count.jobs === 1 ? 'position' : 'positions'}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {result.totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {paginationPages.map((item, idx) =>
              item === 'ellipsis' ? (
                <span key={`e-${idx}`} className="px-2 text-sm text-gray-400">...</span>
              ) : (
                <Link
                  key={item}
                  href={`${filterUrl({})}${filterUrl({}).includes('?') ? '&' : '?'}page=${item}`}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                    page === item
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}