import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories } from '@/lib/data/categories';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/lib/utils/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Job Categories',
  description: 'Browse all 49 job categories and hundreds of subcategories. Find your next role in IT, healthcare, finance, engineering, education, and more across Kenya.',
  alternates: { canonical: '/jobs/category' },
  openGraph: {
    title: 'All Job Categories',
    description: 'Browse all 49 job categories and hundreds of subcategories. Find your next role in IT, healthcare, finance, engineering, education, and more across Kenya.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Job Categories',
    description: 'Browse all 49 job categories and hundreds of subcategories. Find your next role in IT, healthcare, finance, engineering, education, and more across Kenya.',
  },
};

export default async function CategoryIndexPage() {
  const categories = await getAllCategories().catch(() => []);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'All Categories', href: 'https://jobr.co.ke/jobs/category' },
  ]);

  const itemListSchema = generateItemListSchema(
    'All Job Categories in Kenya',
    'https://jobr.co.ke/jobs/category',
    categories.map((cat, i) => ({
      name: cat.label,
      url: `https://jobr.co.ke/jobs/category/${cat.slug}`,
      position: i + 1,
    }))
  );

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
        <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Jobs', href: '/jobs' }, { label: 'All Categories' }]} />

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            All Job Categories
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse {categories.length} categories and hundreds of specialisations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/jobs/category/${cat.slug}`}
              className="group rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm transition hover:border-emerald-400 hover:bg-emerald-50/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-800 transition group-hover:text-emerald-600">
                    {cat.icon && <span className="mr-2">{cat.icon}</span>}
                    {cat.label}
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    {cat.subcategories.length} subcategories
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-100/70 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  {cat._count.jobs}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}