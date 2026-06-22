import { NextResponse } from 'next/server';
import { searchOpportunities } from '@/lib/data/opportunities';
import { OpportunityType } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') || undefined;
    const type = searchParams.get('type') as OpportunityType | null;
    const county = searchParams.get('county') || undefined;
    const sort = searchParams.get('sort');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));

    const result = await searchOpportunities({
      query,
      type: type && Object.values(OpportunityType).includes(type)
        ? type
        : undefined,
      county,
      sort: sort && ['newest', 'deadline-soon', 'deadline-later'].includes(sort)
        ? sort as 'newest' | 'deadline-soon' | 'deadline-later'
        : 'newest',
      page,
      limit,
    });

    return NextResponse.json({
      data: result.data,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error('Opportunities API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}