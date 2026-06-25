import * as fs from 'fs'
import * as path from 'path'

const base = '/home/z/my-project/src'

// ============================================================
// Admin Sidebar (client)
// ============================================================
const adminSidebar = `'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, Users, Briefcase, FileText, Building2, Mail, Bell, LogOut, Menu, X, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Props {
  user: { id: string; name?: string | null; email?: string | null; role?: string | null }
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
  { href: '/admin/organizations', label: 'Organizations', icon: Building2 },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Bell },
]

export default function AdminSidebar({ user }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={\`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto \${mobileOpen ? 'translate-x-0' : '-translate-x-full'}\`}>
        <div className="flex flex-col h-full">
          <div className="px-4 py-5 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <Shield className="h-7 w-7 text-emerald-400" />
              <span className="text-xl font-bold text-white">JOBR</span>
            </Link>
            <p className="text-xs text-red-400 mt-1 font-medium">Admin Panel</p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className={\`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors \${isActive ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}\`}>
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-800 px-3 py-4">
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-white truncate">{user.name || 'Admin'}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={async () => { await signOut({ callbackUrl: '/login' }) }}>
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
`

// ============================================================
// Admin layout
// ============================================================
const adminLayout = `import { requireRole } from '@/lib/auth-helper'
import HideSiteChrome from '@/components/HideSiteChrome'
import AdminSidebar from './AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireRole('ADMIN')

  return (
    <>
      <HideSiteChrome />
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar user={session.user} />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
`

// ============================================================
// Admin overview page
// ============================================================
const adminPage = `import { requireRole } from '@/lib/auth-helper'
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
`

const adminOverviewClient = `'use client'

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
              <card.icon className={\`h-5 w-5 \${card.color}\`} />
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
`

// ============================================================
// Admin Users page
// ============================================================
const usersPage = `import { requireRole } from '@/lib/auth-helper'
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
`

const usersClient = `'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, Search, ToggleLeft, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const roleColors: Record<string, string> = {
  JOBSEEKER: 'bg-blue-100 text-blue-800',
  EMPLOYER: 'bg-emerald-100 text-emerald-800',
  ADMIN: 'bg-red-100 text-red-800',
}

interface UserData {
  users: { id: string; name: string | null; email: string; role: string; isActive: boolean; createdAt: string }[]
  total: number; page: number; totalPages: number
}

export default function UsersClient({ data: initialData }: { data: UserData }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [role, setRole] = useState(searchParams.get('role') || 'ALL')
  const [data, setData] = useState(initialData)

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (role !== 'ALL') params.set('role', role)
    router.push(\`/admin/users?\${params.toString()}\`)
  }

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(\`/api/admin/users/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      })
      if (res.ok) {
        setData({ ...data, users: data.users.map((u) => u.id === id ? { ...u, isActive: !current } : u) })
        toast.success(\`User \${!current ? 'activated' : 'deactivated'}\`)
      }
    } catch { toast.error('Failed') }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return
    try {
      const res = await fetch(\`/api/admin/users/\${id}\`, { method: 'DELETE' })
      if (res.ok) {
        setData({ ...data, users: data.users.filter((u) => u.id !== id), total: data.total - 1 })
        toast.success('User deleted')
      }
    } catch { toast.error('Failed') }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">{data.total} total users</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()} className="pl-9" />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="JOBSEEKER">Jobseeker</SelectItem>
            <SelectItem value="EMPLOYER">Employer</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={applyFilters} className="bg-emerald-600 hover:bg-emerald-700">Filter</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {data.users.length === 0 ? (
            <div className="text-center py-12 text-gray-500"><Users className="h-12 w-12 mx-auto mb-3 text-gray-300" /><p>No users found.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Role</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden lg:table-cell">Joined</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((u) => (
                    <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-sm">{u.name || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{u.email}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className={roleColors[u.role]}>{u.role}</Badge></td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge variant={u.isActive ? 'default' : 'secondary'} className={u.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => toggleActive(u.id, u.isActive)} title="Toggle Active">
                            <ToggleLeft className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteUser(u.id)} title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={data.page <= 1} onClick={() => router.push(\`/admin/users?page=\${data.page - 1}\`)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">Page {data.page} of {data.totalPages}</span>
          <Button variant="outline" size="sm" disabled={data.page >= data.totalPages} onClick={() => router.push(\`/admin/users?page=\${data.page + 1}\`)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
`

