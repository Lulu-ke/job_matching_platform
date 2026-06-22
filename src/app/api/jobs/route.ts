import { NextResponse } from 'next/server';
import { searchJobs, type JobSearchParams, type SortOption } from '@/lib/data/jobs';
import { EmploymentType, ExperienceLevel } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') ?? undefined;
    const employmentType = searchParams.get('employmentType') as EmploymentType | null;
    const experienceLevel = searchParams.get('experienceLevel') as ExperienceLevel | null;
    const county = searchParams.get('county') ?? undefined;
    const categoryId = searchParams.get('categoryId') ?? undefined;
    const remoteParam = searchParams.get('remote');
    const sort = searchParams.get('sort') as SortOption | null;
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));

    const params: JobSearchParams = {
      query,
      employmentType: employmentType && Object.values(EmploymentType).includes(employmentType)
        ? employmentType
        : undefined,
      experienceLevel: experienceLevel && Object.values(ExperienceLevel).includes(experienceLevel)
        ? experienceLevel
        : undefined,
      locationCounty: county,
      categoryId,
      isRemote: remoteParam !== null ? remoteParam === 'true' : undefined,
      sort: sort && ['newest', 'deadline-soon', 'deadline-later'].includes(sort)
        ? sort
        : 'newest',
      page,
      limit,
    };

    const result = await searchJobs(params);

    return NextResponse.json({
      data: result.data,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Jobs API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', detail: msg, stack: error instanceof Error ? error.stack?.slice(0, 500) : undefined },
      { status: 500 }
    );
  }
}
