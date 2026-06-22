import type { Metadata } from 'next';
import Link from 'next/link';
import { ExperienceLevel } from '@prisma/client';
import { getJobCount } from '@/lib/data/jobs';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/utils/seo';
import { getExperienceLevelLabel, ExperienceLevelColors } from '@/lib/enums';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Jobs by Experience Level',
  description: 'Browse Kenyan jobs by experience level: entry level, junior, mid-level, senior, and executive positions on JOBR.',
  alternates: { canonical: '/jobs/level' },
  openGraph: {
    title: 'Jobs by Experience Level | JOBR Kenya',
    description: 'Browse Kenyan jobs by experience level: entry level, junior, mid-level, senior, and executive positions.',
    siteName: 'JOBR Kenya',
  },
};

// ============================================================
// PAGE
// ============================================================

export default async function ExperienceLevelIndexPage() {
  const levels = Object.values(ExperienceLevel) as string[];

  // Fetch job counts for each level in parallel
  const levelCounts = await Promise.all(
    levels.map(async (level) => {
      const count = await getJobCount({ experienceLevel: level as ExperienceLevel }).catch(() => 0);
      return { level, count };
    })
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Jobs', href: 'https://jobr.co.ke/jobs' },
    { name: 'By Experience Level', href: 'https://jobr.co.ke/jobs/level' },
  ]);

  const itemListSchema = generateItemListSchema(
    'Experience Levels',
    'https://jobr.co.ke/jobs/level',
    levelCounts
      .filter(l => l.count > 0)
      .map((l, i) => ({
        position: i + 1,
        name: getExperienceLevelLabel(l.level as ExperienceLevel),
        url: `https://jobr.co.ke/jobs/level/${l.level.toLowerCase().replace(/_/g, '-')}`,
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
          { label: 'By Experience Level' },
        ]} />

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            Jobs by Experience Level
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Find Kenyan jobs that match your career stage. Whether you are a fresh graduate looking for your first role, a mid-career professional seeking advancement, or an experienced leader pursuing executive opportunities, JOBR organizes openings by experience level so you can find the right fit quickly. Select your experience level below to view current listings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {levelCounts.map(({ level, count }) => {
            const slug = level.toLowerCase().replace(/_/g, '-');
            const label = getExperienceLevelLabel(level as ExperienceLevel);
            const color = ExperienceLevelColors[level as ExperienceLevel] || 'bg-gray-100 text-gray-700';

            return (
              <Link
                key={level}
                href={`/jobs/level/${slug}`}
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