// ============================================================
// Admin Jobs page
// ============================================================
const adminJobsPage = `import { requireRole } from '@/lib/auth-helper'
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
`

const adminJobsClient = `'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Briefcase, Pause, Play, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-800', DRAFT: 'bg-gray-100 text-gray-800',
  PAUSED: 'bg-yellow-100 text-yellow-800', EXPIRED: 'bg-red-100 text-red-800',
}

export default function AdminJobsClient({ data: initialData }: {
  data: {
    jobs: { id: string; title: string; status: string; employmentType: string | null; datePosted: string; appCount: number; orgName: string | null; postedBy: string | null }[]
    total: number; page: number; totalPages: number
  }
}) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [statusFilter, setStatusFilter] = useState('ALL')

  const applyFilter = () => {
    const params = new URLSearchParams()
    if (statusFilter !== 'ALL') params.set('status', statusFilter)
    router.push(\`/admin/jobs?\${params.toString()}\`)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(\`/api/admin/jobs/\${id}\`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) })
      if (res.ok) {
        setData({ ...data, jobs: data.jobs.map((j) => j.id === id ? { ...j, status: newStatus } : j) })
        toast.success('Status updated')
      }
    } catch { toast.error('Failed') }
  }

  const deleteJob = async (id: string) => {
    if (!confirm('Delete this job?')) return
    try {
      const res = await fetch(\`/api/admin/jobs/\${id}\`, { method: 'DELETE' })
      if (res.ok) { setData({ ...data, jobs: data.jobs.filter((j) => j.id !== id) }); toast.success('Job deleted') }
    } catch { toast.error('Failed') }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <p className="text-gray-500 mt-1">{data.total} total jobs</p>
      </div>
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {['ALL','ACTIVE','PAUSED','DRAFT','EXPIRED'].map((s) => (<SelectItem key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s}</SelectItem>))}
          </SelectContent>
        </Select>
        <Button onClick={applyFilter} className="bg-emerald-600 hover:bg-emerald-700">Filter</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {data.jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500"><Briefcase className="h-12 w-12 mx-auto mb-3 text-gray-300" /><p>No jobs found.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Organization</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Apps</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden lg:table-cell">Posted</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.jobs.map((j) => (
                    <tr key={j.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3"><p className="font-medium text-sm">{j.title}</p><p className="text-xs text-gray-500">{j.postedBy}</p></td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{j.orgName || '—'}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className={statusColors[j.status]}>{j.status}</Badge></td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">{j.appCount}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{new Date(j.datePosted).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => updateStatus(j.id, j.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE')} title="Toggle">
                            {j.status === 'ACTIVE' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteJob(j.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={data.page <= 1} onClick={() => router.push(\`/admin/jobs?page=\${data.page - 1}\`)}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm text-gray-500">Page {data.page} of {data.totalPages}</span>
          <Button variant="outline" size="sm" disabled={data.page >= data.totalPages} onClick={() => router.push(\`/admin/jobs?page=\${data.page + 1}\`)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      )}
    </div>
  )
}
`

// ============================================================
// Admin Applications page
// ============================================================
const adminAppsPage = `import { requireRole } from '@/lib/auth-helper'
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
`

