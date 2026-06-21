import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllOrganizationsForIndex } from '@/lib/data/organizations';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/utils/seo';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Top Employers & Organizations',
  description: 'Browse verified employers and organizations hiring in Kenya. Explore company profiles, view open positions, and find your next role at top Kenyan companies.',
  alternates: { canonical: '/organizations' },
  openGraph: {
    title: 'Top Employers & Organizations | JOBR Kenya',
    description: 'Browse verified employers and organizations hiring in Kenya.',
    siteName: 'JOBR Kenya',
  },
  twitter: { card: 'summary_large_image' },
};

// ============================================================
// PAGE
// ============================================================

export default async function OrganizationsIndexPage() {
  const organizations = await getAllOrganizationsForIndex().catch(() => []);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Organizations', href: 'https://jobr.co.ke/organizations' },
  ]);

  const itemListSchema = generateItemListSchema(
    'Organizations Hiring in Kenya',
    'https://jobr.co.ke/organizations',
    organizations.slice(0, 50).map((org, i) => ({
      position: i + 1,
      name: org.orgName,
      url: `https://jobr.co.ke/organizations/${org.orgSlug}`,
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
          { label: 'Organizations' },
        ]} />

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            Top Employers & Organizations
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">
            Explore verified employers actively hiring in Kenya. From government ministries and county offices to multinational corporations, NGOs, tech startups, and leading companies across every industry. Click on any organization to view their full profile, company details, and all current job openings. JOBR verifies every employer to ensure you apply to legitimate, active positions from trusted sources.
          </p>
        </div>

        {organizations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white/50 p-12 text-center">
            <p className="text-gray-500">No organizations listed yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <Link
                key={org.id}
                href={`/organizations/${org.orgSlug}`}
                className="group flex items-center gap-4 rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm transition hover:border-emerald-400 hover:shadow-md"
              >
                {org.orgLogoUrl ? (
                  <img
                    src={org.orgLogoUrl}
                    alt={org.orgName}
                    className="h-12 w-12 rounded-lg border border-gray-100 object-contain"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-lg font-bold text-emerald-600">
                    {org.orgName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-bold text-gray-800 group-hover:text-emerald-600">
                    {org.orgName}
                  </h2>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                    <span>{org.orgType.replace(/_/g, ' ')}</span>
                    {org.headquarters && <span>· {org.headquarters}</span>}
                  </div>
                  {org._count.jobs > 0 && (
                    <p className="mt-1 text-xs font-medium text-emerald-600">
                      {org._count.jobs} open {org._count.jobs === 1 ? 'position' : 'positions'}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}