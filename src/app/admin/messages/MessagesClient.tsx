'use client'

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
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: true }) })
      if (res.ok) { setMsgs(msgs.map((m) => m.id === id ? { ...m, isRead: true } : m)); toast.success('Marked as read') }
    } catch { toast.error('Failed') }
  }

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
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
                    <tr key={m.id} className={`border-b last:border-0 hover:bg-gray-50 ${!m.isRead ? 'bg-yellow-50/50' : ''}`}>
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
