import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET() {
  try {
    await requireRole('ADMIN')
    const orgs = await db.organization.findMany({ where: { deletedAt: null }, include: { _count: { select: { jobs: true } } }, orderBy: { createdAt: 'desc' } })
    return NextResponse.json(orgs)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin orgs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
