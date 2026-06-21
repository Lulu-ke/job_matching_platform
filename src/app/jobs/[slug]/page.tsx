import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJobBySlug, getSimilarJobs } from '@/lib/data/jobs';
import { truncate, generateJobSchema, generateBreadcrumbSchema } from '@/lib/utils/seo';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { JobDetailContent } from '@/components/jobs/JobDetailContent';
import { JobDetailSidebar } from '@/components/jobs/JobDetailSidebar';
import { SimilarJobs } from '@/components/jobs/SimilarJobs';
import {
  SmartMatchingWidget,
  TrendingSearchesWidget,
  CVAdWidget,
  JobAlertsWidget,
  GoogleAdPlaceholder,
} from '@/components/shared/MarketingSidebar';

// ============================================================
// RENDERING MODE
// ============================================================

export const dynamic = 'force-dynamic';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return { title: 'Job Not Found | JOBR Kenya' };
  }

  const orgName = job.organization?.orgName ?? 'Unspecified Employer';
  const description = truncate(job.description, 160);

  return {
    title: `${job.title} at ${orgName}`,
    description,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: {
      title: `${job.title} at ${orgName}`,
      description,
      type: 'article',
      publishedTime: job.datePosted.toISOString(),
      ...(job.deadline && { expiresTime: job.deadline.toISOString() }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} at ${orgName}`,
      description,
    },
  };
}

// ============================================================
// PAGE
// ============================================================

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [job, similarJobs] = await Promise.all([
    getJobBySlug(slug),
    getSimilarJobs(slug, undefined, 5).catch(() => []),
  ]);

  if (!job) {
    notFound();
  }

  // Re-fetch similar jobs with the correct category
  let relatedJobs = similarJobs;
  if (job.subcategory?.category?.id && similarJobs.length === 0) {
    relatedJobs = await getSimilarJobs(job.id, job.subcategory.category.id, 5).catch(() => []);
  }

  // ── JSON-LD Schemas ──
  const jobSchema = generateJobSchema({
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    deadline: job.deadline,
    organizationName: job.organization?.orgName,
    organizationWebsite: job.organization?.orgWebsite,
    locationCity: job.locationCity,
    locationCounty: job.locationCounty,
    isRemote: job.isRemote,
    employmentType: job.employmentType,
    experienceLevel: job.experienceLevel,
    educationLevel: job.educationLevel,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    salaryCurrency: job.salaryCurrency,
    slug: job.slug,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Browse Jobs', href: 'https://jobr.co.ke/jobs' },
    ...(job.subcategory?.category
      ? [{ name: job.subcategory.category.label, href: `https://jobr.co.ke/jobs/category/${job.subcategory.category.slug}` }]
      : []),
    { name: job.title },
  ]);

  // ── Breadcrumb items ──
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Browse Jobs', href: '/jobs' },
    ...(job.subcategory?.category
      ? [{ label: job.subcategory.category.label, href: `/jobs/category/${job.subcategory.category.slug}` }]
      : []),
    { label: job.title },
  ];

  return (
    <>
      {/* JSON-LD: JobPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <BreadcrumbNav items={breadcrumbItems} />
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Job content (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            <JobDetailContent job={job} />

            {/* Similar Jobs */}
            <SimilarJobs
              jobs={relatedJobs}
              categoryLabel={job.subcategory?.category?.label}
              categorySlug={job.subcategory?.category?.slug}
            />
          </div>

          {/* Right: Sidebar (1/3) */}
          <div className="space-y-6 lg:col-span-1">
            <JobDetailSidebar job={job} />
            <GoogleAdPlaceholder />
          </div>
        </div>
      </div>
    </>
  );
}