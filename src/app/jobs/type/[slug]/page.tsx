import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { slugToEmploymentType, EmploymentTypeLabels } from '@/lib/enums';
import { EmploymentType } from '@prisma/client';
import { getJobsByType, getJobsByType as getJobsByTypeFn, getJobCount } from '@/lib/data/jobs';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { SectionHeading } from '@/components/shared/SectionHeading';
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
  const types = Object.values(EmploymentType);
  return types.map((t) => ({
    slug: t.toLowerCase().replace(/_/g, '-'),
  }));
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const type = slugToEmploymentType(slug);

  if (!type) return { title: 'Employment Type Not Found | JOBR Kenya' };

  const label = EmploymentTypeLabels[type];

  // Strategy 5: NoIndex empty type pages
  const jobCount = await getJobCount({ employmentType: type }).catch(() => 0);
  const isEmpty = jobCount === 0;

  const title = `${label} Jobs in Kenya`;
  const description = `Browse verified ${label.toLowerCase()} job openings across Kenya. Find positions from top employers with competitive salaries and clear requirements on JOBR.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/type/${slug}` },
    openGraph: { title, description, siteName: 'JOBR Kenya' },
    twitter: { card: 'summary_large_image', title, description },
    ...(isEmpty && { robots: { index: false, follow: true } }),
  };
}

// ============================================================
// SEO TEXT
// ============================================================

function getTypeSEOText(label: string, jobCount: number): string {
  return `${label} employment remains one of the most popular career paths in Kenya's dynamic labour market. Currently, JOBR lists ${jobCount}+ active ${label.toLowerCase()} positions from employers spanning all major industries including technology, finance, healthcare, education, and government. ${label} roles offer stability, career growth opportunities, and in many cases competitive compensation packages. Whether you are a recent graduate seeking your first ${label.toLowerCase()} position or an experienced professional looking for your next challenge, this page consolidates all verified ${label.toLowerCase()} vacancies to streamline your job search. Filter by location, experience level, and salary range to find the perfect match for your skills and career goals.`;
}

// ============================================================
// PAGE
// ============================================================

export default async function TypeHubPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);

  const type = slugToEmploymentType(slug);
  if (!type) notFound();

  const label = EmploymentTypeLabels[type];
  const jobsResult = await getJobsByTypeFn(type, page, 20);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'By Type', href: 'https://jobr.co.ke/jobs/type' },
    { name: label, href: `https://jobr.co.ke/jobs/type/${slug}` },
  ]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'By Type', href: '/jobs/type' },
    { label },
  ];

  // Other types for navigation
  const otherTypes = Object.values(EmploymentType).filter((t) => t !== type);

  const collectionSchema = generateCollectionPageSchema({
    name: `${label} Jobs in Kenya`,
    description: `Verified ${label.toLowerCase()} job openings across Kenya.`,
    url: `https://jobr.co.ke/jobs/type/${slug}`,
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
            {label} Jobs in Kenya
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-emerald-600">{jobsResult.total}</span>{' '}
            {label.toLowerCase()} job vacancies
          </p>
        </div>

        {/* SEO Content */}
        <div className="mb-8 rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-gray-600">
            {getTypeSEOText(label, jobsResult.total)}
          </p>
        </div>

        {/* Job Listings */}
        <HubPageContent
          jobs={jobsResult.data}
          total={jobsResult.total}
          page={jobsResult.page}
          totalPages={jobsResult.totalPages}
          baseHref={`/jobs/type/${slug}`}
        />

        {/* Other Employment Types */}
        <div className="mt-10 border-t border-gray-200/50 pt-8">
          <SectionHeading
            title="Browse by Employment Type"
            subtitle="Explore opportunities across different work arrangements"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {otherTypes.map((t) => (
              <Link
                key={t}
                href={`/jobs/type/${t.toLowerCase().replace(/_/g, '-')}`}
                className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
              >
                {EmploymentTypeLabels[t]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}