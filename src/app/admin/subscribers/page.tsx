import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import SubscribersClient from './SubscribersClient'

export default async function SubscribersPage() {
  await requireRole('ADMIN')

  const subscribers = await db.newsletterSubscription.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const data = subscribers.map((s) => ({
    id: s.id, email: s.email, frequency: s.frequency, source: s.source,
    isActive: s.isActive, createdAt: s.createdAt.toISOString(),
  }))

  return <SubscribersClient subscribers={data} />
}
