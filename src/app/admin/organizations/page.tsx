import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import OrgsAdminClient from './OrgsAdminClient'

export default async function OrganizationsPage() {
  await requireRole('ADMIN')

  const orgs = await db.organization.findMany({
    where: { deletedAt: null },
    include: { _count: { select: { jobs: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const data = orgs.map((o) => ({
    id: o.id, orgName: o.orgName, orgIndustry: o.orgIndustry, orgType: o.orgType,
    isVerified: o.isVerified, jobCount: o._count.jobs, createdAt: o.createdAt.toISOString(),
  }))

  return <OrgsAdminClient organizations={data} />
}
