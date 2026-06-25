'use client'

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
    router.push(`/admin/applications?${params.toString()}`)
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
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
          <Button variant="outline" size="sm" disabled={data.page <= 1} onClick={() => router.push(`/admin/applications?page=${data.page - 1}`)}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm text-gray-500">Page {data.page} of {data.totalPages}</span>
          <Button variant="outline" size="sm" disabled={data.page >= data.totalPages} onClick={() => router.push(`/admin/applications?page=${data.page + 1}`)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      )}
    </div>
  )
}
