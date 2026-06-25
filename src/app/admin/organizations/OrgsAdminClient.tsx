'use client'

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
      const res = await fetch(`/api/admin/organizations/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isVerified: !current }) })
      if (res.ok) { setOrgs(orgs.map((o) => o.id === id ? { ...o, isVerified: !current } : o)); toast.success('Updated') }
    } catch { toast.error('Failed') }
  }

  const deleteOrg = async (id: string) => {
    if (!confirm('Delete this organization?')) return
    try {
      const res = await fetch(`/api/admin/organizations/${id}`, { method: 'DELETE' })
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
