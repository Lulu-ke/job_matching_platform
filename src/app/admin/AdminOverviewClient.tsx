'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Briefcase, FileText, Mail, Bell, ArrowRight } from 'lucide-react'

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  SHORTLISTED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
  HIRED: 'bg-green-100 text-green-800',
}

const roleColors: Record<string, string> = {
  JOBSEEKER: 'bg-blue-100 text-blue-800',
  EMPLOYER: 'bg-emerald-100 text-emerald-800',
  ADMIN: 'bg-red-100 text-red-800',
}

export default function AdminOverviewClient({ data }: {
  data: {
    stats: { userCount: number; jobCount: number; appCount: number; unreadMsgs: number; subscriberCount: number }
    recentUsers: { id: string; name: string | null; email: string; role: string; createdAt: string }[]
    recentApplications: { id: string; applicantName: string; jobTitle: string; status: string; date: string }[]
  }
}) {
  const { stats } = data

  const statCards = [
    { label: 'Total Users', value: stats.userCount, icon: Users, color: 'text-blue-600' },
    { label: 'Total Jobs', value: stats.jobCount, icon: Briefcase, color: 'text-emerald-600' },
    { label: 'Applications', value: stats.appCount, icon: FileText, color: 'text-yellow-600' },
    { label: 'Unread Messages', value: stats.unreadMsgs, icon: Mail, color: 'text-red-600' },
    { label: 'Subscribers', value: stats.subscriberCount, icon: Bell, color: 'text-purple-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">System overview and management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{card.label}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold">{card.value.toLocaleString()}</div></CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Users</CardTitle>
            <Link href="/admin/users"><Button variant="ghost" size="sm">View All <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </CardHeader>
          <CardContent>
            {data.recentUsers.length === 0 ? (
              <p className="text-center text-gray-500 py-6">No users yet.</p>
            ) : (
              <div className="space-y-3">
                {data.recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium">{u.name || 'No name'}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={roleColors[u.role] || ''}>{u.role}</Badge>
                      <span className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Link href="/admin/applications"><Button variant="ghost" size="sm">View All <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </CardHeader>
          <CardContent>
            {data.recentApplications.length === 0 ? (
              <p className="text-center text-gray-500 py-6">No applications yet.</p>
            ) : (
              <div className="space-y-3">
                {data.recentApplications.map((a) => (
                  <div key={a.id} className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium">{a.applicantName}</p>
                      <p className="text-xs text-gray-500">{a.jobTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={statusColors[a.status] || ''}>{a.status}</Badge>
                      <span className="text-xs text-gray-400">{new Date(a.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
