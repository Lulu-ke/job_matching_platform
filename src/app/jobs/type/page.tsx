import type { Metadata } from 'next';
import Link from 'next/link';
import { EmploymentType } from '@prisma/client';
import { getJobCount } from '@/lib/data/jobs';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/utils/seo';
import { getEmploymentTypeLabel, EmploymentTypeColors } from '@/lib/enums';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Jobs by Employment Type',
  description: 'Browse Kenyan jobs by employment type: full-time, part-time, contract, internship, freelance, and volunteer positions on JOBR.',
  alternates: { canonical: '/jobs/type' },
  openGraph: {
    title: 'Jobs by Employment Type | JOBR Kenya',
    description: 'Browse Kenyan jobs by employment type: full-time, part-time, contract, internship, freelance, and volunteer positions.',
    siteName: 'JOBR Kenya',
  },
};

// ============================================================
// PAGE
// ============================================================

export default async function EmploymentTypeIndexPage() {
  const types = Object.values(EmploymentType) as string[];

  // Fetch job counts for each type in parallel
  const typeCounts = await Promise.all(
    types.map(async (type) => {
      const count = await getJobCount({ employmentType: type as EmploymentType }).catch(() => 0);
      return { type, count };
    })
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'By Employment Type', href: 'https://jobr.co.ke/jobs/type' },
  ]);

  const itemListSchema = generateItemListSchema(
    'Employment Types',
    'https://jobr.co.ke/jobs/type',
    typeCounts
      .filter(t => t.count > 0)
      .map((t, i) => ({
        position: i + 1,
        name: getEmploymentTypeLabel(t.type as EmploymentType),
        url: `https://jobr.co.ke/jobs/type/${t.type.toLowerCase().replace(/_/g, '-')}`,
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
        <BreadcrumbNav items={[
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '/jobs' },
          { label: 'By Employment Type' },
        ]} />

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            Jobs by Employment Type
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Find Kenyan jobs organized by how you want to work. Whether you are looking for a stable full-time role, flexible part-time work, a short-term contract, or an internship to launch your career, JOBR has you covered. Click on any employment type below to browse current openings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {typeCounts.map(({ type, count }) => {
            const slug = type.toLowerCase().replace(/_/g, '-');
            const label = getEmploymentTypeLabel(type as EmploymentType);
            const color = EmploymentTypeColors[type as EmploymentType] || 'bg-gray-100 text-gray-700';

            return (
              <Link
                key={type}
                href={`/jobs/type/${slug}`}
                className="group flex items-center justify-between rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm transition hover:border-emerald-400 hover:shadow-md"
              >
                <div>
                  <h2 className="text-base font-bold text-gray-800 group-hover:text-emerald-600">
                    {label} Jobs
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {count} {count === 1 ? 'position' : 'positions'} available
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}