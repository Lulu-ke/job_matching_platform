'use client';

import { useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchX } from 'lucide-react';
import { JobCard } from '@/components/shared/JobCard';
import {
  SmartMatchingWidget,
  TrendingSearchesWidget,
  CVAdWidget,
  JobAlertsWidget,
  GoogleAdPlaceholder,
} from '@/components/shared/MarketingSidebar';
import type { JobWithOrg } from '@/lib/data/jobs';

// ============================================================
// TYPES
// ============================================================

interface HubPageContentProps {
  jobs: JobWithOrg[];
  total: number;
  page: number;
  totalPages: number;
  baseHref: string;
  /** Passed to JobAlertsWidget so the alert query is contextual */
  alertQuery?: string;
}

// ============================================================
// COMPONENT
// ============================================================

export function HubPageContent({
  jobs,
  total,
  page,
  totalPages,
  baseHref,
  alertQuery,
}: HubPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (pageNum <= 1) {
        params.delete('page');
      } else {
        params.set('page', String(pageNum));
      }
      const qs = params.toString();
      return qs ? `${baseHref}?${qs}` : baseHref;
    },
    [searchParams, baseHref]
  );

  const goToPage = useCallback(
    (pageNum: number) => {
      router.push(createPageUrl(pageNum));
    },
    [router, createPageUrl]
  );

  const paginationRange = useMemo(() => {
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
    return pages;
  }, [page, totalPages]);

  const showingFrom = (page - 1) * 20 + 1;
  const showingTo = Math.min(page * 20, total);

  // Sidebar content (always rendered — including empty state)
  const sidebar = (
    <div className="space-y-6 lg:col-span-1">
      <SmartMatchingWidget />
      <GoogleAdPlaceholder />
      <TrendingSearchesWidget />
      <CVAdWidget />
      <JobAlertsWidget defaultQuery={alertQuery} />
    </div>
  );

  // Empty state — shows CTA + sidebar with email capture
  if (jobs.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <SearchX className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-800">No jobs found</h3>
            <p className="mt-1.5 max-w-sm text-sm text-gray-500">
              Check back soon — new opportunities are added daily. Set up a
              job alert and we&apos;ll notify you when matching jobs arrive.
            </p>
            <a
              href="/jobs"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Browse All Jobs →
            </a>
          </div>
        </div>
        {sidebar}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left: Job cards (2/3) */}
      <div className="space-y-4 lg:col-span-2">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            slug={job.slug}
            description={job.description}
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
        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200/50 pt-4">
            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-medium text-gray-700">{showingFrom}-{showingTo}</span> of{' '}
              <span className="font-medium text-gray-700">{total.toLocaleString()}</span> jobs
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                  page <= 1
                    ? 'cursor-not-allowed border-gray-200 text-gray-400'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                ←
              </button>
              {paginationRange.map((item, idx) =>
                item === 'ellipsis' ? (
                  <span key={`e-${idx}`} className="text-sm text-gray-400">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => goToPage(item)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                      page === item
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                  page >= totalPages
                    ? 'cursor-not-allowed border-gray-200 text-gray-400'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Marketing Sidebar (1/3) */}
      {sidebar}
    </div>
  );
}