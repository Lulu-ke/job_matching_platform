import { db } from '@/lib/db';
import { OrganizationType } from '@prisma/client';

// ============================================================
// TYPES
// ============================================================

export interface OrganizationListItem {
  id: string;
  orgName: string;
  orgSlug: string;
  orgLogoUrl?: string | null;
  orgIndustry: string;
  orgType: OrganizationType;
  headquarters?: string | null;
  isVerified: boolean;
  _count: {
    jobs: number;
  };
}

export interface OrganizationDetail extends OrganizationListItem {
  orgWebsite?: string | null;
  orgDescription?: string | null;
  socialLinks?: string | null;
}

// ============================================================
// DATA ACCESS FUNCTIONS
// ============================================================

export async function getOrganizationBySlug(slug: string): Promise<OrganizationDetail | null> {
  const org = await db.organization.findUnique({
    where: { orgSlug: slug, deletedAt: null },
    include: {
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
        },
      },
    },
  });

  if (!org) return null;

  return {
    id: org.id,
    orgName: org.orgName,
    orgSlug: org.orgSlug,
    orgLogoUrl: org.orgLogoUrl,
    orgIndustry: org.orgIndustry as unknown as string,
    orgType: org.orgType,
    headquarters: org.headquarters,
    isVerified: org.isVerified,
    _count: org._count,
    orgWebsite: org.orgWebsite,
    orgDescription: org.orgDescription,
    socialLinks: org.socialLinks,
  };
}

export async function getFeaturedOrganizations(limit: number = 8): Promise<OrganizationListItem[]> {
  const orgs = await db.organization.findMany({
    where: {
      isActive: true,
      isVerified: true,
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return orgs.map((org) => ({
    id: org.id,
    orgName: org.orgName,
    orgSlug: org.orgSlug,
    orgLogoUrl: org.orgLogoUrl,
    orgIndustry: org.orgIndustry as unknown as string,
    orgType: org.orgType,
    headquarters: org.headquarters,
    isVerified: org.isVerified,
    _count: org._count,
  }));
}

export async function getActiveOrganizationSlugs(): Promise<string[]> {
  const orgs = await db.organization.findMany({
    where: {
      isActive: true,
      deletedAt: null,
    },
    select: { orgSlug: true },
  });
  return orgs.map((o) => o.orgSlug);
}

export async function getSimilarOrganizations(
  industry: string,
  currentOrgId: string,
  limit: number = 5
): Promise<OrganizationListItem[]> {
  const orgs = await db.organization.findMany({
    where: {
      orgIndustry: industry as any,
      isActive: true,
      deletedAt: null,
      id: { not: currentOrgId },
    },
    include: {
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return orgs.map((org) => ({
    id: org.id,
    orgName: org.orgName,
    orgSlug: org.orgSlug,
    orgLogoUrl: org.orgLogoUrl,
    orgIndustry: org.orgIndustry as unknown as string,
    orgType: org.orgType,
    headquarters: org.headquarters,
    isVerified: org.isVerified,
    _count: org._count,
  }));
}

export async function getOrganizationsByType(
  type: OrganizationType,
  limit: number = 20
): Promise<OrganizationListItem[]> {
  const orgs = await db.organization.findMany({
    where: {
      orgType: type,
      isActive: true,
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          jobs: { where: { status: 'ACTIVE', deletedAt: null } },
        },
      },
    },
    orderBy: { orgName: 'asc' },
    take: limit,
  });

  return orgs.map((org) => ({
    id: org.id,
    orgName: org.orgName,
    orgSlug: org.orgSlug,
    orgLogoUrl: org.orgLogoUrl,
    orgIndustry: org.orgIndustry as unknown as string,
    orgType: org.orgType,
    headquarters: org.headquarters,
    isVerified: org.isVerified,
    _count: org._count,
  }));
}

// ============================================================
// ALL ORGANIZATIONS FOR INDEX PAGE (with search, filters, pagination)
// ============================================================

export interface OrganizationSearchParams {
  search?: string;
  orgType?: string;
  orgIndustry?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedOrganizations {
  data: OrganizationListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function searchOrganizations(params: OrganizationSearchParams): Promise<PaginatedOrganizations> {
  const { search, orgType, orgIndustry, page = 1, limit = 24 } = params;

  const where: any = { isActive: true, deletedAt: null };

  if (search) {
    where.orgName = { contains: search };
  }
  if (orgType) {
    where.orgType = orgType;
  }
  if (orgIndustry) {
    where.orgIndustry = orgIndustry;
  }

  const [data, total] = await Promise.all([
    db.organization.findMany({
      where,
      include: {
        _count: {
          select: {
            jobs: { where: { status: 'ACTIVE', deletedAt: null } },
          },
        },
      },
      orderBy: { orgName: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.organization.count({ where }),
  ]);

  return {
    data: data.map((org) => ({
      id: org.id,
      orgName: org.orgName,
      orgSlug: org.orgSlug,
      orgLogoUrl: org.orgLogoUrl,
      orgIndustry: org.orgIndustry as unknown as string,
      orgType: org.orgType,
      headquarters: org.headquarters,
      isVerified: org.isVerified,
      _count: org._count,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}