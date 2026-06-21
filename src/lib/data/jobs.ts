import { db } from '@/lib/db';
import { Prisma, JobStatus, EmploymentType, OrganizationType, OrganizationIndustry, ExperienceLevel, EducationLevel, SalaryDisclosure, JobSource } from '@prisma/client';

// ============================================================
// TYPES
// ============================================================

export interface JobWithOrg {
  id: string;
  title: string;
  slug: string;
  organizationId?: string | null;
  locationCity?: string | null;
  locationCounty?: string | null;
  employmentType?: EmploymentType | null;
  experienceLevel?: ExperienceLevel | null;
  educationLevel?: EducationLevel | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryDisclosure?: SalaryDisclosure | null;
  salaryCurrency: string;
  datePosted: Date;
  deadline?: Date | null;
  isRemote: boolean;
  isFeatured: boolean;
  organization?: {
    id: string;
    orgName: string;
    orgSlug: string;
    orgLogoUrl?: string | null;
    orgType: OrganizationType;
    orgIndustry: OrganizationIndustry;
    orgWebsite?: string | null;
    headquarters?: string | null;
    orgDescription?: string | null;
  } | null;
  category?: {
    id: string;
    label: string;
    slug: string;
  } | null;
}

export interface JobDetail extends JobWithOrg {
  description: string;
  howToApply?: string | null;
  applyEmail?: string | null;
  applicationUrl?: string | null;
  sourceUrl?: string | null;
  sourcePlatform?: string | null;
  jobSource?: JobSource;
  subcategory: {
    id: string;
    label: string;
    slug: string;
    category: {
      id: string;
      label: string;
      slug: string;
    };
  };
}

export type SortOption = 'newest' | 'deadline-soon' | 'deadline-later';

