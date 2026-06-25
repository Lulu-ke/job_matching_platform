import { requireRole } from '@/lib/auth-helper'
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
