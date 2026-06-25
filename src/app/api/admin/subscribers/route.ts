import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''

    const where: Record<string, unknown> = {}
    if (search) where.email = { contains: search }

    const [subs, total] = await Promise.all([
      db.newsletterSubscription.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.newsletterSubscription.count({ where }),
    ])

    return NextResponse.json({ subscribers: subs.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin subs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    await db.newsletterSubscription.updateMany({ where: { email }, data: { isActive: false } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin subs DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
