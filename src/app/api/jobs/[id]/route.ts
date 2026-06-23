import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { JobStatus } from '@prisma/client';

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const job = await db.job.findUnique({
      where: { id },
      include: jobDetailInclude,
    });

    if (!job || job.status !== JobStatus.ACTIVE || job.deletedAt) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Job detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}
