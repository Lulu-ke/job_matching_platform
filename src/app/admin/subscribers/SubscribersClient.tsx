'use client'

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
      const res = await fetch(`/api/admin/subscribers?email=${encodeURIComponent(sub.email)}`, { method: 'DELETE' })
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
