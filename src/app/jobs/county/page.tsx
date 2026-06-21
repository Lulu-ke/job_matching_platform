import type { Metadata } from 'next';
import Link from 'next/link';
import { KENYA_COUNTIES, UNIQUE_COUNTIES } from '@/lib/data/counties';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/lib/utils/seo';

export const metadata: Metadata = {
  title: 'Jobs by County',
  description: 'Browse job vacancies across all 47 Kenyan counties. Find verified positions in Nairobi, Mombasa, Kisumu, Nakuru, and every county in Kenya.',
  alternates: { canonical: '/jobs/county' },
  openGraph: {
    title: 'Jobs by County',
    description: 'Browse job vacancies across all 47 Kenyan counties. Find verified positions in Nairobi, Mombasa, Kisumu, Nakuru, and every county in Kenya.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs by County',
    description: 'Browse job vacancies across all 47 Kenyan counties. Find verified positions in Nairobi, Mombasa, Kisumu, Nakuru, and every county in Kenya.',
  },
};

export default function CountyIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'By County', href: 'https://jobr.co.ke/jobs/county' },
  ]);

  const itemListSchema = generateItemListSchema(
    'Jobs by County in Kenya',
    'https://jobr.co.ke/jobs/county',
    UNIQUE_COUNTIES.map((c, i) => ({
      name: `${c.name} County`,
      url: `https://jobr.co.ke/jobs/county/${c.slug}`,
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
        <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Jobs', href: '/jobs' }, { label: 'By County' }]} />

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            Jobs by County
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse job vacancies across all {UNIQUE_COUNTIES.length} Kenyan counties
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {UNIQUE_COUNTIES.map((county) => (
            <Link
              key={county.slug}
              href={`/jobs/county/${county.slug}`}
              className="group rounded-xl border border-white/60 bg-white/70 p-4 text-center backdrop-blur-sm transition hover:border-emerald-400 hover:bg-emerald-50/30"
            >
              <h2 className="text-sm font-bold text-gray-800 transition group-hover:text-emerald-600">
                {county.name}
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">Capital: {county.capital}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}