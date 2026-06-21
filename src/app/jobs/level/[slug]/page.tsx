import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { slugToExperienceLevel, ExperienceLevelLabels } from '@/lib/enums';
import { ExperienceLevel } from '@prisma/client';
import { getJobsByExperienceLevel } from '@/lib/data/hubs';
import { getJobCount } from '@/lib/data/jobs';
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
  const levels = Object.values(ExperienceLevel);
  return levels.map((l) => ({
    slug: l.toLowerCase().replace(/_/g, '-'),
  }));
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const level = slugToExperienceLevel(slug);

  if (!level) return { title: 'Experience Level Not Found | JOBR Kenya' };

  const label = ExperienceLevelLabels[level];

  // Strategy 5: NoIndex empty level pages
  const jobCount = await getJobCount({ experienceLevel: level }).catch(() => 0);
  const isEmpty = jobCount === 0;

  const title = `${label} Jobs in Kenya`;
  const description = `Find ${label.toLowerCase()} job openings across Kenya. JOBR lists verified positions from top employers for ${label.toLowerCase()} professionals.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/level/${slug}` },
    openGraph: { title, description, siteName: 'JOBR Kenya' },
    twitter: { card: 'summary_large_image', title, description },
    ...(isEmpty && { robots: { index: false, follow: true } }),
  };
}

// ============================================================
// SEO TEXT
// ============================================================

function getLevelSEOText(label: string, jobCount: number): string {
  return `${label}-level positions represent a critical segment of Kenya's employment landscape. JOBR currently features ${jobCount}+ active ${label.toLowerCase()} job listings from employers across all major sectors. ${label} roles typically require demonstrated competence and a track record of increasing responsibility. These positions often come with enhanced compensation packages, leadership opportunities, and greater autonomy. Whether you are looking to advance from a junior position or bring years of expertise to a new organisation, this hub page aggregates the best ${label.toLowerCase()} opportunities available in Kenya today. Use the filters and search to narrow down results that match your specific skills and career aspirations.`;
}

// ============================================================
// PAGE
// ============================================================

export default async function LevelHubPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);

  const level = slugToExperienceLevel(slug);
  if (!level) notFound();

  const label = ExperienceLevelLabels[level];
  const jobsResult = await getJobsByExperienceLevel(level, page, 20);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'By Level', href: 'https://jobr.co.ke/jobs/level' },
    { name: label, href: `https://jobr.co.ke/jobs/level/${slug}` },
  ]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'By Level', href: '/jobs/level' },
    { label },
  ];

  const otherLevels = Object.values(ExperienceLevel).filter((l) => l !== level);

  const collectionSchema = generateCollectionPageSchema({
    name: `${label} Jobs in Kenya`,
    description: `Verified ${label.toLowerCase()} job openings across Kenya.`,
    url: `https://jobr.co.ke/jobs/level/${slug}`,
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
            {getLevelSEOText(label, jobsResult.total)}
          </p>
        </div>

        {/* Job Listings */}
        <HubPageContent
          jobs={jobsResult.data}
          total={jobsResult.total}
          page={jobsResult.page}
          totalPages={jobsResult.totalPages}
          baseHref={`/jobs/level/${slug}`}
          alertQuery={label}
        />

        {/* Other Levels */}
        <div className="mt-10 border-t border-gray-200/50 pt-8">
          <SectionHeading
            title="Browse by Experience Level"
            subtitle="Find roles matching your career stage"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {otherLevels.map((l) => (
              <Link
                key={l}
                href={`/jobs/level/${l.toLowerCase().replace(/_/g, '-')}`}
                className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
              >
                {ExperienceLevelLabels[l]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}