import type { Metadata } from 'next'
import { MembersTable } from '@/components/admin/members-table'

export const metadata: Metadata = { title: 'Admin — Members' }

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Members</h1>
        <p className="text-gray-500 text-sm mt-1">Search and manage all registered users</p>
      </div>
      <MembersTable />
    </div>
  )
}
