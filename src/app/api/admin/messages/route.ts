import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET() {
  try {
    await requireRole('ADMIN')
    const msgs = await db.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(msgs.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })))
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin msgs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
