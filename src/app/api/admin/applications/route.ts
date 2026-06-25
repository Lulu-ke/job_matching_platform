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

    const where: Record<string, unknown> = {}
    if (status && status !== 'ALL') where.status = status

    const [apps, total] = await Promise.all([
      db.jobApplication.findMany({ where, include: { user: { select: { name: true, email: true } }, job: { select: { title: true } } }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.jobApplication.count({ where }),
    ])

    return NextResponse.json({ applications: apps.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin apps GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
