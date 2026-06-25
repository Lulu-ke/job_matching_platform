import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    const body = await req.json()
    await db.organization.update({ where: { id }, data: body })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin org PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    await db.organization.update({ where: { id }, data: { deletedAt: new Date() } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin org DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
