import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getAllCategories, getPopularCategories } from '@/lib/data/categories';
import { getJobsByCategory } from '@/lib/data/jobs';
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
// STATIC PARAMS (ISR)
// ============================================================

export async function generateStaticParams() {
  try {
    const cats = await getAllCategories();
    return cats.map((c) => ({ slug: c.slug }));
  } catch {
    // DB not available — generate none (SSR fallback)
    return [];
  }
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug).catch(() => null);

  if (!cat) return { title: 'Category Not Found | JOBR Kenya' };

  // Strategy 5: NoIndex empty pages without SEO description
  const isEmpty = cat._count.jobs === 0 && !cat.seoDescription && !cat.description;

  const title = `${cat.label} Jobs in Kenya`;
  // Strategy 1: Use seoDescription as content buffer when available
  const description = cat.seoDescription
    || `Browse ${cat._count.jobs}+ ${cat.label.toLowerCase()} job vacancies across Kenya. Find verified positions, apply directly, and advance your career with JOBR.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/category/${slug}` },
    openGraph: { title, description, siteName: 'JOBR Kenya' },
    twitter: { card: 'summary_large_image', title, description },
    ...(isEmpty && { robots: { index: false, follow: true } }),
  };
}

// ============================================================
// ANTI-THIN-CONTENT: Category-specific SEO text
// ============================================================

function getCategorySEOText(label: string, slug: string, jobCount: number): string {
  const lower = label.toLowerCase();
  return `Explore the latest ${lower} job opportunities across Kenya. JOBR lists ${jobCount}+ verified ${lower} positions from trusted employers including government agencies, NGOs, multinational corporations, and growing startups. Whether you are an experienced professional or just starting your career in ${lower}, you will find relevant openings here. Each listing includes detailed requirements, salary information where available, and direct application links. Use the filters to narrow results by location, experience level, and employment type.`;
}

// ============================================================
// PAGE
// ============================================================

export default async function CategoryHubPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);

  const [cat, relatedCats] = await Promise.all([
    getCategoryBySlug(slug),
    getAllCategories().catch(() => []),
  ]);

  if (!cat) notFound();

  const jobsResult = await getJobsByCategory(slug, page, 20);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'Categories', href: 'https://jobr.co.ke/jobs/category' },
    { name: cat.label, href: `https://jobr.co.ke/jobs/category/${slug}` },
  ]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Categories', href: '/jobs/category' },
    { label: cat.label },
  ];

  // Related categories (exclude current, limit 12)
  const related = relatedCats.filter((c) => c.slug !== slug).slice(0, 12);

  const collectionSchema = generateCollectionPageSchema({
    name: `${cat.label} Jobs in Kenya`,
    description: cat.seoDescription || `Browse verified ${cat.label.toLowerCase()} job vacancies across Kenya.`,
    url: `https://jobr.co.ke/jobs/category/${slug}`,
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
            {cat.label} Jobs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-emerald-600">{jobsResult.total}</span>{' '}
            {cat.label.toLowerCase()} job vacancies in Kenya
          </p>
        </div>

        {/* Subcategories */}
        {cat.subcategories && cat.subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
              Subcategories
            </h2>
            <div className="flex flex-wrap gap-2">
              {cat.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/jobs/category/${slug}?subcategory=${sub.slug}`}
                  className="rounded-full border border-gray-200 bg-white/70 px-4 py-1.5 text-sm text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50"
                >
                  {sub.label}
                  {sub._count.jobs > 0 && (
                    <span className="ml-1 text-xs text-gray-400">({sub._count.jobs})</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content Block */}
        <div className="mb-8 rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-gray-600">
            {getCategorySEOText(cat.label, slug, cat._count.jobs)}
          </p>
        </div>

        {/* Job Listings */}
        <HubPageContent
          jobs={jobsResult.data}
          total={jobsResult.total}
          page={jobsResult.page}
          totalPages={jobsResult.totalPages}
          baseHref={`/jobs/category/${slug}`}
          alertQuery={cat.label}
        />

        {/* Related Categories */}
        {related.length > 0 && (
          <div className="mt-10 border-t border-gray-200/50 pt-8">
            <SectionHeading
              title="Browse Other Categories"
              subtitle="Explore opportunities in related fields"
              viewAllHref="/jobs/category"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {related.map((c) => (
                <Link
                  key={c.id}
                  href={`/jobs/category/${c.slug}`}
                  className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  {c.label}
                  <span className="ml-1 text-xs text-gray-400">({c._count.jobs})</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}