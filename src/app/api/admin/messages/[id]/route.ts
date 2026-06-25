import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    const body = await req.json()
    await db.contactSubmission.update({ where: { id }, data: { isRead: body.isRead } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin msg PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    await db.contactSubmission.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin msg DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
