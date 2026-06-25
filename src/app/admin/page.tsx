import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import AdminOverviewClient from './AdminOverviewClient'

export default async function AdminPage() {
  await requireRole('ADMIN')

  const [userCount, jobCount, appCount, unreadMsgs, subscriberCount, recentUsers, recentApps] = await Promise.all([
    db.user.count(),
    db.job.count({ where: { deletedAt: null } }),
    db.jobApplication.count(),
    db.contactSubmission.count({ where: { isRead: false } }),
    db.newsletterSubscription.count({ where: { isActive: true } }),
    db.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
    db.jobApplication.findMany({
      orderBy: { createdAt: 'desc' }, take: 5,
      include: { user: { select: { name: true, email: true } }, job: { select: { title: true } } },
    }),
  ])

  const data = {
    stats: { userCount, jobCount, appCount, unreadMsgs, subscriberCount },
    recentUsers: recentUsers.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() })),
    recentApplications: recentApps.map((a) => ({
      id: a.id, applicantName: a.user.name || 'Unknown', jobTitle: a.job.title, status: a.status, date: a.createdAt.toISOString(),
    })),
  }

  return <AdminOverviewClient data={data} />
}