const adminAppsClient = `'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800', REVIEWED: 'bg-blue-100 text-blue-800',
  SHORTLISTED: 'bg-emerald-100 text-emerald-800', REJECTED: 'bg-red-100 text-red-800',
  HIRED: 'bg-green-100 text-green-800',
}

export default function AdminAppsClient({ data: initialData }: {
  data: { applications: { id: string; applicantName: string | null; applicantEmail: string; jobTitle: string; status: string; date: string }[]; total: number; page: number; totalPages: number }
}) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [statusFilter, setStatusFilter] = useState('ALL')

  const applyFilter = () => {
    const params = new URLSearchParams()
    if (statusFilter !== 'ALL') params.set('status', statusFilter)
    router.push(\`/admin/applications?\${params.toString()}\`)
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(\`/api/admin/applications/\${id}\`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      if (res.ok) { setData({ ...data, applications: data.applications.map((a) => a.id === id ? { ...a, status } : a) }); toast.success('Updated') }
    } catch { toast.error('Failed') }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="text-gray-500 mt-1">{data.total} total applications</p>
      </div>
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>{['ALL','PENDING','REVIEWED','SHORTLISTED','REJECTED','HIRED'].map((s) => (<SelectItem key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s}</SelectItem>))}</SelectContent>
        </Select>
        <Button onClick={applyFilter} className="bg-emerald-600 hover:bg-emerald-700">Filter</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {data.applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500"><FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" /><p>No applications found.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Applicant</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Job</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {data.applications.map((a) => (
                    <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3"><p className="font-medium text-sm">{a.applicantName || 'Unknown'}</p><p className="text-xs text-gray-500">{a.applicantEmail}</p></td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{a.jobTitle}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className={statusColors[a.status]}>{a.status}</Badge></td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{new Date(a.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <Select value={a.status} onValueChange={(v) => updateStatus(a.id, v)}>
                          <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{['PENDING','REVIEWED','SHORTLISTED','REJECTED','HIRED'].map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={data.page <= 1} onClick={() => router.push(\`/admin/applications?page=\${data.page - 1}\`)}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm text-gray-500">Page {data.page} of {data.totalPages}</span>
          <Button variant="outline" size="sm" disabled={data.page >= data.totalPages} onClick={() => router.push(\`/admin/applications?page=\${data.page + 1}\`)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      )}
    </div>
  )
}
`

// ============================================================
// Admin Organizations page
// ============================================================
const orgsPage = `import { requireRole } from '@/lib/auth-helper'
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
`

const orgsAdminClient = `'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, ShieldCheck, ShieldX, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function OrgsAdminClient({ organizations: initialOrgs }: {
  organizations: { id: string; orgName: string; orgIndustry: string; orgType: string; isVerified: boolean; jobCount: number; createdAt: string }[]
}) {
  const [orgs, setOrgs] = useState(initialOrgs)

  const toggleVerified = async (id: string, current: boolean) => {
    try {
      const res = await fetch(\`/api/admin/organizations/\${id}\`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isVerified: !current }) })
      if (res.ok) { setOrgs(orgs.map((o) => o.id === id ? { ...o, isVerified: !current } : o)); toast.success('Updated') }
    } catch { toast.error('Failed') }
  }

  const deleteOrg = async (id: string) => {
    if (!confirm('Delete this organization?')) return
    try {
      const res = await fetch(\`/api/admin/organizations/\${id}\`, { method: 'DELETE' })
      if (res.ok) { setOrgs(orgs.filter((o) => o.id !== id)); toast.success('Deleted') }
    } catch { toast.error('Failed') }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
        <p className="text-gray-500 mt-1">{orgs.length} organizations</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {orgs.length === 0 ? (
            <div className="text-center py-12 text-gray-500"><Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" /><p>No organizations found.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Industry</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Type</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Jobs</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Verified</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orgs.map((o) => (
                    <tr key={o.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-sm">{o.orgName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{o.orgIndustry.replace(/_/g, ' ')}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{o.orgType.replace(/_/g, ' ')}</td>
                      <td className="px-4 py-3 text-sm">{o.jobCount}</td>
                      <td className="px-4 py-3">
                        <Badge variant={o.isVerified ? 'default' : 'secondary'} className={o.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}>
                          {o.isVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => toggleVerified(o.id, o.isVerified)} title="Toggle Verified">
                            {o.isVerified ? <ShieldX className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteOrg(o.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
`

// ============================================================
// Admin Messages page
// ============================================================
const messagesPage = `import { requireRole } from '@/lib/auth-helper'
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
`

