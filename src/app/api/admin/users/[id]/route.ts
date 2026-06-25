import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    const user = await db.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true, isActive: true, phone: true, location: true, createdAt: true, updatedAt: true } })
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ...user, createdAt: user.createdAt.toISOString(), updatedAt: user.updatedAt.toISOString() })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin user GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    const body = await req.json()
    const user = await db.user.update({ where: { id }, data: body })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin user PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    await db.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin user DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
