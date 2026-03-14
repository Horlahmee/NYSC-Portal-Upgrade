import type { Metadata } from 'next'
import { ClearanceQueue } from '@/components/admin/clearance-queue'

export const metadata: Metadata = { title: 'Admin — Clearances' }

export default function AdminClearancesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">LGA Clearances</h1>
        <p className="text-gray-500 text-sm mt-1">Approve, query, or withhold corps member clearances</p>
      </div>
      <ClearanceQueue />
    </div>
  )
}