const messagesClient = `'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Mail, Eye, Trash2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function MessagesClient({ messages: initialMsgs }: {
  messages: { id: string; name: string; email: string; subject: string; message: string; isRead: boolean; date: string }[]
}) {
  const [msgs, setMsgs] = useState(initialMsgs)

  const markRead = async (id: string) => {
    try {
      const res = await fetch(\`/api/admin/messages/\${id}\`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: true }) })
      if (res.ok) { setMsgs(msgs.map((m) => m.id === id ? { ...m, isRead: true } : m)); toast.success('Marked as read') }
    } catch { toast.error('Failed') }
  }

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      const res = await fetch(\`/api/admin/messages/\${id}\`, { method: 'DELETE' })
      if (res.ok) { setMsgs(msgs.filter((m) => m.id !== id)); toast.success('Deleted') }
    } catch { toast.error('Failed') }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1">{msgs.filter((m) => !m.isRead).length} unread messages</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {msgs.length === 0 ? (
            <div className="text-center py-12 text-gray-500"><Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" /><p>No messages yet.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">From</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Subject</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {msgs.map((m) => (
                    <tr key={m.id} className={\`border-b last:border-0 hover:bg-gray-50 \${!m.isRead ? 'bg-yellow-50/50' : ''}\`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-sm">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{m.subject}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{new Date(m.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        {!m.isRead && <Badge className="bg-yellow-100 text-yellow-800">Unread</Badge>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader><DialogTitle>{m.subject}</DialogTitle></DialogHeader>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">From:</span> {m.name} ({m.email})</p>
                                <p><span className="font-medium">Date:</span> {new Date(m.date).toLocaleString()}</p>
                                <div className="bg-gray-50 p-4 rounded-lg mt-3 whitespace-pre-wrap">{m.message}</div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {!m.isRead && (
                            <Button variant="ghost" size="sm" onClick={() => markRead(m.id)} title="Mark Read"><CheckCircle className="h-4 w-4" /></Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteMsg(m.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
`

// ============================================================
// Admin Subscribers page (server component)
// ============================================================
const subscribersPage = `import { requireRole } from '@/lib/auth-helper'
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
`

const subscribersClient = `'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Trash2, ToggleLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function SubscribersClient({ subscribers: initialSubs }: {
  subscribers: { id: string; email: string; frequency: string; source: string; isActive: boolean; createdAt: string }[]
}) {
  const [subs, setSubs] = useState(initialSubs)

  const toggleActive = async (id: string) => {
    try {
      const sub = subs.find((s) => s.id === id)
      if (!sub) return
      const res = await fetch(\`/api/admin/subscribers?email=\${encodeURIComponent(sub.email)}\`, { method: 'DELETE' })
      if (res.ok) { setSubs(subs.map((s) => s.id === id ? { ...s, isActive: !s.isActive } : s)); toast.success('Updated') }
    } catch { toast.error('Failed') }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="text-gray-500 mt-1">{subs.length} subscribers ({subs.filter((s) => s.isActive).length} active)</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {subs.length === 0 ? (
            <div className="text-center py-12 text-gray-500"><Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" /><p>No subscribers yet.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Frequency</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Source</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden lg:table-cell">Subscribed</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((s) => (
                    <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{s.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{s.frequency}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{s.source}</td>
                      <td className="px-4 py-3">
                        <Badge variant={s.isActive ? 'default' : 'secondary'} className={s.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}>
                          {s.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{new Date(s.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" onClick={() => toggleActive(s.id)} title="Toggle Active"><ToggleLeft className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
`

