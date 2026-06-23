import { db } from '@/lib/db';
import { JobStatus, ExperienceLevel } from '@prisma/client';
import type { JobWithOrg, PaginatedResult, SortOption } from './jobs';

// ============================================================
// JOBS BY EXPERIENCE LEVEL
// ============================================================

export async function getJobsByExperienceLevel(
  level: ExperienceLevel,
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResult<JobWithOrg>> {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    db.job.findMany({
      where: { experienceLevel: level, status: JobStatus.ACTIVE, deletedAt: null },
      include: {
        organization: { select: { id: true, orgName: true, orgSlug: true, orgLogoUrl: true, orgType: true, orgIndustry: true } },
        category: { select: { id: true, label: true, slug: true } },
      },
      orderBy: { datePosted: 'desc' },
      skip,
      take: limit,
    }),
    db.job.count({
      where: { experienceLevel: level, status: JobStatus.ACTIVE, deletedAt: null },
    }),
  ]);

  return {
    data: data.map(mapJobWithOrg),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getJobCountByExperienceLevel(level: ExperienceLevel): Promise<number> {
  return db.job.count({
    where: { experienceLevel: level, status: JobStatus.ACTIVE, deletedAt: null },
  });
}

// ============================================================
// JOBS BY REMOTE
// ============================================================

export async function getRemoteJobs(page: number = 1, limit: number = 20): Promise<PaginatedResult<JobWithOrg>> {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    db.job.findMany({
      where: { isRemote: true, status: JobStatus.ACTIVE, deletedAt: null },
      include: {
        organization: { select: { id: true, orgName: true, orgSlug: true, orgLogoUrl: true, orgType: true, orgIndustry: true } },
        category: { select: { id: true, label: true, slug: true } },
      },
      orderBy: { datePosted: 'desc' },
      skip,
      take: limit,
    }),
    db.job.count({
      where: { isRemote: true, status: JobStatus.ACTIVE, deletedAt: null },
    }),
  ]);

  return {
    data: data.map(mapJobWithOrg),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

// ============================================================
// HELPER (same as in jobs.ts)
// ============================================================

function mapJobWithOrg(job: any): JobWithOrg {
  return {
    id: job.id,
    title: job.title,
    slug: job.slug,
    organizationId: job.organizationId,
    locationCity: job.locationCity,
    locationCounty: job.locationCounty,
    employmentType: job.employmentType,
    experienceLevel: job.experienceLevel,
    educationLevel: job.educationLevel,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    salaryDisclosure: job.salaryDisclosure,
    salaryCurrency: job.salaryCurrency,
    datePosted: job.datePosted,
    deadline: job.deadline,
    isRemote: job.isRemote,
    isFeatured: job.isFeatured,
    organization: job.organization,
    category: job.category,
  };
}