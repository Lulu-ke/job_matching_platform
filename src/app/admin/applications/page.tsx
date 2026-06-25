import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import AdminAppsClient from './AdminAppsClient'

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>
}) {
  await requireRole('ADMIN')
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const limit = 20
  const where: Record<string, unknown> = {}
  if (params.status && params.status !== 'ALL') where.status = params.status

  const [apps, total] = await Promise.all([
    db.jobApplication.findMany({
      where,
      include: { user: { select: { name: true, email: true } }, job: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit, take: limit,
    }),
    db.jobApplication.count({ where }),
  ])

  const data = {
    applications: apps.map((a) => ({ id: a.id, applicantName: a.user.name, applicantEmail: a.user.email, jobTitle: a.job.title, status: a.status, date: a.createdAt.toISOString() })),
    total, page, totalPages: Math.ceil(total / limit),
  }

  return <AdminAppsClient data={data} />
}