// ============================================================
// Admin API Routes
// ============================================================
const adminUsersApi = `import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [{ name: { contains: search } }, { email: { contains: search } }]
    }
    if (role && role !== 'ALL') where.role = role

    const [users, total] = await Promise.all([
      db.user.findMany({ where, select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.user.count({ where }),
    ])

    return NextResponse.json({ users: users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin users GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminUserByIdApi = `import { NextRequest, NextResponse } from 'next/server'
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
`

const adminJobsApi = `import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || ''

    const where: Record<string, unknown> = { deletedAt: null }
    if (status && status !== 'ALL') where.status = status

    const [jobs, total] = await Promise.all([
      db.job.findMany({ where, include: { _count: { select: { applications: true } }, organization: { select: { orgName: true } } }, orderBy: { datePosted: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.job.count({ where }),
    ])

    return NextResponse.json({ jobs: jobs.map((j) => ({ ...j, datePosted: j.datePosted.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin jobs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminJobByIdApi = `import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    const body = await req.json()
    const job = await db.job.update({ where: { id }, data: body })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin job PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    await db.job.update({ where: { id }, data: { deletedAt: new Date() } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin job DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminAppsApi = `import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || ''

    const where: Record<string, unknown> = {}
    if (status && status !== 'ALL') where.status = status

    const [apps, total] = await Promise.all([
      db.jobApplication.findMany({ where, include: { user: { select: { name: true, email: true } }, job: { select: { title: true } } }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.jobApplication.count({ where }),
    ])

    return NextResponse.json({ applications: apps.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin apps GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminAppByIdApi = `import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    const body = await req.json()
    await db.jobApplication.update({ where: { id }, data: { status: body.status } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin app PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminOrgsApi = `import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET() {
  try {
    await requireRole('ADMIN')
    const orgs = await db.organization.findMany({ where: { deletedAt: null }, include: { _count: { select: { jobs: true } } }, orderBy: { createdAt: 'desc' } })
    return NextResponse.json(orgs)
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin orgs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminOrgByIdApi = `import { NextRequest, NextResponse } from 'next/server'
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
`

const adminMsgsApi = `import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET() {
  try {
    await requireRole('ADMIN')
    const msgs = await db.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(msgs.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })))
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin msgs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminMsgByIdApi = `import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    const body = await req.json()
    await db.contactSubmission.update({ where: { id }, data: { isRead: body.isRead } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin msg PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('ADMIN')
    const { id } = await params
    await db.contactSubmission.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin msg DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

const adminSubsApi = `import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth-helper'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''

    const where: Record<string, unknown> = {}
    if (search) where.email = { contains: search }

    const [subs, total] = await Promise.all([
      db.newsletterSubscription.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.newsletterSubscription.count({ where }),
    ])

    return NextResponse.json({ subscribers: subs.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() })), total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin subs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireRole('ADMIN')
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    await db.newsletterSubscription.updateMany({ where: { email }, data: { isActive: false } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    console.error('Admin subs DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
`

// ============================================================
// Write all files
// ============================================================
const files: Record<string, string> = {
  'app/admin/AdminSidebar.tsx': adminSidebar,
  'app/admin/layout.tsx': adminLayout,
  'app/admin/page.tsx': adminPage,
  'app/admin/AdminOverviewClient.tsx': adminOverviewClient,
  'app/admin/users/page.tsx': usersPage,
  'app/admin/users/UsersClient.tsx': usersClient,
  'app/admin/jobs/page.tsx': adminJobsPage,
  'app/admin/jobs/AdminJobsClient.tsx': adminJobsClient,
  'app/admin/applications/page.tsx': adminAppsPage,
  'app/admin/applications/AdminAppsClient.tsx': adminAppsClient,
  'app/admin/organizations/page.tsx': orgsPage,
  'app/admin/organizations/OrgsAdminClient.tsx': orgsAdminClient,
  'app/admin/messages/page.tsx': messagesPage,
  'app/admin/messages/MessagesClient.tsx': messagesClient,
  'app/admin/subscribers/page.tsx': subscribersPage,
  'app/admin/subscribers/SubscribersClient.tsx': subscribersClient,
  'app/api/admin/users/route.ts': adminUsersApi,
  'app/api/admin/users/[id]/route.ts': adminUserByIdApi,
  'app/api/admin/jobs/route.ts': adminJobsApi,
  'app/api/admin/jobs/[id]/route.ts': adminJobByIdApi,
  'app/api/admin/applications/route.ts': adminAppsApi,
  'app/api/admin/applications/[id]/route.ts': adminAppByIdApi,
  'app/api/admin/organizations/route.ts': adminOrgsApi,
  'app/api/admin/organizations/[id]/route.ts': adminOrgByIdApi,
  'app/api/admin/messages/route.ts': adminMsgsApi,
  'app/api/admin/messages/[id]/route.ts': adminMsgByIdApi,
  'app/api/admin/subscribers/route.ts': adminSubsApi,
}

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(base, filePath)
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  fs.writeFileSync(fullPath, content, 'utf-8')
  console.log('Created: ' + filePath)
}

console.log('\\nAll admin dashboard files created!')