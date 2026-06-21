import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { getAllCategories } from '@/lib/data/categories';
import { UNIQUE_COUNTIES } from '@/lib/data/counties';
import { EmploymentType, ExperienceLevel, JobStatus, OpportunityType } from '@prisma/client';

const SITE_URL = 'https://jobr.co.ke';

// ============================================================
// SITEMAP GENERATOR
// ============================================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ----- Fetch dynamic data in parallel -----
  const [jobSlugs, categories, opportunitySlugs, orgSlugs, categoryCountyCombos] = await Promise.all([
    getActiveJobSlugs(),
    getAllCategories().catch(() => []),
    getActiveOpportunitySlugs().catch(() => []),
    getActiveOrganizationSlugs().catch(() => []),
    getCategoryCountyCombos().catch(() => []),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  // ============================================================
  // 1. STATIC PAGES (priority 0.8–1.0)
  // ============================================================

  const staticPages: { url: string; priority: number; freq: string }[] = [
    { url: '/', priority: 1.0, freq: 'daily' },
    { url: '/jobs', priority: 0.9, freq: 'hourly' },
    { url: '/government', priority: 0.9, freq: 'daily' },
    { url: '/opportunities', priority: 0.8, freq: 'daily' },
    { url: '/resources', priority: 0.6, freq: 'weekly' },
    { url: '/about', priority: 0.3, freq: 'monthly' },
    { url: '/contact', priority: 0.3, freq: 'monthly' },
    { url: '/privacy', priority: 0.2, freq: 'yearly' },
    { url: '/terms', priority: 0.2, freq: 'yearly' },
    { url: '/faq', priority: 0.4, freq: 'monthly' },
    { url: '/upload-cv', priority: 0.5, freq: 'monthly' },
    { url: '/post-job', priority: 0.5, freq: 'monthly' },
    { url: '/subscribe', priority: 0.4, freq: 'monthly' },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.url}`,
      lastModified: now,
      changeFrequency: page.freq as any,
      priority: page.priority,
    });
  }

  // ============================================================
  // 2. INDIVIDUAL JOB PAGES (highest volume, priority 0.8)
  // ============================================================

  for (const job of jobSlugs) {
    entries.push({
      url: `${SITE_URL}/jobs/${job.slug}`,
      lastModified: job.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // ============================================================
  // 3. CATEGORY HUB PAGES (priority 0.7)
  // ============================================================

  entries.push({
    url: `${SITE_URL}/jobs/category`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  });

  for (const cat of categories) {
    entries.push({
      url: `${SITE_URL}/jobs/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // ============================================================
  // 4. COUNTY HUB PAGES (priority 0.7)
  // ============================================================

  entries.push({
    url: `${SITE_URL}/jobs/county`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  });

  for (const county of UNIQUE_COUNTIES) {
    entries.push({
      url: `${SITE_URL}/jobs/county/${county.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  // ============================================================
  // 5. TYPE & LEVEL INDEX PAGES (priority 0.6)
  // ============================================================

  entries.push({
    url: `${SITE_URL}/jobs/type`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  });

  entries.push({
    url: `${SITE_URL}/jobs/level`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  });

  entries.push({
    url: `${SITE_URL}/organizations`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  });

  // ============================================================
  // 6. EMPLOYMENT TYPE HUB PAGES (priority 0.6)
  // ===========================================================

  for (const type of Object.values(EmploymentType)) {
    const slug = type.toLowerCase().replace(/_/g, '-');
    entries.push({
      url: `${SITE_URL}/jobs/type/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  // ============================================================
  // 7. EXPERIENCE LEVEL HUB PAGES (priority 0.6)
  // ============================================================

  for (const level of Object.values(ExperienceLevel)) {
    const slug = level.toLowerCase().replace(/_/g, '-');
    entries.push({
      url: `${SITE_URL}/jobs/level/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  // ============================================================
  // 8. CATEGORY × COUNTY COMBINATION PAGES (priority 0.5)
  // ============================================================

  for (const combo of categoryCountyCombos) {
    entries.push({
      url: `${SITE_URL}/jobs/category/${combo.categorySlug}/${combo.countySlug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  }

  // ============================================================
  // 9. OPPORTUNITY DETAIL PAGES (priority 0.7)
  // ============================================================

  for (const opp of opportunitySlugs) {
    entries.push({
      url: `${SITE_URL}/opportunities/${opp.slug}`,
      lastModified: opp.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // ============================================================
  // 10. ORGANIZATION PROFILE PAGES (priority 0.7)
  // ============================================================

  for (const org of orgSlugs) {
    entries.push({
      url: `${SITE_URL}/organizations/${org.slug}`,
      lastModified: org.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // ============================================================
  // 11. RESOURCE ARTICLE PAGES (priority 0.5)
  // ============================================================

  const resourceSlugs = [
    'how-to-write-kenyan-cv',
    'salary-negotiation-tips',
    'government-job-application-guide',
    'interview-preparation-kenya',
    'cover-letter-tips-2026',
    'remote-work-kenya-guide',
  ];

  for (const slug of resourceSlugs) {
    entries.push({
      url: `${SITE_URL}/resources/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  return entries;
}

// ============================================================
// DATA HELPERS
// ============================================================

async function getActiveJobSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return db.job.findMany({
    where: { status: JobStatus.ACTIVE, deletedAt: null },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });
}

async function getActiveOpportunitySlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return db.opportunity.findMany({
    where: { status: 'ACTIVE' as any, deletedAt: null },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });
}

async function getCategoryCountyCombos(): Promise<{ categorySlug: string; countySlug: string }[]> {
  const combos = await db.job.findMany({
    where: { status: JobStatus.ACTIVE, deletedAt: null, categoryId: { not: null }, locationCounty: { not: null } },
    select: { category: { select: { slug: true } }, locationCounty: true },
    distinct: ['categoryId', 'locationCounty'],
  });

  return combos
    .filter(c => c.category && c.locationCounty)
    .map((c) => {
      const countyData = UNIQUE_COUNTIES.find(
        (co) => co.name.toLowerCase() === (c.locationCounty || '').toLowerCase()
      );
      return {
        categorySlug: c.category!.slug,
        countySlug: countyData?.slug || c.locationCounty!.toLowerCase().replace(/\s+/g, '-'),
      };
    });
}

async function getActiveOrganizationSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return db.organization.findMany({
    where: { isActive: true, deletedAt: null },
    select: { orgSlug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  }).then((orgs) => orgs.map((o) => ({ slug: o.orgSlug, updatedAt: o.updatedAt })));
}