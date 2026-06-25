import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [{ name: { contains: search } }, { email: { contains: search } }]
    }
    if (role && role !== 'ALL') where.role = role

    const [users, total] = await Promise.all([
      db.user.findMany({ where, select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.user.count({ where }),
    ])

    return NextResponse.json({ users: users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin users GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
