import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import AdminJobsClient from './AdminJobsClient'

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>
}) {
  await requireRole('ADMIN')
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const limit = 20
  const where: Record<string, unknown> = { deletedAt: null }
  if (params.status && params.status !== 'ALL') where.status = params.status

  const [jobs, total] = await Promise.all([
    db.job.findMany({
      where,
      include: {
        _count: { select: { applications: true } },
        organization: { select: { orgName: true } },
        postedBy: { select: { name: true, email: true } },
      },
      orderBy: { datePosted: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ])

  const data = {
    jobs: jobs.map((j) => ({
      id: j.id, title: j.title, status: j.status, employmentType: j.employmentType,
      datePosted: j.datePosted.toISOString(), appCount: j._count.applications,
      orgName: j.organization?.orgName || null,
      postedBy: j.postedBy?.name || j.postedBy?.email || null,
    })),
    total, page, totalPages: Math.ceil(total / limit),
  }

  return <AdminJobsClient data={data} />
}
