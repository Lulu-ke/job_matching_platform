import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || ''

    const where: Record<string, unknown> = { deletedAt: null }
    if (status && status !== 'ALL') where.status = status

    const [jobs, total] = await Promise.all([
      db.job.findMany({ where, include: { _count: { select: { applications: true } }, organization: { select: { orgName: true } } }, orderBy: { datePosted: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.job.count({ where }),
    ])

    return NextResponse.json({ jobs: jobs.map((j) => ({ ...j, datePosted: j.datePosted.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin jobs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
