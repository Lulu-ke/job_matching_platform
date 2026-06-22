import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories } from '@/lib/data/categories';
import { getCountyBySlug, UNIQUE_COUNTIES } from '@/lib/data/counties';
import { getJobsByCategoryAndCounty, getJobsByCounty } from '@/lib/data/jobs';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { HubPageContent } from '@/components/hubs/HubPageContent';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/seo';

// ============================================================
// RENDERING MODE
// ============================================================

export const dynamic = 'force-dynamic';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  params: Promise<{ category: string; county: string }>;
  searchParams: Promise<{ page?: string }>;
}

// ============================================================
// STATIC PARAMS (ISR) — only generate pages that have jobs
// ============================================================

export async function generateStaticParams() {
  try {
    const { db } = await import('@/lib/db');
    const { JobStatus } = await import('@prisma/client');

    // Query distinct category+county combos that have active jobs
    const combos = await db.job.findMany({
      where: { status: JobStatus.ACTIVE, deletedAt: null, categoryId: { not: null }, locationCounty: { not: null } },
      select: { category: { select: { slug: true } }, locationCounty: true },
      distinct: ['categoryId', 'locationCounty'],
    });

    // Map county names to slugs
    return combos
      .filter(c => c.category && c.locationCounty)
      .map((c) => {
        const countyData = UNIQUE_COUNTIES.find(
          (co) => co.name.toLowerCase() === (c.locationCounty || '').toLowerCase()
        );
        return {
          category: c.category!.slug,
          county: countyData?.slug || c.locationCounty!.toLowerCase().replace(/\s+/g, '-'),
        };
      });
  } catch {
    return [];
  }
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, county } = await params;
  const catSlug = category;
  const countySlug = county;

  const countyData = getCountyBySlug(countySlug);
  if (!countyData) return { title: 'Not Found | JOBR Kenya' };

  let catLabel = catSlug;
  try {
    const { db } = await import('@/lib/db');
    const cat = await db.jobCategory.findUnique({
      where: { slug: catSlug },
      select: { label: true, seoDescription: true },
    });
    if (cat) catLabel = cat.label;
  } catch {}

  const title = `${catLabel} Jobs in ${countyData.name} County`;
  const description = `Find ${catLabel.toLowerCase()} job vacancies in ${countyData.name} County, Kenya. Browse verified positions from top employers in ${countyData.capital} and surrounding areas.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/category/${catSlug}/${countySlug}` },
    openGraph: { title, description, siteName: 'JOBR Kenya' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

// ============================================================
// SEO TEXT GENERATOR
// ============================================================

function getComboSEOText(catLabel: string, countyName: string, countyCapital: string, jobCount: number): string {
  return `Looking for ${catLabel.toLowerCase()} jobs in ${countyName} County? JOBR aggregates ${jobCount}+ verified ${catLabel.toLowerCase()} job openings from employers across ${countyName}, including positions based in ${countyCapital} and surrounding towns. Whether you are searching for entry-level roles or senior ${catLabel.toLowerCase()} positions, this page brings together all active listings in one place. Filter by experience level, employment type, or salary range to find the perfect match for your skills and career goals in ${countyName} County.`;
}

// ============================================================
// PAGE
// ============================================================

export default async function CategoryCountyComboPage({ params, searchParams }: PageProps) {
  const { category, county } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);

  const catSlug = category;
  const countySlug = county;

  // Resolve county
  const countyData = getCountyBySlug(countySlug);
  if (!countyData) notFound();

  // Resolve category
  let catLabel = catSlug;
  let catDescription: string | null = null;
  try {
    const { db } = await import('@/lib/db');
    const cat = await db.jobCategory.findUnique({
      where: { slug: catSlug },
      select: { label: true, seoDescription: true },
    });
    if (!cat) notFound();
    catLabel = cat.label;
    catDescription = cat.seoDescription;
  } catch {
    notFound();
  }

  // Fetch jobs for this category × county combination
  const jobsResult = await getJobsByCategoryAndCounty(catSlug, countyData.name, page, 20);

  // Upward fallback: if no jobs in this combo, fetch county-wide jobs
  const countyWideJobs = jobsResult.data.length === 0
    ? await getJobsByCounty(countyData.name, 1, 6).catch(() => ({ data: [], total: 0, page: 1, limit: 6, totalPages: 0 }))
    : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'Categories', href: 'https://jobr.co.ke/jobs/category' },
    { name: catLabel, href: `https://jobr.co.ke/jobs/category/${catSlug}` },
    { name: `${countyData.name} County`, href: `https://jobr.co.ke/jobs/category/${catSlug}/${countySlug}` },
  ]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Categories', href: '/jobs/category' },
    { label: catLabel, href: `/jobs/category/${catSlug}` },
    { label: `${countyData.name} County` },
  ];

  const collectionSchema = generateCollectionPageSchema({
    name: `${catLabel} Jobs in ${countyData.name} County, Kenya`,
    description: catDescription || `Verified ${catLabel.toLowerCase()} job vacancies in ${countyData.name} County.`,
    url: `https://jobr.co.ke/jobs/category/${catSlug}/${countySlug}`,
  });

  // Related counties for this category (top 8)
  const relatedCounties = UNIQUE_COUNTIES.filter(c => c.slug !== countySlug).slice(0, 8);

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

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            {catLabel} Jobs in {countyData.name} County
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-emerald-600">{jobsResult.total}</span>{' '}
            {catLabel.toLowerCase()} job vacancies in {countyData.name}, Kenya
          </p>
        </div>

        {/* SEO Content Block */}
        <div className="mb-8 rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-gray-600">
            {getComboSEOText(catLabel, countyData.name, countyData.capital, jobsResult.total)}
          </p>
        </div>

        {/* Job Listings */}
        <HubPageContent
          jobs={jobsResult.data}
          total={jobsResult.total}
          page={jobsResult.page}
          totalPages={jobsResult.totalPages}
          baseHref={`/jobs/category/${catSlug}/${countySlug}`}
          alertQuery={`${catLabel} in ${countyData.name}`}
        />

        {/* Upward Fallback: County-wide jobs if combo is empty */}
        {countyWideJobs && countyWideJobs.data.length > 0 && (
          <div className="mt-10 border-t border-gray-200/50 pt-8">
            <SectionHeading
              title={`All Jobs in ${countyData.name} County`}
              subtitle="Explore opportunities across all categories"
              viewAllHref={`/jobs/county/${countySlug}`}
            />
            <p className="mt-2 text-sm text-gray-500">
              No {catLabel.toLowerCase()} jobs found in {countyData.name} yet. Here are other open positions in the county:
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {countyWideJobs.data.slice(0, 6).map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug}`}
                  className="group rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm transition hover:border-emerald-400 hover:shadow-md"
                >
                  <h3 className="font-bold text-gray-800 group-hover:text-emerald-600">
                    {job.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    {job.organization?.orgName && <span>{job.organization.orgName}</span>}
                    {job.locationCity && <span>· {job.locationCity}</span>}
                  </div>
                  {job.category && (
                    <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {job.category.label}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Counties for this Category */}
        <div className="mt-10 border-t border-gray-200/50 pt-8">
          <h2 className="mb-4 text-lg font-extrabold text-gray-800">
            {catLabel} Jobs in Other Counties
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedCounties.map((c) => (
              <Link
                key={c.slug}
                href={`/jobs/category/${catSlug}/${c.slug}`}
                className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}