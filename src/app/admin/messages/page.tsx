import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import MessagesClient from './MessagesClient'

export default async function MessagesPage() {
  await requireRole('ADMIN')

  const messages = await db.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const data = messages.map((m) => ({
    id: m.id, name: m.name, email: m.email, subject: m.subject, message: m.message,
    isRead: m.isRead, date: m.createdAt.toISOString(),
  }))

  return <MessagesClient messages={data} />
}
