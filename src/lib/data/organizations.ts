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
// ALL ORGANIZATIONS FOR INDEX PAGE
// ============================================================

export async function getAllOrganizationsForIndex(): Promise<OrganizationListItem[]> {
  const orgs = await db.organization.findMany({
    where: {
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
    orderBy: { createdAt: 'desc' },
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