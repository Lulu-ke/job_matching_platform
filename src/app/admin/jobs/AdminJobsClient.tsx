'use client'

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
    router.push(`/admin/jobs?${params.toString()}`)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) })
      if (res.ok) {
        setData({ ...data, jobs: data.jobs.map((j) => j.id === id ? { ...j, status: newStatus } : j) })
        toast.success('Status updated')
      }
    } catch { toast.error('Failed') }
  }

  const deleteJob = async (id: string) => {
    if (!confirm('Delete this job?')) return
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
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
          <Button variant="outline" size="sm" disabled={data.page <= 1} onClick={() => router.push(`/admin/jobs?page=${data.page - 1}`)}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm text-gray-500">Page {data.page} of {data.totalPages}</span>
          <Button variant="outline" size="sm" disabled={data.page >= data.totalPages} onClick={() => router.push(`/admin/jobs?page=${data.page + 1}`)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      )}
    </div>
  )
}
