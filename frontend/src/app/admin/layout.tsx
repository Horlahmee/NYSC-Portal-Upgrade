import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHydrator } from '@/components/admin/admin-hydrator'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminHydrator />
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Admin Panel</p>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
