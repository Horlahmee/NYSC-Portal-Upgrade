import type { Metadata } from 'next'
import { AdminStatsGrid } from '@/components/admin/admin-stats'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">System-wide overview</p>
      </div>
      <AdminStatsGrid />
    </div>
  )
}
