import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import UsersClient from './UsersClient'

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; role?: string }>
}) {
  await requireRole('ADMIN')
  const params = await searchParams

  const page = parseInt(params.page || '1')
  const limit = 20
  const where: Record<string, unknown> = {}

  if (params.search) {
    where.OR = [
      { name: { contains: params.search } },
      { email: { contains: params.search } },
    ]
  }
  if (params.role && params.role !== 'ALL') {
    where.role = params.role
  }

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.user.count({ where }),
  ])

  const data = {
    users: users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() })),
    total, page, totalPages: Math.ceil(total / limit),
  }

  return <UsersClient data={data} />
}
