import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchX, Clock, Star } from 'lucide-react';
import { OpportunityType } from '@prisma/client';
import { searchOpportunities } from '@/lib/data/opportunities';
import {
  OpportunityTypeLabels,
  OpportunityTypeColors,
  FundingDisclosureLabels,
  slugToOpportunityType,
  opportunityTypeToSlug,
} from '@/lib/enums';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  formatRelativeDate,
  formatDeadlineCountdown,
} from '@/lib/utils/seo';
import { Badge } from '@/components/ui/badge';
import {
  SmartMatchingWidget,
  TrendingSearchesWidget,
  CVAdWidget,
  JobAlertsWidget,
  GoogleAdPlaceholder,
} from '@/components/shared/MarketingSidebar';
import type { OpportunityListItem } from '@/lib/data/opportunities';

// ============================================================
// RENDERING MODE
// ============================================================

export const dynamic = 'force-dynamic';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  searchParams: Promise<{
    type?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

// ============================================================
// FILTER TABS
// ============================================================

const TYPE_TABS = Object.values(OpportunityType).map((type) => ({
  value: opportunityTypeToSlug(type),
  label: OpportunityTypeLabels[type],
  enumValue: type,
}));

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const typeSlug = params.type?.trim();
  const type = typeSlug ? slugToOpportunityType(typeSlug) : undefined;

  const title = type
    ? `${OpportunityTypeLabels[type]} Opportunities in Kenya`
    : 'Browse Opportunities in Kenya';

  const description = type
    ? `Discover the latest ${OpportunityTypeLabels[type].toLowerCase()} opportunities in Kenya — scholarships, grants, fellowships, and more. Apply before deadlines.`
    : 'Browse scholarships, grants, fellowships, mentorships, competitions, conferences, training, and volunteer opportunities across Kenya. Filter by type and apply today.';

  return {
    title,
    description,
    openGraph: { title, description, siteName: 'JOBR Kenya', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: type ? `/opportunities?type=${typeSlug}` : '/opportunities' },
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

function getLocationLabel(
  city?: string | null,
  county?: string | null,
  isRemote?: boolean,
  isOnline?: boolean
): string {
  const parts: string[] = [];
  if (isOnline) parts.push('Online');
  else if (isRemote) parts.push('Remote');
  if (city) parts.push(city);
  else if (county) parts.push(county);
  return parts.join(', ') || 'Kenya';
}

function formatFundingBadge(
  disclosure: string,
  amount?: number | null,
  currency: string = 'KES'
): string | null {
  const label = FundingDisclosureLabels[disclosure as keyof typeof FundingDisclosureLabels];
  if (!label || label === 'Not Disclosed') return null;
  if (label === 'Show Amount' && amount) {
    const symbol = currency === 'KES' ? 'KSh' : currency;
    if (amount >= 1_000_000) return `${symbol} ${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (amount >= 1_000) return `${symbol} ${(amount / 1_000).toFixed(0)}K`;
    return `${symbol} ${amount.toLocaleString('en-KE')}`;
  }
  return label;
}

// ============================================================
// OPPORTUNITY CARD
// ============================================================

function OpportunityCard({ opp }: { opp: OpportunityListItem }) {
  const deadlineText = opp.deadline ? formatDeadlineCountdown(opp.deadline) : null;
  const fundingText = formatFundingBadge(opp.fundingDisclosure as string, opp.fundingAmount, opp.fundingCurrency);

  const borderClass = opp.featured
    ? 'border-l-4 border-l-emerald-500 border-t-white/60 border-r-white/60 border-b-white/60'
    : 'border-white/60';

  return (
    <div
      className={`group rounded-xl border bg-white/70 p-4 backdrop-blur-sm transition hover:border-emerald-300 hover:bg-emerald-50/30 sm:p-5 ${borderClass}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Provider logo or placeholder */}
        <div className="shrink-0">
          {opp.providerLogoUrl ? (
            <img
              src={opp.providerLogoUrl}
              alt={opp.providerName}
              className="h-11 w-11 rounded-xl object-cover shadow-sm sm:h-12 sm:w-12"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-sm font-extrabold text-emerald-700 shadow-sm sm:h-12 sm:w-12 sm:text-base">
              {getInitials(opp.providerName)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/opportunities/${opp.slug}`}
                className="text-sm font-semibold leading-snug text-gray-800 transition hover:text-emerald-600 sm:text-base sm:font-bold"
              >
                {opp.title}
              </Link>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xs text-gray-400 transition hover:text-gray-600 sm:text-sm">
                  {opp.providerName}
                </span>
                {opp.featured && (
                  <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
                )}
              </div>
            </div>
            <span className="shrink-0 text-xs text-gray-300">
              {formatRelativeDate(opp.datePosted)}
            </span>
          </div>

          {/* Badges row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className={`text-xs font-medium ${OpportunityTypeColors[opp.type]}`}
            >
              {OpportunityTypeLabels[opp.type]}
            </Badge>

            <Badge
              variant="outline"
              className="gap-1 border-gray-200 bg-gray-50 text-xs font-medium text-gray-600"
            >
              📍 {getLocationLabel(opp.locationCity, opp.locationCounty, opp.isRemote, opp.isOnline)}
            </Badge>

            {fundingText && (
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700"
              >
                💰 {fundingText}
              </Badge>
            )}
          </div>

          {/* Bottom row: deadline */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            {deadlineText && (
              <Badge
                variant="outline"
                className={`gap-1 text-xs font-medium ${
                  deadlineText === 'Closed'
                    ? 'border-gray-200 bg-gray-50 text-gray-400'
                    : 'border-red-200 bg-red-50 text-red-600'
                }`}
              >
                <Clock className="h-3 w-3" />
                {deadlineText === 'Closed' ? 'Closed' : `Closes in ${deadlineText}`}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGINATION
// ============================================================

function Pagination({
  total,
  page,
  totalPages,
  baseUrl,
  typeSlug,
  currentSort,
  limit,
}: {
  total: number;
  page: number;
  totalPages: number;
  baseUrl: string;
  typeSlug?: string;
  currentSort?: string;
  limit: number;
}) {
  function createPageUrl(pageNum: number): string {
    const sp = new URLSearchParams();
    if (typeSlug) sp.set('type', typeSlug);
    if (currentSort) sp.set('sort', currentSort);
    if (limit !== 20) sp.set('limit', String(limit));
    if (pageNum > 1) sp.set('page', String(pageNum));
    const qs = sp.toString();
    return qs ? `${baseUrl}?${qs}` : baseUrl;
  }

  // Pagination range
  const pages: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('ellipsis');
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
  }

  const showingFrom = (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200/50 pt-4">
      <p className="text-sm text-gray-500">
        Showing{' '}
        <span className="font-medium text-gray-700">{showingFrom}-{showingTo}</span> of{' '}
        <span className="font-medium text-gray-700">{total.toLocaleString()}</span> opportunities
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={createPageUrl(page - 1)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
            page <= 1
              ? 'pointer-events-none border-gray-200 text-gray-400'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`}
          aria-disabled={page <= 1}
        >
          &larr;
        </Link>
        {pages.map((item, idx) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="text-sm text-gray-400">
              &hellip;
            </span>
          ) : (
            <Link
              key={item}
              href={createPageUrl(item)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                page === item
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {item}
            </Link>
          )
        )}
        <Link
          href={createPageUrl(page + 1)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
            page >= totalPages
              ? 'pointer-events-none border-gray-200 text-gray-400'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`}
          aria-disabled={page >= totalPages}
        >
          &rarr;
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// SORT DROPDOWN (SSR-safe native select)
// ============================================================

function SortDropdown({ currentSort, typeSlug }: { currentSort?: string; typeSlug?: string }) {
  const sortOptions = [
    { value: '', label: 'Sort by: Newest' },
    { value: 'deadline-soon', label: 'Sort by: Deadline' },
    { value: 'deadline-later', label: 'Sort by: Deadline (Latest)' },
  ];

  function getSortUrl(value: string): string {
    const sp = new URLSearchParams();
    if (typeSlug) sp.set('type', typeSlug);
    if (value) sp.set('sort', value);
    const qs = sp.toString();
    return qs ? `/opportunities?${qs}` : '/opportunities';
  }

  return (
    <select
      defaultValue={currentSort || ''}
      onChange={(e) => {
        window.location.href = getSortUrl(e.target.value);
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

// ============================================================
// PAGE
// ============================================================

export default async function OpportunitiesHubPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // ----- Parse filters from URL -----
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(params.limit) || 20));
  const typeSlug = params.type?.trim() || undefined;
  const type = typeSlug ? slugToOpportunityType(typeSlug) : undefined;

  // ----- Fetch data -----
  const result = await searchOpportunities({
    type: type as OpportunityType | undefined,
    sort: (params.sort as 'newest' | 'deadline-soon' | 'deadline-later') || undefined,
    page,
    limit,
  });

  // ----- Breadcrumb -----
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...(type
      ? [
          { label: 'Opportunities', href: '/opportunities' } as const,
          { label: OpportunityTypeLabels[type] },
        ]
      : [{ label: 'Opportunities' }]),
  ];

  const pageTitle = type ? `${OpportunityTypeLabels[type]} Opportunities` : 'Browse Opportunities';

  // ----- Build tab URL helper -----
  function getTabUrl(value: string) {
    const sp = new URLSearchParams();
    if (params.sort) sp.set('sort', params.sort);
    if (value === 'all') {
      // No type filter
    } else {
      sp.set('type', value);
    }
    const qs = sp.toString();
    return qs ? `/opportunities?${qs}` : '/opportunities';
  }

  // ----- JSON-LD Schemas -----
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Opportunities', href: 'https://jobr.co.ke/opportunities' },
    ...(type ? [{ name: OpportunityTypeLabels[type] }] : []),
  ]);

  const collectionSchema = generateCollectionPageSchema({
    name: type ? `${OpportunityTypeLabels[type]} Opportunities in Kenya` : 'All Opportunities in Kenya',
    description: type
      ? `Browse all ${OpportunityTypeLabels[type].toLowerCase()} opportunities in Kenya.`
      : 'Browse all verified opportunities in Kenya — scholarships, grants, fellowships, and more.',
    url: `https://jobr.co.ke/opportunities${type ? `?type=${typeSlug}` : ''}`,
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
        {/* ── Breadcrumb ── */}
        <nav className="mb-6">
          <BreadcrumbNav items={breadcrumbItems} />
        </nav>

        {/* ── Top Bar: Title + Filter Tabs + Sort ── */}
        <section className="border-b border-gray-200/50 pb-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">{pageTitle}</h1>
              <p className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-semibold text-emerald-600">
                  {result.total}
                </span>{' '}
                opportunities
              </p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-gray-400">
              Type:
            </span>
            <Link
              href={getTabUrl('all')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                !type
                  ? 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              All
            </Link>
            {TYPE_TABS.map((tab) => {
              const isActive = type === tab.enumValue;
              return (
                <Link
                  key={tab.value}
                  href={getTabUrl(tab.value)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}

            {/* Sort dropdown */}
            <SortDropdown currentSort={params.sort} typeSlug={typeSlug} />
          </div>
        </section>

        {/* ── Main Grid: Opportunity Cards (2/3) + Marketing Sidebar (1/3) ── */}
        <section className="py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left: Opportunity cards */}
            <div className="lg:col-span-2">
              {result.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <SearchX className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-800">No opportunities found</h3>
                  <p className="mt-1.5 max-w-sm text-sm text-gray-500">
                    Try selecting a different type or check back later for new listings.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {result.data.map((opp) => (
                    <OpportunityCard key={opp.id} opp={opp} />
                  ))}

                  <Pagination
                    total={result.total}
                    page={result.page}
                    totalPages={result.totalPages}
                    baseUrl="/opportunities"
                    typeSlug={typeSlug}
                    currentSort={params.sort}
                    limit={result.limit}
                  />
                </div>
              )}
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
      </div>
    </>
  );
}