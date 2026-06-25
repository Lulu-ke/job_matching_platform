'use client'

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
    router.push(`/admin/users?${params.toString()}`)
  }

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      })
      if (res.ok) {
        setData({ ...data, users: data.users.map((u) => u.id === id ? { ...u, isActive: !current } : u) })
        toast.success(`User ${!current ? 'activated' : 'deactivated'}`)
      }
    } catch { toast.error('Failed') }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
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
          <Button variant="outline" size="sm" disabled={data.page <= 1} onClick={() => router.push(`/admin/users?page=${data.page - 1}`)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">Page {data.page} of {data.totalPages}</span>
          <Button variant="outline" size="sm" disabled={data.page >= data.totalPages} onClick={() => router.push(`/admin/users?page=${data.page + 1}`)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
