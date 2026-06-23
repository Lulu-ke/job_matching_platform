import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { OrganizationType, OrganizationIndustry } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type') as OrganizationType | null;
    const industry = searchParams.get('industry') as OrganizationIndustry | null;
    const search = searchParams.get('search') ?? undefined;
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));

    const where: Record<string, unknown> = {
      isActive: true,
      deletedAt: null,
    };

    if (type && Object.values(OrganizationType).includes(type)) {
      where.orgType = type;
    }

    if (industry && Object.values(OrganizationIndustry).includes(industry)) {
      where.orgIndustry = industry;
    }

    if (search) {
      where.OR = [
        { orgName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const organizations = await db.organization.findMany({
      where,
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

    return NextResponse.json(
      organizations.map((org) => ({
        id: org.id,
        orgName: org.orgName,
        orgSlug: org.orgSlug,
        orgLogoUrl: org.orgLogoUrl,
        orgIndustry: org.orgIndustry,
        orgType: org.orgType,
        headquarters: org.headquarters,
        isVerified: org.isVerified,
        jobCount: org._count.jobs,
      }))
    );
  } catch (error) {
    console.error('Organizations API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    );
  }
}
