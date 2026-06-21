import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCountyBySlug, KENYA_COUNTIES, TOP_COUNTIES, UNIQUE_COUNTIES } from '@/lib/data/counties';
import { getJobsByCounty, getJobCount } from '@/lib/data/jobs';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { HubPageContent } from '@/components/hubs/HubPageContent';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/seo';

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
  return KENYA_COUNTIES.map((c) => ({ slug: c.slug }));
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const county = getCountyBySlug(slug);

  if (!county) return { title: 'County Not Found | JOBR Kenya' };

  // Strategy 5: NoIndex empty county pages
  const jobCount = await getJobCount({
    locationCounty: { equals: county.name, mode: 'insensitive' as const },
  }).catch(() => 0);
  const isEmpty = jobCount === 0;

  const title = `Jobs in ${county.name} County`;
  const description = `Find verified job vacancies in ${county.name} County, Kenya. Browse positions from top employers, government offices, NGOs, and private companies in ${county.capital} and surrounding areas.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/county/${slug}` },
    openGraph: { title, description, siteName: 'JOBR Kenya' },
    twitter: { card: 'summary_large_image', title, description },
    ...(isEmpty && { robots: { index: false, follow: true } }),
  };
}

// ============================================================
// SEO TEXT
// ============================================================

function getCountySEOText(name: string, capital: string, jobCount: number): string {
  return `${name} County is one of Kenya's 47 counties, with its administrative headquarters in ${capital}. The county's economy supports a growing job market across sectors including agriculture, healthcare, education, trade, and public administration. JOBR currently lists ${jobCount}+ active job openings in ${name}, ranging from entry-level positions to senior professional roles. Many opportunities are based in ${capital}, the county capital, with additional positions available in smaller towns and peri-urban areas. Whether you are a resident of ${name} or willing to relocate, this page aggregates all verified vacancies to help you find your next role efficiently.`;
}

// ============================================================
// PAGE
// ============================================================

export default async function CountyHubPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);

  const county = getCountyBySlug(slug);
  if (!county) notFound();

  const jobsResult = await getJobsByCounty(county.name, page, 20);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'By Location', href: 'https://jobr.co.ke/jobs/county' },
    { name: `${county.name} County`, href: `https://jobr.co.ke/jobs/county/${slug}` },
  ]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'By Location', href: '/jobs/county' },
    { label: `${county.name} County` },
  ];

  // Nearby counties (show 8 others)
  const otherCounties = KENYA_COUNTIES.filter((c) => c.slug !== slug).slice(0, 12);

  const collectionSchema = generateCollectionPageSchema({
    name: `Jobs in ${county.name} County, Kenya`,
    description: `Verified job vacancies in ${county.name} County, Kenya.`,
    url: `https://jobr.co.ke/jobs/county/${slug}`,
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
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            Jobs in {county.name} County
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-emerald-600">{jobsResult.total}</span>{' '}
            job vacancies in {county.name}, Kenya
          </p>
        </div>

        {/* SEO Content */}
        <div className="mb-8 rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-gray-600">
            {getCountySEOText(county.name, county.capital, jobsResult.total)}
          </p>
        </div>

        {/* Job Listings */}
        <HubPageContent
          jobs={jobsResult.data}
          total={jobsResult.total}
          page={jobsResult.page}
          totalPages={jobsResult.totalPages}
          baseHref={`/jobs/county/${slug}`}
        />

        {/* Other Counties */}
        <div className="mt-10 border-t border-gray-200/50 pt-8">
          <h2 className="mb-4 text-lg font-extrabold text-gray-800">
            Browse Jobs in Other Counties
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {otherCounties.map((c) => (
              <Link
                key={c.slug}
                href={`/jobs/county/${c.slug}`}
                className="rounded-lg border border-gray-200 bg-white/70 px-3 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
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