export interface JobSearchParams {
  query?: string;
  employmentType?: EmploymentType;
  locationCounty?: string;
  categoryId?: string;
  experienceLevel?: string;
  isRemote?: boolean;
  hasSalary?: boolean;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================
// COMMON INCLUDES
// ============================================================

const jobListInclude = {
  organization: {
    select: {
      id: true,
      orgName: true,
      orgSlug: true,
      orgLogoUrl: true,
      orgType: true,
      orgIndustry: true,
    },
  },
  category: {
    select: {
      id: true,
      label: true,
      slug: true,
    },
  },
} as const;

const jobDetailInclude = {
  organization: {
    select: {
      id: true,
      orgName: true,
      orgSlug: true,
      orgLogoUrl: true,
      orgType: true,
      orgIndustry: true,
      orgWebsite: true,
      orgDescription: true,
      headquarters: true,
    },
  },
  category: {
    select: {
      id: true,
      label: true,
      slug: true,
    },
  },
  subcategory: {
    select: {
      id: true,
      label: true,
      slug: true,
      category: {
        select: {
          id: true,
          label: true,
          slug: true,
        },
      },
    },
  },
} as const;

const activeJobWhere = {
  status: JobStatus.ACTIVE,
  deletedAt: null,
};

// ============================================================
// DATA ACCESS FUNCTIONS
// ============================================================

export async function getFeaturedJobs(limit: number = 6): Promise<JobWithOrg[]> {
  const jobs = await db.job.findMany({
    where: { ...activeJobWhere, featured: true },
    include: jobListInclude,
    orderBy: { datePosted: 'desc' },
    take: limit,
  });
  return jobs.map(mapJobWithOrg);
}

// ============================================================
// COUNT HELPERS (for NoIndex Strategy)
// ============================================================

export async function getJobCount(where: Prisma.JobWhereInput): Promise<number> {
  return db.job.count({ where: { ...activeJobWhere, ...where } });
}

export async function getRecentJobs(limit: number = 10): Promise<JobWithOrg[]> {
  const jobs = await db.job.findMany({
    where: activeJobWhere,
    include: jobListInclude,
    orderBy: { datePosted: 'desc' },
    take: limit,
  });
  return jobs.map(mapJobWithOrg);
}

export async function getJobsByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<JobWithOrg>> {
  const where = {
    ...activeJobWhere,
    category: { slug: categorySlug },
  };

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ]);

  return {
    data: data.map(mapJobWithOrg),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getJobsByCounty(
  county: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<JobWithOrg>> {
  const where = {
    ...activeJobWhere,
    locationCounty: { equals: county, mode: 'insensitive' as const },
  };

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ]);

  return {
    data: data.map(mapJobWithOrg),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getJobsByType(
  type: EmploymentType,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<JobWithOrg>> {
  const where = {
    ...activeJobWhere,
    employmentType: type,
  };

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ]);

  return {
    data: data.map(mapJobWithOrg),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getClosingSoonJobs(limit: number = 6): Promise<JobWithOrg[]> {
  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const jobs = await db.job.findMany({
    where: {
      ...activeJobWhere,
      deadline: {
        gte: now,
        lte: sevenDaysLater,
      },
    },
    include: jobListInclude,
    orderBy: { deadline: 'asc' },
    take: limit,
  });
  return jobs.map(mapJobWithOrg);
}

export async function getJobBySlug(slug: string): Promise<JobDetail | null> {
  const job = await db.job.findUnique({
    where: { slug },
    include: jobDetailInclude,
  });

  if (!job || job.status !== 'ACTIVE' || job.deletedAt) return null;
  return mapJobDetail(job);
}

export async function getSimilarJobs(
  jobId: string,
  categoryId?: string | null,
  limit: number = 5
): Promise<JobWithOrg[]> {
  const where: Prisma.JobWhereInput = {
    ...activeJobWhere,
    id: { not: jobId },
  };

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const jobs = await db.job.findMany({
    where,
    include: jobListInclude,
    orderBy: { datePosted: 'desc' },
    take: limit,
  });
  return jobs.map(mapJobWithOrg);
}

export async function searchJobs(
  params: JobSearchParams
): Promise<PaginatedResult<JobWithOrg>> {
  const {
    query,
    employmentType,
    locationCounty,
    categoryId,
    experienceLevel,
    isRemote,
    hasSalary,
    sort = 'newest',
    page = 1,
    limit = 20,
  } = params;

  const where: Prisma.JobWhereInput = { ...activeJobWhere };

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { searchText: { contains: query, mode: 'insensitive' } },
      { organization: { orgName: { contains: query, mode: 'insensitive' } } },
    ];
  }

  if (employmentType) {
    where.employmentType = employmentType;
  }

  if (locationCounty) {
    where.locationCounty = { contains: locationCounty, mode: 'insensitive' };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (experienceLevel) {
    where.experienceLevel = experienceLevel as ExperienceLevel;
  }

  if (isRemote !== undefined) {
    where.isRemote = isRemote;
  }

  if (hasSalary) {
    where.salaryMin = { not: null };
  }

  // Determine sort order
  let orderBy: Prisma.JobOrderByWithRelationInput;
  switch (sort) {
    case 'deadline-soon':
      orderBy = { deadline: 'asc' };
      break;
    case 'deadline-later':
      orderBy = { deadline: 'desc' };
      break;
    case 'newest':
    default:
      orderBy = { datePosted: 'desc' };
  }

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
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
// ORGANIZATION JOBS (by orgId)
// ============================================================

export async function getJobsByOrganization(
  orgId: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<JobWithOrg>> {
  const where = {
    ...activeJobWhere,
    organizationId: orgId,
  };

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
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
// CATEGORY × COUNTY COMBINATION (programmatic SEO)
// ============================================================

export async function getJobsByCategoryAndCounty(
  categorySlug: string,
  countyName: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<JobWithOrg>> {
  const where = {
    ...activeJobWhere,
    category: { slug: categorySlug },
    locationCounty: { equals: countyName, mode: 'insensitive' as const },
  };

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
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
// CATEGORY × COUNTY COUNT (for NoIndex / sitemap decisions)
// ============================================================

export async function getJobCountByCategoryAndCounty(
  categorySlug: string,
  countyName: string
): Promise<number> {
  return db.job.count({
    where: {
      ...activeJobWhere,
      category: { slug: categorySlug },
      locationCounty: { equals: countyName, mode: 'insensitive' as const },
    },
  });
}

// ============================================================
// GOVERNMENT JOBS
// ============================================================

export async function getGovernmentJobs(
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<JobWithOrg>> {
  const where: Prisma.JobWhereInput = {
    ...activeJobWhere,
    organization: {
      orgType: {
        in: [OrganizationType.NATIONAL_GOVERNMENT, OrganizationType.COUNTY_GOVERNMENT],
      },
    },
  };

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ]);

  return {
    data: data.map(mapJobWithOrg),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getGovernmentJobsByType(
  orgType: OrganizationType.NATIONAL_GOVERNMENT | OrganizationType.COUNTY_GOVERNMENT,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<JobWithOrg>> {
  const where: Prisma.JobWhereInput = {
    ...activeJobWhere,
    organization: {
      orgType: orgType,
    },
  };

  const [data, total] = await Promise.all([
    db.job.findMany({
      where,
      include: jobListInclude,
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
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
// MAPPING HELPERS
// ============================================================

type RawJobListRow = Awaited<ReturnType<typeof db.job.findMany>>[number] & {
  organization?: { orgType: OrganizationType; orgIndustry: OrganizationIndustry } | null;
};

type RawJobDetailRow = NonNullable<Awaited<ReturnType<typeof getJobBySlugRaw>>>;

async function getJobBySlugRaw(slug: string) {
  return db.job.findUnique({
    where: { slug },
    include: jobDetailInclude,
  });
}

function mapJobWithOrg(job: RawJobListRow): JobWithOrg {
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
    isFeatured: job.featured,
    organization: job.organization
      ? {
          id: job.organization.id,
          orgName: job.organization.orgName,
          orgSlug: job.organization.orgSlug,
          orgLogoUrl: job.organization.orgLogoUrl,
          orgType: job.organization.orgType,
          orgIndustry: job.organization.orgIndustry,
          orgWebsite: (job.organization as any).orgWebsite ?? null,
          headquarters: (job.organization as any).headquarters ?? null,
          orgDescription: (job.organization as any).orgDescription ?? null,
        }
      : null,
    category: job.category
      ? {
          id: job.category.id,
          label: job.category.label,
          slug: job.category.slug,
        }
      : null,
  };
}

function mapJobDetail(job: RawJobDetailRow): JobDetail {
  const base = mapJobWithOrg(job as any) as Omit<JobDetail, 'description' | 'howToApply' | 'applyEmail' | 'applicationUrl' | 'sourceUrl' | 'sourcePlatform' | 'jobSource' | 'subcategory'>;
  return {
    ...base,
    description: job.description,
    howToApply: job.howToApply,
    applyEmail: job.applyEmail,
    applicationUrl: job.applicationUrl,
    sourceUrl: job.sourceUrl,
    sourcePlatform: job.sourcePlatform,
    jobSource: job.jobSource,
    subcategory: job.subcategory
      ? {
          id: job.subcategory.id,
          label: job.subcategory.label,
          slug: job.subcategory.slug,
          category: {
            id: job.subcategory.category.id,
            label: job.subcategory.category.label,
            slug: job.subcategory.category.slug,
          },
        }
      : job.subcategory as any,
  };
}